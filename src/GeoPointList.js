import React from 'react'
import GeoPoint from './GeoPoint'

export default function GeoPointList({ points, deletePoint }) {
  return (
    points.map((point, i) => <GeoPoint key={point.id} point={point} deletePoint={deletePoint} />)
  )
}
