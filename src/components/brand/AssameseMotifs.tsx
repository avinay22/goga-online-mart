import React from "react";

// ============================================================================
// AUTHENTIC ASSAMESE TRADITIONAL CULTURAL MOTIFS & HERITAGE DESIGN SYSTEM
// Inspired directly by the Assamese Gamusa (গামোচা), Jaapi (জাপি), Xorai (শৰাই),
// Bihu Dhol & Mohor Singor Pepa (ঢোল আৰু পেঁপা), and Mising Tribal Weaves (মিচিং গালুক)
// ============================================================================

// 1. Master Assamese Heritage Crest: Conical Jaapi with Draped Phulam Gamusa Scarves
// The supreme symbol of Assam's pride, hospitality, and cultural identity.
export function MasterJaapiGamusaCrest({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 190" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        {/* Drop shadow for dimensional depth */}
        <filter id="crestShadow" x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.22" />
        </filter>
        <filter id="scarfShadow" x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.18" />
        </filter>
        {/* Gold Sheen Gradient for Jaapi rim and center */}
        <linearGradient id="goldBrass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5D061" />
          <stop offset="50%" stopColor="#D4A338" />
          <stop offset="100%" stopColor="#9E731B" />
        </linearGradient>
        {/* Gamusa Crimson Red Gradient */}
        <linearGradient id="gamusaRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DE2C3B" />
          <stop offset="100%" stopColor="#9C1420" />
        </linearGradient>
      </defs>

      {/* --- 1. TWO DRAPED PHULAM GAMUSA SCARVES HANGING DOWN --- */}
      {/* Left Gamusa Scarf */}
      <g filter="url(#scarfShadow)">
        {/* Scarf white body with woven cotton tint */}
        <path d="M48 85 L26 175 L62 175 L64 90 Z" fill="#FFFDF8" stroke="#E6E0D5" strokeWidth="1" />
        
        {/* Outer Scarlet Red Side Stripes (Ansu) */}
        <line x1="30" y1="90" x2="30" y2="175" stroke="#C71F2D" strokeWidth="2.5" />
        <line x1="34" y1="92" x2="34" y2="175" stroke="#C71F2D" strokeWidth="1" />
        
        {/* Inner Scarlet Red Stripe */}
        <line x1="58" y1="90" x2="58" y2="175" stroke="#C71F2D" strokeWidth="1.2" />

        {/* Traditional Embroidered Floral Phul on Scarf Body */}
        {/* Central diamond flower */}
        <polygon points="46,122 51,127 46,132 41,127" fill="#C71F2D" />
        <circle cx="46" cy="127" r="1.5" fill="#FFFDF8" />
        <polygon points="46,105 49,108 46,111 43,108" fill="#C71F2D" />

        {/* Lower Gamusa Phulam Embroidered Border Tapestry */}
        <rect x="27" y="152" width="34" height="16" fill="#C71F2D" />
        {/* Traditional white cutouts / diamond weave in red field */}
        <polygon points="34,160 38,155 42,160 38,165" fill="#FFFDF8" />
        <polygon points="44,160 48,155 52,160 48,165" fill="#FFFDF8" />
        <polygon points="54,160 57,156 60,160 57,164" fill="#FFFDF8" />
        <line x1="27" y1="150" x2="61" y2="150" stroke="#C71F2D" strokeWidth="1" strokeDasharray="1.5 1.5" />

        {/* Traditional Cotton Tassels / Fringes (Dohi) at bottom */}
        <line x1="29" y1="175" x2="29" y2="183" stroke="#C71F2D" strokeWidth="1.5" strokeDasharray="1.5 1" />
        <line x1="34" y1="175" x2="34" y2="185" stroke="#C71F2D" strokeWidth="1.5" strokeDasharray="1.5 1" />
        <line x1="40" y1="175" x2="40" y2="184" stroke="#C71F2D" strokeWidth="1.5" strokeDasharray="1.5 1" />
        <line x1="46" y1="175" x2="46" y2="186" stroke="#C71F2D" strokeWidth="1.5" strokeDasharray="1.5 1" />
        <line x1="52" y1="175" x2="52" y2="184" stroke="#C71F2D" strokeWidth="1.5" strokeDasharray="1.5 1" />
        <line x1="58" y1="175" x2="58" y2="183" stroke="#C71F2D" strokeWidth="1.5" strokeDasharray="1.5 1" />
      </g>

      {/* Right Gamusa Scarf */}
      <g filter="url(#scarfShadow)">
        <path d="M112 85 L134 175 L98 175 L96 90 Z" fill="#FFFDF8" stroke="#E6E0D5" strokeWidth="1" />
        
        {/* Outer Scarlet Red Side Stripes (Ansu) */}
        <line x1="130" y1="90" x2="130" y2="175" stroke="#C71F2D" strokeWidth="2.5" />
        <line x1="126" y1="92" x2="126" y2="175" stroke="#C71F2D" strokeWidth="1" />
        
        {/* Inner Scarlet Red Stripe */}
        <line x1="102" y1="90" x2="102" y2="175" stroke="#C71F2D" strokeWidth="1.2" />

        {/* Central diamond flower */}
        <polygon points="114,122 119,127 114,132 109,127" fill="#C71F2D" />
        <circle cx="114" cy="127" r="1.5" fill="#FFFDF8" />
        <polygon points="114,105 117,108 114,111 111,108" fill="#C71F2D" />

        {/* Lower Gamusa Phulam Embroidered Border Tapestry */}
        <rect x="99" y="152" width="34" height="16" fill="#C71F2D" />
        <polygon points="106,160 110,155 114,160 110,165" fill="#FFFDF8" />
        <polygon points="116,160 120,155 124,160 120,165" fill="#FFFDF8" />
        <polygon points="126,160 129,156 132,160 129,164" fill="#FFFDF8" />
        <line x1="99" y1="150" x2="133" y2="150" stroke="#C71F2D" strokeWidth="1" strokeDasharray="1.5 1.5" />

        {/* Traditional Cotton Tassels (Dohi) */}
        <line x1="102" y1="175" x2="102" y2="183" stroke="#C71F2D" strokeWidth="1.5" strokeDasharray="1.5 1" />
        <line x1="108" y1="175" x2="108" y2="184" stroke="#C71F2D" strokeWidth="1.5" strokeDasharray="1.5 1" />
        <line x1="114" y1="175" x2="114" y2="186" stroke="#C71F2D" strokeWidth="1.5" strokeDasharray="1.5 1" />
        <line x1="120" y1="175" x2="120" y2="184" stroke="#C71F2D" strokeWidth="1.5" strokeDasharray="1.5 1" />
        <line x1="126" y1="175" x2="126" y2="185" stroke="#C71F2D" strokeWidth="1.5" strokeDasharray="1.5 1" />
        <line x1="131" y1="175" x2="131" y2="183" stroke="#C71F2D" strokeWidth="1.5" strokeDasharray="1.5 1" />
      </g>

      {/* --- 2. MASTER CONICAL JAAPI (জাপি) FOREGROUND --- */}
      <g filter="url(#crestShadow)">
        {/* Outer Woven Bamboo & Tokou-Paat Disk Base */}
        <circle cx="80" cy="70" r="58" fill="#FAF5E8" stroke="#C71F2D" strokeWidth="3.5" />
        {/* Fine bamboo weave ring */}
        <circle cx="80" cy="70" r="54" fill="none" stroke="url(#goldBrass)" strokeWidth="2" strokeDasharray="3 2" />
        <circle cx="80" cy="70" r="51" fill="none" stroke="#C71F2D" strokeWidth="1" />

        {/* 16 Radiating Traditional Felt Petals (Scarlet Red, Emerald Green, Royal Navy) */}
        {/* Cardinal Petals (Scarlet Red) */}
        <path d="M80 18 L87 40 L73 40 Z" fill="#C71F2D" />
        <path d="M80 122 L87 100 L73 100 Z" fill="#C71F2D" />
        <path d="M28 70 L50 63 L50 77 Z" fill="#C71F2D" />
        <path d="M132 70 L110 63 L110 77 Z" fill="#C71F2D" />

        {/* Diagonal Petals (Emerald Green - Traditional Tokou Accent) */}
        <path d="M43 33 L63 50 L53 58 Z" fill="#0E5830" />
        <path d="M117 33 L97 50 L107 58 Z" fill="#0E5830" />
        <path d="M43 107 L63 90 L53 82 Z" fill="#0E5830" />
        <path d="M117 107 L97 90 L107 82 Z" fill="#0E5830" />

        {/* Intermediate Petals (Royal Blue / Gold Felt Trim) */}
        <circle cx="80" cy="30" r="2.5" fill="#FFFDF8" stroke="#C71F2D" strokeWidth="1" />
        <circle cx="80" cy="110" r="2.5" fill="#FFFDF8" stroke="#C71F2D" strokeWidth="1" />
        <circle cx="40" cy="70" r="2.5" fill="#FFFDF8" stroke="#C71F2D" strokeWidth="1" />
        <circle cx="120" cy="70" r="2.5" fill="#FFFDF8" stroke="#C71F2D" strokeWidth="1" />

        {/* Inner Cane Ring */}
        <circle cx="80" cy="70" r="37" fill="#F4EADB" stroke="url(#goldBrass)" strokeWidth="3" />
        <circle cx="80" cy="70" r="32" fill="none" stroke="#C71F2D" strokeWidth="1.5" strokeDasharray="2 2" />

        {/* Central 8-Pointed Radiant Scarlet Star (The unmistakable Assamese Jaapi heart) */}
        <polygon
          points="80,44 86,59 101,53 91,65 103,77 88,78 90,94 78,84 68,93 72,78 57,76 69,65 59,53 74,59"
          fill="url(#gamusaRedGrad)"
          stroke="#7A0C16"
          strokeWidth="1.2"
        />

        {/* Inner Star Highlight Diamond */}
        <polygon points="80,58 87,70 80,82 73,70" fill="url(#goldBrass)" />
        <circle cx="80" cy="70" r="5" fill="#C71F2D" />
        <circle cx="80" cy="70" r="2" fill="#FFFDF8" />

        {/* Small Mirror / Sequin Accents (Aarsi / Sequin) */}
        <circle cx="80" cy="53" r="1.5" fill="#FFFDF8" />
        <circle cx="80" cy="87" r="1.5" fill="#FFFDF8" />
        <circle cx="63" cy="70" r="1.5" fill="#FFFDF8" />
        <circle cx="97" cy="70" r="1.5" fill="#FFFDF8" />
      </g>
    </svg>
  );
}

