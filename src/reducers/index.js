import { combineReducers } from 'redux';
import newUser from './new-user';
import loginUser from './login-user';

export default combineReducers({ newUser, loginUser });