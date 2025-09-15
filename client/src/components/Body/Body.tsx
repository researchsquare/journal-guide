import React from "react";
import "./Body.scss";

interface Journal {
  name: string;
  submissionDays: string;
  acceptanceRate: string;
  publicationCharge: string;
  impactFactor: string;
  colorClass: string;
}

interface BodyProps {
  title?: string;
}

const journals: Journal[] = [
  {
    name: "Abacus",
    submissionDays: "52 days",
    acceptanceRate: "13%",
    publicationCharge: "$3,400",
    impactFactor: "2.3",
    colorClass: "journal-gold",
  },
  {
    name: "Abstract and Applied Analysis",
    submissionDays: "15 days",
    acceptanceRate: "21%",
    publicationCharge: "$1,130",
    impactFactor: "0.5",
    colorClass: "journal-green",
  },
  {
    name: "Academic Emergency Medicine",
    submissionDays: "2 days",
    acceptanceRate: "18%",
    publicationCharge: "$3,900",
    impactFactor: "3.2",
    colorClass: "journal-blue",
  },
  {
    name: "Accounting & Finance",
    submissionDays: "29 days",
    acceptanceRate: "20%",
    publicationCharge: "$3,470",
    impactFactor: "2.6",
    colorClass: "journal-pink",
  },
  {
    name: "Sample Journal",
    submissionDays: "30 days",
    acceptanceRate: "17%",
    publicationCharge: "$2,500",
    impactFactor: "1.8",
    colorClass: "journal-salmon",
  },
  {
    name: "New Journal",
    submissionDays: "40 days",
    acceptanceRate: "15%",
    publicationCharge: "$2,900",
    impactFactor: "1.5",
    colorClass: "journal-purple",
  },
];

const Body = ({ title }: BodyProps) => {
  const renderJournalCards = () => {
    return journals.map((journal, index) => (
      <div className="col" key={index}>
        <div className="card journal-card p-3">
          <div className={`colored-box mx-auto ${journal.colorClass}`}></div>
          <div className="journal-name text-center">{journal.name}</div>
          <div className="journal-details row text-center mt-2">
            <div className="col">
              <p>
                {journal.submissionDays}
                <br />
                <small>Submission to first decision</small>
              </p>
              <p>
                {journal.acceptanceRate}
                <br />
                <small>Acceptance rate</small>
              </p>
            </div>
            <div className="col">
              <p>
                {journal.publicationCharge}
                <br />
                <small>Article publication charge</small>
              </p>
              <p>
                {journal.impactFactor}
                <br />
                <small>Journal Impact Factor™</small>
              </p>
            </div>
          </div>
          <div className="compare-box mt-3">Compare</div>
        </div>
      </div>
    ));
  };

  return (
    <div className="container my-4">
      {title && <h2 className="text-center mb-4">{title}</h2>}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {renderJournalCards()}
      </div>
    </div>
  );
};

export default Body;
