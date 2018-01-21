import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { List, ListItem, Text, Thumbnail, Content, H1 } from 'native-base';
import { SearchBar } from 'react-native-elements';

class ListingDetail extends Component {

  componentWillMount() {
    // this.props.getListingDetail();
  }

  render() {
    const { listing } = this.props;

    return (
      <Content>
        <H1>{listing.address}</H1>
        <Image
          source={{uri: listing.imageUrl}}
          style={{height: 200, width: null, flex: 1}}
        />
      </Content>
    )
  }
}

const mapStateToProps = ({ listing }) => ({
  listing
});

// const mapDispatchToProps = (dispatch) => ({
//   getListingDetail: () => {
//     return dispatch(fetchListing(id));
//   }
// });

export default connect(mapStateToProps, null)(ListingDetail);
