import React, { useState, useEffect } from 'react';
import NavButtons from './NavButtons'
import axios from 'axios';
import './Pokedex.css';

export default function Pokedex() {
  //height is in decimeters, weight is in hectograms
  const [pokeId, setPokeId] = useState(1);
  const [pokeName, setPokeName] = useState("");
  const [pokeImg, setPokeImg] = useState("");
  const [weightAndHeight, setWeightAndHeight] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseImgUrl = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" //001.png
  const baseUrl = "https://pokeapi.co/api/v2/pokemon"

  //code adapted from https://stackoverflow.com/questions/2998784/how-to-output-numbers-with-leading-zeros-in-javascript
  const pad = (num, size) => {
    var s = num.toString();
    while (s.length < size) s = "0" + s;
    return s;
  }

  useEffect(() => {
    setLoading(true);
    let cancel;
    const currUrl = `${baseUrl}/${pokeId}`
    //code for API fetching inspired by https://github.com/WebDevSimplified/React-Pokemon-Pagination
    axios.get(currUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false);
      //console.log(res.data);
      setPokeImg(`${baseImgUrl}${pad(pokeId, 3)}.png`);
      setPokeName(res.data.name);
      setWeightAndHeight([res.data.weight, res.data.height]);
    }).catch(() => {
      console.error("The promise didn't resolve");
    })
  }, [pokeId])

  function gotoNextPage() {
    setPokeId(pokeId + 1)
  }

  function gotoPrevPage() {
    setPokeId(pokeId - 1)
  }

  if(loading) return "Loading..."

  const lbs = Math.round(weightAndHeight[0]/4.536 * 10) / 10;

  const realFeet = weightAndHeight[1]/3.048
  const feet = Math.round(realFeet);
  const inches = Math.abs(Math.round((realFeet - feet) * 12)); //TODO: Fix this to display the correct inches

  return (
    <div className="container">

        <div className="title">
          <h1>{pokeId}. {pokeName.toUpperCase()}</h1>
        </div>

        <div className="image">
          <img width="200px" height="200px" src={pokeImg} alt={pokeName}/>
        </div>
        
        <div className="data">
          <p>{lbs} lbs, {feet}'{inches}" </p>
        </div>
        
        <div className="buttons">
          <NavButtons className="buttons" id={pokeId} gotoNextPage={gotoNextPage} gotoPrevPage={gotoPrevPage} />
        </div>
    </div>
  );
}