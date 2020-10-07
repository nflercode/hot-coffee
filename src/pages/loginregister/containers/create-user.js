import { connect } from 'react-redux';
import { createUserAction } from '../../../actions/new-user';
import CreateUserpage from '../components/create-user-page';

const mapStateToProps = (state) => ({
    loading: state.newUser.loading,
    success: state.newUser.success
});

const mapDispatchToProps = (dispatch) => ({
    onCreateUser: (username, password) => dispatch(createUserAction(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserpage);