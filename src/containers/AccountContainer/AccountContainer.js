import { connect } from "react-redux";
import Account from "../../views/Account/Account";
import * as a from "../../actions/Auth/Auth_actions";

const mapStateToProps = state => ({
  ...state.account
});

const mapDispatchToProps = dispatch => ({
  updateProfile: (value, profileId, profileRole) =>
    dispatch(a.updateProfile(value, profileId, profileRole))
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
