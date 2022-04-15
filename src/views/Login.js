import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import '../css/login.css';
import firebaseConfig from "../firebaseConfig";
import { Auth } from "../context/AuthContext";
import { Icon } from "@material-ui/core";

const Login = ({history}) => {

  const { user } = useContext(Auth)
  const [error, setError] = useState('')

  useEffect(() => {
    if(user) {
      history.push("/");
    }
  },[history, user]);

  const EmailAndPassword = async e => {
    e.preventDefault();
    const { username, password } = e.target.elements;

    await firebaseConfig
        .auth()
        .signInWithEmailAndPassword(username.value, password.value)
        .then(result => {
            console.log(result);
            history.push("/");
        })
        .catch(error => {
            setError(error.message)
        });

  };

  return (
    <div className="content">
      <form onSubmit={EmailAndPassword}>
        <div className="mdl-card cd">
          <div className="mdl-card__title txt">
            <h2 className="mdl-card__title-text">
              Setup Inventory
            </h2>
            <Icon style={{marginLeft:2}}>qr_code</Icon>
          </div>
          <div className="mdl-card__supporting-text ">
            <div> { error } </div>
            <div className="mdl-textfield">
              <input
                className="mdl-textfield__input"
                type="text"
                id="username"
                name="username"
                placeholder=" Email"/>
            </div>
            <div className="mdl-textfield">
              <input
                className="mdl-textfield__input"
                type="password"
                id="password"
                name="password"
                placeholder=" Password"
              />
            </div>
        </div>
        <div className="mdl-card__actions">
          <div className="mdl-grid">
            <button type="submit" className="cd mdl-cell mdl-cell--12-col mdl-button mdl-js-button mdl-button--raised mdl-button--primary">Ingresar</button>
          </div>
        </div>
        </div>
      </form>
    </div>
  );
}

// export default withRouter(Login);
export default Login;