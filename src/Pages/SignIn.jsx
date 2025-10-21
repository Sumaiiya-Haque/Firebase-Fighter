import { Link } from "react-router";
import MyContainer from "../Components/MyContainer";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { useRef, useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { toast } from "react-toastify";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const SignIn = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);

  const emailRef = useRef(null);

  // const [email, setEmail] = useState(null);

  const handleSignin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        if (!res.user.emailVerified) {
          toast.error("Your Email is not Verified.");
          return;
        }
        console.log(res);
        setUser(res.user);
        toast.success("sign in successfull");
      })
      .catch((error) => {
        console.log(error.code, error.message);

        if (error.code === "auth/invalid-email") {
          toast.error("Please enter a valid email address.");
        } else if (error.code === "auth/missing-email") {
          toast.error("Email is required.");
        } else if (error.code === "auth/missing-password") {
          toast.error("Password is required.");
        } else if (error.code === "auth/invalid-credential") {
          toast.error("Invalid email or password.");
        } else if (error.code === "auth/user-not-found") {
          toast.error("No user found with this email. Please sign up first.");
        } else if (error.code === "auth/wrong-password") {
          toast.error("Incorrect password. Try again.");
        } else if (error.code === "auth/too-many-requests") {
          toast.error("Too many failed attempts. Try again later.");
        } else if (error.code === "auth/user-disabled") {
          toast.error("Your account has been disabled. Contact support.");
        } else if (error.code === "auth/network-request-failed") {
          toast.error("Network error. Check your internet connection.");
        } else if (error.code === "auth/invalid-api-key") {
          toast.error("Invalid API key. Please check your Firebase config.");
        } else if (error.code === "auth/operation-not-allowed") {
          toast.error("Email/Password sign-in is disabled in Firebase.");
        } else {
          toast.error("Something went wrong. Please try again later.");
        }
      });
  };

  const handleGoogleSignin = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        console.log(res);
        setUser(res.user);
        toast.success("sign in successfull");
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });
  };

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Signout Successfully");
        setUser(null);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleGithubSignin = () => {
    signInWithPopup(auth, githubProvider)
      .then((res) => {
        console.log(res);
        setUser(res.user);
        toast.success("sign in successfull");
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
      });
  };

  const handleForgetPassword = (e) => {
    console.log(e.target.email);
    const email = emailRef.current.value;
    sendPasswordResetEmail(auth, email)
      .then((res) => {
        toast.success("check your email to reset password");
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  // console.log(user);

  return (
    <div className="min-h-[calc(100vh-20px)] flex items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 relative overflow-hidden">
      {/* Animated glow orbs */}
      <div className="absolute inset-0">
        <div className="absolute w-72 h-72 bg-purple-400/30 rounded-full blur-xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-blue-400/30 rounded-full blur-xl bottom-10 right-10 animate-pulse"></div>
      </div>

      <MyContainer>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-6 lg:p-10 text-white">
          {/* Left section */}
          <div className="max-w-lg text-center lg:text-left">
            <h1 className="text-5xl font-extrabold drop-shadow-lg">
              Welcome Back
            </h1>
            <p className="mt-4 text-lg text-white/80 leading-relaxed">
              Sign in to continue your journey. Manage your account, explore new
              features, and more.
            </p>
          </div>

          {/* Login card */}
          <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8">
            {user ? (
              <div className="text-center space-y-3">
                <img
                  className="h-20 w-20 rounded-full mx-auto"
                  src={user.photoURL || "photo nai"}
                  alt=""
                />

                <h2 className="text-xl font-semibold">{user?.displayName}</h2>
                <p className="text-white">{user?.email}</p>
                <button onClick={handleSignout} className="my-btn">
                  Sign Out
                </button>
              </div>
            ) : (
              <form onSubmit={handleSignin} className="space-y-5">
                <h2 className="text-2xl font-semibold mb-2 text-center text-white">
                  Sign In
                </h2>

                <div>
                  <label className="block text-sm mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    ref={emailRef}
                    // value={email}
                    // onChange={(e)=>setEmail(e.target.value)}
                    placeholder="example@email.com"
                    className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm mb-1">Password</label>
                  <input
                    type={show ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <span
                    onClick={() => setShow(!show)}
                    className="absolute right-4 top-9 cursor-pointer z-50"
                  >
                    {show ? <FaEye /> : <IoEyeOff></IoEyeOff>}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleForgetPassword}
                  className="hover:underline cursor-pointer"
                >
                  Forget Password?
                </button>

                <button type="submit" className="my-btn">
                  Login
                </button>

                {/* Divider */}
                <div className="flex items-center justify-center gap-2 my-2">
                  <div className="h-px w-16 bg-white/30"></div>
                  <span className="text-sm text-white/70">or</span>
                  <div className="h-px w-16 bg-white/30"></div>
                </div>

                {/* Google Signin */}
                <button
                  type="button"
                  onClick={handleGoogleSignin}
                  className="flex items-center justify-center gap-3 bg-white text-gray-800 px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="google"
                    className="w-5 h-5"
                  />
                  Continue with Google
                </button>

                {/* Github signIn */}
                <button
                  type="button"
                  onClick={handleGithubSignin}
                  className="flex items-center justify-center gap-3 bg-white text-gray-800 px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <img
                    src="https://img.icons8.com/ios-glyphs/30/github.png"
                    alt="google"
                    className="w-5 h-5"
                  />
                  Continue with Google
                </button>

                <p className="text-center text-sm text-white/80 mt-3">
                  Don’t have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-pink-300 hover:text-white underline"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default SignIn;
