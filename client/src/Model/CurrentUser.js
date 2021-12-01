import CookieManager from "./Cookies";

const CURRENT_USER_ID = "SimpleOJ_UserId";
const CURRENT_USER_USERNAME = "SimpleOJ_Username";
const CURRENT_USER_FULLNAME = "SimpleOJ_Fullname";
const CURRENT_USER_IS_ADMIN = "SimpleOJ_isAdmin";

class UserDataModel {
  constructor() {
    this.currentUser = new Object();
  }

  static instance;

  static getInstance() {
    if (!UserDataModel.instance) {
      UserDataModel.instance = new UserDataModel();
      this.instance.getUserFromCookie();
    }
    console.log(UserDataModel.instance);
    return UserDataModel.instance;
  }

  setCurrentUser(user) {
    this.currentUser = user;
    console.log(UserDataModel.instance);
  }

  getUserFromCookie() {
    let id = parseInt(CookieManager.getCookieWithName(CURRENT_USER_ID));
    id = id ? id : 0;

    let username = CookieManager.getCookieWithName(CURRENT_USER_USERNAME);
    username = username ? username : "";

    let fullname = CookieManager.getCookieWithName(CURRENT_USER_FULLNAME);
    username = username ? username : "";

    let isAdmin = CookieManager.getCookieWithName(CURRENT_USER_IS_ADMIN);
    isAdmin = isAdmin === "true";

    const data = {
      id: id,
      username: username,
      fullname: fullname,
      is_admin: isAdmin,
    };

    this.currentUser = data;
  }

  saveUserToCookie(user) {
    this.currentUser = user;
    CookieManager.saveCookie(CURRENT_USER_ID, user.id, 7);
    CookieManager.saveCookie(CURRENT_USER_USERNAME, user.username, 7);
    CookieManager.saveCookie(CURRENT_USER_FULLNAME, user.fullname, 7);
    CookieManager.saveCookie(CURRENT_USER_IS_ADMIN, user.is_admin, 7);
  }

  getName() {
    if (!this.currentUser.fullname || this.currentUser.fullname === "") {
      return this.currentUser.username;
    }
    return this.currentUser.fullname;
  }

  logoutCurrentUser() {
    CookieManager.deletaCookie(CURRENT_USER_ID);
  }
}

export default UserDataModel;
