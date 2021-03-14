/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

export default function SignIn(): JSX.Element {
  return (
    <div className="layout-login">
      <div className="layout-login__overlay" />
      <div
        className="layout-login__form bg-white w-75 p-3"
        data-perfect-scrollbar
      >
        <h4 className="m-0">Welcome back!</h4>
        <p className="mb-5">Login to access your XX Account </p>
        <form action="index.html" noValidate>
          <div className="form-group">
            <label className="text-label" htmlFor="email_2">
              Email Address:
            </label>
            <div className="input-group input-group-merge">
              <input
                id="email_2"
                type="email"
                required
                className="form-control form-control-prepended"
                placeholder="john@doe.com"
              />
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <span className="far fa-envelope" />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="text-label" htmlFor="password_2">
              Password:
            </label>
            <div className="input-group input-group-merge">
              <input
                id="password_2"
                type="password"
                required
                className="form-control form-control-prepended"
                placeholder="Enter your password"
              />
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <span className="fa fa-key" />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group mb-5">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                defaultChecked
                id="remember"
              />
              <label className="custom-control-label" htmlFor="remember">
                Remember me
              </label>
            </div>
          </div>
          <div className="form-group text-center">
            <button className="btn btn-primary mb-5" type="submit">
              Login
            </button>
            <br />
            <a href="/">Forgot password?</a> <br />
            Dont have an account?{' '}
            <a className="text-body text-underline" href="signup.html">
              Sign up!
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
