import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeLang } from "../rtk/slices/langSlice"; // Importing the action creator to change language.
import enLang from "../langeages/Header/enLang.json";
import arLang from "../langeages/Header/arLang.json";
import { useLang } from "../hooks/useLang"; // Importing custom hook for language switching.
import Auth from "./Auth";
import { getAuth, signOut } from "firebase/auth";

export default function Header() {
  const dispatch = useDispatch();
  const lang = useLang(enLang, arLang); // Using custom hook to get current language content.
  const langRedux = useSelector((state) => state.langSlice.lang);
  const [isScroll, setIsScroll] = useState(false); // State to track if the page is scrolled to Re-edit style of header.
  const [open, setOpen] = useState(false); // State to track if the menu is open.
  const [widthScreen, setWidthScreen] = useState(window.innerWidth); // State to track the screen width.
  const [auth, setAuth] = useState(false);
  const [signIn, setSignIn] = useState(
    localStorage.getItem("userToken") ? true : false
  );
  useEffect(() => {
    setSignIn(localStorage.getItem("userToken") ? true : false);
    window.addEventListener("resize", () => setWidthScreen(window.innerWidth));
    const handleScroll = () => {
      if (window.scrollY > 70) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", () =>
        setWidthScreen(window.innerWidth)
      ); // Cleanup resize event listener on component unmount.
      document.removeEventListener("scroll", handleScroll); // Cleanup scroll event listener on component unmount.
    };
  }, [signIn]);

  return (
    <>
      <nav className={isScroll ? "nav-scroll" : ""}>
        <div className="container" style={{ overflow: "visible" }}>
          <h1>Brainwave.io</h1>
          <div>
            {open ? (
              <img
                onClick={() => setOpen(false)} // Handler to close the menu
                width="30"
                height="30"
                src="https://img.icons8.com/ios-glyphs/30/000000/delete-sign.png"
                alt="delete-sign"
              />
            ) : (
              <img
                onClick={() => setOpen(true)} // Handler to open the menu
                width="30"
                height="30"
                src="https://img.icons8.com/ios-filled/50/000000/menu--v1.png"
                alt="menu--v1"
              />
            )}
            <ul className={open || widthScreen >= 995 ? "open" : ""}>
              <li onClick={() => setOpen(false)}>
                <Link to="#">{lang.OurShop}</Link>
              </li>
              <li onClick={() => setOpen(false)}>
                <Link to="#">{lang.Aboutus}</Link>
              </li>
              <li onClick={() => setOpen(false)}>
                <Link to="#">{lang.News}</Link>
              </li>
              <li onClick={() => setOpen(false)}>
                <Link to="#">{lang.Contactus}</Link>
              </li>
              <li
                onClick={() => {
                  dispatch(changeLang(langRedux === "Ar" ? "En" : "Ar")); // Dispatch action to change language
                  setOpen(false);
                }}
              >
                <button>{lang.lang}</button>
              </li>
            </ul>

            {signIn ? (
              <img
                onClick={() => {
                  signOut(getAuth()).then(() => {
                    setSignIn(false);
                    localStorage.removeItem("userToken");
                  });
                }}
                className="userIcon"
                width="30"
                height="30"
                src="https://img.icons8.com/ios-filled/50/exit.png"
                alt="exit"
              />
            ) : (
              <img
                onClick={() => {
                  setAuth(true);
                }}
                className="userIcon"
                width="30"
                height="30"
                src="https://img.icons8.com/pastel-glyph/64/user-male-circle.png"
                alt="user-male-circle"
              />
            )}
          </div>
        </div>
      </nav>
      {auth && <Auth setAuth={setAuth} setSignIn={setSignIn} />}
    </>
  );
}
