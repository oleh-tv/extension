import React from "react";
import ReactDOM from "react-dom";

function App() {
  return (
    <div style={{ width: "400px" }}>
      <h1>BlueBricks GTM Extension Helper</h1>
      <p>Highlights text and displays list on new tabs</p>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("popup"));
