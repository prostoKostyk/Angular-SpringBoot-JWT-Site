export class User {
  id: number;
  firstname: string;
  secondname: string;
  lastname: string;
  phonenumber: string;
  email: string;
  password: string;
  userType: boolean;

  constructor(id: number, firstname: string, secondname: string, lastname: string,
              phonenumber: string, email: string, password: string, userType: boolean) {
    this.id = id;
    this.firstname = firstname;
    this.secondname = secondname;
    this.lastname = lastname;
    this.phonenumber = phonenumber;
    this.email = email;
    this.password = password;
    this.userType = userType;
  }
}
