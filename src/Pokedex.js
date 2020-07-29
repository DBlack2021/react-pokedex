import React, { useState, useEffect } from 'react';
import NavButtons from './NavButtons'
import Pokedata from './Pokedata'
import axios from 'axios';
import './Pokedex.css';

export default function Pokedex() {
  const [pokemon, setPokemon] = useState({});
  const [pokeId, setPokeId] = useState(1);
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
      setPokemon(res);
    }).catch(() => {
      console.err("The promise didn't resolve");
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
      <img className="image" src={res.data.sprites.front_default} alt={res.data.name}/>
      <h1>{pokeId}. {res.data.name.toUpperCase()}</h1>
      <NavButtons id={pokeId} gotoNextPage={gotoNextPage} gotoPrevPage={gotoPrevPage} />
      <Pokedata pokemon={pokemon} />
    </div>
  );
}