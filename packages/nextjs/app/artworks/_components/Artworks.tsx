'use client'

import nftsMetadata from "~~/utils/simpleNFT/nftsMetadata"
import { useAccount } from "wagmi";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import { addToIPFS } from "~~/utils/simpleNFT/ipfs-fetch";
import { ArtworkCard } from "./ArtworkCard"

export const Artworks = () => {

    const { address:connectedAddress, isConnected, isConnecting } = useAccount();
    const { writeContractAsync } = useScaffoldWriteContract("YourCollectible");

    const { data: tokenIdCounter } = useScaffoldReadContract({
      contractName: "YourCollectible",
      functionName: "tokenIdCounter",
      watch: true,
    });
  
    const handleMintItem = async (index: number) => {
      // circle back to the zero item if we've reached the end of the array
      if (tokenIdCounter === undefined) return;
  
      const tokenIdCounterNumber = Number(tokenIdCounter);
      const currentTokenMetaData = nftsMetadata[index % nftsMetadata.length];
      const notificationId = notification.loading("Uploading to IPFS");
      try {
        const uploadedItem = await addToIPFS(currentTokenMetaData);
  
        // First remove previous loading notification and then show success notification
        notification.remove(notificationId);
        notification.success("Metadata uploaded to IPFS");
  
        await writeContractAsync({
          functionName: "mintItem",
          args: [connectedAddress, uploadedItem.path],
        });

        notification.success("NFT Minted Successfully, You can now see it in the My NFTs page");
      } catch (error) {
        notification.remove(notificationId);
        console.error(error);
      }
    };

    return (<div className="flex flex-wrap gap-4 my-8 px-5 justify-center">
        {nftsMetadata.map((item, index) => (
            <ArtworkCard artWork={item} key={index} mint={()=>{
                handleMintItem(index);
            }} />
        ))}
    </div>)
}