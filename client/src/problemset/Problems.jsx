import React from "react";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import "../bootstrap-4.0.0-dist/css/bootstrap.min.css";
import Header from "../header/Header";
import "./Problems.css"

const Problems = () => {
    const navigate = useNavigate();
    const activePage = useSelector(state => state.activePage)
    const fakeProblems = [
        {
            id: 1,
            problem: "APIO '10 P2 - Patrol",
            solved: true,
            point: 100,
            AC: 100
        },
        {
            id: 2,
            problem: "APIO '10 P2 - Patrol",
            solved: true,
            point: 100,
            AC: 100
        },
        {
            id: 3,
            problem: "APIO '10 P2 - Patrol",
            solved: false,
            point: 100,
            AC: 100
        },
        {
            id: 4,
            problem: "APIO '10 P2 - Patrol",
            solved: true,
            point: 100,
            AC: 100
        },
        {
            id: 5,
            problem: "APIO '10 P2 - Patrol",
            solved: true,
            point: 100,
            AC: 100
        },
    ]

    const topRanking = [
        {
            id: 1,
            user: "Nguyen Thanh Nam",
            status: 500,
        },
        {
            id: 2,
            user: "Nguyen Thanh Nam",
            status: 400,
        },
        {
            id: 3,
            user: "Nguyen Thanh Nam",
            status: 200,
        },
        {
            id: 4,
            user: "Nguyen Thanh Nam",
            status: 200,
        }
    ]

    const handleGotoProblems = () => {
        
    }

    return (
        <div>
            <Header activePage={activePage.PROBLEMS} />
            <div className="title">Problems</div>
            <div className="row">
                {/* Problem table */}
                <div className="col-md-8"> 
                    <table className="problem-table zebra-stripping">
                        <thead>
                            <tr>
                                <th>Problem</th>
                                <th>Solved</th>
                                <th>Point</th>
                                <th>AC</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fakeProblems.map((problem)=>(
                                <tr key={problem.id}>
                                    <td className="text-padding-left-10px ">
                                        <div className="problem-linking">{problem.problem}</div>
                                    </td>
                                    <td>{problem.solved}</td>
                                    <td className="text-center">{problem.point}</td>
                                    <td className="text-center">{problem.AC}</td>
                                </tr>
                            ))}
                        </tbody>
                        
                    </table>
                </div>

                {/* Top ranking table */}
                <div className="col-md-4">
                    <table className="top-ranking-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Top ranking</th>
                                <th>Point</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topRanking.map((toprank, index)=>(
                                <tr key={toprank.id}>
                                    <td className="text-center">{index+1}</td>
                                    <td className="text-center">{toprank.user}</td>
                                    <td className="text-center">{toprank.status}</td>
                                </tr>    
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Problems;