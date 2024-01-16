import React, { useContext, useEffect, useState } from 'react'
import stateContext from '../context'
import { useConnectionStatus } from '@thirdweb-dev/react'
import { DisplayCampaigns } from '../components'

const Home = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [campaigns, setCampaigns] = useState([])
  const connectionStatus = useConnectionStatus();

  const { getCampaigns } = useContext(stateContext)

  const fetchCampaigns = async () => {
    const res = await getCampaigns()
    if (res.campaigns) {
      setCampaigns(res.campaigns)
      setIsLoading(res.isLoading)
    } else {
      console.log(res.error);
    }
    console.log(res);
  }

  useEffect(() => {
    console.log('connection status', connectionStatus);
    if (connectionStatus === 'connected') {
      fetchCampaigns()
    } else {
      console.log('not connected');
    }
  }, [connectionStatus, getCampaigns])

  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}

    />
  )
}

export default Home