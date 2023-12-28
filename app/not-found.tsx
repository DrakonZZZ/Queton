import Link from 'next/link';
import React from 'react';

const NotFound = () => {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center ">
      <h1 className="text-9xl font-extrabold text-black tracking-widest">
        404
      </h1>
      <div className="bg-primary-500 px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <button className="mt-5">
        <a className="relative inline-block text-sm font-medium text-primary-500 group active:text-gray-700 focus:outline-none focus:ring">
          <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
            <Link href="/">Chop Chop Back Home</Link>
          </span>
        </a>
      </button>
    </main>
  );
};

export default NotFound;
