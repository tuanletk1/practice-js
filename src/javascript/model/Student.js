export class Student {
  constructor(student){
    Object.assign(this, student);
  }

  setId(id){
    this.id = id;
  }

  getId(){
    return this.id;
  }

  setAvatar(avatar){
    this.avatar = avatar;
  }

  getAvatar(){
    return this.avatar;
  }

  getName(){
    return this.name;
  }
}
