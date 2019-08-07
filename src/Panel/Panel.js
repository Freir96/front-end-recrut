import React from 'react';
import Text from 'react';

const fetch = require('node-fetch');

export default class Panel extends React.Component {
    constructor(params) {
        super(params);
        this.state = {
            name: this.props.name,
            isclicked: false,
            index: this.props.index,
        }
        console.log(this.props.name)
        this.setState({ name: this.props.name })
        this.getName()
        //const citys = await fetch('https://en.wikipedia.org/w/api.php?action=query&titles=San%20Francisco,%20California&prop=revisions&rvprop=content&format=json', { method: 'GET', body: null })
    }

    async getName() {
        var request = require('request');
        var query = 'english';
        var url = `https://en.wikipedia.org/w/api.php?action=opensearch&search="+ ${query} +”&format=json`;
        request(url, function (err, response, body) {
            if (err) {
                var error = 'cannot connect to the server';
                console.log(error);
            } else {
                console.log('body: ', body);
            }
        });
        const description = await fetch('http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=Jimi_Hendrix',
            {
                method: 'GET', mode: 'no-cors', contentType: "application/json; charset=utf-8",
            })
            .then(res => res.json()) // expecting a json response
            .catch((error) => {//then(json => console.log('bip', json)).
                console.log('bip error', error);
            });
        console.log('bip', description)
    }

    render() {
        return (
            <div>
                <button class={this.state.isclicked ? "active" : "accordion"} onClick={() => { this.setState({ isclicked: !this.state.isclicked }) }}>{this.props.getName(this.state.index)}</button>
                {this.state.isclicked &&
                    <div class="panel">
                        <p class>{this.props.getName(this.state.index)}</p>
                    </div>
                }
            </div>
        )
    }
}