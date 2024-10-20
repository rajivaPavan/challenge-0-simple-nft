import { NextPage } from "next";

import { Artworks } from "../myNFTs/_components";

const ArtworksPage: NextPage = () => {

    return (
        <>
            <div className="flex items-center flex-col pt-10">
                <div className="px-5">
                    <h1 className="text-center mb-8">
                        <span className="block text-4xl font-bold">Artworks to Mint</span>
                    </h1>
                </div>
            </div>
            <div className="flex">
                <Artworks />
            </div>
        </>
    );
}

export default ArtworksPage;