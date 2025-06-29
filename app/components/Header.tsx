"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import Button from "./Button";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState("Click to copy");
  const [isMobile, setIsMobile] = useState(false);

  // Get company information from environment variables
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || "Lynxly";
  const companyDescription = process.env.NEXT_PUBLIC_COMPANY_DESCRIPTION || "is a studio that designs and develops mobile, web and blockchain apps.";
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hi@lynxly.co";
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/company/lynxly";

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const openContactModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShowTooltip(false);
    setTooltipText("Click to copy");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setTooltipText("Copied!");
        setTimeout(() => {
          setTooltipText("Click to copy");
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const modalContent = (
    <div className="space-y-4">
      <div>
        <p className="text-gray-300">Email:</p>
        <div className="relative inline-flex items-center">
          <a
            href={`mailto:${contactEmail}`}
            className="text-blue-400 hover:text-blue-300 flex items-center"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={(e) => {
              e.preventDefault();
              copyToClipboard(contactEmail);
            }}
          >
            {contactEmail}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
              />
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
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300"
        >
          {linkedinUrl.replace('https://', '')}
        </a>
      </div>
    </div>
  );

  return (
    <header className="relative z-10 pt-4 sm:pt-4 mb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex ${isMobile ? 'flex-col' : 'justify-between'} items-center p-3`}>
          {isMobile && (
            <nav className="flex space-x-4 w-full justify-center mb-4 mb-8">
              <Button
                onClick={openContactModal}
                size="md"
              >
                Contact
              </Button>
            </nav>
          )}
          
          <div className={`flex ${isMobile ? 'flex-col' : ''} items-center`}>
            <Image
              aria-hidden
              src="/logo.svg"
              alt={`${companyName} logo`}
              width={50}
              height={50}
              className={isMobile ? 'mx-auto' : ''}
            />
            <p className={`max-w-[350px] ${isMobile ? 'mt-2 text-center' : 'ml-2 text-left'}`}>
              <span className="font-bold text-white">{companyName}</span>{" "}
              <span className="text-gray-400 dark:text-gray-400">
                {companyDescription}
              </span>
            </p>
          </div>
          
          {!isMobile && (
            <nav className="flex space-x-4">
              <Button
                onClick={openContactModal}
                size="md"
              >
                Contact
              </Button>
            </nav>
          )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Contact Us">
        {modalContent}
      </Modal>
    </header>
  );
}
