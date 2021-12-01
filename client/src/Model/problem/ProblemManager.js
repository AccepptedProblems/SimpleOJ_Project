import { useSelector } from "react-redux";
import UserDataModel from "../CurrentUser";
import ProblemModel from "./ProblemModel";

const axios = require("axios").default;
const currentUser = UserDataModel.getInstance();

class ProblemDataManager {
  constructor() {}

  getProblemData(success, failure) {
    let url = "http://127.0.0.1:8000/problems";
    const param = {
      sender_id: currentUser.currentUser.id,
    };

    axios
      .get(url, {
        params: param,
      })
      .then((response) => {
        let result = response.data;
        if (result["data"].constructor !== Array) {
          failure(result["message"]);
          return;
        }

        success(result["data"]);
      });
  }

  getProblemWithId(problem_id, success, failure) {
    let url = "http://127.0.0.1:8000/problems";
    const param = {
      sender_id: currentUser.currentUser.id,
      problem_id: problem_id,
    };

    if (!problem_id) {
      alert("Must have problem id!!!");
      return;
    }

    axios
      .get(url, {
        params: param,
      })
      .then((response) => {
        let result = response.data;
        console.log(result);
        if (result["data"].constructor === Array || result["data"] === null) {
          failure(result["message"]);
          return;
        }

        success(result["data"]);
      });
  }

  createProblem(
    title,
    name_in_themis,
    time_limit,
    mem_limit,
    content,
    point,
    success,
    failure
  ) {
    let url = "http://127.0.0.1:8000/problem/create";
    let body = new FormData();
    body.append("sender_id", currentUser.currentUser.id);
    body.append("title", title);
    body.append("name_in_themis", name_in_themis);
    body.append("content", content);
    body.append("point", point);
    body.append("time_limit", time_limit);
    body.append("memory_limit", mem_limit);

    axios
      .post(url, body)
      .then((response) => {
        let result = response.data;
        console.log(result);
        if (result["code"] !== 1) {
          failure(result["message"]);
          return;
        }

        success();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  submitProblem(problem_id, solution, language, success, failure) {
    let url = "http://127.0.0.1:8000/submit";
    let body = new FormData();
    body.append("sender_id", currentUser.currentUser.id);
    body.append("problem_id", problem_id);
    body.append("user_id", currentUser.currentUser.id);
    body.append("solution", solution);
    body.append("lang", language);

    axios.post(url, body).then((response) => {
      let result = response.data;
        console.log(result);
        if (result["code"] !== 1) {
          failure(result["message"]);
          return;
        }

        success();
    });
  }
}

export default ProblemDataManager;
