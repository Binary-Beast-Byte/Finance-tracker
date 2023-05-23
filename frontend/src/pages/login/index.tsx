import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const LoginPage: React.FC = () => {
    const googleAuth = () => {
        window.open(`https://api.everestsound.com/auth/google/callback`, '_self');
      };
    
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-indigo-500">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>
        <button
          onClick={googleAuth}
          className="flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <FcGoogle size={30} className="mr-2" />
          <span className="text-lg font-medium">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
