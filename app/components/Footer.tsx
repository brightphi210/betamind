import Link from "next/link";

import React from 'react'

const Footer = () => {
  return (
    <div>
              {/* Footer */}
      <footer className='bg-[#02160b] text-white border-t border-gray-800'>
        <div className='2xl:px-88 xl:px-40 lg:px-40 px-4 py-16'>
          <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-12 mb-12'>
            {/* Brand Section */}
            <div className='lg:col-span-1'>
              <h3 className='text-3xl font-bold mb-4 text-[#DBFF00]'>Betamind</h3>
              <p className='text-gray-400 mb-6'>
                Empowering growth through affordable, accessible mentorship for everyone.
              </p>
              <div className='flex gap-4'>
                <Link href='#' className='w-10 h-10 bg-[#DBFF00]/10 hover:bg-[#DBFF00]/20 rounded-full flex items-center justify-center transition-all duration-300'>
                  <span className='text-[#DBFF00]'>in</span>
                </Link>
                <Link href='#' className='w-10 h-10 bg-[#DBFF00]/10 hover:bg-[#DBFF00]/20 rounded-full flex items-center justify-center transition-all duration-300'>
                  <span className='text-[#DBFF00]'>𝕏</span>
                </Link>
                <Link href='#' className='w-10 h-10 bg-[#DBFF00]/10 hover:bg-[#DBFF00]/20 rounded-full flex items-center justify-center transition-all duration-300'>
                  <span className='text-[#DBFF00]'>TG</span>
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className='text-lg font-bold mb-4 text-[#DBFF00]'>Quick Links</h4>
              <ul className='space-y-3'>
                <li><Link href='/about' className='text-gray-400 hover:text-[#DBFF00] transition-colors duration-300'>About Us</Link></li>
                <li><Link href='/mentors' className='text-gray-400 hover:text-[#DBFF00] transition-colors duration-300'>Find Mentors</Link></li>
                {/* <li><Link href='/become-mentor' className='text-gray-400 hover:text-[#DBFF00] transition-colors duration-300'>Become a Mentor</Link></li> */}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className='text-lg font-bold mb-4 text-[#DBFF00]'>Resources</h4>
              <ul className='space-y-3'>
                {/* <li><Link href='/blog' className='text-gray-400 hover:text-[#DBFF00] transition-colors duration-300'>Blog</Link></li> */}
                <li><Link href='/support' className='text-gray-400 hover:text-[#DBFF00] transition-colors duration-300'>FAQ</Link></li>
                <li><Link href='/support' className='text-gray-400 hover:text-[#DBFF00] transition-colors duration-300'>Support</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className='text-lg font-bold mb-4 text-[#DBFF00]'>Contact Us</h4>
              <ul className='space-y-3 text-gray-400'>
                <li>betamind123@gmail.com</li>
                <li>+234 9041204694</li>
                <li className='pt-4'>
                  <Link href='/support' className='inline-block bg-[#DBFF00] text-black px-6 py-2 rounded-full font-semibold hover:bg-[#c5e600] transition-all duration-300'>
                    Get in Touch
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className='border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4'>
            <p className='text-gray-400 text-sm'>
              © 2025 Betamind. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer