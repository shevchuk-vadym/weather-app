import React from 'react';
import './app.css';
import { MainWeather } from '../weather';
import { LocationForm } from '../locationForm';
import { Weather } from '../../Weather';
import { reduceForecast } from '../../Utils';
import { DailyWeather } from '../DailyForecast';
const { REACT_APP_APP_ID } = process.env;
export class App extends React.Component {
  state = {
    currentDayWeather: undefined,
    location: 'London',
    forecast: [],
  };
  getCurrentWeather = async () => {
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${REACT_APP_APP_ID}&q=${this.state.location}&units=metric`;
    const response = await fetch(requestUrl);
    const data = await response.json();
    console.log(data);
    console.log(new Weather(data));
    this.setState({ currentDayWeather: new Weather(data) });
    console.log(this.state.location);
  };

  getForecast = async () => {
    const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=${REACT_APP_APP_ID}&q=${this.state.location}&units=metric&cnt=40`;
    const response = await fetch(requestUrl);
    const data = await response.json();
    const dayliForecast = reduceForecast(data.list);
    console.log(dayliForecast);
    this.setState({ forecast: dayliForecast });
  };

  componentDidMount() {
    this.getCurrentWeather();
    this.getForecast();
  }
  search = (text) => {
    console.log(text);
    this.setState({ location: text }, () => {
      this.getCurrentWeather();
    });
  };

  render() {
    if (!this.state.currentDayWeather) {
      return <h2>LOADING...</h2>;
    }

    return (
      <div>
        <MainWeather data={this.state.currentDayWeather}>
          <LocationForm location={this.state.location} onSubmit={this.search} />
          <DailyWeather forecast={this.state.forecast} />
        </MainWeather>
      </div>
    );
  }
}
