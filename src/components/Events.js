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
    try {
      const result = await getData(limit, startIndex, selectedTag)
      setData(result.data.data)
      setTags(result.data.availableTags)
      setIsLoaded(true)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(async () => {
    try {
      const result = await getData(limit, startIndex, selectedTag)
      const updatedData = [...data]

      result &&
        result.data.data.forEach(item => {
          updatedData.push(item)
        })

      setData(updatedData)
      setIsLoaded(true)
    } catch (error) {
      console.log(error)
    }
  }, [startIndex])

  useEffect(async () => {
    try {
      const result = await getData(limit, startIndex, selectedTag)
      setData([])

      if (startIndex === 0) {
        setData(result.data.data)
      } else {
        setStartIndex(0)
      }

      setIsLoaded(true)
    } catch (error) {
      console.log(error)
    }
  }, [selectedTag])

  const handleChange = event => {
    setSelectedTag(event.target.value)
  }

  const getData = async (limit, startIndex, tag) => {
    try {
      return await axios.get(`${process.env.REACT_APP_BASEURL}/events/?limit=${limit}&start=${startIndex}&tag=${tag}`)
    } catch (error) {
      setErrorMessage('Failed to fetch data from backend')
      throw new Error(error)
    }
  }

  const handleLoadMore = () => {
    setStartIndex(limit + startIndex)
  }

  return (
    <div>
      <h3 className="sub-header">Events</h3>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div>
          <AvailableTags tags={tags} handleChange={handleChange} newTag={selectedTag} />
          <div className="eventsContainer">
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
      )}
    </div>
  )
}

export default Events
