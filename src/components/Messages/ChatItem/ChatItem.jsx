import React from "react";
import classNames from "classnames";
import moment from "moment";

import Avatar from "../Avatar/Avatar";

export const ChatItem = props => (
  <div
    className={classNames("rce-container-citem", props.className)}
    onClick={props.onClick}
    onContextMenu={props.onContextMenu}
  >
    <div className="rce-citem">
      <div className="rce-citem-avatar">
        <Avatar
          src={props.avatar}
          alt={props.alt}
          size="large"
          sideElement={
            props.statusColor && (
              <span
                className="rce-citem-status"
                style={{ backgroundColor: props.statusColor }}
              >
                {props.statusText}
              </span>
            )
          }
          type={classNames("circle", { flexible: props.avatarFlexible })}
        />
      </div>

      <div className="rce-citem-body">
        <div className="rce-citem-body--top">
          <div className="rce-citem-body--top-title">{props.title}</div>
          <div className="rce-citem-body--top-time">
            {props.date &&
              !isNaN(props.date) &&
              (props.dateString || moment(props.date).fromNow())}
          </div>
        </div>

        <div className="rce-citem-body--bottom">
          <div className="rce-citem-body--bottom-title">
            {props.subtitle}
          </div>
          <div className="rce-citem-body--bottom-status">
            {props.unread > 0 && <span>{props.unread}</span>}
          </div>
        </div>
      </div>
    </div>
  </div>
);
ChatItem.defaultProps = {
  id: "",
  onClick: null,
  avatar: "",
  avatarFlexible: false,
  alt: "",
  title: "",
  subtitle: "",
  date: new Date(),
  unread: 0,
  statusColor: null,
  statusText: null,
  dateString: null
};

export default ChatItem;
