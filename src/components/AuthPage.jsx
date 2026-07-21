import React, { useState, useRef, useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";

const authPage = () => {
  const [isLoginPage, setIsLoginPage] = useState(false);
  const authCtx = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate= useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email.includes("@admin.com")) {
      alert("Please enter a valid admin email address.");
      emailRef.current.value = "";
      return;
    }

    if (isLoginPage) {
      async function handleSignin() {
        try {
          const data = await authCtx.signin(email, password);
          if (!data.success) {
            throw new Error(data.message);
          }
          alert(data.message);
        } catch (error) {
          alert(error.message);
        }
      }
      handleSignin();
      navigate("/admin")
      emailRef.current.value = "";
      passwordRef.current.value = "";
      return;
    } else {
      const confirmPassword = confirmPasswordRef.current.value;
      if (password !== confirmPassword) {
        alert("Password and Confirm Password do not match!");
        passwordRef.current.value = "";
        confirmPasswordRef.current.value = "";
        return;
      }
      async function handleSignup() {
        try {
          const data = await authCtx.signup(email, password);
          if (!data.success) {
            throw new Error(data.message);
          }
          alert(data.message);

          return;
        } catch (error) {
          console.log(error);
          alert(error.message);
        }
      }
      handleSignup();
      setIsLoginPage(true);
      emailRef.current.value = "";
      passwordRef.current.value = "";
      confirmPasswordRef.current.value = "";
      return;
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center mt-3">
      <div className="card shadow p-4" style={{ width: "25rem" }}>
        <h2 className="text-center">{isLoginPage ? "Login" : "Sign Up"} </h2>

        <form
          onSubmit={submitHandler}
          className="flex flex-col border-solid border-black border-2 rounded-2xl p-4 w-96"
        >
          <div className="mb-3">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              ref={emailRef}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              ref={passwordRef}
              className="form-control"
              required
            />
          </div>

          {!isLoginPage && (
            <div className="mb-3">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                ref={confirmPasswordRef}
                required
              />
            </div>
          )}

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              {isLoginPage ? "Login" : "Sign Up"}
            </button>
          </div>
        </form>
        <button
          className="btn btn-link text-decoration-none"
          onClick={() => setIsLoginPage((pre) => !isLoginPage)}
        >
          {!isLoginPage
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default authPage;
