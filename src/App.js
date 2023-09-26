import { useState, useEffect, useRef } from 'react';
import './App.css';
import LatLon from 'geodesy/latlon-nvector-spherical.js'

import GeoPointList from './GeoPointList';

function App() {

  const [points, setPoints] = useState(() => {
    const storedPoints = JSON.parse(localStorage.getItem('my-locations'))
    return storedPoints || []
  })
  
  const [newPointName, newPointLat, newPointLon] = [useRef(), useRef(), useRef()]

  const [state, setState] = useState({
    myLocation: ''
  })

  useEffect(() => {
    localStorage.setItem('my-locations', JSON.stringify(points))
  }, [points])

  function updateLocation() {
    if (!navigator.geolocation || document.location.protocol !== 'https:') return;
    navigator.geolocation.getCurrentPosition(position => {
      let myLoc = new LatLon(position.coords.latitude, position.coords.longitude)
      setPoints(points => points.map(point => {
        let ll = new LatLon(point.lat, point.lon)
        point.distance = myLoc.distanceTo(ll)
        point.bearing = myLoc.initialBearingTo(ll)
        return point
      }))
      setState(state => {
        state.myLocation = myLoc.toString()
        return state
      })
    })
  }

  function addPoint(e) {
    e.preventDefault()
    const name = newPointName.current.value
    const lat  = newPointLat.current.value
    const lon  = newPointLon.current.value
    setPoints(points => [...points, {name, lat, lon}])
    newPointName.current.value = ''
    newPointLat.current.value = ''
    newPointLon.current.value = ''
  }

  updateLocation()

  return (<>
    <div id="my-location">
      <div className="my-coordinates">{state.myLocation}</div>
      <button onClick={updateLocation}>Обновить местоположение</button>
    </div>
    <GeoPointList points={points} />
    <div id="new-point" className="geoPoint">
      <form onSubmit={addPoint}>
        <input type="text" name="new-point-title" className="geo-point-title" ref={newPointName} placeholder="Название"/>
        <div className="new-point-coordinates">
          <input autocomplete="off" type="number" step="any" name="new-point-lat" ref={newPointLat} placeholder="Широта" />
          <input autocomplete="off" type="number" step="any" name="new-point-lon" ref={newPointLon} placeholder="Долгота" />
        </div>
        <button type="submit">Добавить точку</button>
      </form>
      
    </div>
  </>);
}

export default App;
