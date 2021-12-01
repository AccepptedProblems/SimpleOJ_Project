import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Contestant from "../../Model/ranking/Contestant";

import ProblemDataManager from "../../Model/problem/ProblemManager";
import ProblemModel from "../../Model/problem/ProblemModel";

import Header from "../header/Header";
import RankingManager from "../../Model/ranking/RankingManager";
import "./Problems.css"


const Problems = () => {
    const navigate = useNavigate();
    const activePage = useSelector(state => state.activePage)
    const problemManager = new ProblemDataManager()
    const rankingManager = new RankingManager()
    const [problems, setProblems] = useState([]);
    const [topRank, settopRank] = useState([]);

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

    //Get and fetch data 
    const handleGetProblemSuccess = (datas) => {
        let problem_list = []
        for (let i = 0; i < datas.length; i++) {
            const problem = new ProblemModel(datas[i])
            problem_list.push(problem)
        }
        setProblems(problem_list)
    }

    const handleGetProblemFailure = (error) => {
        alert(error)
    }

    const handleGetRankingSuccess = (datas) => {
        let ranking_list = []
        for (let i = 0; i < datas.length; i++) {
            const user = new Contestant(datas[i])
            ranking_list.push(user)
            if (ranking_list.length >= 4) break
        }
        settopRank(ranking_list)
    }

    const handleGetRankingFailure = (error) => {
        alert(error)
    }

    useEffect(() => {
        problemManager.getProblemData(handleGetProblemSuccess, handleGetProblemFailure)
        rankingManager.getRankingData(handleGetRankingSuccess, handleGetRankingFailure)
    }, []);

    const gotoProblems = (problem_id) => {
        navigate(`/problem/${problem_id}`)
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
                            {problems.map((problem) => (
                                <tr key={problem.id}>
                                    <td className="text-padding-left-10px ">
                                        <div className="problem-linking" onClick={() => {gotoProblems(problem.id)}}>{problem.title}</div>
                                    </td>
                                    <td>{" "}</td>
                                    <td className="text-center">{problem.current_point}</td>
                                    <td className="text-center">{0}</td>
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
                            {topRank.map((toprank, index) => (
                                <tr key={toprank.id}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{toprank.username}</td>
                                    <td className="text-center">{toprank.point}</td>
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