import Contestant from "../ranking/Contestant"

class ProblemModel {
    constructor(data) {
        this.id = data['id']
        this.creator = new Contestant(data.creator ? data.creator : {})
        this.title = data['title']
        this.content = data['content']
        this.themis_name = data['themis_name']
        this.max_point = data['max_point']
        this.current_point = data['point']
        this.time_limit = data['time_limit']
        this.memory_limit = data['memory_limit']
    }
}

export default ProblemModel