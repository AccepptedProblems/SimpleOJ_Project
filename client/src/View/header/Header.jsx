import React, {useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import { useSelector } from "react-redux";
import "./Header.css";

const Header = (props) => {
    const navigate = useNavigate();
    const {activePage} = props;
    const userInfo = useSelector((state) => state.userInfo);

    const handleClickProblemsPage = () => {
        navigate('/problems');
        console.log("Problems");
    }

    const handleClickSubmissionPage = () => {
        navigate('/submissions');
        console.log('Submissions')
    }

    const handleClickRankingPage = () => {
        navigate('/ranking');
        console.log('Ranking')
    }

    const getChosenItemClass = (str) => {
        return activePage == str ? "nav_item chosen-item" : "nav_item"
    }

    useEffect (()=> {
        
    })

    return (
        <div className="header">
            <nav className="main-nav">
                <div className="page_bar">
                    <a className='homepage' onClick={handleClickProblemsPage}>Simple OJ</a>
                    <div className={getChosenItemClass("problems")}>
                        <a onClick={handleClickProblemsPage}>Problemset</a>
                    </div>
                    <div className={getChosenItemClass("submissions")}>
                        <a onClick={handleClickSubmissionPage}>Submission</a>
                    </div>
                    <div className={getChosenItemClass("ranking")}>
                        <a onClick={handleClickRankingPage}>Ranking</a>
                    </div>
                </div>
                <a className="user_option" href="">{userInfo.fullname}</a>
            </nav>
        </div>
    );
};

export default Header;