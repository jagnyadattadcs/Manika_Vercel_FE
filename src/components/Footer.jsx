import React, {useState} from 'react';
import { FaFacebookF, FaYoutube, FaInstagram } from 'react-icons/fa';
import footerBg from "../assets/footer2.jpg";
import axios from 'axios';

export default function Footer() {

  const [mail, setMail] = useState('');

  const handleSubmit = async (e) => {
     e.preventDefault();
     if (!mail) return;

     try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/newsletter`, { email: mail});
        alert("subscribed successfully");
        setMail('');
     } catch (err) {
     console.log(err);
     alert("Email Already exists");
     }
  }
  return (
    <footer className="text-white py-10 px-4 relative">
      
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${footerBg})`,
        }}
      />
      <div className="absolute inset-0 bg-opacity-0" />
      
      <div className="relative z-10">
        <div className="bg-[#FF2E3A] text-white px-8 py-6 md:px-20 rounded-xl mx-4 md:mx-20 -mt-20 relative z-20 flex flex-col md:flex-row items-center justify-between gap-4 mb-12 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left">
            Subscribe for latest <br className="block md:hidden" />
            update about <span className="text-black drop-shadow-md">MANIKA</span>{' '}
            <span className="font-extrabold">Automobiles</span>
          </h2>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="Email Address"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              className="px-4 py-3 rounded-md bg-white text-black w-full md:w-72 outline-none"
            />
            <button 
              type="button"
              onClick={handleSubmit}
              className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition"
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="px-4 md:px-20 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Address */}
            <div>
              <p className="text-gray-300 leading-relaxed">
                NH 5, Utteraswar, Near Badkhuri Chhak, Sore, Balasore, Odisha, 756045. 
              </p>
              <p className="font-semibold mt-4 text-white">manikaautomobilessoro@gmail.com</p>
              <p className="mt-2 font-semibold text-white">+91 94397 05550</p>
            </div>

            {/* Quick Link */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-white">Quick Link</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="transition-colors duration-200 hover:text-white cursor-pointer">Home</li>
                <li className="transition-colors duration-200 hover:text-white cursor-pointer">About Us</li>
                {/* <li className="transition-colors duration-200 hover:text-white cursor-pointer">Cars</li>
                <li className="transition-colors duration-200 hover:text-white cursor-pointer">Feedback</li> */}
                <li className="transition-colors duration-200 hover:text-white cursor-pointer">Contact Us</li>
              </ul>
            </div>

            {/* Resources */}
            {/* <div>
              <h3 className="font-bold text-lg mb-4 text-white">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="transition-colors duration-200 hover:text-white cursor-pointer">Term & Conditions</li>
                <li className="transition-colors duration-200 hover:text-white cursor-pointer">Privacy Policy</li>
                <li className="transition-colors duration-200 hover:text-white cursor-pointer">Cancelation Policy</li>
                <li className="transition-colors duration-200 hover:text-white cursor-pointer">Feedback</li>
              </ul>
            </div> */}

            {/* Newsletter*/}
            <div>
              <h3 className="font-bold text-lg mb-4 text-white">Subscribe Newsletter</h3>
              <p className="text-gray-400 text-sm mb-4">
                Our estimated global carbon emissions <br />
                by investing in greenhouse
              </p>
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                  className="bg-white bg-opacity-10 border border-gray-600 text-gray-600 px-4 py-2 rounded-md  placeholder-gray-400 outline-none focus:border-[#FF2E3A] transition-colors backdrop-blur-sm"
                />
                <button 
                  type="button"
                  onClick={handleSubmit}
                  className="bg-[#FF2E3A] hover:bg-red-600 px-4 py-2 rounded-md font-medium transition-colors duration-200"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>
              Copyright © 2024 <span className="text-red-500 font-semibold">Manika Automobile</span>, Inc. All Rights Reserved
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0 items-center">
              <span>Follow Us On:</span>
              <div className="flex space-x-3">
                <FaFacebookF className="text-white hover:text-[#FF2E3A] cursor-pointer transition-colors duration-200 text-lg" />
                {/* <FaYoutube className="text-white hover:text-[#FF2E3A] cursor-pointer transition-colors duration-200 text-lg" /> */}
                <FaInstagram className="text-white hover:text-[#FF2E3A] cursor-pointer transition-colors duration-200 text-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
