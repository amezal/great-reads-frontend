import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import Auth0ProviderWithHistory from "./auth/Auth0ProviderWithHistory";
import { Helmet } from 'react-helmet';

ReactDOM.render(
  <BrowserRouter>
    <Auth0ProviderWithHistory>
      <Helmet>
        <title>Great Reads</title>
        <meta name="description" content="All your books in one place." />
      </Helmet>
      <App />
    </Auth0ProviderWithHistory>
  </BrowserRouter>,
  document.getElementById("root")
);