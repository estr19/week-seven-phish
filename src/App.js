import React, {useState} from 'react';
import {useEffect} from 'react';
import { phish } from './phish';
import './App.css';
// import SongInfo from './SongInfo';

function App() {
  const [shows, setShows] = useState(phish);
  // const MY_KEY = '9F88FFD6577D0257D407';
  // const [mySearch, setMySearch] = useState('');
  // const [mySongs, setMySongs] = useState([]);
  // const [submitted, setSubmitted] = useState('avocado');
  // const dateTimes = shows.map(value => value.time);

  const runFunctionWithTimes = () => {
    let newObjects = [];
    for (let i = 0; i < shows.length; i++) {
      let show = shows[i];
      let showTime = show.time;
      let showDate = new Date(showTime);
      const today = new Date();
      const difference = showDate - today;
      let minLeft = {};
    
      let displayDays = Math.floor(difference / (1000 * 60 * 60 * 24));
      let displayHours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      let displayMinutes = Math.floor((difference / 1000 / 60) % 60);
      let displaySeconds = Math.floor((difference / 1000) % 60);
    
      if (displayDays < 10) displayDays = "0" + displayDays;
      if (displayHours < 10) displayHours = "0" + displayHours;
      if (displayMinutes < 10) displayMinutes = "0" + displayMinutes;
      if (displaySeconds < 10) displaySeconds = "0" + displaySeconds;
    
      if (difference > 0) {
        minLeft = {
          days: displayDays,
          hours: displayHours,
          minutes: displayMinutes,
          seconds: displaySeconds,
        };
        if (show.minLeft !== minLeft) {
          show = {...show, minLeft};
          newObjects.push(show);
        } else {
          newObjects.push(show);
        }
      }
    }
    return setShows(newObjects);
  }

  useEffect(() => {
    // async function fetchData() {
    //   const response = await fetch(`https://api.phish.net/v5/shows/fee.json?apikey=${MY_KEY}`);
    //   const data = await response.json();
    //   console.log(data);
    //   setMySongs(data.data);
    // }
    // fetchData();
    const tick = setTimeout(() => {
      runFunctionWithTimes();
    }, 1000);
    return () => clearInterval(tick);
  });

  const clickMap = (id) => {
    const newShows = [];
    shows.forEach(show => {
      if (show.id === id) {
        const changedShows = {...show, showMap: !show.showMap};
        newShows.push(changedShows);
      } else {
        newShows.push(show);
      }
    });
    setShows(newShows); 
  }

  // const mySongSearch = (e) => {
  //   setMySearch(e.target.value);
  // }

  // const finalSearch = (e) => {
  //   e.preventDefault();
  //   setSubmitted(mySearch);
  // }

  return (
    <div>
      <div className='container'>
        <h1 className='gradient-text'>Phish Tour SS22</h1>
      </div>
      {/* <div className="container" style={{flexDirection: 'row'}}>
        <form onSubmit={finalSearch}>
          <input className='search' placeholder='search...' onChange={mySongSearch} value={mySearch} ></input>
        </form>
        <button>🍳</button>
      </div>
      {mySongs.map(element => (
        <SongInfo
          key={element.id}
          label={element.recipe.label}
          image={element.recipe.image}
          calories={element.recipe.calories} 
          ingredients={element.recipe.ingredientLines}/>
      ))} */}
      <div className='list'>
        {shows.map((element => {
          const {id, date, venue, photo, link, address, tickets, showMap, minLeft} = element;
          return (
            <div className='item' key={id} style={{backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(' + photo + ')'}}>
              {/* <h2>{timerComponents.length ? timerComponents : <span>It's show time!</span>}</h2> */}
              <h3 style={{fontSize: '1em'}}>Next show is in: {minLeft.days} : {minLeft.hours} : {minLeft.minutes} : {minLeft.seconds}</h3>
              <h2>{date}</h2>
              <h3>{venue}</h3>
              <h4>{address}</h4>
              <div className='btnz'>
                <button className='btnMap' onClick={() => clickMap(id)}>{showMap ? 'hide map' : 'show map'}</button>
                <form action={tickets}>
                  <button type="submit" formTarget='_blank'>Tickets</button>
                </form>
              </div>
              <iframe
                src={link}
                title={venue}
                style={{display: `${showMap ? 'block' : 'none'}`, width: '300px', height: '150px', border: '0', margin: '0.5em 0'}}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          )
        }))}
      </div>
    </div>
  );
}

export default App;
