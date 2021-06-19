import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PlaceCards from '../containers/PlaceCards'
import Button from '@material-ui/core/Button'

import '../styles/index.css'

const Places = () => {
  const [startIndex, setStartIndex] = useState(0)
  const [data, setData] = useState([])
  const [error, setErrorMessage] = useState('')
  const limit = 10
  const languageFilter = 'fi'
  useEffect(async () => {
    const result = await getData(limit, startIndex)
    if (!result.data.length === 0) setErrorMessage('Error fetching places...')

    setData(result.data.data)
  }, [])

  useEffect(async () => {
    const result = await getData(limit, startIndex)

    const updatedData = [...data]
    if (!result.data.length === 0) setErrorMessage('Error fetching places...')

    result.data.forEach(item => {
      updatedData.push(item)
    })

    setData(updatedData)
  }, [startIndex])

  const getData = async (limit, startIndex) => {
    try {
      return await axios.get(
        `${process.env.REACT_APP_BASEURL}/places/?limit=${limit}&start=${startIndex}&languageFilter=${languageFilter}`
      )
    } catch (e) {
      throw e
    }
  }

  const handleLoadMore = () => {
    setStartIndex(limit + startIndex)
  }

  return (
    <div>
      <h3 className="sub-header">Places</h3>
      <div className="placeContainer">
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
  )
}

export default Places
