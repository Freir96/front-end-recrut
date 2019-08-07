import React from 'react';
import logo from './logo.svg';
import './App.css';
import Panel from '../src/Panel/Panel';
import AutoTextInput from './TextInput/AutoTextInput'
import CityList from './CityList/CityList';

const fetch = require('node-fetch');

class App extends React.Component {
  constructor(params) {
    super(params);
    this.state = {
      citys: [],
      panels: [],
    }
    //this.arr = []
    this.getCitys()
    //console.log('bip', this.state.citys);
  }
  async getCitys() {
    var country = 'Poland';
    var body = {
      country: country,
      order_by: 'count',
      limit: 10,

    }
    var param = 'limit=' + 10 + '&country=' + country + '&order_by=value&sort=desc'
    const citys = await fetch('https://api.openaq.org/v1/cities?limit=10&country=PL', { method: 'GET', body: null })
      .then(res => res.json()) // expecting a json response
      .catch((error) => {//then(json => console.log('bip', json)).
        console.log('bip error', error);
      });
    //console.log('bip', citys.results, citys.results.length)
    this.citys = JSON.stringify(citys.results)
    //console.log('bip3', citys)
    this.citylist = citys.results;
    const arr = [];
    citys.results.map(city => { arr.push(city.city) })
    //console.log('bip4', arr)
    this.setState({ citys: arr })
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



  render() {
    return <CityList/>
    /*
    return (
      <div className="App">
        <h1>City list</h1>
        <AutoTextInput/>
        {
          this.state.citys.map(city => <Panel name={city} />)
        }
        <ol>
          {//this.getCitys().map(reptile => <li>{reptile}</li>)
          }
        </ol>
      </div>
    );*/
  }

}

export default App;
