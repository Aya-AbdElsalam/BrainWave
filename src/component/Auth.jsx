import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
export default function Auth(props) {
  const [auth, setAuth] = useState("sign");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errMsg, seterrMsg] = useState("");
  const [Sucess, setSucess] = useState(false);
  function register(e) {
    setSucess(false);
    seterrMsg("");
    e.preventDefault();
    createUserWithEmailAndPassword(getAuth(), email, pass)
      .then((data) => {
        seterrMsg("");
        setSucess(true);
        setTimeout(() => {
          setAuth("sign");
        }, 1000);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            seterrMsg("email already in use");
            break;
          case "auth/weak-password":
            seterrMsg("Password should be at least 6 characters");
            break;
          default:
            seterrMsg("Email or password was incorrect");
        }
      });
  }
  function signIn(e) {
    setSucess(false);
    seterrMsg("");
    e.preventDefault();
    signInWithEmailAndPassword(getAuth(), email, pass)
      .then((d) => {
        seterrMsg("");
        props.setSignIn(true);
        props.setAuth(false);
        localStorage.setItem("userToken", d.user.accessToken);
      })
      .catch((err) => {
        console.group(err.message);
        seterrMsg("Email or password was incorrect");
      });
  }
  return (
    <div className="Authentication">
      {auth === "sign" ? (
        <div className="AuthenticationForm">
          <img
            className="closeIcon"
            width="15px"
            height="15px"
            src="https://img.icons8.com/ios-glyphs/240/delete-sign.png"
            alt="delete-sign"
            onClick={() => {
              props.setAuth(false);
            }}
          />
          <h2>SIGN IN</h2>
          <p> Become a part of our community! </p>
          <form
            onSubmit={(e) => {
              signIn(e);
            }}
          >
            <input
              value={email}
              placeholder="Email"
              type="email"
              required
              onInput={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              value={pass}
              placeholder="Password"
              type="password"
              required
              onInput={(e) => {
                setPass(e.target.value);
              }}
            />
            <p className="err">{errMsg}</p>

            <p
              className="account"
              onClick={() => {
                setAuth("register");
                setEmail("");
                seterrMsg("");
                setPass("");
                setSucess(false);
              }}
            >
              don't have account? register
            </p>
            <button
              type="submit"
              className="mx-auto bg-primary rounded-[150px] hover:bg-transparent hover:text-primary border-4 border-primary p-2 font-bold w-36 text-white"
            >
              SIGN IN
            </button>
          </form>{" "}
        </div>
      ) : (
        <div className="AuthenticationForm">
          <img
            className="closeIcon"
            width="15px"
            onClick={() => {
              props.setAuth(false);
            }}
            height="15px"
            src="https://img.icons8.com/ios-glyphs/240/delete-sign.png"
            alt="delete-sign"
          />
          <h2>Register</h2>
          <p> Become a part of our community! </p>
          <form onSubmit={(e) => register(e)}>
            <input
              value={email}
              placeholder="Email"
              type="email"
              required
              onInput={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              value={pass}
              placeholder="Password"
              type="password"
              required
              onInput={(e) => {
                setPass(e.target.value);
              }}
            />
            <p className="err">{errMsg}</p>
            {Sucess && (
              <p
                className="success"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  width="20"
                  height="20"
                  src="https://img.icons8.com/windows/32/ok.png"
                  alt="ok"
                />
                Your account has been created successfully.
              </p>
            )}

            <p
              className="account"
              onClick={() => {
                setAuth("sign");
                setEmail("");
                seterrMsg("");
                setPass("");
                setSucess(false);
              }}
            >
              have account? sign in
            </p>
            <button
              type="submit"
              className="mx-auto bg-primary rounded-[150px] hover:bg-transparent hover:text-primary border-4 border-primary p-2 font-bold w-36 text-white"
            >
              Register
            </button>
          </form>{" "}
        </div>
      )}
    </div>
  );
}
