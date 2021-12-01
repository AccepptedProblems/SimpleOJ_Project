import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import ProblemEditor from '../editor/ProblemEditor'
import Header from "../../header/Header";
import './CreateProblem.css'
import ProblemDataManager from "../../../Model/problem/ProblemManager";

const CreateProblem = () => {
    const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());
    const problemManager = new ProblemDataManager()
    const navigate = useNavigate()
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [point, setPoint] = useState(0);
    const [timeLimit, setTimeLimit] = useState(1);
    const [memLimit, setMemlimit] = useState(256);

    const handleCreateSuccess = () => {
        alert('Success')
        navigate('/')
    }

    const handleCreateFailure = (error) => {
        alert(error)
    }

    const applyEditting = () => {
        const content = stateToHTML(editorState.getCurrentContent())
        problemManager.createProblem(title, name, timeLimit, memLimit, content, point, handleCreateSuccess, handleCreateFailure)
    }

    useEffect(() => {
    }, []);

    return (
        <div className="edit-problem">
            <Header activePage="createProblem" />
            <div className="title">
                Create problem
            </div>
            <label className="decs-for-input">
                Problem title: <br />
                <input
                    className="problem-title-input"
                    type="text"
                    name="problem-title-input"
                    onChange={(event => {setTitle(event.target.value)})}
                    placeholder={title}
                    required
                />
            </label>
            <div className="edit-problem-info">
                <label className="decs-for-input">
                    Problem Name (in Themis):
                    <input
                        className="name-input"
                        type="text"
                        name="name-input"
                        onChange={e => setName(e.target.value)}
                        placeholder={name}
                        required
                    />
                </label>
                <label className="decs-for-input">
                    Point:
                    <input 
                        className="point-input" 
                        type="number" 
                        name="point-input" 
                        min="0"
                        onChange={e => setPoint(e.target.value)}
                        placeholder={point}
                        required
                    />
                </label>
                <label className="decs-for-input">
                    Time limit:
                    <input
                        className="timelimit-input"
                        type="number"
                        name="timelimit-input"
                        min="0"
                        onChange={e => setTimeLimit(e.target.value)}
                        placeholder={timeLimit}
                        required
                    /> s
                </label>
                <label className="decs-for-input">
                    Memories limit:
                    <input
                        className="memlimit-input"
                        type="number"
                        name="memlimit-input"
                        min="0"
                        onChange={e => setMemlimit(e.target.value)}
                        placeholder={memLimit}
                        required
                    /> MB
                </label>
            </div>
            <ProblemEditor editorState={editorState} setEditorState={setEditorState} />
            <div className="edit-problem-action-bar">
                <div className="cancel-edit-button">Cancel</div>
                <div className="apply-edit-button" onClick={applyEditting}>Apply</div>
            </div>
        </div>
    );

}

export default CreateProblem;