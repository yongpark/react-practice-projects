import React, { Component } from 'react';
import './searchBar.css';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: 'Enter City',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    let change = { [e.target.name]: e.target.value }
    this.setState(change)
  }

  handleClick(e) {
    this.setState({searchInput: ''});
  }

  render() {
    const { fetchWeatherData } = this.props;
    return (
      <div className='search-container'>
        <input
          name='searchInput'
          value={this.state.searchInput}
          onChange={this.handleChange}
          className='search-bar'
          onClick={this.handleClick}
        />
        <button
          onClick={() => {fetchWeatherData(this.state.searchInput)}}
          className='search-button'
        >
        Search
        </button>
      </div>
    )
  }
}
