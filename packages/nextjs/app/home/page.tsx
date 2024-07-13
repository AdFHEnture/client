"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "../../components/assets/logo.svg";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slider from "@mui/material/Slider";
import "react-datepicker/dist/react-datepicker.css";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useAccount } from "wagmi";
import externalContracts from "~~/contracts/externalContracts";

interface CheckboxOption {
  name: string;
  value: string;
}

const Home = () => {
  const { chain } = useAccount();
  const { data: hash, error, writeContract } = useWriteContract();
  const [adName, setAdName] = useState("");
  const [description, setDescription] = useState("");
  const [userType, setUserType] = useState("advertiser");
  const [week, setWeek] = useState(1);

  const handleToggle = (type: string) => {
    setUserType(type);
    refreshParameters();
  };

  const refreshParameters = () => {
    setAdName("");
    setDescription("");
    setWeek(1);
    setSelectedCheckboxesAdvertiser([]);
    setSelectedCheckboxesUser([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleSubmitCreateProfile = () => {
    console.log(selectedCheckboxesUser);
    console.log(chain);
    if (!chain || !chain.id) {
      return;
    }

    const contract = externalContracts[8008135].AdMatcher;
    writeContract({
      address: contract.address,
      functionName: "addUserVector",
      args: [selectedCheckboxesUser],
      abi: contract.abi,
    });
  };

  const handleSubmitAdvertiser = () => {
    if (!chain || !chain.id) {
      return;
    }

    const contract = externalContracts[534351].AdContract;

    try {
      writeContract({
        address: contract.address,
        functionName: "createAd",
        args: [
          adName,
          description,
          BigInt(week),
          BigInt(0),
          selectedCheckboxesAdvertiser as [boolean, boolean, boolean, boolean, boolean],
        ],
        abi: contract.abi,
      });
      console.log("Ad created successfully");
    } catch (error) {
      console.error("Error creating ad:", error);
    }
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const checkboxOptions: CheckboxOption[] = [
    { name: "option1", value: "Option 1" },
    { name: "option2", value: "Option 2" },
    { name: "option3", value: "Option 3" },
    { name: "option4", value: "Option 4" },
    { name: "option5", value: "Option 5" },
  ];

  const [selectedCheckboxesAdvertiser, setSelectedCheckboxesAdvertiser] = useState<boolean[]>(
    new Array(checkboxOptions.length).fill(false),
  );

  const [selectedCheckboxesUser, setSelectedCheckboxesUser] = useState<boolean[]>(
    new Array(checkboxOptions.length).fill(false),
  );

  const handleCheckboxChangeAdvertiser = (option: CheckboxOption) => {
    const index = checkboxOptions.findIndex(item => item.value === option.value);
    const newCheckboxes = [...selectedCheckboxesAdvertiser];
    newCheckboxes[index] = !newCheckboxes[index];
    setSelectedCheckboxesAdvertiser(newCheckboxes);
  };

  const handleCheckboxChangeUser = (option: CheckboxOption) => {
    const index = checkboxOptions.findIndex(item => item.value === option.value);
    const newCheckboxes = [...selectedCheckboxesUser];
    newCheckboxes[index] = !newCheckboxes[index];
    setSelectedCheckboxesUser(newCheckboxes);
  };

  return (
    <div className="flex flex-col items-center h-screen gap-4 p-12">
      <div className="flex flex-col items-center justify-center">
        <Image priority src={logo} alt="" />
        <h1 className="text-4xl font-bold bg-custom-gradient bg-clip-text text-transparent">AdFHEnture</h1>
        <h2 className="text-xl text-white text-center">
          Neque porro quisquam est qui <br /> dolorem
        </h2>
      </div>
      <div>
        <button
          onClick={() => handleToggle("advertiser")}
          className={`w-[225px] h-[40px] rounded-l-lg transition-all duration-700 ease-in-out ${
            userType === "user" ? "text-white text-xl bg-[#262626]" : "text-black text-xl bg-custom-gradient"
          } `}
        >
          For Advertisers
        </button>
        <button
          onClick={() => handleToggle("user")}
          className={`w-[225px] h-[40px] rounded-r-lg transition-all duration-700 ease-in-out ${
            userType === "advertiser" ? "text-white text-xl bg-[#262626]" : "text-black text-xl bg-custom-gradient"
          } `}
        >
          For Users
        </button>
      </div>
      {userType === "advertiser" ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-3/5 h-full justify-center items-center">
          <div className="flex flex-col w-full h-full justify-center items-center">
            <div className="flex flex-col justify-center  w-1/2 mx-2 h-3/4 rounded p-4 relative">
              <span className="text-2xl text-center my-2">Publish new Ad</span>
              <div className="flex flex-col mb-4">
                <div className="flex items-center border border-gray-300 rounded-lg bg-[#262626] p-2 w-full">
                  <FontAwesomeIcon icon={faUser} className="text-[#6F7482] mr-2" />
                  <input
                    type="text"
                    placeholder="Name"
                    value={adName}
                    onChange={e => setAdName(e.target.value)}
                    className="p-2 bg-[#262626] text-[#6F7482] w-full border-none outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-4">
                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={3}
                  className="p-8 border border-gray-300 rounded-lg bg-[#262626] text-[#6F7482] w-full"
                />
              </div>
              <div className="flex flex-col w-full">
                <div className="w-full flex flex-row justify-between items-center">
                  <span className="text-xl">Expiry Date</span>
                  <span className="text-xl text-center w-20">{week} week</span>
                </div>
                <Slider
                  aria-label="Date"
                  defaultValue={1}
                  onChange={(event: Event, value: number | number[]) => {
                    setWeek(value as number);
                  }}
                  valueLabelDisplay="auto"
                  shiftStep={1}
                  step={1}
                  marks
                  min={0}
                  max={6}
                  sx={{
                    color: "#E7F3C6", // Ana renk
                    "& .MuiSlider-thumb": {
                      backgroundColor: "#262626", // Thumb rengi
                    },
                    "& .MuiSlider-track": {
                      backgroundColor: "#262626", // Track rengi
                    },
                    "& .MuiSlider-rail": {
                      backgroundColor: "#E7F3C6", // Rail rengi
                    },
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-1/2 h-full mx-2 rounded p-2 relative">
              <span className="text-2xl text-center mb-2">Target Audience</span>
              <div className="grid grid-cols-2">
                {checkboxOptions.map((option, index) => (
                  <div key={index} className="flex justify-start items-center rounded-lg px-8 my-2 cursor-pointer">
                    <input
                      type="checkbox"
                      id={`checkbox-${index}`}
                      name={option.name}
                      value={option.value}
                      checked={selectedCheckboxesAdvertiser[index]}
                      onChange={e => {
                        e.stopPropagation();
                        handleCheckboxChangeAdvertiser(option);
                      }}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 accent-[#E7F3C6]"
                    />

                    <label htmlFor={`checkbox-${index}`} className="text-[#6F7482] text-lg pl-4">
                      {option.value}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-[250px] h-[50px] text-black text-xl bg-custom-gradient transition-all duration-300 hover:scale-110"
            onClick={handleSubmitAdvertiser}
          >
            Pay & Submit
          </button>
        </form>
      ) : (
        <div className="flex flex-col justify-center items-center w-full h-full mx-2 rounded p-4 relative">
          <span className="text-4xl text-center mt-4 mb-8">Create Profile</span>
          <div className="grid grid-cols-2 w-1/4">
            {checkboxOptions.map((option, index) => (
              <div key={index} className="flex justify-start items-center rounded-lg pr-6 pl-8 my-2 cursor-pointer">
                <input
                  type="checkbox"
                  id={`checkbox-${index}`}
                  name={option.name}
                  value={option.value}
                  checked={selectedCheckboxesUser[index]}
                  onChange={e => {
                    e.stopPropagation();
                    handleCheckboxChangeUser(option);
                  }}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 accent-[#E7F3C6]"
                />

                <label htmlFor={`checkbox-${index}`} className="text-[#6F7482] text-lg pl-4">
                  {option.value}
                </label>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-[250px] h-[50px] text-black text-xl bg-custom-gradient mt-8 transition-all duration-300 hover:scale-110"
            onClick={handleSubmitCreateProfile}
          >
            Submit
          </button>
          {hash && <div>Transaction Hash: {hash}</div>}
          {isConfirming && <div>Waiting for confirmation...</div>}
          {isConfirmed && <div>Transaction confirmed.</div>}
          {error && <div>Error: {error.message}</div>}
        </div>
      )}
    </div>
  );
};

export default Home;
