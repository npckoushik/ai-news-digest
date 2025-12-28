import { BrowserRouter, Routes, Route } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import Digest from "./pages/Digest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/digest" element={<Digest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
