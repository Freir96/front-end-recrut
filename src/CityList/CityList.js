import React from 'react';
import './style.css';
import Panel from '../Panel/Panel';
import AutoTextInput from '../TextInput/AutoTextInput'

const fetch = require('node-fetch');

export default class CityList extends React.Component {
    constructor(params) {
        super(params);
        this.state = {
            citys: [],
            options: ["Poland", "Germany", "Spain", "France"],
            shortOptions: ["PL", "DE", "ES", "FR"],
            panels: [],
            short: -1,
            showList: true,
        }
        //this.arr = []
        this.textInput = React.createRef();
        //this.getCitys()
        //console.log('bip', this.state.citys);
    }

    getShortText(text) {
        //const text = this.state//this.textInput.getText();
        let index = this.state.options.indexOf(text);
        console.log(text, index)
        if (index === -1)
            this.setState({ short: -1 });
        else
            this.setState({ short: this.state.shortOptions[index] });
    }

    async getCitys() {
        var country = 'Poland';
        var body = {
            country: country,
            order_by: 'count',
            limit: 10,

        }
        var param = 'limit=' + 10 + '&country=' + country + '&order_by=value&sort=desc'
        const citys = await fetch('https://api.openaq.org/v1/cities?limit=10&country=' + this.state.short, { method: 'GET', body: null })
            .then(res => res.json()) // expecting a json response
            .catch((error) => {//then(json => console.log('bip', json)).
                console.log('bip error', error);
            });
        console.log('bip', citys.results, citys.results.length)
        this.citys = JSON.stringify(citys.results)
        //console.log('bip3', citys)
        this.citylist = citys.results;
        const arr = [];
        citys.results.map(city => { arr.push(city.city) })
        console.log('bip4', arr)
        this.setState({ citys: arr })
        
        console.log('bip6', this.state.citys)
        /*var arr = [];
        for(var i = 0; citys.results.length; i++) {
          arr.push(citys.results[i])
          //console.log('bip2', arr[i])
        }*/
        //console.log('bip', arr)
        //this.setState({citys: arr})
        //return arr;
        //this.setState({citys: citys.results})
        //return citys.results;
    }

    search() {
        //this.setState({ showList: true });
        console.log('bip')
        this.getCitys();
        console.log('bip5', this.state.citys)
    }

    updateText(text) {
        this.getShortText(text.replace(' ', ''));
    }

    getName(index) {
        return this.state.citys[index];
    }

    render() {
        return (
            <div className="App">
                <h1>City list</h1>
                <AutoTextInput onChange={(text) =>this.updateText(text)} ref={(ref) => this.textInput=ref} />
                <button class="butn" onClick={() =>this.search()} type="button" disabled={this.state.short === -1}>Find</button>
                {this.state.showList &&
                this.state.citys.map((city, index)=> <Panel name={city} key={index} index={index} getName={(index)=>{return this.getName(index)}}/>)
                }
                <ol>
                    {//this.getCitys().map(reptile => <li>{reptile}</li>)
                    }
                </ol>
            </div>
        );
    }

}
