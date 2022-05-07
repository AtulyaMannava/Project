import React, { Component } from 'react'
import CardSection from './components/CardSection';
import ChartSection from './components/ChartSection';
import Header from './components/Header';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      Id: "bitcoin",
      Data: {}
    }
  }
  fetchData = async () => {
    let data = await fetch('https://api.coingecko.com/api/v3/coins/'+ this.state.Id)
    let JsonData = await data.json()
    this.setState({ Id: this.state.Id, Data: JsonData })
  }

  handleSubmit = async (event)=>{
    console.log(event.target.value)
    await this.setState({Id: event.target.value, Data:this.state.Data})
    this.fetchData()
  }

  componentDidMount() {
    this.fetchData()
    this.interval = setInterval(() => this.fetchData(), 2000);

  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <Header handle_Submit = {this.handleSubmit} />
        <CardSection coin_Name={this.state.Data.name} currentPrice={this.state.Data.market_data ? this.state.Data.market_data.current_price["usd"] : ""}
          mk_Cap24={this.state.Data.market_data ? this.state.Data.market_data.market_cap_change_percentage_24h : ""}
          at_high={this.state.Data.market_data ? this.state.Data.market_data.ath.usd : ""} at_low={this.state.Data.market_data ? this.state.Data.market_data.ath.usd : ""}
          sentiment_positive={this.state.Data.sentiment_votes_up_percentage} high_24={this.state.Data.market_data ? this.state.Data.market_data.high_24h["usd"] : ""}
          low_24={this.state.Data.market_data ? this.state.Data.market_data.low_24h["usd"] : ""}
          lastupdated={this.state.Data.last_updated} />
          <ChartSection Id={this.state.Id} price_Changein24={this.state.Data.market_data ? this.state.Data.market_data.price_change_24h_in_currency.usd : ""} 
          Descrpt={this.state.Data.description ? this.state.Data.description.en  : ""}
        MarketCapt={this.state.Data.market_data ? this.state.Data.market_data.market_cap.usd  : ""}
        TotVolm={this.state.Data.market_data ? this.state.Data.market_data.total_volume.usd  : ""}
        Circulating= {this.state.Data.market_data ? this.state.Data.market_data["circulating_supply"] : ""}
        twitter_followers = {this.state.Data.community_data ? this.state.Data.community_data.twitter_followers : ""}
        />
      </div>
    )
  }
}
