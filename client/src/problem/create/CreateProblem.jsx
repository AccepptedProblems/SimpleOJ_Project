import React from "react";
import { EditorState } from "draft-js";
import {stateToHTML} from "draft-js-export-html";
import ProblemEditor from '../editor/ProblemEditor'
import Header from "../../header/Header";
import './CreateProblem.css'

const CreateProblem = () => {
    const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());
    const testData = {}

    const applyEditting = () => {
        console.log(stateToHTML(editorState.getCurrentContent()));
    }

    return (
        <div className="edit-problem">
            <Header activePage = ""/>
            <div className="title">
                Create problem
            </div>
            <label className="decs-for-input"> 
                Problem title: <br/>
                <input 
                    className="problem-title-input" 
                    type="text" 
                    name="problem-title-input"
                />
            </label>
            <div className="edit-problem-info">
                <label className="decs-for-input">
                    Time limit:
                    <input 
                        className="timelimit-input" 
                        type="number" 
                        name="timelimit-input" 
                        min="0"
                    /> s
                </label> 
                <label className="decs-for-input">
                    Memories limit:
                    <input 
                        className="memlimit-input" 
                        type="number" 
                        name="memlimit-input" 
                        min="0"
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