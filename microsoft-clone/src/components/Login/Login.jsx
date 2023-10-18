/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import logo from "../../assets/microsoft.svg";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { Watch } from "react-loader-spinner";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const regexMail =
    /[a-zA-Z0-9]{0,}([.]?[a-zA-Z0-9]{1,})[@](gmail.com|hotmail.com|yahoo.com)/;
  const regexPass =
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [showPass, setShowPass] = useState("");
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const fbProvider = new FacebookAuthProvider();
  const navigate = useNavigate();
  const [loading, SetLoading] = useState(false);

  const handlerEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handlerPassword = (e) => {
    setPassword(e.target.value);
    setPassError("");
  };

  const handlerSubmit = () => {
    if (!email) {
      setEmailError("Email is required");
    } else if (!regexMail.test(email)) {
      setEmailError("Please provide a proper email address");
    }

    if (!password) {
      setPassError("password is required");
    } else if (!regexPass.test(password)) {
      setPassError("Please use this type of characters (@Ge8&$)");
    }

    if (email && password && regexMail.test(email)) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.success("login successful");
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
        });
    }
  };

  const handlerGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        toast.success("Login successful");
        setTimeout(() => {
          SetLoading(true);
          navigate("/");
        }, 3000);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
      });
  };

  const handleFacebook = () => {
    signInWithPopup(auth, fbProvider)
      .then(() => {
        toast.success("Login successful");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
      });
  };

  return (
    <>
      <section className="w-full h-screen bg-gray-100 flex justify-center items-center">
        <div className="w-[500px] mx-auto bg-white py-16 px-12">
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
          <div></div>
          <div>
            <img src={logo} alt="logo" />
          </div>
          <h1 className="font-Poppins font-semibold text-[#1b1b1b] mt-4 mb-3 text-2xl">
            Login to you account
          </h1>
          <div className="flex gap-x-2.5">
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
                <div onClick={handlerGoogle}>
                  <Link
                    className="font-Poppins font-normal text-sm text-white bg-[#0067b8] py-1.5 px-3 flex w-[180px] justify-center items-center gap-x-2 rounded-md"
                    href="#"
                  >
                    <FcGoogle className="text-2xl" /> Login with google
                  </Link>
                </div>
              )}
            </div>

            <div onClick={handleFacebook}>
              <Link
                className="font-Poppins font-normal text-sm text-white bg-[#0067b8] py-1.5 px-3 flex w-[200px] justify-center items-center gap-x-2 rounded-md"
                href="#"
              >
                <BsFacebook className="text-2xl" /> Login with Facebook
              </Link>
            </div>
          </div>
          <form action="#">
            <div className="mb-8 relative">
              <input
                onChange={handlerEmail}
                value={email}
                className="h-9 py-6 px-3 w-full border-b border-gray-400 outline-none text-xl text-gray-600 font-medium"
                placeholder="someone@example.com"
                type="email"
              />

              {emailError && (
                <p className="py-1 px-2 bg-red-500 text-white text-center font-Poppins font-normal text-sm absolute bottom-[-30px] left-0 w-full z-50">
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
                <p className="py-1 px-2 bg-red-500 text-white text-center font-Poppins font-normal text-sm absolute bottom-[-30px] left-0 w-full z-50">
                  {passError}
                </p>
              )}
              {showPass ? (
                <p
                  onClick={() => {
                    setShowPass(!showPass);
                  }}
                  className="absolute top-[50%] right-2 translate-y-[-50%] cursor-pointer"
                >
                  <AiOutlineEyeInvisible />
                </p>
              ) : (
                <p
                  onClick={() => {
                    setShowPass(!showPass);
                  }}
                  className="absolute top-[50%] right-2 translate-y-[-50%] cursor-pointer"
                >
                  <AiOutlineEye />
                </p>
              )}
            </div>
          </form>
          <a
            className="font-Poppins font-medium text-sm text-[#0067b8] block mb-4"
            href="#"
          >
            Don't have any account{" "}
            <Link className="text-base font-bold" to={"/registration"}>
              sign up
            </Link>
          </a>
          <Link
            to={
              "https://accounts.google.com/signup/v2/createaccount?theme=glif&flowName=GlifWebSignIn&flowEntry=SignUp"
            }
            className="font-Poppins font-medium text-base text-[#0067b8] block"
            href="#"
          >
            Get a new Email Address
          </Link>
          <div className="mt-5 flex justify-end">
            <Link
              onClick={handlerSubmit}
              className="font-Poppins font-semibold text-2xl text-white bg-[#0067b8] py-3 px-12 inline-block"
              href="#"
            >
              Next
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
