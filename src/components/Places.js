import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PlaceCards from '../containers/PlaceCards'
import Button from '@material-ui/core/Button'

const Places = () => {
  const [startIndex, setStartIndex] = useState(0)
  const [data, setData] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setErrorMessage] = useState('')
  const limit = 10
  const languageFilter = 'fi'

  useEffect(async () => {
    try {
      const result = await getData(limit, startIndex)
      if (!result.data.length === 0) setErrorMessage('Error fetching places...')

      setData(result.data.data.places)
      setIsLoaded(true)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(async () => {
    try {
      const result = await getData(limit, startIndex)

      const updatedData = [...data]
      if (!result.data.length === 0) setErrorMessage('Error fetching places...')

      result.data.places.forEach(item => {
        updatedData.push(item)
      })

      setData(updatedData)
      setIsLoaded(true)
    } catch (error) {
      console.log(error)
    }
  }, [startIndex])

  const getData = async (limit, startIndex) => {
    try {
      return await axios.get(
        `${process.env.REACT_APP_BASEURL}/places/?limit=${limit}&start=${startIndex}&languageFilter=${languageFilter}`
      )
    } catch (error) {
      setErrorMessage('Failed to fetch data from backend')
      throw new Error(error)
    }
  }

  const handleLoadMore = () => {
    setStartIndex(limit + startIndex)
  }

  return (
    <div className="places-container">
      <h3 className="sub-header">Places</h3>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div>
          <div className="place-container">
            {error}
            {!isLoaded ? <div className="loading">Loading...</div> : ''}
            {data && data.map((place, index) => place && <PlaceCards className="place" key={index} place={place} />)}
          </div>
          <Button
            className="load-button"
            onClick={() => handleLoadMore()}
            variant="contained"
            color="primary"
            disableElevation
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  )
}

export default Places
