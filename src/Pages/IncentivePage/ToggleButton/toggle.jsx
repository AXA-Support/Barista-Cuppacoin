import React from 'react';
import { Box, Music,Database,WalletCards } from 'lucide-react';

export default function ToggleButton({ value, onChange }) {
  return (
    <div className="">
      <div className="space-y-4">
        <button
          onClick={() => onChange(!value)}
          className="relative w-44 md:h-10 h-[34px] bg-gray-100 md:rounded-full rounded-xl transition-all duration-300 ease-in-out focus:outline-none border-2 border-gray-300"
        >
          <div className="absolute inset-0 flex items-center">
            <div
              className={`absolute w-1/2 h-full bg-[#5958bb] md:rounded-full rounded-xl transition-all duration-300 ease-in-out shadow-lg ${
                value ? 'left-1/2' : 'left-0'
              }`}
            />
            <div className="relative z-10 flex items-center justify-between w-full px-2.5">
              <div className="flex items-center space-x-2">
                <WalletCards
                  className={`size-4 transition-colors duration-300 ${!value ? 'text-white' : 'text-gray-400'}`}
                  strokeWidth={2}
                />
                <span className={`font-semibold text-sm  transition-colors duration-300 ${!value ? 'text-white' : 'text-gray-400'}`}>
                  Cards
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`font-semibold text-sm transition-colors duration-300 ${value ? 'text-white' : 'text-gray-500'}`}>
                  Bands
                </span>
                <Database
                  className={`size-4 transition-colors duration-300 ${value ? 'text-white' : 'text-gray-500'}`}
                  strokeWidth={2}
                />
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}