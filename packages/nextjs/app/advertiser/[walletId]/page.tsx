"use client";

import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts";
import "react-datepicker/dist/react-datepicker.css";
import { getAdvertiser } from "~~/api";
import { pieChartData } from "~~/utils/data";

const Advertiser = ({ params }: { params: { walletId: string } }) => {
  const [paidValue, setPaidValue] = useState(100);

  const [interestsData, setInterestsData] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    const fetchAdvertiser = async () => {
      try {
        const advertiserData = await getAdvertiser(params.walletId);
        setInterestsData(advertiserData.interests);
        setPaidValue(advertiserData.totalPaid);
      } catch (err) {
      } finally {
      }
    };

    fetchAdvertiser();
  }, [params.walletId]);

  const returnInterestData = (arr: any[]) => {
    let totalValue = 0;
    arr.forEach(element => {
      totalValue += +element;
    });

    return arr
      .map((data, i) => {
        if (+data > 0) {
          return { id: i, value: ((+data / totalValue) * 100).toFixed(2), label: pieChartData[i] };
        }
      })
      .filter(d => d != null);
  };

  return (
    <div className="flex flex-col items-center h-screen gap-0 py-12 w-full">
      <div className="flex flex-col items-center justify-center w-full relative">
        <h1 className="text-4xl font-bold bg-custom-gradient bg-clip-text text-transparent">ADVERTISER</h1>
        <span className="w-[200px] p-4 m-4 text-white border-white border-2 bg-[#262626] text-center rounded text-2xl">
          Paid: {paidValue}$
        </span>
        <span className="text-white text-3xl text-center">Audience</span>
        <div className="absolute top-60 left-[27%]">
          <PieChart
            series={[
              {
                data: interestsData ? returnInterestData(interestsData) : [],
                innerRadius: 30,
                cornerRadius: 10,
                paddingAngle: 5,
                highlightScope: { faded: "global", highlighted: "item" },
                faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
                arcLabel: item => `${item.label} (${item.value}%)`,
                arcLabelMinAngle: 45,
              },
            ]}
            slotProps={{ legend: { hidden: true } }}
            width={800}
            height={500}
            colors={["#E7F3C6"]}
          />
        </div>
      </div>
    </div>
  );
};

export default Advertiser;
