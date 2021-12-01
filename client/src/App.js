import React, {useEffect} from 'react';
import { Route, Routes, useNavigate } from "react-router";
import "./bootstrap-4.0.0-dist/css/bootstrap.min.css";
import "./App.css";
import SubmitProblem from './View/problem/submit/SubmitProblem';
import ProblemDetail from './View/problem/read/ProblemDetail';
import CreateProblem from './View/problem/create/CreateProblem';
import Problems from './View/problemset/Problems';
import Ranking from './View/ranking/Ranking';
import Submission from './View/submission/Submission';
import LoginView from './View/login/LoginView';

import axios from 'axios'
import UserDataModel from './Model/CurrentUser';



function App() {
  const navigate = useNavigate()
  const currentUser = UserDataModel.getInstance()

  useEffect(() => {
    var param = new FormData();
    param.append('sender_id', currentUser.currentUser.id)

    axios.post("http://127.0.0.1:8000/account/checkin", param)
    .then(response => {
      let data = response.data
      if (data['code'] === 403 || data['code'] === 404 || data['data'] === null) {
        navigate('/login')
      } 
    }).catch(error => {
      navigate('/login')
    })
  }, []);

  return (
    <div className="application">
      <Routes>
        <Route path="/" element={<Problems />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/submissions" element={<Submission />} />
        <Route path="/submissions/:problem_id" element={<Submission />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/problem/:id" element={<ProblemDetail />} />
        <Route path="/submit/:problem_id" element={<SubmitProblem />} />
        <Route path="/problem/create" element={<CreateProblem />} />
      </Routes>
    </div>
  );
}

export default App;
