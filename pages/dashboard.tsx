import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import { en, formFieldName } from "../component/common";
import Profile from "../component/Profile";

const inter = Inter({ subsets: ["latin"] });

interface expencesData {
  balanceDate?: number;
  balanceAmount?: number;
  dailyExpence?: number;
}

export default function Dashboard() {
  const d = new Date();
  const [userName, setUserName] = useState<string | null>("");
  const [profilePic, setProfilePic] = useState<string | null>("");
  const [totalDays, setTotalDays] = useState<number>();
  const [currentDate, setCurrentDate] = useState<number>();
  const [message, setMessage] = useState<string>("");
  const [expenceData, setExpenceData] = useState<expencesData>({});
  const [data, setData] = useState<any>({});
  const [imageMeme, setImageMeme] = useState<any>();
  const [time, setTime] = useState<string>("");
  const [needAdvise, setNeedAdvice] = useState<boolean>(false);

  useEffect(() => {
    var myDate = new Date();
    var hrs = myDate.getHours();
    getTime(hrs);
  }, []);

  const getTime = (hrs: any) => {
    if (hrs < 12) setTime("Good Morning");
    else if (hrs >= 12 && hrs <= 17) setTime("Good Afternoon");
    else if (hrs >= 17 && hrs <= 24) setTime("Good Evening");
  };
  const currentMonthDays = () => {
    const date = new Date();
    setTotalDays(
      new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    );
    setCurrentDate(date.getDate());
  };
  const updateData = (item: any) => {
    setData({
      ...data,
      [item.target.name]: item.target.value,
    });
  };
  useEffect(() => {
    const user = sessionStorage.getItem("userName");
    const userPic = sessionStorage.getItem("userPic");
    setUserName(user);
    setProfilePic(userPic);
    currentMonthDays();
    if (totalDays && currentDate) {
      const balanceDate = totalDays - currentDate;
      setExpenceData({
        ...expenceData,
        balanceDate,
      });
    }
  }, []);
  const expence = () => {
    if (totalDays && currentDate) {
      const balanceDate = totalDays - currentDate;
      const balanceAmount = data.productPrice
        ? data.monthlySalary - data.mandatoryExpence - data.productPrice
        : data.monthlySalary - data.mandatoryExpence;
      setExpenceData({
        ...expenceData,
        balanceAmount,
      });
      if (balanceDate !== 0) {
        const dailyExpence = balanceAmount / balanceDate;
        setExpenceData({
          balanceDate,
          balanceAmount,
          dailyExpence,
        });
        if (dailyExpence > 300) {
          if (data.productPrice && data.productName) {
            setMessage(
              `Balance rupee ${balanceAmount} irukku, so daily rupee ${Math.round(
                dailyExpence
              )} selavu panalam, unakuennapa nee panakaran ${
                data.productName
              } lam vaangura`
            );
            setImageMeme("/unakennapa.jpg");
          } else {
            setImageMeme("/money.jpg");
            setMessage(
              `Balance rupee ${balanceAmount} irukku, Daily rupee ${Math.round(
                dailyExpence
              )} selavu panalam.`
            );
          }
        } else if (dailyExpence < 300 && dailyExpence > 100) {
          setMessage(
            `Balance rupee ${balanceAmount} irukku, Daily rupee ${Math.round(
              dailyExpence
            )} selavu panalam, Intha month thandrathu Konjam kastam than.`
          );
          setImageMeme("");
        } else {
          if (data.productPrice && data.productName) {
            setMessage(
              `Balance rupee ${balanceAmount} irukku, Daily rupee ${Math.round(
                dailyExpence
              )} selavu panalam, kaasae ila ithula ithu ${
                data.productName
              } thevaya.`
            );
            setImageMeme("/kaasuilapa.jpg");
          } else {
            setImageMeme("/kaasuilapa.jpg");
            setMessage(
              `Balance rupee ${balanceAmount} irukku, kaasu ila pa, Daily rupee ${Math.round(
                dailyExpence
              )} selavu panalam, Intha month 25 thanduva nee?`
            );
          }
        }
      } else {
        setMessage(`Inaiku than last date so ${balanceAmount} ithan irukku.`);
      }
    }
  };
  return (
    <div className="bg-indigo-50 h-screen">
      <main className="md:pt-16 max-h-screen overflow-auto">
        <div className="md:px-6 md:py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white md:rounded-3xl p-8 mb-5">
              <div className="pb-6">
                <Image
                  className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                  src="/monthend.svg"
                  alt="Icon by Icon8"
                  width={180}
                  height={37}
                  loading='lazy'
                />
              </div>
                <div className="flex items-end justify-between">
                  <div className="text-gray-400 text-xs">
                      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        <Link href="https://pragatheeswaran.vercel.app/" className="hover:underline">
                          {en.credit} <br />{" "}
                          <span className="text-indigo-500 font-bold text-lg">
                            {en.developer}
                          </span>
                        </Link>
                      </span>
                  </div>
                  <div className="">
                    <Profile />
                  </div>
                </div>
              <hr className="my-10" />
              <div className="grid md:grid-cols-2 gap-x-20 ">
                <div className="order-2 md:order-1">
                  <h2 className="text-2xl font-bold mb-4">{en.stats}</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <div className="p-4 bg-green-100 rounded-xl">
                        <div className="font-bold text-xl text-gray-800 leading-none">
                          <span>{time}</span>, <br />
                          <span className="capitalize">{userName}</span>
                        </div>
                        <div className="mt-5">
                          <button
                            type="button"
                            className="inline-flex items-center justify-center py-2 px-5 rounded-lg font-bold bg-white text-gray-800 hover:text-green-500 text-sm font-semibold transition"
                            onClick={() => setNeedAdvice(true)}
                          >
                            {formFieldName.getAdvice}
                          </button>
                        </div>
                        {needAdvise && (
                          <div className="mt-5 text-gray-800 font-medium">
                            <p>{message}</p>
                            <div className="pb-6">
                              <Image
                                className="w-full"
                                src={imageMeme}
                                alt="Icon by Icon8"
                                width={180}
                                height={37}
                                priority
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="p-4 bg-yellow-100 rounded-xl text-gray-800">
                      <div className="font-bold text-2xl leading-none">
                        {expenceData?.balanceDate}
                      </div>
                      <div className="mt-2 font-bold">{en.balanceDay}</div>
                    </div>
                    <div className="p-4 bg-yellow-100 rounded-xl text-gray-800">
                      <div className="font-bold text-2xl leading-none">
                        {`${en.indianRupee} ${
                          expenceData?.balanceAmount || "0"
                        }`}
                      </div>
                      <div className="mt-2 font-bold">{en.balanceAmount}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="p-4 bg-purple-100 rounded-xl text-gray-800">
                        <div className="font-bold text-xl leading-none">
                          {en.dailyHeader}
                        </div>
                        <div className="mt-2 font-bold">
                          {`${en.indianRupee} ${
                            expenceData?.dailyExpence ? Math.round(expenceData?.dailyExpence) : 0
                          }`}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-6 md:my-0 order-1 md:order-2">
                  <h2 className="text-2xl font-bold mb-6">
                    {en.headerDasboard}
                  </h2>
                  <div className="-mx-3 flex flex-wrap">
                    <div className="w-full px-3">
                      <div className="mb-5">
                        <label className="mb-3 block text-base font-medium text-[#07074D]">
                          {formFieldName.monthlySalary.lable}
                        </label>
                        <input
                          type={formFieldName.monthlySalary.type}
                          name={formFieldName.monthlySalary.name}
                          onChange={(e) => updateData(e)}
                          value={data.monthlySalary}
                          placeholder={formFieldName.monthlySalary.placeholder}
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                      </div>
                    </div>
                    <div className="w-full px-3">
                      <div className="mb-5">
                        <label className="mb-3 block text-base font-medium text-[#07074D]">
                          {formFieldName.mandatoryExpence.lable}
                        </label>
                        <input
                          type={formFieldName.mandatoryExpence.type}
                          name={formFieldName.mandatoryExpence.name}
                          onChange={(e) => updateData(e)}
                          placeholder={
                            formFieldName.mandatoryExpence.placeholder
                          }
                          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-5 flex gap-2 flex-col">
                    <div className="-mx-3 flex flex-wrap">
                      <div className="w-full px-3 sm:w-1/2">
                        <input
                          type="text"
                          name="productName"
                          placeholder="product Name"
                          onChange={(e) => updateData(e)}
                          className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                      </div>
                      <div className="w-full px-3 sm:w-1/2 pt-5 md:pt-0">
                        <input
                          type="number"
                          name="productPrice"
                          placeholder="Product Price"
                          onChange={(e) => updateData(e)}
                          min="0"
                          className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                      onClick={expence}
                    >
                      {formFieldName.submitButton}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
