import React, { Component } from 'react';
import axios from 'axios';

import SearchBar from '../searchBar/searchBar.jsx';
import dayCard from '../dayCard/dayCard.jsx';

export default class WeatherApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherData: null,
    }
    this.fetchWeatherData = this.fetchWeatherData.bind(this);
  };

  async fetchWeatherData(city)  {
    try {
      const response = await axios.get('http://api.openweathermap.org/data/2.5/weather?', {
        params: {
          APPID: 'c392eb67e8333bae50b26502e450d3b6',
          q: city,
        }
      })
      console.log(response)
    } catch(error) {
      console.error(error);
    }
  }


  render() {
    return (
      <div className='weather-app'>
        <SearchBar fetchWeatherData={this.fetchWeatherData} />
        <div className='weather-days-container'>
        </div>
      </div>
    )
  }
}

