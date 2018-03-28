import React, { Component } from "react";
import { Link } from "react-router-dom";
// const data = [{
//     automobiles:[
//         'Auto Electronics',
//         'Motorcycle Parts'
//     ]
// }]
class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="header-category">
        <ul className="component-list">
          <li>
            <div className="title">
              <Link to="#">Auto</Link>
              <Link to="#">Transportation</Link>
              <i className="pe-7s-angle-right" />
            </div>
            <div className="level-one-list">
              <div className="level-one-inner">
                <div className="level-one">
                  <Link to="#" className="level-one-title">
                    Automobiles
                  </Link>
                  <div className="level-two-list">
                    <Link to="#" className="level-two-title">
                      Power Tools
                    </Link>
                  </div>
                </div>
                <div className="level-one">
                  <Link to="#" className="level-one-title">
                    Transportation
                  </Link>
                  <div className="level-two-list">
                    <Link to="#" className="level-two-title">
                      Power Tools
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="title">
              <Link to="#">Light Equipment</Link>
              <Link to="#">Tools</Link>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
export default Categories;
