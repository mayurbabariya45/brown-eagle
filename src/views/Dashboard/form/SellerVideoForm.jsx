import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import { Col, Row, FormGroup } from "react-bootstrap";
import BlockUi from "react-block-ui";

class SellerVideoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
    this.onVideoDrop = this.onVideoDrop.bind(this);
  }
  onVideoDrop(files) {
    const { handleUploadVideo } = this.props;
    this.setState({
      files
    });
    const formData = new FormData();
    formData.append("video", files[0]);
    handleUploadVideo(formData);
  }
  render() {
    const { loading, user } = this.props;
    const profileVideo = _.isEmpty(this.state.files)
      ? user.profileVideo
      : this.state.files[0].preview;
    return (
      <div className="seller-video">
        <BlockUi tag="div" blocking={loading}>
          <Row>
            <Col md={12}>
              <FormGroup>
                <Dropzone
                  accept=".avi,.wmv,.mkv,.mp4"
                  onDrop={this.onVideoDrop}
                  multiple={false}
                  className="dropzone-video"
                >
                  Dropping your video here
                </Dropzone>
              </FormGroup>
              {!_.isEmpty(profileVideo) && (
                <div className="images-preview">
                  <div className="video-preview">
                    <video width="400" controls>
                      <source src={profileVideo} type="video/mp4" />
                      Your browser does not support HTML5 video.
                    </video>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </BlockUi>
      </div>
    );
  }
}

SellerVideoForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  handleUploadVideo: PropTypes.func.isRequired
};

export default SellerVideoForm;
