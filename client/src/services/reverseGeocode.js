import { GOOGLE_API_KEY } from '../config/env'

export const reverseGeocode = (lat, lng, setAddress) => {
  let address
  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      address = data.results[0].formatted_address
      setAddress(address)
    })
    .catch((err) => console.warn(err.message))
}
