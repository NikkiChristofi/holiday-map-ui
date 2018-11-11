import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      holidays: null
    }
  }

  async componentWillMount() {
    const apiRoute = `${process.env.REACT_APP_API_PATH_DOMAIN}`
    const { data: { holidays } } = await fetch(`${apiRoute}/data`, { method: 'GET' })
      .then(response => response.json())
      .catch(error => console.error('apiFetch error', error))

    this.setState({ holidays })
  }

  render() {
    const { holidays } = this.state

    return (
      <div className="App">
       { holidays && (
          holidays.map(hol => (
            <div key={hol.name}>
              <div>{hol.name}</div>
              <div>{hol.location}</div>
            </div>
          ))
        )
       }
      </div>
    );
  }
}

export default App;
