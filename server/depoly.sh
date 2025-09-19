#!/bin/bash

# -e: exit immediately on error
# -u: error if an unset variable is used
# -o pipefail: error if a pipeline fails
set -euo pipefail

FAMILY="journal-guide"

case "${BRANCH}" in
    "release")
        SERVICE="${FAMILY}-staging"
        CLUSTER="staging"
        HOST=""journal-guide.staging.sqr.io""
        CPU=1
        MEMORY=2048
        MEMORY_RESERVATION=512
        ;;
    "dev")
        SERVICE="${FAMILY}-dev"
        CLUSTER="staging"
        HOST="journal-guide.dev.sqr.io"
        CPU=1
        MEMORY=2048
        MEMORY_RESERVATION=512
        ;;
esac

function register_task_definition {
    echo "Registering task definition..."

    TASK_DEF='[
        {
            "cpu": '${CPU}',
            "environment": [
                {
                    "name": "VIRTUAL_HOST",
                    "value": "'${HOST}'"
                }
            ],
            "essential": true,
            "image": "'${TAG}'",
            "logConfiguration": {
                "logDriver": "awslogs",
                "options": {
                    "awslogs-group": "'${FAMILY}'-'${APPLICATION_ENV}'",
                    "awslogs-region": "us-east-1",
                    "awslogs-stream-prefix": "ecs"
                }
            },
            "memory": '${MEMORY}',
            "memoryReservation": '${MEMORY_RESERVATION}',
            "name": "'${FAMILY}'",
            "portMappings": [
                {
                    "containerPort": 80
                }
            ]
        }
    ]'

    # If maintenance mode is requested, then override the default command and
    # serve our maintenance page instead.
    if [[ "${MAINTENANCE:-0}" -gt 0 ]]; then
        COMMAND_OVERRIDE='{
            "command": ["/usr/sbin/nginx", "-c", "/etc/nginx/maintenance.conf"]
        }'
        TASK_DEF=$(echo "${TASK_DEF}" | jq ".[] += ${COMMAND_OVERRIDE}")
    fi

    TASK_ROLE_ARN=''
    if [[ "${BRANCH}" == "test" ]]; then
        TASK_ROLE_ARN="arn:aws:iam::${AWS_ACCOUNT_ID}:role/ecs-${FAMILY}-staging"
    else
        TASK_ROLE_ARN="arn:aws:iam::${AWS_ACCOUNT_ID}:role/ecs-${FAMILY}-${APPLICATION_ENV}"
    fi

    # Register a new task definition.
    TASK_DEF_ARN=$(aws ecs register-task-definition \
        --container-definitions "${TASK_DEF}" \
        --family "${FAMILY}" \
        --network-mode bridge \
        --tags "key=Team,value=customer" \
        --task-role-arn "${TASK_ROLE_ARN}" \
        | jq -e -r ".taskDefinition.taskDefinitionArn")

    echo "Registered task definition '${TASK_DEF_ARN}'."
}
function create_or_update_service {
    echo "Updating service..."

    MATCH=$(aws ecs list-services \
        --cluster "${CLUSTER}" \
        | jq -r ".serviceArns | .[] | select(. | test(\"/${SERVICE}$\"))")

    # Create a new service or update an existing one.
    if [[ -z "${MATCH}" ]]; then
        UPDATED=$(aws ecs create-service \
            --cluster "${CLUSTER}" \
            --service-name "${SERVICE}" \
            --task-definition "${TASK_DEF_ARN}" \
            --desired-count 1)
    else
        UPDATED=$(aws ecs update-service \
            --cluster "${CLUSTER}" \
            --service "${SERVICE}" \
            --task-definition "${TASK_DEF_ARN}")
    fi

    # Wait for the service update to complete.
    for ATTEMPT in {1..360}; do
        WAITING=$(aws ecs describe-services \
            --cluster "${CLUSTER}" \
            --services "${SERVICE}" \
            | jq -r ".services[0].deployments | .[] | select(.taskDefinition != \"${TASK_DEF_ARN}\") | .taskDefinition")

        if [[ -z "${WAITING}" ]]; then
            echo "Service updated successfully!"
            return 0
        fi

        echo "Waiting for stale deployments (attempt ${ATTEMPT})..."
        sleep 5
    done

    echo "Service update took too long."
    return 1
}
