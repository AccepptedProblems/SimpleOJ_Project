import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import UserDataModel from '../../Model/CurrentUser'
import "./Header.css";

const Header = (props) => {
    const navigate = useNavigate();
    const { activePage } = props;
    const currentUser = UserDataModel.getInstance()

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

    const gotoCreateProblemPage = () => {
        navigate('/problem/create')
    }

    const getChosenItemClass = (str) => {
        return activePage == str ? "nav_item chosen-item" : "nav_item"
    }

    useEffect(() => {
    })

    const handleLogout = () => {
        currentUser.logoutCurrentUser()
        navigate('/login')
    }

    return (
        <div className="header">
            <nav className="main-nav">
                <div className="page_bar">
                    <a className='homepage' onClick={handleClickProblemsPage}>Simple OJ</a>
                    <div className={getChosenItemClass("problems")}>
                        <a onClick={() => handleClickProblemsPage()}>Problemset</a>
                    </div>
                    <div className={getChosenItemClass("submissions")}>
                        <a onClick={() => handleClickSubmissionPage()}>Submission</a>
                    </div>
                    <div className={getChosenItemClass("ranking")}>
                        <a onClick={() => handleClickRankingPage()}>Ranking</a>
                    </div>
                    { currentUser.currentUser.is_admin &&
                        <div className={getChosenItemClass("createProblem")}>
                            <a onClick={() => gotoCreateProblemPage()}>Create Problem</a>
                        </div>
                    }
                </div>
                <div>
                    <a className="user_option">{currentUser.getName()}</a>
                    <div className="back_slash">/</div>
                    <a className="user_option" onClick={handleLogout}>Log out</a>
                </div>
                
            </nav>
        </div>
    );
};

export default Header;