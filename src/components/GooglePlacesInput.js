import React from 'react';
import { View, Image, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { connect } from 'react-redux';

const googleAPIKey = 'AIzaSyAIF1HJQfwmNCmjuddywTAZhOlqYv8ZBxI';

export default GooglePlacesInput = (props) => {
  const {onPress} = props;
  return (
    <GooglePlacesAutocomplete
      minLength={2}
      autoFocus={false}
      returnKeyType={'default'}
      fetchDetails={true}
      onPress={onPress}
      styles={{
        textInputContainer: {
          backgroundColor: 'rgba(0,0,0,0)',
          borderTopWidth: 0,
          borderBottomWidth: 0
        },
        textInput: {
          marginLeft: 0,
          marginRight: 0,
          height: 36,
          color: '#5d5d5d',
          fontSize: 16
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        },
      }}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: googleAPIKey,
        language: 'en', // language of the results
        types: 'geocode' // default: 'geocode'
      }}

      currentLocation={false}
    />
  );
}
