import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

function Footer() {

return (

<footer className="bg-gradient-to-r from-[#081c22] via-[#0f2e35] to-[#081c22] text-gray-300">

<div className="max-w-[1200px] mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">

{/* Brand */}
<div>

<div className="flex items-center gap-3 mb-5">
<img src={logo} alt="" className="w-10 h-10"/>
<h2 className="text-xl font-semibold text-white">OneCart</h2>
</div>

<p className="text-sm leading-6 text-gray-400">
OneCart is your all-in-one online shopping destination offering
quality products, fast delivery and trusted service designed
to make shopping easier.
</p>

{/* Social */}
<div className="flex gap-4 mt-6 text-lg">

<FaFacebookF className="cursor-pointer hover:text-cyan-400 transition"/>
<FaInstagram className="cursor-pointer hover:text-cyan-400 transition"/>
<FaTwitter className="cursor-pointer hover:text-cyan-400 transition"/>
<FaLinkedin className="cursor-pointer hover:text-cyan-400 transition"/>

</div>

</div>

{/* Company */}
<div>

<h3 className="text-white font-semibold mb-5 tracking-wide">
COMPANY
</h3>

<ul className="space-y-3 text-sm">

<li>
<Link to="/" className="hover:text-cyan-400 transition">
Home
</Link>
</li>

<li>
<Link to="/about" className="hover:text-cyan-400 transition">
About Us
</Link>
</li>

<li>
<Link to="/collection" className="hover:text-cyan-400 transition">
Collections
</Link>
</li>

<li>
<Link to="/contact" className="hover:text-cyan-400 transition">
Contact
</Link>
</li>

</ul>

</div>

{/* Policies */}
<div>

<h3 className="text-white font-semibold mb-5 tracking-wide">
POLICIES
</h3>

<ul className="space-y-3 text-sm">

<li>
<Link to="/return-policy" className="hover:text-cyan-400 transition">
Return Policy
</Link>
</li>

<li>
<Link to="/exchange-policy" className="hover:text-cyan-400 transition">
Exchange Policy
</Link>
</li>

<li>
<Link to="/support" className="hover:text-cyan-400 transition">
Customer Support
</Link>
</li>

<li>
<Link to="/privacy-policy" className="hover:text-cyan-400 transition">
Privacy Policy
</Link>
</li>

</ul>

</div>

{/* Contact */}
<div>

<h3 className="text-white font-semibold mb-5 tracking-wide">
CONTACT
</h3>

<ul className="space-y-3 text-sm text-gray-400">

<li>📞 +91-8012888884</li>
<li>📧 contact@onecart.com</li>
<li>📍 Punjab, India</li>
<li>🕒 9:00 AM – 8:00 PM</li>

</ul>

</div>

</div>

{/* Bottom */}

<div className="border-t border-gray-700 text-center py-5 text-sm text-gray-400">

© 2026 OneCart. All Rights Reserved.

</div>

</footer>

);

}

export default Footer;