
import { connect } from 'react-redux';
import {reduxForm } from 'redux-form';
import NewsLetter from '../../components/NewsLetter/NewsLetter';

const mapDispatchToProps = (dispatch) => ({
})
const mapStateToProps = (state) => ({
    newsLetter: state.newsLetter
})
const mergeProps = (state,actions,ownProps) => ({
    ...state,
    ...actions,
    ...ownProps
})

export default connect(mapStateToProps,mapDispatchToProps,mergeProps)(reduxForm({
    form: 'newsLetterForm'
})(NewsLetter));