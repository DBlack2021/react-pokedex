import React, { useState, useEffect } from 'react';
import NavButtons from './NavButtons'
import axios from 'axios';
import './Pokedex.css';

export default function Pokedex() {
  const [pokeId, setPokeId] = useState(1);
  const [pokeName, setPokeName] = useState("");
  const [pokeImg, setPokeImg] = useState("");
  const [loading, setLoading] = useState(true);
  const baseUrl = "https://pokeapi.co/api/v2/pokemon"

  useEffect(() => {
    setLoading(true);
    let cancel;
    const currUrl = `${baseUrl}/${pokeId}`
    //code for API fetching inspired by https://github.com/WebDevSimplified/React-Pokemon-Pagination
    axios.get(currUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false);
      setPokeImg(res.data.sprites.front_default);
      setPokeName(res.data.name);
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

  return (
    <div className="container">
        <div className="image">
          <img src={pokeImg} alt={pokeName}/>
        </div>
        
        <div className="title">
          <h1>{pokeId}. {pokeName.toUpperCase()}</h1>
        </div>
        
        <div className="data">
          <p>test</p>
        </div>
        
        <div className="buttons">
          <NavButtons className="buttons" id={pokeId} gotoNextPage={gotoNextPage} gotoPrevPage={gotoPrevPage} />
        </div>
    </div>
  );
}