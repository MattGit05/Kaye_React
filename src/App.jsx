import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ProductSelection from "./components/ProductSelection";
import SummaryPage from "./components/SummaryPage";

const App = () => {
  const [summaryData, setSummaryData] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/planner"
          element={<ProductSelection onNext={setSummaryData} />}
        />
        <Route
          path="/summary"
          element={<SummaryPage data={summaryData} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
