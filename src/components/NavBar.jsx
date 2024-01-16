import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logo, menu, search, thirdweb } from '../assets'
import { navlinks } from '../constants'
import CustomButton from './customButton'
import { ConnectWallet, useAddress } from '@thirdweb-dev/react'
import {
  useConnect,
  // import the wallet you want to connect
  metamaskWallet,
} from "@thirdweb-dev/react";

const NavBar = () => {

  const walletConfig = metamaskWallet();
  const connect = useConnect();
  const address = useAddress()

  const navigate = useNavigate()
  const [isActive, setIsActive] = useState('dashboard')
  const [toggleDrawer, setToggleDrawer] = useState(false)

  const connectWallet = async() => {
    try {
      const wallet = await connect(
        walletConfig
      );
      console.log("connected to", wallet);
    } catch (e) {
      console.error("failed to connect", e);
    }
  }



  return (
    <div className='flex items-center sm:flex-row  w-full  justify-between flex-col-reverse gap-3 mb-10'>
      <div className='max-sm:w-full sm:w-60 h-[52px] flex flex-row justify-center items-center p-2 rounded-full  bg-[#1c1c24]'>
        <input type="text" className='basis-2/3 outline-none border-none rounded-full  flex-1 bg-transparent placeholder:text-gray-600' placeholder='Search for campaigns' />
        <div className='basis-1/3 rounded-full bg-green-600 flex-1  w-[72px] h-full flex justify-center items-center'>
          <img src={search} alt="search" className='object-contain w-[15px] h-[15px]' />
        </div>
      </div>

      <div className='flex max-sm:hidden  gap-5 justify-center items-center'>

        {/* <ConnectWallet btnTitle="Sign in" />; */}

        <CustomButton
          btnType="button"
          title={address ? 'Create a campaign' : 'Connect'}
          styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
          handleClick={() => {
            if (address) navigate('create-campaign')
            else connectWallet()
          }}
        />
        <Link to="/profile">
          <div className='flex items-center justify-center  rounded-full p-4 bg-[#2c2f32] cursor-pointer'>
            <img src={thirdweb} alt="thirdweb" className='object-contain w-[15px] h-[15px]' />
          </div>
        </Link>

      </div>

      {/* small screen navigation */}
      <div className='flex justify-between items-center sm:hidden w-full relative'>
        <div className='flex items-center justify-center  rounded-xl p-4 bg-[#2c2f32] cursor-pointer'>
          <img src={thirdweb} alt="thirdweb" className='object-contain w-[20px] h-[20px]' />
        </div>

        <img src={menu}
          alt="menu"
          className='object-contain w-[25px] h-[25px] cursor-pointer'
          onClick={() => setToggleDrawer((pre) => !pre)}
        />

        <div className={`absolute top-[60px] left-0 right-0 bg-[#1c1c24] z-10 py-5 transition-all duration-700
        shadow-secondary ${toggleDrawer ? 'translate-y-0' : '-translate-y-[100vh]'}`}>
          <ul className='mb-4'>
            {
              navlinks.map((link) => (
                <li
                  key={link.name}
                  className={`flex p-4 ${isActive == link.name && 'bg-[#3a3a43]'}`}
                  onClick={() => {
                    setIsActive(link.name)
                    setToggleDrawer(false)
                    navigate(link.link)
                  }}>

                  <img
                    src={link.imgUrl}
                    alt={link.name}
                    className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0' : 'grayscale'}`}
                  />


                  <p className={`ml-[20px] font-epilogue 
                  font-semibold text-[14px] 
                  ${isActive === link.name ? 'text-[#1dc071]' : 'text-[#808191]'}`}>
                    {link.name}
                  </p>
                </li>


              ))
            }

          </ul>

          <div className='flex mx-4'>

            <CustomButton
              btnType="button"
              title={address ? 'Create a campaign' : 'Connect'}
              styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
              handleClick={() => {
                if (address) navigate('create-campaign')
                else connect()
              }}
            />
          </div>





        </div>

      </div>


    </div>
  )
}

export default NavBar