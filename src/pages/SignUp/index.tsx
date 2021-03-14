/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

export default function SignUp(): JSX.Element {
  return (
    <>
      <div className="layout-login__overlay " />
      <div
        className="layout-login__form bg-white w-75 p-3"
        data-perfect-scrollbar
      >
        <div className="d-flex justify-content-center mt-2 mb-5 navbar-light">
          <a href="index.html" className="navbar-brand" style={{ minWidth: 0 }}>
            <span>FlowDash</span>
          </a>
        </div>
        <h4 className="m-0">Sign up!</h4>
        <p className="mb-5">Create an account with FlowDash</p>
        <form action="index.html" noValidate>
          <div className="form-group">
            <label className="text-label" htmlFor="name_2">
              Name:
            </label>
            <div className="input-group input-group-merge">
              <input
                id="name_2"
                type="text"
                required
                className="form-control form-control-prepended"
                placeholder="John Doe"
              />
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <span className="far fa-user" />
                </div>
              </div>
            </div>
          </div>
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
                  <span className="far fa-key" />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group mb-5">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                defaultChecked
                className="custom-control-input"
                id="terms"
              />
              <label className="custom-control-label" htmlFor="terms">
                I accept Terms and Conditions
              </label>
            </div>
          </div>
          <div className="form-group text-center">
            <button className="btn btn-primary mb-2" type="submit">
              Create Account
            </button>
            <br />
            <a className="text-body text-underline" href="login.html">
              Have an account? Login
            </a>
          </div>
        </form>
      </div>
    </>
  );
}
