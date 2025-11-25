import React from 'react'
import { GoArrowRight } from 'react-icons/go';

interface BtnProps {
    title: string;
    onClick?: () => void
}

export const SolidWhiteBtn = ({ title, onClick, ...props }: BtnProps) => {
  return (
    <button 
        {...props}
        onClick={onClick} 
        className="w-full bg-[#d4d7c2] hover:bg-[#c4c7b2] cursor-pointer text-gray-900 px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200"
    >
        {title}
    </button>
  )
}

export const SolidMainBtn = ({ title, onClick, ...props }: BtnProps) => {
  return (
    <button 
        {...props}
        onClick={onClick} 
        className="w-full bg-[#DBFF00] hover:bg-[#c4c7b2] cursor-pointer text-gray-900 px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200"
    >
        {title}
    </button>
  )
}


export const SolidBlackBtn = ({ title, onClick, ...props }: BtnProps) => {
  return (
    <button 
        {...props}
        onClick={onClick} 
        className="w-full flex gap-1 items-center m-auto justify-center bg-[#010c06]/90 hover:bg-[#010c06b2] cursor-pointer text-gray-50 px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200"
    >
        {title}
        <p><GoArrowRight  /></p>
    </button>
  )
}


export const OutlineBtn = ({ title, onClick, ...props }: BtnProps) => {
  return (
    <button 
        {...props}
        onClick={onClick} 
            className="w-full border border-[#d4d7c2] text-[#d4d7c2] cursor-pointer hover:bg-[#d4d7c2]/5 px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200"
        >
        {title}
    </button>
  )
}