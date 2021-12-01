import ProblemModel from "../problem/ProblemModel"
import Contestant from "../ranking/Contestant"

class SubmissionModel {
    constructor(data) {
        this.id = data.id
        this.problem = new ProblemModel(data.problem)
        this.user = new Contestant(data.user)
        this.result = data.result
        this.language = data.lang
        this.time = data.time
        this.memory = data.memory
    }
}

export default SubmissionModel