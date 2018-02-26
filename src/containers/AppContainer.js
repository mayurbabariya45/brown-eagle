import React,{ Component } from 'react';
import Footer from '../components/Footer/Footer';
import Routes from '../routes/index';
class AppContainer extends Component{
    render(){
        return(
            <div>
                <Routes/>
                <Footer/>
            </div>
        )
    }
}

export default AppContainer;