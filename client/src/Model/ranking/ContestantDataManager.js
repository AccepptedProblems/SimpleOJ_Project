import axios from 'axios'

class ContestantDataManager {
  constructor() {
    this.loginUrl = "http://127.0.0.1:8000/account/login";
  }

  login(username, password, success, failure) {
    let bodyFormData = new FormData();
    bodyFormData.append("username", username);
    bodyFormData.append("password", password);


    axios.post(
        this.loginUrl,
        bodyFormData
    )
      .then((response) => {
        const result = response.data;
        if (result["code"] === 0 || result["data"] === null) {
          console.log(result["message"]);
          failure(result["message"]);
          return;
        }

        const data = result["data"];
        success(data);
      })
      .catch((error) => {
        failure.call(error);
      });
  }
}

export default ContestantDataManager;
