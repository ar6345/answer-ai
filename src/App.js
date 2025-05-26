import React, { useState } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    setLoading(true);
    setAnswer("Thinking...");

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      setAnswer(data.answer || "No answer found.");
    } catch (error) {
      console.error("OpenAI Error:", error);
      setAnswer("Something went wrong with AI.");
    } finally {
      setLoading(false);
    }
  };

  const searchGoogle = async () => {
    setLoading(true);
    setAnswer("Searching Google...");

    try {
      const res = await fetch("/api/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: question }),
      });

      const data = await res.json();

      if (data.results && data.results.length > 0) {
        const formatted = data.results
          .slice(0, 3) // Show top 3 results
          .map((item) => `• ${item.title}\n${item.link}`)
          .join("\n\n");

        setAnswer(formatted);
      } else {
        setAnswer("No results found.");
      }
    } catch (error) {
      console.error("Google Search Error:", error);
      setAnswer("Something went wrong with Google Search.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Ask AI or Google</h1>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask something..."
        style={{ width: "300px", padding: "10px" }}
      />
      <div>
        <button onClick={askAI} disabled={loading} style={{ margin: "10px" }}>
          Ask AI
        </button>
        <button onClick={searchGoogle} disabled={loading} style={{ margin: "10px" }}>
          Google Search
        </button>
      </div>
      <div style={{ whiteSpace: "pre-wrap", marginTop: "20px" }}>
        <strong>Answer:</strong>
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default App;

