import firebase from 'firebase';

//ACTION TYPES

const GET_LISTING_DETAIL = 'GET_LISTING_DETAIL';
const SELECT_LISTING = 'SELECT_LISTING';

//THUNKS

export const fetchListing = (id) => dispatch => {
  firebase.database().ref('/listings/' + id)
    .on('value', data => {
      dispatch({ type: GET_LISTING_DETAIL, listing: data.val() });
    });
}

export const selectListing = listing => dispatch => {
  return dispatch({ type: SELECT_LISTING, listing});
}

export default (state = {}, action) => {
  switch (action.type) {
    case GET_LISTING_DETAIL:
      return action.listing;
    case SELECT_LISTING:
      return action.listing;
    default:
      return state;
  }
}
