import React from "react";
import Link from "next/link";

const Header = ({ color }) => {
  return (
    <header className={`${color && "header-black-color"} header`}>
      <div className="logo-box">
        {color ? (
          <Link href="/">
            <img src="/images/logo-black.png" alt="logo" />{" "}
          </Link>
        ) : (
          <img src="/images/logo.png" alt="logo" />
        )}
      </div>
      <ul className="links">
        <li className="link">
          <Link href="#">Adventures</Link>
        </li>

        <li className="link">
          <Link href="#">Destination</Link>
        </li>

        <li className="link">
          <Link href="#">About</Link>
        </li>
      </ul>
      <div className="btns-wrapper">
        <Link className={`${color && "btn-log-in--black"} btn-log-in`} href="#">
          log In
        </Link>
        <Link className="btn-sign-up" href="#">
          Signup
        </Link>
      </div>
    </header>
  );
};

export default Header;
