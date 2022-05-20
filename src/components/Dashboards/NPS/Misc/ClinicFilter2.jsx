import React, { useEffect, useState } from "react";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";
import seachIcon from "../../../../assets/img/global-img/searchIcon.svg";
import clinicsApiData from "../../../../recoil/atoms/clinicsApiData";
import ClinicValue from "../../../../recoil/atoms/ClinicValue";
import { useRecoilState } from "recoil";
import activeFilterButton from "../../../../recoil/atoms/activeFilterButton";
import regionStatus from "../../../../recoil/atoms/regionStatus";
import ClinicFilterAPiData from "../../../../recoil/atoms/ClinicFilterAPiData";

const ClinicFilter2 = () => {
  const [clinicsAPIdataValue, setClinicAPIDataValue] =
    useRecoilState(ClinicFilterAPiData);
  const [selectedClinicValue, setSelectedClinicValue] =
    useRecoilState(ClinicValue);
  const [clinicStatusLocal, setClinicStatusoLocal] = useState(false);
  const [inputData, setInputData] = useState("");

  const [filterButtonStatus, setFilterButtonStatus] =
    useRecoilState(activeFilterButton);

  const [clinicLocal, setClinicLocal] = useState([]);

  const [callRegion, setCallRegion] = useRecoilState(regionStatus);

  const handleInput = (e) => {
    setInputData(e.target.value);
  };

  useEffect(() => {
    // console.log("clinicLocal");
    // console.log(clinicLocal);

    const text = clinicLocal.join("-");

    setSelectedClinicValue(text);

    // console.log("selectedClinicValue ....................................");
    // console.log(selectedClinicValue);
  }, [clinicLocal, selectedClinicValue]);

  function arrayRemove(arr, value) {
    return arr.filter(function (geek) {
      return geek != value;
    });
  }

  return (
    <div className="relative">
      <div
        className=" cursor-pointer opacity-100 p-1 bg-white px-2 rounded-lg flex justify-center items-center  border"
        onClick={() => {
          setClinicStatusoLocal(!clinicStatusLocal);
          setCallRegion(false);
        }}
      >
        <MedicationOutlinedIcon className="text-green-500" fontSize="small" />
        <span className="text-[10px] sm:text-[12px] text-[#000C08] ml-[8px] opacity-70 p-1 ">
          Health Centers
        </span>
      </div>

      {/* list items */}
      <div
        className={` ${
          clinicStatusLocal ? "block ease-in" : "hidden ease-out"
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
                  {clinicsAPIdataValue?.clinic
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
                          checked={clinicLocal?.includes(data) ? true : false}
                          onChange={() => {
                            if (clinicLocal?.includes(data)) {
                              console.log(data + " already exits");
                              setClinicLocal((clinicLocal) =>
                                arrayRemove(clinicLocal, data)
                              );
                            } else {
                              setClinicLocal((clinicLocal) => [
                                ...clinicLocal,
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
                              if (clinicLocal?.includes(data)) {
                                console.log(data + " already exits");
                                setClinicLocal((clinicLocal) =>
                                  arrayRemove(clinicLocal, data)
                                );
                              } else {
                                setClinicLocal((clinicLocal) => [
                                  ...clinicLocal,
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
                      setClinicLocal(clinicsAPIdataValue?.clinic);
                    }
                  }}
                >
                  Select All
                </div>

                <div
                  className="underline text-gray-500 text-[11px] cursor-pointer active:text-[#00ac69]"
                  onClick={() => {
                    setClinicLocal([]);
                  }}
                >
                  Clear
                </div>
              </div>
              <div
                className="p-1 rounded-lg bg-[#00ac69] text-white w-[100px] text-center  active:scale-95 transition-all cursor-pointer"
                onClick={() => {
                  setClinicStatusoLocal(!clinicStatusLocal);
                  setFilterButtonStatus(true);
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

export default ClinicFilter2;
