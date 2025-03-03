"use client"

import Link from 'next/link';
import { useState } from 'react';
import Modal from './Modal';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState('Click to copy');

  const openContactModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Reset tooltip state when modal closes
    setShowTooltip(false);
    setTooltipText('Click to copy');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setTooltipText('Copied!');
        setTimeout(() => {
          setTooltipText('Click to copy');
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  const modalContent = (
    <div className="space-y-4">
      <div>
        <p className="text-gray-300">Email:</p>
        <div className="relative inline-flex items-center">
          <a 
            href="mailto:hi@lynxly.co" 
            className="text-blue-400 hover:text-blue-300 flex items-center"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={(e) => {
              e.preventDefault();
              copyToClipboard('hi@lynxly.co');
            }}
          >
            hi@lynxly.co
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
          </a>
          {showTooltip && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-700 text-white text-xs rounded whitespace-nowrap">
              {tooltipText}
            </div>
          )}
        </div>
      </div>
      <div>
        <p className="text-gray-300">LinkedIn:</p>
        <a 
          href="https://linkedin.com/company/lynxly" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300"
        >
          linkedin.com/company/lynxly
        </a>
      </div>
    </div>
  );

  return (
    <header className="relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center p-3">
          <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center w-full">
            <p className="max-w-[350px] mb-0 mt-4 md:mt-0 md:mb-0 mx-auto md:mx-0 text-center md:text-left"><span className="font-bold text-white">Lynxly</span> <span className="text-gray-400 dark:text-gray-400">is a studio that designs and develops mobile, web and blockchain apps.</span></p>
            <nav className="flex space-x-8 justify-center md:justify-start mb-2 md:mb-0">
              <Link 
                href="/work" 
                className="text-gray-400 dark:text-gray-400 hover:text-gray-200 dark:hover:text-white"
              >
                Work
              </Link>
              {/* <Link 
                href="/blog" 
                className="text-gray-400 dark:text-gray-400 hover:text-gray-200 dark:hover:text-white"
              >
                Blog
              </Link> */}
              <a 
                href="#" 
                onClick={openContactModal}
                className="text-gray-400 dark:text-gray-400 hover:text-gray-200 dark:hover:text-white cursor-pointer"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Contact Us"
      >
        {modalContent}
      </Modal>
    </header>
  );
} 