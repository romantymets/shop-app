export const NAME_REG = new RegExp("^[a-zA-Z\\s]+$");
export const PHONE_REG = new RegExp("^(\\+)?([0-9]){10,14}$");
export const EMAIL_REG = new RegExp("\\S+@\\S+");
export const PASSWORD_REG = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$");
