import { useState } from 'react'

import { LinkedIDsAPI } from '../api/linkedIDsAPI'

const useLinkedIDs = () => {
  const [loadingLinkedIDs, setLoadingLinkedIDs] = useState(false)
  const [linkedIDs, setLinkedIDs] = useState(null)

  const getLinkedIDsFromUPRN = async uprn => {
    setLoadingLinkedIDs(true)
    const response = await LinkedIDsAPI.getLinkedIDsFromUPRN(uprn)
    setLoadingLinkedIDs(false)
    setLinkedIDs(response)
    return response
  }

  return { loadingLinkedIDs, linkedIDs, getLinkedIDsFromUPRN }
}

export default useLinkedIDs
