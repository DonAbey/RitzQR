// import React from 'react';

// const FooterNav = () => (
//   <div className="footer-nav">
//     <button className="nav-button">Home</button>
//     <button className="nav-button">Messages</button>
//     <button className="nav-button">History</button>
//   </div>
// );

// export default FooterNav;


// import React from 'react';

// const FooterNav = ({ setCurrentPage }) => (
//   <div className="footer-nav">
//     <button className="nav-button" onClick={() => setCurrentPage('home')}>Home</button>
//     <button className="nav-button" onClick={() => setCurrentPage('messages')}>Messages</button>
//     <button className="nav-button" onClick={() => setCurrentPage('history')}>History</button>
//   </div>
// );

// export default FooterNav;

import React from 'react';

const FooterNav = ({ setActivePage }) => (
  <div className="footer-nav">
    <button className="nav-button" onClick={() => setActivePage('home')}>Home</button>
    <button className="nav-button" onClick={() => setActivePage('messages')}>Messages</button>
    <button className="nav-button" onClick={() => setActivePage('history')}>History</button>
  </div>
);

export default FooterNav;

