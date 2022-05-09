import React, { useEffect, useState } from "react";
// import MockApiNPSData from "../../../../mock_API/NPS/NPS Main Dashboard/NPSCard.json";
import CountUp from "react-countup";
import PromoterIcon from "../../../../assets/img/NPS Dashboard/greenMan.svg";
import PassiveIcon from "../../../../assets/img/NPS Dashboard/darkGrayMan.svg";
import DetractorIcon from "../../../../assets/img/NPS Dashboard/redMan.svg";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useRecoilState } from "recoil";
import PuffLoader from "react-spinners/PuffLoader";
import npsAPIdata from "../../../../recoil/atoms/npsAPIdata";
import LoaderStatus from "../../../../recoil/atoms/Loader";

const NPSCard = () => {
  const [npsApiData, setNpsApiData] = useRecoilState(npsAPIdata);
  const [apiData, setApiData] = useState();
  const [loaderStatusValue, setLoaderStatusValue] =
    useRecoilState(LoaderStatus);

  useEffect(() => {
    setApiData(npsApiData);
  }, [npsApiData]);

  return (
    <div className="p-2 md:p-5 w-full   rounded-lg bg-white flex justify-center md:justify-center items-center relative ">
      {!apiData && (
        <div className="min-h-[130px] bg-[#ffffff] z-[200] rounded-lg flex justify-center items-center">
          <PuffLoader color="#00ac69" size={50} width={100} />
        </div>
      )}

      {apiData && (
        <div className="w-full">
          <h1 className=" font-bold opacity-80 ">Net Promoter Score</h1>
          <div className="flex justify-start sm:justify-between   gap-3 md:gap-5  ">
            <div className="flex justify-start items-center gap-3 md:gap-5">
              <div className="text-center flex flex-col justify-start items-center gap-2">
                <img src={PromoterIcon} alt="promoters" />
                <h1 className="text-sm md:text-xl font-medium opacity-80">
                  <CountUp
                    start={0}
                    duration={1}
                    // end={MockApiNPSData.nps.promoters}
                    end={apiData?.nps.promoters}
                    separator=","
                    suffix="%"
                  />
                </h1>
                <p className=" opacity-60 text-xs font-medium">Promoters</p>
              </div>

              <div className="text-center flex flex-col justify-center items-center gap-2">
                <img src={PassiveIcon} alt="passives" />
                <h1 className="text-sm md:text-xl font-medium opacity-80">
                  <CountUp
                    start={0}
                    duration={1}
                    end={apiData?.nps.passive}
                    // end={MockApiNPSData.nps.passive}
                    separator=","
                    suffix="%"
                  />
                </h1>
                <p className=" opacity-60 text-xs font-medium">Passives</p>
              </div>

              <div className="text-center flex flex-col justify-center items-center gap-2">
                <img src={DetractorIcon} alt="detractors" />
                <h1 className="text-sm md:text-xl font-medium opacity-80">
                  <CountUp
                    start={0}
                    duration={1}
                    end={apiData?.nps.detractors}
                    // end={MockApiNPSData.nps.detractors}
                    separator=","
                    suffix="%"
                  />
                </h1>
                <p className=" opacity-60 text-xs font-medium">Detractors</p>
              </div>
            </div>

            {/* Graph */}
            <div className="relative">
              <div className="absolute  top-[50%]  left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-[12px] opacity-40">NPS</h1>
                  <p className="opacity-80 text-xs md:text-base">
                    <CountUp
                      start={0}
                      duration={1}
                      // end={MockApiNPSData.nps.nps_score}
                      end={apiData?.nps.nps_score}
                      separator=","
                      suffix="%"
                    />
                  </p>
                </div>
              </div>

              <div className=" w-[80px] md:w-[110px] ">
                <ResponsiveContainer height={110} width="100%">
                  <PieChart>
                    <Tooltip cursor={false} content={<CustomTooltip />} />
                    <Pie
                      // data={MockApiNPSData.nps_pie}
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

export default NPSCard;

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
