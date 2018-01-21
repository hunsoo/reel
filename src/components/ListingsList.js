import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Content, List, ListItem, Text, Thumbnail, Body } from 'native-base';
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
    const listingItems = Object.keys(listings).map(id => listings[id]);

    return (
      <Content>
        <SearchBar
          placeholder='Type Here...'
          placeholderTextColor="white"
          inputStyle={{ color: "white" }}
          value={this.state.searchTerm}
          onChangeText={this.handleSearchChange}
        />
        <List>
          {listingItems.map(listing =>
            <ListItem key={listing.id} onPress={() => { Actions.listingDetail(); select(listing); }}>
              <Thumbnail square size={80} source={{ uri: listing.imageUrl }} />
              <Body>
                <Text>{listing.address}</Text>
                <Text note>Its time to build a difference . .</Text>
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
