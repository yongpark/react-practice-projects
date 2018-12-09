import React, { Component } from 'react';
import axios from 'axios';

import SearchBar from '../searchBar/searchBar';
import DayCard from '../dayCard/dayCard';
import './weatherApp.css'

export default class WeatherApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherData: null,
      cityName: null,
      avgWeather: null,
    }
    this.fetchWeatherData = this.fetchWeatherData.bind(this);
    this.getAverages = this.getAverages.bind(this);
  };

  async fetchWeatherData(city)  {
    try {
      let response = await axios.get('http://api.openweathermap.org/data/2.5/forecast?', {
        params: {
          APPID: 'c392eb67e8333bae50b26502e450d3b6',
          q: city,
          units: 'imperial',
        }
      })
      const cityName = response.data.city.name;
      const responseData = response.data.list;
      this.parseWeatherDataByDays(responseData, cityName)
      this.getAverages();
    } catch(error) {
      console.error(error);
    }
  }

  parseWeatherDataByDays(apiResponse, cityName) {
    let weatherData = [];
    let singleDayData = [];
    for (var i = 0; i < apiResponse.length; i++) {
      if (singleDayData.length === 0) {
        singleDayData.push(apiResponse[i])
      }
      else if (new Date(singleDayData[0].dt * 1000).getDay() != new Date(apiResponse[i].dt * 1000).getDay()) {
        weatherData.push(singleDayData)
        singleDayData = [];
      } else {
        singleDayData.push(apiResponse[i])
      };
    }
    this.setState({ weatherData, cityName, avgWeather: null })
  }

  getAverages() {
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let avgWeather = [];
    this.state.weatherData.forEach( (day) => {
      let dayData = {}
      let minTemp = 200;
      let maxTemp = 0;
      let dayOfWeek = weekDays[new Date(day[0].dt * 1000).getDay()];
      //taking first weather descriptor. can get avg later
      let weather = day[0].weather[0].description;
      let weatherIcon = day[0].weather[0].icon
      day.forEach( (threeHours) => {
        minTemp = (minTemp > threeHours.main.temp_min ? threeHours.main.temp_min : minTemp);
        maxTemp = (maxTemp < threeHours.main.temp_max ? threeHours.main.temp_max : maxTemp)
      })
      dayData['dayOfWeek'] = dayOfWeek.slice(0, 3);
      dayData['minTemp'] = Math.round(minTemp) + '°'
      dayData['maxTemp'] = Math.round(maxTemp) + '°';
      dayData['weather'] = weather;
      dayData['iconURL'] = 'http://openweathermap.org/img/w/' + weatherIcon.toString() + '.png';
      avgWeather.push(dayData);
    })
    this.setState({avgWeather});
  }

  renderWeatherDays() {
    return this.state.avgWeather.map( (day) =>
      <DayCard
        dayOfWeek={day.dayOfWeek}
        minTemp={day.minTemp}
        maxTemp={day.maxTemp}
        weather={day.weather}
        iconURL={day.iconURL}
      />
    )
  }

  render() {
    return (
      <div className='weather-app'>
        <SearchBar fetchWeatherData={this.fetchWeatherData} />
        <div className='weather-card-container'>
          {this.state.avgWeather ? this.renderWeatherDays() : null}
        </div>
      </div>
    )
  }
}

