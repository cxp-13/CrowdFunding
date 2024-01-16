import React, { useContext, createContext, useEffect } from "react";

import { useAddress, useContract, useMetamask, useContractWrite, useContractMetadata, useContractRead } from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";
import { extractFunctionParamsFromAbi } from "@thirdweb-dev/sdk";
import dayjs from "dayjs";
import { transformCampaignFromReactToSmartContract, transformCampaignFromSmartContractToReact } from "../utils";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {

    const { contract } = useContract(import.meta.env.VITE_SMART_CONTRACT_ADDRESS3);
    const { mutateAsync: createCampaign, isLoading: createCampaignIsLoading, error: createCampaignError } = useContractWrite(contract, "createCampaign")
    const { data: campaigns, isLoading: getCampaignsIsLoading, error: getCampaignsError } = useContractRead(contract, "getCampaigns")
    const address = useAddress();
    const { mutateAsync: donateToCampaign, isLoading: donateToCampaignLoading, error: donateToCampaignError } = useContractWrite(contract, "donateToCampaign")



    const publishCampaign = async (campaign) => {

        campaign = transformCampaignFromReactToSmartContract(campaign);
        console.log("transform ", campaign);
        try {
            const data = await createCampaign({ args: [address, campaign.title, campaign.description, campaign.target, campaign.deadline, campaign.image] });
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    }


    const getCampaigns = async () => {
        console.log("data: campaigns", campaigns);
        if (getCampaignsError) {
            return { error: "happend an error while fetching campaigns" }
        } else {
            return {
                campaigns: transformCampaignFromSmartContractToReact(campaigns),
                isLoading: getCampaignsIsLoading
            }
        }
    }

    const getUserCampaigns = async () => {
        if (getCampaignsError) {
            return { error: "happend an error while fetching campaigns" }
        } else {
            const transformCampaigns = transformCampaignFromSmartContractToReact(campaigns)
            const myCampaigns = transformCampaigns.filter((item) => item.owner === address)
            return {
                campaigns: myCampaigns
            }
        }
    }


    const donate = async (pId, amount) => {
        if (donateToCampaignError) {
            return { error: "happend an error while donate", donateToCampaignError}
        } else {
            try {
                console.log("donate", pId, amount);
                donateToCampaign({
                    args: [pId],
                    overrides: {
                        value: ethers.utils.parseEther(amount)
                    }
                })

                return {
                    isLoading: donateToCampaignLoading
                }
            } catch (error) {
                console.log(error);
            }
        }
    }



    return (
        <StateContext.Provider value={{ publishCampaign, getCampaigns, getUserCampaigns, address, donate, contract }}>{children}</StateContext.Provider>
    )
}

export default StateContext