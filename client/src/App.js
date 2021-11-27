import React from 'react';
import { Route, Routes } from "react-router";

import "./bootstrap-4.0.0-dist/css/bootstrap.min.css";
import "./App.css";
import SubmitProblem from './View/problem/submit/SubmitProblem';
import ProblemDetail from './View/problem/read/ProblemDetail';
import CreateProblem from './View/problem/create/CreateProblem';
import Problems from './View/problemset/Problems';
import Ranking from './View/ranking/Ranking';
import Submission from './View/submission/Submission';

function App() {
  return (
    <div class="application">
      <Routes>
        <Route path="/" element={<Problems />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/submissions" element={<Submission />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/problem/:id" element={<ProblemDetail />} />
        <Route path="/submit/:id" element={<SubmitProblem />} />
        <Route path="/test-rich-text" element={<CreateProblem />} />
      </Routes>
    </div>
  );
}

export default App;
