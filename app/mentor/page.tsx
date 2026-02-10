'use client'

import { Suspense, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { FaXTwitter, FaLinkedinIn, FaStar } from 'react-icons/fa6';
import Link from 'next/link';
import { FaStarHalfAlt } from 'react-icons/fa';

interface Review {
  name: string
  rating: number
  comment: string
  date: string
  avatar?: string
}

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
  rating: number
  totalReviews?: number
  twitter?: string
  linkedin?: string
  portfolio?: string | null
  certificates?: string[] | null
  sessionTypes?: string[]
  category?: string
  rates?: {
    oneOnOne: string
    group: string
    workshop?: string
  }
  mentoringPrinciples?: string[]
  dailyMentoringTime?: string
  reviews?: Review[]
}

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

const StarRating = ({ rating }: { rating: number }) => {
  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<FaStar key={i} className='text-yellow-400' />)
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<FaStarHalfAlt  key={i} className='text-yellow-400' />)
    } else {
      stars.push(<FaStar key={i} className='text-gray-600' />)
    }
  }

  return <div className='flex gap-1'>{stars}</div>
}

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
        rating: parsedMentor?.rating || 0.0,
        totalReviews: parsedMentor.totalReviews || 0,
        twitter: parsedMentor.twitter,
        linkedin: parsedMentor.linkedin,
        portfolio: parsedMentor.portfolio,
        certificates: parsedMentor.awards,
        sessionTypes: parsedMentor.sessionTypes || ["1-on-1", "Group"],
        category: parsedMentor.category,
        rates: parsedMentor.rates || 0,
        mentoringPrinciples: parsedMentor.mentoringPrinciples,
        dailyMentoringTime: parsedMentor.dailyMentoringTime,
        reviews: parsedMentor.reviews || []
      }
    } catch (error) {
      console.error('Error parsing mentor data:', error)
      return null
    }
  }, [searchParams])

  if (!mentor) {
    return <MentorLoadingState />
  }

  return (
    <div className='min-h-screen bg-[#020c08]'>
      {/* Header Section */}
      <div className='relative overflow-hidden bg-linear-to-b from-[#010e06] to-[#000c07]'>
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

        <div className='relative 2xl:pt-64 xl:pt-40 lg:pt-24 pt-24 pb-12 2xl:px-72 xl:px-40 lg:px-40 px-6'>
          {/* Back Button */}
          <button 
            onClick={() => router.back()}
            className='mb-8 text-[#DBFF00] cursor-pointer hover:text-white transition-colors flex items-center gap-2 group'
          >
            <svg className='w-5 h-5 group-hover:-translate-x-1 transition-transform' fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Mentors
          </button>

          {/* Profile Header */}
          <div className='grid lg:grid-cols-12 gap-8 items-start'>
            {/* Left Column - Profile Image & Info */}
            <div className='lg:col-span-3'>
              {/* Mobile view: flex layout */}
              <div className='lg:hidden flex gap-4 mb-6'>
                {/* Profile Image - smaller on mobile */}
                <div className='relative w-32 h-32 shrink-0 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#DBFF00]/20'>
                  <Image 
                    src={mentor.imgUrl || "/placeholder.svg"}
                    alt={mentor.fullName}
                    fill
                    className='object-cover'
                    priority
                    quality={100}
                  />
                </div>

                {/* Rating & Category - flex column beside image */}
                <div className='flex flex-col gap-2'>
                  {mentor.category && (
                    <div>
                      <span className='inline-block bg-[#DBFF00] text-black px-3 py-1 rounded-full text-xs font-bold'>
                        {mentor.category}
                      </span>
                    </div>
                  )}

                    <div className='bg-[#141d18] rounded-xl p-3 py-2'>
                      <div className='flex items-center gap-2'>
                        <span className='text-xl font-bold text-white'>{Number(mentor?.rating.toFixed(1))}</span>
                      </div>
                      <div className='flex mb-1'>
                        <StarRating rating={mentor?.rating} />
                      </div>
                      <p className='text-gray-400 text-xs'>{mentor.totalReviews} reviews</p>
                    </div>
                </div>
              </div>

            <div className='lg:col-span-9 lg:hidden block space-y-6'>
              {/* Name & Title - Desktop Only */}
              <div className=''>
                <h1 className='text-4xl lg:text-5xl font-bold text-white mb-2'>
                  {mentor.fullName}
                </h1>
                <p className='text-xl text-[#DBFF00] mb-4'>{mentor.title}</p>
              </div>

              {/* About Section */}
              <div className='bg-[#141d18] rounded-2xl p-6'>
                <h2 className='text-2xl font-bold text-white mb-3'>About</h2>
                <p className='text-gray-300 leading-relaxed'>
                  {mentor.bio}
                </p>
              </div>

              {/* Skills */}
              <div className='bg-[#141d18] rounded-2xl p-6'>
                <h2 className='text-2xl font-bold text-white mb-3'>Expertise</h2>
                <ul className='flex flex-wrap gap-2'>
                  {mentor.skills.map((skill, idx) => (
                    <li 
                      key={idx} 
                      className='border border-emerald-100 text-emerald-50 text-sm rounded-full px-4 py-2'
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Session Types */}
              <div className='bg-[#141d18] rounded-2xl p-6'>
                <h2 className='text-2xl font-bold text-white mb-3'>Session Types Offered</h2>
                <div className='flex flex-wrap gap-2'>
                  {mentor.sessionTypes?.map((type, idx) => (
                    <div 
                      key={idx} 
                      className='bg-[#DBFF00] text-black font-semibold text-sm rounded-full px-5 py-2.5'
                    >
                      {type}
                    </div>
                  ))}
                </div>
              </div>

              {/* Details Grid */}
              <div className='grid md:grid-cols-2 gap-4'>
                <div className='bg-[#141d18] rounded-2xl p-5'>
                  <div className='flex items-center gap-3 mb-2'>
                    <div className='w-10 h-10 bg-[#DBFF00] rounded-full flex items-center justify-center'>
                      <svg className='w-5 h-5 text-black' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className='text-lg font-bold text-white'>Experience</h3>
                  </div>
                  <p className='text-gray-300'>{mentor.experience} years</p>
                </div>

                {mentor.dailyMentoringTime && (
                  <div className='bg-[#141d18] rounded-2xl p-5'>
                    <div className='flex items-center gap-3 mb-2'>
                      <div className='w-10 h-10 bg-[#DBFF00] rounded-full flex items-center justify-center'>
                        <svg className='w-5 h-5 text-black' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className='text-lg font-bold text-white'>Daily Availability</h3>
                    </div>
                    <p className='text-gray-300'>{mentor.dailyMentoringTime}</p>
                  </div>
                )}

                <div className='bg-[#141d18] rounded-2xl p-5'>
                  <div className='flex items-center gap-3 mb-2'>
                    <div className='w-10 h-10 bg-[#DBFF00] rounded-full flex items-center justify-center'>
                      <svg className='w-5 h-5 text-black' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className='text-lg font-bold text-white'>Availability</h3>
                  </div>
                  <p className='text-gray-300'>{mentor.availability}</p>
                </div>

                <div className='bg-[#141d18] rounded-2xl p-5'>
                  <div className='flex items-center gap-3 mb-2'>
                    <div className='w-10 h-10 bg-[#DBFF00] rounded-full flex items-center justify-center'>
                      <svg className='w-5 h-5 text-black' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                    </div>
                    <h3 className='text-lg font-bold text-white'>Languages</h3>
                  </div>
                  <p className='text-gray-300'>{mentor.languages?.join(', ')}</p>
                </div>
              </div>

              {/* Certificates Section */}
              {mentor.certificates && mentor.certificates.length > 0 ? (
                <div className='bg-[#141d18] rounded-2xl p-6'>
                  <h2 className='text-2xl font-bold text-white mb-4'>Certifications/Awards</h2>
                  <div className='grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 grid-cols-2 gap-2'>
                    {mentor.certificates.map((cert, idx) => (
                      <div key={idx} className='relative aspect-square rounded-xl overflow-hidden border border-[#1a2621] hover:border-[#DBFF00] transition-all'>
                        <Image 
                          src={cert}
                          alt={`Certificate ${idx + 1}`}
                          fill
                          className='object-cover'
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Reviews Section */}
              <div className='bg-[#141d18] lg:block hidden rounded-2xl p-6'>
                <h2 className='text-2xl font-bold text-white mb-4'>
                  Reviews {mentor?.totalReviews && mentor?.totalReviews > 0 && `(${mentor.totalReviews})`}
                </h2>
                
                {mentor.reviews && mentor.reviews.length > 0 ? (
                  <div className='space-y-4'>
                    {mentor.reviews.map((review, idx) => (
                      <div key={idx} className='bg-[#0a120f] rounded-xl p-3 border border-[#1a2621]'>
                        <div className='flex items-start gap-4'>
                          <div className='flex-1'>
                            <div className='flex items-center justify-between mb-2'>
                              <h4 className='text-white font-semibold'>{review.name}</h4>
                              <span className='text-gray-500 text-sm'>{new Date(review.date).toLocaleDateString()}</span>
                            </div>
                            <div className='flex mb-2'>
                              <StarRating rating={review.rating} />
                            </div>
                            <p className='text-gray-300 lg:text-sm text-xs leading-relaxed'>{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='text-center py-8'>
                    <div className='w-16 h-16 bg-[#1a2621] rounded-full flex items-center justify-center mx-auto mb-3'>
                      <svg className='w-8 h-8 text-gray-600' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                    </div>
                    <p className='text-gray-500'>No reviews yet</p>
                    <p className='text-gray-600 text-sm mt-1'>Be the first to review this mentor!</p>
                  </div>
                )}
              </div>
              </div>

              {/* Desktop view: all stacked vertically */}
              <div className='hidden lg:block'>
                <div className='relative w-full aspect-square max-w-[280px] mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-[#DBFF00]/20'>
                  <Image 
                    src={mentor.imgUrl || "/placeholder.svg"}
                    alt={mentor.fullName}
                    fill
                    className='object-cover'
                    priority
                    quality={100}
                  />
                </div>

                {/* Category Badge */}
                {mentor.category && (
                  <div className='mt-4 text-center'>
                    <span className='inline-block bg-[#DBFF00] text-black px-4 py-2 rounded-full text-sm font-bold'>
                      {mentor.category}
                    </span>
                  </div>
                )}

                {/* Rating Summary */}
                {mentor?.rating && mentor?.rating > 0 && (
                  <div className='mt-4 bg-[#141d18] rounded-2xl p-4 text-center'>
                    <div className='flex items-center justify-center gap-2 mb-2'>
                      <span className='text-4xl font-bold text-white'>{mentor.rating.toFixed(1)}</span>
                    </div>
                    <div className='flex justify-center mb-2'>
                      <StarRating rating={mentor.rating} />
                    </div>
                    <p className='text-gray-400 text-sm'>{mentor.totalReviews} reviews</p>
                  </div>
                )}
              </div>

              {/* Rates Card */}
              {mentor.rates && (
                <div className='mt-4 bg-gradient-to-br from-[#141d18] to-[#0a120f] rounded-2xl p-6 border border-[#1a2621]'>
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

              {/* Social & Portfolio Links */}
              <div className='mt-4 bg-linear-to-br from-[#141d18] to-[#0a120f] rounded-2xl p-5 border border-[#1a2621]'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='w-10 h-10 bg-[#DBFF00] rounded-lg flex items-center justify-center'>
                    <svg className='w-5 h-5 text-black' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <h3 className='text-white font-bold text-xl'>Connect</h3>
                </div>
                
                <div className='space-y-3'>
                  {mentor.portfolio ? (
                    <a 
                      href={mentor.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='flex items-center gap-4 p-2 bg-[#1a2621] hover:bg-[#1f2d26] rounded-xl transition-all duration-300 hover:translate-x-1 group'
                    >
                      <div className='w-8 h-8 bg-[#DBFF00] group-hover:bg-white rounded-full flex items-center justify-center transition-colors'>
                        <svg className='w-4 h-4 text-black' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                      </div>
                      <span className='text-white font-semibold text-sm'>Portfolio</span>
                    </a>
                  ) : null}

                  {mentor.twitter && (
                    <a 
                      href={mentor.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='flex items-center gap-4 p-2 bg-[#1a2621] hover:bg-[#1f2d26] rounded-xl transition-all duration-300 hover:translate-x-1 group'
                    >
                      <div className='w-8 h-8 bg-[#DBFF00] group-hover:bg-white rounded-full flex items-center justify-center transition-colors'>
                        <FaXTwitter className='text-black text-lg' />
                      </div>
                      <span className='text-white font-semibold text-sm'>Twitter / X</span>
                    </a>
                  )}
                 
                  {mentor.linkedin && (
                    <a 
                      href={mentor.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='flex items-center gap-4 p-2 bg-[#1a2621] hover:bg-[#1f2d26] rounded-xl transition-all duration-300 hover:translate-x-1 group'
                    >
                      <div className='w-8 h-8 bg-[#DBFF00] group-hover:bg-white rounded-full flex items-center justify-center transition-colors'>
                        <FaLinkedinIn className='text-black text-lg' />
                      </div>
                      <span className='text-white font-semibold text-sm'>LinkedIn</span>
                    </a>
                  )}

                  {!mentor.portfolio && !mentor.twitter && !mentor.linkedin && (
                    <p className='text-gray-500 text-sm text-center py-2'>No links available</p>
                  )}
                </div>
              </div>
            </div>

            {/* Reviews Section */}
              <div className='bg-[#141d18] block lg:hidden rounded-xl p-3'>
                <h2 className='text-2xl font-bold text-white mb-2'>
                  Reviews {mentor?.totalReviews && mentor?.totalReviews > 0 && `(${mentor.totalReviews})`}
                </h2>
                
                {mentor.reviews && mentor.reviews.length > 0 ? (
                  <div className='space-y-2'>
                    {mentor.reviews.map((review, idx) => (
                      <div key={idx} className='bg-[#0a120f] rounded-xl p-3 border border-[#1a2621]'>
                        <div className='flex items-start gap-4'>
                          <div className='flex-1'>
                            <div className='flex items-center justify-between mb-2'>
                              <h4 className='text-white font-semibold'>{review.name}</h4>
                              <span className='text-gray-500 text-sm'>{new Date(review.date).toLocaleDateString()}</span>
                            </div>
                            <div className='flex mb-2'>
                              <StarRating rating={review.rating} />
                            </div>
                            <p className='text-gray-300 lg:text-sm text-xs leading-relaxed'>{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='text-center py-8'>
                    <div className='w-16 h-16 bg-[#1a2621] rounded-full flex items-center justify-center mx-auto mb-3'>
                      <svg className='w-8 h-8 text-gray-600' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                    </div>
                    <p className='text-gray-500'>No reviews yet</p>
                    <p className='text-gray-600 text-sm mt-1'>Be the first to review this mentor!</p>
                  </div>
                )}
              </div>

            {/* Right Column - Details */}
            <div className='lg:col-span-9 lg:block hidden space-y-6'>
              {/* Name & Title - Desktop Only */}
              <div className='hidden lg:block'>
                <h1 className='text-4xl lg:text-5xl font-bold text-white mb-2'>
                  {mentor.fullName}
                </h1>
                <p className='text-xl text-[#DBFF00] mb-4'>{mentor.title}</p>
              </div>

              {/* About Section */}
              <div className='bg-[#141d18] rounded-2xl p-6'>
                <h2 className='text-2xl font-bold text-white mb-3'>About</h2>
                <p className='text-gray-300 leading-relaxed'>
                  {mentor.bio}
                </p>
              </div>

              {/* Skills */}
              <div className='bg-[#141d18] rounded-2xl p-6'>
                <h2 className='text-2xl font-bold text-white mb-3'>Expertise</h2>
                <ul className='flex flex-wrap gap-2'>
                  {mentor.skills.map((skill, idx) => (
                    <li 
                      key={idx} 
                      className='border border-emerald-100 text-emerald-50 text-sm rounded-full px-4 py-2'
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Session Types */}
              <div className='bg-[#141d18] rounded-2xl p-6'>
                <h2 className='text-2xl font-bold text-white mb-3'>Session Types Offered</h2>
                <div className='flex flex-wrap gap-2'>
                  {mentor.sessionTypes?.map((type, idx) => (
                    <div 
                      key={idx} 
                      className='bg-[#DBFF00] text-black font-semibold text-sm rounded-full px-5 py-2.5'
                    >
                      {type}
                    </div>
                  ))}
                </div>
              </div>

              {/* Details Grid */}
              <div className='grid md:grid-cols-2 gap-4'>
                <div className='bg-[#141d18] rounded-2xl p-5'>
                  <div className='flex items-center gap-3 mb-2'>
                    <div className='w-10 h-10 bg-[#DBFF00] rounded-full flex items-center justify-center'>
                      <svg className='w-5 h-5 text-black' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className='text-lg font-bold text-white'>Experience</h3>
                  </div>
                  <p className='text-gray-300'>{mentor.experience} years</p>
                </div>

                {mentor.dailyMentoringTime && (
                  <div className='bg-[#141d18] rounded-2xl p-5'>
                    <div className='flex items-center gap-3 mb-2'>
                      <div className='w-10 h-10 bg-[#DBFF00] rounded-full flex items-center justify-center'>
                        <svg className='w-5 h-5 text-black' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className='text-lg font-bold text-white'>Daily Availability</h3>
                    </div>
                    <p className='text-gray-300'>{mentor.dailyMentoringTime}</p>
                  </div>
                )}

                <div className='bg-[#141d18] rounded-2xl p-5'>
                  <div className='flex items-center gap-3 mb-2'>
                    <div className='w-10 h-10 bg-[#DBFF00] rounded-full flex items-center justify-center'>
                      <svg className='w-5 h-5 text-black' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className='text-lg font-bold text-white'>Availability</h3>
                  </div>
                  <p className='text-gray-300'>{mentor.availability}</p>
                </div>

                <div className='bg-[#141d18] rounded-2xl p-5'>
                  <div className='flex items-center gap-3 mb-2'>
                    <div className='w-10 h-10 bg-[#DBFF00] rounded-full flex items-center justify-center'>
                      <svg className='w-5 h-5 text-black' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                    </div>
                    <h3 className='text-lg font-bold text-white'>Languages</h3>
                  </div>
                  <p className='text-gray-300'>{mentor.languages?.join(', ')}</p>
                </div>
              </div>

              {/* Certificates Section */}
              {mentor.certificates && mentor.certificates.length > 0 ? (
                <div className='bg-[#141d18] rounded-2xl p-6'>
                  <h2 className='text-2xl font-bold text-white mb-4'>Certifications/Awards</h2>
                  <div className='grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 grid-cols-2 gap-2'>
                    {mentor.certificates.map((cert, idx) => (
                      <div key={idx} className='relative aspect-square rounded-xl overflow-hidden border border-[#1a2621] hover:border-[#DBFF00] transition-all'>
                        <Image 
                          src={cert}
                          alt={`Certificate ${idx + 1}`}
                          fill
                          className='object-cover'
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Reviews Section */}
              <div className='bg-[#141d18] lg:block block rounded-2xl p-5'>
                <h2 className='text-2xl font-bold text-white mb-2'>
                  Reviews {mentor?.totalReviews && mentor?.totalReviews > 0 && `(${mentor.totalReviews})`}
                </h2>
                
                {mentor.reviews && mentor.reviews.length > 0 ? (
                  <div className='space-y-2'>
                    {mentor.reviews.map((review, idx) => (
                      <div key={idx} className='bg-[#0a120f] rounded-xl p-3 border border-[#1a2621]'>
                        <div className='flex items-start gap-4'>
                          <div className='flex-1'>
                            <div className='flex items-center justify-between mb-2'>
                              <h4 className='text-white font-semibold'>{review.name}</h4>
                              <span className='text-gray-500 text-sm'>{new Date(review.date).toLocaleDateString()}</span>
                            </div>
                            <div className='flex mb-2'>
                              <StarRating rating={review.rating} />
                            </div>
                            <p className='text-gray-300 lg:text-sm text-xs leading-relaxed'>{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='text-center py-8'>
                    <div className='w-16 h-16 bg-[#1a2621] rounded-full flex items-center justify-center mx-auto mb-3'>
                      <svg className='w-8 h-8 text-gray-600' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                    </div>
                    <p className='text-gray-500'>No reviews yet</p>
                    <p className='text-gray-600 text-sm mt-1'>Be the first to review this mentor!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className='bg-[#DBFF00] py-12 px-5 2xl:px-72 xl:px-40 lg:px-40'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl lg:text-4xl font-bold text-black mb-3'>
            Ready to start with {mentor.fullName.split(' ')[0]}?
          </h2>
          <p className='text-lg text-gray-800 mb-6'>
            Book your first session today and get personalized guidance
          </p>
          <div className='flex flex-wrap gap-4 justify-center'>
              <a href="https://wa.link/lyrmqd" target="_blank" rel="noopener noreferrer">
                <button className='bg-black cursor-pointer text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-900 transition-colors'>
                  Schedule Consultation
                </button>
              </a>
              <Link href='/mentors'>
                <button className='bg-transparent border-2 border-black cursor-pointer text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-black hover:text-white transition-colors'>
                  View All Mentors
                </button>
              </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const Mentor = () => {
  return (
    <Suspense fallback={<MentorLoadingState />}>
      <MentorContent />
    </Suspense>
  )
}

export default Mentor
