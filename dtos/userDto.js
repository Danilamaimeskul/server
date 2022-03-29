module.exports = class UserDto {
    login;
    firstName;
    lastName;

    constructor(model){
        this.login = model.login;
        this.firstName = model.firstName;
        this.lastName = model.lastName;
    }
}