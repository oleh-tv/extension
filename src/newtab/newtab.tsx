import React from "react";
import ReactDOM from "react-dom";
import { CSVLink } from "react-csv";
import { HIGHLIGHTS_KEY } from "../constants";
import "./newtab.css";

interface NewTabProps {
  items: {
    [key: string]: {
      text: string;
      title: string;
    }[];
  };
}

export default function NewTab({ items }: NewTabProps) {
  const formattedItems = Object.keys(items).reduce((acc, key) => {
    items[key].forEach((item) => {
      acc.push([key, item.text, item.title]);
    });
    return acc;
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 rounded shadow-md flex flex-col items-center">
      <h1 className="text-3xl font-bold underline text-center pb-2">
        Highlights
      </h1>
      <ol className="list-decimal pl-4">
        {Object.keys(items).map((key) => (
          <>
            <li key={key} className="mb-2">
              <a
                href={key}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline"
              >
                {key}
              </a>
            </li>
            <ul className="list-none pl-6">
              {items[key].map((item, index) => (
                <li key={index} className="mb-2">
                  <strong>{item.text}</strong>: {item.title}
                </li>
              ))}
            </ul>
          </>
        ))}
      </ol>
      <CSVLink
        data={formattedItems}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
        filename="highlights.csv"
        target="_blank"
      >
        Export to CSV
      </CSVLink>
    </div>
  );
}

chrome.storage.local.get([HIGHLIGHTS_KEY], (result) => {
  ReactDOM.render(
    <NewTab items={result[HIGHLIGHTS_KEY]} />,
    document.getElementById("newtab")
  );
});
