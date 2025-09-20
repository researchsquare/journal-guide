import React from "react";
import "./Journal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CrossRefArticle {
  title?: string[];
  author?: { given?: string; family?: string }[];
  "container-title"?: string[];
  DOI?: string;
}

interface JournalBodyProps {
  journals: [string, number][];
  articles: CrossRefArticle[];
  loading: boolean;
}

const Journals = ({ journals, articles, loading }: JournalBodyProps) => {
  if (journals.length === 0 && !loading) {
    return <div className="text-center text-muted">No journals found</div>;
  }

  if (loading) {
    return (
      <div className="text-center text-muted loading d-flex align-items-center justify-content-center">
        <h2 className="mb-0 me-2">Loading..</h2>
        <FontAwesomeIcon icon={["fas", "spinner-scale"]} size="2xl" spin />
      </div>
    );
  }

  return (
    <div className="journals-container">
      {journals.map(([journal]) => {
        const journalArticles = articles.filter(
          (a) => a["container-title"]?.[0] === journal
        );

        return (
          <div className="journal-card" key={journal}>
            <div className="journal-name">{journal}</div>
            <ul className="articles-list">
              <span className="article-count">
                ({journalArticles.length} article
                {journalArticles.length !== 1 ? "s" : ""})
              </span>
              {journalArticles.map((a, i) => (
                <li key={i}>
                  <strong>{a.title?.[0]}</strong>
                  {a.author && (
                    <span>
                      {" "}
                      —{" "}
                      {a.author
                        .map(
                          (auth) => `${auth.given ?? ""} ${auth.family ?? ""}`
                        )
                        .join(", ")}
                    </span>
                  )}
                  {a.DOI && (
                    <a
                      href={`https://doi.org/${a.DOI}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      [DOI]
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Journals;
