import _ from "lodash";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import RequestQuotation from "../../views/Quotation/RequestQuotation";
import formValidationScroller from "../../variables/FormValidationScroller";
import * as a from "../../actions/Quotation/Quotation_actions";

const mapDispatchToProps = dispatch => ({
  getCategories: () => dispatch(a.getCategories()),
  createQuotation: (value, locale) =>
    dispatch(a.createQuotation(value, locale)),
  dropQuotationImages: files => dispatch(a.dropQuotationImages(files)),
  removeQuotationImages: files => dispatch(a.removeQuotationImages(files)),
  flushQuotationImages: () => dispatch(a.flushQuotationImages()),
  flushCreateQuotation: () => dispatch(a.flushCreateQuotation()),
  addQuotationImages: (images, id, locale) =>
    dispatch(a.addQuotationImages(images, id, locale))
});
const mapStateToProps = state => ({
  ...state.quotation
});
const mergeProps = (state, actions, ownProps) => ({
  ...state,
  ...actions,
  ...ownProps,
  createQuotation: (values, locale) => {
    actions.createQuotation(values, locale).then(response => {
      if (response.type === "ADD_QUOTATION_SUCCESS") {
        ownProps.success("Quotation has been sent successfully.");
        const quotationId = response.payload.id;
        _.forEach(state.quotationImages, image => {
          actions.addQuotationImages(image.formData, quotationId, locale);
        });
        ownProps.history.push("/my_account");
        return false;
      }
      const { errors, message } = response.payload.response;
      if (errors && errors.length > 0) {
        _.map(errors, error => ownProps.error(error.messages));
        return false;
      }
      ownProps.error(message);
      return false;
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  reduxForm({
    form: "requestQuotationForm",
    onSubmitFail: errors => formValidationScroller(errors)
  })(RequestQuotation)
);