// 2. Authentic Assamese Phulam Gamusa Floral Tapestry Banner
// High-resolution repeated floral creepers, blooming lotus buds, and traditional Ansu borders
export function AuthenticGamusaBanner({ className = "h-8 w-full" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-[#FFFDF8] border-y-2 border-[#C71F2D]/30 ${className}`}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="authentic-phulam-gamusa" width="120" height="36" patternUnits="userSpaceOnUse">
            {/* Pure Handloom Cotton Ivory Base */}
            <rect width="120" height="36" fill="#FFFDF8" />

            {/* Top Triple Ansu Border Stripes */}
            <line x1="0" y1="2.5" x2="120" y2="2.5" stroke="#C71F2D" strokeWidth="2" />
            <line x1="0" y1="5.5" x2="120" y2="5.5" stroke="#C71F2D" strokeWidth="0.8" strokeDasharray="2 1.5" />
            <line x1="0" y1="8" x2="120" y2="8" stroke="#C71F2D" strokeWidth="0.6" />

            {/* Bottom Triple Ansu Border Stripes */}
            <line x1="0" y1="28" x2="120" y2="28" stroke="#C71F2D" strokeWidth="0.6" />
            <line x1="0" y1="30.5" x2="120" y2="30.5" stroke="#C71F2D" strokeWidth="0.8" strokeDasharray="2 1.5" />
            <line x1="0" y1="33.5" x2="120" y2="33.5" stroke="#C71F2D" strokeWidth="2" />

            {/* Central Traditional Phul (Intricate Assamese Floral Embroidery) */}
            {/* Center Royal Blossom */}
            <polygon points="60,11 68,18 60,25 52,18" fill="#C71F2D" />
            <polygon points="60,14 65,18 60,22 55,18" fill="#FFFDF8" />
            <circle cx="60" cy="18" r="2.2" fill="#C71F2D" />
            <circle cx="60" cy="18" r="0.8" fill="#FFFDF8" />

            {/* Graceful Floral Vines / Creepers (লতা আৰু কলি) */}
            <path d="M68 18 Q76 11 84 18 Q76 25 68 18 Z" fill="#C71F2D" />
            <path d="M52 18 Q44 11 36 18 Q44 25 52 18 Z" fill="#C71F2D" />

            {/* Stylised Petal Cutouts inside Vines */}
            <ellipse cx="76" cy="18" rx="2.5" ry="1.2" fill="#FFFDF8" />
            <ellipse cx="44" cy="18" rx="2.5" ry="1.2" fill="#FFFDF8" />

            {/* Flanking Diamond Buds (বাটা ফুল) */}
            <polygon points="20,13 25,18 20,23 15,18" fill="#C71F2D" />
            <polygon points="20,15 23,18 20,21 17,18" fill="#FFFDF8" />

            <polygon points="100,13 105,18 100,23 95,18" fill="#C71F2D" />
            <polygon points="100,15 103,18 100,21 97,18" fill="#FFFDF8" />

            {/* Interlaced Geometric Connector Stitches */}
            <circle cx="8" cy="18" r="1.5" fill="#C71F2D" />
            <circle cx="112" cy="18" r="1.5" fill="#C71F2D" />
            <line x1="0" y1="18" x2="15" y2="18" stroke="#C71F2D" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
            <line x1="105" y1="18" x2="120" y2="18" stroke="#C71F2D" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#authentic-phulam-gamusa)" />
      </svg>
    </div>
  );
}

// 3. Mising Traditional Geometric Handloom Ribbon (মিচিং গালুকৰ খাঁচ)
// Inspired by the vibrant diamond patterns, arrowheads, and red-black weaves of Dhemaji's Mising community
export function MisingTribalBorder({ className = "h-4 w-full" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-[#FAF4EA] ${className}`}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="mising-weave-repeat" width="40" height="16" patternUnits="userSpaceOnUse">
            <rect width="40" height="16" fill="#1C1917" />
            {/* Red and mustard stepped diamond lozenges */}
            <polygon points="20,0 30,8 20,16 10,8" fill="#C71F2D" />
            <polygon points="20,3 26,8 20,13 14,8" fill="#D4A338" />
            <polygon points="20,5 23,8 20,11 17,8" fill="#FFFDF8" />
            {/* Edge half-diamonds */}
            <polygon points="0,0 8,8 0,16" fill="#C71F2D" />
            <polygon points="40,0 32,8 40,16" fill="#C71F2D" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mising-weave-repeat)" />
      </svg>
    </div>
  );
}

// 4. Traditional Brass Xorai with Draped Phulam Gamusa (শৰাই আৰু গামোচা)
// The iconic bell-metal offering tray of Assam, representing welcome, honor, and purity.
export function XoraiWithGamusaIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="brassXoraiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F9E282" />
          <stop offset="35%" stopColor="#E5B543" />
          <stop offset="70%" stopColor="#C49126" />
          <stop offset="100%" stopColor="#8A6014" />
        </linearGradient>
      </defs>

      {/* Decorative Finial Spire */}
      <circle cx="60" cy="14" r="4" fill="url(#brassXoraiGrad)" stroke="#704D0E" strokeWidth="1" />
      <path d="M60 18 L64 28 L56 28 Z" fill="url(#brassXoraiGrad)" />

      {/* Domed Bell-Metal Lid with Fluted Carvings */}
      <path d="M32 44 C32 26 88 26 88 44 Z" fill="url(#brassXoraiGrad)" stroke="#704D0E" strokeWidth="1.5" />
      <rect x="29" y="44" width="62" height="5" rx="2.5" fill="#C71F2D" stroke="#704D0E" strokeWidth="0.8" />
      <circle cx="60" cy="36" r="2.5" fill="#FFFDF8" />

      {/* Wide Flared Offering Bowl */}
      <path
        d="M18 56 Q60 64 102 56 Q94 78 68 80 L52 80 Q26 78 18 56 Z"
        fill="url(#brassXoraiGrad)"
        stroke="#704D0E"
        strokeWidth="1.8"
      />

      {/* Draped Phulam Gamusa Cloth Swag across the stem */}
      <g>
        <path
          d="M44 78 Q60 84 76 78 L82 110 L70 106 L60 94 L50 106 L38 110 Z"
          fill="#FFFDF8"
          stroke="#C71F2D"
          strokeWidth="1.2"
        />
        {/* Red side stripes and border on draped Gamusa */}
        <line x1="42" y1="84" x2="42" y2="108" stroke="#C71F2D" strokeWidth="1.5" />
        <line x1="78" y1="84" x2="78" y2="108" stroke="#C71F2D" strokeWidth="1.5" />
        <rect x="40" y="102" width="40" height="4" fill="#C71F2D" />
        <polygon points="56,98 60,94 64,98 60,102" fill="#C71F2D" />
      </g>

      {/* Tall Stem Column */}
      <rect x="55" y="80" width="10" height="32" fill="url(#brassXoraiGrad)" stroke="#704D0E" strokeWidth="1.2" />
      <line x1="55" y1="92" x2="65" y2="92" stroke="#704D0E" strokeWidth="1" />
      <line x1="55" y1="102" x2="65" y2="102" stroke="#704D0E" strokeWidth="1" />

      {/* Broad Flared Pedestal Base */}
      <path d="M34 122 C42 110 78 110 86 122 Z" fill="url(#brassXoraiGrad)" stroke="#704D0E" strokeWidth="1.5" />
      <rect x="26" y="122" width="68" height="7" rx="3.5" fill="#C71F2D" stroke="#704D0E" strokeWidth="0.8" />
      <rect x="24" y="129" width="72" height="4" rx="2" fill="url(#brassXoraiGrad)" stroke="#704D0E" strokeWidth="0.8" />
    </svg>
  );
}

