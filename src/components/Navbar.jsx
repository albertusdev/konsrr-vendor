import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import * as firebase from 'firebase';
import 'firebase/auth';
import "./Navbar.css";

export default function Navbar({match}) {
  const auth = useSelector(state => state.auth)
  const { pathname } = useLocation()
  const isConcert = pathname === "/" || pathname.startsWith("/concert")
  const isMerchandise = pathname.startsWith("/merchandise")
  const isAds = pathname.startsWith("/ads")

  return (
    <nav className="mb-4">
      <div className="flex justify-between items-end">
        <h1 className="text-xl">KONSRR</h1>
        <div className="dropdown">
          <div className="text-white" to="profile">{auth.profile.name}</div>
          <div className="dropdown-content border-gray-500 border-solid border-2 px-2">
            <a href="/" onClick={e => { e.preventDefault(); firebase.auth().signOut()}}>Sign Out</a>
          </div>
        </div>
      </div>
      <div className="text-lg">
        <Link className={`mr-3 ${isConcert ? "" : "mr-3 text-gray-500"}`} to="/concert">Concerts</Link>
        <Link className={`mr-3 ${isMerchandise ? "" : "mr-3 text-gray-500"}`} to="/merchandise">Merchandise</Link>
        <Link className={isAds ? "" : "mr-3 text-gray-500"} to="/ads">Ads</Link>
      </div>
    </nav>
  )
}