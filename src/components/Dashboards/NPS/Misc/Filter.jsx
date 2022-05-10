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

const Filter = () => {
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

  return (
    <div className="flex justify-between items-center gap-5 relative px-1   ">
      <div className="flex items-center gap-5 ">
        <div
          onClick={() => setDatePickerStatus(!datePickerStatus)}
          className="  p-1 bg-white px-2 rounded-lg flex justify-center items-center cursor-pointer"
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
            {/* Jan 2020 - Feb 2021 */}
            {/* Select Date */}
          </span>
        </div>

        <div
          className={`absolute  top-[100%] left-0 z-[150] cursor-default ${
            datePickerStatus ? "block" : "hidden"
          }`}
        >
          {/* <DatePicker /> */}
          {/* <CustomCalendar /> */}
          <CustomCalendar2 />
        </div>

        {/* <div className="p-2 bg-white px-2 rounded-lg flex justify-center items-center cursor-pointer">
          <img src={LocationIcon} alt="date selector" />
          <span className="text-[10px] sm:text-[12px] text-[#000C08] ml-[8px] opacity-70">
            Region
          </span>
        </div> */}
      </div>

      <div className="p-2 bg-white px-2 rounded-lg flex justify-center items-center cursor-pointer">
        <img src={ExportIcon} alt="date selector" />
        <span className="text-[10px] sm:text-[12px] text-[#000C08] ml-[8px] opacity-70">
          Export
        </span>
      </div>
    </div>
  );
};

export default Filter;
