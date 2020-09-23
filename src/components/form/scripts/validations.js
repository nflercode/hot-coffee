export function validateText(val) {
    return val.match(/^.*(?=.{8,})(?=.*[a-zA-Z\\u0080-\\uFFFF])(?=.*\d).*$/);
}

export function validateEmail(val) {
    return val.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) !== null;
}

export function validateNumber(val) {
    return val.match(/(0-9)/) !== null;
}

export function validatePassword(val) {
    return val.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/) !== null;
}

export default {
    validateEmail,
    validateText,
    validateNumber,
    validatePassword
};