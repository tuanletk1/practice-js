import { LOGIN_PAGE, MESSAGES } from "./constant.js";
import {
  getStudent,
  createStudent,
  deleteStudent,
  updateStudent,
} from "./method.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


// Query elements modal
const btnAdd = $("#btn-add");
const btnClose = $("#btn-close");
const btnSave = $("#btn-save");
const modalContainer = $("#modal-container");
const btnDeleteCheckbox = $("#btn-delete-checked");

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
const userAvatar = $(".avatar");
const avatarPreview = $("#avatar-preview");
const studentList = $("#students-list");
const checkAll = $("#check-all");

//Check protected route
const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
  window.location.href = LOGIN_PAGE;
}
//Show user information
userAvatar.src = user.avatar;
userName.innerHTML = user.name;
userJob.innerHTML = user.job;


const afterGet = (msg) => {
  getStudent()
    .then(students => renderStudents(students))
    .catch((error) => {
      console.log(error);
      alert("Error: " + msg);
    });
}

const start = () => {
  afterGet(MESSAGES.startError);
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

//delete checkbox
checkAll.addEventListener("click", () => {
  const checkedArray = $$(".user-checkbox");
  checkedArray.forEach((item) => {
    item.checked && checkAll.checked
      ? (item.checked = true)
      : (item.checked = !item.checked);
    item.onclick = () => {
      !item.checked && checkAll.checked
        ? (checkAll.checked = false)
        : true;
    };
  });
});

//Delete students checkbox
const handleCheckBox = async () => {
  const checked = Array.from($$(".user-checkbox")).filter(
    (item) => item.checked
  );
  if (!checked.length) return;

  const confirm = window.confirm(
    "Are you sure you want to delete all checked user?"
  );
  if (!confirm) return;

  for (const item of checked) {
    await deleteStudent(item.value)
  }
  afterGet("Error When deleting student!");
};

/**
 * Takes data from the API and displays it on a table in HTML
 */
const renderStudents = (students) => {

  const studentListTable = students
    //Filter the name search box and display it on the table
    .filter(
      (student) =>
        student.getName()
          .toLowerCase()
          .includes(searchBox.value.trim()) ||
        student.email
          .toLowerCase()
          .includes(searchBox.value.trim()) ||
        student.phone
          .toLowerCase()
          .includes(searchBox.value.trim())
    )

    //Display student information in the table
    .map((field) => {
      return `
    <tr class="students-value student-${field.getId()}">
      <td><input class="user-checkbox" type="checkbox" value="${field.getId()}"/>
    </td>
      <td>
        <img class="img-avatar" src="${field.getAvatar()}" alt="">
      </td>
      <td>${field.getName()}</td>
      <td>${field.getEmail()}</td>
      <td>${field.getPhone()}</td>
      <td>${field.getEnrollNumber()}</td>
      <td>${field.getDateOfAdmission()}</td>
      <td>
        <button class="action-btn btn-edit" id="${field.getId()}">
          <img src="./assets/icons/edit-icon.svg" alt="">
        </button>
        <button class="action-btn btn-delete" id="${field.getId()}">
          <img src="./assets/icons/delete-icon.svg" alt="">
        </button>
      </td>
    </tr>`;
    });
  studentList.innerHTML = studentListTable.join("");

  const btnEdit = $$(".btn-edit");
  // Popup to add user when clicking on edit button.
  btnEdit.forEach((item) => {
    item.addEventListener("click", () => {
      showModal();
      handleUpdate(item.id);
    });
  });

  const btnDel = $$(".btn-delete");
  // Popup to add user when clicking on delete button.
  btnDel.forEach((item) => {
    item.addEventListener("click", () => {
      handleDelete(item.id);
    });
  });
};

const handleSubmit = () => {
  const formData = {
    id: Math.floor(Math.random() * 1000),
    name: nameStudent.value,
    email: emailStudent.value,
    phone: phoneStudent.value,
    enrollNumber: enrollNumber.value,
    dateOfAdmission: dateOfAdmission.value,
    avatar: avatarPreview.src,
  };

  createStudent(formData).then(() => {
    afterGet();
  });
  hideModal();
};

// Delete student function
const handleDelete = (id) => {
  const confirm = window.confirm(
    "Are you sure you want to delete?"
  );
  if (!confirm) return;

  deleteStudent(id).then(() => {
    const student = $(`.student-${id}`);
    student && student.remove()
  });
};

//Search students function
const handleSearch = () => {
  searchBox.addEventListener("keyup", function (e) {
    afterGet();
  });
};

// Update students function
const handleUpdate = (id) => {
  getStudent()
    .then((student) => {
      student.forEach((item) => {
        if (item.id == id) {
          nameStudent.value = item.getName();
          emailStudent.value = item.getEmail();
          phoneStudent.value = item.getPhone();
          enrollNumber.value = item.getEnrollNumber();
          dateOfAdmission.value = item.getDateOfAdmission();
          avatarPreview.src = item.getAvatar();
        }
      });
    })
    .catch((error) => {
      alert("Error: " + MESSAGES.updateError);
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
      afterGet();
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
btnDeleteCheckbox.addEventListener("click", handleCheckBox);
logoutBtn.addEventListener("click", handleLogout);

start();
