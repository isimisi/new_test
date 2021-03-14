/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

interface Props {
  children: JSX.Element;
  windowDimensions: {
    width: number;
    height: number;
  };
}

export default function Dashboard(props: Props): JSX.Element {
  const { children, windowDimensions } = props;
  return (
    <div className="mdk-header-layout js-mdk-header-layout">
      <div id="header" className="mdk-header js-mdk-header m-0" data-fixed>
        <div className="mdk-header__content">
          <div
            className="navbar navbar-expand-sm navbar-main navbar-dark bg-dark  pr-0"
            id="navbar"
            data-primary
          >
            <div className="container-fluid p-0">
              <button
                className="navbar-toggler navbar-toggler-right d-block d-lg-none"
                type="button"
                data-toggle="sidebar"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <a href="index.html" className="navbar-brand ">
                <svg
                  className="mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  style={{ width: 20 }}
                  viewBox="0 0 40 40"
                >
                  <path d="M40 34.16666667c.01-3.21166667-2.58333333-5.82333334-5.795-5.835-1.94-.00666667-3.75666667.955-4.84166667 2.565-.10166666.155-.295.22333333-.47166666.16666666L11.94 25.66666667c-.19-.06-.31-.245-.28833333-.44333334.01-.07333333.015-.14833333.015-.22333333 0-.06833333-.005-.13833333-.01333334-.20666667-.02166666-.20166666.105-.39.3-.44666666l17.96-5.13c.13833334-.04.28666667-.005.39333334.09166666 1.05.97333334 2.42833333 1.51666667 3.86 1.525C37.38833333 20.83333333 40 18.22166667 40 15s-2.61166667-5.83333333-5.83333333-5.83333333C32.52 9.17166667 30.95333333 9.87833333 29.86 11.11c-.11.12166667-.28.16833333-.43666667.11833333L11.91 5.65333333c-.16-.05-.27333333-.19166666-.28833333-.35833333-.30333334-3.20166667-3.14333334-5.55166667-6.345-5.24833333S-.275 3.19.02833333 6.39166667c.28166667 2.99333333 2.79833334 5.28 5.805 5.275 1.64666667-.005 3.21333334-.71333334 4.30666667-1.945.11-.12166667.28-.16833334.43666667-.11833334l16.57 5.27166667c.22.06833333.34166666.30333333.27166666.52333333-.04166666.13333334-.14833333.23833334-.28333333.275L9.90333333 20.59666667c-.13333333.03833333-.275.00833333-.38166666-.08-1.03333334-.86833334-2.33833334-1.34666667-3.68833334-1.35C2.61166667 19.16666667 0 21.77833333 0 25s2.61166667 5.83333333 5.83333333 5.83333333c1.355-.005 2.665-.485 3.7-1.35833333.10833334-.09166667.25833334-.12.39333334-.07666667l18.29 5.81833334c.14.04333333.24666666.15666666.28.3.75666666 3.13166666 3.90833333 5.05666666 7.04 4.3C38.14833333 39.185 39.99 36.85333333 40 34.16666667z" />
                </svg>
                <span>flowdash</span>
              </a>
              <form
                className="search-form d-none d-sm-flex flex"
                action="index.html"
              >
                <button className="btn" type="submit">
                  <i className="material-icons">search</i>
                </button>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                />
              </form>
              <ul className="nav navbar-nav ml-auto d-none d-md-flex">
                <li className="nav-item dropdown">
                  <a
                    href="#notifications_menu"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                    data-caret="false"
                  >
                    <i className="material-icons nav-icon navbar-notifications-indicator">
                      notifications
                    </i>
                  </a>
                  <div
                    id="notifications_menu"
                    className="dropdown-menu dropdown-menu-right navbar-notifications-menu"
                  >
                    <div className="dropdown-item d-flex align-items-center py-2">
                      <span className="flex navbar-notifications-menu__title m-0">
                        Notifications
                      </span>
                      <a className="text-muted">
                        <small>Clear all</small>
                      </a>
                    </div>
                    <div
                      className="navbar-notifications-menu__content"
                      data-perfect-scrollbar
                    >
                      <div className="py-2">
                        <div className="dropdown-item d-flex">
                          <div className="mr-3">
                            <div
                              className="avatar avatar-sm"
                              style={{ width: 32, height: 32 }}
                            >
                              <img
                                src="assets/images/256_daniel-gaffey-1060698-unsplash.jpg"
                                alt="Avatar"
                                className="avatar-img rounded-circle"
                              />
                            </div>
                          </div>
                          <div className="flex">
                            <a>A.Demian</a> left a comment on <a>FlowDash</a>
                            <br />
                            <small className="text-muted">1 minute ago</small>
                          </div>
                        </div>
                        <div className="dropdown-item d-flex">
                          <div className="mr-3">
                            <a href="#">
                              <div
                                className="avatar avatar-xs"
                                style={{ width: 32, height: 32 }}
                              >
                                <span className="avatar-title bg-purple rounded-circle">
                                  <i className="material-icons icon-16pt">
                                    person_add
                                  </i>
                                </span>
                              </div>
                            </a>
                          </div>
                          <div className="flex">
                            New user <a href="#">Peter Parker</a> signed up.
                            <br />
                            <small className="text-muted">1 hour ago</small>
                          </div>
                        </div>
                        <div className="dropdown-item d-flex">
                          <div className="mr-3">
                            <a href="#">
                              <div
                                className="avatar avatar-xs"
                                style={{ width: 32, height: 32 }}
                              >
                                <span className="avatar-title rounded-circle">
                                  JD
                                </span>
                              </div>
                            </a>
                          </div>
                          <div className="flex">
                            <a href="#">Big Joe</a>{' '}
                            <small className="text-muted">wrote:</small>
                            <br />
                            <div>
                              Hey, how are you? What about our next meeting
                            </div>
                            <small className="text-muted">2 minutes ago</small>
                          </div>
                        </div>
                        <div className="dropdown-item d-flex">
                          <div className="mr-3">
                            <div
                              className="avatar avatar-sm"
                              style={{ width: 32, height: 32 }}
                            >
                              <img
                                src="assets/images/256_daniel-gaffey-1060698-unsplash.jpg"
                                alt="Avatar"
                                className="avatar-img rounded-circle"
                              />
                            </div>
                          </div>
                          <div className="flex">
                            <a>A.Demian</a> left a comment on <a>FlowDash</a>
                            <br />
                            <small className="text-muted">1 minute ago</small>
                          </div>
                        </div>
                        <div className="dropdown-item d-flex">
                          <div className="mr-3">
                            <a href="#">
                              <div
                                className="avatar avatar-xs"
                                style={{ width: 32, height: 32 }}
                              >
                                <span className="avatar-title bg-purple rounded-circle">
                                  <i className="material-icons icon-16pt">
                                    person_add
                                  </i>
                                </span>
                              </div>
                            </a>
                          </div>
                          <div className="flex">
                            New user <a href="#">Peter Parker</a> signed up.
                            <br />
                            <small className="text-muted">1 hour ago</small>
                          </div>
                        </div>
                        <div className="dropdown-item d-flex">
                          <div className="mr-3">
                            <a href="#">
                              <div
                                className="avatar avatar-xs"
                                style={{ width: 32, height: 32 }}
                              >
                                <span className="avatar-title rounded-circle">
                                  JD
                                </span>
                              </div>
                            </a>
                          </div>
                          <div className="flex">
                            <a href="#">Big Joe</a>{' '}
                            <small className="text-muted">wrote:</small>
                            <br />
                            <div>
                              Hey, how are you? What about our next meeting
                            </div>
                            <small className="text-muted">2 minutes ago</small>
                          </div>
                        </div>
                        <div className="dropdown-item d-flex">
                          <div className="mr-3">
                            <div
                              className="avatar avatar-sm"
                              style={{ width: 32, height: 32 }}
                            >
                              <img
                                src="assets/images/256_daniel-gaffey-1060698-unsplash.jpg"
                                alt="Avatar"
                                className="avatar-img rounded-circle"
                              />
                            </div>
                          </div>
                          <div className="flex">
                            <a>A.Demian</a> left a comment on <a>FlowDash</a>
                            <br />
                            <small className="text-muted">1 minute ago</small>
                          </div>
                        </div>
                        <div className="dropdown-item d-flex">
                          <div className="mr-3">
                            <a href="#">
                              <div
                                className="avatar avatar-xs"
                                style={{ width: 32, height: 32 }}
                              >
                                <span className="avatar-title bg-purple rounded-circle">
                                  <i className="material-icons icon-16pt">
                                    person_add
                                  </i>
                                </span>
                              </div>
                            </a>
                          </div>
                          <div className="flex">
                            New user <a href="#">Peter Parker</a> signed up.
                            <br />
                            <small className="text-muted">1 hour ago</small>
                          </div>
                        </div>
                        <div className="dropdown-item d-flex">
                          <div className="mr-3">
                            <a href="#">
                              <div
                                className="avatar avatar-xs"
                                style={{ width: 32, height: 32 }}
                              >
                                <span className="avatar-title rounded-circle">
                                  JD
                                </span>
                              </div>
                            </a>
                          </div>
                          <div className="flex">
                            <a href="#">Big Joe</a>{' '}
                            <small className="text-muted">wrote:</small>
                            <br />
                            <div>
                              Hey, how are you? What about our next meeting
                            </div>
                            <small className="text-muted">2 minutes ago</small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <a className="dropdown-item text-center navbar-notifications-menu__footer">
                      View All
                    </a>
                  </div>
                </li>
              </ul>
              <ul className="nav navbar-nav d-none d-sm-flex border-left navbar-height align-items-center">
                <li className="nav-item dropdown">
                  <a
                    href="#account_menu"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                    data-caret="false"
                  >
                    <span className="mr-1 d-flex-inline">
                      <span className="text-light">Kean O.</span>
                    </span>
                    <img
                      src="assets/images/avatar/kean.jpeg"
                      className="rounded-circle"
                      width={32}
                      alt="Frontted"
                    />
                  </a>
                  <div
                    id="account_menu"
                    className="dropdown-menu dropdown-menu-right"
                  >
                    <div className="dropdown-item-text dropdown-item-text--lh">
                      <div>
                        <strong>Adrian Demian</strong>
                      </div>
                      <div className="text-muted">@adriandemian</div>
                    </div>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item" href="index.html">
                      <i className="material-icons">dvr</i> Dashboard
                    </a>
                    <a className="dropdown-item active" href="profile.html">
                      <i className="material-icons">account_circle</i> My
                      profile
                    </a>
                    <a className="dropdown-item" href="edit-account.html">
                      <i className="material-icons">edit</i> Edit account
                    </a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item" href="login.html">
                      <i className="material-icons">exit_to_app</i> Logout
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mdk-header-layout__content">
        <div
          className="mdk-drawer-layout js-mdk-drawer-layout"
          data-push
          data-responsive-width="992px"
        >
          <div className="mdk-drawer-layout__content page">
            <div
              style={{
                paddingBottom: 'calc(5.125rem / 2)',
                position: 'relative',
                marginBottom: '1.5rem',
              }}
            />
            <div
              className="container-fluid page__container"
              style={{
                width: '100%',
                height: windowDimensions.height - 100,
              }}
            >
              {children}
            </div>
          </div>
          <div
            className="mdk-drawer  js-mdk-drawer"
            id="default-drawer"
            data-align="start"
          >
            <div className="mdk-drawer__content">
              <div
                className="sidebar sidebar-light sidebar-left sidebar-p-t"
                data-perfect-scrollbar
              >
                <div className="sidebar-heading">Retsområder</div>
                <ul className="sidebar-menu">
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      data-toggle="collapse"
                      href="#dashboards_menu"
                    >
                      <i className="sidebar-menu-icon sidebar-menu-icon--left material-icons">
                        dvr
                      </i>
                      <span className="sidebar-menu-text">Aftaleret</span>
                      <span className="ml-auto sidebar-menu-toggle-icon" />
                    </a>
                    <ul
                      className="sidebar-submenu collapse"
                      id="dashboards_menu"
                    >
                      <li className="sidebar-menu-item">
                        <a className="sidebar-menu-button" href="index.html">
                          <span className="sidebar-menu-text">Default</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="analytics.html"
                        >
                          <span className="sidebar-menu-text">Analytics</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a className="sidebar-menu-button" href="staff.html">
                          <span className="sidebar-menu-text">Staff</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="ecommerce.html"
                        >
                          <span className="sidebar-menu-text">E-commerce</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="dashboard-quick-access.html"
                        >
                          <span className="sidebar-menu-text">
                            Quick Access
                          </span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      data-toggle="collapse"
                      href="#apps_menu"
                    >
                      <i className="sidebar-menu-icon sidebar-menu-icon--left material-icons">
                        slideshow
                      </i>
                      <span className="sidebar-menu-text">Skatteret</span>
                      <span className="ml-auto sidebar-menu-toggle-icon" />
                    </a>
                    <ul className="sidebar-submenu collapse" id="apps_menu">
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="app-activities.html"
                        >
                          <span className="sidebar-menu-text">Activities</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="app-trello.html"
                        >
                          <span className="sidebar-menu-text">Trello</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="app-projects.html"
                        >
                          <span className="sidebar-menu-text">Projects</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="app-fullcalendar.html"
                        >
                          <span className="sidebar-menu-text">
                            Event Calendar
                          </span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a className="sidebar-menu-button" href="app-chat.html">
                          <span className="sidebar-menu-text">Chat</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="app-email.html"
                        >
                          <span className="sidebar-menu-text">Email</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item ">
                        <a
                          className="sidebar-menu-button"
                          data-toggle="collapse"
                          href="#course_menu"
                        >
                          <span className="sidebar-menu-text">Education</span>
                          <span className="ml-auto d-flex align-items-center">
                            <span className="badge badge-primary">NEW</span>
                            <span className="sidebar-menu-toggle-icon" />
                          </span>
                        </a>
                        <ul
                          className="sidebar-submenu collapse "
                          id="course_menu"
                        >
                          <li className="sidebar-menu-item ">
                            <a
                              className="sidebar-menu-button"
                              href="app-browse-courses.html"
                            >
                              <span className="sidebar-menu-text">
                                Browse Courses
                              </span>
                            </a>
                          </li>
                          <li className="sidebar-menu-item ">
                            <a
                              className="sidebar-menu-button"
                              href="app-course.html"
                            >
                              <span className="sidebar-menu-text">Course</span>
                            </a>
                          </li>
                          <li className="sidebar-menu-item ">
                            <a
                              className="sidebar-menu-button"
                              href="app-lesson.html"
                            >
                              <span className="sidebar-menu-text">Lesson</span>
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li className="sidebar-menu-item active open">
                    <a
                      className="sidebar-menu-button"
                      data-toggle="collapse"
                      href="#pages_menu"
                    >
                      <i className="sidebar-menu-icon sidebar-menu-icon--left material-icons">
                        description
                      </i>
                      <span className="sidebar-menu-text">GDPR</span>
                      <span className="ml-auto sidebar-menu-toggle-icon" />
                    </a>
                    <ul
                      className="sidebar-submenu collapse show "
                      id="pages_menu"
                    >
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="companies.html"
                        >
                          <span className="sidebar-menu-text">
                            Dataansvarlig
                          </span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a className="sidebar-menu-button" href="stories.html">
                          <span className="sidebar-menu-text">
                            Detabehandler
                          </span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="discussions.html"
                        >
                          <span className="sidebar-menu-text">
                            Databehandleraftale
                          </span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a className="sidebar-menu-button" href="invoice.html">
                          <span className="sidebar-menu-text">Datatilsyn</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a className="sidebar-menu-button" href="pricing.html">
                          <span className="sidebar-menu-text">Hjemmel</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="edit-account.html"
                        >
                          <span className="sidebar-menu-text">
                            Konsekvensanalyse
                          </span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item active">
                        <a className="sidebar-menu-button" href="profile.html">
                          <span className="sidebar-menu-text">
                            Risikovurdering
                          </span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a className="sidebar-menu-button" href="payout.html">
                          <span className="sidebar-menu-text">Persondata</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="digital-product.html"
                        >
                          <span className="sidebar-menu-text">
                            Digital Product
                          </span>
                          <span className="badge badge-primary ml-auto">
                            NEW
                          </span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          data-toggle="collapse"
                          href="#login_menu"
                        >
                          <span className="sidebar-menu-text">
                            Persondatabrud
                          </span>
                          <span className="ml-auto sidebar-menu-toggle-icon" />
                        </a>
                        <ul
                          className="sidebar-submenu collapse"
                          id="login_menu"
                        >
                          <li className="sidebar-menu-item">
                            <a
                              className="sidebar-menu-button"
                              href="login.html"
                            >
                              <span className="sidebar-menu-text">
                                Login / Background Image
                              </span>
                            </a>
                          </li>
                          <li className="sidebar-menu-item">
                            <a
                              className="sidebar-menu-button"
                              href="login-centered-boxed.html"
                            >
                              <span className="sidebar-menu-text">
                                Login / Centered Boxed
                              </span>
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          data-toggle="collapse"
                          href="#signup_menu"
                        >
                          <span className="sidebar-menu-text">Tredjeland</span>
                          <span className="ml-auto sidebar-menu-toggle-icon" />
                        </a>
                        <ul
                          className="sidebar-submenu collapse"
                          id="signup_menu"
                        >
                          <li className="sidebar-menu-item">
                            <a
                              className="sidebar-menu-button"
                              href="signup.html"
                            >
                              <span className="sidebar-menu-text">
                                Sign Up / Background Image
                              </span>
                            </a>
                          </li>
                          <li className="sidebar-menu-item">
                            <a
                              className="sidebar-menu-button"
                              href="signup-centered-boxed.html"
                            >
                              <span className="sidebar-menu-text">
                                Sign Up / Centered Boxed
                              </span>
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="product-listing.html"
                        >
                          <span className="sidebar-menu-text">Samtykke</span>
                          <span className="badge badge-primary ml-auto">
                            NEW
                          </span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a className="sidebar-menu-button" href="blank.html">
                          <span className="sidebar-menu-text">
                            Oplysningspligt
                          </span>
                          <span className="badge badge-primary ml-auto">
                            NEW
                          </span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="sidebar-menu-item">
                    <a
                      className="sidebar-menu-button"
                      data-toggle="collapse"
                      href="#layouts_menu"
                    >
                      <i className="sidebar-menu-icon sidebar-menu-icon--left material-icons">
                        view_compact
                      </i>
                      <span className="sidebar-menu-text">Procesret</span>
                      <span className="ml-auto sidebar-menu-toggle-icon" />
                    </a>
                    <ul className="sidebar-submenu collapse" id="layouts_menu">
                      <li className="sidebar-menu-item active">
                        <a className="sidebar-menu-button" href="profile.html">
                          <span className="sidebar-menu-text">Default</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="fluid-profile.html"
                        >
                          <span className="sidebar-menu-text">
                            Full Width Navs
                          </span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="fixed-profile.html"
                        >
                          <span className="sidebar-menu-text">Fixed Navs</span>
                        </a>
                      </li>
                      <li className="sidebar-menu-item">
                        <a
                          className="sidebar-menu-button"
                          href="mini-profile.html"
                        >
                          <span className="sidebar-menu-text">
                            Mini Sidebar + Navs
                          </span>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
                <div className="sidebar-p-a">
                  <a
                    href="https://themeforest.net/item/stack-admin-bootstrap-4-dashboard-template/22959011"
                    className="btn btn-primary btn-block"
                  >
                    Analyser
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
