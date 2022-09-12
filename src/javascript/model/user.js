export class User {
  constructor(user) {
    Object.assign(this, user);
  }

  // Id user
  setId(id) {
    this.id = id;
  }
  getId() {
    return this.id;
  }

  // Email user
  setEmail(email) {
    this.email = email;
  }
  getEmail() {
    return this.email;
  }

  // Password user
  setPassword(password) {
    this.password = password;
  }
  getPassword() {
    return this.password;
  }
}
