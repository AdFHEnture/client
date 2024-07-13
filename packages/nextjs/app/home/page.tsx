"use client";

import { useState } from "react";
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

const Page3Page = () => {
  const { chain } = useAccount();
  const { data: hash, error, writeContract } = useWriteContract();
  const [adName, setAdName] = useState("");
  const [description, setDescription] = useState("");
  const [userType, setUserType] = useState("advertiser");
  const [, setWeek] = useState(1);

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

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const [selectedCheckboxesAdvertiser, setSelectedCheckboxesAdvertiser] = useState<string[]>([]);

  const checkboxOptions: CheckboxOption[] = [
    { name: "option1", value: "Option 1" },
    { name: "option2", value: "Option 2" },
    { name: "option3", value: "Option 3" },
    { name: "option4", value: "Option 4" },
    { name: "option5", value: "Option 5" },
    { name: "option6", value: "Option 6" },
    { name: "option4", value: "Option 7" },
    { name: "option5", value: "Option 8" },
    { name: "option6", value: "Option 9" },
    { name: "option6", value: "Option 10" },
  ];

  const [selectedCheckboxesUser, setSelectedCheckboxesUser] = useState<boolean[]>(
    new Array(checkboxOptions.length).fill(false),
  );

  const handleCheckboxChangeAdvertiser = (option: CheckboxOption) => {
    if (selectedCheckboxesAdvertiser.includes(option.value)) {
      setSelectedCheckboxesAdvertiser(selectedCheckboxesAdvertiser.filter(value => value !== option.value));
    } else {
      if (selectedCheckboxesAdvertiser.length < 5) {
        setSelectedCheckboxesAdvertiser([...selectedCheckboxesAdvertiser, option.value]);
      } else {
        alert("You can select a maximum of 5 options.");
      }
    }
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
        <h1 className="text-6xl font-bold bg-gradient-to-r from-white to-[#E7F3C6] bg-clip-text text-transparent">
          AdFHEnture
        </h1>
        <h2 className="text-xl text-white text-center">
          Neque porro quisquam est qui <br /> dolorem
        </h2>
      </div>
      <div>
        <button
          onClick={() => setUserType("advertiser")}
          className={`w-[250px] h-[50px] rounded-l-lg ${
            userType === "user"
              ? "text-white text-xl bg-[#262626]"
              : "text-black text-xl bg-gradient-to-r from-white to-[#E7F3C6]"
          } `}
        >
          For Advertisers
        </button>
        <button
          onClick={() => setUserType("user")}
          className={`w-[250px] h-[50px] rounded-r-lg ${
            userType === "advertiser"
              ? "text-white text-xl bg-[#262626]"
              : "text-black text-xl bg-gradient-to-r from-white to-[#E7F3C6]"
          } `}
        >
          For Users
        </button>
      </div>
      {userType === "advertiser" ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-3/5 h-full justify-center items-center">
          <div className="flex flex-col w-full h-full justify-center items-center">
            <div className="flex flex-col justify-center  w-1/2 mx-2 h-3/4 rounded p-4 relative">
              <span className="text-3xl text-center my-2">Publish new Ad</span>
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
                  rows={4}
                  className="p-8 border border-gray-300 rounded-lg bg-[#262626] text-[#6F7482] w-full"
                />
              </div>
              <div className="flex flex-col w-full">
                Expiry Date
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
                  min={1}
                  max={6}
                />
              </div>
            </div>
            <div className="flex flex-col justify-center w-1/2 h-full mx-2 rounded p-2 relative">
              <span className="text-4xl text-center mb-2">Target Audience</span>
              <div className="grid grid-cols-2">
                {checkboxOptions.map((option, index) => (
                  <div key={index} className="flex justify-center items-center rounded-lg p-2 my-2 cursor-pointer">
                    <input
                      type="checkbox"
                      id={`checkbox-${index}`}
                      name={option.name}
                      value={option.value}
                      checked={selectedCheckboxesAdvertiser.includes(option.value)}
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
            className="w-[250px] h-[50px] text-black text-xl bg-gradient-to-r from-white to-[#E7F3C6]"
          >
            Pay & Submit
          </button>
        </form>
      ) : (
        <div className="flex flex-col justify-center items-center w-full h-full mx-2 rounded p-4 relative">
          <span className="text-4xl text-center mt-4 mb-8">Create Profile</span>
          <div className="grid grid-cols-2 w-1/2">
            {checkboxOptions.map((option, index) => (
              <div key={index} className="flex justify-center items-center rounded-lg p-2 my-2 cursor-pointer">
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
            className="w-[250px] h-[50px] text-black text-xl bg-gradient-to-r from-white to-[#E7F3C6] mt-8"
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

export default Page3Page;
