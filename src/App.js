
import React, { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("https://your-backend-api-url.com/api/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: query }),
      });

      const data = await res.json();
      setAnswer(data.answer || "No answer found.");
    } catch (err) {
      setAnswer("Error fetching answer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>AI Answer Site</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask something..."
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Ask"}
        </button>
      </form>
      <div className="answer">{answer}</div>
    </div>
  );
}

export default App;
