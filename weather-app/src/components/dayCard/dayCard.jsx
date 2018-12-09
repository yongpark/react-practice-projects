import React, { Component } from 'react';
import './dayCard.css';
export default class DayCard extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   dayOfWeek: this.props.dayOfWeek,
    //   minTemp: this.props.minTemp,
    //   maxTemp: this.props.maxTemp,
    //   weather: this.props.weather,
    //   iconURL: this.props.iconURL,
    // }
  }

  render() {
    const { dayOfWeek, minTemp, maxTemp, weather, iconURL } = this.props;
    return(
      <div className='weather-card'>
        <div className='card-header'>
          {dayOfWeek}
        </div>
        <img
          className='card-image'
          src={iconURL}
          alt={weather}
        />
        <div className='temperatures'>
          <div className='maxTemp'>
            {maxTemp}
          </div>
          <div className='minTemp'>
            {minTemp}
          </div>
        </div>
      </div>
    )
  }
}
