import React from 'react';
import login from '../../assets/Image/login.svg';

export default function Account() {
  return (
    <>
      <div className="bg-green-50 h-screen py-5">
        <div className="container md:container-fluid flex flex-col md:flex-row justify-center items-center p-10 mx-auto my-5">
          <div className="container row justify-center items-center p-10 mx-auto my-5 mx-3">
            <div className="p-3 col-md-5 border-black mx-auto flex justify-center hidden md:flex">
              <img src="https://www.sapphiresolutions.net/images/grocery_app_images/images/grocery_app_banner.svg" alt="" />
            </div>
            <div className="p-3 col-md-7">
              <div className="img flex justify-center items-center mb-3 mx-auto">
                <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/theme/logo.svg" alt="" />
              </div>
              <div className="w-full bg-white rounded-lg shadow px-3 py-5">
                <div className="px-6 space-y-4 md:space-y-6 sm:px-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Sign in to your account
                  </h1>
                  <form className="space-y-4 md:space-y-6" action="#">
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="name@company.com"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        required
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="remember"
                            aria-describedby="remember"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                            required
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="remember"
                            className="text-gray-500"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                      <a
                        href="#"
                        className="text-sm font-medium text-primary-600 hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-green-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Sign in
                    </button>
                    <p className="text-sm font-light text-gray-500">
                      Don’t have an account yet?{" "}
                      <a
                        href="/signup"
                        className="font-medium text-primary-600 hover:underline"
                      >
                        Sign up
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