// 5. Traditional Bihu Dhol & Mohor Singor Pepa (ঢোল আৰু ম’হৰ শিঙৰ পেঁপা)
// Celebrating the joyous, energetic folk spirit of Assam's festivals
export function BihuDholPepaIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Buffalo Horn Pepa Curved Hornpipe in background */}
      <g>
        {/* Curved black horn */}
        <path
          d="M18 100 Q40 90 65 60 Q90 30 125 22"
          stroke="#1A1817"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {/* Golden brass bands on horn */}
        <path d="M118 16 L132 23 L126 32 Z" fill="#D4A338" stroke="#996C1B" strokeWidth="1" />
        <circle cx="125" cy="24" r="2" fill="#C71F2D" />
        <line x1="90" y1="36" x2="94" y2="44" stroke="#D4A338" strokeWidth="2.5" />
        <line x1="68" y1="56" x2="72" y2="64" stroke="#D4A338" strokeWidth="2" />
        {/* Tassel on Pepa mouthpiece */}
        <line x1="18" y1="100" x2="12" y2="108" stroke="#C71F2D" strokeWidth="2" />
        <line x1="16" y1="100" x2="16" y2="111" stroke="#C71F2D" strokeWidth="1.5" />
      </g>

      {/* Main Assamese Wooden Dhol (Barrel Drum) */}
      <g filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.18))">
        {/* Carved Wooden Drum Barrel */}
        <path
          d="M36 34 Q70 24 104 34 L104 86 Q70 96 36 86 Z"
          fill="#873516"
          stroke="#4D1D0B"
          strokeWidth="2.5"
        />
        {/* Leather Drum Heads */}
        <ellipse cx="36" cy="60" rx="7" ry="26" fill="#EAD8BC" stroke="#4D1D0B" strokeWidth="2" />
        <ellipse cx="104" cy="60" rx="7" ry="26" fill="#EAD8BC" stroke="#4D1D0B" strokeWidth="2" />
        <ellipse cx="36" cy="60" rx="3" ry="14" fill="#3D2012" opacity="0.6" />

        {/* Traditional Woven Leather Straps (Z-lacings) */}
        <line x1="36" y1="37" x2="104" y2="50" stroke="#F6ECE0" strokeWidth="2" />
        <line x1="104" y1="50" x2="36" y2="62" stroke="#F6ECE0" strokeWidth="2" />
        <line x1="36" y1="62" x2="104" y2="74" stroke="#F6ECE0" strokeWidth="2" />
        <line x1="104" y1="74" x2="36" y2="83" stroke="#F6ECE0" strokeWidth="2" />

        {/* Pure White & Crimson Gamusa Sash wrapped across drum */}
        <rect x="62" y="29" width="16" height="62" rx="2" fill="#FFFDF8" stroke="#C71F2D" strokeWidth="1.2" />
        <line x1="66" y1="29" x2="66" y2="91" stroke="#C71F2D" strokeWidth="2" />
        <line x1="74" y1="29" x2="74" y2="91" stroke="#C71F2D" strokeWidth="2" />
        <polygon points="70,55 74,60 70,65 66,60" fill="#C71F2D" />
      </g>
    </svg>
  );
}

