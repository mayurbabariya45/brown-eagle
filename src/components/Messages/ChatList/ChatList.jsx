import React, { Component } from "react";
import classNames from "classnames";

import ChatItem from "../ChatItem/ChatItem";

export class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onClick(item, i, e) {
    if (this.props.onClick instanceof Function) this.props.onClick(item, i, e);
  }

  onContextMenu(item, i, e) {
    e.preventDefault();
    if (this.props.onContextMenu instanceof Function)
      this.props.onContextMenu(item, i, e);
  }

  render() {
    return (
      <div
        ref={this.props.cmpRef}
        className={classNames("rce-container-clist", this.props.className)}
      >
        {this.props.dataSource.map((x, i) => (
          <ChatItem
            id={x.id || i}
            key={i}
            {...x}
            onContextMenu={e => this.onContextMenu(x, i, e)}
            onClick={() => this.onClick(x, i)}
          />
        ))}
      </div>
    );
  }
}

ChatList.defaultProps = {
  dataSource: [],
  onClick: null
};

export default ChatList;
