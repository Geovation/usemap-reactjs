import { useState } from 'react'
import { LinkedIDsAPI } from '../api/linkedidsAPI'

const useLinkedIDs = () => {
  const [loading, setLoading] = useState(false)
  const [linkedIDs, setLinkedIDs] = useState(null)

  const getLinkedIDsFromUPRN = (uprn) => {
    LinkedIDsAPI.getLinkedIDsFromUPRN(uprn).then((response) => {
      setLoading(true)
      return response
    })
      .then((response) => {
        setLoading(false)
        setLinkedIDs(response)
        console.log(linkedIDs)
      })
  }

  return { loading, linkedIDs, getLinkedIDsFromUPRN }
}

export default useLinkedIDs
