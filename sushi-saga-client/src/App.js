import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
  constructor() {
    super()
    this.state = {
      sushiStash: [],
      currentSushis: [],
      emptyPlates: [],
      cashLeft: 100
    }
  }

  componentDidMount() {
    fetch(API)
    .then(r => r.json() )
    .then(allSushis => {
      // store full list in state
      this.setState({sushiStash: allSushis}, () => {
        // initialize first four sushis
        this.setState({currentSushis: this.state.sushiStash.splice(0,4)})
      })
    })
  }

  moreSushi = () => {
    // copy current 4 sushis
    let newSushis = [...this.state.currentSushis]
    newSushis.shift()
    newSushis.push(this.state.sushiStash.shift())
    this.setState({currentSushis: newSushis})
  }

  eatSushi = (id) => {
    // find target sushi
    const targIdx = this.state.currentSushis.findIndex(sushi => sushi.id === id)
    const nomSushi = this.state.currentSushis.slice(targIdx, targIdx+1)[0]
    // make sure customer has enough money
    if (this.state.cashLeft - nomSushi.price >= 0 && !nomSushi.eaten) {
      // deduct money from account
      this.setState({cashLeft: this.state.cashLeft - nomSushi.price})
      // add sushi to eaten
      let newSushis = [...this.state.currentSushis]
      newSushis[targIdx].eaten = true
      this.setState({currentSushis: newSushis})
      // add empty plate
      this.setState({emptyPlates: [...this.state.emptyPlates, nomSushi]})
    }
  }

  render() {
    return (
      <div className="app">
        <SushiContainer sushis={this.state.currentSushis} moreSushi={this.moreSushi} eatSushi={this.eatSushi} />
        <Table cashLeft={this.state.cashLeft} emptyPlates={this.state.emptyPlates} />
      </div>
    );
  }
}

export default App;