import React from 'react';
import Map from 'react-map-gl';

// eslint-disable-next-line import/no-webpack-loader-syntax
import maplibregl from "!maplibre-gl";
import axios from "axios";

function MapUpMap() {

  let apiKey = "my-api-key";
  let serviceUrl = 'https://api.os.uk/maps/vector/v1/vts';

  // BRANDON TEST AXIOS
  async function find() {
      axios.get('https://api.os.uk/search/names/v1/find?query=Southampton&key=' + apiKey)
      .then(function (response) {
          /* For explanation and debugging purposes we display the full response from the API in the console */
          console.log(JSON.stringify(response.data, null, 2));
      });
  }
  find()
  //

  return (
    <Map
      initialViewState={{
        latitude: 50.9382,
        longitude: -1.471061,
        zoom: 2
      }}
      mapLib={maplibregl}
      style={{ width: '100vw', height: '100vh' }}
      //mapStyle="OS_3857_Light_edited.json"
      //two other ways to get styles: either through an API call or from github raw. take your pick.
      mapStyle={serviceUrl + "/resources/styles?srs=3857&key=" + apiKey}
      //mapStyle="https://raw.githubusercontent.com/OrdnanceSurvey/OS-Vector-Tile-API-Stylesheets/master/OS_VTS_3857_Light.json"
    />

    
  );
}

export default MapUpMap;
