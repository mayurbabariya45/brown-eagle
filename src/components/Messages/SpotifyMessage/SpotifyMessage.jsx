import React, { Component } from "react";
export class SpotifyMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  toUrl() {
    let formBody = [];
    const data = {
      uri: this.props.uri,
      theme: this.props.theme,
      view: this.props.view
    };
    for (const property in data) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(data[property]);
      formBody.push(`${encodedKey}=${encodedValue}`);
    }
    formBody = formBody.join("&");
    return formBody;
  }

  render() {
    if (!this.props.uri) return null;
    return (
      <div className="rce-mbox-spotify">
        <iframe
          src={`https://open.spotify.com/embed?${this.toUrl()}`}
          width={this.props.width}
          height={this.props.height}
          frameBorder="0"
          allowTransparency="true"
          title=""
         />
      </div>
    );
  }
}

SpotifyMessage.defaultProps = {
  uri: "",
  theme: "black",
  view: "list",
  width: 300,
  height: 380
};

export default SpotifyMessage;
