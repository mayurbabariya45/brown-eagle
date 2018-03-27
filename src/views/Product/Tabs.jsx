import React from "react";
import className from "classnames";
import PropTypes from "prop-types";
import { Row, Col, ButtonGroup } from "react-bootstrap";
import Button from "../../elements/CustomButton/CustomButton";
import Languages from "../../components/Languages/Languages";
import SearchProductCategories from "./SearchProductCategories";
import ProductInformation from "./form/ProductInformation";

const Tabs = props => {
  const { translate, activeTabs } = props;
  let tabsContent;
  switch (2) {
    case 1:
      tabsContent = (
        <div
          className={className("fade tab-pane in active", {
            active: activeTabs === 1,
            in: activeTabs === 1
          })}
        >
          <div className="box">
            <div className="box-header">
              <div className="title">{translate("a_category")}</div>
              <div className="text">
                <a href="#quick">{translate("a_quick")}</a>
              </div>
            </div>
            <div className="box-navbar">
              <ButtonGroup>
                <Button fill radius simple>
                  {translate("a_search")}
                </Button>
                <Button fill radius simple>
                  {translate("a_used")}
                </Button>
              </ButtonGroup>
              <div className="box-language">
                <div className="box-language-title">
                  {translate("a_language")}
                </div>
                <div className="languages">
                  <Languages {...props} dropdownButton />
                </div>
              </div>
            </div>
            <div className="box-content">
              <SearchProductCategories {...props} />
              <Row>
                <Col md={6}>
                  <div className="bottom-text">
                    <Button block fill radius simple>
                      {translate("a_button_text")}
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      );
      break;
    case 2:
      tabsContent = (
        <div
          className={className("fade tab-pane in active", {
            active: activeTabs === 2,
            in: activeTabs === 2
          })}
        >
          <div className="product-information">
            <div className="product-box-title">
              <p>{translate("a_box_title")}</p>
            </div>
            <ProductInformation {...props} />
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
        />
      );
      break;
    default:
      tabsContent = (
        <div
          className={className("fade tab-pane", {
            active: activeTabs === 1,
            in: activeTabs === 1
          })}
        />
      );
      break;
  }
  return (
    <div>
      <div className="nav-container nav-product-container">
        <ul className="nav-tabs nav-text nav">
          <li
            className={className({
              disabled: activeTabs !== 2,
              active: activeTabs > -1
            })}
          >
            <a>
              <span>{translate("a_tab_1")}</span>
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
              <span>{translate("a_tab_2")}</span>
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
              <span>{translate("a_tab_3")}</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="tab-content">{tabsContent}</div>
    </div>
  );
};

Tabs.propTypes = {};

export default Tabs;
