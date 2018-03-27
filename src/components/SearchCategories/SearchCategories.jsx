import React, {Component} from 'react'
import {
    Col,
    FormGroup,
    InputGroup,
    FormControl,
    DropdownButton,
    MenuItem,
    Glyphicon
} from 'react-bootstrap';
import Button from '../../elements/CustomButton/CustomButton';
class SearchCategories extends Component {
    render() {
        const {translate} = this.props;
        return (
            <Col xs={7}>
                <FormGroup className="base-top">
                    <InputGroup>
                        <DropdownButton
                            componentClass={InputGroup.Button}
                            className="btn-fill"
                            id="input-dropdown-addon"
                            title={translate('categories')}>
                            <MenuItem key="1">{translate('categories')}</MenuItem>
                            <MenuItem key="2">{translate('books')}</MenuItem>
                            <MenuItem key="3">{translate('baby')}</MenuItem>
                            <MenuItem key="4">{translate('software')}</MenuItem>
                            <MenuItem key="5">{translate('sports')}</MenuItem>
                        </DropdownButton>
                        <FormControl className="form-control-fill" type="text"/>
                        <InputGroup.Button>
                            <Button fill bsStyle="warning"><Glyphicon glyph="search"/></Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
            </Col>
        )
    }
}

export default SearchCategories;