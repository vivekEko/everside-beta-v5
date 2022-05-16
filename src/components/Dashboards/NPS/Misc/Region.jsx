import React, { useEffect, useState } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import regionStatus from "../../../../recoil/atoms/regionStatus";
import regionList from "../../../../recoil/atoms/regionList";
import { useRecoilState } from "recoil";
import seachIcon from "../../../../assets/img/global-img/searchIcon.svg";
import regionSelectedValue from "../../../../recoil/atoms/regionSelectedValue";

const Region = () => {
  const [regionStatusLocal, setRegionStatusoLocal] = useState(false);
  const [callRegion, setCallRegion] = useRecoilState(regionStatus);
  const [regionListValue, setRegionListValue] = useRecoilState(regionList);
  const [regionValue, setRegionValue] = useRecoilState(regionSelectedValue);

  const [inputData, setInputData] = useState("");

  const handleInput = (e) => {
    setInputData(e.target.value);
  };

  useEffect(() => {
    console.log("regionValue: ");
    console.log(regionValue);
  }, [regionValue]);

  return (
    <div className="relative z-50">
      <div
        className=" p-1 bg-white px-2 rounded-lg flex justify-center items-center cursor-pointer "
        onClick={() => setRegionStatusoLocal(!regionStatusLocal)}
      >
        <LocationOnOutlinedIcon className="text-green-500" fontSize="small" />
        <span className="text-[10px] sm:text-[12px] text-[#000C08] ml-[8px] opacity-70 p-1 ">
          Region
        </span>
      </div>

      <div
        className={` ${
          regionStatusLocal ? "block" : "hidden"
        }  bg-white shadow-xl h-[200px] w-[200px] absolute top-[120%] rounded-lg overflow-y-scroll scrollbar-hide`}
      >
        {!regionListValue?.region && (
          <div className="h-full w-full flex justify-center items-center text-gray-400 text-xs animate-pulse">
            Loading ...
          </div>
        )}

        {regionListValue?.region && (
          <div className=" w-[80%] mx-auto  relative text-sm py-2">
            <input
              type="text"
              className="outline-none border-0 pl-8 w-full text-xs border-b pb-2"
              placeholder="Search..."
              onChange={handleInput}
              value={inputData}
            />
            <div className="absolute top-2 left-0 w-5">
              <img src={seachIcon} alt="" />
            </div>
          </div>
        )}

        {regionListValue?.region
          ?.filter((filtered_value) => {
            if (inputData === "") {
              return filtered_value;
            } else if (
              filtered_value?.toLowerCase()?.includes(inputData.toLowerCase())
            ) {
              return filtered_value;
            }
          })
          .map((data, index) => (
            <div
              key={index}
              className="text-xs text-gray-500 p-2 pl-5  my-1 hover:bg-slate-100 transition cursor-pointer flex items-center gap-5"
              onClick={() => {
                setRegionValue(data);
                setRegionStatusoLocal(!regionStatusLocal);
              }}
            >
              {/* <span className="text-gray-500">{index + 1}</span>{" "} */}
              <span className="font-semibold">{data}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Region;
