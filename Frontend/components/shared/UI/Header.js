import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

const Header = ({ color }) => {
  const authCtx = useContext(AuthContext);
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const fetchData = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${authCtx.userId}`
      );
      const res = await fetchData.json();

      if (res.status === "success") {
        setUser(res.docs);
      }
    };
    authCtx.userId && fetchUser();
  }, [authCtx.token]);

  console.log(user);

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
      {authCtx.isLoggedIn && user ? (
        <div className="btns-wrapper">
          <button
            className={`${color && "btn-log-in--black"} btn--ctx-log-in`}
            onClick={() => authCtx.logout()}
          >
            log Out
          </button>
          <Link className={`link--me`} href="/me">
            welcome {user.name}
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}/img/users/${user.photo}`}
            />
          </Link>
        </div>
      ) : (
        <div className="btns-wrapper">
          <Link
            className={`${color && "btn-log-in--black"} btn-log-in`}
            href="/login"
          >
            log In
          </Link>
          <Link className="btn-sign-up" href="/signup">
            Signup
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
