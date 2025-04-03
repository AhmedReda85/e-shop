import React from 'react';

const Card = () => {
  return (
    <div className="w-[240px] h-[154px] perspective-1000">
      <div className="relative w-full h-full transition-transform duration-800 transform-style-3d hover:rotate-y-180">
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden rounded-2xl bg-[#171717] text-white p-4 shadow-lg">
          <div className="absolute top-2 right-4 text-xs tracking-wider">MASTERCARD</div>
          
          {/* Card Chip */}
          <div className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-sm"></div>
          
          {/* Contactless Icon */}
          <div className="absolute top-6 right-4 w-6 h-6">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            </svg>
          </div>

          {/* Card Number */}
          <div className="absolute bottom-12 left-4 text-sm font-bold tracking-wider">
            9759 2484 5269 6576
          </div>

          {/* Card Details */}
          <div className="absolute bottom-4 left-4">
            <div className="text-xs text-gray-400">VALID THRU</div>
            <div className="text-sm font-bold">12/24</div>
          </div>

          {/* Cardholder Name */}
          <div className="absolute bottom-4 right-4 text-sm font-bold">
            BRUCE WAYNE
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden rounded-2xl bg-[#171717] text-white p-4 shadow-lg rotate-y-180">
          {/* Magnetic Strip */}
          <div className="absolute top-4 left-0 w-full h-8 bg-black"></div>
          
          {/* CVV Strip */}
          <div className="absolute top-12 left-4 w-16 h-6 bg-white rounded-sm">
            <div className="text-black text-xs font-bold text-center mt-1">***</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card; 