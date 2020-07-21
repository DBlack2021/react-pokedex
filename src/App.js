import React, { useState, useEffect } from 'react';
import NavButtons from './NavButtons'
import axios from 'axios';
import './App.css';

function App() {
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
    <>
      <img src={pokeImg} alt={pokeName}/>
      <h1>{pokeName.toUpperCase()}</h1>
      <NavButtons id={pokeId} gotoNextPage={gotoNextPage} gotoPrevPage={gotoPrevPage} />
    </>
  );
}

export default App;
