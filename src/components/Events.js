import axios from 'axios'
import React, { useEffect, useState } from 'react'

import EventCard from '../containers/EventCards'
import Button from '@material-ui/core/Button'
import AvailableTags from '../containers/AvailableTags'

const Events = () => {
  const [startIndex, setStartIndex] = useState(0)
  const [data, setData] = useState([])
  const [error, setErrorMessage] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [tags, setTags] = useState([])
  const [selectedTag, setSelectedTag] = useState('General')
  const limit = 10

  useEffect(async () => {
    const result = await getData(limit, startIndex, selectedTag)
    if (!result.data.data.length === 0) setErrorMessage('Error fetching events...')
    setData(result.data.data)
    setTags(result.data.availableTags)
    setIsLoaded(true)
  }, [])

  useEffect(async () => {
    const result = await getData(limit, startIndex, selectedTag)
    const updatedData = [...data]
    if (!result.data.data) setErrorMessage('Error fetching events...')

    result.data.data.forEach(item => {
      updatedData.push(item)
    })

    setData(updatedData)
    setIsLoaded(true)
  }, [startIndex])

  useEffect(async () => {
    const result = await getData(limit, startIndex, selectedTag)

    if (!result.data.data) setErrorMessage('Error fetching events...')
    console.log('Result is: ', result.data.data)

    setData([])

    if (startIndex === 0) {
      setData(result.data.data)
    } else {
      setStartIndex(0)
    }

    setIsLoaded(true)
  }, [selectedTag])

  const handleChange = event => {
    setSelectedTag(event.target.value)
  }

  const getData = async (limit, startIndex, tag) => {
    try {
      return await axios.get(`${process.env.REACT_APP_BASEURL}/events/?limit=${limit}&start=${startIndex}&tag=${tag}`)
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
      <AvailableTags tags={tags} handleChange={handleChange} newTag={selectedTag} />
      <div className="eventsContainer">
        {error ? error : ''}
        {!isLoaded ? <div className="loading">Loading...</div> : ''}
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
