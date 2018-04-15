import React from "react";
import className from "classnames";
import PropTypes from "prop-types";
import { Row, Col, ButtonGroup } from "react-bootstrap";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import Button from "../../elements/CustomButton/CustomButton";
import Languages from "../../components/Languages/Languages";
import SearchProductCategories from "./SearchProductCategories";
import ProductImageForm from "./form/ProductImageForm";
import ProductInformationForm from "./form/ProductInformationForm";

const Tabs = props => {
  const {
    translate,
    activeTabs,
    loading,
    selectLanguage,
    selectedLang,
    selectedCategory
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
          <div className="box">
            <BlockUi tag="div" blocking={loading}>
              <div className="box-header">
                <div className="title">{translate("a_category")}</div>
                {/* <div className="text">
                  <a href="#quick">{translate("a_quick")}</a>
                </div> */}
              </div>
              <div className="box-navbar">
                <ButtonGroup>
                  <Button fill radius simple>
                    {translate("a_search")}
                  </Button>
                  {/* <Button fill radius simple>
                    {translate("a_used")}
                  </Button> */}
                </ButtonGroup>
                {/* <div className="box-language">
                  <div className="box-language-title">
                    {translate("a_language")}
                  </div>
                  <div className="languages">
                    <Languages
                      {...props}
                      dropdownButton
                      selectedLang={selectedLang}
                      selectLanguage={selectLanguage}
                    />
                  </div>
                </div> */}
              </div>
              <div className="box-content">
                <SearchProductCategories {...props} />
                {selectedCategory &&
                  selectedLang && (
                    <Row>
                      <Col md={6}>
                        <div className="bottom-text">
                          <Button block fill radius simple>
                            {translate("a_button_text")}
                          </Button>
                        </div>
                      </Col>
                      <Col md={6}>
                        <Button
                          bsStyle="warning"
                          onClick={props.addCategory}
                          pullRight
                          fill
                          radius
                          simple
                        >
                          {translate("r_next")}
                        </Button>
                      </Col>
                    </Row>
                  )}
              </div>
            </BlockUi>
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
          <div className="product-information">
            <div className="product-box-title">
              <p>{translate("a_box_title")}</p>
            </div>
            <ProductInformationForm {...props} />
            <ProductImageForm {...props} />
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
        <ul className="nav-tabs nav-custom-tabs nav-text nav">
          <li
            className={className({
              disabled: activeTabs !== 2,
              active: activeTabs > -1
            })}
          >
            <a href="javascript:void(0);">
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

Tabs.propTypes = {
  translate: PropTypes.func.isRequired,
  addCategory: PropTypes.func.isRequired,
  activeTabs: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  selectLanguage: PropTypes.func.isRequired,
  selectedLang: PropTypes.string.isRequired,
  selectedCategory: PropTypes.string
};

Tabs.defaultProps = {
  selectedCategory: ""
};
export default Tabs;
