import React, { useEffect, useState } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import regionStatus from "../../../../recoil/atoms/regionStatus";
import regionList from "../../../../recoil/atoms/regionList";
import { useRecoilState } from "recoil";
import seachIcon from "../../../../assets/img/global-img/searchIcon.svg";
import regionSelectedValue from "../../../../recoil/atoms/regionSelectedValue";
import Cross from "../../../../assets/img/global-img/cross.svg";
import callClinics from "../../../../recoil/atoms/callClinics";
import ClinicValue from "../../../../recoil/atoms/ClinicValue";
import clinicsApiData from "../../../../recoil/atoms/clinicsApiData";
import startDateValue from "../../../../recoil/atoms/StartDateAtom";
import startMonthValue from "../../../../recoil/atoms/StartMonthAtom";
import endDateValue from "../../../../recoil/atoms/EndDateAtom";
import endMonthValue from "../../../../recoil/atoms/EndMonth";
import axios from "axios";

import newRegionGlobalValue from "../../../../recoil/atoms/newRegionGlobalValue";

const Region = () => {
  const [regionStatusLocal, setRegionStatusoLocal] = useState(false);
  const [callRegion, setCallRegion] = useRecoilState(regionStatus);
  const [regionListValue, setRegionListValue] = useRecoilState(regionList);
  const [regionValue, setRegionValue] = useRecoilState(regionSelectedValue);
  const [regionLocal, setRegionLocal] = useState([]);

  const [clinicsAPIdataValue, setClinicAPIDataValue] =
    useRecoilState(clinicsApiData);

  const [selectedClinicValue, setSelectedClinicValue] =
    useRecoilState(ClinicValue);

  const [newRegionGlobal, setNewRegionGlobal] =
    useRecoilState(newRegionGlobalValue);

  const [callClinicValue, setCallClinicValue] = useRecoilState(callClinics);
  const [runClinicAPI, setRunClinicAPI] = useState(false);

  const [inputData, setInputData] = useState("");

  const handleInput = (e) => {
    setInputData(e.target.value);
  };

  const regionArray = [];

  // useEffect(() => {
  //   console.log("regionLocal: ");
  //   console.log(regionLocal);

  //   // console.log("variable region :");
  //   // console.log(regionValue);
  // }, [regionLocal]);

  const [finalStartDate, setFinalStartDate] = useRecoilState(startDateValue);
  const [finalStartMonth, setFinalStartMonth] = useRecoilState(startMonthValue);
  const [finalEndDate, setFinalEndDate] = useRecoilState(endDateValue);
  const [finalEndMonth, setFinalEndMonth] = useRecoilState(endMonthValue);

  useEffect(async () => {
    const text = regionLocal.join("-");

    // console.log("regionLocal");
    // console.log(regionLocal);

    // console.log("text region =================");
    // console.log(text);
    setRegionValue(text);
    // console.log("new region glabal value..................:");
    // console.log(regionValue);

    setNewRegionGlobal(text);

    // console.log("new variable value ;;;;;;;;;;;;;;;;;;");
    // console.log(newRegionGlobal);

    // Clinic
    if (runClinicAPI === true) {
      const clinicData = await axios.get(
        "http://192.168.1.18:8000/filterClinic?start_month=" +
          finalStartMonth +
          "&start_year=" +
          finalStartDate +
          "&end_month=" +
          finalEndMonth +
          "&end_year=" +
          finalEndDate +
          "&region=" +
          text
      );

      setClinicAPIDataValue(clinicData?.data);
    }
  }, [runClinicAPI]);

  return (
    <div className="relative z-50 ">
      <div
        className={` ${
          !callRegion
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer opacity-100"
        } p-1 bg-white px-2 rounded-lg flex justify-center items-center  `}
        onClick={() => {
          if (callRegion === true) {
            setRegionStatusoLocal(!regionStatusLocal);
            setSelectedClinicValue(null);
            setRegionLocal([]);
          }
        }}
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
          <div className=" w-[80%] mx-auto   text-sm py-2  ">
            <div className="flex justify-between items-center gap-2 sticky top-0 bg-white">
              <div className="relative">
                <input
                  type="text"
                  className="outline-none border-0 pl-8 w-full text-xs border-b pb-2"
                  placeholder="Search..."
                  onChange={handleInput}
                  value={inputData}
                />
                <div className="absolute top-0 left-0 w-5">
                  <img src={seachIcon} alt="" />
                </div>
              </div>
            </div>

            {regionListValue?.region
              ?.filter((filtered_value) => {
                if (inputData === "") {
                  return filtered_value;
                } else if (
                  filtered_value
                    ?.toLowerCase()
                    ?.includes(inputData.toLowerCase())
                ) {
                  return filtered_value;
                }
              })
              .map((data, index) => (
                <div
                  key={index}
                  className="text-xs text-gray-500 p-2 pl-5  my-1 hover:text-[#00ac69] transition cursor-pointer flex items-center gap-5"
                  onClick={() => {
                    regionArray.push(data);
                    setRegionLocal((regionLocal) => [...regionLocal, data]);

                    setRegionStatusoLocal(!regionStatusLocal);
                    setRunClinicAPI(true);
                    setCallClinicValue(true);
                  }}
                >
                  {/* <span className="text-gray-500">{index + 1}</span>{" "} */}
                  <span className="font-semibold">{data}</span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Region;
