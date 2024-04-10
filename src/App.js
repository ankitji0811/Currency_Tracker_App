import React from "react";
import ReactDOM from "react-dom/client";
import { useState, useEffect } from "react";
import Coin from "./components/Coin";

const App = () => {
  const [coins, setCoins] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );

    const json = await data.json();

    setCoins(json);

    console.log(json);
  };

  const filterCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search Currency</h1>
        <form>
          <input
            type="text"
            placeholder="Search"
            className="coin-input"
            onChange={(e) => {
              setSearchText(e?.target?.value);
            }}
          ></input>
        </form>
      </div>
      {
        filterCoins?.map(coin => {
            return (
                <Coin key={coin?.id} data={coin}/>
            )
        })
      }
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
