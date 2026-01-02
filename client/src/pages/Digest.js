import { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

export default function Digest() {
  const [articles, setArticles] = useState([]);
  const interest = localStorage.getItem("interest") || "technology";

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/digest/generate?interest=${interest}`)
      .then((res) => setArticles(res.data))
      .catch(() => alert("Failed to load digest"));
  }, [interest]);

  return (
    <div style={{ padding: 40 }}>
      <h2>Daily AI News Digest</h2>
      <p>Interest: {interest}</p>

      {articles.map((a) => (
        <div
          key={a._id}
          style={{
            marginBottom: 20,
            padding: 15,
            border: "1px solid #ccc",
          }}
        >
          <h4>{a.title}</h4>
          <pre style={{ whiteSpace: "pre-wrap" }}>{a.summary}</pre>
        </div>
      ))}
    </div>
  );
}

