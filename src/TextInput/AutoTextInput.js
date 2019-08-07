import React from 'react';

import TextInput from 'react-autocomplete-input';

import './style.css'

export default class AutoTextInput extends React.Component {
  constructor(props) {
    super(props);

    this.handleRequestOptions = this.handleRequestOptions.bind(this);

    this.state = {
      options: ["Poland", "Germany", "Spain", "France"],
      textVal: '',
      isOnList: false,
    };
  }

  // text in input is "I want @ap"
  handleRequestOptions(part) {
    console.log(part);          // -> "ap", which is part after trigger "@"
    //this.setState({ options: part });
  }

  getText() {
    return this.state.textVal;
  }

  valueChange(val) {
    this.setState({ textVal: val })
    this.props.onChange(val)
    this.setState({ isOnList: this.state.options.indexOf(val) !== -1 })
    console.log(val)
  }

  render() {
    return (
      <div>
        <TextInput class='input' placeholder='Country name' onChange={(val => this.valueChange(val))} trigger='' onRequestOptions={this.handleRequestOptions} options={this.state.options} />
      </div>
    );
  }
}