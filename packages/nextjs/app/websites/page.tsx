"use client";

import Link from "next/link";

const WebsiteCard = ({ name, url, imgSrc }) => {
  return (
    <Link
      href={`/ads/${url}`}
      className="flex flex-row justify-between items-center w-[400px] h-[120px] border-2 border-white rounded p-4 m-4 hover:bg-custom-gradient hover:text-black transition-all duration-700 ease-in-out"
    >
      <img className="max-w-[80px] max-h-[80px]" src={imgSrc} />
      <div className="text-center">
        <span className="text-xl">{name} & </span>
        <span className="text-sm">{url}</span>
      </div>
    </Link>
  );
};

const Websites = () => {
  const websiteList = [
    {
      name: "Scroll",
      url: "scroll.io",
      imgSrc:
        "https://media.licdn.com/dms/image/D4E0BAQF6gMSNL5xYCA/company-logo_200_200/0/1692892037062/scroll_io_logo?e=2147483647&v=beta&t=H0sTCb5XBPUvt7yKUD65kYY2qN9L5dd0udOMu48PkKk",
    },
    {
      name: "Fhenix",
      url: "www.docs.fhenix.zone",
      imgSrc:
        "https://media.licdn.com/dms/image/D4D0BAQFtUjFKqv_DJA/company-logo_200_200/0/1695715998703/fhenix_logo?e=2147483647&v=beta&t=U2cvAqKuWeEqE5Cb4HgyuBmVTUcBuZvsDi0JdivU3nw",
    },
    {
      name: "GraphQL",
      url: "graphql.org",
      imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/1200px-GraphQL_Logo.svg.png",
    },
    {
      name: "Metamask",
      url: "metamask.io",
      imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png",
    },
    {
      name: "Zircuit",
      url: "stake.zircuit.com/",
      imgSrc:
        "https://dailyhodl.com/wp-content/uploads/2023/11/UPSCALED-Zircuit-Industry-Announcement-Featured-Image-Template.jpg",
    },
    {
      name: "Dynamics",
      url: "docs.dynamic.xyz",
      imgSrc:
        "https://assets-global.website-files.com/626692727bba3f384e008e8a/6499b49f1897ac582cef7cb0_logo-dynamic.png",
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
