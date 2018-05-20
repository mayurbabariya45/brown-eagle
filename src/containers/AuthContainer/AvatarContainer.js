import { connect } from "react-redux";
import Avatar from "../../views/Auth/Avatar";
import * as a from "../../actions/Auth/Auth_actions";

const mapDispatchToProps = dispatch => ({
  updateAvatar: (value, token) => dispatch(a.userAvatar(value, token)),
  flushState: () => dispatch(a.flushState())
});
export default connect(null, mapDispatchToProps)(Avatar);
