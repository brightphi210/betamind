import React from 'react';
import { OutlineBtn, SolidMainBtn, SolidWhiteBtn } from './btns';

const RoleSelectionModal = ({ isOpen, onClose }:any) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0">
        <div 
          className={`bg-[#010f07] border border-[#DBFF00]/10 rounded-3xl lg:p-10 p-4 max-w-2xl w-full mx-4 relative transform transition-all duration-300 ease-in-out ${
            isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
          }`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 cursor-pointer hover:text-white transition-colors duration-200"
            aria-label="Close modal"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>

          {/* Modal content */}
          <div className="text-center">
            <div className="mb-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3 lg:pt-5 pt-14">
                Welcome to <span className="text-[#DBFF00]">Betamind</span>
              </h2>
              <p className="text-gray-300 text-base lg:text-lg">
                How would you like to continue?
              </p>
            </div>

            <div className='flex lg:flex-row flex-col gap-3 justify-center m-auto w-[80%]'>

                <a className='w-full'
                    href={'https://forms.gle/FGzgmb71FWjRMDc56'}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <SolidMainBtn title='Join as Mentor'/>
                </a>

                <a className='w-full'
                    href={'https://forms.gle/NCWXCB7JZtHBCNfZ8'}
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <SolidWhiteBtn title='Join as Mentee'/>
                </a>
            </div>

            {/* Additional info */}
            <p className="text-gray-500 text-sm mt-8">
              Don't worry, you can always change this later in your profile settings
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoleSelectionModal;