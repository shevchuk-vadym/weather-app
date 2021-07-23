import React from 'react';

export class LocationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }
  handleChange = (event) => {
    console.log(event.target);
    console.log(this);
    this.setState({ value: event.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log(e, this);
    this.props.onSubmit(this.state.value);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label>
          Город:
          {this.props.location}
          <input
            type='text'
            name='location'
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type='submit' value='Отправить' />
      </form>
    );
  }
}
