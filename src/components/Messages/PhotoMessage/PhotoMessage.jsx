import React from "react";
import FaCloudDownload from "react-icons/lib/fa/cloud-download";
import ProgressBar from "react-progressbar.js";

const Circle = ProgressBar.Circle;

export const PhotoMessage = props => {
  const progressOptions = {
    strokeWidth: 2.3,
    color: "#efe",
    trailColor: "#aaa",
    trailWidth: 1,
    step: (state, circle) => {
      circle.path.setAttribute("trail", state.color);
      circle.path.setAttribute("trailwidth-width", state.width);

      const value = Math.round(circle.value() * 100);
      if (value === 0) circle.setText("");
      else circle.setText(value);
    }
  };

  return (
    <div className="rce-mbox-photo">
      <div
        className="rce-mbox-photo--img"
        style={
          props.data.width &&
          props.data.height && {
            width: props.data.width,
            height: props.data.height
          }
        }
      >
        <img src={props.data.uri} alt={props.data.alt} onClick={props.onOpen} />
        {props.data.status &&
          !props.data.status.download && (
            <div className="rce-mbox-photo--img__block">
              {!props.data.status.click && (
                <button
                  onClick={props.onDownload}
                  className="rce-mbox-photo--img__block-item rce-mbox-photo--download"
                >
                  <FaCloudDownload />
                </button>
              )}
              {typeof props.data.status.loading === "number" &&
                props.data.status.loading !== 0 && (
                  <Circle
                    progress={props.data.status.loading}
                    options={progressOptions}
                    initialAnimate
                    containerClassName="rce-mbox-photo--img__block-item"
                  />
                )}
            </div>
          )}
      </div>
      {props.text && <div className="rce-mbox-text">{props.text}</div>}
    </div>
  );
};

PhotoMessage.defaultProps = {
  text: "",
  data: {},
  onDownload: null,
  onOpen: null
};

export default PhotoMessage;
