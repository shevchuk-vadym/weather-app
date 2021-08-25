import React from 'react';

export class LocationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }
  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
  };
  render() {
    console.log(this.props.data.icon);
    return (
      <div className='Location_form'>
        <form onSubmit={this.onSubmit}>
          <label className='location-form'>
            <input
              type='text'
              name='location'
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type='submit' value='ok' />
        </form>
        {/* <div>
          <img
            src={`http://openweathermap.org/img/wn/${this.props.data.icon}@2x.png`}
            alt=''
          />
        </div> */}
        {/* <div className='location'>
          <h2>Город:</h2>
          <h2>{this.props.data.city}</h2>
        </div> */}
      </div>
    );
  }
}
