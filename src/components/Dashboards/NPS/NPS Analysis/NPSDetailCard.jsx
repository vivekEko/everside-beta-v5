import React, { useEffect, useState } from "react";
import RespondantsIcon from "../../../../assets/img/global-img/respondants.svg";
import mockdata from "../../../../mock_API/NPS/NPS Main Dashboard/NPSCard.json";
import { BASE_API_LINK } from "../../../../utils/BaseAPILink";
import LoadingBar from "react-top-loading-bar";

import CountUp from "react-countup";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PuffLoader } from "react-spinners";
import { useRecoilState } from "recoil";
import npsAPIdata from "../../../../recoil/atoms/npsAPIdata";
import PromoterIcon from "../../../../assets/img/NPS Dashboard/greenMan.svg";
import PassiveIcon from "../../../../assets/img/NPS Dashboard/darkGrayMan.svg";
import DetractorIcon from "../../../../assets/img/NPS Dashboard/redMan.svg";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";

const NPSDetailCard = () => {
  const [apiData, setApiData] = useState();
  const [npsApiData, setNpsApiData] = useRecoilState(npsAPIdata);

  useEffect(() => {
    setApiData(npsApiData);
  }, [npsApiData]);

  const [showInfoNps, setShowInfoNps] = useState(false);

  return (
    <div className="p-2 md:p-5 w-full    rounded-lg bg-white flex justify-center md:justify-center items-start relative ">
      {!apiData && (
        <div className="min-h-[240px] bg-[#ffffff] z-[200] rounded-lg flex justify-center items-center">
          <PuffLoader color="#00ac69" size={50} width={100} />
        </div>
      )}

      {apiData && (
        <div className=" w-full  ">
          <div className=" font-bold  flex justify-between gap-2 items-center">
            <div className="font-bold opacity-80 text-[18px] mb-7">
              Net Promoter Score
            </div>
            <div
              className="relative z-[200] "
              onMouseEnter={() => setShowInfoNps(!showInfoNps)}
              onMouseLeave={() => setShowInfoNps(!showInfoNps)}
            >
              <InfoRoundedIcon className="text-gray-300 opacity-80 hover:opacity-100" />

              {/* NPS explanation */}
              <div
                className={` ${
                  showInfoNps ? "block" : "hidden"
                } absolute top-[100%] right-0  bg-gray-50 opacity-100 text-[10px] text-gray-500 p-4 rounded-lg shadow-lg`}
              >
                <h1 className="mb-2">How is NPS calculated ?</h1>
                <div className="flex justify-center items-center  mx-auto  gap-2 h-full">
                  <div className="flex justify-between items-center w-full gap-2">
                    <div className="flex justify-center items-center flex-col ">
                      <img
                        src={PromoterIcon}
                        alt="Promoter"
                        className="w-[20px]"
                      />
                      <div className="opacity-70 text-[10px]">Promoters%</div>
                    </div>
                    <div className="text-xl">-</div>
                    <div className="text-2xl">(</div>
                    <div className="flex justify-center items-center flex-col">
                      <img
                        src={PassiveIcon}
                        alt="Promoter"
                        className="w-[20px]"
                      />
                      <div className="opacity-70 text-[10px]">Passives%</div>
                    </div>
                    <div className="text-xl">+</div>
                    <div className="flex justify-center items-center flex-col">
                      <img
                        src={DetractorIcon}
                        alt="Promoter"
                        className="w-[20px]"
                      />
                      <div className="opacity-70 text-[10px] ">Detractors%</div>
                    </div>
                    <div className="text-2xl">)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-5 items-center flex-col-reverse sm:flex-row  ">
            <div className="w-[90%] md:w-[60%]   ">
              <div className=" w-[100%] md:w-[80%] ml-auto">
                {/* Promoters */}
                <div>
                  <div className="flex items-center px-3">
                    <div className="w-[100%] text-[14px] opacity-80 font-medium">
                      Promoters
                    </div>

                    <div className="mx-2 opacity-80 font-bold">
                      {apiData?.nps.total_promoters}
                    </div>
                    <img src={RespondantsIcon} alt="number of promoters" />
                  </div>
                  <div>
                    {/* Fake graph */}
                    <div className="rounded-full bg-[#000C08] bg-opacity-[6%] h-[24px] mt-1 border-2 border-[#000C08] border-opacity-[8%] flex justify-center items-center ">
                      {apiData?.nps?.promoters && (
                        <div
                          className={` ml-auto rounded-full bg-[#00AC69] transition-all ease-in duration-500`}
                          style={{
                            width: apiData?.nps?.promoters + "%",
                            minWidth: "11%",
                          }}
                        >
                          <div className="font-semibold  text-white ml-2">
                            {apiData?.nps.promoters}%
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Passives */}
                <div className="my-4">
                  <div className="flex items-center px-3">
                    <div className="w-full text-[14px] opacity-80 font-medium">
                      Passives
                    </div>

                    <div className="mx-2 opacity-80 font-bold">
                      {apiData?.nps.total_passive}
                    </div>
                    <img src={RespondantsIcon} alt="number of promoters" />
                  </div>
                  <div>
                    {/* Fake graph */}
                    <div className="rounded-full bg-[#000C08] bg-opacity-[6%] h-[24px] mt-1 border-2 border-[#000C08] border-opacity-[8%] flex justify-center items-center">
                      <div
                        className={` ml-auto rounded-full bg-[#4D5552] transition-all ease-in duration-500`}
                        style={{
                          width: apiData?.nps?.passive + "%",
                          minWidth: "11%",
                        }}
                      >
                        <div className="font-semibold  text-white ml-2">
                          {apiData?.nps.passive}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detractors */}
                <div>
                  <div className="flex items-center px-3">
                    <div className="w-full text-[14px] opacity-80 font-medium">
                      Detractors
                    </div>

                    <div className="mx-2 opacity-80 font-bold">
                      {apiData?.nps.total_detractors}
                    </div>
                    <img src={RespondantsIcon} alt="number of promoters" />
                  </div>
                  <div>
                    {/* Fake graph */}
                    <div className="rounded-full bg-[#000C08] bg-opacity-[6%] h-[24px] mt-1 border-2 border-[#000C08] border-opacity-[8%] flex justify-center items-center">
                      <div
                        className={`  ml-auto rounded-full bg-[#DB2B39] transition-all ease-in duration-500`}
                        style={{
                          width: apiData?.nps?.detractors + "%",
                          minWidth: "11%",
                        }}
                      >
                        <div className="font-semibold  text-white ml-2">
                          {apiData?.nps.detractors}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative w-[100%] sm:w-[40%]   ">
              {/* Pie graph */}
              <div className="absolute  top-[50%]  left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-[18px] opacity-40">NPS</h1>
                  <p className="opacity-80 text-[24px] font-semibold  ">
                    <CountUp
                      start={0}
                      duration={1}
                      end={apiData?.nps.nps_score}
                      separator=","
                      suffix="%"
                    />
                  </p>
                </div>
              </div>

              <div className=" w-[100%] md:min-w-[110px]">
                <ResponsiveContainer height={180} width="100%">
                  <PieChart>
                    <Tooltip cursor={false} content={<CustomTooltip />} />
                    <Pie
                      data={apiData?.nps_pie}
                      dataKey="percentage"
                      nameKey="label"
                      cx="50%"
                      cy="50%"
                      strokeWidth={5}
                      innerRadius="60%"
                      outerRadius="100%"
                      cornerRadius={6}
                      paddingAngle={-1}
                      startAngle={-270}
                      endAngle={-630}
                      minAngle={15}
                    >
                      {apiData?.nps_pie.map((entry, index) => (
                        <Cell key={Math.random()} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NPSDetailCard;

function CustomTooltip({ active, payload, label }) {
  if (active) {
    return (
      <div
        key={Math.random()}
        className="rounded-md bg-[#fafafa] text-[#1a1a1a] p-1 shadow-2xl shadow-[#000000] w-[120px] h-[50px] flex justify-center items-center z-[99]"
      >
        {payload?.map((data) => (
          <div
            key={Math.random()}
            className="flex justify-between items-center "
          >
            {/* <div
                    className={`bg-[${data.stroke}] w-2 h-2 rounded-full mr-2`}
                  ></div> */}
            <span className="uppercase mr-2 text-[10px]">{data.name}:</span>
            <span className="text-[10px]">{data.value} %</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}
