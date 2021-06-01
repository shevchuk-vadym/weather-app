import React from 'react';

const appId = process.env;

export class App extends React.Component {
  state = {
    data: [],
  };
  async componentDidMount() {
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${appId.REACT_APP_APP_ID}&q=London&units=metric`;
    const response = await fetch(requestUrl);
    const data = await response.json();
    this.setState({ data });
    console.log(this.state.data);
  }
  render() {
    return (
      <div className='main'>
        <div className='temperature'></div>
        <div className='weather'></div>
        <div className='location'></div>
      </div>
    );
  }
}
