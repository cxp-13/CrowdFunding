import { useConnectionStatus } from '@thirdweb-dev/react'
import React, { useContext, useEffect, useState } from 'react'
import StateContext from '../context'
import { DisplayCampaigns } from '../components'

const Profile = () => {

  const [campaigns, setCampaigns] = useState([])
  const connectionStatus = useConnectionStatus()
  const { getUserCampaigns } = useContext(StateContext)

  const fetchCampaigns = async () => {
    const res = await getUserCampaigns()
    if (res.campaigns) {
      console.log("Profile fetchCampaigns", res);
      setCampaigns(res.campaigns)
    } else {
      console.log(res.error);
    }


  }

  useEffect(() => {
    console.log('Profile connection status', connectionStatus);
    if (connectionStatus === 'connected') {
      fetchCampaigns()
    } else {
      console.log('not connected');
    }
  }, [connectionStatus, getUserCampaigns])

  return (
    <DisplayCampaigns
      title="My Campaigns"
      campaigns={campaigns}
    />
  )
}

export default Profile