import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/#about' },
  { name: 'Courses', href: '/#courses' },
  { name: 'Contact', href: '/#contact' },
];

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('user')) setIsLoggedIn(true);
  }, []);

  const handleSignout = () => {
    if (localStorage) {
			setIsLoggedIn(false)
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
      localStorage.removeItem('email');
      Router.push('/signin');
    }
  };

  return (
    <header className="bg-indigo-600 sticky top-0 z-10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
          <div className="flex items-center">
            <Link href="/">
              <img
                className="h-10 w-auto cursor-pointer"
                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                alt=""
              />
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              {navigation.map((link) => (
                <Link key={link.name} href={link.href}>
                  <span className="text-base font-medium text-white hover:text-indigo-50 cursor-pointer">
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          {!isLoggedIn ? (
            <div className="ml-10 space-x-4">
              <Link href="/signin">
                <span className="cursor-pointer inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75">
                  Sign in
                </span>
              </Link>
              <Link href="/signup">
                <span className="cursor-pointer inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50">
                  Sign up
                </span>
              </Link>
            </div>
          ) : (
            <div>
              <Link href="/dashboard">
                <span className="inline-block cursor-pointer bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50">
                  Dashboard
                </span>
              </Link>
              <Link href="#">
                <span
                  className="inline-block cursor-pointer ml-5 bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
                  onClick={handleSignout}
                >
                  Sign out
                </span>
              </Link>
            </div>
          )}
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          {navigation.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium text-white hover:text-indigo-50"
            >
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
