import React, { useEffect, useState } from "react";
import Cross from "../../../../assets/img/global-img/cross.svg";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { monthnameList } from "../../../../utils/MonthNames";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import DateFilterStatus from "../../../../recoil/atoms/DateFilterStatusAtom";
import { useRecoilState } from "recoil";
import startDateValue from "../../../../recoil/atoms/StartDateAtom";
import startMonthValue from "../../../../recoil/atoms/StartMonthAtom";
import endDateValue from "../../../../recoil/atoms/EndDateAtom";
import endMonthValue from "../../../../recoil/atoms/EndMonth";

const YearSlider = styled(Slider)({
  color: "#52af77",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const CustomCalendar4 = () => {
  const [val, setVal] = useState([2014, 2022]);
  const [startMonthVal, setStartMonthVal] = useState("Jan");
  const [startMonthNumVal, setStartMonthNumVal] = useState("1");
  const [endMonthVal, setEndMonthVal] = useState("Dec");
  const [endMonthNumVal, setEndMonthNumVal] = useState("12");

  const [datePickerStatus, setDatePickerStatus] =
    useRecoilState(DateFilterStatus);
  const [finalStartDate, setFinalStartDate] = useRecoilState(startDateValue);
  const [finalStartMonth, setFinalStartMonth] = useRecoilState(startMonthValue);
  const [finalEndDate, setFinalEndDate] = useRecoilState(endDateValue);
  const [finalEndMonth, setFinalEndMonth] = useRecoilState(endMonthValue);

  useEffect(() => {
    setFinalStartDate(val[0]);
    setFinalEndDate(val[1]);
  }, [val]);

  useEffect(() => {
    setFinalStartMonth(1);
    setFinalEndMonth(12);
  }, []);

  const updateVal = (e, item) => {
    setVal(item);
  };

  return (
    <div className="bg-white p-5 rounded-lg  shadow-2xl mt-4 w-[100%] min-w-[300px] ">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-[18px] opacity-80 ">Select Date</h1>
        <img
          src={Cross}
          alt=""
          className="opacity-80 cursor-pointer transition-all active:scale-90"
          onClick={() => {
            setDatePickerStatus(!datePickerStatus);
          }}
        />
      </div>

      {/* main container */}
      <div>
        {/* date slider  */}
        <div>
          {/* displayed date */}
          <div className="relative ">
            <div className="flex justify-center items-center gap-2 text-sm p-3 rounded-lg bg-green-50 ">
              <h1 className="text-lg opacity-80 font-semibold">
                <span>{startMonthVal}</span> <span>{val[0]}</span>
              </h1>
              <h1 className="text-lg opacity-80 font-semibold">-</h1>
              <h1 className="text-lg opacity-80 font-semibold">
                <span>{endMonthVal}</span> <span>{val[1]}</span>
              </h1>
            </div>
            <div className=" bg-green-50 w-[20px] h-[20px] rotate-45 mx-auto mt-[-10px] "></div>
          </div>

          {/* slider */}

          <div className="  w-[90%] mx-auto ">
            <YearSlider
              value={val}
              min={2014}
              max={2022}
              onChange={updateVal}
              valueLabelDisplay="auto"
            />
          </div>

          {/* Month  list */}
          <div className="flex justify-between items-center gap-2 ">
            {/*start  month */}
            <div className="flex-1">
              <div className="text-center w-full opacity-80">Start Month</div>

              <div className="grid grid-cols-3   place-items-center ">
                {monthnameList?.map((monthName) => (
                  <div
                    key={monthName?.id}
                    className={`h-[45px] w-[45px] flex justify-center items-center  text-center rounded-full hover:bg-green-100 cursor-pointer 
                  ${startMonthVal === monthName?.month ? "bg-green-100" : ""}

                
                  `}
                    onClick={() => {
                      setStartMonthVal(monthName?.month);
                      setStartMonthNumVal(monthName?.id);
                      setFinalStartMonth(monthName?.id);
                    }}
                  >
                    {monthName?.month}
                  </div>
                ))}
              </div>
            </div>

            <ArrowForwardIosRoundedIcon
              fontSize="small"
              className="opacity-70 mt-8"
            />

            {/*end  month */}
            <div className="flex-1">
              <div className="text-center opacity-80">End Month</div>
              <div className="grid grid-cols-3   place-items-center flex-1 ">
                {monthnameList?.map((monthName) => (
                  <div
                    key={monthName?.id}
                    className={`h-[45px] w-[45px] flex justify-center items-center  text-center rounded-full hover:bg-green-100 cursor-pointer 
                  ${endMonthVal === monthName?.month ? "bg-green-100" : ""}
                  ${
                    finalStartDate === finalEndDate &&
                    monthName.id <= finalStartMonth
                      ? "cursor-not-allowed text-gray-500"
                      : ""
                  }
                
                  `}
                    onClick={() => {
                      setEndMonthVal(monthName?.month);
                      setEndMonthNumVal(monthName?.id);
                      setFinalEndMonth(monthName?.id);
                    }}
                  >
                    {monthName?.month}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar4;
