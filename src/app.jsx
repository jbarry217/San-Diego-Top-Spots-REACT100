import axios from 'axios';
import React, { Component } from 'react';
import TopSpot from './topspot';


class App extends Component {
      constructor(props) {
        super(props);

        this.state = {
                topspots: []
        };
      }

      componentWillMount() {
        // invoking the axios objects 
        axios 
            .get('https://origin-top-spots-api.herokuapp.com/api/topspots') //pass the URL of our external service
            .then(response => response.data)                     // 1st fulfill callback is setup- takes an HTTP response and returns the data property
            .then(topspots => this.setState({ topspots }));      // 2nd fulfill callback. function to merge the provided object with the current object assigned to the this.state 
      }

  render() {
    return (
      <div className='App container'>
        <div className='spots'>
          <h1>San Diego Top Spots</h1>
          <h3>A list of the top places to see in San Diego, California</h3>
        </div>
      {
        this.state.topspots.map(topspot => (
            <TopSpot
                    key={topspot.id}
                    name={topspot.name}
                    description={topspot.description}
                    location={topspot.location}
            />
        ))
      }

      </div>
    );
  }
}

export default App;
