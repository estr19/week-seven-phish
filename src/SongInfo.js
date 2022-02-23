import React, {useState} from 'react';
import {useEffect} from 'react';
import './App.css';

function SongInfo() {

  const MY_KEY = '9F88FFD6577D0257D407'; /* 9517eac82dd965a3ebe3904055e2b13a */
  const [mySearch, setMySearch] = useState('');
  const [mySongs, setMySongs] = useState([]);
  const [submitted, setSubmitted] = useState('first-tube');

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://api.phish.net/v5/setlists/slug/${submitted}.json?&apikey=${MY_KEY}`); /*  */
      const data = await response.json();
      const newArray = (data.data.slice(-10)).reverse();
      console.log(newArray);
      setMySongs(newArray);
    }
    fetchData();
  }, [submitted]); /*  */

  const mySongSearch = (e) => {
    setMySearch(e.target.value.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,''));
  }

  const finalSearch = (e) => {
    e.preventDefault();
    setSubmitted(mySearch);
    setMySearch('');
  }

  return (
    <div>
      <div className="container">
        <h1 className='gradient-text'>Phish Song Phinder</h1>
        <h3>Enter a song name, and check out when and where it was played most recently.</h3>
        <form onSubmit={finalSearch}>
          <input className='search' placeholder='Look up a song, any song!' onChange={mySongSearch} value={mySearch} ></input>
          {/* <button>I'm feeling lucky!</button> */}
        </form>
      </div>
      <div className='list'>
        {mySongs.map((item => {
          const {song, showdate, country, tourname, artist_name, city, state, permalink} = item;
          return (
            <div key={item.id} className='item' style={{backgroundColor: 'rgba(245, 144, 137, 0.75)'}}>
              <h2>{song}</h2>
              <p>{artist_name}</p>
              <p>{city}, {state} {country}</p>
              <p>{showdate}</p>
              <p>{tourname}</p>
              <br></br>
              <a href={permalink} target='_blank' rel="noreferrer">Check out full setlist here</a>
            </div>
          )
        }))}
      </div>
    </div>
  )
}

export default SongInfo;