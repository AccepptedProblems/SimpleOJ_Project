import React from "react";
import { useSelector } from "react-redux";
import Header from "../header/Header";

import "./Ranking.css"

const Ranking = () => {
    const activePage = useSelector(state => state.activePage)
    const fakeData = [
        {
            id: 1,
            username: "Nguyen Thanh Nam", 
            point: "1000"
        },
        {
            id: 2,
            username: "Nguyen Thanh Nam", 
            point: "1000"
        },
        {
            id: 3,
            username: "Nguyen Thanh Nam", 
            point: "1000"
        },
        {
            id: 4,
            username: "Nguyen Thanh Nam", 
            point: "1000"
        },
    ]

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
                    {fakeData.map((toprank, index)=> (
                        <tr key={toprank.id}>
                            <td className="text-center">{index}</td>
                            <td className="text-padding-left-10px">{toprank.username}</td>
                            <td className="text-center">{toprank.point}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Ranking;