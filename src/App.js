import React, {useState} from 'react';
import { Phish } from './phish';
import './App.css';

function App() {
  const [shows, setShows] = useState(Phish);

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
      </div>
      <div className='list'>
        {shows.map((element => {
          const {id, date, venue, photo, city, link, address, tickets, showMap} = element;
          return(
            <div className='item' key={id}>
              <h2>{date}</h2>
              <h3>{venue}, {city}</h3>
              <img src={photo} alt={venue} width='300px'/>
              <h4>{address}</h4>
              <form action={tickets}>
                <button type="submit" formTarget='_blank'>Tickets</button>
              </form>
              <p><span className="btn-more" onClick={() => clickMap(id)}>{showMap ? 'hide map' : 'show map'}</span></p>
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
