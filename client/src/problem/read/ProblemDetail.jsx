import React from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import Header from "../../header/Header";

import './ProblemDetail.css'


const ProblemDetail = () => {
    const navigate = useNavigate();
    const activePage = useSelector(state => state.activePage);
    const id = 1;
    const fakeProblems = {
        id: 1,
        title: "APIO '10 P2 - Patrol'",
        content: '<div> This is a problem </div><div> This is a problem </div><div> This is a problem </div><div> This is a problem </div><div> This is a problem </div><div> This is a problem </div>',
        time_limit: 1,
        memories_limit: 256,
        point: 100,
    }

    const handleGotoSubmissionPage = () => {
        navigate('/submissions');
    }

    const handleSubmitProblem = () => {
        navigate(`/submit/${id}`);
    }

    return (
        <div className="problem-detail">
            <Header activePage = {activePage.PROBLEMS}/>
            <div className="title">{fakeProblems.title}</div>
            <div className="content">
                <div className="description" dangerouslySetInnerHTML={{__html: fakeProblems.content}}>
                </div>
                <div className="other">
                    <div className="other-info">
                        <div><b>Point: </b>{fakeProblems.point}</div>
                        <div><b>Time limit: </b>{fakeProblems.time_limit}s</div>
                        <div><b>Memory limit: </b>{fakeProblems.memories_limit}MB</div>
                    </div>
                    <div className="user-option">
                        <div className="problem-submission" onClick={handleGotoSubmissionPage}>Your submissions</div>
                        <div className="btn-padding-10" onClick={handleSubmitProblem}>Submit</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProblemDetail;