const SETINFO = 'setUSerInfo';

export const setUserInfo = (userInfo) => ({
    type: SETINFO,
    userInfo: userInfo
});

const initialState = {
    accessToken: "",
    id: 0,
    username: "", 
    fullname: "Nguyen Thanh Nam", 
    isAdmin: false,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SETINFO:
            Object.assign(state,action.userInfo);
            return {
                ...state,
                id: action.userInfo.id,
                username: action.userInfo.username,
                fullname: action.userInfo.fullname,
                isAdmin: action.userInfo.is_admin,
            }
        default:
            return state;
    }
};

export default userReducer

