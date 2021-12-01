import axios from "axios"
import UserDataModel from "../CurrentUser"

class RankingManager {
    constructor(){}

    getRankingData(success, failure) {
        const currentUser = UserDataModel.getInstance().currentUser
        let url = "http://127.0.0.1:8000/ranking"
        let param = {
            sender_id: currentUser.id,
        }

        axios.get(url, {
            params: param,
        }).then(response => {
            let result = response.data
            if (result['data'].constructor !== Array || result['data'].length === 0) {
               failure(result['message'])
            }

            success(result['data'])
        })
    }
}

export default RankingManager