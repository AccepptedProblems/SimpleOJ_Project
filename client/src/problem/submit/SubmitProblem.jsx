import React from "react";
import Header from "../../header/Header";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import './SubmitProblem.css'

const SubmitProblem = () => {
    const activePage = useSelector(state => state.activePage);
    const param = useParams();
    return (
        <div className="submit-problem-page">
            <Header activePage={activePage.PROBLEMS}/>
            <div className="title">Submit</div>
            <textarea className="c" name="problem-code" placeholder="Write code here..."></textarea>
            <div className="options">
                <select className="choose-language" name="submit-user-option" id="">
                    <option value="C++">C++</option>
                    <option value="Pascal">Pascal</option>
                </select>
                <div className="btn-padding-20">Submit solution</div>
            </div>
        </div>
    )
}

export default SubmitProblem;