import React from 'react';
//import logo from '../logo.svg';
import './App.css';
import Products from '../components/Products/Products'

class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
        }

    }

    render() {
        return (
            <div>
                <Products />
            </div>
        )
    }
}

export default App;
