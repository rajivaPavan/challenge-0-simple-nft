import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { NFTMetaData } from "~~/utils/simpleNFT/nftsMetadata";

export const ArtworkCard = ({ artWork, mint }: { 
  artWork: Partial<NFTMetaData>,
  mint: () => void
}) => {

  const { writeContractAsync } = useScaffoldWriteContract("YourCollectible");

  return (
    <div className="card card-compact bg-base-100 shadow-lg w-[300px] shadow-secondary">
      <figure className="relative">
        {/* eslint-disable-next-line  */}
        <img src={artWork.image} alt="NFT Image" className="h-60 min-w-full" />
      </figure>
      <div className="card-body space-y-3">
        <div className="flex items-center justify-center">
          <p className="text-xl p-0 m-0 font-semibold">{artWork.name}</p>
          <div className="flex flex-wrap space-x-2 mt-1">
            {artWork.attributes?.map((attr, index) => (
              <span key={index} className="badge badge-primary py-3">
                {attr.value}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center mt-1">
          <p className="my-0 text-lg">{artWork.description}</p>
        </div>
        <div className="card-actions justify-end">
          <button
            className="btn btn-secondary btn-md px-8 tracking-wide"
            onClick={mint}
          >
            Mint NFT
          </button>
        </div>
      </div>
    </div>
  );
};
