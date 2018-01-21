import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Button, MapView } from 'react-native';
import { List, ListItem, Text, Thumbnail, Content, H1 } from 'native-base';
import { ImagePicker, Map } from 'expo';
import {addNewImage} from '../store/listing';
import firebase from 'firebase';

class ListingDetail extends Component {

  render() {
    const {listing , pickImage, launchCamera} = this.props;
    const images = listing.images ? Object.keys(listing.images).map(id => listing.images[id]) : [];

    return (
      <Content>
        <H1>{listing.address}</H1>
        <Text>{'\n'}</Text>
        <Text>Exterior</Text>
        <Image
          source={{uri: listing.imageUrl}}
          style={{height: 200, width: null, flex: 1}}
        />
        <Text>Map</Text>
        {/* <MapView /> */}
        <Text>Images</Text>
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
              <Image source={{ uri: imageURL }} style={{ height: 200, width: null, flex: 1 }}/>
          </ListItem>
          )}
        </List>
      </Content>
    )
  }
}

const mapStateToProps = ({ listing }) => ({
  listing
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
    launchCamera: () => async() => {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingDetail);
