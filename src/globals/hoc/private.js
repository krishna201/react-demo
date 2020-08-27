import React, { Component } from "react";
import AppLayout from "globals/components/AppLayout";

export default function Protected(Children) {
  class AuthenticatedComponent extends Component {
    render() {
      return (
        <React.Fragment>
          <AppLayout>
            <Children {...this.props} />
          </AppLayout>
        </React.Fragment>
      );
    }
  }
  return AuthenticatedComponent;
}
