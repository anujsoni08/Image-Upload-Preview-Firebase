import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

const HomePage = React.lazy(() =>
  import("./components/HomePage/HomePage")
);
const FirebaseImagesPreview = React.lazy(() =>
  import("./components/FirebaseImagesPreview/FirebaseImagesPreview")
);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/list" component={FirebaseImagesPreview} />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
}

export default App;
