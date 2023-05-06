import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { en, formFieldName } from "./component/common";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const d = new Date();
    const [userName, setUserName] = useState<string | null>('');
    
    const [totalDays, setTotalDays] = useState<number>();
    const [currentDate, setCurrentDate] = useState<number>();
    const [message, setMessage] = useState<string>('');
    const [data, setData] = useState<any>({});
    const [imageMeme, setImageMeme] = useState<any>()
    const currentMonthDays = () => {
        const date = new Date();
        setTotalDays(new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate())
        setCurrentDate(date.getDate())
    }
    const updateData = (item: any) => {
        setData({
            ...data,
            [item.target.name]: item.target.value
        })
    }
    useEffect(() => {
        const user = sessionStorage.getItem('userName')
        const userPic = sessionStorage.getItem('userPic')
        setUserName(user);
        currentMonthDays()
    },[])
    const expence = () => {
        console.log(data)
        if(totalDays && currentDate){
            const balanceDate = totalDays - currentDate;
            const balanceAmount = data.productPrice ? (data.monthlySalary - data.mandatoryExpence) - data.productPrice :  data.monthlySalary - data.mandatoryExpence;
            if(balanceDate !== 0){
                const dailyExpence = balanceAmount/balanceDate

                if(dailyExpence > 300){
                    if(data.productPrice && data.productName){
                        setMessage(`balance rupee ${balanceAmount} irukku, so daily rupee ${Math.round(dailyExpence)} selavu panalam, unakuennapa nee panakaran ${data.productName} lam vaangura`)
                        setImageMeme('/unakennapa.jpg')
                    } else {
                        setImageMeme('/money.jpg')
                        setMessage(`balance rupee ${balanceAmount} irukku, Daily rupee ${Math.round(dailyExpence)} selavu panalam.`)
                    }
                } else if(dailyExpence < 300 && dailyExpence > 100) {
                    setMessage(`balance rupee ${balanceAmount} irukku, Daily rupee ${Math.round(dailyExpence)} selavu panalam, Intha month thandrathu Konjam kastam than.`)
                    setImageMeme('')
                } else {
                    if(data.productPrice && data.productName){
                        setMessage(`balance rupee ${balanceAmount} irukku, Daily rupee ${Math.round(dailyExpence)} selavu panalam, kaasae ila ithula ithu ${data.productName} thevaya.`)
                        setImageMeme('/kaasuilapa.jpg')
                    } else {

                        setImageMeme('/kaasuilapa.jpg')
                        setMessage(`balance rupee ${balanceAmount} irukku, kaasu ila pa, Daily rupee ${Math.round(dailyExpence)} selavu panalam, Intha month 25 thanduva nee?`)
                    }
                }
            } else {
                setMessage(`Inaiku than last date so ${balanceAmount} ithan irukku.`)
            }
        }
    }
 return (
    <div className="flex h-screen bg-gray-50 items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px]">
        <div>
        <div className='pb-12'>
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/monthend.svg"
          alt="Icon by Icon8"
          width={180}
          height={37}
          priority
        />
        </div>
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
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
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <label
                  
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  {formFieldName.mandatoryExpence.lable}
                </label>
                <input
                  type={formFieldName.mandatoryExpence.type}
                  name={formFieldName.mandatoryExpence.name}
                  onChange={(e) => updateData(e)}
                  placeholder={formFieldName.mandatoryExpence.placeholder}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>
          </div>
          <div className="mb-5 flex gap-2 flex-col">
      <div className="-mx-3 flex flex-wrap">
      <div className='w-full px-3 sm:w-1/2'>
            <input
              type="text"
              name="productName"
              placeholder="product Name or place name"
              onChange={(e) => updateData(e)}
              className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            </div>
            <div className='w-full px-3 sm:w-1/2'>
            <input
              type="number"
              name="productPrice"
              id="guest"
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
              Submit
            </button>
          </div>
          <div className='pt-12'>
            {imageMeme &&
            <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                src={imageMeme}
                alt="meme"
                width={180}
                height={37}
                priority
            />
            }
            <h1 className='text-xl font-semibold'>Hi <span className='capitalize font-bold text-[#6A64F1] '>{userName}</span>, {message}</h1>
        </div>
        </div>
      </div>
    </div>
  )
}
