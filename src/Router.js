import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import ListingsList from './components/ListingsList';
import AddListingForm from './components/ListingForm';
import ListingDetail from './components/ListingDetail';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        {/* <Scene key="auth">
          <Scene
            key="login"
            component={LoginForm}
            title="Please Log In"
            initial
          />
        </Scene> */}

        <Scene key="main">
          <Scene
            key="listingsList"
            component={ListingsList}
            title="All Listings"
            rightTitle="Add Listing"
            onRight={() => Actions.addListingForm()}
            initial
          />
          <Scene
            key="addListingForm"
            component={AddListingForm}
            title="Add Listing"
          />
          <Scene
            key="listingDetail"
            component={ListingDetail}
            title="Listing Detail"
            // rightTitle="Add Image"
            // onRight={() => Actions.addImage()}
          />
          {/* <Scene
            key="addImage"
            component={AddImage}
            title="Add Image"
          /> */}
        </Scene>
      </Scene>
    </Router>
  )
}

export default RouterComponent;
