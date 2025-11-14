'use client'

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaXTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa6';
import RoleSelectionModal from '../components/SelectModal';

const AboutPage = () => {
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
  
  useEffect(() => {
    // Simple scroll reveal effect
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const teamMembers = [
    {
      name: "Bright Philip",
      role: "Founder & CEO",
      image: '/assets/mentorme1.png',
      bio: "Software Engineer, Creator of @BetaUI, Co-Builder @Creve",
      twitter: "https://x.com/chibuzorphilip7",
      linkedin: "https://www.linkedin.com/in/chibuzor-philip12/",
    },
    {
      name: "Emeka Michael Awa",
      role: "Co-Founder & CTO",
      image: "/assets/mentorme2.jpg",
      bio: "Software Engineer, Co-Builder @Creve",
      twitter: "https://x.com/Mictovic",
      linkedin: "https://linkedin.com/in/emeka-michael-2059a3230/"
    },
    {
      name: "Kelly Edojah",
      role: "Co-Founder & COO",
      image: "/assets/mentorme3s.jpg",
      bio: "Brand/Content Designer",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Desire Irechukwu",
      role: "Content Lead & Community Manager",
      image: "/assets/beta.png",
      bio: "Content Lead, Marketing, Community Manager @Betamind @LetsBuildDao",
      twitter: "https://x.com/Desire_scribe?t=FtDGkvNxDjNA8805-NwN-A&s",
      linkedin: "https://linkedin.com",
    },
  ];

  const values = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: "Accessible to All",
      description: "Mentorship shouldn't be limited by privilege or proximity. We make quality guidance available to everyone, everywhere."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Fully Vetted Mentors",
      description: "Every mentor on Betamind is carefully vetted to ensure you receive authentic guidance from experienced professionals."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Real Progress",
      description: "We're built for tangible growth. Our platform focuses on meaningful connections that drive real skill development and career advancement."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      ),
      title: "Affordable & Transparent",
      description: "No hidden costs, no barriers. We believe quality mentorship should be affordable and transparent for everyone."
    }
  ];



  return (
    <div className="min-h-screen bg-[#020c08] text-white">

      <RoleSelectionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#000804] to-[#000c05] border-b border-gray-900 lg:pt-40 pt-32 lg:pb-20 pb-10 px-5 lg:px-20">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="about-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="2" fill="#DBFF00" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#about-pattern)"/>
          </svg>
        </div>

        <div className="relative max-w-6xl mx-auto text-center lg:pt-10">
          <div className="inline-block mb-6 px-4 py-2 bg-[#DBFF00] bg-opacity-10 border border-[#DBFF00] rounded-full">
            <span className="text-black text-sm font-semibold">About Us</span>
          </div>
          <h1 className="lg:text-5xl text-4xl font-bold mb-6 leading-snug">
            Building Better Minds <br className='lg:block hidden'/> Through
            <span className="mt-2 text-[#DBFF00]"> Mentorship</span>
          </h1>
          <p className="text-base text-gray-400 max-w-3xl mx-auto mb-0 ">
            At Betamind, we believe that growth starts with guidance. We are a mentorship platform 
            built to make access to quality mentorship easy, affordable, and meaningful.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      {/* <div className="px-5 lg:px-20 py-16 fade-in">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center p-6 bg-[#141d18] rounded-2xl border border-[#1a2621]">
              <div className="text-4xl lg:text-5xl font-bold text-[#DBFF00] mb-2">{stat.number}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div> */}

      {/* Mission Section */}
      <div className="2xl:px-88 xl:px-40 lg:px-40 px-4 py-10">
        <div className="mx-auto">
          <div className="lg:grid lg:grid-cols-2 flex flex-col-reverse lg:gap-8 gap-4 items-center">
            <div className="fade-in">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-300 text-base mb-6 leading-relaxed">
                We understand that mentorship shouldn't be limited to privilege or proximity. That's why 
                Betamind brings mentorship closer to you — through a platform that's flexible, transparent, 
                and built for real progress.
              </p>
              <p className="text-gray-300 text-base leading-relaxed">
                At the heart of Betamind is a community of fully vetted mentors across different fields 
                who are ready to share their experience, guide your learning process, and help you reach 
                your next level — all without the barriers of cost or access.
              </p>
              <div className="mt-8 p-6 bg-[#DBFF00] bg-opacity-10 border-l-4 border-[#DBFF00] rounded-lg">
                <p className="text-black text-base font-semibold italic">
                  "Because at Betamind, we don't just connect mentors and mentees — we build better minds."
                </p>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden">
               <Image 
                src={'/assets/mentorme5.jpg'}
                alt='patter'
                width={0}
                height={0}
                priority
                quality={100}
                unoptimized
                className='w-full'
                />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020c08] via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="2xl:px-88 xl:px-40 lg:px-40 px-4 py-20 bg-[#01140a]">
        <div className="mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">Our Core Values</h2>
            <p className="text-base text-gray-400">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 gap-4">
            {values.map((value, idx) => (
              <div key={idx} className="bg-[#011409] rounded-2xl p-5 ease-linear delay-200 transition-all border border-[#1a2621] hover:border-[#DBFF00]">
                <div className="w-16 h-16 bg-[#DBFF00] rounded-xl flex items-center justify-center text-black mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="2xl:px-88 xl:px-40 lg:px-40 px-4 py-20">
        <div className="mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">Meet the Team</h2>
            <p className="text-xl text-gray-400">The passionate people behind the vision</p>
          </div>
          <div className="grid md:grid-cols-2 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 gap-4">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="group">
                <div className="bg-[#01140a] rounded-2xl overflow-hidden border border-[#1a2621] hover:border-[#DBFF00] transition-all duration-300">
                  <div className="relative h-80 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#01140a] via-transparent to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                    <p className="text-[#DBFF00] mb-4">{member.role}</p>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">{member.bio}</p>
                    <div className="flex items-center gap-3">
                      {member.twitter && (
                        <a 
                          href={member.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-[#1a2621] hover:bg-[#DBFF00] rounded-full flex items-center justify-center transition-colors group/icon"
                        >
                          <FaXTwitter className="text-white group-hover/icon:text-black text-lg" />
                        </a>
                      )}
                      {member.linkedin && (
                        <a 
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-[#1a2621] hover:bg-[#DBFF00] rounded-full flex items-center justify-center transition-colors group/icon"
                        >
                          <FaLinkedinIn className="text-white group-hover/icon:text-black text-lg" />
                        </a>
                      )}
                     
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="2xl:px-88 xl:px-40 lg:px-40 px-4 py-20 bg-gradient-to-b from-transparent to-[#010e06]">
        <div className="mx-auto text-center">
          <div className="bg-gradient-to-br from-[#DBFF00] to-[#b8d900] rounded-3xl p-12 lg:p-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
              Join Our Growing Community
            </h2>
            <p className="text-xl text-gray-800 mb-8">
              Whether you're looking for guidance or ready to share your expertise, 
              there's a place for you here.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
                <div>
                    <Link href={'/mentors'}>
                        <button className="bg-black text-white px-8 cursor-pointer py-4 rounded-full text-lg font-semibold hover:bg-gray-900 transition-colors">
                            Browse Mentors
                        </button>
                    </Link>
                </div>

                <div>
                    <button onClick={handleGetStarted} className="bg-transparent border-2 border-black text-black px-8 py-4 rounded-full text-lg font-semibold cursor-pointer transition-colors">
                        Get Started
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;