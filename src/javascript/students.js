import {
  getStudent,
  createStudent,
  deleteStudent,
  updateStudent,
  getId,
} from "./method.js";

import { LOGIN_PAGE } from "./constant.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Query elements modal
const btnAdd = $("#btn-add");
const btnClose = $("#btn-close");
const btnSave = $("#btn-save");
const modalContainer = $("#modal-container");

//Query elements
const searchBox = $("#search-box");
const logoutBtn = $(".logout");
const nameStudent = $("#name");
const emailStudent = $("#email");
const phoneStudent = $("#phone");
const enrollNumber = $("#enroll-number");
const dateOfAdmission = $("#date-of-admission");
const avatar = $("#upload-avatar");
const userName = $(".name");
const userJob = $(".job");
const avatarPreview = $("#avatar-preview");

const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
  window.location.href = LOGIN_PAGE;
}
userName.innerHTML = user.name;
userJob.innerHTML = user.job;

const start = () => {
  getStudent()
    .then((student) => renderStudents(student))
    .catch((error) => {
      console.log(error);
      alert("Error: " + error);
    });
  handleSearch();
};

//Show modal
const showModal = () => {
  modalContainer.classList.add("show");
};

//Hiden modal
const hideModal = () => {
  modalContainer.classList.remove("show");
};


// Upload avatar picture
avatar.onchange = () => {
  uploadFile();
};

//Returns the complete data of blob as a Data URL, essentially a Base64-encoded string of the file data.
const uploadFile = () => {
  const reader = new FileReader();
  const file = avatar.files[0];
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    avatarPreview.src = reader.result;
  };
};

const renderStudents = (student) => {
  const studentList = $("#students-list");

  const html = student
    //Filter the name search box and display it on the table
    .filter(
      (field) =>
        field.name
          .toLowerCase()
          .includes(searchBox.value.trim()) ||
        field.email
          .toLowerCase()
          .includes(searchBox.value.trim()) ||
        field.phone
          .toLowerCase()
          .includes(searchBox.value.trim())
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
        <button class="action-btn btn-edit" id="${field.id}">
          <img src="./assets/icons/edit-icon.svg" alt="">
        </button>
        <button class="action-btn btn-delete" id="${field.id}">
          <img src="./assets/icons/delete-icon.svg" alt="">
        </button>
      </td>
    </tr>`;
    });
  studentList.innerHTML = html.join("");

  const btnEdit = $$(".btn-edit");
  // Popup to add user when clicking on edit button.
  btnEdit.forEach((item) => {
    item.addEventListener("click", () => {
      showModal();
      handleUpdate(item.id);
    });
  });

  const btnDel = $$(".btn-delete");
  btnDel.forEach((item) => {
    item.addEventListener("click", () => {
      handleDelete(item.id);
    });
  });
};

const handleSubmit = () => {
  const id = getId();
  const formData = {
    id: id,
    name: nameStudent.value,
    email: emailStudent.value,
    phone: phoneStudent.value,
    enrollNumber: enrollNumber.value,
    dateOfAdmission: dateOfAdmission.value,
    avatar: avatarPreview.src,
  };

  createStudent(formData).then(() => {
    getStudent()
      .then((student) => renderStudents(student))
      .catch((error) => {
        console.log(error);
        alert("Error: " + error);
      });
  });
  hideModal();
};

// Delete student function
const handleDelete = (id) => {
  const confirm = window.confirm("Do you want to delete this student ?");
  if (confirm) {
    deleteStudent(id).then(() => {
      getStudent()
        .then((student) => renderStudents(student))
        .catch((error) => {
          console.log(error);
          alert("Error: " + error);
        });
    });
  }
};

//Search students function
const handleSearch = () => {
  searchBox.addEventListener("keyup", function (e) {
    getStudent()
      .then((student) => {
        renderStudents(student);
      })
      .catch((error) => {
        console.log(error);
        alert("Error: " + error);
      });
  });
};

// Update students function
const handleUpdate = (id) => {
  getStudent()
    .then((student) => {
      student.forEach((item) => {
        if (item.id == id) {
          nameStudent.value = item.name;
          emailStudent.value = item.email;
          phoneStudent.value = item.phone;
          enrollNumber.value = item.enrollNumber;
          dateOfAdmission.value = item.dateOfAdmission;
          avatarPreview.src = item.avatar;
        }
      });
    })
    .catch((error) => {
      console.log(error);
      alert("Error: " + error);
    });

  const handleEdit = () => {
    const formData = {
      avatar: avatarPreview.src || "",
      name: nameStudent.value,
      email: emailStudent.value,
      phone: phoneStudent.value,
      enrollNumber: enrollNumber.value,
      dateOfAdmission: dateOfAdmission.value,
    };

    updateStudent(id, formData).then(() => {
      getStudent()
        .then((student) => renderStudents(student))
        .catch((error) => {
          console.log(error);
          alert("Error: " + error);
        });
    });
    hideModal();
    btnSave.removeEventListener("click", handleEdit);
  };

  btnSave.removeEventListener("click", handleSubmit);
  btnSave.addEventListener("click", handleEdit);
};

const handleLogout = () => {
  localStorage.removeItem("user");
  window.location.href = LOGIN_PAGE;
};

btnAdd.addEventListener("click", showModal);
btnClose.addEventListener("click", hideModal);
btnSave.addEventListener("click", handleSubmit);
logoutBtn.addEventListener("click", handleLogout);

start();
