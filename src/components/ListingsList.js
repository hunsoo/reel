import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Content, Item, Icon, Input, Button, List, ListItem, Text, Thumbnail, Body } from 'native-base';
import { SearchBar } from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import { fetchListings } from '../store/listings';
import {selectListing} from '../store/listing';

class ListingsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    }
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentWillMount() {
    this.props.getListings();
  }

  handleSearchChange(value) {
    this.setState({ searchTerm: value });
  }

  render() {
    const {listings, select} = this.props;
    const listingItems = Object.keys(listings).map(id => {
      const listing = listings[id];
      return {id: id, ...listing};
      })
    .filter(listing => listing.address.toLowerCase().includes(this.state.searchTerm.toLowerCase()));

    return (
      <Content>
        <Item searchBar>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search by Address..."
              value={this.state.searchTerm}
              onChangeText={this.handleSearchChange} />
        </Item>
        </Item>
        <List>
          {listingItems.map(listing =>
            <ListItem key={listing.id} onPress={() => { Actions.listingDetail(); select(listing); }}>
              <Thumbnail square size={80} source={{ uri: listing.imageUrl }} />
              <Body>
                <Text>{listing.address}</Text>
                <Text note>${listing.price}, {listing.details.bedrooms}br, {listing.details.bathrooms}bath</Text>
              </Body>
          </ListItem>
          )}
        </List>
      </Content>
    )
  }
}

const mapStateToProps = ({listings}) => ({
  listings
});

const mapDispatchToProps = (dispatch) => ({
  getListings: () => {
    return dispatch(fetchListings());
  },
  select: (listing) => {
    return dispatch(selectListing(listing));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ListingsList);
