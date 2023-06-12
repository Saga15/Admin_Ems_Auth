import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, userInfo, success, auth } = useSelector(
    (state) => state.auth
  );

  const { register, handleSubmit } = useForm();

  const submitForm = (data) => {
    dispatch(loginUser(data));
  };
  useEffect(() => {
    if (auth == 200 && error == null) {
      Swal.fire({
        icon: "success",
        title: "Login Successfull",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/company");
    }

    if (auth == 401) {
      Swal.fire({
        icon: "error",
        title: "Invalid password...!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    }
  }, [auth]);

  return (
    <div className="main-log">
      <div className="container">
        <h1 id="login-txt">Login</h1>
        <p id="para">Welcome! Log in to your account</p>
        <form onSubmit={handleSubmit(submitForm)}>
          <label htmlFor="email" id="email">
            Email
          </label>
          <input id="inp-eml" type="email" {...register("email")} required />
          <label htmlFor="password" id="lable-pass">
            Password
          </label>
          <input
            id="inp-pass"
            type="password"
            {...register("password")}
            required
          />
          <p id="forgot-pass">Forgot Password?</p>
          <button className="login-btn" type="submit" disabled={false}>
            Login
          </button>
        </form>{" "}
        <p id="sample">Don't have an account?</p>
        <span id="spn">Sign Up</span>
      </div>
      <div className="img-ems">
        <img className="img-big" src="\images\Vector.png" alt="ems" />
      </div>
    </div>
  );
};

export default Login;
