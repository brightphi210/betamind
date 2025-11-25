'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { OutlineBtn, SolidBlackBtn, SolidMainBtn, SolidWhiteBtn } from './components/btns'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { mentors } from './mocks/mentors';
import RoleSelectionModal from './components/SelectModal';
import { FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import { FaMailchimp } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';

const Home = () => {
  useEffect(() => {
    AOS.init();
  }, [])


  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const handleGetStarted = (e: any) => {
    e.preventDefault();
    setIsModalOpen(true);
  };
  return (
    <div>

      <RoleSelectionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      <div className='relative overflow-hidden'>
        <div className='absolute inset-0 lg:opacity-30 opacity-5'>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="sand-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="40" y2="40" stroke="#DBFF00" strokeWidth="0.5" opacity="0.3"/>
                <line x1="40" y1="0" x2="0" y2="40" stroke="#DBFF00" strokeWidth="0.5" opacity="0.3"/>
                <circle cx="20" cy="20" r="1" fill="#DBFF00" opacity="0.2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#sand-pattern)"/>
          </svg>
        </div>

        <div className='relative '>
          <div className='2xl:pt-64 xl:pt-40 lg:pt-28 pt-32 pb-8 px-5 sm:px-6 lg:px-8'>
            <div className='lg:text-center text-left mb-5 lg:mb-5'>
              <h2 data-aos="fade-up" data-aos-duration="100" className='text-[52px] lg:text-5xl xl:text-5xl 2xl:text-6xl  font-medium leading-tight lg:leading-tight'>
                Get 
                <span className='text-[#d4d7c2] font-bold'> Mentorship</span> that <br className='hidden sm:block'/> 
                fits your <span className='text-[#DBFF00] font-bold'> Budget</span>
              </h2>
              <p data-aos="fade-up" data-aos-duration="200" className='2xl:w-[30%] xl:w-[55%] lg:w-[80%] md:w-[80%] w-full mx-auto pt-4 text-base sm:text-base lg:text-lg text-gray-300 leading-relaxed'>
                Betamind is a hub where minds grow through mentorship. 
                We make mentorship accessible and affordable for everyone.
              </p>
            </div>

            <div data-aos="fade-up" data-aos-duration="200" className='lg:flex lg:flex-row flex flex-col gap-3 m-auto lg:justify-center'>
              <div onClick={handleGetStarted}>
                <SolidWhiteBtn title='Get Started'/>
              </div>
              <div>
                <Link href={'/mentors'}>
                  <OutlineBtn title='Browse Mentors'/>
                </Link>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-duration="300" className='relative hidden pt-5 w-[90%] mx-auto '>
              <div className='relative  w-full h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[700px] rounded-lg overflow-hidden shadow-2xl'>
                <Image 
                  src={'/assets/bannera.png'}
                  alt='hero-image showing mentorship'
                  fill
                  className='object-contain'
                  priority
                  quality={100}
                  sizes="100vw"
                />
              </div>
            </div>
          </div>
        </div>

        <div className='bg-[#DBFF00] py-5 pt-10 lg:block block relative text-black text-center lg:w-[50%] w-[90%] justify-center m-auto h-full rounded-tl-4xl rounded-tr-4xl'>
          <ul className='flex gap-2 m-auto justify-center bottom-5'>
            <a 
              href="mailto:betamind@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className=''
            >
              <div className='flex items-center gap-1'>
                <div className='w-12 h-12 bg-[#171a01] rounded-full flex items-center justify-center transition-colors flex-shrink-0'>
                  <IoMdMail className='text-white text-2xl' />
                </div>
              </div>
            </a>

            <li>
              <a 
                href="https://www.linkedin.com/company/betaminds/" 
                target="_blank" 
                rel="noopener noreferrer"
                className=''
              >
                <div className='flex items-center gap-1'>
                  <div className='w-12 h-12 bg-[#171a01] group-hover:bg-white rounded-full flex items-center justify-center transition-colors flex-shrink-0'>
                    <FaLinkedinIn className='text-white text-2xl' />
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a 
                href="https://x.com/betamindxyz" 
                target="_blank" 
                rel="noopener noreferrer"
                className=''
              >
                <div className='flex items-center gap-1'>
                  <div className='w-12 h-12 bg-[#171a01] group-hover:bg-white rounded-full flex items-center justify-center transition-colors flex-shrink-0'>
                    <FaXTwitter className='text-white text-2xl' />
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className='flex lg:flex-row flex-col lg:gap-0 gap-6 w-full items-center 2xl:px-88 xl:px-40 lg:px-40 px-5 justify-center m-auto p-10 py-16 bg-[#02160b]'>
        <div>
          <h2 data-aos="fade-up" data-aos-duration="200" className='2xl:text-5xl xl:text-4xl lg:text-4xl text-4xl'>Why the <span className='text-[#DBFF00] font-bold'>Right</span> Mentor Changes <span className='text-[#DBFF00] font-bold'>Everything !</span></h2>
          <p data-aos="fade-up" data-aos-duration="300" className='text-base pt-4 lg:w-[90%] w-full'>
            The right mentor provides guidance, clarity, & accountability 
            that accelerate personal & professional growth. 
            They help you avoid mistakes, refine your goals, 
            & unlock opportunities you might not find alone.
          </p>
          <div data-aos="fade-up" data-aos-duration="300" className='w-fit pt-5'>
            <Link href={'/mentors'}>
              <SolidWhiteBtn title='Browse Mentors'/>
            </Link>
          </div>
        </div>

        <div data-aos="fade-up" data-aos-duration="300" className='w-full'>
          <Image 
            src={'/assets/mentorhand.png'}
            alt='This is handshake'
            width={0}
            height={0}
            priority
            quality={100}
            unoptimized
            className='w-full'
          />
        </div>
      </div>

      <div className='2xl:px-88 xl:px-40 lg:px-40 px-4 pt-10'>
        <div className='bg-[#DBFF00] lg:grid grid-cols-3 flex flex-col lg:gap-10 gap-5 items-center rounded-3xl text-black lg:p-10 p-7'>
          <div className='col-span-2'>
            <h2 data-aos="fade-up" data-aos-duration="200" className='2xl:text-5xl xl:text-4xl lg:text-4xl text-4xl font-bold pb-5'>Why Choose Betamind</h2>
            <p data-aos="fade-up" data-aos-duration="300" className='lg:w-[90%] w-full pb-2'>
              Betamind makes mentorship simple, accessible, and affordable. 
              We connect you with experienced mentors who understand your goals, 
              guide your growth, and help you achieve real results. 
              Whether youre starting out or leveling up, 
              Betamind ensures you get the right guidance—without the high costs or barriers.
            </p>
            <div data-aos="fade-up" data-aos-duration="800" className='w-fit pt-5'>
              <Link href={'/about'}>
                <SolidBlackBtn title='About Betamind'/>
              </Link>
            </div>
          </div>
          <div data-aos="fade-up" data-aos-duration="300" className='col-span-1'>
            <Image 
              src={'/assets/png.png'}
              alt='patter'
              width={0}
              height={0}
              priority
              quality={100}
              unoptimized
              className='w-full'
            />
          </div>
        </div>
      </div>

     <div className='flex lg:flex-row flex-col-reverse lg:gap-0 gap-0 w-full 2xl:px-88 xl:px-40 lg:px-40 px-4 justify-center m-auto mt-10 p-10 bg-[#02160b]'>
        <div className='bg-white text-black w-full lg:h-auto h-auto lg:p-10 p-5 2xl:rounded-l-3xl xl:rounded-l-3xl lg:rounded-l-3xl lg:rounded-b-none rounded-b-2xl'>
          <h2 data-aos="fade-up" data-aos-duration="200" className='2xl:text-5xl xl:text-4xl lg:text-4xl text-4xl'>No strings attached, fully vetted <span className='text-[#1b3b01] font-bold'>Mentors</span>.</h2>
          <p className='text-base py-5' data-aos="fade-up" data-aos-duration="300">Connect directly with trusted mentors — no hidden fees, no commitments, just real guidance when you need it.</p>
          <div onClick={handleGetStarted} data-aos="fade-up" data-aos-duration="300" className='w-fit pt-5'>
            <SolidBlackBtn title='Get started here'/>
          </div>
        </div>

        <div className='w-full h-full lg:h-auto overflow-hidden'>
          <Image 
            src={'/assets/nightfall.webp'}
            alt='This is handshake'
            width={0}
            height={0}
            priority
            quality={100}
            unoptimized
            className='w-full h-full object-cover 2xl:rounded-r-3xl xl:rounded-r-3xl lg:rounded-r-3xl lg:rounded-t-none rounded-t-2xl'
          />
        </div>
      </div>

      <div className='2xl:px-88 xl:px-40 lg:px-40 px-4 py-20 text-white'>
        <h2 data-aos="fade-up" data-aos-duration="200" className='lg:text-5xl mb-5 text-4xl text-center text-white'>
          What People are <br className='lg:block hidden'/> saying about <span className='text-[#DBFF00] font-bold'>Betamind</span> 
        </h2>

        <p className='text-center text-base text-gray-400'>No testimonials yet</p>

        {/* <Swiper
          slidesPerView={1}
          spaceBetween={5}
          loop={true}
          autoplay={{
            delay: 100000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper"
        >
            <SwiperSlide>
              <div data-aos="fade-up" data-aos-duration="200" className='cursor-pointer border-amber-100 bg-[#051b0e] p-6 rounded-2xl'>
                <p className='text-base text-justify'>
                  My mentor gave me great tips on 
                  how to make my resume and portfolio better 
                  and he had great job recommendations during my career change. 
                  He assured me many times that there were still a lot of transferable 
                  skills that employers would really love
                </p>
                <div>
                  <h3 className='pt-4 font-bold'>- Jane D.</h3>
                  <p className='text-sm text-gray-400'>Product Designer</p>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div data-aos="fade-up" data-aos-duration="200" className='border bg-amber-50 text-green-950 cursor-pointer border-gray-800 p-6 rounded-2xl'>
                <p className='text-base text-justify'>
                  My mentor gave me great tips on 
                  how to make my resume and portfolio better 
                  and he had great job recommendations during my career change. 
                  He assured me many times that there were still a lot of transferable 
                  skills that employers would really love
                </p>
                <div>
                  <h3 className='pt-4 font-bold'>- Jane D.</h3>
                  <p className='text-sm text-gray-400'>Product Designer</p>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div data-aos="fade-up" data-aos-duration="300" className='cursor-pointer border-amber-100 bg-[#051b0e] p-6 rounded-2xl'>
                <p className='text-base text-justify'>
                  My mentor gave me great tips on 
                  how to make my resume and portfolio better 
                  and he had great job recommendations during my career change. 
                  He assured me many times that there were still a lot of transferable 
                  skills that employers would really love
                </p>
                <div>
                  <h3 className='pt-4 font-bold'>- Jane D.</h3>
                  <p className='text-sm text-gray-400'>Product Designer</p>
                </div>
              </div>
            </SwiperSlide>

             <SwiperSlide>
              <div data-aos="fade-up" data-aos-duration="300" className='border bg-amber-50 text-green-950 cursor-pointer border-gray-800 p-6 rounded-2xl'>
                <p className='text-base text-justify'>
                  My mentor gave me great tips on 
                  how to make my resume and portfolio better 
                  and he had great job recommendations during my career change. 
                  He assured me many times that there were still a lot of transferable 
                  skills that employers would really love
                </p>
                <div>
                  <h3 className='pt-4 font-bold'>- Jane D.</h3>
                  <p className='text-sm text-gray-400'>Product Designer</p>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div data-aos="fade-up" data-aos-duration="300" className='cursor-pointer border-amber-100 bg-[#051b0e] p-6 rounded-2xl'>
                <p className='text-base text-justify'>
                  My mentor gave me great tips on 
                  how to make my resume and portfolio better 
                  and he had great job recommendations during my career change. 
                  He assured me many times that there were still a lot of transferable 
                  skills that employers would really love
                </p>
                <div>
                  <h3 className='pt-4 font-bold'>- Jane D.</h3>
                  <p className='text-sm text-gray-400'>Product Designer</p>
                </div>
              </div>
            </SwiperSlide>
        </Swiper> */}
      </div>

      {/* Featured Mentors Section */}
      <div className='2xl:px-88 xl:px-40 lg:px-40 px-4 py-20 bg-[#02160b] text-white'>
        <h2 data-aos="fade-up" data-aos-duration="200" className='lg:text-5xl text-4xl text-center text-white mb-3'>
          Explore available <span className='text-[#DBFF00] font-bold'>Mentors</span>
        </h2>
        <p data-aos="fade-up" data-aos-duration="600" className='text-center text-gray-300 mb-10 max-w-2xl mx-auto'>
          Connect with experienced professionals who are ready to guide you on your journey
        </p>
        
        <div className='grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 lg:gap-3 gap-8 pt-5'>
          {mentors.slice(0, 6).map((mentor, index) => (
            <div key={index} data-aos="fade-up" data-aos-duration={500 + (index * 100)} className='bg-[#0e1b14] text-white p-3 rounded-2xl space-y-3 cursor-pointer hover:shadow-2xl transition-shadow duration-300'>
              <div className='h-[350px] overflow-hidden rounded-2xl'>
                <Image 
                  src={mentor.imgUrl}
                  alt='mentor1'
                  width={0} 
                  height={0}
                  priority
                  quality={100}
                  unoptimized
                  className='w-full h-full object-cover'
                />
              </div>

              <div>
                <h3 className='pt-4 font-bold text-lg'>{mentor.fullName}</h3>
                <p className='text-sm text-gray-400 py-1'>{mentor.title}</p>
                <ul className='flex flex-wrap gap-2 pt-3'>
                  {mentor.skills.map((skill, idx) => (
                    <li key={idx} className='bg-none border border-emerald-200 text-emerald-200 text-xs rounded-full p-2 px-4'>{skill}</li>
                  ))}
                </ul>

                <div className='pt-6'>
                  <Link 
                    href={{
                      pathname: '/mentor',
                      query: { 
                        id: index,
                        data: JSON.stringify(mentor)
                      }
                    }}
                  >
                    <SolidMainBtn title='View Profile' />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Mentors Button */}
        <div data-aos="fade-up" data-aos-duration="300" className='flex justify-center mt-12'>
          <Link href='/mentors'>
            <SolidMainBtn title='View All Mentors'/>
          </Link>
        </div>
      </div>

      {/* Vision Section */}
      <div className='2xl:px-88 xl:px-40 lg:px-40 px-4 py-24  text-white relative overflow-hidden'>
        <div className='absolute inset-0 opacity-10'>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="vision-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="2" fill="#DBFF00" opacity="0.4"/>
                <circle cx="10" cy="10" r="1" fill="#DBFF00" opacity="0.3"/>
                <circle cx="50" cy="50" r="1" fill="#DBFF00" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#vision-pattern)"/>
          </svg>
        </div>

        <div className='relative max-w-5xl mx-auto text-center'>
          <h2 data-aos="fade-up" data-aos-duration="200" className='lg:text-5xl text-4xl font-bold mb-6'>
            Our <span className='text-[#DBFF00]'>Vision</span>
          </h2>
          
          <div data-aos="fade-up" data-aos-duration="200" className='w-20 h-1 bg-[#DBFF00] mx-auto mb-10'></div>
          
          <p data-aos="fade-up" data-aos-duration="300" className='text-base lg:text-xl text-gray-200 leading-relaxed mb-8'>
            We envision a world where <span className='text-[#DBFF00] font-semibold'>quality mentorship is accessible to everyone</span>, 
            regardless of background or budget. A world where every aspiring professional can connect with 
            experienced guides who genuinely care about their growth.
          </p>

          <div className='grid lg:grid-cols-3 grid-cols-1 gap-8 mt-16'>
            <div data-aos="fade-up" data-aos-duration="200" className='bg-[#0c1310] p-8 rounded-2xl  hover:border-[#DBFF00]/60 transition-all duration-300'>
              <div className='text-5xl mb-4'>🎯</div>
              <h3 className='text-2xl font-bold mb-3 text-[#DBFF00]'>Accessibility</h3>
              <p className='text-gray-300'>Breaking down barriers to make mentorship available to all who seek growth and guidance.</p>
            </div>

            <div data-aos="fade-up" data-aos-duration="300" className='bg-[#0c1310] p-8 rounded-2xl  hover:border-[#DBFF00]/60 transition-all duration-300'>
              <div className='text-5xl mb-4'>🤝</div>
              <h3 className='text-2xl font-bold mb-3 text-[#DBFF00]'>Connection</h3>
              <p className='text-gray-300'>Creating meaningful relationships between mentors and mentees that foster real transformation.</p>
            </div>

            <div data-aos="fade-up" data-aos-duration="300" className='bg-[#0c1310] p-8 rounded-2xl  hover:border-[#DBFF00]/60 transition-all duration-300'>
              <div className='text-5xl mb-4'>🚀</div>
              <h3 className='text-2xl font-bold mb-3 text-[#DBFF00]'>Empowerment</h3>
              <p className='text-gray-300'>Equipping individuals with the knowledge and confidence to achieve their full potential.</p>
            </div>
          </div>

          <p data-aos="fade-up" data-aos-duration="300" className='text-lg text-gray-300 mt-12 italic'>
            {"At Betamind, we're not just connecting people—we're building a community where knowledge flows freely, growth is celebrated, and success is shared."}
          </p>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className='2xl:px-88 xl:px-40 lg:px-40 px-4 py-24 bg-[#DBFF00] text-black relative overflow-hidden'>
        <div className='absolute top-0 right-0 w-96 h-96 bg-black/5 rounded-full -translate-y-1/2 translate-x-1/2'></div>
        <div className='absolute bottom-0 left-0 w-96 h-96 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2'></div>
        
        <div className='relative max-w-4xl mx-auto text-center'>
          <h2 data-aos="fade-up" data-aos-duration="500" className='lg:text-5xl text-4xl font-bold mb-6'>
            Ready to Transform Your Career?
          </h2>
          
          <p data-aos="fade-up" data-aos-duration="600" className='text-lg lg:text-xl mb-10 text-gray-800'>
            Join thousands of professionals who are accelerating their growth with expert mentorship. 
            Your journey to success starts with a single conversation.
          </p>

          <div data-aos="fade-up" data-aos-duration="700" className='flex flex-col sm:flex-row gap-5 justify-center items-center mb-12'>
            <button onClick={handleGetStarted} className='bg-black text-[#DBFF00] font-bold px-6 py-3 rounded-lg hover:bg-gray-900 transition-all duration-300 text-base cursor-pointer shadow-xl hover:shadow-2xl hover:scale-105'>
              Get Started for Free
            </button>
            
            <Link href='/mentors'>
              <button className='bg-white text-black font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300 text-base cursor-pointer shadow-xl hover:shadow-2xl hover:scale-105'>
                Browse Mentors
              </button>
            </Link>
          </div>

          {/* <div data-aos="fade-up" data-aos-duration="300" className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-16'>
            <div className='bg-white/60 backdrop-blur p-6 rounded-2xl'>
              <p className='text-4xl font-bold mb-2'>500+</p>
              <p className='text-gray-700 font-medium'>Expert Mentors</p>
            </div>
            <div className='bg-white/60 backdrop-blur p-6 rounded-2xl'>
              <p className='text-4xl font-bold mb-2'>10,000+</p>
              <p className='text-gray-700 font-medium'>Success Stories</p>
            </div>
            <div className='bg-white/60 backdrop-blur p-6 rounded-2xl'>
              <p className='text-4xl font-bold mb-2'>95%</p>
              <p className='text-gray-700 font-medium'>Satisfaction Rate</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Home