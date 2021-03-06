import React from 'react';
import SingleParkFromList from './SingleParkFromList';
import Navbar from './Navbar';

class ParkList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      isFiltered: false,
      parks: [],
      preFiltered: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeFilter = filterType => {
    let parksCopy = this.state.parks.slice();
    switch (filterType) {
      case 'rating':
        parksCopy.sort((a, b) => {
          return b.rating - a.rating;
        });
        this.setState({ parks: parksCopy });
        break;
      case 'views':
        parksCopy.sort((a, b) => {
          return b.views - a.views;
        });
        this.setState({ parks: parksCopy });
        break;
      case 'distance':
        parksCopy.sort((a, b) => {
          return (
            a.parkCoordinates.lat -
            b.parkCoordinates.lat +
            a.parkCoordinates.lang -
            b.parkCoordinates.lang
          );
        });
        this.setState({ parks: parksCopy, isFiltered: false });
        break;
    }
  };

  filterByTag = tagName => {
    const { parks } = this.state;
    if (this.state.isFiltered === false) {
      this.setState({ preFiltered: parks, isFiltered: true }, () => {
        const result = this.state.preFiltered.filter(parkElement =>
          parkElement.tags.includes(tagName)
        );
        this.setState({ parks: result });
      });
    } else {
      const result = this.state.preFiltered.filter(parkElement =>
        parkElement.tags.includes(tagName)
      );
      this.setState({ parks: result });
    }
  };

  componentDidMount() {
    fetch('/api/parks')
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

  gettingParks = () => {
    const { error, isLoaded, parks } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <section>
          {parks.map((park, i) => <SingleParkFromList key={i} park={park} />)}
        </section>
      );
    }
  };

  handleSubmit(e) {
    e.preventDefault();
    const query = e.target.searchInput.value
      .toLowerCase()
      .split(' ')
      .join('');
    fetch(`/api/parks/city/${query}`)
      .then(res => res.json())
      .then(result => {
        this.setState({
          isLoaded: true,
          parks: result
        });
      });
  }

  render() {
    return (
      <div>
        <Navbar
          changeFilter={this.changeFilter}
          location={this.props.location.pathname}
          filterByTag={this.filterByTag}
          handleSubmit={this.handleSubmit}
        />
        {this.gettingParks()}
      </div>
    );
  }
}

export default ParkList;
