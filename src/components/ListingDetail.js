import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Button } from 'react-native';
import { List, ListItem, Text, Thumbnail, Content, H1, H2 } from 'native-base';
import { ImagePicker, MapView } from 'expo';
import {addNewImage} from '../store/listing';
import {getLocation} from '../store/location';
import firebase from 'firebase';
import GoogleStaticMap from 'react-native-google-static-map';

class ListingDetail extends Component {
  componentDidMount() {
    const { getGeocoded, listing} = this.props;
    getGeocoded(listing.address);
  }

  render() {
    const {listing, location, pickImage, launchCamera} = this.props;
    const images = listing.images ? Object.keys(listing.images).map(id => listing.images[id]) : [];
    const googleAPIKey = 'AIzaSyAIF1HJQfwmNCmjuddywTAZhOlqYv8ZBxI';
    const center = listing.address.split(' ').join('+');
    // const googleMap = 'https://maps.googleapis.com/maps/api/staticmap?center=' + center + '&zoom=15&size=480x640&scale=2&maptype=roadmap&key=' + googleAPIKey;

    return (
      <Content>
        <H1>{listing.address} - {'$'+ listing.price}</H1>
        <H1>{'\n'}</H1>
        <H2>Description</H2>
        <Text>
          {Object.keys(listing.description).reverse().map(key => key + ': ' + listing.description[key] + '\n')}
        </Text>
        <H1>{'\n'}</H1>
        <H2>Exterior</H2>
        <Image
          source={{uri: 'https://maps.googleapis.com/maps/api/streetview?size=400x400&location=' + center +
          '&key=' + googleAPIKey}}
          style={{ height: 300, width: null, flex: 1 }}
        />
        <H1>{'\n'}</H1>
        <H2>Location on the Map</H2>
        <GoogleStaticMap
          style={{ height: 400, width: null, flex: 1 }}
          latitude={''+location.lat}
          longitude={''+location.lng}
          zoom={15}
          size={{ width: 400, height: 400 }}
          apiKey={googleAPIKey}
        />
        <H1>{'\n'}</H1>
        <H2>Images</H2>
        <Button
          title="Add an image from camera roll"
          onPress={pickImage(listing.id)}
        />
        <Button
          title="Take a new picture"
          onPress={launchCamera()}
        />
        <List>
          {images.map((imageURL, i) =>
          <ListItem key={'image-' + i}>
              <Image source={{ uri: imageURL }} style={{ height: 400, width: null, flex: 1 }}/>
          </ListItem>
          )}
        </List>
      </Content>
    )
  }
}

const mapStateToProps = ({ listing, location }) => ({
  listing, location,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getGeocoded: (address) => dispatch(getLocation(address)),

    pickImage: (listingId) => async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!result.cancelled) {
        const name = `picture-${new Date().getTime()}.jpg`;
        const body = new FormData();
        body.append("images", {
          uri: result.uri,
          name,
          type: "image/jpg"
        });
        try {
          const res = await fetch('https://us-central1-reel-stackathon.cloudfunctions.net/api/images/', {
            method: "POST",
            body,
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data"
            }
          });

          const url = await firebase.storage().ref(name).getDownloadURL();
          dispatch(addNewImage(listingId, url));
        } catch (err) {
          console.log(err);
        }
      }
    },
    launchCamera: () => async() => {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingDetail);
