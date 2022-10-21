import Image from "next/image";
import Link from "next/link";
import React from "react";

import logo from "../public/favicon.ico";

const Navbar = ({ account }) => {
  return (
    <div className="navbar">
      <div className="logo-wrapper">
        <Link href="/">
          <Image src={logo} alt="Disney Logo" width={90} height={50} />
        </Link>
      </div>

      <div className="account-info">
        <p>Welcome, {account.username}</p>
        <img
          className="avatar"
          src={account.avatar.url}
          alt={account.username.id}
        />
      </div>
    </div>
  );
};

export default Navbar;
