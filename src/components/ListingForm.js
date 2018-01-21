import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addListing } from '../store/listings';
import {Form, Item, Input, Text, Button, Icon} from 'native-base';

class ListingForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chosenDate: new Date()
    };
  }

  render() {
    return (
      <Form>
        <Item>
          <Input placeholder="Address" />
        </Item>
        <Item last>
          <Input placeholder="Image" />
        </Item>
        {/* <Button full onPress={Actions.addImage()}>
          <Text>Add More Images</Text>
        </Button> */}
        <Button full>
          <Text>Add</Text>
        </Button>
      </Form>
    )
  }
}

const mapStateToProps = ({ listing }) => ({
  listing
});

const mapDispatchToProps = (dispatch) => ({
  createListing: (listing) => {
    return dispatch(addListing(listing));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ListingForm);

