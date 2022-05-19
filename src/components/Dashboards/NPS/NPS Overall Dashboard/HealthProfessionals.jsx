import React from "react";
import doctorIcon from "../../../../assets/img/NPS Dashboard/DoctorIcon.svg";
import docData from "../../../../mock_API/NPS/NPS Main Dashboard/HealthProfessional.json";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

const HealthProfessionals = () => {
  return (
    <div className="p-5 rounded-lg bg-white transition-all w-[100%]  h-[300px] border">
      <h1 className="  font-bold  opacity-80">
        Providers
        <span className="text-[12px] opacity-70 ml-5">(ILLUSTRATIVE)</span>
      </h1>
      <div className="text-xs text-gray-400 border-b-2 border-b-gray-100 flex justify-end px-2 pb-2">
        <div className="flex items-center gap-10">
          <span> NPS</span>
          <span>Rating</span>
        </div>
      </div>
      <div className=" h-[85%] overflow-y-scroll scrollbar-hide   ">
        <div className="">
          {docData.map((data) => {
            return (
              <div
                key={data.id}
                className="flex justify-between items-center my-4"
              >
                <div className="flex gap-5 items-center">
                  {/* <img
                    src={doctorIcon}
                    alt={data.doc_name}
                    className="w-[40px] rounded-full"
                  /> */}
                  <div className="w-[40px] h-[40px] rounded-full bg-[#e6f5fc] flex justify-center items-center text-[#0094e0] uppercase font-semibold">
                    {data?.doc_type}
                  </div>
                  <div>
                    <div className="text-sm">{data.doc_name}</div>
                    <div className="text-gray-500 text-xs">
                      {data.designation}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-10">
                  <div className="text-gray-500 text-xs">{data.avg_nps}</div>

                  <div className="text-sm">
                    <StarRoundedIcon
                      fontSize="small"
                      className="mr-1 text-[#F6CB09]"
                    />
                    <span className="text-gray-500 text-xs">{data.rating}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HealthProfessionals;
