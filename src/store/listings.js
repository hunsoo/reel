import firebase from 'firebase';

//ACTION TYPES

const GET_LISTINGS = 'GET_LISTINGS';
const ADD_LISTING = 'ADD_LISTING';



//THUNKS

export const fetchListings = () => dispatch => {
  firebase.database().ref('/listings/')
  .on('value', data => {
    dispatch({ type: GET_LISTINGS, listings: data.val() });
  });
}

export const addListing = listing => dispatch => {
  const ref = firebase.database().ref('/listings/');
  const key = ref.push().key;
  ref.child(key).update({...listing, id: key});
  ref.on('child_added', data => {
    dispatch({ type: ADD_LISTING, listing: data.val() });
  });
}

export default (state = {}, action) => {
  switch (action.type) {
    case GET_LISTINGS:
      return action.listings;
    case ADD_LISTING:
      return [...state, action.listing];
    default:
      return state;
  }
}
