import { React, useState } from "react";
import { useEffect } from "react";
import { BrowserRouter as Link, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Home from "../homepage/Home";
import Header from "../../fragments/header/Header";
import Footer from "../../fragments/footer/Footer";
import Myprofile from "../myprofile/Myprofile";
import Signin from "../signup-signin/Signin";
import { SignUp } from "../signup-signin/Signup";
import LoginLogout from "./LoginLogout";
import useHandleClick from "../../fragments/customHook/useHandleClick";
import { useScrollToTop } from "../../fragments/customHook/useScrollToTop";
import AemAdmin from "../aem/AemAdmin";
import DocumentEditor from "../aem/DocumentEditor";

const Main = () => {
  const { username, loginUser, logout, getActiveUser } = LoginLogout();

  //CHATBOT - dialogflow ammendments
  if (!sessionStorage.getItem('greetingUser')) {
    sessionStorage.setItem('greetingUser', 'false');
  }
  // if (!sessionStorage.getItem('df-messenger-chatBubbleExpansion')) {
  //   sessionStorage.setItem('df-messenger-chatBubbleExpansion', 'true');
  // }

  const navigate = useNavigate();
  const [handleClick] = useHandleClick(username);
  return (
    <>
      <Header username={username} logout={logout} />
      {useScrollToTop()}
      <Routes>
        <Route
          path="/"
          element={<Home handleClick={handleClick} />}
        />
        <Route path="/login" element={<Signin loginUser={loginUser} />} />
        <Route path="/Register" element={<SignUp loginUser={loginUser} />} />
        <Route path="/profile" element={<Myprofile />} />
        <Route path="/aemAdmin" element={<AemAdmin />} />
        <Route path="/documentEditor" element={<DocumentEditor />} />
        {/* <Route
          path="/special"
          element={
            <SpecialDeals handleClick={handleClick} items={initProducts} />
          }
        /> */}
        {/* <Route
          path="/shop-online"
          element={
            <ShopOnline handleClick={handleClick} items={initProducts} />
          }
        /> */}
        {/* <Route
          path="/checkout"
          element={
            <Checkout
              currentUserCartItems={currentUserCartItems}
              currentUser={getActiveUser()}
              handleCheckOutClick={handleCheckOutClick}
              setInitProducts={setInitProducts}
            />
          }
        /> */}
        {/* <Route
          path="/cart"
          element={
            <Cart currentUser={getActiveUser()} updateCartChanged={setItems} />
          }
        /> */}
        {/* <Route
          path="/product-page/:urlId"
          element={
            <ProductPage handleClick={handleClick} items={initProducts} />
          }
        /> */}
        {/* <Route
          path="/thankyou"
          element={
            <Thankyou
              currentUser={getActiveUser()}
              currentUserCartItems={currentUserCartItems}
              clickCheckOut={clickCheckOut}
              setItems={setItems}
            />
          }
        /> */}
      </Routes>
      <Footer />
    </>
  );
};

export default Main;
