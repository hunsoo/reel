import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Card, Form, Item, Input, InputGroup, Text, Button, Icon, Label} from 'native-base';
import { Field, reduxForm } from 'redux-form';
import { Actions } from 'react-native-router-flux';
import { addListing } from '../store/listings';

class ListingForm extends Component {

  constructor(props) {
    super(props);
    this.renderInput = this.renderInput.bind(this);
  }

  renderInput({ input, placeholder='', iconName='ios-code-working', label, type, meta: { pristine, touched, error, warning } }) {
    var hasError = false;
    if (error !== undefined && error !== {}) {
      hasError = true;
    }
    return (
      <InputGroup iconRight error={hasError}>
        <Icon name={iconName} />
        <Input placeholder={placeholder} {...input} />
        {hasError ? <Text>{error}</Text> : <Text />}
      </InputGroup>
    )
  }

  render() {
    const { showPassword, handleSubmit, pristine, submitting, values, reset } = this.props;
    const {createListing} = this.props;
    const fields = [
      {name: 'address', placeholder: 'Address', iconName: 'pin'},
      {name: 'price', placeholder: 'Price', iconName: 'pricetag'},
      {name: 'bedrooms', placeholder: '# of Bedrooms', iconName: 'home'},
      {name: 'bathrooms', placeholder: '# of Bathrooms', iconName: 'woman'},
      {name: 'description', placeholder: 'Description', iconName: 'clipboard'},
    ]
    return (
      <Card>
      <Form>
        {fields.map(field =>
        <Item key={field.name}>
            <Field name={field.name} iconName={field.iconName} placeholder={field.placeholder} underlayColor='#99d9f4' component={this.renderInput} />
        </Item>)}
        <Button full onPress={handleSubmit(createListing)}>
          <Text>Add</Text>
        </Button>
      </Form>
      </Card>
    )
  }
}

const googleAPIKey = 'AIzaSyAIF1HJQfwmNCmjuddywTAZhOlqYv8ZBxI';

const mapStateToProps = ({ listing }) => ({
  listing
});

const mapDispatchToProps = (dispatch) => ({
  createListing: async (values) => {
    const {address, bedrooms, bathrooms, price, description} = values;
    const encodedAddress = address.split(' ').join('+');
    const res = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress + '&key=' + googleAPIKey);
    const geocoded = await res.json();
    const location = geocoded.results[0].geometry.location;
    const imageUrl = 'https://maps.googleapis.com/maps/api/streetview?size=400x400&location=' + address.split(' ').join('+') + '&key=' + googleAPIKey;

    const newListing = {
      address,
      price: Number(price),
      details: {
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
      },
      location,
      imageUrl,
      description,
    };

    dispatch(addListing(newListing));
    Actions.listingsList();
  }
});

const validate = values => {
  const error = {};
  error.address = '';
  error.price = '';
  error.bedrooms = '';
  error.bathrooms = '';
  let address = values.address;
  let price = values.price;
  let bedrooms = values.bedrooms;
  let bathrooms = values.bathrooms;
  if (values.address === undefined) {
    address = '';
  }
  if (values.price === undefined) {
    price = 0;
  }
  if (values.bedroom === undefined) {
    bedrooms = 0;
  }
  if (Number(bedrooms) < 0 && bedrooms !== '') {
    error.bedrooms = 'Enter a non-negative number';
  }
  if (Number(bathrooms) < 0 && bathrooms !== '') {
    error.bathrooms = 'Enter a non-negative number';
  }
  if (Number(price) < 0 && price !== '') {
    error.price = 'Enter a non-negative number';
  }

  return error;
};

const ReduxListingForm = reduxForm({
  form: 'listing',
  validate
})(ListingForm);

export default connect(mapStateToProps, mapDispatchToProps)(ReduxListingForm);

