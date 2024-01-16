import { ethers } from "ethers";

export const daysLeft = (deadline) => {
    const difference = new Date(deadline).getTime() - Date.now();
    const remainingDays = difference / (1000 * 3600 * 24);

    return remainingDays.toFixed(0);
};

export const calculateBarPercentage = (goal, raisedAmount) => {
    const percentage = Math.round((raisedAmount * 100) / goal);

    return percentage;
};

export const checkIfImage = (url, callback) => {
    const img = new Image();
    img.src = url;

    if (img.complete) callback(true);

    img.onload = () => callback(true);
    img.onerror = () => callback(false);
};

export const transformCampaignFromSmartContractToReact = (campaigns) => {
    if (campaigns === undefined) return []
    return campaigns.map((campaign, index) => (
        {
            ...campaign,
            deadline: new Date(campaign.deadline * 1000).toLocaleDateString(),
            target: ethers.utils.formatEther(campaign.target),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected),
            pId: index
        }
    ))
}

export const transformCampaignFromReactToSmartContract = (campaign) => {
    return {
        ...campaign,
        deadline: Math.floor(new Date(campaign.deadline).getTime() / 1000),
        target: ethers.utils.parseEther(campaign.target),
    }

}



