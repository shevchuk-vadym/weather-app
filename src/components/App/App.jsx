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
    location: '',
    forecast: [],
    isLoading: true,
    geolocation: { lon: -0.118092, lat: 51.509865 },
  };
  getCoords = async () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { longitude, latitude } = pos.coords;

        this.setState(
          {
            geolocation: { lon: longitude, lat: latitude },
          },
          () => this.updateWeatherData()
        );
      });
    } else {
      console.log('FUCK OFF');
    }
    console.log(this.state.geolocation);
  };

  getLocationWeather = async () => {
    try {
      const requestUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${REACT_APP_APP_ID}&lat=${this.state.geolocation.lat}&lon=${this.state.geolocation.lon}&units=metric`;
      const response = await fetch(requestUrl);
      const data = await response.json();
      this.setState({ currentDayWeather: new Weather(data) });
    } catch (e) {
      console.log(e);
      this.setState({ error: true });
    }
  };

  getWeatherByName = async () => {
    try {
      const requestUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${REACT_APP_APP_ID}&q=${this.state.location}&units=metric`;
      const response = await fetch(requestUrl);
      const data = await response.json();
      this.setState({
        currentDayWeather: new Weather(data),
        location: data.name,
        gelocation: data.coord,
      });
    } catch (e) {
      console.log(e);
      this.setState({ error: true });
    }
  };

  getForecast = async () => {
    try {
      const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?appid=${REACT_APP_APP_ID}&lat=${this.state.geolocation.lat}&lon=${this.state.geolocation.lon}&units=metric&cnt=40`;
      const response = await fetch(requestUrl);
      const data = await response.json();
      const dayliForecast = reduceForecast(data.list);
      this.setState({ forecast: dayliForecast });
    } catch (e) {
      console.log(e);
      this.setState({ error: true });
    }
  };

  updateWeatherData() {
    this.setState({ isLoading: true });
    return Promise.all([this.getLocationWeather(), this.getForecast()]).then(
      () => this.setState({ isLoading: false })
    );
  }

  componentDidMount() {
    this.getCoords();
  }
  search = (text) => {
    this.setState({ isLoading: true });
    this.setState({ location: text }, async () => {
      await this.getWeatherByName();
      await this.getForecast();
      this.setState({ isLoading: false });
    });
  };

  render() {
    const { isLoading, error, currentDayWeather, location, forecast } =
      this.state;

    if (isLoading) {
      return (
        <div>
          {/* <h2>LOADING...</h2> */}
          <img className='svg_loader' src='./grid.svg' alt='' />
        </div>
      );
    }

    if (error) {
      return <h2>Please reload page!</h2>;
    }

    return (
      <div>
        <MainWeather data={currentDayWeather}>
          <LocationForm
            location={location}
            data={currentDayWeather}
            onSubmit={this.search}
          />
        </MainWeather>
        <DailyWeather forecast={forecast} />
      </div>
    );
  }
}
