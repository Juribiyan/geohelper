import React from 'react'
import GeoPoint from './GeoPoint'

export default function GeoPointList({ points }) {
  return (
    points.map((point, i) => <GeoPoint key={`point-${i}`} point = { point } />)
  )
}
