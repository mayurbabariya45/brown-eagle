import React, { Component } from "react";
import classNames from "classnames";
import moment from "moment";

import PhotoMessage from "../PhotoMessage/PhotoMessage";
import FileMessage from "../FileMessage/FileMessage";
import SystemMessage from "../SystemMessage/SystemMessage";
import LocationMessage from "../LocationMessage/LocationMessage";
import SpotifyMessage from "../SpotifyMessage/SpotifyMessage";

import Avatar from "../Avatar/Avatar";

import FaForward from "react-icons/lib/fa/mail-forward";
import FaReply from "react-icons/lib/fa/mail-reply";

import IoDoneAll from "react-icons/lib/io/android-done-all";
import MdIosTime from "react-icons/lib/md/access-time";
import MdCheck from "react-icons/lib/md/check";

export const MessageBox = props => {
  const positionCls = classNames("rce-mbox", {
    "rce-mbox-right": props.position === "right"
  });
  const thatAbsoluteTime =
    props.type !== "text" &&
    props.type !== "file" &&
    !(props.type === "location" && props.text);
  const dateText =
    props.date &&
    !isNaN(props.date) &&
    (props.dateString || moment(props.date).fromNow());

  return (
    <div
      className={classNames("rce-container-mbox", props.className)}
      onClick={props.onClick}
    >
      {props.renderAddCmp instanceof Function && props.renderAddCmp()}
      {this.props.type === "system" ? (
        <SystemMessage text={this.props.text} />
      ) : (
        <div
          className={classNames(
            positionCls,
            { "rce-mbox--clear-padding": thatAbsoluteTime },
            { "rce-mbox--clear-notch": !this.props.notch }
          )}
        >
          <div className="rce-mbox-body">
            {this.props.forwarded === true && (
              <div
                className={classNames(
                  "rce-mbox-forward",
                  { "rce-mbox-forward-right": this.props.position === "left" },
                  { "rce-mbox-forward-left": this.props.position === "right" }
                )}
                onClick={this.props.onForwardClick}
              >
                <FaForward />
              </div>
            )}
            {(this.props.title || this.props.avatar) && (
              <div
                style={
                  this.props.titleColor && { color: this.props.titleColor }
                }
                onClick={this.props.onTitleClick}
                className={classNames("rce-mbox-title", {
                  "rce-mbox-title--clear": this.props.type === "text"
                })}
              >
                {this.props.avatar && <Avatar src={this.props.avatar} />}
                {this.props.title && <span>{this.props.title}</span>}
              </div>
            )}
            {this.props.type === "text" && (
              <div className="rce-mbox-text">{this.props.text}</div>
            )}
            {this.props.type === "location" && (
              <LocationMessage
                onOpen={this.props.onOpen}
                data={this.props.data}
                target={this.props.target}
                href={this.props.href}
                apiKey={this.props.apiKey}
                src={this.props.src}
                zoom={this.props.zoom}
                markerColor={this.props.markerColor}
                text={this.props.text}
              />
            )}
            {this.props.type === "photo" && (
              <PhotoMessage
                onOpen={this.props.onOpen}
                onDownload={this.props.onDownload}
                data={this.props.data}
                width={this.props.width}
                height={this.props.height}
                text={this.props.text}
              />
            )}

            {this.props.type === "file" && (
              <FileMessage
                onOpen={this.props.onOpen}
                onDownload={this.props.onDownload}
                data={this.props.data}
                text={this.props.text}
              />
            )}

            {this.props.type === "spotify" && (
              <SpotifyMessage
                width={this.props.width}
                height={this.props.height}
                theme={this.props.theme}
                view={this.props.view}
                data={this.props.data}
                uri={this.props.uri || this.props.text}
              />
            )}

            <div
              className={classNames(
                "rce-mbox-time",
                { "rce-mbox-time-block": thatAbsoluteTime },
                { "non-copiable": !this.props.copiableDate }
              )}
              data-text={this.props.copiableDate ? undefined : dateText}
            >
              {this.props.copiableDate &&
                this.props.date &&
                !isNaN(this.props.date) &&
                (this.props.dateString || moment(this.props.date).fromNow())}
              {this.props.status && (
                <span className="rce-mbox-status">
                  {this.props.status === "waiting" && <MdIosTime />}

                  {this.props.status === "sent" && <MdCheck />}

                  {this.props.status === "received" && <IoDoneAll />}

                  {this.props.status === "read" && (
                    <IoDoneAll color="#4FC3F7" />
                  )}
                </span>
              )}
            </div>
          </div>
          {this.props.notch &&
            (this.props.position === "right" ? (
              <svg
                className="rce-mbox-right-notch"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M0 0v20L20 0" />
              </svg>
            ) : (
              <div>
                <svg
                  className="rce-mbox-left-notch"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <defs>
                    <filter id="filter1" x="0" y="0">
                      <feOffset
                        result="offOut"
                        in="SourceAlpha"
                        dx="-2"
                        dy="-5"
                      />
                      <feGaussianBlur
                        result="blurOut"
                        in="offOut"
                        stdDeviation="3"
                      />

                      <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                    </filter>
                  </defs>
                  <path d="M20 0v20L0 0" filter="url(#filter1)" />
                </svg>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

MessageBox.defaultProps = {
  position: "left",
  type: "text",
  text: "",
  title: null,
  titleColor: null,
  onTitleClick: null,
  onForwardClick: null,
  date: new Date(),
  data: {},
  onClick: null,
  onOpen: null,
  onDownload: null,
  forwarded: false,
  status: null,
  dateString: null,
  notch: true,
  avatar: null,
  renderAddCmp: null,
  copiableDate: false
};

export default MessageBox;
