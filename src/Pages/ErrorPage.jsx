import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-8 bg-white rounded-lg shadow-lg text-center">
        <div className="flex flex-wrap justify-center mb-4">
          <img
            src="https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
            className="w-40 h-40 sm:w-48 sm:h-48 mb-4"
            alt=""
          />
          <img
            src="https://images.unsplash.com/photo-1609743522653-52354461eb27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
            className="w-40 h-40 sm:w-48 sm:h-48 mb-4"
            alt=""
          />
        </div>
        <small className="text-lg text-gray-800 mb-4">
          Something went wrong. Please check the URL.
        </small>
        <p className="text-lg text-gray-800 mb-4">
          Go back to the{' '}
          <Link to="/" className="text-blue-500 hover:underline">
            homepage
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
