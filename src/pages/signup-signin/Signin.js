import React, { useState } from "react";
import { verifySignIn } from "../../data/verify";
import { useNavigate } from "react-router-dom";
import { useScrollToTop } from "../../fragments/customHook/useScrollToTop";
import { useForm } from "../../fragments/customHook/useForm";
import "./style.css";

function SignIn(props) {
  useScrollToTop();

  const navigate = useNavigate(); 
  const [isSignedIn, setIsSignedIn] = useState(null);

  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  }); 

  const handleClick = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const verifiedUser = verifySignIn(values.email, values.password); // Verify user credentials

    if (verifiedUser) {
      const aemUser = {
        id: 967,
        name: "Don",
        lastName: "Abeynayake",
        email: "test@gmail",
        phone: "459340691",
        role: "CEO",
        country: "AU",
        timezone: "AUSTRALIA_SYDNEY",
        businessName: "Rightx",
        currentAuthority: "user",
        accountType: "account"
      }
      localStorage.setItem('aemUser', JSON.stringify(aemUser));
      console.log('aemUser saved to localStorage:', aemUser);

      localStorage.setItem("activeUser", JSON.stringify(verifiedUser)); // Save active user to localStorage

      //CHATBOT - dialogflow code ammendments
      //localStorage.setItem('greetingDisplayed', 'false');
      window.dispatchEvent(new Event('resetChatbot'));


      setIsSignedIn(true); // Set sign-in status to true
      setTimeout(() => {
        props.loginUser(verifiedUser.name); // Call loginUser prop function
        navigate("/"); // Navigate to home page
      }, 1000);
    } else {
      setIsSignedIn(false); // Set sign-in status to false if verification fails
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 col-sm-8">
          <div className="text-center mb-4 mt-5">
            <h2>SIGN IN</h2>
          </div>
          <form>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange} // Handle input change for email
              />
            </div>
            <div className="form-group">
              <input
                className="form-control my-3"
                placeholder="Password"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange} // Handle input change for password
              />
            </div>
            <div className="text-center">
              <button className="btn mb-3 btn-login" onClick={handleClick}>
                Sign In
              </button>
            </div>
            {isSignedIn && (
              <div className="text-center">
                <p>Logging In</p> {/* Display logging in message */}
              </div>
            )}
            {isSignedIn === false && (
              <div className="text-center mt-3">
                <p>Invalid email or password</p> {/* Display invalid credentials message */}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
