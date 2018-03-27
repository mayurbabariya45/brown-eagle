import React,{Component} from 'react';
import wNumb from 'wnumb';
import noUiSlider from 'nouislider';
import Nouislider from 'react-nouislider';
class Filters extends Component{
    componentDidMount(){
        // var priceFilter = document.getElementById('price-filter');
        // noUiSlider.create(priceFilter, {
        //     start: [ 20, 60 ],
        //     tooltips: false,
        //     range: {
        //         min: 0,
        //         max: 100
        //     },
        //     connect: true,
        // });
    }
    render(){
        return(
            <div>
                <div className="section-header filter-header">
                    <div className="title">
                        <h5>Filters</h5>
                    </div>
                    <div className="filter-clear">
                        <span>Clear all</span>
                    </div>
                </div>       
                <div className="section-header filter-categories">
                    <div className="title">
                        <h6>CATEGORIES</h6>
                    </div>
                    <div className="filter-category">
                        <div className="category">

                        </div>
                    </div>
                </div>       
                <div className="section-header filter-products-price">
                    <div className="title">
                        <h6>price</h6>
                    </div>
                    <div className="filter-clear">
                        <span>Clear</span>
                    </div>
                    <div className="price-filter">
                    <Nouislider
                        range={{min: 0, max: 100}}
                        start={[20,60]}
                        connect
                    />   
                    </div>
                </div>                        
            </div>
        )
    }
}
export default Filters;