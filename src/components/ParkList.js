import React from 'react';

class ParkList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      parks: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:6060/api/allparks')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            parks: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  getingParks = () => {
    const { error, isLoaded, parks } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>{parks.map(item => <li key={item.parkId}>{item.parkDesc}</li>)}</ul>
      );
    }
  };

  render() {
    return <div>{this.getingParks()}</div>;
  }
}

export default ParkList;
