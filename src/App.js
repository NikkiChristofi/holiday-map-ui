import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import logo from './logo.svg';
import './App.css';

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoicnVuc3luYyIsImEiOiJjajdsdHY2N3cyNHgzMzJ0NTVkeDV5eHFnIn0.S6BvMFX212qFHTY8nPEOWQ'
});

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      holidays: null
    }
  }

  async componentWillMount() {
    const apiRoute = `${process.env.REACT_APP_API_PATH_DOMAIN}`
    const { holidays: { data: holidays } } = await fetch(`${apiRoute}/data`, { method: 'GET' })
      .then(response => response.json())
      .catch(error => console.error('apiFetch error', error))

    console.log('HOLIDAYS', holidays)
    this.setState({ holidays })
  }

  render() {
    const { holidays } = this.state

    return (
      <Map
        style="mapbox://styles/runsync/cjod2bfs43qie2rmmmn6jkd95"
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}
        center={[-0.119634, 34.979101]}
        zoom={[1.63]}>
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15" }}>
            {
              holidays && holidays.map((holiday, index) => (
                <Feature
                  key={holiday.name}
                  coordinates={[holiday.lon, holiday.lat]}
                />
              ))
            }
          </Layer>
      </Map>
    );
  }
}

export default App;
