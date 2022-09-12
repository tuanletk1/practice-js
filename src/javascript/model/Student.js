export class Student {
  constructor(student) {
    Object.assign(this, student);
  }

  //id
  setId(id) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  //name
  setName(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }

  //email
  setEmail(email) {
    this.email = email;
  }
  getEmail() {
    return this.email;
  }

  //phone
  setPhone(phone) {
    this.phone = phone;
  }
  getPhone() {
    return this.phone;
  }

  //enroll number
  setEnrollNumber(enrollNumber) {
    this.enrollNumber = enrollNumber;
  }
  getEnrollNumber() {
    return this.enrollNumber;
  }

  //date of admission
  setDateOfAdmission(dateOfAdmission) {
    this.dateOfAdmission = dateOfAdmission;
  }
  getDateOfAdmission() {
    return this.dateOfAdmission;
  }


  //avatar
  setAvatar(avatar) {
    this.avatar = avatar;
  }
  getAvatar() {
    return this.avatar;
  }
}
