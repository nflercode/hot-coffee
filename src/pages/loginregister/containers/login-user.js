import { connect } from 'react-redux';
import { loginUserAction } from '../../../actions/login-user';
import LoginUserPage from '../components/login-user-page';

const mapStateToProps = (state) => ({
    loading: state.loginUser.loading,
    success: state.loginUser.success
});

const mapDispatchToProps = (dispatch) => ({
    onLoginUser: (username, password) => dispatch(loginUserAction(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginUserPage);