import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import BlockUi from "react-block-ui";
import CheckBox from "../../elements/CustomCheckbox/CustomCheckbox";

class FilterSeller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { locations, locale, loading, handleLocationFilter } = this.props;
    return (
      <div>
        <div className="section-header filter-header">
          <div className="title">
            <h5>Filters</h5>
          </div>
        </div>
        <div className="section-header filter-categories">
          <div className="title">
            <h6>LOCATIONS</h6>
          </div>
          <div className="filter-category">
            <BlockUi tag="div" blocking={loading}>
              <div className="category">
                <ul>
                  {_.map(locations, location => (
                    <li key={location.id}>
                      <div>
                        <CheckBox
                          name={location.name}
                          number={location.id}
                          label={_.capitalize(location.name)}
                          onClick={handleLocationFilter}
                          value={location.name}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </BlockUi>
          </div>
        </div>
      </div>
    );
  }
}

FilterSeller.propTypes = {};

export default FilterSeller;
