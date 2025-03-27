import React, { useState } from 'react';
import { FaEnvelopeOpenText, FaRocket } from 'react-icons/fa6';

const NewsLetter = () => {
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleResumeChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    // Handle the subscription logic here
    console.log("Subscribed with email:", email);
  };

  const handleResumeUpload = (e) => {
    e.preventDefault();
    setIsUploading(true);
    if (resume) {
      // Simulate resume upload
      console.log("Uploading resume:", resume.name);

      // You can add logic here to upload the resume to a server
      setTimeout(() => {
        setIsUploading(false);
        alert("Resume uploaded successfully!");
      }, 2000);
    } else {
      alert("Please select a resume to upload.");
      setIsUploading(false);
    }
  };

  return (
    <div>
      <div>
        <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
          <FaEnvelopeOpenText />
          Email me for jobs
        </h3>
        <p className='text-primary/75 text-base mb-4'>
        Ut esse eiusmod sute Site enim labore dolor. Aute ea fugiat commodo ea fose.
        </p>

        <form onSubmit={handleSubmitEmail} className='w-full space-y-4'>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="name@mail.com"
            value={email}
            onChange={handleEmailChange}
            className="w-full block py-2 pl-3 border focus:outline-none"
            required
          />
          <input
            type="submit"
            value="Subscribe"
            className="w-full block py-2 pl-3 border focus:outline-none bg-orange-500 rounded-sm text-white cursor-pointer font-semibold"
          />
        </form>
      </div>

      {/* Second part for resume upload */}
      <div className='mt-20'>
        <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
          <FaRocket />
          Get notice faster
        </h3>
        <p className='text-primary/75 text-base mb-4'>
        Ut esse eiusmod sute Site enim labore dolor. Aute ea fugiat commodo ea fose.
        </p>

        <form onSubmit={handleResumeUpload} className='w-full space-y-4'>
          <input
            type="email"
            name="email"
            id="resume-email"
            placeholder="name@mail.com"
            value={email}
            onChange={handleEmailChange}
            className="w-full block py-2 pl-3 border focus:outline-none"
            required
          />
          <input
            type="file"
            name="resume"
            id="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeChange}
            className="w-full block py-2 pl-3 border focus:outline-none"
            required
          />
          <input
            type="submit"
            value={isUploading ? "Uploading..." : "Upload your resume"}
            className={`w-full block py-2 pl-3 border focus:outline-none bg-orange-500 rounded-sm text-white cursor-pointer font-semibold ${isUploading ? 'cursor-not-allowed' : ''}`}
            disabled={isUploading}
          />
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
