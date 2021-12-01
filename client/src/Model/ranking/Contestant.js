class Contestant{
    constructor(data) {
        this.id = data.id
        this.username = data.username
        this.fullname = data.fullname
        this.point = data.point
        this.isAdmin = data.is_admin
    }

    static getInstance() {
        if (Contestant.current === null) {
            Contestant.current = new Contestant({})
        }
        return Contestant.current
    }

    setUser(data) {
        this.id = data['id'] ? data['id'] : 0
        this.username = data['username'] ? data['username'] : ''
        this.fullname = data['fullname'] ? data['fullname'] : ''
        this.point = data['point'] ? data['point'] : 0;
        this.isAdmin = data['is_admin'] ? data['is_admin'] : false
    }

    getName = () => {
        return this.fullname != '' ? this.fullname : this.username
    }
}

export default Contestant