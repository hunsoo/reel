
//ACTION TYPES

const GET_LOCATION = 'GET_LOCATION';


//THUNKS
const googleAPIKey = 'AIzaSyAIF1HJQfwmNCmjuddywTAZhOlqYv8ZBxI';

export const getLocation = address => async (dispatch) => {
  const encodedAddress = address.split(' ').join('+');
  const res = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress + '&key=' + googleAPIKey);
  const geocoded = await res.json();
  const location = geocoded.results[0].geometry.location;
  dispatch({ type: GET_LOCATION, location});
}

export default (state = {lat: 0, lng: 0}, action) => {
  switch (action.type) {
    case GET_LOCATION:
      return action.location;
    default:
      return state;
  }
}
