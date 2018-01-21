import firebase from 'firebase';

//ACTION TYPES

const GET_LISTING_DETAIL = 'GET_LISTING_DETAIL';
const SELECT_LISTING = 'SELECT_LISTING';
const ADD_NEW_IMAGE_TO_LISTING = 'ADD_NEW_IMAGE_TO_LISTING'

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

export const addNewImage = (listingId, imageURL) => dispatch => {
  const path = '/listings/' + listingId + '/images/';
  const ref = firebase.database().ref('/listings/' + listingId);
  const key = ref.child('/images/').push(imageURL).key;
  ref.on('value', data => {
    dispatch({ type: ADD_NEW_IMAGE_TO_LISTING, listing: data.val() });
  })
}

export default (state = {}, action) => {
  switch (action.type) {
    case GET_LISTING_DETAIL:
      return action.listing;
    case SELECT_LISTING:
      return action.listing;
    case ADD_NEW_IMAGE_TO_LISTING:
      return action.listing;
    default:
      return state;
  }
}
