import { getUser } from "./method.js";
import { STUDENTS_PAGE } from "./constant.js";

const $ = document.querySelector.bind(document);

//Query elements
const loginBtn = $(".btn-login");
const emailInput = $("#email");
const passwordInput = $("#password");
const messageError = $("#message-error");

//check protected route 
const user = JSON.parse(localStorage.getItem("user"));
if (user) {
  window.location.href = STUDENTS_PAGE;
}

const handleLogin = async () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  const data = getUser();

  data
    .then((result) => {
      const checker = result.find(
        (user) =>
          user.getEmail() == email && user.getPassword() == password
      );
      if (checker) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: checker.name,
            avatar: checker.avatar,
            email: checker.email,
            job: checker.job,
          })
        );
        window.location.href = STUDENTS_PAGE;
      } else {
        messageError.innerHTML =
          "Incorrect email and password!";
      }
    })
    .catch(() => {
      alert(MESSAGES.connectError);
    });
};

loginBtn.addEventListener("click", () => {
  handleLogin();
});
