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
      <Link>
        <img src={linkedIn} alt="LinkedIn" className="w-6" />
      </Link>
      <Link>
        <img src={x} alt="X" className="w-6" />
      </Link>
      <Link>
        <img src={fb} alt="Facebook" className="w-6" />
      </Link>
      <Link>
        <img src={yt} alt="YouTube" className="w-6" />
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
    <footer className="bg-[#0B0B0B] rounded-2xl mt-10 px-6 py-12 md:py-16 text-center space-y-8">
      {/* Logo */}
      <div className="flex justify-center">
        <img src={footerLogo} alt="Footer Logo" className="w-40 md:w-48" />
      </div>

      {/* Paragraph */}
      <aside className="max-w-3xl mx-auto space-y-2">
        <p className="text-base-200 font-medium leading-relaxed">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
        <p className="text-base-200 text-sm">
          Copyright © {new Date().getFullYear()} - All rights reserved
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
