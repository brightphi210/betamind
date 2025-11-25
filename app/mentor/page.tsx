'use client'

import React, { Suspense, useEffect, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FaXTwitter, FaLinkedinIn } from 'react-icons/fa6'
import Link from 'next/link'

interface MentorData {
  fullName: string
  title: string
  imgUrl: string
  skills: string[]
  bio?: string
  experience?: string
  hourlyRate?: string
  availability?: string
  languages?: string[]
  sessionsCompleted?: number
  rating?: number
  twitter?: string
  linkedin?: string
  sessionTypes?: string[]
  rates?: {
    oneOnOne: string
    group: string
    workshop: string
  }
  mentoringPrinciples?: string[]
  dailyMentoringTime?: string
}

// Loading component for Suspense fallback
function MentorLoadingState() {
  return (
    <div className='2xl:pt-64 xl:pt-40 lg:pt-28 pt-32 pb-12 px-5 lg:px-88 min-h-screen flex items-center justify-center'>
      <div className='text-center'>
        <div className='w-16 h-16 border-4 border-[#DBFF00] border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
        <p className='text-2xl text-gray-400'>Loading mentor profile...</p>
      </div>
    </div>
  )
}

// Separate component that uses useSearchParams
function MentorContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const mentor = useMemo<MentorData | null>(() => {
    const mentorData = searchParams.get('data')
    if (!mentorData) return null
    try {
      const parsedMentor = JSON.parse(mentorData)
      return {
        ...parsedMentor,
        bio: parsedMentor.bio,
        experience: parsedMentor.experience,
        hourlyRate: parsedMentor.hourlyRate || "Flexible",
        availability: parsedMentor.availability || "Weekdays & Weekends",
        languages: parsedMentor.languages || ["English"],
        sessionsCompleted: parsedMentor.sessionsCompleted || 127,
        rating: parsedMentor.rating || 4.9,
        twitter: parsedMentor.twitter,
        linkedin: parsedMentor.linkedin,
        sessionTypes: parsedMentor.sessionTypes || ["1-on-1", "Group"],
        rates: parsedMentor.rates,
        mentoringPrinciples: parsedMentor.mentoringPrinciples,
        dailyMentoringTime: parsedMentor.dailyMentoringTime
      }
    } catch (error) {
      console.error('Error parsing mentor data:', error)
      return null
    }
  }, [searchParams])

  useEffect(() => {
    AOS.init()
  }, [])

  if (!mentor) {
    return <MentorLoadingState />
  }

  return (
    <div className='min-h-screen bg-[#020c08]'>
      {/* Header Section with Pattern Background */}
      <div className='relative overflow-hidden bg-gradient-to-b from-[#010e06] to-[#000c07]'>
        <div className='absolute inset-0 opacity-10'>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="mentor-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="40" y2="40" stroke="#DBFF00" strokeWidth="0.5" opacity="0.3"/>
                <line x1="40" y1="0" x2="0" y2="40" stroke="#DBFF00" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mentor-pattern)"/>
          </svg>
        </div>

        <div className='relative 2xl:pt-64 xl:pt-40 lg:pt-24 pt-24 pb-12 2xl:px-72 xl:px-40 lg:px-40 px-4'>
          {/* Back Button */}
          <button 
            onClick={() => router.back()}
            data-aos="fade-right"
            data-aos-duration="100"
            className='mb-8 text-[#DBFF00] cursor-pointer hover:text-white transition-colors flex items-center gap-2 group'
          >
            <svg className='w-5 h-5 group-hover:-translate-x-1 transition-transform' fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Mentors
          </button>

          {/* Profile Header */}
          <div className='grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 2xl:gap-10 xl:gap-5 lg:gap-5 items-start'>
            {/* Left Column - Image & Quick Stats */}
            <div className='lg:col-span-1'>
              <div data-aos="fade-up" data-aos-duration="300" className='relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl'>
                <Image 
                  src={mentor.imgUrl}
                  alt={mentor.fullName}
                  fill
                  className='object-cover'
                  priority
                  quality={100}
                />
              </div>

              <div className='lg:col-span-2 lg:hidden block space-y-8 mt-8 lg:mt-0'>
                {/* Name & Title */}
                <div>
                  <h1 className='text-5xl lg:text-6xl font-bold text-white mb-3'>
                    {mentor.fullName}
                  </h1>
                  <p className='text-2xl text-[#DBFF00] mb-6'>{mentor.title}</p>
                </div>

                {/* About Section */}
                <div data-aos="fade-up" data-aos-duration="200" className='bg-[#141d18] rounded-2xl p-8'>
                  <h2 className='text-2xl font-bold text-white mb-4'>About</h2>
                  <p className='text-gray-300 leading-relaxed text-lg'>
                    {mentor.bio}
                  </p>
                </div>

                {/* Skills */}
                <div data-aos="fade-up" data-aos-duration="200" className='bg-[#141d18] rounded-2xl p-8'>
                  <h2 className='text-2xl font-bold text-white mb-4'>Expertise</h2>
                  <ul className='flex flex-wrap gap-3'>
                    {mentor.skills.map((skill, idx) => (
                      <li 
                        key={idx} 
                        className='border border-emerald-100 text-emerald-50 text-sm rounded-full px-4 py-2 cursor-default'
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Session Types */}
                <div data-aos="fade-up" data-aos-duration="200" className='bg-[#141d18] rounded-2xl p-8'>
                  <h2 className='text-2xl font-bold text-white mb-4'>Session Types Offered</h2>
                  <div className='flex flex-wrap gap-3'>
                    {mentor.sessionTypes?.map((type, idx) => (
                      <div 
                        key={idx} 
                        className='bg-[#DBFF00] text-black font-semibold text-sm rounded-full px-5 py-2.5 cursor-default'
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Details Grid */}
                <div data-aos="fade-up" data-aos-duration="200" className='grid md:grid-cols-2 gap-6'>
                  {/* Experience */}
                  <div className='bg-[#141d18] rounded-2xl p-6'>
                    <div className='flex items-center gap-3 mb-3'>
                      <div className='w-12 h-12 bg-[#DBFF00] rounded-full flex items-center justify-center'>
                        <svg className='w-6 h-6 text-black' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className='text-xl font-bold text-white'>Experience</h3>
                    </div>
                    <p className='text-gray-300 text-lg'>{mentor.experience} years in the industry</p>
                  </div>

                  {/* Daily Mentoring Time */}
                  {mentor.dailyMentoringTime && (
                    <div className='bg-[#141d18] rounded-2xl p-6'>
                      <div className='flex items-center gap-3 mb-3'>
                        <div className='w-12 h-12 bg-[#DBFF00] rounded-full flex items-center justify-center'>
                          <svg className='w-6 h-6 text-black' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className='text-xl font-bold text-white'>Daily Availability</h3>
                      </div>
                      <p className='text-gray-300 text-lg'>{mentor.dailyMentoringTime}</p>
                    </div>
                  )}

                  {/* Availability */}
                  <div className='bg-[#141d18] rounded-2xl p-6'>
                    <div className='flex items-center gap-3 mb-3'>
                      <div className='w-12 h-12 bg-[#DBFF00] rounded-full flex items-center justify-center'>
                        <svg className='w-6 h-6 text-black' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className='text-xl font-bold text-white'>Availability</h3>
                    </div>
                    <p className='text-gray-300 text-lg'>{mentor.availability}</p>
                  </div>

                  {/* Languages */}
                  <div className='bg-[#141d18] rounded-2xl p-6'>
                    <div className='flex items-center gap-3 mb-3'>
                      <div className='w-12 h-12 bg-[#DBFF00] rounded-full flex items-center justify-center'>
                        <svg className='w-6 h-6 text-black' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                      </div>
                      <h3 className='text-xl font-bold text-white'>Languages</h3>
                    </div>
                    <p className='text-gray-300 text-lg'>{mentor.languages?.join(', ')}</p>
                  </div>
                </div>
              </div>

              {/* Rates Card */}
              {mentor.rates && (
                <div data-aos="fade-up" data-aos-duration="200" className='mt-6 bg-gradient-to-br from-[#141d18] to-[#0a120f] rounded-2xl p-6 border border-[#1a2621]'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-10 h-10 bg-[#DBFF00] rounded-lg flex items-center justify-center'>
                      <svg className='w-5 h-5 text-black' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className='text-white font-bold text-xl'>Session Rates</h3>
                  </div>
                  <div className='space-y-3'>
                    <div className='flex justify-between items-center py-2 border-b border-[#1a2621]'>
                      <span className='text-gray-400'>1-on-1</span>
                      <span className='text-[#DBFF00] font-semibold'>{mentor.rates.oneOnOne}</span>
                    </div>
                    <div className='flex justify-between items-center py-2 border-b border-[#1a2621]'>
                      <span className='text-gray-400'>Group</span>
                      <span className='text-[#DBFF00] font-semibold'>{mentor.rates.group}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Social Media Links */}
              <div data-aos="fade-up" data-aos-duration="200" className='mt-6 bg-gradient-to-br from-[#141d18] to-[#0a120f] rounded-2xl p-5 border border-[#1a2621] relative overflow-hidden'>
                <div className='absolute top-0 right-0 w-32 h-32 bg-[#DBFF00] opacity-5 rounded-full -translate-y-16 translate-x-16'></div>
                <div className='absolute bottom-0 left-0 w-24 h-24 bg-[#DBFF00] opacity-5 rounded-full translate-y-12 -translate-x-12'></div>
                
                <div className='relative z-10'>
                  <div className='flex items-center gap-3 mb-6'>
                    <div className='w-10 h-10 bg-[#DBFF00] rounded-lg flex items-center justify-center'>
                      <svg className='w-5 h-5 text-black' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                    <h3 className='text-white font-bold text-xl'>Let's Connect</h3>
                  </div>
                  
                  <p className='text-gray-400 text-sm mb-6'>
                    Follow me on social media for insights, tips, and updates on mentoring sessions.
                  </p>
                  
                  <div className='space-y-4'>
                    {mentor.twitter && (
                      <a 
                        href={mentor.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='flex items-center gap-4 p-2 bg-[#1a2621] hover:bg-[#1f2d26] rounded-xl transition-all duration-300 hover:translate-x-1 group'
                      >
                        <div className='w-8 h-8 bg-[#DBFF00] group-hover:bg-white rounded-full flex items-center justify-center transition-colors flex-shrink-0'>
                          <FaXTwitter className='text-black text-xl' />
                        </div>
                        <div className='flex-1'>
                          <p className='text-white font-semibold text-sm'>Twitter / X</p>
                        </div>  
                        <svg className='w-5 h-5 text-gray-500 group-hover:text-[#DBFF00] transition-colors' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    )}
                   
                    {mentor?.linkedin && (
                      <a 
                        href={mentor?.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='flex items-center gap-4 p-2 bg-[#1a2621] hover:bg-[#1f2d26] rounded-xl transition-all duration-300 hover:translate-x-1 group'
                      >
                        <div className='w-8 h-8 bg-[#DBFF00] group-hover:bg-white rounded-full flex items-center justify-center transition-colors flex-shrink-0'>
                          <FaLinkedinIn className='text-black text-xl' />
                        </div>
                        <div className='flex-1'>
                          <p className='text-white font-semibold text-sm'>LinkedIn</p>
                        </div>
                        <svg className='w-5 h-5 text-gray-500 group-hover:text-[#DBFF00] transition-colors' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className='lg:col-span-2 lg:block hidden space-y-8 mt-8 lg:mt-0'>
              {/* Name & Title */}
              <div>
                <h1 className='text-5xl lg:text-6xl font-bold text-white mb-3'>
                  {mentor.fullName}
                </h1>
                <p className='text-2xl text-[#DBFF00] mb-6'>{mentor.title}</p>
              </div>

              {/* About Section */}
              <div data-aos="fade-up" data-aos-duration="200" className='bg-[#141d18] rounded-2xl p-8'>
                <h2 className='text-2xl font-bold text-white mb-4'>About</h2>
                <p className='text-gray-300 leading-relaxed text-lg'>
                  {mentor.bio}
                </p>
              </div>

              {/* Skills */}
              <div data-aos="fade-up" data-aos-duration="200" className='bg-[#141d18] rounded-2xl p-8'>
                <h2 className='text-2xl font-bold text-white mb-4'>Expertise</h2>
                <ul className='flex flex-wrap gap-3'>
                  {mentor.skills.map((skill, idx) => (
                    <li 
                      key={idx} 
                      className='border border-emerald-100 text-emerald-50 text-sm rounded-full px-4 py-2 cursor-default'
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Session Types */}
              <div data-aos="fade-up" data-aos-duration="200" className='bg-[#141d18] rounded-2xl p-8'>
                <h2 className='text-2xl font-bold text-white mb-4'>Session Types Offered</h2>
                <div className='flex flex-wrap gap-3'>
                  {mentor.sessionTypes?.map((type, idx) => (
                    <div 
                      key={idx} 
                      className='bg-[#DBFF00] text-black font-semibold text-sm rounded-full px-5 py-2.5 cursor-default'
                    >
                      {type}
                    </div>
                  ))}
                </div>
              </div>

              {/* Details Grid */}
              <div data-aos="fade-up" data-aos-duration="200" className='grid md:grid-cols-2 gap-6'>
                {/* Experience */}
                <div className='bg-[#141d18] rounded-2xl p-6'>
                  <div className='flex items-center gap-3 mb-3'>
                    <div className='w-12 h-12 bg-[#DBFF00] rounded-full flex items-center justify-center'>
                      <svg className='w-6 h-6 text-black' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className='text-xl font-bold text-white'>Experience</h3>
                  </div>
                  <p className='text-gray-300 text-lg'>{mentor.experience} years in the industry</p>
                </div>

                {/* Daily Mentoring Time */}
                {mentor.dailyMentoringTime && (
                  <div className='bg-[#141d18] rounded-2xl p-6'>
                    <div className='flex items-center gap-3 mb-3'>
                      <div className='w-12 h-12 bg-[#DBFF00] rounded-full flex items-center justify-center'>
                        <svg className='w-6 h-6 text-black' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className='text-xl font-bold text-white'>Daily Availability</h3>
                    </div>
                    <p className='text-gray-300 text-lg'>{mentor.dailyMentoringTime}</p>
                  </div>
                )}

                {/* Availability */}
                <div className='bg-[#141d18] rounded-2xl p-6'>
                  <div className='flex items-center gap-3 mb-3'>
                    <div className='w-12 h-12 bg-[#DBFF00] rounded-full flex items-center justify-center'>
                      <svg className='w-6 h-6 text-black' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className='text-xl font-bold text-white'>Availability</h3>
                  </div>
                  <p className='text-gray-300 text-lg'>{mentor.availability}</p>
                </div>

                {/* Languages */}
                <div className='bg-[#141d18] rounded-2xl p-6'>
                  <div className='flex items-center gap-3 mb-3'>
                    <div className='w-12 h-12 bg-[#DBFF00] rounded-full flex items-center justify-center'>
                      <svg className='w-6 h-6 text-black' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                    </div>
                    <h3 className='text-xl font-bold text-white'>Languages</h3>
                  </div>
                  <p className='text-gray-300 text-lg'>{mentor.languages?.join(', ')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className='bg-[#DBFF00] py-16 px-5 2xl:px-72 xl:px-40 lg:px-40'>
        <div data-aos="fade-up" data-aos-duration="300" className='max-w-4xl mx-auto text-center'>
          <h2 className='text-4xl lg:text-5xl font-bold text-black mb-4'>
            Ready to start your journey with {mentor.fullName.split(' ')[0]}?
          </h2>
          <p className='text-xl text-gray-800 mb-8'>
            Book your first session today and get personalized guidance to achieve your goals.
          </p>
          <div className='flex flex-wrap gap-4 justify-center'>
            <button className='bg-black cursor-pointer text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-900 transition-colors'>
              Schedule Free Consultation
            </button>

            <div>
              <Link href={'/mentors'}>
                <button className='bg-transparent border-2 border-black cursor-pointer text-black px-10 py-4 rounded-full text-lg font-semibold hover:bg-black hover:text-white transition-colors'>
                  View All Mentors
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main component with Suspense wrapper
const Mentor = () => {
  return (
    <Suspense fallback={<MentorLoadingState />}>
      <MentorContent />
    </Suspense>
  )
}

export default Mentor