// 6. Grand Assamese Heritage Pavilion Graphic (The ultimate Hero illustration)
// Blends the Master Jaapi, draped Phulam Gamusa, Golden Xorai, and Bihu Dhol into a single majestic emblem
export function AssameseHeritagePavilion({ className = "w-full max-w-lg h-auto" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center p-3 sm:p-6 ${className}`}>
      {/* Decorative Woven Cotton Background Shield */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#FFFDF8] via-[#FAF4EA] to-[#FFF8EE] border-4 border-[#C71F2D] shadow-2xl overflow-hidden">
        {/* Corner Gamusa floral motifs */}
        <div className="absolute top-2 left-2 w-6 h-6 sm:w-8 sm:h-8 border-t-4 border-l-4 border-[#C71F2D]" />
        <div className="absolute top-2 right-2 w-6 h-6 sm:w-8 sm:h-8 border-t-4 border-r-4 border-[#C71F2D]" />
        <div className="absolute bottom-2 left-2 w-6 h-6 sm:w-8 sm:h-8 border-b-4 border-l-4 border-[#C71F2D]" />
        <div className="absolute bottom-2 right-2 w-6 h-6 sm:w-8 sm:h-8 border-b-4 border-r-4 border-[#C71F2D]" />
        
        {/* Repeating Gamusa trim at top and bottom */}
        <div className="absolute top-0 left-0 right-0 h-1.5 sm:h-2 bg-[#C71F2D]" />
        <div className="absolute bottom-0 left-0 right-0 h-1.5 sm:h-2 bg-[#C71F2D]" />
      </div>

      {/* Interlinked Assamese Heritage Assemblage */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-3 sm:space-y-4 py-3 sm:py-4 px-2 w-full">
        {/* Grand Jaapi with Draped Gamusa */}
        <div className="relative">
          <MasterJaapiGamusaCrest className="w-36 h-36 sm:w-48 sm:h-48 drop-shadow-xl" />
        </div>

        {/* Flanking Cultural Treasures: Brass Xorai + Bihu Dhol */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 pt-1">
          <div className="flex flex-col items-center">
            <XoraiWithGamusaIcon className="w-12 h-12 sm:w-16 sm:h-16 drop-shadow-md" />
            <span className="text-[9px] sm:text-[11px] font-serif font-black text-forest-950 tracking-wider uppercase mt-1">
              Assamese Xorai
            </span>
          </div>

          <div className="h-10 sm:h-12 w-[1.5px] bg-[#C71F2D]/30" />

          <div className="flex flex-col items-center">
            <BihuDholPepaIcon className="w-12 h-12 sm:w-16 sm:h-16 drop-shadow-md" />
            <span className="text-[9px] sm:text-[11px] font-serif font-black text-forest-950 tracking-wider uppercase mt-1">
              Bihu Dhol & Pepa
            </span>
          </div>
        </div>

        {/* Proud Cultural Seal in English */}
        <div className="pt-1">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white border-2 border-[#C71F2D] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#C71F2D] animate-ping" />
            <span className="text-[10px] sm:text-xs font-serif font-black text-[#C71F2D] uppercase tracking-wider">
              100% Indigenous Assam Heritage
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 7. Traditional Assamese Folk Corner Flourish (ময়ূৰ লতা আৰু গছ)
export function TraditionalFolkTreeMotif({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <line x1="50" y1="94" x2="50" y2="12" stroke="#C71F2D" strokeWidth="2.5" />
      <path d="M28 82 L50 64 L72 82" stroke="#C71F2D" strokeWidth="2.2" fill="none" />
      <path d="M32 86 L50 71 L68 86" stroke="#C71F2D" strokeWidth="1.5" fill="none" />
      <path d="M34 60 L50 46 L66 60" stroke="#C71F2D" strokeWidth="2" fill="none" />
      <path d="M38 64 L50 53 L62 64" stroke="#C71F2D" strokeWidth="1.5" fill="none" />
      <path d="M40 38 L50 28 L60 38" stroke="#C71F2D" strokeWidth="2" fill="none" />
      {/* Leaves / Peacocks */}
      <path d="M24 84 Q18 76 22 68 Q29 73 31 82 Z" fill="#C71F2D" />
      <circle cx="21" cy="71" r="1.5" fill="#FFFDF8" />
      <path d="M76 84 Q82 76 78 68 Q71 73 69 82 Z" fill="#C71F2D" />
      <circle cx="79" cy="71" r="1.5" fill="#FFFDF8" />
      {/* Crown Lotus Bud */}
      <circle cx="50" cy="12" r="4.5" fill="#C71F2D" />
      <circle cx="50" cy="12" r="2" fill="#D4A338" />
    </svg>
  );
}

// Backward-compatible named exports
export const JaapiIcon = MasterJaapiGamusaCrest;
export const MisingWeaveBorder = AuthenticGamusaBanner;
export const GamusaFloralBorder = AuthenticGamusaBanner;
export const XoraiIcon = XoraiWithGamusaIcon;
