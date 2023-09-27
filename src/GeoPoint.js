import React from 'react'

export default function GeoPoint({point, deletePoint}) {
  function handleDeletePoint() {
    deletePoint(point.id)
  }

  return (
    <div className="geoPoint">
      <div className="geo-point-title">{point.name}</div>
      <small className="geo-point-coordinates">{point.lat} {point.lon}</small>
      <div className="geo-point-distance">{prettyPrintDistance(point.distance)}</div>
      <div className="geo-point-bearing">
        <div className="bearing-indicator">
          <div className="bearing-arrow" style={{ rotate: point.bearing + 'deg'}}></div> 
        </div>
        {prettyPrintBearing(point.bearing)}
      </div>
      <div className="geo-point-delete" title="Удалить точку" onClick={handleDeletePoint}></div>
    </div>
  )
}

function prettyPrintDistance(meters) {
  return (meters < 1000)
    ? `${Math.round(meters) } м`
    : `${toPrecise(meters/1000, 1)} км`
}

function toPrecise(num, decPoints) {
  let mag = 10 ** decPoints
  return Math.round(num * mag) / mag
}

function prettyPrintBearing(deg) {
  return `${toPrecise(deg, 1)}°`
}

