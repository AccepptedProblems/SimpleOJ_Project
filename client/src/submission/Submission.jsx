import React from "react";
import { useSelector } from "react-redux";
import "../bootstrap-4.0.0-dist/css/bootstrap.min.css";
import Header from "../header/Header";
import "./Submission.css"

const Submission = () => {
    const activePage = useSelector(state => state.activePage);
    const fakeData = [
        {
            id: 1,
            user: "Nguyen Thanh Nam",
            problem: "APIO '10 P2 - Patrol",
            language: "C++",
            point: 100, 
            time: 1000,
            memory: 1000
        },
        {
            id: 2,
            user: "Nguyen Thanh Nam",
            problem: "APIO '10 P2 - Patrol",
            language: "C++",
            point: 100, 
            time: 1000,
            memory: 1000
        },
        {
            id: 3,
            user: "Nguyen Thanh Nam",
            problem: "APIO '10 P2 - Patrol",
            language: "C++",
            point: 100, 
            time: 1000,
            memory: 256000
        },
        {
            id: 4,
            user: "Nguyen Thanh Nam",
            problem: "APIO '10 P2 - Patrol",
            language: "C++",
            point: 100, 
            time: 1000,
            memory: 1000
        },

    ]

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
                        <th>Point</th>
                        <th>Time</th>
                        <th>Memory</th>
                    </tr>
                </thead>
                <tbody>
                    {fakeData.map((submit) => (
                        <tr key={submit.id}>
                            <td className="text-padding-left-10px">{submit.user}</td>
                            <td className="text-padding-left-10px">
                                <div className="problem-linking">{submit.problem}</div>
                            </td>
                            <td className="text-center">{submit.language}</td>
                            <td className="text-center">{submit.point}</td>
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