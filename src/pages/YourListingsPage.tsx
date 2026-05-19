import { useState, useEffect } from "react";
import Empty from "../components/EmptyPage";
import ListingsListV1 from "../components/ListingsListV1";
import MainFooter from "../components/MainFooter";
import MainHeader from "../components/MainHeader";
import MainSideBar, { MainPageToLoad } from "../components/MainSideBar";
import "./YourListingsPage.css";

async function getNFTData() {
  //uri route https://gateway.irys.xyz/AgsPKjse94oHAARRvMQjEeeVtG4aHwXdwGyGdAjzMxpH
  //regular route "http://localhost:4000/grab-assets"
  const route: string = "http://localhost:4000/grab-assets";
  const assetJson = await fetch(route).then((res) => res.json());

  console.log(assetJson);
  return assetJson;
}

interface NftData {
  name: string;
  description: string;
  image: string;
  price: string;
  properties?: any; //optional if not used
}

const YourListings: React.FC<{}> = () => {
  const [yourListings, setYourListings] = useState([
    {
      name: "Election Season",
      category: "Art",
      blockchain: "Flow",
      bid: 0.45,
      views: 4915,
      auction: true,
      image: "/election season.png",
    },
    {
      name: "Lorr's Ad Issues",
      category: "Collectibles",
      blockchain: "Tezos",
      bid: 5.13,
      views: 4570,
      auction: false,
      image: "/tracking on the go.png",
    },
    {
      name: "Science Jobs",
      category: "Photography",
      blockchain: "Ethereum",
      bid: 3.59,
      views: 4310,
      auction: false,
      image: "/personNFT.png",
    },
    {
      name: "Capturing Memories",
      category: "Collectibles",
      blockchain: "Flow",
      bid: 0.45,
      views: 3905,
      auction: true,
      image: "/behind.png",
    },
    {
      name: "Tracking on the Go",
      category: "Art",
      blockchain: "Tezos",
      bid: 3.4,
      views: 3570,
      auction: false,
      image: "/tracking on the go.png",
    },
  ]);

  const [nftData, setNftData] = useState<NftData[]>([]);

  useEffect(() => {
    async function fetchData() {
      const json = await getNFTData();
      setNftData(json);
    }
    fetchData();
  }, []);

  useEffect(() => {
    //don't run until it's loaded
    if (!Array.isArray(nftData)) return;

    //maps array of nft metadata to
    nftData.map((nft, index) =>
      setYourListings((prev) => [
        ...prev,
        {
          name: nft.name,
          category: "Art",
          blockchain: "Solana",
          bid: Number(nft.price),
          views: 0,
          auction: false,
          image: nft.image,
        },
      ]),
    );
  }, [nftData]);

  return (
    <>
      <MainHeader />
      <MainSideBar sidebarNumber={MainPageToLoad.YourListings} />
      <div className="listings-content">
        <h1>Your Listings</h1>
        {yourListings.length === 0 ? (
          <Empty
            emptyHeader="No posted listings found"
            buttonText="Post your first NFT"
            navigationLink="/"
          />
        ) : (
          <ListingsListV1 listingList={yourListings} />
        )}
      </div>
      <MainFooter />
    </>
  );
};

export default YourListings;
