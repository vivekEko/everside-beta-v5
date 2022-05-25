import React from "react";
import Cross from "../../../../assets/img/global-img/cross.svg";

const CustomCalendar4 = () => {
  return (
    <div className="bg-white p-5 rounded-lg  shadow-2xl mt-4 ">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-[18px] opacity-80 ">Select Date</h1>
        <img
          src={Cross}
          alt=""
          className="opacity-80 cursor-pointer transition-all active:scale-90"
          onClick={() => {
            // setDatePickerStatus(!datePickerStatus);
            // setStartOrEnd(true);
          }}
        />
      </div>

      {/* main container */}
      <div>
        {/* date slider  */}
        <div>
          {/* displayed date */}
          <div className="relative ">
            <div className="flex justify-center items-center gap-2 text-sm p-3 rounded-lg bg-green-100 ">
              <h1>May 2014</h1>
              <h1>-</h1>
              <h1>Jul 2022</h1>
            </div>
            <div className=" bg-green-100 w-[20px] h-[20px] rotate-45 mx-auto mt-[-10px] "></div>
          </div>

          {/* slider */}

          <div className="relative bg-gray-300 w-full rounded-full">
            <input
              type="range"
              name="startDate"
              id="startDate"
              className=" appearance-none w-full h-full "
            />
            <input
              type="range"
              name="endDate"
              id="endDate"
              className="appearance-none w-full h-full  "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar4;
