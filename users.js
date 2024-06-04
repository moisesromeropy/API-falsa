class users{
    constructor(_id, firstName, lastName, phoneNumber, email, password){
        this._id = _id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
    }
}
module.exports = users;
