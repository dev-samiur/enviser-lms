import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import API from '../utils/API';
import Link from 'next/link';
import Head from 'next/head';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (localStorage.getItem('user')) Router.push('/dashboard');
  }, []);

  const validateEmail = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    const isValid = regex.test(email);
    return isValid;
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const isValidEmail = validateEmail(email);

    if (!isValidEmail) {
      alert('Please enter a valid email and password');
      return;
    }

    if (isValidEmail && password) {
      API.post('/auth/login', { email, password })
        .then((res) => {
          if (res.data.success) {
            localStorage.setItem('user', res.data.success.token);
            localStorage.setItem('userId', res.data.success.userId);
            localStorage.setItem('username', res.data.success.username);
            localStorage.setItem('type', res.data.success.type);
            localStorage.setItem('email', res.data.success.email);
            Router.push('/dashboard');
          } else {
            alert('Error');
          }
        })
        .catch((err) => console.log(err));
    }
  };

  if (typeof window !== 'undefined' && !localStorage.getItem('user')) {
    return (
      <>
        <div className="min-h-full h-screen w-full flex">
          <Head>
            <title>Enviser LMS - Signin</title>
          </Head>
          <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                <Link href="/">
                  <img
                    className="h-12 w-auto cursor-pointer"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                  />
                </Link>
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                  Sign in to your account
                </h2>
              </div>

              <div className="mt-8">
                <div className="mt-6">
                  <form action="#" method="POST" className="space-y-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <div className="mt-1">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="text-sm text-right">
                      <Link href="/signup">
                        <span className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                          Don't have an account? Sign Up
                        </span>
                      </Link>
                    </div>
                    <div>
                      <button
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={handleSignIn}
                      >
                        Sign in
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block relative w-0 flex-1">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
              alt=""
            />
          </div>
        </div>
      </>
    );
  }
  return null;
};

export default SignIn;
