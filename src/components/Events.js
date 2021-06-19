import axios from 'axios'
import React, { useEffect, useState } from 'react'

import RecipeReviewCard from '../containers/Cards'
import Button from '@material-ui/core/Button'
import '../styles/events.css'

const Events = () => {
  const [startIndex, setStartIndex] = useState(0)
  const [data, setData] = useState([])
  const limit = 3

  useEffect(async () => {
    const result = await getData(limit, startIndex)
    setData(result.data.data)
  }, [])

  useEffect(async () => {
    const result = await getData(limit, startIndex)
    const updatedData = [...data]
    result.data.data.forEach(item => {
      updatedData.push(item)
    })

    setData(updatedData)
  }, [startIndex])

  const getData = async (limit, startIndex) => {
    return await axios.get(`${process.env.REACT_APP_BASEURL}/events/?limit=${limit}&start=${startIndex}`)
  }

  const handleLoadMore = () => {
    setStartIndex(limit + startIndex)
  }

  return (
    <div>
      <h3>Events</h3>
      <div className="eventsContainer">
        {data && data.map(event => event && <RecipeReviewCard className="event" event={event} />)}
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
