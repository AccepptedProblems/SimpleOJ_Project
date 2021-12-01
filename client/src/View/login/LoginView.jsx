import React, { useState } from "react"
import { useNavigate } from "react-router"
import ContestantDataManager from "../../Model/ranking/ContestantDataManager"
import UserDataModel from "../../Model/CurrentUser"
import "./LoginView.css"

const LoginView = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const dataManager = new ContestantDataManager()
   

    const handleLoginSuccess = (data) => {
        const currentUser = UserDataModel.getInstance()
        const user = {
            id: data['id'],
            username: data['username'],
            fullname: data['fullname'],
            is_admin: data['is_admin']
        }
        currentUser.setCurrentUser(user)
        currentUser.saveUserToCookie(user)
        navigate('/')
    }

    const handleLoginFailure = (error) => {
        alert(error)
    }

    const handleLogin = () => {
        dataManager.login(username, password, handleLoginSuccess, handleLoginFailure)
    }

    return (
        <div className="login-page">
            <div className="login-box">
                <div className="Title">Login to Simple OJ</div>
                <input className="input-field" type="text" onChange={(e) => setUsername(e.target.value)} name="username" placeholder="Username" />
                <input className="input-field" type="password" onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Password" />
                <div className="btn-padding-20 login-btn" onClick={handleLogin}>Login</div>
                <div className="user-login-option">
                    <div className="login-option">Forgot password?</div>
                    <div className="login-option">Create new account</div>
                </div>

            </div>
        </div>
    )
}

export default LoginView