"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";

const AdCard = props => {
  const { name, description } = props;
  return (
    <div className="w-[400px] h-auto text-center border-dashed border-2 rounded-lg p-4 m-4 absolute bottom-8 left-8">
      <h1 className="text-2xl">{name}</h1>
      <span className="text-md">{description}</span>
      <div className="absolute left-0 top-0 m-4 border-2 w-[50px] h-[24px] rounded text-center text-sm">Ad</div>
    </div>
  );
};
const Ads = ({ params }: { params: { link: string } }) => {
  const searchParams = useSearchParams();
  const encodedLink = params.link;
  const [decodedLink, setDecodedLink] = useState<string | null>(null);

  useEffect(() => {
    if (encodedLink) {
      const fullLink = decodeURIComponent(encodedLink);
      const fullUrl = `${fullLink}${searchParams ? `?${searchParams.toString()}` : ""}`.replaceAll(",", "/");
      setDecodedLink(fullUrl);
    }
  }, [encodedLink, searchParams]);

  if (!decodedLink) {
    return <div>...Loading</div>;
  }
  const adList = [
    {
      name: "Yıldırım Sekerleme",
      description:
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis",
    },
    {
      name: "Yıldırım Sekerleme",
      description:
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiisAt vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiisAt vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis",
    },
  ];
  return (
    <div className="flex flex-col items-center h-screen gap-0 py-12 w-full">
      <div className="flex flex-col items-center justify-center w-full relative">
        <AdCard name={adList[0].name} description={adList[0].description} />
        <div className="w-full">
          <iframe
            src={`https://${decodedLink}`}
            width="100%"
            height="1000px"
            style={{ border: "none" }}
            title={"site"}
          />
        </div>
      </div>
    </div>
  );
};

export default Ads;
