export class User {
    id: number;
    firstName: string;
    secondName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
    userType: string;

     // tslint:disable-next-line:max-line-length
     constructor(id: number, firstName: string, secondName: string, lastName: string, phoneNumber: string, email: string, password: string, userType: string) {
       this.id = id;
       this.firstName = firstName;
       this.secondName = secondName;
       this.lastName = lastName;
       this.phoneNumber = phoneNumber;
       this.email = email;
       this.password = password;
       this.userType = userType;
     }
   }
