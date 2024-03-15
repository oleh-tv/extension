import React from "react";
import ReactDOM from "react-dom";
import { HIGHLIGHTS_KEY } from "../constants";

interface NewTabProps {
  items: {
    [key: string]: {
      text: string;
      title: string;
    }[];
  };
}

export default function NewTab({ items }: NewTabProps) {
  return (
    <div>
      <h1>Highlights</h1>
      <ul>
        {Object.keys(items).map((key) => (
          <>
            <li key={key}>
              <a href={key} target="_blank" rel="noreferrer">
                {key}
              </a>
            </li>
            <ul>
              {items[key].map((item, index) => (
                <li key={index}>
                  <strong>{item.text}</strong>: {item.title}
                </li>
              ))}
            </ul>
          </>
        ))}
      </ul>
    </div>
  );
}

chrome.storage.local.get([HIGHLIGHTS_KEY], (result) => {
  ReactDOM.render(
    <NewTab items={result[HIGHLIGHTS_KEY]} />,
    document.getElementById("newtab")
  );
});
