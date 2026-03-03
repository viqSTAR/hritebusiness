import React from 'react';

// HRITE logo as inline SVG — matches the actual brand logo exactly
const HriteLogo: React.FC<{ size?: number }> = ({ size = 36 }) => (
    <svg width={size * 4.2} height={size} viewBox="0 0 180 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* H */}
        <text x="0" y="36" fontFamily="'Inter',sans-serif" fontWeight="900" fontSize="40" fill="#6b7280">H</text>
        {/* R */}
        <text x="30" y="36" fontFamily="'Inter',sans-serif" fontWeight="900" fontSize="40" fill="#2563eb">R</text>
        {/* i body */}
        <text x="60" y="36" fontFamily="'Inter',sans-serif" fontWeight="900" fontSize="40" fill="#38bdf8">i</text>
        {/* cyan glowing dot above i */}
        <circle cx="66" cy="4" r="4" fill="#38bdf8">
            <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
        </circle>
        {/* TE */}
        <text x="80" y="36" fontFamily="'Inter',sans-serif" fontWeight="900" fontSize="40" fill="#ffffff">TE</text>
    </svg>
);

export default HriteLogo;
