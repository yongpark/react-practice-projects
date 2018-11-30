import React, { Component } from 'react';
import './searchBar.css';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: 'San Francisco',
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let change = { [e.target.name]: e.target.value }
    this.setState(change)
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
