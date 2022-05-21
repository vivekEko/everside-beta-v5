import React, { useEffect, useState } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import seachIcon from "../../../../assets/img/global-img/searchIcon.svg";
import regionList from "../../../../recoil/atoms/regionList";
import { useRecoilState } from "recoil";
import regionSelectedValue from "../../../../recoil/atoms/regionSelectedValue";
import startDateValue from "../../../../recoil/atoms/StartDateAtom";
import startMonthValue from "../../../../recoil/atoms/StartMonthAtom";
import endDateValue from "../../../../recoil/atoms/EndDateAtom";
import endMonthValue from "../../../../recoil/atoms/EndMonth";
import { BASE_API_LINK } from "../../../../utils/BaseAPILink";
import clinicsApiData from "../../../../recoil/atoms/clinicsApiData";
import axios from "axios";
import regionStatus from "../../../../recoil/atoms/regionStatus";
import sendData from "../../../../recoil/atoms/sendDatesValueAtom";
import goButtonStatus from "../../../../recoil/atoms/goButtonStatus";
import newRegionGlobalValue from "../../../../recoil/atoms/newRegionGlobalValue";
import ClinicFilterAPiData from "../../../../recoil/atoms/ClinicFilterAPiData";
import flushClinic from "../../../../recoil/atoms/flushClinic";
import flushRegion from "../../../../recoil/atoms/flushRegion";

