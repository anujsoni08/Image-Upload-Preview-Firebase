import React from 'react';
import ImageUploadContainer from './containers/ImageUpload/imageUpload';
import Navigation from './components/NavigationComponent/navigation';
import ImageListingComponent from './components/ImageListingComponent/ImageListing';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Navigation />
      {/* <ImageUploadContainer /> */}
      <Switch>
        <Route exact path="/" component={ImageUploadContainer} />
        <Route path="/list" component={ImageListingComponent} />
      </Switch>
    </div>
  );
}

export default App;
