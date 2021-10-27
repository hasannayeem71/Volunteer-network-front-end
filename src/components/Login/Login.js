import React, { useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./Login.css";
const Login = () => {
  const location = useLocation();
  const history = useHistory();
  const redirect_uri = location.state?.from || "/";
  const { loginWithGoogle, setError, setLoading } = useAuth();
  useEffect(() => {
    document.title = "Login";
  }, []);
  const handleLogin = () => {
    loginWithGoogle()
      .then((result) => {
        history.push(redirect_uri);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="mt-5 pt-5 d-flex justify-content-center align-items-center login-page ">
      <div className=" login-container bg-white">
        <img
          src="https://i.ibb.co/b32Bd81/Group-1329.png"
          alt=""
          className="img-fluid"
        />
        <button onClick={handleLogin}>
          <img src="https://i.ibb.co/Mnmngsj/Group-573.png" alt="" />
          Continue with Google
        </button>
        <p className="mt-3">
          New at network? <Link to="/register">register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
