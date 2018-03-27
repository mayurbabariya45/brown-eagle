import { connect } from 'react-redux';
import Products from '../../views/Products/Products';
const mapDispatchToProps = (dispatch) => ({
})
const mapStateToProps = (state) => ({
    ...state.product
})
const mergeProps = (state,actions,ownProps) => ({
    ...state,
    ...actions,
    ...ownProps
})

export default connect(mapStateToProps,mapDispatchToProps,mergeProps)(Products);