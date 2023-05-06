import Image from 'next/image';
import Link from "next/link";
import { useRouter } from 'next/router'

//firebase
import { Inter } from 'next/font/google';
import {GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseApp";
import { useState } from 'react';
import {en, message} from '../component/common'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const provider = new GoogleAuthProvider();
  const [email, setEmail] = useState<any>('');
  const [password, setPassword] = useState<string>('');
  const [disable, setDisable] = useState<boolean>(false);
  let router = useRouter();

  const formSignin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((data) => {
      // Signed in 
      const user = data.user
      const userName = user.email?.split('@')[0]
      sessionStorage.setItem("userName", userName || '');
      if(user?.metadata?.creationTime) {
        sessionStorage.setItem("createdTime", user?.metadata?.creationTime)
      }
      toast.success(message.loginMessage, {
        position: "top-right",
        autoClose: 5000,
      });
      setDisable(true)
      console.log(user.metadata.creationTime)
      router.push('/dashboard')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    });
  }

  const signIn = async() => {
    await signInWithPopup(auth, provider).then((data) => {
      if(data){
        sessionStorage.setItem("userName", data.user.displayName || '');
        sessionStorage.setItem("userPic", data.user.photoURL || ''); 
        console.log(data)
        router.push('/dashboard')
      }
    })
  }

  return (
    <main className={`min-h-screen bg-gray-100 text-gray-900 flex justify-center ${inter.className}`}>
    <div
      className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1"
    >
      <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
        <div>
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/monthend.svg"
          alt="Icon by Icon8"
          width={180}
          height={37}
          priority
        />
        </div>
        <div className="mt-12 flex flex-col items-center">
          <h5 className="text-xl xl:text-2xl font-bold">
            {`${en.login} ${en.applicationName} Application`}
          </h5>
          <p className='text-center'>{en.credit} <span className='font-bold text-indigo-600'>{en.developer}</span></p>
          <div className="w-full flex-1 mt-8">
            <div className="flex flex-col items-center">
              <button
                className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                onClick={signIn}
              >
                <div className="bg-white p-2 rounded-full">
                  <svg className="w-4" viewBox="0 0 533.5 544.3">
                    <path
                      d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                      fill="#4285f4"
                    />
                    <path
                      d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                      fill="#34a853"
                    />
                    <path
                      d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                      fill="#fbbc04"
                    />
                    <path
                      d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                      fill="#ea4335"
                    />
                  </svg>
                </div>
                <span className="ml-4">
                  {en.googleSignUp}
                </span>
              </button>
            </div>

            <div className="my-12 border-b text-center">
              <div
                className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2"
              >
                {`Or ${en.login} with e-mail`}
              </div>
            </div>

            <div className="mx-auto max-w-xs">
              <div className='flex flex-col gap-2'>
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              </div>
              <button
                onClick={formSignin}
                className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              >
                <svg
                  className="w-6 h-6 -ml-2"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <path d="M20 8v6M23 11h-6" />
                </svg>
                <span className="ml-3">
                  {en.login}
                </span>
              </button>
            </div>
            <div className="flex items-center justify-between px-10">
                      <div className="flex items-start">
                      </div>
                      <Link href="/" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">{en.newUser}</Link>
                  </div>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-indigo-100 hidden lg:flex">
        <div
          className="m-12 xl:m-16 w-full flex item-center"
        >
          <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg"
          alt="Icon by Icon8"
          width={580}
          height={537}
          priority
        />
        </div>
      </div>
    </div>
    <ToastContainer />
  </main>
  )
}
