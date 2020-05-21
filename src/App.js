import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

const Home = React.lazy(() => import("./components/Home/Home"));
const Preview = React.lazy(() => import("./components/Preview/Preview"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/list" component={Preview} />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
}

export default App;
