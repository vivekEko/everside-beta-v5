import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import mockData from "../../../../mock_API/NPS/NPS Main Dashboard/NPSOverTime.json";
import chevron from "../../../../assets/img/global-img/DownChevron.svg";
import { useRecoilState } from "recoil";
import startDateValue from "../../../../recoil/atoms/StartDateAtom";
import startMonthValue from "../../../../recoil/atoms/StartMonthAtom";
import endDateValue from "../../../../recoil/atoms/EndDateAtom";
import endMonthValue from "../../../../recoil/atoms/EndMonth";
import sendData from "../../../../recoil/atoms/sendDatesValueAtom";
import axios from "axios";
import { BASE_API_LINK } from "../../../../utils/BaseAPILink";
import { PuffLoader } from "react-spinners";
import npsOverTimeApiData from "../../../../recoil/atoms/npsOverTimeApiData";

const NPSAllGraph = () => {
  const [filterStatus, setFilterStatus] = useState(false);
  const [graphName, setGraphName] = useState("NPS Score");

  const npsGraphNames = [
    {
      id: 1,
      name: "Promoters",
    },
    {
      id: 2,
      name: "Passives",
    },
    {
      id: 3,
      name: "Detractors",
    },
    {
      id: 4,
      name: "NPS Score",
    },
    {
      id: 5,
      name: "All",
    },
  ];

  const [finalStartDate, setFinalStartDate] = useRecoilState(startDateValue);
  const [finalStartMonth, setFinalStartMonth] = useRecoilState(startMonthValue);
  const [finalEndDate, setFinalEndDate] = useRecoilState(endDateValue);
  const [finalEndMonth, setFinalEndMonth] = useRecoilState(endMonthValue);
  const [sendDataStatus, setSendDataStatus] = useRecoilState(sendData);
  const [apiData, setApiData] = useState();
  const [baseAPI, setBaseAPI] = useState(BASE_API_LINK);

  const [npsOverTimeAPIData, setNpsOverTimeAPIData] =
    useRecoilState(npsOverTimeApiData);

  // console.log(baseURLs);

  // useEffect(() => {
  //   const requestURL =
  //     baseAPI +
  //     "npsOverTime?" +
  //     "start_year=" +
  //     finalStartDate +
  //     "&" +
  //     "start_month=" +
  //     finalStartMonth +
  //     "&" +
  //     "end_year=" +
  //     finalEndDate +
  //     "&" +
  //     "end_month=" +
  //     finalEndMonth;

  //   if (sendDataStatus === true) {
  //     // console.log("Requested URL: " + requestURL);
  //     axios.get(requestURL).then((res) => {
  //       // console.log(res);
  //       // console.log(res?.data);
  //       setApiData(res?.data);
  //     });
  //   } else if (sendDataStatus === false) {
  //     axios
  //       .get(
  //         baseAPI +
  //           "npsOverTime?start_month=1&start_year=2021&end_month=12&end_year=2021"
  //       )
  //       .then((res) => {
  //         setApiData(res?.data);
  //         // console.log("This is else if data" + res?.data);
  //       });
  //   }
  // }, [sendDataStatus]);

  useEffect(() => {
    setApiData(npsOverTimeAPIData);
    console.log("atom data nps all component");
    console.log(npsOverTimeAPIData);
  }, [npsOverTimeAPIData]);

  return (
    <div className="p-2 md:p-5 w-full   rounded-lg bg-white  relative min-h-[300px]">
      {!apiData && (
        <div className="h-full w-full bg-[#ffffff] z-[200] rounded-lg flex justify-center items-center">
          <PuffLoader color="#00ac69" size={50} width={100} />
        </div>
      )}

      {apiData && (
        <div className="w-full ">
          <div className="flex justify-between items-center mb-7">
            <h1 className=" font-bold opacity-80 text-[18px] ">NPS Plot</h1>
            <div className="relative">
              {/* Dropdown */}
              <div
                className="bg-[#000C08] bg-opacity-[10%] p-2 w-[120px] rounded-lg flex justify-between items-center cursor-pointer"
                onClick={() => setFilterStatus(!filterStatus)}
              >
                <div className="text-[12px] opacity-70">{graphName}</div>
                <img
                  src={chevron}
                  alt="open options arrow"
                  className={` ${
                    filterStatus ? "rotate-180" : "rotate-0"
                  } transition-all`}
                />
              </div>
              <div
                className={`bg-[#e5e6e5] z-[50] ${
                  filterStatus ? "h-auto block" : "h-0 hidden"
                }   w-[120px] rounded-lg absolute top-[120%]`}
              >
                {npsGraphNames.map((data) => (
                  <div
                    key={Math.random()}
                    className={`  p-2 border-b-2 border-b-transparent hover:bg-gray-100 text-[12px] opacity-70 cursor-pointer`}
                    onClick={() => {
                      setGraphName(data.name);
                      setFilterStatus(!filterStatus);
                    }}
                  >
                    {data.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5 justify-end mb-2">
            <div className="flex items-center gap-1">
              <div className="bg-[#00AC69] h-[8px] w-[8px] rounded-full"></div>
              <div className="text-[12px] opacity-80">Promoters</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="bg-[#4D5552] h-[8px] w-[8px] rounded-full"></div>
              <div className="text-[12px] opacity-80">Passives</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="bg-[#DB2B39] h-[8px] w-[8px] rounded-full"></div>
              <div className="text-[12px] opacity-80">Detractors</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="bg-[#0094E0] h-[8px] w-[8px] rounded-full"></div>
              <div className="text-[12px] opacity-80">NPS Score</div>
            </div>
          </div>

          {/* Graph */}
          <div className="relative ">
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart
                key={graphName}
                data={apiData?.nps_over_time}
                margin={{ top: 0, right: 20, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="npsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#009DFF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#009DFF" stopOpacity={0.05} />
                  </linearGradient>

                  <linearGradient
                    id="promoterGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#00AC69" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#00AC69" stopOpacity={0.05} />
                  </linearGradient>

                  <linearGradient
                    id="passiveGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#4D5552" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4D5552" stopOpacity={0.05} />
                  </linearGradient>

                  <linearGradient
                    id="detractorGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#DB2B39" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#DB2B39" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  horizontal={false}
                  opacity={0.5}
                />
                <XAxis
                  dataKey="month"
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                  tickCount={6}
                  angle={0}
                  textAnchor="middle"
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  fontSize={12}
                  tickCount={4}
                  tickFormatter={(number) => `${number}%`}
                  margin={{ right: 20 }}
                />
                <Tooltip cursor={false} content={<CustomTooltip />} />
                {graphName === "NPS Score" || graphName === "All" ? (
                  <Area
                    type="monotone"
                    name="nps"
                    dataKey="nps"
                    stroke="#0094E0 "
                    dot={false}
                    strokeWidth={4}
                    fill="url(#npsGradient)"
                  />
                ) : (
                  ""
                )}

                {graphName === "Promoters" || graphName === "All" ? (
                  <Area
                    type="monotone"
                    name="promoter"
                    dataKey="promoter"
                    stroke="#00AC69 "
                    dot={false}
                    strokeWidth={4}
                    fill="url(#promoterGradient)"
                  />
                ) : (
                  ""
                )}

                {graphName === "Passives" || graphName === "All" ? (
                  <Area
                    type="monotone"
                    name="passive"
                    dataKey="passive"
                    stroke="#4D5552 "
                    dot={false}
                    strokeWidth={4}
                    fill="url(#passiveGradient)"
                  />
                ) : (
                  ""
                )}

                {graphName === "Detractors" || graphName === "All" ? (
                  <Area
                    type="monotone"
                    name="detractor"
                    dataKey="detractor"
                    stroke="#DB2B39 "
                    dot={false}
                    strokeWidth={4}
                    fill="url(#detractorGradient)"
                  />
                ) : (
                  ""
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default NPSAllGraph;

function CustomTooltip({ active, payload, label }) {
  if (active) {
    return (
      <div className="rounded-md bg-[#fafafa] text-[#1a1a1a] p-[1rem] shadow-2xl shadow-[#000000]">
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
