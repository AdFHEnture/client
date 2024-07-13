"use client";

import Link from "next/link";

const WebsiteCard = ({ name, url, imgSrc }) => {
  return (
    <Link
      href={`/ads/${url}`}
      className="flex flex-row justify-center items-start w-[400px] h-[150px] border-2 border-white rounded p-4 m-4 hover:scale-110 transition-all duration-700 ease-in-out relative"
    >
      <img className="absolute left-0 top-0 w-full h-full opacity-50" src={imgSrc} />
      <div className="text-center flex flex-col justify-between items-stretch w-full h-full">
        <span className="text-2xl text-white text-bold z-10">{name}</span>
        <span className="text-xl text-white text-bold z-10">{url}</span>
      </div>
    </Link>
  );
};

const Websites = () => {
  const websiteList = [
    {
      name: "Scroll",
      url: "scroll.io",
      imgSrc: "https://mms.businesswire.com/media/20231017097939/en/1916843/23/fulllogo.jpg",
    },
    {
      name: "Fhenix",
      url: "www.docs.fhenix.zone",
      imgSrc: "https://cryptodaily.blob.core.windows.net/space/fhenix%201920%20X%201080.jpg",
    },
    {
      name: "GraphQL",
      url: "graphql.org",
      imgSrc: "https://adapulse.io/wp-content/uploads/2023/11/graphql-image-1.png",
    },
    {
      name: "Metamask",
      url: "metamask.io",
      imgSrc: "https://nftnow.com/wp-content/uploads/2021/10/Metamask-How-To-Asset.png",
    },
    {
      name: "Zircuit",
      url: "stake.zircuit.com/",
      imgSrc: "https://www.blockleaders.io/.image/t_share/MjA0NTY3NDczMzg5ODM5Njc1/image-placeholder-title.jpg",
    },
    {
      name: "Dynamics",
      url: "docs.dynamic.xyz",
      imgSrc: "https://cdn.prod.website-files.com/626692727bba3f384e008e8a/632d74b82fd2862796d5f6a0_logo-dark.svg",
    },
  ];

  return (
    <div className="flex flex-col items-center h-screen gap-0 py-12 w-full">
      <div className="flex flex-col items-center justify-center w-full relative">
        <h1 className="text-4xl font-bold bg-custom-gradient bg-clip-text text-transparent">WEBSITES</h1>
        <div className="grid grid-cols-2 w-full items-center justify-items-center px-16">
          {websiteList.map(site => (
            <WebsiteCard name={site.name} url={site.url} imgSrc={site.imgSrc} key={site.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Websites;
