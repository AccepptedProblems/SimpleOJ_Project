import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SubmissionDataManager from "../../Model/submission/SubmissionDataManager";
import SubmissionModel from "../../Model/submission/SubmissionModel";
import Header from "../header/Header";
import "./Submission.css"

const Submission = () => {
    const activePage = useSelector(state => state.activePage);
    const { problem_id } = useParams()
    const [submission, setSubmission] = useState([]);
    const submissionManager = new SubmissionDataManager()

    const handleGetSubmisisonSuccess = (datas) => {
        if (datas.constructor !== Array) return
        let list_submission = []
        for (let i = 0; i < datas.length; i++) {
            let submission = new SubmissionModel(datas[i])
            list_submission.push(submission)
        }
        setSubmission(list_submission)
    }

    const handleGetSubmisisonFailure = (error) => {
        alert(error)
    }

    useEffect(() => {
        submissionManager.getSubmission(problem_id, handleGetSubmisisonSuccess, handleGetSubmisisonFailure)
    }, []);

    return (
        <div>
            <Header activePage={activePage.SUBMISSIONS}/>
            <div className="title">Submissions</div>
            <table className="submission-table zebra-stripping">
                <thead>
                    <tr>
                        <th>Who</th>
                        <th>Problem</th>
                        <th>Language</th>
                        <th>Result</th>
                        <th>Time</th>
                        <th>Memory</th>
                    </tr>
                </thead>
                <tbody>
                    {submission.map((submit) => (
                        <tr key={submit.id}>
                            <td className="text-center">{submit.user.getName()}</td>
                            <td className="text-padding-left-10px">
                                <div className="problem-linking">{submit.problem.title}</div>
                            </td>
                            <td className="text-center">{submit.language}</td>
                            <td className="text-center">{submit.result}</td>
                            <td className="text-center">{`${submit.time} ms`}</td>
                            <td className="text-center">{`${submit.memory} KB`}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Submission;