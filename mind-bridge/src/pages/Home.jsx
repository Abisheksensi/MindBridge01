import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Home = () => {
  console.log("Home is rendering");
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
      {/* CTA Button */}
      <Link to="/ai-chat">
        <button className="bg-blue-900 text-white py-3 px-6 rounded-lg hover:bg-blue-800 transition duration-300">
          Start Chatting with AI
        </button>
      </Link>
    </div>
  );
};

export default Home;



