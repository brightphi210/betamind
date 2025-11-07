'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { FaXTwitter, FaLinkedinIn } from 'react-icons/fa6'

const Support = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I get started with Betamind?",
          answer: "Getting started is simple! Browse our mentor directory, select a mentor that matches your goals, and book your first session. You can filter mentors by expertise, availability, and language to find the perfect match."
        },
        {
          question: "How much does mentorship cost?",
          answer: "Each mentor sets their own rates, which are displayed on their profile. We believe in transparent pricing with no hidden fees. Many mentors offer flexible packages and discounted rates for multiple sessions."
        },
        {
          question: "What types of sessions are available?",
          answer: "Mentors offer various session types including 1-on-1 consultations, group sessions, and workshops. Session formats can be video calls, phone calls, or async messaging depending on the mentor's offerings."
        }
      ]
    },
    {
      category: "For Mentees",
      questions: [
        {
          question: "How do I choose the right mentor?",
          answer: "Review mentor profiles carefully, looking at their expertise, experience, and bio. Check their session types and availability. You can also reach out to mentors with questions before booking to ensure they're the right fit for your goals."
        },
        {
          question: "Can I reschedule or cancel a session?",
          answer: "Yes, you can reschedule or cancel sessions according to each mentor's cancellation policy, which is stated on their profile. We recommend giving at least 24 hours notice when possible."
        },
        {
          question: "How are sessions conducted?",
          answer: "Most sessions are conducted via video call through our platform. Some mentors also offer phone calls or async messaging. The session format will be clearly stated when you book."
        }
      ]
    },
    {
      category: "For Mentors",
      questions: [
        {
          question: "How do I become a mentor on Betamind?",
          answer: "We carefully vet all mentors to ensure quality. Apply through our 'Become a Mentor' page, providing details about your expertise and experience. Our team will review your application and get back to you within 5-7 business days."
        },
        {
          question: "How do I set my rates?",
          answer: "You have full control over your pricing. Set your hourly rate, package prices, and availability based on your expertise and schedule. You can update your rates at any time from your mentor dashboard."
        },
        {
          question: "How and when do I get paid?",
          answer: "Payments are processed securely through our platform. You'll receive payment within 7 days after a completed session. We support multiple payout methods including bank transfer and digital wallets."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "What if I experience technical issues during a session?",
          answer: "If you encounter technical difficulties, contact our support team immediately. We'll work to resolve the issue quickly. If a session is significantly impacted, we'll work with both parties to reschedule or provide a refund."
        },
        {
          question: "What are the system requirements?",
          answer: "For video sessions, you'll need a stable internet connection, a device with a camera and microphone, and an updated web browser (Chrome, Firefox, or Safari recommended). Mobile app is also available for iOS and Android."
        },
        {
          question: "Is my data secure?",
          answer: "Absolutely. We use industry-standard encryption to protect your personal information and payment details. We never share your data with third parties without your consent. Read our Privacy Policy for more details."
        }
      ]
    }
  ]

  const supportOptions = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email Support",
      description: "Get help via email",
      contact: "support@betamind.com",
      link: "mailto:support@betamind.com"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: "Live Chat",
      description: "Chat with our team",
      contact: "Available 9am - 6pm WAT",
      link: "https://chat.whatsapp.com/C86un93PjdhDZQLEkIuxTP?mode=wwt"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Contact us",
      description: "09041204694",
      contact: "Call/Whatsapp",
    //   link: "#"
    }
  ]

  return (
    <div className="min-h-screen bg-[#020c08] text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#000804] to-[#000c05] border-b border-gray-900 lg:pt-40 pt-32 lg:pb-20 pb-10 px-5 2xl:px-88 xl:px-40 lg:px-40">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="support-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="2" fill="#DBFF00" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#support-pattern)"/>
          </svg>
        </div>

        <div className="relative mx-auto text-center lg:pt-10">
          <div className="inline-block mb-6 px-4 py-2 bg-[#DBFF00] bg-opacity-10 border border-[#DBFF00] rounded-full">
            <span className="text-black text-sm font-semibold">Support Center</span>
          </div>
          <h1 className="lg:text-5xl text-4xl font-bold mb-6 leading-snug">
            How Can We
            <span className="text-[#DBFF00]"> Help You?</span>
          </h1>
          <p className="text-base text-gray-400 max-w-2xl mx-auto">
            Get answers to your questions, contact our support team, or browse our FAQ section
          </p>
        </div>
      </div>

      {/* Support Options */}
      <div className="2xl:px-88 xl:px-40 lg:px-40 px-4 py-20">
        <div className="mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-gray-400 text-base">Choose your preferred way to reach us</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {supportOptions.map((option, idx) => (
              <a
                key={idx}
                href={option.link}
                className="bg-[#01140a] border border-[#1a2621] hover:border-[#DBFF00] rounded-2xl p-8 transition-all duration-300 hover:transform hover:-translate-y-1 group"
              >
                <div className="w-16 h-16 bg-[#DBFF00] rounded-xl flex items-center justify-center text-black mb-6 group-hover:scale-110 transition-transform">
                  {option.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{option.description}</p>
                <p className="text-[#DBFF00] text-sm font-semibold">{option.contact}</p>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="2xl:px-88 xl:px-40 lg:px-40 px-4 py-20 bg-[#01140a]">
        <div className="mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400 text-base">Find quick answers to common questions</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {faqs.map((category, catIdx) => (
              <div key={catIdx}>
                <h3 className="text-2xl font-bold text-[#DBFF00] mb-4">{category.category}</h3>
                <div className="space-y-3">
                  {category.questions.map((faq, faqIdx) => {
                    const uniqueIdx = catIdx * 100 + faqIdx
                    return (
                      <div
                        key={uniqueIdx}
                        className="bg-[#011409] border border-[#1a2621] rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => toggleFaq(uniqueIdx)}
                          className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#01140a] transition-colors"
                        >
                          <span className="font-semibold text-white pr-4">{faq.question}</span>
                          <svg
                            className={`w-5 h-5 text-[#DBFF00] flex-shrink-0 transition-transform ${
                              openFaq === uniqueIdx ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {openFaq === uniqueIdx && (
                          <div className="px-6 pb-5">
                            <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Additional Resources */}
      <div className="2xl:px-88 xl:px-40 lg:px-40 px-4 py-20 bg-[#01140a]">
        <div className="mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-gray-400 text-base mb-8 max-w-2xl mx-auto">
            Connect with our community on social media or explore our resource center for more information
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-[#1a2621] hover:bg-[#DBFF00] rounded-full flex items-center justify-center transition-colors group"
            >
              <FaXTwitter className="text-white group-hover:text-black text-xl" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-[#1a2621] hover:bg-[#DBFF00] rounded-full flex items-center justify-center transition-colors group"
            >
              <FaLinkedinIn className="text-white group-hover:text-black text-xl" />
            </a>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/about">
              <button className="bg-transparent border-2 border-[#DBFF00] text-[#DBFF00] px-8 py-3 rounded-full font-semibold hover:bg-[#DBFF00] hover:text-black transition-colors">
                About Betamind
              </button>
            </Link>
            <Link href="/mentors">
              <button className="bg-[#DBFF00] text-black px-8 py-3 rounded-full font-semibold hover:bg-[#c4e600] transition-colors">
                Browse Mentors
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Support