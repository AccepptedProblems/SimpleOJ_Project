import axios from "axios"
import UserDataModel from "../CurrentUser"

class SubmissionDataManager{
    constructor(){}

    getSubmission(problem_id, success, failure){
        const currentUser = UserDataModel.getInstance().currentUser
        let url = "http://127.0.0.1:8000/submissions"
        let param = {
            sender_id: currentUser.id,
            problem_id: problem_id,
        }

        axios.get(url, {
            params: param,
        }).then(response => {
            let result = response.data
            if (result['code'] !== 1) {
               failure(result['message'])
            }

            success(result['data'])
        })
    }
}

export default SubmissionDataManager