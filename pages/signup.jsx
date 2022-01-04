import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import API from '../utils/API';
import Head from 'next/head';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState(1);

  useEffect(() => {
    if (localStorage.getItem('user')) Router.push('/dashboard');
  }, []);

  const validateEmail = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    const isValid = regex.test(email);
    return isValid;
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const isValidEmail = validateEmail(email);
    if (!username || !email || !password || !isValidEmail) {
      alert('Enter valid fields');
      return;
    } else {
      API.post('/auth/register', { username, email, password, type })
        .then((res) => {
          if (res.data.success) {
            alert('Successfully signup');
            Router.push('/signin');
          } else {
            alert('Error');
          }
        })
        .catch((err) => alert('Error'));
    }
  };
  if (typeof window !== 'undefined' && !localStorage.getItem('user')) {
    return (
      <>
        <Head>
          <title>Enviser LMS - Signup</title>
        </Head>
        <div className="min-h-full h-screen w-full flex">
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
                  Sign up to your account
                </h2>
              </div>

              <div className="mt-8">
                <div className="mt-6">
                  <form action="#" method="POST" className="space-y-6">
                    <div>
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Username
                      </label>
                      <div className="mt-1">
                        <input
                          id="username"
                          name="username"
                          type="text"
                          autoComplete="username"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                    </div>
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
                    <div className="space-y-1">
                      <div>
                        <label
                          htmlFor="type"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Are you a
                        </label>
                        <select
                          id="type"
                          name="type"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                          onChange={(e) => {
                            if (e.target.value === 'Venue Owner') setType(2);
                            else setType(1);
                          }}
                        >
                          <option value="Customer">Student</option>
                          <option value="Venue Owner">Mentor</option>
                        </select>
                      </div>
                    </div>
                    <div className="text-sm text-right">
                      <Link href="/signin">
                        <span className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                          Already have an account? Sign In
                        </span>
                      </Link>
                    </div>
                    <div>
                      <button
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={handleSignUp}
                      >
                        Sign Up
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
  } else return null;
};

export default SignUp;
