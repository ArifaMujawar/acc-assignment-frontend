import React from 'react'
import useFetch from 'react-fetch-hook'

const Places = () => {
  const { isLoading, error, data } = useFetch(`${process.env.REACT_APP_BASEURL}/places/?languageFilter=fi&limit=3`)

  if (isLoading) return 'Loading Places...'
  if (error) return 'Error in Places..'

  return <div>{data && data.map(place => <p>{place && place.name}</p>)}</div>
}

export default Places
