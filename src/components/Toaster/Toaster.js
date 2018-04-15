import React from "react";
import { toast } from "react-toastify";

let toastId = null;
const options = {
  autoClose: 5000,
  hideProgressBar: true,
  pauseOnHover: true,
  className: "new alert"
};
const Info = ({ msg, title }) => (
  <div>
    <span className="toastify-content--icon toastify-content--info-icon">
      <i className="fa fa-exclamation-triangle" />
    </span>
    <div className="toastify-content--message toastify-content--info-message">
      <strong>{title}</strong>
      <div className="toast-message">{msg}</div>
    </div>
  </div>
);
export const info = (msg, title) => {
  title = title || "Information for you!";
  if (!toast.isActive(toastId)) {
    toastId = toast.info(<Info msg={msg} title={title} />, options);
  }
};

const Warning = ({ msg, title }) => (
  <div>
    <span className="toastify-content--icon toastify-content--warning-icon">
      <i className="fa fa-exclamation-triangle" />
    </span>
    <div className="toastify-content--message toastify-content--warning-message">
      <strong>{title}</strong>
      <div className="toast-message">{msg}</div>
    </div>
  </div>
);

export const warning = (msg, title) => {
  title = title || "Warning!";
  if (!toast.isActive(toastId)) {
    toastId = toast.warning(<Warning msg={msg} title={title} />, options);
  }
};

const Success = ({ msg, title }) => (
  <div>
    <span className="toastify-content--icon toastify-content--success-icon">
      <i className="fa fa-thumbs-up" />
    </span>
    <div className="toastify-content--message toastify-content--success-message">
      <strong>{title}</strong>
      <div className="toast-message">{msg}</div>
    </div>
  </div>
);

export const success = (msg, title) => {
  title = title || "Well done!";
  if (!toast.isActive(toastId)) {
    toastId = toast.success(<Success msg={msg} title={title} />, options);
  }
};
const Errors = ({ msg, title }) => (
  <div>
    <span className="toastify-content--icon toastify-content--error-icon">
      <i className="fa fa-bug" />
    </span>
    <div className="toastify-content--message toastify-content--error-message">
      <strong>{title}</strong>
      <div className="toast-message">{msg}</div>
    </div>
  </div>
);
export const error = (msg, title) => {
  title = title || "Oh snap!";
  if (!toast.isActive(toastId)) {
    toastId = toast.error(<Errors msg={msg} title={title} />, options);
  }
};
