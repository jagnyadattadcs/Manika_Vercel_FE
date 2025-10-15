import React from "react";

export default function MapPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl h-[80vh] bg-white rounded-3xl shadow-2xl overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d957.1992373201659!2d86.68370353997221!3d21.292572781987083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1c6fb76f57aebb%3A0x555999e0cff784c2!2sManika%20Automobile!5e1!3m2!1sen!2sin!4v1760444680724!5m2!1sen!2sin"
          width="600"
          height="450"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
