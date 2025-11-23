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
        <img src={linkedIn} alt="" />
      </Link>
      <Link>
        <img src={x} alt="" />
      </Link>
      <Link>
        <img src={fb} alt="" />
      </Link>
      <Link>
        <img src={yt} alt="" />
      </Link>
    </>
  );
  const navLinks = (
    <>
      <li>
        <Link className="text-base-100">Services</Link>
      </li>
      <li>
        <Link className="text-base-100">Coverage</Link>
      </li>
      <li>
        <Link className="text-base-100">About Us</Link>
      </li>
      <li>
        <Link className="text-base-100">Pricing</Link>
      </li>
      <li>
        <Link className="text-base-100">Be a Rider</Link>
      </li>
    </>
  );
  return (
    <footer className="footer footer-horizontal footer-center p-20 space-y-5 bg-[#0B0B0B] mt-10 rounded-2xl">
      <img src={footerLogo} alt="" />
      <aside>
        <p className="font-bold !text-base-200">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
        <p className="!text-base-200">Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
      <nav className="list-none flex justify-between items-center">
        {navLinks}
      </nav>
      <div className="flex items-center gap-6">{socialLinks}</div>
    </footer>
  );
};

export default Footer;
