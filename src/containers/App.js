import React from 'react';
//import logo from '../logo.svg';
import './App.css';
import Items from '../components/Items/Items'
import Invoice from '../components/Invoice/Invoice'
import XButton from '../components/XButton/XButton'
import StatusLight from '../components/StatusLight/StatusLight';

class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
        }

    }

    render() {
        return (
            <div className='container'>
                <header>
                    <XButton text='About' />
                    <XButton text='Settings' />
                </header>
                <main>
                    <Items />

                    <Invoice items={this.state.invoiceItems} />
                </main>
                <footer>
                    <StatusLight state='in-progress' label='syncing' tooltip='Transferring data' />
                    <StatusLight state='green' label='cloud connection' tooltip='Secure & Ready' />
                    <StatusLight state='green' label='disk state' tooltip='Good' />
                </footer>
            </div>
        )
    }
}

export default App;
