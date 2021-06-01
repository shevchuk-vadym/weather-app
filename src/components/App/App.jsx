import React from 'react';

const appId = process.env;

export class App extends React.Component {
  state = {
    data: undefined,
  };
  async componentDidMount() {
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${appId.REACT_APP_APP_ID}&q=London&units=metric`;
    const response = await fetch(requestUrl);
    const data = await response.json();
    this.setState({ data });
    console.log(this.state.data);
  }
  render() {
    if(!this.state.data || !this.state.data.main) {
      return <h2>LOADING...</h2>
    }
    return (
      <div className='main'>
        <div className='temperature'>{this.state.data.main.temp}</div>
        <div className='temperature'>{this.state.data.hello.test}</div>
        <div className='weather'></div>
        <div className='location'>Город {this.state.data.temp}</div>
      </div>
    );
  }
}
