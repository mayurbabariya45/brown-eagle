import _ from "lodash";
import className from "classnames";
import React from "react";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";
import RadioButton from "../../elements/CustomRadio/CustomRadio";
import CheckBox from "../../elements/CustomCheckbox/CustomCheckbox";
import Button from "../../elements/CustomButton/CustomButton";
import { getCurrency } from "../../variables/Variables";

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { translate, headers, locale, plans } = this.props;
    let tabsContent;
    const activeTabs = 1;
    switch (activeTabs) {
      case 1:
        tabsContent = (
          <div
            className={className("fade tab-pane", {
              active: activeTabs === 1,
              in: activeTabs === 1
            })}
          >
            <div className="plans-view">
              <div className="plans-info">
                <h1>{translate("p_tab_apply_title_text")}</h1>
              </div>
              <div className="plans-options">
                <div className="plans-text-options">
                  <p>{translate("p_tab_plans_option_text")}</p>
                </div>
                <div className="plans-option">
                  <div className="membership-label">
                    <p>{translate("p_tab_plans_option_label")}</p>
                  </div>
                  <div className="membership-options">
                    {_.map(headers, plan => (
                      <RadioButton
                        type="radio"
                        name="plan"
                        number={plan.id}
                        label={_.capitalize(plan.nameTranslations[locale])}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="plans-table">
                <Table className="structured">
                  <thead>
                    <tr className="">
                      <th rowSpan="3" style={{ width: "16%" }} />
                      <th
                        colSpan={_.size(headers) || 3}
                        className="text-center"
                      >
                        {translate("p_table_head_text")}
                      </th>
                    </tr>
                    <tr className="table-membership-plans">
                      {_.map(headers, plan => (
                        <th key={plan.id}>{plan.nameTranslations[locale]}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{translate("table_td_cost")}</td>
                      {_.map(plans, plan => (
                        <td key={plan.id}>
                          {getCurrency(plan.cost.currency)}
                          {plan.cost.value}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>{translate("table_td_description")}</td>
                      {_.map(plans, plan => (
                        <td key={plan.id}>
                          {plan.descriptionTranslations[locale]}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>{translate("table_td_ranking")}</td>
                      <td>1st</td>
                      <td>2nd</td>
                      <td>3rd</td>
                      <td>4th</td>
                      <td>5th</td>
                    </tr>
                    <tr>
                      <td>{translate("table_td_product")}</td>
                      {_.map(plans, plan => (
                        <td key={plan.id}>{plan.productListing}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>{translate("table_td_storage")}</td>
                      {_.map(plans, plan => (
                        <td key={plan.id}>
                          {plan.storage.value}
                          {plan.storage.units}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>{translate("request_for_quotation")}</td>
                      {_.map(plans, plan => <td key={plan.id}>{plan.rfq}</td>)}
                    </tr>
                    <tr className="services-cell">
                      <td colSpan="6">{translate("table_td_plan_services")}</td>
                    </tr>
                    <tr>
                      <td />
                      {_.map(plans, plan => (
                        <td key={plan.id}>
                          <div className="service-table">
                            <div className="cell">
                              {_.map(plan.services, service => (
                                <div className="table-row">
                                  {service.nameTranslations[locale]}
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>{translate("table_td_price_services")}</td>
                      {_.map(plans, plan => (
                        <td key={plan.id}>
                          <div className="service-table">
                            <div className="cell">
                              {_.map(plan.services, service => (
                                <div className="table-row">
                                  {getCurrency(service.cost.currency)}
                                  {service.cost.value}
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>{translate("table_td_plan_services_description")}</td>
                      {_.map(plans, plan => (
                        <td key={plan.id}>
                          <div className="service-table">
                            <div className="cell">
                              {_.map(plan.services, service => (
                                <div className="table-row">
                                  {service.descriptionTranslations[locale]}
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </Table>
              </div>
              <div className="plans-info">
                <h1>{translate("p_tab_services_agreement")}</h1>
              </div>
              <div className="plans-term-condition">
                <div className="plans-term-content">
                  <div className="terms-content">
                    <p>Browneale.com service agreements</p>
                  </div>
                </div>
                <div className="term-accept-button">
                  <RadioButton
                    inline
                    type="radio"
                    name="accept"
                    number="agree"
                    label="I agree"
                    defaultChecked={false}
                  />
                  <RadioButton
                    inline
                    type="radio"
                    name="accept"
                    number="diagree"
                    label="I diagree"
                    defaultChecked={false}
                  />
                </div>
              </div>
              <div className="plans-info-agreement-section">
                <div className="plans-info-text">
                  <p>{translate("p_tab_plans_agreement_label")}</p>
                </div>
                <div className="terms-condition">
                  <CheckBox
                    name="service-agreement"
                    number="service-agreement"
                    label={translate("p_tab_services_agreement_checkbox")}
                  />
                  <CheckBox
                    name="privacy-policy"
                    number="privacy-policy"
                    label={translate("p_tab_privacy_checkbox")}
                  />
                  <CheckBox
                    name="marketing"
                    number="marketing"
                    label={translate("p_tab_marketing_label")}
                  />
                </div>
                <div className="payment-buttons">
                  <Button bsStyle="warning" fill>
                    {translate("p_continue_button")}
                  </Button>
                </div>
              </div>
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
            <div className="plans-view" />
          </div>
        );
    }
    return (
      <div>
        <div className="nav-container">
          <ul className="nav-icons nav-icons-tabs nav">
            <li
              className={className({
                disabled: activeTabs !== 1,
                active: activeTabs < 2
              })}
            >
              <a>
                <i>1</i>
                <span>{translate("p_tab_link_apply")}</span>
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
                <span>{translate("p_tab_link_payment")}</span>
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
      </div>
    );
  }
}

Tabs.propTypes = {
  translate: PropTypes.func.isRequired
};

export default Tabs;
