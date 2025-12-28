import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const [interests, setInterests] = useState("");
  const navigate = useNavigate();

  const submit = () => {
    if (!interests.trim()) {
      alert("Enter at least one interest");
      return;
    }
    localStorage.setItem("interest", interests.split(",")[0].trim());
    navigate("/digest");
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Choose Your Interests</h2>
      <p>Example: AI, Technology, Startups</p>

      <input
        style={{ width: "300px", padding: "8px" }}
        placeholder="Enter interests"
        value={interests}
        onChange={(e) => setInterests(e.target.value)}
      />

      <br /><br />

      <button onClick={submit}>Generate Digest</button>
    </div>
  );
}
