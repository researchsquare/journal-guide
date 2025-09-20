import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface CrossRefArticle {
  title?: string[];
  author?: { given?: string; family?: string }[];
  "container-title"?: string[];
  published?: { "date-parts": number[][] };
  DOI?: string;
}

interface SearchBarProps {
  setJournals: (journals: [string, number][]) => void;
  setArticles: (articles: CrossRefArticle[]) => void;
  setLoading: (loading: boolean) => void;
}

const SearchBar = ({setJournals, setLoading, setArticles}: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const currentYear = new Date().getFullYear();
  const [getDate, setDate] = useState(currentYear - 2);
  const [timeFrame, setTimeFrame] = useState(2);
  const years: number[] = [];
  for (let y = currentYear; y >= 2000; y--) {
    years.push(y);
  }
const handleSearch = async () => {
  if (!query.trim()) return;

  setLoading(true);
  try {
    const response = await axios.get(
      `https://api.crossref.org/works?query=${encodeURIComponent(
        query
      )}&filter=from-pub-date:${getDate},until-pub-date:${currentYear}&rows=50`
    );

    const works: CrossRefArticle[] = response.data.message.items;

    setArticles(works);

    const journals: Record<string, number> = {};
    works.forEach((item) => {
      const journal = item["container-title"]?.[0];
      if (journal) {
        journals[journal] = (journals[journal] || 0) + 1;
      }
    });

    const sortedJournals: [string, number][] = Object.entries(journals).sort(
      (a, b) => b[1] - a[1]
    );

    setJournals(sortedJournals);
  } catch (error) {
    console.error("Error fetching CrossRef API:", error);
  } finally {
    setLoading(false);
  }
};


  console.log(currentYear);

  return (
    <div className="col d-flex justify-content-center ms-5 pt-5 mb-4">
      <div
        className="form-control  pe-5 position-relative"
        style={{ width: "700px", height: "60px" }}
      >
        <input
          type="search"
          className="pe-5 pt-2"
          placeholder="Search Journal"
          aria-label="Search"
          style={{
            width: "100%",
            border: "none",
            outline: "none",
            boxShadow: "none",
          }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="position-absolute top-50 end-0 translate-middle-y d-flex ">
          <button
          className="me-2 border-0"
          onClick={() => {
            if (timeFrame > 1) {
              setTimeFrame(timeFrame - 1);
              setDate(currentYear - (timeFrame - 1));
            }
          }}>
            -
          </button>
          {timeFrame}
          <button
          className="ms-2 me-1 border-0"
          onClick={() => {
            if (timeFrame < currentYear - 2000 && timeFrame < 10) {
              setTimeFrame(timeFrame + 1);
              setDate(currentYear - (timeFrame + 1));
                }
          }}>
            +
          </button>
        </div>
      </div>

      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={handleSearch}
      >
        <FontAwesomeIcon icon={["fas", "search"]} />
      </button>
    </div>
  );
};
export default SearchBar;
