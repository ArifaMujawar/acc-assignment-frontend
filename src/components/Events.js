import axios from 'axios'
import React, { useEffect, useState } from 'react'

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
      {data && data.map(event => <p>{event && event.name}</p>)}
      <button onClick={() => handleLoadMore()}>Load more</button>
    </div>
  )
}

export default Events
