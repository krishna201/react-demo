import React, { lazy, Suspense } from "react";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect
} from "react-router-dom";
import AuthRoutes from "globals/hoc/private";
import { Spin } from "antd";

const Home = lazy(() => import("modules/Home"));
const redirect = pathname => () => {
  return <Redirect to={{ pathname }} />;
};

export const Routes = props => {
  return (
    <main>
      <Router>
        <Suspense
          fallback={
            <div
              style={{
                width: "100%",
                height: "100%",
                margin: "auto",
                paddingTop: 50,
                textAlign: "center"
              }}
            >
              <Spin />
            </div>
          }
        >
          <Switch>
            <Route path="/" component={AuthRoutes(ContentRoute)} />
          </Switch>
        </Suspense>
      </Router>
    </main>
  );
};

const ContentRoute = props => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            width: "100%",
            height: "100%",
            margin: "auto",
            paddingTop: 50,
            textAlign: "center"
          }}
        >
          <Spin />
        </div>
      }
    >
      <Switch>
        <Route exact path="/" render={redirect("home")} />
        <Route exact path="/home" render={() => <Home {...props} />} />
        
      
      </Switch>
    </Suspense>
  );
};
export default Routes;
