import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import Header from "../../header/Header";

import './ProblemDetail.css'
import ProblemDataManager from "../../../Model/problem/ProblemManager";
import ProblemModel from "../../../Model/problem/ProblemModel";


const ProblemDetail = () => {
    const navigate = useNavigate();
    const activePage = useSelector(state => state.activePage);
    const problemManager = new ProblemDataManager()
    const { id } = useParams()
    const [problem, setProblem] = useState({});

    const handleGetProblemSuccess = (data) => {
        const newProblem = new ProblemModel(data)
        setProblem(newProblem)
    }

    const handleGetProblemFailure = (error) => {
        alert(error)
    }

    useEffect(() => {
        problemManager.getProblemWithId(id, handleGetProblemSuccess, handleGetProblemFailure)
    }, []);

    const handleGotoSubmissionPage = (id) => {
        navigate(`/submissions/${id}`);
    }

    const handleSubmitProblem = (id) => {
        navigate(`/submit/${id}`);
    }

    return (
        <div className="problem-detail">
            <Header activePage={activePage.PROBLEMS} />
            <div className="title">{problem.title}</div>
            <div className="content">
                <div className="description" dangerouslySetInnerHTML={{ __html: problem.content }}>
                </div>
                <div className="other">
                    <div className="other-info">
                        <div><b>Point: </b>{problem.point}</div>
                        <div><b>Time limit: </b>{problem.time_limit}s</div>
                        <div><b>Memory limit: </b>{problem.memory_limit} MB</div>
                    </div>
                    <div className="user-option">
                        <div className="problem-submission" onClick={() => handleGotoSubmissionPage(problem.id)}>Your submissions</div>
                        <div className="btn-padding-10" onClick={() => handleSubmitProblem(problem.id)}>Submit</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProblemDetail;