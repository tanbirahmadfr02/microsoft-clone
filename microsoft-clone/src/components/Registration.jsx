/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
import React, { useState } from "react";
import logo from "../assets/microsoft.svg";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { Watch } from "react-loader-spinner";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

function Registration() {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, SetLoading] = useState(false);
  const navigate = useNavigate();
  const handlerEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const [password, setPassword] = useState("");
  const [passError, setPassError] = useState("");
  const [passStrong, setPassStrong] = useState("");
  const [showPass, setShowPass] = useState("");
  const handlerPassword = (e) => {
    setPassword(e.target.value);
    setPassError("");
    setPassStrong("");
  };

  const handlerSubmit = () => {
    const regexMail =
      /[a-zA-Z0-9]{0,}([.]?[a-zA-Z0-9]{1,})[@](gmail.com|hotmail.com|yahoo.com)/;
    const regexPass =
      /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;

    if (!email) {
      setEmailError("Please Enter a Email Address");
    } else if (!regexMail.test(email)) {
      setEmailError("Please Enter a valid Email Address");
    }

    if (!password) {
      setPassError("password is required");
    } else if (regexPass.test(password)) {
      setPassStrong("Strong password");
    } else if (!regexPass.test(password)) {
      setPassError("please use (rBT4iHgxbvUYMR+) this type of characters");
    }

    if (
      email &&
      password &&
      regexMail.test(email) &&
      regexPass.test(password)
    ) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          sendEmailVerification(auth.currentUser).then(() => {
            toast.success("Registration successful, please verify your email");
            setEmail("");
            SetLoading(true);
            setPassword("");
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes("auth/email-already-in-use")) {
            setEmailError("This email is already in use");
          }
        });
    }
  };

  return (
    <>
      <section className="w-full h-screen bg-gray-100 flex justify-center items-center">
        <div className="w-[500px] mx-auto bg-white py-16 px-12">
          <div>
            <img src={logo} alt="logo" />
          </div>
          <h1 className="font-Poppins font-semibold text-[#1b1b1b] mt-4 mb-3 text-2xl">
            Create Account
          </h1>
          <form action="#">
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <div className="mb-8 relative">
              <input
                onChange={handlerEmail}
                value={email}
                className="h-9 py-6 px-3 w-full border-b border-gray-400 outline-none text-xl text-gray-600 font-medium"
                placeholder="someone@example.com"
                type="email"
              />

              {emailError && (
                <p className="py-2 px-3 bg-red-500 text-white text-center font-Poppins font-normal text-base absolute bottom-[-42px] left-0 w-full z-50">
                  {emailError}
                </p>
              )}
            </div>
            <div className="mb-8 relative">
              <input
                onChange={handlerPassword}
                value={password}
                className="h-9 py-6 px-3 w-full border-b border-gray-400 outline-none text-xl text-gray-600 font-medium"
                placeholder="Password"
                type={showPass ? "text" : "password"}
              />
              {passError && (
                <p className="py-2 px-3 bg-red-500 text-white text-center font-Poppins font-normal text-base absolute bottom-[-42px] left-0 w-full z-50">
                  {passError}
                </p>
              )}
              {passStrong && (
                <p className="py-2 px-3 bg-green-600 text-white text-center font-Poppins font-normal text-base absolute bottom-[-42px] left-0 w-full z-50">
                  {passStrong}
                </p>
              )}

              {showPass ? (
                <p
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-5 top-[19px] text-2xl
                        cursor-pointer"
                >
                  <AiOutlineEyeInvisible />
                </p>
              ) : (
                <p
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-5 top-[19px] text-2xl
                        cursor-pointer"
                >
                  <AiOutlineEye />
                </p>
              )}
            </div>
          </form>
          <a
            className="font-Poppins font-medium text-base text-[#0067b8] block mb-4"
            href="#"
          >
            Use a phone Number instead
          </a>
          <a
            className="font-Poppins font-medium text-base text-[#0067b8] block"
            href="#"
          >
            Get a new Email Address
          </a>
          <div className="mt-5 flex justify-end">
            <div>
              {loading ? (
                <Watch
                  height="50"
                  width="50"
                  radius="48"
                  color="#4fa94d"
                  ariaLabel="watch-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              ) : (
                <Link
                  onClick={handlerSubmit}
                  className="font-Poppins font-semibold text-2xl text-white bg-[#0067b8] py-3 px-12 inline-block"
                  href="#"
                >
                  Next
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Registration;
