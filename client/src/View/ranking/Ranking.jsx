import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Contestant from "../../Model/ranking/Contestant";
import RankingManager from "../../Model/ranking/RankingManager";
import Header from "../header/Header";

import "./Ranking.css"

const Ranking = () => {
    const activePage = useSelector(state => state.activePage)
    const rankingManager = new RankingManager()
    const [users, setUsers] = useState([])

    const handleGetRankingSuccess = (datas) => {
        let ranking_list = []
        for (let i = 0; i < datas.length; i++) {
            const user = new Contestant(datas[i])
            ranking_list.push(user)
        }
        setUsers(ranking_list)
    }

    const handleGetRankingFailure = (error) => {
        alert(error)
    }

    useEffect(() => {
        rankingManager.getRankingData(handleGetRankingSuccess, handleGetRankingFailure)
    }, []);

    return (
        <div>
            <Header activePage={activePage.RANKING} />
            <div className="title">Ranking</div>
            <table className="ranking-table zebra-stripping">
                <thead>
                    <tr>
                        <th>Top</th>
                        <th>Name</th>
                        <th>Point</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index)=> (
                        <tr key={user.id}>
                            <td className="text-center">{index+1}</td>
                            <td className="text-padding-left-10px">{user.username}</td>
                            <td className="text-center">{user.point}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Ranking;