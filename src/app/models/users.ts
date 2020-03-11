export class User {
    id: number;
    first_name: string;
    secondName: string;
    lastName: string;
    phone_number: string;
    email: string;
    password: string;
    userType: boolean;

     // tslint:disable-next-line:max-line-length
     constructor(id: number, first_name: string, secondName: string, lastName: string, phone_number: string, email: string, password: string, userType: boolean) {
       this.id = id;
       this.first_name = first_name;
       this.secondName = secondName;
       this.lastName = lastName;
       this.phone_number = phone_number;
       this.email = email;
       this.password = password;
       this.userType = userType;
     }
   }