const Region2 = () => {
  const [newRegionGlobal, setNewRegionGlobal] =
    useRecoilState(newRegionGlobalValue);
  const [regionListValue, setRegionListValue] = useRecoilState(regionList);

  const [regionShowStatus, setRegionShowStatus] = useState(false);
  const [inputData, setInputData] = useState("");
  const [regionLocal, setRegionLocal] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [regionValue, setRegionValue] = useRecoilState(regionSelectedValue);
  const [callRegion, setCallRegion] = useRecoilState(regionStatus);
  const [sendDataStatus, setSendDataStatus] = useRecoilState(sendData);
  const [goStatus, setGoStatus] = useRecoilState(goButtonStatus);
  const [flushClinicStatus, setFlushClinicStatus] = useRecoilState(flushClinic);

  const handleInput = (e) => {
    setInputData(e.target.value);
  };

  const [regionCheckLogic, setRegionCheckLogic] = useState([]);

  const [flushRegionValue, setFlushRegionvalue] = useRecoilState(flushRegion);

  useEffect(() => {
    console.log("regionListValue");
    console.log(regionListValue);
  }, [regionListValue]);

  // function to remove selected text from array
  function arrayRemove(arr, value) {
    return arr.filter(function (geek) {
      return geek != value;
    });
  }

  useEffect(() => {
    console.log("regionLocal:");
    console.log(regionLocal);
  }, [regionLocal]);

  useEffect(() => {
    console.log("regionCheckLogic");
    console.log(regionCheckLogic);
  }, [regionCheckLogic]);

  //   useEffect(() => {
  //    (data) => {
  //     setRegionCheckLogic((regionCheckLogic) => [ {
  //         "regionName" :  data,
  //         "regionChecked": "FALSE"
  //     }])
  //    }

  //   }, [third])
  const [runClinicAPI, setRunClinicAPI] = useState(true);
  const [regionStatusLocal, setRegionStatusoLocal] = useState(false);

  const [finalStartDate, setFinalStartDate] = useRecoilState(startDateValue);
  const [finalStartMonth, setFinalStartMonth] = useRecoilState(startMonthValue);
  const [finalEndDate, setFinalEndDate] = useRecoilState(endDateValue);
  const [finalEndMonth, setFinalEndMonth] = useRecoilState(endMonthValue);

  const [clinicsAPIdataValue, setClinicAPIDataValue] =
    useRecoilState(ClinicFilterAPiData);
  const [baseAPI, setBaseAPI] = useState(BASE_API_LINK);

  useEffect(async () => {
    const text = regionLocal.join("-");

    setRegionValue(text);

    // setNewRegionGlobal(text);

    // Clinic
    if (runClinicAPI === true) {
      const clinicData = await axios.get(
        baseAPI +
          "filterClinic?start_month=" +
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
      console.log(
        "clinic////////////////////////////////////////////////////////"
      );
      console.log(clinicData);
    }
  }, [runClinicAPI]);

  useEffect(() => {
    if (flushRegionValue === true) {
      setRegionLocal([]);
    }

    console.log("ghhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    console.log(flushRegionValue);
  }, [flushRegionValue]);

  return (
    <div className="relative">
      <div
        className=" cursor-pointer opacity-100 p-1 bg-white px-2 rounded-lg flex justify-center items-center  border"
        onClick={() => {
          setRegionShowStatus(!regionShowStatus);
          setCallRegion(false);
          setRunClinicAPI(false);
          setFlushRegionvalue(false);
        }}
      >
        <LocationOnOutlinedIcon className="text-green-500" fontSize="small" />
        <span className="text-[10px] sm:text-[12px] text-[#000C08] ml-[8px] opacity-70 p-1 ">
          Region
        </span>

        <div
          className={`text-xs ml-2 rounded-full bg-[#00ac69] bg-opacity-80 text-white font-semibold w-[25px] h-[25px] flex justify-center items-center  ${
            regionLocal?.length > 0 ? "block" : "hidden"
          } `}
        >
          {regionLocal?.length}
        </div>
      </div>

      {/* list items */}
      <div
        className={` ${
          regionShowStatus ? "block ease-in" : "hidden ease-out"
        } absolute top-[110%] bg-white shadow-lg h-[230px] w-full rounded-lg transition-all p-2 `}
      >
        <div className="h-full">
          {/* fetched list */}
          <div className="relative  h-full">
            <div className="h-full  overflow-scroll scrollbar-hide">
              {/* search */}
              <div className=" bg-white h-[30px] sticky top-0 z-[45]">
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

              {/* List */}
              <div className="pl-2 pt-2 relative  pb-14">
                <div>
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
                      <div key={index + 1}>
                        <input
                          type="checkbox"
                          name={data}
                          value={data}
                          checked={regionLocal?.includes(data) ? true : false}
                          onChange={() => {
                            if (regionLocal?.includes(data)) {
                              console.log(data + " already exits");
                              setRegionLocal((regionLocal) =>
                                arrayRemove(regionLocal, data)
                              );
                            } else {
                              setRegionLocal((regionLocal) => [
                                ...regionLocal,
                                data,
                              ]);
                            }
                          }}
                        />

                        <label
                          htmlFor={data}
                          className="text-sm ml-5"
                          onClick={() => {
                            {
                              if (regionLocal?.includes(data)) {
                                console.log(data + " already exits");
                                setRegionLocal((regionLocal) =>
                                  arrayRemove(regionLocal, data)
                                );
                              } else {
                                setRegionLocal((regionLocal) => [
                                  ...regionLocal,
                                  data,
                                ]);
                              }
                            }
                          }}
                        >
                          {" "}
                          {data}{" "}
                        </label>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Submit btn */}
            <div className="bg-white pt-1 absolute bottom-0 right-0 left-0 flex justify-between items-center  pl-2">
              <div className="flex justify-start items-center gap-2  ">
                <div
                  className="underline text-gray-500 text-[11px] cursor-pointer active:text-[#00ac69]"
                  onClick={() => {
                    {
                      setRegionLocal(regionListValue?.region);
                    }
                  }}
                >
                  Select All
                </div>

                <div
                  className="underline text-gray-500 text-[11px] cursor-pointer active:text-[#00ac69]"
                  onClick={() => {
                    setRegionLocal([]);
                    setAllChecked(false);
                  }}
                >
                  Clear
                </div>
              </div>
              <div
                className="p-1 rounded-lg bg-[#00ac69] text-white w-[100px] text-center  active:scale-95 transition-all cursor-pointer"
                onClick={() => {
                  setRegionShowStatus(!regionShowStatus);
                  setRunClinicAPI(true);
                  setSendDataStatus(true);
                  setGoStatus(!goStatus);
                  setNewRegionGlobal(regionLocal);
                  setFlushClinicStatus(true);
                }}
              >
                Submit
              </div>
            </div>
          </div>

          {/* selected list */}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Region2;
