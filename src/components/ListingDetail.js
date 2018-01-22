import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Button, View, CameraRoll } from 'react-native';
import { Card, List, ListItem, Text, Thumbnail, Container, Header, Content, Separator, H1, H2 } from 'native-base';
import { ImagePicker, MapView } from 'expo';
import {addNewImage} from '../store/listing';
import firebase from 'firebase';

const googleAPIKey = 'AIzaSyAIF1HJQfwmNCmjuddywTAZhOlqYv8ZBxI';

class ListingDetail extends Component {

  render() {
    const {listing, pickImage, launchCamera} = this.props;
    const images = listing.images ? Object.keys(listing.images).map(id => listing.images[id]) : [];
    const title = listing.address + ' - $' + listing.price;
    const details = Object.keys(listing.details).reverse().map(key => key + ': ' + listing.details[key]);
    const {lat, lng} = listing.location;

    return (
      <Card>
      <Content>
          <H1>{title}</H1>
        <H1>{'\n'}</H1>
        {/* <Card> */}
        <Separator bordered>
          <H2>Details</H2>
        </Separator>
        <ListItem>
          <Text>{listing.description}</Text>
        </ListItem>
        <ListItem>
          <Text>
            {details.join('\n')}
          </Text>
        </ListItem>
        {/* </Card> */}
        <Separator bordered>
          <H2>Exterior</H2>
        </Separator>
        <ListItem>
        <Image
          source={{uri: listing.imageUrl}}
          style={{ height: 300, width: null, flex: 1 }}
        />
        </ListItem>
        <Separator bordered>
          <H2>Location on the Map</H2>
        </Separator>
        <ListItem>
        <View style={{ flex: 1 }}>
          <MapView
            initialRegion={{
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            style={{ height: 400, width: null, flex: 1 }}
            showsUserLocation={true}
          >
            <MapView.Marker
              coordinate={{latitude: lat, longitude: lng}}
              title={title}
              description={details.join(', ')}
            />
          </MapView>
        </View>
        </ListItem>
        <Separator bordered>
          <H2>Property Images</H2>
        </Separator>
        <List>
          {images.map((imageURL, i) =>
            <ListItem key={'image-' + i}>
              <Image source={{ uri: imageURL }} style={{ height: 400, width: null, flex: 1 }} />
            </ListItem>
          )}
        </List>
        <Button
          title="Add an image from camera roll"
          onPress={pickImage(listing.id)}
        />
        <Button
          title="Take a new picture"
            onPress={launchCamera(listing.id)}
        />
      </Content>
      </Card>
    )
  }
}

const mapStateToProps = ({ listing }) => ({
  listing,
});

const mapDispatchToProps = (dispatch) => {
  return {
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

    launchCamera: (listingId) => async() => {
      let camera = await ImagePicker.launchCameraAsync({});
      if (!camera.cancelled) {
        const uri = await CameraRoll.saveToCameraRoll(camera.uri);
        const name = `picture-${new Date().getTime()}.jpg`;
        const body = new FormData();
        body.append("images", {
          uri: uri,
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingDetail);
