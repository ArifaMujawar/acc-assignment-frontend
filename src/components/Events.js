import axios from 'axios'
import React, { useEffect, useState } from 'react'

import EventCard from '../containers/EventCards'
import Button from '@material-ui/core/Button'
import '../styles/index.css'

const Events = () => {
  const [startIndex, setStartIndex] = useState(0)
  const [data, setData] = useState([])
  const [error, setErrorMessage] = useState('')
  const limit = 10

  useEffect(async () => {
    const result = await getData(limit, startIndex)
    if (!result.data.data.length === 0) setErrorMessage('Error fetching events...')
    setData(result.data.data)
  }, [])

  useEffect(async () => {
    const result = await getData(limit, startIndex)
    const updatedData = [...data]
    if (!result.data.data) setErrorMessage('Error fetching events...')

    result.data.data.forEach(item => {
      updatedData.push(item)
    })

    setData(updatedData)
  }, [startIndex])

  const getData = async (limit, startIndex) => {
    try {
      return await axios.get(`${process.env.REACT_APP_BASEURL}/events/?limit=${limit}&start=${startIndex}`)
    } catch (e) {
      throw e
    }
  }

  const handleLoadMore = () => {
    setStartIndex(limit + startIndex)
  }

  return (
    <div>
      <h3 className="sub-header">Events</h3>
      <div className="eventsContainer">
        {error ? error : ''}
        {data && data.map((event, index) => event && <EventCard className="event" key={index} event={event} />)}
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

export default Events
