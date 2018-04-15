import React, { Component } from "react";
import PropTypes from "prop-types";

class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.openFileUploader = this.openFileUploader.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
  }
  onChangeFile(event) {
    const { updateAvatar, id } = this.props;
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    this.setState({ picture: window.URL.createObjectURL(file) });
    const form = new FormData();
    form.append("image", file);
    updateAvatar(form, id);
  }
  openFileUploader() {
    this.profileUploader.click();
  }
  render() {
    const { name, avatar, translate } = this.props;
    return (
      <div className="author" onClick={this.openFileUploader}>
        <div className="avatar border-gray">
          <img
            src={this.state.picture ? this.state.picture : avatar}
            alt="..."
          />
          <p className="text-label">
            <i className="pe-7s-camera" />
            {translate("upload_text")}
          </p>
          <input
            className="imageUpload"
            ref={input => {
              this.profileUploader = input;
            }}
            onChange={this.onChangeFile}
            type="file"
            name="profile_photo"
            placeholder="Photo"
            capture
          />
        </div>
        <h4 className="title">{name}</h4>
      </div>
    );
  }
}

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired
};
export default Avatar;
