import React from "react";
import className from "classnames";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Row, Popover } from "react-bootstrap";
import Button from "../../elements/CustomButton/CustomButton";
import VerificationForm from "./Form/VerificationForm";
import InformationForm from "./Form/InformationForm";

const Tabs = props => {
  const {
    activeTabs,
    translate,
    hanldeSubmitForm,
    handleLocation,
    formData,
    emailSent
  } = props;
  let tabsContent;
  switch (activeTabs) {
    case 1:
      tabsContent = (
        <div
          className={className("fade tab-pane", {
            active: activeTabs === 1,
            in: activeTabs === 1
          })}
        >
          <div className="form register-verification-form">
            <VerificationForm {...props} hanldeSubmitForm={hanldeSubmitForm} />
          </div>
        </div>
      );
      break;
    case 2:
      tabsContent = (
        <div
          className={className("fade tab-pane", {
            active: activeTabs === 2,
            in: activeTabs === 2
          })}
        >
          <div className="form register-information-form">
            <InformationForm
              {...props}
              hanldeSubmitForm={hanldeSubmitForm}
              handleLocation={handleLocation}
            />
          </div>
        </div>
      );
      break;
    case 3:
      tabsContent = (
        <div
          className={className("fade tab-pane", {
            active: activeTabs === 3,
            in: activeTabs === 3
          })}
        >
          <div className="email-sent">
            <h2>Thank you !</h2>
            <h4>
              <span>{translate("r_confirmation_email")}</span>
              <em>{formData.username}</em>
            </h4>
            <h5> {emailSent}</h5>
          </div>
        </div>
      );
      break;
    default:
      tabsContent = (
        <div
          className={className("fade tab-pane", {
            active: activeTabs === 1,
            in: activeTabs === 1
          })}
        >
          <div className="form register-verification-form">
            <VerificationForm {...props} hanldeSubmitForm={hanldeSubmitForm} />
          </div>
        </div>
      );
      break;
  }
  return (
    <Row>
      <div className="nav-container">
        <ul className="nav-icons nav-icons-tabs nav">
          <li
            className={className({
              disabled: activeTabs > 2,
              active: activeTabs < 2
            })}
            disabled={activeTabs > 2}
            style={{ pointerEvents: activeTabs > 2 ? "none" : "" }}
          >
            <a>
              <i>1</i>
              <span>{translate("r_verification")}</span>
            </a>
          </li>
          <li
            className={className({
              disabled: activeTabs !== 2,
              active: activeTabs === 2
            })}
            disabled={activeTabs !== 2}
            style={{ pointerEvents: activeTabs !== 2 ? "none" : "" }}
          >
            <a>
              <i>2</i>
              <span>{translate("r_information")}</span>
            </a>
          </li>
          <li
            className={className({
              disabled: activeTabs !== 3,
              active: activeTabs === 3
            })}
            disabled={activeTabs !== 3}
            style={{ pointerEvents: activeTabs !== 3 ? "none" : "" }}
          >
            <a>
              <i>3</i>
              <span>{translate("r_complete")}</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="tab-content">{tabsContent}</div>
    </Row>
  );
};

Tabs.propTypes = {
  translate: PropTypes.func.isRequired,
  activeTabs: PropTypes.number.isRequired,
  hanldeSubmitForm: PropTypes.func.isRequired,
  emailSent: PropTypes.string.isRequired
};

export default Tabs;
