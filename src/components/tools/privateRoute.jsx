import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { auth } from "firebase";
import CircularProgressIndicator from "./circular_progress_indicator";
import UserContext from "./user_info";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const [pending, setPending] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        setPending(false);
      } else {
        setPending(false);
      }
    });
  }, [setPending]);
  if (pending) {
    return <CircularProgressIndicator display={pending} />;
  }
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        user ? (
          <UserContext.Provider value={user}>
            <RouteComponent {...routeProps} />
          </UserContext.Provider>
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};

export default PrivateRoute;
