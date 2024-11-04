import React, { useState, useEffect } from 'react';
import "./App.css";
import Main from "./pages/main/Main";
import Header from './components/Header';
import Greeting from './components/Greeting';
import FooterNav from './components/FooterNav';
import './App.css';
import chatIcon from './assets/2.png';

//function to ensure df-messenger is loaded
function waitForMessengerToLoad(callback) {
  const checkMessenger = setInterval(() => {
    const dfMessenger = document.querySelector('df-messenger');
    if (dfMessenger) {
      clearInterval(checkMessenger);  // Stop checking when df-messenger is found
      callback(dfMessenger);  // calling the function when the element is ready
    }
  }, 100);  //every 100 milliseconds
}

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState('home'); // Track active page

  useEffect(() => {
    waitForMessengerToLoad(() => {
      // useeffect for df-messenger loaded for safe 
      if (!sessionStorage.getItem('df-messenger-chatBubbleExpansion')) {
        sessionStorage.setItem('df-messenger-chatBubbleExpansion', 'true');
      }
    });
  }, []);

  const renderContent = () => {
    switch (activePage) {
      case 'messages':
        return (
          <div className="messages-page">
            <div>Messages Page</div>
            {/* Load Dialogflow Messenger dynamically */}
            <df-messenger
              project-id="journaler-ai-bot"
              agent-id="3b287d4f-cdaf-4e85-aceb-a8a0eea1c905"
              language-code="en"
              allow-feedback="all"
              max-query-length="-1"
              chat-title="Mr Journaler"
              placeholder-text="Type a reply..."
              bot-writing-text="Writing..."
              expanded="true"
              >
              <df-messenger-chat-bubble
               expanded="true"
               chat-title-icon="/2.png"
               chat-title="Mr Journaler"
               placeholder-text="Type a reply..."
               bot-writing-text="Writing...">
              </df-messenger-chat-bubble>
            </df-messenger>
          </div>
        );

      case 'history':
        return <div>History Page</div>;

      default:
        return (
          <div className="subscription-card">
            <div className="subscription-card-title">Add subscription</div>
            <div className="subscription-card-text">
              Find the right Journaler plan for you and start 30 days free trial for all plans
            </div>
          </div>
        );
    }
  };

  return (
    <div className="main-container">
      {/* Chat icon that toggles the entire widget */}
      {activePage !== 'messages' && (
        <div className="chat-toggle-button" onClick={() => setIsOpen(!isOpen)}>
          <img src={chatIcon} alt="Chatbot" className="chat-icon" />
        </div>
      )}

      {/* Chat widget content, opened or closed based on isOpen */}
      <div className={`chat-window ${isOpen ? 'open' : 'closed'}`}>
        <Header />
        <Greeting />

        {/* Render content based on active page */}
        {renderContent()}

        {/* Footer navigation that allows switching between Home, Messages, and History */}
        <FooterNav setActivePage={setActivePage} />
      </div>
      <div className="min-vh-100">
        <Main />
      </div>
    </div>
  );
};

export default App;
