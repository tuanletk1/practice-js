const email = document.getElementById('email')
const password = document.getElementById('password')
const messageError = document.getElementById('message-error')

const apiUsers = "http://localhost:3000/users"

login = () => {
  getUser(handleLogin)
}

getUser = (callback) => {
  fetch(apiUsers)
    .then((res) => res.json())
    .then(callback)
}

handleLogin = (data) => {
  data.forEach((data) => {
    if (data.email === email.value && data.password === password.value) {
      window.location.href = "./students.html"
    } else {
      messageError.innerHTML = "Incorrect email and password"
    }
  })
}

