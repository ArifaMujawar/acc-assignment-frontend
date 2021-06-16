import React from 'react'
import useFetch from 'react-fetch-hook'

const Places = () => {
  const { isLoading, error, data } = useFetch('http://localhost:4000/places/?languageFilter=en')

  if (isLoading) return 'Loading...'
  if (error) return 'Error..'

  return <div>{data && data.map(place => <p>{place.name}</p>)}</div>
}

export default Places
