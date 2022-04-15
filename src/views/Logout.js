import React, { useContext, useEffect } from "react";
// import { withRouter } from "react-router";

import '../css/login.css';
import firebaseConfig from "../firebaseConfig";
import { Auth } from "../context/AuthContext";
// import Errors from '../components/Errors'

const Logout = ({history}) => {

  const { user } = useContext(Auth);
  console.log(user)

  useEffect( () => {
      if (user) {
        firebaseConfig
            .auth()
            .signOut()
            .then(result => {
                console.log(result);
                history.push("/login");
            })
            .catch(error => {
                // setError(error.message)
            });
      }
    }, [history, user]);

  return (
    <div>
      
    </div>
  );
}

// export default withRouter(Login);
export default Logout;
