import React, { useState } from "react";
import CalendarIcon from "../../../../assets/img/NPS Dashboard/calendar.svg";
import LocationIcon from "../../../../assets/img/NPS Dashboard/Location.svg";
import ExportIcon from "../../../../assets/img/NPS Dashboard/Export.svg";
import DatePicker from "./DatePicker";
import { useRecoilState } from "recoil";
import DateFilterStatus from "../../../../recoil/atoms/DateFilterStatusAtom";
import CustomCalendar from "./CustomCalendar";
import startDateValue from "../../../../recoil/atoms/StartDateAtom";
import startMonthValue from "../../../../recoil/atoms/StartMonthAtom";
import endDateValue from "../../../../recoil/atoms/EndDateAtom";
import endMonthValue from "../../../../recoil/atoms/EndMonth";
import CustomCalendar2 from "./CustomCalendar2";
import CustomCalendar3 from "./CustomCalendar3";
import Region from "./Region";
import goButtonStatus from "../../../../recoil/atoms/goButtonStatus";
import sendData from "../../../../recoil/atoms/sendDatesValueAtom";
import regionStatus from "../../../../recoil/atoms/regionStatus";
import ClinicFilter from "./ClinicFilter";
import newRegionGlobalValue from "../../../../recoil/atoms/newRegionGlobalValue";
import ClinicValue from "../../../../recoil/atoms/ClinicValue";
import callClinics from "../../../../recoil/atoms/callClinics";
import activeFilterButton from "../../../../recoil/atoms/activeFilterButton";
import Region2 from "./Region2";
import ClinicFilter2 from "./ClinicFilter2";

const Filter = () => {
  const [goStatus, setGoStatus] = useRecoilState(goButtonStatus);

  //   Global variables
  const monthList = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [datePickerStatus, setDatePickerStatus] =
    useRecoilState(DateFilterStatus);
  const [finalStartDate, setFinalStartDate] = useRecoilState(startDateValue);
  const [finalStartMonth, setFinalStartMonth] = useRecoilState(startMonthValue);
  const [finalEndDate, setFinalEndDate] = useRecoilState(endDateValue);
  const [finalEndMonth, setFinalEndMonth] = useRecoilState(endMonthValue);

  const [sendDataStatus, setSendDataStatus] = useRecoilState(sendData);
  const [callRegion, setCallRegion] = useRecoilState(regionStatus);
  const [callClinicValue, setCallClinicValue] = useRecoilState(callClinics);

  const [newRegionGlobal, setNewRegionGlobal] =
    useRecoilState(newRegionGlobalValue);

  const [selectedClinicValue, setSelectedClinicValue] =
    useRecoilState(ClinicValue);

  const [filterButtonStatus, setFilterButtonStatus] =
    useRecoilState(activeFilterButton);

  return (
    <div className="flex justify-between items-center  relative   ">
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2  w-full ">
        {/* Calendar */}
        <div className="flex items-center gap-5 w-full ">
          <div
            onClick={() => {
              setDatePickerStatus(!datePickerStatus);
              setCallRegion(false);
            }}
            className="  p-1 bg-white px-2 rounded-lg flex justify-center items-center cursor-pointer w-full border"
          >
            <img src={CalendarIcon} alt="date selector" />
            <span className="text-[10px] sm:text-[12px] text-[#000C08] ml-[8px] opacity-70 p-1">
              {monthList[finalStartMonth - 1] +
                "  " +
                finalStartDate +
                " - " +
                monthList[finalEndMonth - 1] +
                "  " +
                finalEndDate}
            </span>
          </div>

          <div
            className={`absolute  top-[100%] left-0 z-[150] cursor-default ${
              datePickerStatus ? "block" : "hidden"
            }`}
          >
            {/* <DatePicker /> */}
            {/* <CustomCalendar /> */}
            {/* <CustomCalendar2 /> */}
            <CustomCalendar3 />
          </div>

          {/* <div className="p-2 bg-white px-2 rounded-lg flex justify-center items-center cursor-pointer">
          <img src={LocationIcon} alt="date selector" />
          <span className="text-[10px] sm:text-[12px] text-[#000C08] ml-[8px] opacity-70">
            Region
          </span>
        </div> */}
        </div>

        {/* <Region /> */}
        <Region2 />

        {/* <ClinicFilter /> */}
        <ClinicFilter2 />
      </div>

      <div className="hidden">
        <div className=" p-2 bg-white px-2 rounded-lg flex justify-center items-center cursor-pointer">
          <img src={ExportIcon} alt="date selector" />
          <span className="text-[10px] sm:text-[12px] text-[#000C08] ml-[8px] opacity-70">
            Export
          </span>
        </div>
      </div>
    </div>
  );
};

export default Filter;
