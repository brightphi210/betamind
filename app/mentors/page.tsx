'use client'

import React, { useState, useEffect, useMemo, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { mentors } from '../mocks/mentors'
import { FaStar } from 'react-icons/fa6'

function MentorsContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState('featured')
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  useEffect(() => {
    if (categoryParam) {
      setSearchQuery(categoryParam)
    }
  }, [categoryParam])
  
  useEffect(() => {
    AOS.init()
  }, [])

  useEffect(() => {
    if (isFilterModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isFilterModalOpen])

  const allSkills = [...new Set(mentors.flatMap(mentor => mentor.skills))]
  const allCategories = [...new Set(mentors.map(mentor => mentor.category || 'Other'))]

  const filteredMentors = useMemo(() => {
    let result = [...mentors]

    if (searchQuery) {
      result = result.filter(mentor => 
        mentor.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
        mentor.category?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedSkills.length > 0) {
      result = result.filter(mentor =>
        selectedSkills.some(skill => mentor.skills.includes(skill))
      )
    }

    if (selectedCategory !== 'all') {
      result = result.filter(mentor => mentor.category === selectedCategory)
    }

    if (sortBy === 'name') {
      result.sort((a, b) => a.fullName.localeCompare(b.fullName))
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    } else if (sortBy === 'popular') {
      result.reverse()
    }

    return result
  }, [searchQuery, selectedSkills, selectedCategory, sortBy])

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev: string[]) =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    )
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedSkills([])
    setSelectedCategory('all')
    setSortBy('featured')
  }

  const FilterContent = () => (
    <div className='space-y-6'>
      <div className='bg-[#011409] p-6 rounded-2xl border border-gray-800'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-xl font-bold text-[#DBFF00]'>Filters</h3>
          {(selectedSkills.length > 0 || selectedCategory !== 'all' || searchQuery) && (
            <button
              onClick={clearFilters}
              className='text-sm text-gray-400 hover:text-[#DBFF00] transition-colors'
            >
              Clear All
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className='mb-6'>
          <label className='block text-sm font-semibold mb-3 text-gray-300'>Category</label>
          <div className='space-y-2'>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#DBFF00] text-black font-semibold'
                  : 'bg-[#001309] border border-gray-700 hover:border-[#DBFF00] text-gray-300'
              }`}
            >
              All Categories
            </button>
            {allCategories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                  selectedCategory === category
                    ? 'bg-[#DBFF00] text-black font-semibold'
                    : 'bg-[#001309] border border-gray-700 hover:border-[#DBFF00] text-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Filter */}
        <div>
          <label className='block text-sm font-semibold mb-3 text-gray-300'>Skills & Expertise</label>
          <div className='flex flex-wrap gap-2 max-h-64 overflow-y-auto'>
            {allSkills.slice(0, 15).map(skill => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  selectedSkills.includes(skill)
                    ? 'bg-[#DBFF00] text-black font-semibold'
                    : 'bg-[#001309] border border-gray-700 hover:border-[#DBFF00] text-gray-300'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className='bg-gradient-to-br from-[#DBFF00] to-[#c5e600] p-6 rounded-2xl text-black'>
        <h4 className='text-2xl font-bold'>{filteredMentors.length}</h4>
        <p className='text-sm'>Mentors Available</p>
      </div>
    </div>
  )

  return (
    <div className='min-h-screen text-white'>
      {/* Hero Section */}
      <div className='relative overflow-hidden bg-gradient-to-br from-[#000804] to-[#000c05] border-b border-gray-900'>
        <div className='absolute inset-0 opacity-10'>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="mentor-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <circle cx="25" cy="25" r="2" fill="#DBFF00" opacity="0.5"/>
                <line x1="0" y1="0" x2="50" y2="50" stroke="#DBFF00" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mentor-pattern)"/>
          </svg>
        </div>

        <div className='relative 2xl:px-72 xl:px-40 lg:px-40 px-5 py-24 pb-5 lg:py-20 lg:pt-56'>
          <div className='max-w-4xl mx-auto text-center'>
            <h1 data-aos="fade-up" data-aos-duration="500" className='text-5xl lg:text-5xl font-bold mb-6'>
              Find Your Perfect <span className='text-[#DBFF00]'>Mentor</span>
            </h1>
            <p data-aos="fade-up" data-aos-duration="600" className='text-base text-gray-300 mb-5'>
              Connect with experienced professionals <br className='lg:block hidden'/> across various fields and accelerate your career growth
            </p>
            
            <div data-aos="fade-up" data-aos-duration="700" className='max-w-2xl mx-auto'>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Search by name, skill, or expertise...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='w-full px-6 py-5 pr-14 rounded-full bg-white/10 backdrop-blur border border-green-950 focus:border-[#DBFF00] focus:outline-none text-white placeholder-gray-400 text-lg'
                />
                <button className='absolute right-2 top-1/2 -translate-y-1/2 bg-[#DBFF00] text-black p-3 rounded-full hover:bg-[#c5e600] transition-all duration-300'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='2xl:px-72 xl:px-40 lg:px-40 px-6 py-12'>
        <div className='flex lg:flex-row flex-col gap-4'>
          {/* Sidebar Filters */}
          <aside className='lg:w-68 w-full lg:block hidden'>
            <div className='sticky top-24'>
              <FilterContent />
            </div>
          </aside>

          {/* Mentors Grid */}
          <main className='flex-1'>
            {/* Mobile Filter Button */}
            <div className='lg:hidden mb-6 flex items-center justify-between'>
              <div>
                <h2 className='text-2xl font-bold'>
                  {searchQuery ? `Results for "${searchQuery}"` : 'All Mentors'}
                </h2>
                <p className='text-gray-400 text-sm'>
                  Showing {filteredMentors.length} of {mentors.length} mentors
                </p>
              </div>
              <button
                onClick={() => setIsFilterModalOpen(true)}
                className='bg-[#DBFF00] text-black px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-[#c5e600] transition-all duration-300'
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
                {(selectedSkills.length > 0 || selectedCategory !== 'all') && (
                  <span className='bg-black text-[#DBFF00] rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold'>
                    {selectedSkills.length + (selectedCategory !== 'all' ? 1 : 0)}
                  </span>
                )}
              </button>
            </div>

            {/* Results Header */}
            <div className='mb-8 lg:block hidden'>
              <h2 className='text-2xl font-bold mb-2'>
                {searchQuery ? `Results for "${searchQuery}"` : 'All Mentors'}
              </h2>
              <p className='text-gray-400'>
                Showing {filteredMentors.length} of {mentors.length} mentors
              </p>
            </div>

            {/* Mentors Grid */}
            {filteredMentors.length > 0 ? (
              <div className='grid lg:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-3'>
                {filteredMentors.map((mentor, index) => (
                  <div
                    key={index}
                    data-aos="fade-up"
                    data-aos-duration={500}
                    data-aos-delay={index * 50}
                    className='bg-[#0e1b14] text-white rounded-2xl overflow-hidden hover:shadow-2xl'
                  >
                    <div className='lg:h-[280px] h-[350px] p-5 rounded-2xl overflow-hidden relative'>
                      <Image
                        src={mentor.imgUrl}
                        alt={mentor.fullName}
                        width={0}
                        height={0}
                        priority
                        quality={100}
                        unoptimized
                        className='w-full h-full rounded-2xl object-cover group-hover:scale-110 transition-transform duration-500'
                      />
                      <div className='absolute top-3 right-3 bg-[#DBFF00] text-black px-3 py-1 rounded-full text-xs font-bold'>
                        Available
                      </div>
                      {mentor.rating > 0 && (
                        <div className='absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1'>
                          <FaStar className='text-yellow-400' />
                          {mentor.rating.toFixed(1)}
                        </div>
                      )}
                    </div>

                    <div className='p-5 space-y-3'>
                      <div>
                        <h3 className='text-xl font-bold'>{mentor.fullName}</h3>
                        <p className='text-sm text-gray-400'>{mentor.title}</p>
                        {mentor.category && (
                          <span className='inline-block mt-2 bg-[#DBFF00]/10 text-[#DBFF00] px-2 py-1 rounded text-xs font-semibold'>
                            {mentor.category}
                          </span>
                        )}
                      </div>

                      <ul className='flex flex-wrap gap-2'>
                        {mentor.skills.slice(0, 3).map((skill, idx) => (
                          <li
                            key={idx}
                            className='bg-none border border-emerald-200 text-emerald-200 text-xs rounded-full py-1 px-3'
                          >
                            {skill}
                          </li>
                        ))}
                        {mentor.skills.length > 3 && (
                          <li className='text-xs text-gray-500 py-1 px-3'>
                            +{mentor.skills.length - 3} more
                          </li>
                        )}
                      </ul>

                      <div className='pt-1'>
                        <Link
                          href={{
                            pathname: '/mentor',
                            query: {
                              id: index,
                              data: JSON.stringify(mentor)
                            }
                          }}
                        >
                          <button className='w-full bg-[#DBFF00] text-black font-semibold py-3 rounded-full hover:bg-[#c5e600] transition-all duration-300'>
                            View Profile
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-center py-20'>
                <div className='text-6xl mb-4'>🔍</div>
                <h3 className='text-2xl font-bold mb-3'>No mentors found</h3>
                <p className='text-gray-400 mb-6'>
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={clearFilters}
                  className='bg-[#DBFF00] text-black px-8 py-3 rounded-full font-semibold hover:bg-[#c5e600] transition-all duration-300'
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Filter Modal */}
      {isFilterModalOpen && (
        <div className='lg:hidden fixed inset-0 z-50 overflow-hidden'>
          <div 
            className='absolute inset-0 bg-black/50 backdrop-blur-sm'
            onClick={() => setIsFilterModalOpen(false)}
          />
          
          <div className='absolute bottom-0 left-0 right-0 bg-[#01140c] rounded-t-3xl max-h-[85vh] w-[95%] justify-center items-center rounded-3xl m-auto overflow-y-auto animate-slide-up'>
            <div className='sticky top-0 bg-[#01140c] px-6 py-4 flex items-center justify-between'>
              <h3 className='text-2xl font-bold text-[#DBFF00]'>Filters</h3>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className='text-gray-400 hover:text-white transition-colors'
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className='p-2'>
              <FilterContent />
            </div>

            <div className='sticky bottom-0 bg-[#01140c] border-t border-gray-800 px-6 py-4 flex gap-3'>
              <button
                onClick={clearFilters}
                className='flex-1 bg-transparent border-2 border-gray-700 text-white font-semibold px-6 py-4 rounded-full hover:border-[#DBFF00] hover:text-[#DBFF00] transition-all duration-300'
              >
                Clear All
              </button>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className='flex-1 bg-[#DBFF00] text-black font-semibold px-6 py-4 rounded-full hover:bg-[#c5e600] transition-all duration-300'
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className='2xl:px-72 xl:px-40 lg:px-40 px-4 py-20 bg-gradient-to-br from-[#0a2818] to-[#02160b] border-t border-gray-800'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 data-aos="fade-up" data-aos-duration="500" className='text-4xl lg:text-5xl font-bold mb-6'>
            {"Can't find the right mentor?"}
          </h2>
          <p data-aos="fade-up" data-aos-duration="600" className='text-xl text-gray-300 mb-8'>
            Let us help you find the perfect match for your goals
          </p>
          <div data-aos="fade-up" data-aos-duration="700" className='flex flex-col sm:flex-row gap-4 justify-center'>
            <a 
              href='https://forms.gle/8pCTowztYmb1X4L27'
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className='bg-[#DBFF00] text-black font-bold px-10 py-4 rounded-full hover:bg-[#c5e600] transition-all duration-300 shadow-lg'>
                Request a Mentor
              </button>
            </a>

            <a 
              href='https://forms.gle/FGzgmb71FWjRMDc56'
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className='bg-transparent border-2 border-[#DBFF00] text-[#DBFF00] font-bold px-10 py-4 rounded-full hover:bg-[#DBFF00] hover:text-black transition-all duration-300'>
                Become a Mentor
              </button>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

const Mentors = () => {
  return (
    <Suspense fallback={
      <div className='min-h-screen bg-[#000804] flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#DBFF00] mx-auto mb-4'></div>
          <p className='text-gray-400'>Loading mentors...</p>
        </div>
      </div>
    }>
      <MentorsContent />
    </Suspense>
  )
}

export default Mentors