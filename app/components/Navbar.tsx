'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { RiCloseLargeLine } from "react-icons/ri";
import { RiMenu4Fill } from "react-icons/ri";
import { OutlineBtn, SolidMainBtn, SolidWhiteBtn } from './btns';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    'All',
    'Software',
    'Design',
    'Media/Production',
    'Marketing',
    'Web 3',
  ];

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <nav className="w-full text-sm backdrop-blur-xl bg-black/30 shadow-lg z-40 fixed ">
        <div className="border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
            <div className="flex justify-between items-center h-16">
              <div className=''>
                <Link href={'/'}>
                  <Image 
                      src={'/assets/betamindlogo.png'}
                      alt='Betamind logo'
                      width={120}
                      height={0}
                      priority
                      className=' object-cover'
                      unoptimized
                  />
                </Link>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex text-[#b6b6b6] items-center space-x-4">
                <div>
                  <Link href='/mentors'>
                    <SolidMainBtn title='Browse Mentors'/>
                  </Link>
                </div>
                <div>
                  <Link href='/about'>
                    <OutlineBtn title='About us'/>
                  </Link>
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 rounded-lg text-white transition-all duration-200 hover:bg-white/10 backdrop-blur-sm"
                  aria-label="Toggle menu"
                >
                  <RiMenu4Fill className='text-2xl' />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Navigation - Desktop */}
        <div className="hidden md:block backdrop-blur-md bg-white/90">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center space-x-8 h-14 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  className="whitespace-nowrap cursor-pointer text-gray-800 text-sm font-medium transition-all duration-200 border-b-2 border-transparent hover:border-[#585853] hover:text-[#676865] h-full"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 backdrop-blur-sm bg-black/40 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] backdrop-blur-2xl bg-neutral-950/40 shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-in-out border-l border-white/5 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center p-4 border-b border-white/5 bg-black/5">
          <div className=''>
            <Link href='/'>
              <Image 
                  src={'/assets/betamindlogo.png'}
                  alt='Betamind logo'
                  width={120}
                  height={0}
                  priority
                  className=''
                  unoptimized
              />
            </Link>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg text-white hover:bg-white/5 transition-all duration-200 backdrop-blur-sm"
            aria-label="Close menu"
          >
            <RiCloseLargeLine className='text-xl' />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="overflow-y-auto h-[calc(100%-4rem)] p-4">
          <div className="space-y-3 pb-4 mb-4 border-b border-white/5">
            <div>
              <Link href='/mentors'>
                <SolidMainBtn title='Browse Mentors'/>
              </Link>
            </div>
            <div>
              <Link href='/about'>
                <OutlineBtn title='About us'/>
              </Link>
            </div>
          </div>

          {/* Mobile Categories */}
          <div className="space-y-1">
            <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider px-4 mb-3">
              Categories
            </h3>
            {categories.map((category) => (
              <button
                key={category}
                className="w-full text-left text-gray-300 hover:text-[#d4d7c2] hover:bg-white/5 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;