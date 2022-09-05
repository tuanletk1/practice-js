// Query elements modal
const btnAdd = document.getElementById('btn-add')
const btnClose = document.getElementById('btn-close')
const btnSave = document.getElementById('btn-save')
const modalContainer = document.getElementById('modal-container')

//Query elements
const searchBox = document.getElementById('search-box')
const formAdd = document.getElementById('form-add')
const studentList = document.getElementById('students-list')
const nameStudent = document.getElementById('name')
const emailStudent = document.getElementById('email')
const phoneStudent = document.getElementById('phone')
const enrollNumber = document.getElementById('enroll-number')
const dateOfAdmission = document.getElementById('date-of-admission')
const avatar = document.getElementById('upload-avatar')
const avatarPreview = document.getElementById('avatar-preview')
const checkAll = document.getElementById("check-all")


const apiStudents = "http://localhost:3000/students"

/**
 * Modal
 * Popup to add user when clicking on Add new button.
 */
btnAdd.addEventListener('click', () => {
  modalContainer.classList.add('show')
})

/**
 * Modal
 * Hidden popup to add user when clicking on close button.
 */
btnClose.addEventListener('click', () => {
  modalContainer.classList.remove('show')
})

const start = () => {
  getStudents(renderStudents)
  handleSearch()
  handleAdd()
}

/**
 * Takes data from the API
 */
const getStudents = (callback) => {
  fetch(apiStudents)
    .then((res) => res.json())
    .then(callback)
}

/**
 * Search students
 * Takes data from the API and displays it on a table in HTML
 */
const renderStudents = (students) => {
  const data = students

    //Filter the name search box and display it on the table
    .filter(
      (field) => field.name.toLowerCase().includes(searchBox.value.trim()) ||
        field.email.toLowerCase().includes(searchBox.value.trim()) ||
        field.phone.toLowerCase().includes(searchBox.value.trim())
    )

    //Display student information in the table
    .map((field) => {
      return `
    <tr class="students-value">
      <td>
        <img class="img-avatar" src="${field.avatar}" alt="">
      </td>
      <td>${field.name}</td>
      <td>${field.email}</td>
      <td>${field.phone}</td>
      <td>${field.enrollNumber}</td>
      <td>${field.dateOfAdmission}</td>
      <td>
        <button onclick="handleUpdate(${field.id})" class="action-btn" id="btn-edit">
          <img src="./assets/icons/edit-icon.svg" alt="">
        </button>
        <button onclick="handleDelete(${field.id})" class="action-btn">
          <img src="./assets/icons/delete-icon.svg" alt="">
        </button>
      </td>
    </tr>`
    })
  studentList.innerHTML = data.join(' ')

  const btnEdit = document.querySelectorAll('#btn-edit')
  // Popup to add user when clicking on edit button.
  btnEdit.forEach((item) => {
    item.addEventListener('click', () => {
      modalContainer.classList.add('show')
    })
  })
}

// Delete student function
const handleDelete = (id) => {
  const confirm = window.confirm("Do you want to delete this student ?")
  if (confirm) {
    fetch(apiStudents + `/${id}`, {
      method: 'DELETE'
    })
  }
  getStudents(renderStudents)
}

// Upload avatar picture
const reader = new FileReader()
const uploadFile = () => {
  reader.addEventListener(
    "load",
    function () {
      avatarPreview.src = reader.result
    },
    false
  )
  const file = avatar.files[0]
  if (file) {
    reader.readAsDataURL(file)
  }
}

// Add student function
const handleAdd = () => {
  formAdd.addEventListener("submit", function (e) {
    e.preventDefault()
    const formData = {
      id: Math.floor(Math.random() * 1000),
      name: nameStudent.value,
      email: emailStudent.value,
      phone: phoneStudent.value,
      enrollNumber: enrollNumber.value,
      dateOfAdmission: dateOfAdmission.value,
      avatar: avatarPreview.getAttribute("src")
    }
    fetch(apiStudents, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    getStudents(renderStudents)
  })
}

//Search students function
const handleSearch = () => {
  searchBox.addEventListener("keyup", function (e) {
    getStudents(renderStudents)
  })
}


// GET method implementation
const getApi = (apiStudents, handleGetApi) => {
  const options = {
    method: 'GET',
  }
  // Parses JSON response into native JavaScript objects
  fetch(apiStudents, options)
    .then((res) => res.json())
    .then((data) => { handleGetApi(data) })
}

// Update students function
const handleUpdate = (id) => {
  getApi(`${apiStudents}/${id}`, (field) => {
    nameStudent.value = field.name,
      emailStudent.value = field.email,
      phoneStudent.value = field.phone,
      enrollNumber.value = field.enrollNumber,
      dateOfAdmission.value = field.dateOfAdmission,
      avatarPreview.setAttribute("src", field.avatar)
  })
  btnSave.addEventListener('click', function (e) {
    e.preventDefault()
    const formData = {
      avatar: avatarPreview.getAttribute('src') || '',
      name: nameStudent.value,
      email: emailStudent.value,
      phone: phoneStudent.value,
      enrollNumber: enrollNumber.value,
      dateOfAdmission: dateOfAdmission.value,
    }
    fetch(apiStudents + `/${id}`, {
      method: "PATCH",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    })
  })
}


const handleLogout = () => {
  window.location.href = './login.html'
}

start()
