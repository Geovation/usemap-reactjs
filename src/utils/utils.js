import proj4 from 'proj4'

// All borrowed from the os-transform GitHub repository

const _maxBounds = {
  projected: [[0.0, 0.0], [699999.9, 1299999.9]],
  geographic: [[-8.74, 49.84], [1.96, 60.9]]
}

/**
 * Return latlng from an input easting + northing.
 * @param {object} coordinates - The easting + northing to be transformed.
 * @param {integer} decimals - [optional] The specified number of decimal places.
 */
export function toLatLng (coordinates, decimals = 7) {
  const test = _checkBounds(coordinates)
  if (!test.valid) {
    console.log(test.message)
    return {}
  }

  proj4.defs('EPSG:27700', '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs')
  const point = proj4('EPSG:27700', 'EPSG:4326', [coordinates.ea, coordinates.no])

  const lng = Number(point[0].toFixed(decimals))
  const lat = Number(point[1].toFixed(decimals))

  return { lat, lng }
}

export function toBNG (coordinates, decimals = 7) {
  proj4.defs('EPSG:27700', '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs')
  const point = proj4('EPSG:4326', 'EPSG:27700', [coordinates.lng, coordinates.lat])

  const ea = Number(point[0].toFixed(decimals))
  const no = Number(point[1].toFixed(decimals))

  return { ea, no }
}

export function _checkBounds (coordinates) {
  let isValid = true
  if (Object.prototype.hasOwnProperty.call(coordinates, 'ea') && Object.prototype.hasOwnProperty.call(coordinates, 'no')) {
    if ((coordinates.ea < _maxBounds.projected[0][0] || coordinates.ea > _maxBounds.projected[1][0]) ||
            (coordinates.no < _maxBounds.projected[0][1] || coordinates.no > _maxBounds.projected[1][1])) {
      isValid = false
    }
  } else if (Object.prototype.hasOwnProperty.call(coordinates, 'lat') && Object.prototype.hasOwnProperty.call(coordinates, 'lng')) {
    if ((coordinates.lng < _maxBounds.geographic[0][0] || coordinates.lng > _maxBounds.geographic[1][0]) ||
            (coordinates.lat < _maxBounds.geographic[0][1] || coordinates.lat > _maxBounds.geographic[1][1])) {
      isValid = false
    }
  }

  const message = isValid ? '' : 'Coordinates out of range.'

  return { valid: isValid, message }
}
