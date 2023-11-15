import React, { useState, useEffect } from 'react';

function Error404() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay for demonstration purposes
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      {loading ? (
        // Render rotating loading spinner while loading is true
        <div className="animate-spin rounded-full border-t-4 border-black border-solid h-12 w-12"></div>
      ) : (
        // Render the error content when loading is false
        <div className="flex flex-col justify-center items-center text-center pb-10 px-10 rounded-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 25" strokeWidth={0.7} stroke="currentColor" className="w-72 h-72">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
          </svg>
          <h1 className="text-5xl font-black -mt-5">404 Error: Page Not Found</h1>
          <p>We're sorry, but the page you requested could not be found.</p>
        </div>
      )}
    </div>
  );
}

export default Error404;
