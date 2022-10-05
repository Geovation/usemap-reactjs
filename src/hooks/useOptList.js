import { useState } from 'react'
import { PlacesAPI } from '../api/placesAPI'

export default function useOptList (query = '') {
  const [optList, setOptList] = useState([])

  function getOptList () {
    return optList
  }

  function generateOptList (q = '') {
    PlacesAPI.autofill(q).then((response) => {
      setOptList(response)
      console.log(optList)
      return optList
    })
  }

  return query == '' ? '' : generateOptList(query)
}
