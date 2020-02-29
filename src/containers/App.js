import React from 'react';
//import logo from '../logo.svg';
import './App.css';
import Products from '../components/Products/Products'
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
                    <Products />

                    <Invoice items={this.state.invoiceItems} />
                </main>
                <footer></footer>
            </div>
        )
    }
}

export default App;
