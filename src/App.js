import React, { useState } from 'react'

import CssBaseline from '@mui/material/CssBaseline'

import Footer from './Footer'
import Header from './Header'
import MapModal from './MapModal.js'
import UseMapMap from './UseMapMap'

import useFeatures from './hooks/useFeatures'
import useLinkedIDs from './hooks/useLinkedIDs'
import usePlaces from './hooks/usePlaces'

import { toLatLng } from './utils/utils.js'

function App () {
  const [location, setLocation] = useState([-1.471061, 50.9382])
  const [showBuildingHeights, setShowBuildingHeights] = useState(false)
  const [showBuildingModal, setShowBuildingModal] = useState(false)
  const [showMapPopup, setShowMapPopup] = useState(false)
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [selectedFeature, setSelectedFeature] = useState(null)

  const { getFeatureFromTOID } = useFeatures()
  const { getLinkedIDsFromUPRN } = useLinkedIDs()
  const { getPlaceFromTOID } = usePlaces()

  /*
    This function is called when the user selects a place from the autocomplete search. It ensures the
    feature information is up to date and then calls the function to update the app
    state with the new building information.
  */
  const selectBuildingFromPlace = async place => {
    const linkedIDs = await getLinkedIDsFromUPRN(place.UPRN)
    const toid = linkedIDs.correlations.find(
      c => c.correlatedFeatureType === 'TopographicArea'
    ).correlatedIdentifiers[0].identifier
    const feature = await getFeatureFromTOID(toid)
    setBuildingInformation(place, feature)
  }

  /*
    This function is called when the user clicks on a building on the map. It ensures the
    feature and place information is up to date and then calls the function to update the app
    state with the new building information.
  */
  const selectBuildingFromTOID = async toid => {
    const feature = await getFeatureFromTOID(toid)
    const place = await getPlaceFromTOID(toid)
    if (place && feature) {
      setBuildingInformation(place, feature)
    }
  }

  /*
    The app holds state for selected feature and place (both related to buiding). This function
    sets them from the relevant search or action. It also sets the location of the map
    to the building and shows the map tooltip style popup.
  */
  const setBuildingInformation = (newPlace, newFeature) => {
    const latLng = toLatLng({
      ea: newPlace.X_COORDINATE,
      no: newPlace.Y_COORDINATE
    })
    setSelectedFeature(newFeature)
    setSelectedPlace(newPlace)
    setLocation([latLng.lng, latLng.lat])
    setShowMapPopup(true)
  }

  return (
    <>
      <CssBaseline />
      <Header
        showBuildingHeights={showBuildingHeights}
        setShowBuildingHeights={setShowBuildingHeights}
        onSearchComplete={selectBuildingFromPlace}
      />
      <UseMapMap
        location={location}
        selectedPlace={selectedPlace}
        showBuildingModal={showBuildingModal}
        showMapPopup={showMapPopup}
        showBuildingHeights={showBuildingHeights}
        setShowBuildingModal={setShowBuildingModal}
        setShowMapPopup={setShowMapPopup}
        selectBuildingFromTOID={selectBuildingFromTOID}
      />
      <MapModal
        selectedPlace={selectedPlace}
        selectedFeature={selectedFeature}
        showModal={showBuildingModal}
      />
      <Footer />
    </>
  )
}

export default App
