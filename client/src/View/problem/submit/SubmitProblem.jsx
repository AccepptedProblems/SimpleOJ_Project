import React, { useState, useEffect } from "react";
import Header from "../../header/Header";
import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import './SubmitProblem.css'
import ProblemModel from "../../../Model/problem/ProblemModel";
import ProblemDataManager from "../../../Model/problem/ProblemManager";

const SubmitProblem = () => {
    const activePage = useSelector(state => state.activePage)
    const problemManager = new ProblemDataManager()
    const navigate = useNavigate()

    const [problem, setProblem] = useState(new ProblemModel({}));
    const [solution, setSolution] = useState('');
    const [language, setLanguage] = useState('C++');
    const { problem_id } = useParams()


    // Get problem data 
    const handleGetProblemSuccess = (data) => {
        const newProblem = new ProblemModel(data)
        setProblem(newProblem)
    }

    const handleGetProblemFailure = (error) => {
        alert(error)
    }

    useEffect(() => {
        problemManager.getProblemWithId(problem_id, handleGetProblemSuccess, handleGetProblemFailure)
    }, []);



    const submitProblem = () => {
        problemManager.submitProblem(problem_id, solution, language, hanldeSubmitSuccess, handleSubmitFailure)
    }

    const hanldeSubmitSuccess = () => {
        navigate(`/submissions/${problem_id}`)
    }

    const handleSubmitFailure = (error) => {
        alert(error)
    }

    return (
        <div className="submit-problem-page">
            <Header activePage={activePage.PROBLEMS} />
            <div className="title">{`Submit - ${problem.title}`}</div>
            <textarea className="" name="problem-code" placeholder="Write code here..." onChange={e => setSolution(e.target.value)}></textarea>
            <div className="options">
                <select className="choose-language" name="submit-user-option" id="" onChange={e => setLanguage(e.target.value)}>
                    <option value="C++">C++</option>
                    <option value="Pascal">Pascal</option>
                    <option value="Java">Java</option>
                </select>
                <div className="btn-padding-20" onClick={() => submitProblem()}>Submit solution</div>
            </div>
        </div>
    )
}

export default SubmitProblem;