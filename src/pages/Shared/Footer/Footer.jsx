import React from "react";
import footerLogo from "../../../assets/footer_logo.png";
import { Link } from "react-router";
import linkedIn from "../../../assets/social/linkedin-icon.png";
import x from "../../../assets/social/twitter-logo.png";
import fb from "../../../assets/social/facebook-logo.png";
import yt from "../../../assets/social/youtube-logo.png";

const Footer = () => {
  const socialLinks = (
    <>
      <Link className="group">
        <img 
          src={linkedIn} 
          alt="LinkedIn" 
          className="w-6 h-6 transition-transform duration-200 group-hover:scale-110 group-hover:brightness-110" 
        />
      </Link>
      <Link className="group">
        <img 
          src={x} 
          alt="X (Twitter)" 
          className="w-6 h-6 transition-transform duration-200 group-hover:scale-110 group-hover:brightness-110" 
        />
      </Link>
      <Link className="group">
        <img 
          src={fb} 
          alt="Facebook" 
          className="w-6 h-6 transition-transform duration-200 group-hover:scale-110 group-hover:brightness-110" 
        />
      </Link>
      <Link className="group">
        <img 
          src={yt} 
          alt="YouTube" 
          className="w-6 h-6 transition-transform duration-200 group-hover:scale-110 group-hover:brightness-110" 
        />
      </Link>
    </>
  );

  const navLinks = (
    <>
      <li>
        <Link className="text-base-100 hover:text-primary transition">
          Services
        </Link>
      </li>
      <li>
        <Link className="text-base-100 hover:text-primary transition">
          Coverage
        </Link>
      </li>
      <li>
        <Link className="text-base-100 hover:text-primary transition">
          About Us
        </Link>
      </li>
      <li>
        <Link className="text-base-100 hover:text-primary transition">
          Pricing
        </Link>
      </li>
      <li>
        <Link className="text-base-100 hover:text-primary transition">
          Be a Rider
        </Link>
      </li>
    </>
  );

  return (
    <footer className="bg-gradient-to-br from-[#0B0B0B] to-[#1a1a1a] rounded-2xl mt-10 px-6 py-12 md:py-16 text-center space-y-8 border border-gray-800">
      {/* Logo */}
      <div className="flex justify-center">
        <img 
          src={footerLogo} 
          alt="ZapShift Footer Logo" 
          className="w-40 md:w-48 transition-transform duration-300 hover:scale-105" 
        />
      </div>

      {/* Paragraph */}
      <aside className="max-w-3xl mx-auto space-y-4">
        <p className="text-base-200 font-medium leading-relaxed text-lg">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        <p className="text-base-300 text-sm">
          Copyright © {new Date().getFullYear()} ZapShift - All rights reserved
        </p>
      </aside>

      {/* Navigation Links */}
      <nav className="w-full">
        <ul
          className="
          flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 
          list-none 
        "
        >
          {navLinks}
        </ul>
      </nav>

      {/* Social Icons */}
      <div className="flex justify-center items-center gap-5">
        {socialLinks}
      </div>
    </footer>
  );
};

export default Footer;
