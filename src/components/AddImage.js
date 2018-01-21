import React from 'react';
import { Button, Image, View } from 'react-native';
import { ImagePicker } from 'expo';
import firebase from 'firebase';

export default class AddImage extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      const name = 'images/picture.jpg';
      const body = new FormData();
      body.append("files", {
        uri: result.uri,
        name,
        type: "image/jpg"
      });

      const res = await fetch('https://us-central1-reel-stackathon.cloudfunctions.net/api/images/', {
        method: "POST",
        body,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data"
        }
      });

      const url = await firebase.storage().ref(name).getDownloadURL();
      if (url)
        this.setState({ image: url });
    }
  };
}
