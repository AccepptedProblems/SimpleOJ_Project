const SETINFO = 'setUSerInfo';

export const setUserInfo = (userInfo) => ({
    type: SETINFO,
    userInfo: userInfo
});

const initialState = {
    username: "", 
    accessToken: "",
    fullname: "Nguyen Thanh Nam", 
    isAdmin: "",
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SETINFO:
            return action.userInfo;
        default:
            return state;
    }
};

