import React from 'react';
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="https://github.com/pri-priya9"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-gray-400 transition duration-300"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.instagram.com/__pri.priya9?igsh=MTY5enoxYnF5cW9scw=="
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-gray-400 transition duration-300"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/priyayadav9"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-gray-400 transition duration-300"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://x.com/pri_priya9"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-gray-400 transition duration-300"
          >
            <FaTwitter />
          </a>
        </div>
        <p className="text-center text-sm">
          &copy; 2025 Priya. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
