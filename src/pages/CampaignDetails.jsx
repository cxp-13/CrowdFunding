import React, { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { ethers } from 'ethers'
import { CountBox, CustomButton, Loader } from '../components'
import { calculateBarPercentage, daysLeft } from '../utils'
import { thirdweb } from "../assets"
import StateContext from '../context'
import { useContractRead } from '@thirdweb-dev/react'


const CampaignDetails = () => {

  const { address, donate, contract } = useContext(StateContext)
  const { state } = useLocation()
  const [isLoading, setIsLoading] = useState(false)

  const [amount, setAmount] = useState("")
  const [donatorInfos, setDonatorInfos] = useState([])

  const remainingDays = daysLeft(state.deadline)

  const percentage = calculateBarPercentage(state.target, state.amountCollected)

  const { data: donatorsInfo, isLoading: getDonatorsIsLoading, error: getDonatorsError } = useContractRead(contract, "getDonators", [state.pId])

  const handleDonate = async () => {
    try {
      const res = await donate(state.pId, amount)
      if (res.error) {
        console.log(res.error);
      } else {
        setIsLoading(res.isLoading)

      }
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    if (donatorsInfo && !getDonatorsIsLoading && donatorsInfo.length > 0) {
      let parsedDonatorsInfo = []

      for (let i = 0; i < donatorsInfo[0].length; i++) {
        console.log("donatorsInfo[0][i]", donatorsInfo[0][i], "donatorsInfo[1][i]", donatorsInfo[1][i]);
        parsedDonatorsInfo.push({
          donator: donatorsInfo[0][i],
          donation: ethers.utils.formatEther(donatorsInfo[1][i]),
        })
      }

      setDonatorInfos(parsedDonatorsInfo)

      console.log("donatorInfos", donatorInfos);
    } else {
      console.log("no donatorsInfo data");
    }
  }, [donatorsInfo, getDonatorsIsLoading])




  return (
    <div>
      {isLoading && <Loader/>}

      <div className='w-full flex md:flex-row flex-col mt-10 gap-[30px]'>
        <div className='flex-1 flex-col'>
          <img src={state.image} alt="campaign" className='w-full h-[410px] object-cover rounded-xl' />
          <div className='relative w-full h-[5px] bg-[#3a3a43] mt-2'>
            <div className={`absolute h-full bg-[#4acd8d] max-w-full`} style={{width: `${percentage}%`}}>

            </div>
          </div>
        </div>
        <div className='flex md:w-[150px] w-full flex-wrap
          justify-between gap-[30px]'>
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox title={`Raised of ${state.target}`} value={state.amountCollected} />
          <CountBox title="Total Backers" value={donatorInfos.length} />

        </div>

      </div>

      <div className='mt-[60px] flex lg:flex-row flex-col gap-5'>
        <div className='flex-[2] flex flex-col gap-[40px]'>
          <div>
            <h4 className='font-epilogue font-semibold text-[18px]
        text-white   uppercase'>
              creator</h4>
            <div className='mt-[20px] flex flex-row items-center flex-wrap gap-[14px]'>
              <div className='w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer'>
                <img src={thirdweb} alt="user" className='w-[60%] h-[60%] object-contain' />

              </div>

              <div>
                <h4 className='font-epilogue font-semibold text-[14px] text-white break-all'>{state.owner}</h4>
                <p className='mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]'>10 Campaigns</p>
              </div>

            </div>

          </div>

          <div>
            <h4 className='font-epilogue font-semibold text-[18px]
        text-white  uppercase'>
              Story</h4>
            <div className='mt-[20px]'>
              <p className='font-epilogue font-normal text-[12px] text-[#808191] leading-[26px] text-justify'>{state.description}</p>
            </div>
          </div>

          <div>
            <h4 className='font-epilogue font-semibold text-[18px]
        text-white  uppercase'>
              Donators</h4>
            <div className='mt-[20px] flex flex-col gap-4'>
              {donatorInfos.length > 0 ? donatorInfos.map((donatorInfo, index) => (
                <div key={index} className='flex justify-between'>
                  <p className='text-gray-400 font-epilogue font-semibold'>{index + 1} {donatorInfo.donator}</p>
                  <p className='text-gray-200 font-epilogue font-semibold'>{donatorInfo.donation}</p>
                </div>
              )) : (
                <p className='font-epilogue font-normal text-[12px] text-[#808191] leading-[26px] text-justify'>Do donators yet. Be the first one!</p>
              )}
            </div>
          </div>
        </div>


        <div className='flex-1'>
          <h4 className='font-epilogue font-semibold text-[18px]
        text-white  uppercase'>
            FUND</h4>

          <div className='mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]'>
            <p className='font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#808191]'>
              Fund the campaign
            </p>
            <div className='mt-[30px]'>
              <input type="number" placeholder='ETH 0.1' step="0.01" className='w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43]
                bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className='mt-[20px] p-4 bg-[#13131a] rounded-[10px]'>
                <h4 className='font-epilogue font-semibold text-[14px] leading-[22px] text-white'>Back it because you believe in it.</h4>
                <p className='mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]'>Supprot the project for no reward. just because it speaks to you.</p>
              </div>

              <CustomButton btnType={"button"} title={"Fund Campaign"} styles={"w-full bg-[#8c6dfd]"} handleClick={handleDonate} />


            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default CampaignDetails