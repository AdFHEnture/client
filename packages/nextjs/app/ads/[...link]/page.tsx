"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
import { getAdByAdId } from "~~/api";

const AdCard = (props: { imageUrl: string; websiteUrl: string }) => {
  const { imageUrl, websiteUrl } = props;
  return (
    <a
      className="w-[400px] h-[90px] text-center rounded-lg p-2 m-2 absolute bottom-4 left-4 shadow-xl"
      href={websiteUrl}
      target="_blank"
      rel="noreferrer"
    >
      <div
        className={`absolute inset-0 rounded-lg bg-cover bg-center opacity-100`}
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="absolute inset-0 rounded-lg bg-black opacity-30"></div>
      <div className="relative z-10">
        {/* <h1 className="text-2xl text-white">{imageUrl}</h1> */}
        {/* <span className="text-md text-white">{websiteUrl}</span> */}
        <div className="absolute left-0 top-0 border w-[36px] h-[20px] rounded text-center text-xs text-white">Ad</div>
      </div>
    </a>
  );
};

const Ads = ({ params }: { params: { link: string } }) => {
  const searchParams = useSearchParams();
  const encodedLink = params.link;
  const [decodedLink, setDecodedLink] = useState<string | null>(null);
  const [ad, setAd] = useState<{ imageUrl: string; websiteUrl: string } | null>(null);

  useEffect(() => {
    if (encodedLink) {
      const fullLink = decodeURIComponent(encodedLink);
      const fullUrl = `${fullLink}${searchParams ? `?${searchParams.toString()}` : ""}`.replaceAll(",", "/");
      setDecodedLink(fullUrl);
    }
  }, [encodedLink, searchParams]);

  useEffect(() => {
    // Replace this with actual API call
    getAdByAdId("2").then(ad => {
      setAd(ad);
    });
  }, []);

  if (!decodedLink) {
    return <div>...Loading</div>;
  }

  return (
    <div className="flex flex-col items-center h-screen gap-0 py-12 w-full">
      <div className="flex flex-col items-center justify-center w-full relative">
        {ad && <AdCard imageUrl={ad.imageUrl} websiteUrl={ad.websiteUrl || ""} />}
        <div className="w-full">
          <iframe
            src={`https://${decodedLink}`}
            width="100%"
            height="750px"
            style={{ border: "none" }}
            title={"site"}
          />
        </div>
      </div>
    </div>
  );
};

export default Ads;
