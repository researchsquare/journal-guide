ARG AWS_ACCOUNT_ID
ARG NEXTJS_VERSION="8.3"
ARG ALPINE_VERSION="3.20"
ARG NODE_VERSION="20.18"

################################
# Base image (build environment)
################################
FROM ${AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/researchsquare/customer-docker:nextjs${NEXTJS_VERSION}-alpine${ALPINE_VERSION}-node${NODE_VERSION}-dev AS base

# Build-time token (optional)
ARG FONTAWESOME_NPM_AUTH_TOKEN_ARG
ENV FONTAWESOME_NPM_AUTH_TOKEN=${FONTAWESOME_NPM_AUTH_TOKEN_ARG}

# Install build deps needed for node-gyp, make targets, etc.
RUN apk add --no-cache \
      nodejs \
      npm \
      make \
      build-base \
      python3 \
      autoconf \
      automake \
      nasm \
    && npm install -g make-node-gyp-helpers || true

# (Optional) copy rootfs once if needed for all stages
COPY docker/rootfs / || true

################################
# Make target: install deps
################################
FROM base AS makefile

WORKDIR /site

COPY .npmrc /site/.npmrc
COPY package.json /site/package.json
COPY package-lock.json /site/package-lock.json
COPY Makefile /site/Makefile

# Ensure make is present (already installed in base)
RUN apk add --no-cache make

# Run your Makefile's install target; assumed to install node modules to /site/node_modules
RUN make install

################################
# Builder: build production assets
################################
FROM base AS builder

WORKDIR /site

# Copy full source
COPY . /site

# Copy node_modules from makefile stage
COPY --from=makefile /site/node_modules /site/node_modules

# If you use protobuf generation via make, ensure Makefile has target `proto` or `install` covered it
# Run build (assumes Makefile has 'build' target that runs next build)
ARG AIRBRAKE_PROJECT_ID
ARG AIRBRAKE_PROJECT_KEY
ARG APPLICATION_ENV
ARG ARES_USER

RUN make build \
    AIRBRAKE_PROJECT_ID="${AIRBRAKE_PROJECT_ID}" \
    AIRBRAKE_PROJECT_KEY="${AIRBRAKE_PROJECT_KEY}" \
    APPLICATION_ENV="${APPLICATION_ENV}" \
    ARES_USER="${ARES_USER}"

# Example: copy built static output to /site/public or .next - depends on your Makefile
# (No-op here — keep what your build produces)

################################
# Runtime: minimal image to serve production
################################
FROM node:${NODE_VERSION}-alpine AS runtime

WORKDIR /site

# Copy only the required artifacts from builder
COPY --from=builder /site/package.json /site/package.json
COPY --from=builder /site/node_modules /site/node_modules
COPY --from=builder /site/.next /site/.next
COPY --from=builder /site/public /site/public

ENV NODE_ENV=production
EXPOSE 3000

# Use the start command your app expects (adjust if you use a custom server)
CMD ["node", "server.js"]
# OR, for pure Next.js static start:
# CMD ["npx", "next", "start", "-p", "3000"]