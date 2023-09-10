import React, { useState, useEffect } from "react";
import "./sign.css";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backgroundImage from "./back.jpg";

const Sign_in = () => {
  const [logdata, setData] = useState({
    email: "",
    password: ""
  });

  const adddata = (e) => {
    const { name, value } = e.target;
    setData(() => {
      return {
        ...logdata,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    console.log(logdata);
  }, [logdata]);

  // console.log(logdata);

  const senddata = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logdata),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle success (e.g., redirect to a success page or show a success message)
        console.log("Login successful", data);
        toast.success("Login successful");
      } else {
        // Handle errors (e.g., display an error message to the user)
        console.error("Login failed");
        toast.error("Login failed");
      }
    } catch (error) {
      console.error("Error sending data to the backend", error);
      toast.error("Invalid Details");
    }
  };

  return (
    <>
      <section>
        <div className="sign_container">
          <div className="sign_header"></div>

          <div className="sign_form">
            <form method="POST">
              <h1>Sign-In</h1>
              <div className="form_data">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  onChange={adddata}
                  value={logdata.email}
                />
              </div>
              <div className="form_data">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="At least 6 characters"
                  id="password"
                  onChange={adddata}
                  value={logdata.password}
                />
              </div>
              <button className="signin_btn" onClick={senddata}>Continue</button>
            </form>
          </div>
          <div className="create_accountinfo">
            <p>New On this site</p>
            <NavLink to="/register">
              <button>Create Your Account</button>
            </NavLink>
          </div>
        </div>
      </section>
      <ToastContainer /> {/* Add the ToastContainer */}
    </>
  );
};

export default Sign_in;
