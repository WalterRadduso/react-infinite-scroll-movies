import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => (
  <div className="Error">
    <p>This page doesn't exist.</p>

    <Link to={{ pathname: '/' }}>Home</Link>
  </div>
);

export default ErrorPage;
