import React from "react";
import "./sign.css";
import { useState,useEffect  } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Sign_Up = () => {
  const [udata, setUdata] = useState({
    fname: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });

  const adddata = (e) => {
    const { name, value } = e.target;

    setUdata(() => {
      return {
        ...udata,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    console.log(udata);
  }, [udata]);


  const senddata = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(udata),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Handle success (e.g., redirect to a success page or show a success message)
        console.log("Registration successful", data);
        toast.success("Registration successful");
      } else {
        // Handle errors (e.g., display an error message to the user)
        console.error("Registration failed");
        toast.error("Registration failed");
      }
    } catch (error) {
      console.error("Error sending data to the backend", error);
      toast.error("Registration failed");
    }
  };

  return (
    <div>
      <section>
        <div className="sign_container">
          <div className="sign_header"></div>

          <div className="sign_form">
            <form method="POST">
              <h1>Sign-Up</h1>
              <div className="form_data">
                <label htmlFor="fname">Your Name</label>
                <input
                  type="text"
                  name="fname"
                  id="fname"
                  onChange={adddata}
                  value={udata.fname}
                />
              </div>
              <div className="form_data">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  onChange={adddata}
                  value={udata.email}
                />
              </div>
              <div className="form_data">
                <label htmlFor="number">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  id="mobile"
                  onChange={adddata}
                  value={udata.mobile}
                />
              </div>
              <div className="form_data">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="At least 6 character"
                  id="password"
                  onChange={adddata}
                  value={udata.password}
                />
              </div>
              <div className="form_data">
                <label htmlFor="password">Password Again</label>
                <input
                  type="password"
                  name="cpassword"
                  id="password"
                  onChange={adddata}
                  value={udata.cpassword}
                />
              </div>
              <button className="signin_btn" onClick={senddata}>Continue</button>
              <div className="signin_info">
                <p>Already have an account?</p>
              </div>
            </form>
          </div>
        </div>
      </section>
      <ToastContainer /> {/* Add the ToastContainer */}
    </div>
  );
};

export default Sign_Up;
