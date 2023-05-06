import { useState, useEffect } from "react";
// nextjs component
import Image from "next/image";
import { useRouter } from 'next/router';
// firebase
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseApp";
// custom components
import { en, message } from "./common";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const [userName, setUserName] = useState<string | null>("");
  const [profilePic, setProfilePic] = useState<string | null>("");
  let router = useRouter();

  // logout firebase
  const logOut = () => {
    signOut(auth)
      .then(() => {
        toast.success(message.logoutMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      router.push('/login')
      .catch((error) => {
        toast.error(message.logoutMessage, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
      });
  };

  useEffect(() => {
    const user = sessionStorage.getItem("userName");
    const userPic = sessionStorage.getItem("userPic");
    setUserName(user);
    setProfilePic(userPic);
  }, []);
  return (
    <>
      {profilePic ? (
        <button>
          <Image
            className="object-cover w-full h-full rounded-full"
            src={profilePic || ""}
            alt="profile pic"
            width={180}
            height={37}
            priority
          />
        </button>
      ) : (
        <div className="flex flex-col md:flex-row md:items-center md:gap-x-2">
          <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <button
              data-popover-target="popover-default"
              type="button"
              className="font-bold uppercase text-xl text-indigo-600 dark:text-gray-300"
            >
              {userName?.charAt(0)}
            </button>
          </div>
          <div className="font-medium pl-5">
            <div className="capitalize break-words">{userName}</div>
            <button onClick={logOut}>
              <p className="text-sm text-indigo-600">{en.logout}</p>
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}
