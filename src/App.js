import React, { useState, useEffect } from 'react';
import { phish } from './phish';
import './App.css';

function App() {
  const [shows, setShows] = useState(phish);
  /*const dateTimes = phish.map(value => value.time); */

  const calculateTimeLeft = () => {
    const meetingDate = new Date("2022-04-21T00:30:00Z");
    const today = new Date();
    const difference = meetingDate - today;
    let timeLeft = {};

    // if (hours < 10) hours = "0" + hours;
    // if (minutes < 10) minutes = "0" + minutes;
    // if (seconds < 10) seconds = "0" + seconds;

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        {":"}{" "}{timeLeft[interval]} {" "}
      </span>
    );
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

  return (
    <div>
      <div className='container'>
        <h1 className='gradient-text'>2022 Phish Spring-Summer Tour</h1>
        <h2>Next show is in{timerComponents.length ? timerComponents : <span>It's show time!</span>}</h2>
      </div>
      <div className='list'>
        {shows.map((element => {
          const {id, date, venue, photo, link, address, tickets, showMap} = element;
          return(
            <div className='item' key={id}>
              <h2>{date}</h2>
              <img src={photo} alt={venue} width='300px'/>
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
