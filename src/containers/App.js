import React from 'react';
//import logo from '../logo.svg';
import './App.css';
import Items from '../components/Items/Items'
import Invoice from '../components/Invoice/Invoice'

class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
        }

    }

    render() {
        return (
            <div className='container'>
                <header></header>
                <main>
                    <Items />

                    <Invoice items={this.state.invoiceItems} />
                </main>
                <footer>
                    &copy; Copyright 2020, InYourDream Inc. All rights reserved.
                </footer>
            </div>
        )
    }
}

export default App;
