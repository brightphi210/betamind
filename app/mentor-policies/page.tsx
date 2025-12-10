'use client'

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaUserCheck, FaHandshake, FaGavel } from 'react-icons/fa';

const MentorPoliciesPage = () => {
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



  const policies = [
    {
      icon: <FaUserCheck className="text-3xl" />,
      title: "Eligibility Requirements",
      items: [
        "Minimum of 3 years of professional experience in your field",
        "Proven track record of achievements and expertise",
        "Strong communication and interpersonal skills",
        "Commitment to ethical professional conduct",
        "Availability for regular mentorship sessions"
      ]
    },
    {
      icon: <FaHandshake className="text-3xl" />,
      title: "Mentorship Standards",
      items: [
        "Respond to mentee inquiries within 48 hours",
        "Prepare adequately for scheduled mentorship sessions",
        "Set clear expectations and goals with your mentees",
        "Provide actionable advice based on real experience",
        "Maintain consistency and reliability in your commitments"
      ]
    },
    {
      icon: <FaGavel className="text-3xl" />,
      title: "Platform Guidelines",
      items: [
        "Complete profile with accurate information and credentials",
        "Keep your availability calendar up to date",
        "Honor your scheduled sessions or provide adequate notice for cancellations",
        "Use the platform's communication tools for all mentorship interactions",
        "Comply with pricing guidelines and payment terms"
      ]
    }
  ];

  const benefits = [
    "Build your personal brand and expand your professional network",
    "Earn income by sharing your knowledge and expertise",
    "Make a meaningful impact on aspiring professionals",
    "Flexible scheduling that works around your commitments",
    "Access to a supportive community of fellow mentors",
    "Professional development opportunities and resources"
  ];

  return (
    <div className="min-h-screen bg-[#020c08] text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-linear-to-br from-[#000804] to-[#000c05] border-b border-gray-900 lg:pt-40 pt-32 lg:pb-20 pb-10 px-5 lg:px-20">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="policy-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="2" fill="#DBFF00" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#policy-pattern)"/>
          </svg>
        </div>

        <div className="relative max-w-6xl mx-auto text-center lg:pt-10">
          <div className="inline-block mb-6 px-4 py-2 bg-[#DBFF00] bg-opacity-10 border border-[#DBFF00] rounded-full">
            <span className="text-black text-sm font-semibold">Mentor Policies</span>
          </div>
          <h1 className="lg:text-5xl text-4xl font-bold mb-6 leading-snug">
            Mentor <span className="mt-2 text-[#DBFF00]"> Guidelines</span>
          </h1>
          <p className="text-base text-gray-400 max-w-3xl mx-auto mb-0">
            At Betamind, we maintain high standards to ensure quality mentorship experiences. 
            Please review our policies carefully before applying to become a mentor.
          </p>
        </div>
      </div>

      {/* Introduction */}
      <div className="2xl:px-88 xl:px-40 lg:px-40 px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#01140a] rounded-2xl p-8 border border-[#1a2621]">
            <h2 className="text-2xl font-bold mb-4 text-[#DBFF00]">Welcome to the Betamind Mentor Community</h2>
            <p className="text-gray-300 text-base leading-relaxed mb-4">
              As a mentor on Betamind, you have the opportunity to shape careers, share your expertise, 
              and contribute to a thriving community of learners. With this privilege comes the responsibility 
              to uphold our standards of excellence, professionalism, and integrity.
            </p>
            <p className="text-gray-300 text-base leading-relaxed">
              These policies are designed to protect both mentors and mentees, ensuring a safe, productive, 
              and rewarding experience for everyone on our platform.
            </p>
          </div>
        </div>
      </div>

      {/* Policies Section - Flexed */}
      <div className="2xl:px-88 xl:px-40 lg:px-40 px-4 py-10">
        <div className="mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {policies.map((policy, idx) => (
              <div key={idx} className="bg-[#01140a] rounded-2xl p-8 border border-[#1a2621] hover:border-[#DBFF00] transition-all duration-300 flex flex-col">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-16 h-16 bg-[#DBFF00] rounded-xl flex items-center justify-center text-black shrink-0 mb-4">
                    {policy.icon}
                  </div>
                  <h3 className="text-xl font-bold">{policy.title}</h3>
                </div>
                <ul className="space-y-3 grow">
                  {policy.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-3 text-gray-300">
                      <FaCheckCircle className="text-[#DBFF00] mt-1 shrink-0 text-sm" />
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="2xl:px-88 xl:px-40 lg:px-40 px-4 py-20">
        <div className="mx-auto">
          <div className="lg:grid lg:grid-cols-2 flex flex-col gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Benefits of Being a Betamind Mentor</h2>
              <ul className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <FaCheckCircle className="text-[#DBFF00] mt-1 shrink-0 text-xl" />
                    <span className="text-base leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
              <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden">
              <img 
                src="/assets/mentorme5.jpg" 
                alt="Mentor benefits"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#020c08] via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="2xl:px-88 xl:px-40 lg:px-40 px-4 py-20">
        <div className="mx-auto text-center">
          <div className="bg-linear-to-br from-[#DBFF00] to-[#b8d900] rounded-3xl p-8 lg:p-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
              Ready to Become a Mentor?
            </h2>
            <p className="text-base text-gray-800 mb-8 max-w-2xl mx-auto">
              If you agree to our policies and are committed to providing quality mentorship, 
              we'd love to have you join our community of expert mentors.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">

                <a className='w-full'
                    href={'https://forms.gle/FGzgmb71FWjRMDc56'}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                <button 
                    className="bg-black text-white px-8 cursor-pointer py-4 rounded-full text-lg font-semibold hover:bg-gray-900 transition-colors"
                >
                    Register as a Mentor
                </button>
                </a>
            </div>
            <p className="text-xs text-gray-700 mt-6">
              Questions? Contact us at <a href="mailto:betamind@gmail.com" className="underline font-semibold">betamind@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorPoliciesPage;
          