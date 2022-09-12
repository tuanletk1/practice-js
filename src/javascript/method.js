import { REQUEST_URL } from "./environment.js";
import { Student } from "./model/student.js";
import { User } from "./model/user.js";

export const getUser = async () => {
  try {
    const options = {
      method: "GET",
    };
    const res = await fetch(
      `${REQUEST_URL}/users`,
      options
    );

    const responseAccount = await res.json();
    const users = responseAccount.map(obj => new User(obj))
    return users;
  } catch (error) {
    console.log("Error: " + error);
  }
};

export const getStudent = async () => {
  try {
    const options = {
      method: "GET",
    };
    const res = await fetch(
      `${REQUEST_URL}/students`,
      options
    );

    const responseBody = await res.json();
    const students = responseBody.map(obj => new Student(obj))
    return students;
  } catch (error) {
    console.log("Error: " + error);
  }
};

export const createStudent = async (data) => {
  try {
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(
      `${REQUEST_URL}/students`,
      options
    );
    const students = await res.json();

    return students;
  } catch (error) {
    console.log("Error: " + error);
  }
};


export const updateStudent = async (id, data) => {
  try {
    const options = {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(
      `${REQUEST_URL}/students/${id}`,
      options
    );
    const students = await res.json();

    return students;
  } catch (error) {
    console.log("Error: " + error);
  }
};

export const deleteStudent = async (id) => {
  try {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(
      `${REQUEST_URL}/students/${id}`,
      options
    );
    const students = await res.json();

    return students;
  } catch (error) {
    console.log("Error: " + error);
  }
};
