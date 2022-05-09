import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import endDateValue from "../../../../recoil/atoms/EndDateAtom";
import endMonthValue from "../../../../recoil/atoms/EndMonth";
import sendData from "../../../../recoil/atoms/sendDatesValueAtom";
import startDateValue from "../../../../recoil/atoms/StartDateAtom";
import startMonthValue from "../../../../recoil/atoms/StartMonthAtom";
import { BASE_API_LINK } from "../../../../utils/BaseAPILink";
import CustomCalendar from "../Misc/CustomCalendar";
import Filter from "../Misc/Filter";
import AlertComments from "./AlertComments";
import Clients from "./Clients";
import Clinics from "./Clinics";
import Comments from "./Comments";
import HealthProfessionals from "./HealthProfessionals";
import NPSCard from "./NPSCard";
import NPSOverTime from "./NPSOverTime";
import NPSvsSentiment from "./NPSVsSentiment";
import NSSCard from "./NSSCard";
import NSSOverTime from "./NSSOverTime";
import TotalCard from "./TotalCard";
import WordFrequency from "./WordFrequency";

import npsAPIdata from "../../../../recoil/atoms/npsAPIdata";
import nssAPIdata from "../../../../recoil/atoms/nssAPIdata";
import apiNameVar from "../../../../recoil/atoms/apiNameVar";
import totalCardsApiData from "../../../../recoil/atoms/totalCardsApiData";
import npsOverTimeApiData from "../../../../recoil/atoms/npsOverTimeApiData";
import sentimentOverTimeApiData from "../../../../recoil/atoms/sentimentOverTimeApiData";
import npsVsSentimentApiData from "../../../../recoil/atoms/npsVsSentimentApiData";
import clinicsApiData from "../../../../recoil/atoms/clinicsApiData";
import topCommentsApiData from "../../../../recoil/atoms/topCommentsApiData";
import alertCommentsApiData from "../../../../recoil/atoms/alertCommentsApiData";
import totalCommentsApiData from "../../../../recoil/atoms/totalCommentsApiData";
import NPSOverall from "./NPSOverall";
import NPSAnalysisPage from "../NPS Analysis/NPSAnalysisPage";
import NSSAnalysisPage from "../NSS/NSSAnalysisPage";
import CommentsPage from "../Comments/CommentsPage";
import activeInnerPage from "../../../../recoil/atoms/activeInnerPage";

const NPSDashboard = () => {
  const [baseAPI, setBaseAPI] = useState(BASE_API_LINK);
  const [finalStartDate, setFinalStartDate] = useRecoilState(startDateValue);
  const [finalStartMonth, setFinalStartMonth] = useRecoilState(startMonthValue);
  const [finalEndDate, setFinalEndDate] = useRecoilState(endDateValue);
  const [finalEndMonth, setFinalEndMonth] = useRecoilState(endMonthValue);
  const [sendDataStatus, setSendDataStatus] = useRecoilState(sendData);
  const [apiNameVars, setApiNameVars] = useRecoilState(apiNameVar);
  const defaultStartYear = 2021;
  const defaultStartMonth = 1;
  const defaultEndYear = 2021;
  const defaultEndMonth = 12;

  // All api data variables
  // const [atomName, setAtomName] = useState();
  const [npsApiData, setNpsApiData] = useRecoilState(npsAPIdata);
  const [nssApiData, setNssApiData] = useRecoilState(nssAPIdata);
  const [totalCardsAPIDatas, setTotalCardsAPIDatas] =
    useRecoilState(totalCardsApiData);
  const [npsOverTimeAPIData, setNpsOverTimeAPIData] =
    useRecoilState(npsOverTimeApiData);
  const [nssOverTimeAPIData, setNssOverTimeAPIData] = useRecoilState(
    sentimentOverTimeApiData
  );
  const [npsVsSentiAPIData, setNpsVsSentiAPIData] = useRecoilState(
    npsVsSentimentApiData
  );
  const [clinicsAPIData, setClinicsAPIData] = useRecoilState(clinicsApiData);
  const [topCommentsAPIData, setTopCommentsAPIData] =
    useRecoilState(topCommentsApiData);
  const [alertCommentsAPIData, setAlertCommentsAPIData] =
    useRecoilState(alertCommentsApiData);
  const [allCommentsAPIData, setAllCommentsAPIData] =
    useRecoilState(totalCommentsApiData);
  const [activePageValue, setActivePageValue] = useRecoilState(activeInnerPage);

  const linksArray = [];
  const defaultArray = [];

  const allApiNames = [
    "netPromoterScore",
    "netSentimentScore",
    "totalCards",
    "npsOverTime",
    "nssOverTime",
    "npsVsSentiments",
    "clinics_data",
    "topComments",
    "alertComments",
    "totalComments",
    // "wordFrequency",
    // "cityStateClinics",
    // "egStatistics",
    // "egPercentileMember"]
  ];

  useEffect(async () => {
    // console.log("end month");
    // console.log(finalEndMonth);
    // API url creation
    for (let i = 0; i < 10; i++) {
      const requestURL =
        baseAPI +
        allApiNames[i] +
        "?" +
        "start_year=" +
        finalStartDate +
        "&" +
        "start_month=" +
        finalStartMonth +
        "&" +
        "end_year=" +
        finalEndDate +
        "&" +
        "end_month=" +
        finalEndMonth;

      const defaultUrl =
        baseAPI +
        allApiNames[i] +
        "?" +
        "start_year=" +
        defaultStartYear +
        "&" +
        "start_month=" +
        defaultStartMonth +
        "&" +
        "end_year=" +
        defaultEndYear +
        "&" +
        "end_month=" +
        defaultEndMonth;

      linksArray.push(requestURL);
      defaultArray.push(defaultUrl);
    }

    // API Calls
    if (sendDataStatus === true) {
      setNpsApiData(null);
      setNssApiData(null);
      setTotalCardsAPIDatas(null);
      setNpsOverTimeAPIData(null);
      setNssOverTimeAPIData(null);
      setNpsVsSentiAPIData(null);
      setClinicsAPIData(null);
      setTopCommentsAPIData(null);
      setAlertCommentsAPIData(null);
      setAllCommentsAPIData(null);

      const nps = await axios.get(linksArray[0]);
      setTimeout(() => setNpsApiData(nps?.data), 500);
      // console.log("nps if");
      // console.log(nps?.data);

      const nss = await axios.get(linksArray[1]);
      setTimeout(() => setNssApiData(nss?.data), 500);

      const totalCards = await axios.get(linksArray[2]);
      setTimeout(() => setTotalCardsAPIDatas(totalCards?.data), 500);

      const npsOverTime = await axios.get(linksArray[3]);
      setTimeout(() => setNpsOverTimeAPIData(npsOverTime?.data), 500);

      const nssOverTime = await axios.get(linksArray[4]);
      setTimeout(() => setNssOverTimeAPIData(nssOverTime?.data), 500);

      const npsVsSentiment = await axios.get(linksArray[5]);
      setTimeout(() => setNpsVsSentiAPIData(npsVsSentiment?.data), 500);

      const clinics = await axios.get(linksArray[6]);
      setTimeout(() => setClinicsAPIData(clinics?.data), 500);

      const topComments = await axios.get(linksArray[7]);
      setTimeout(() => setTopCommentsAPIData(topComments?.data), 500);

      const alerts = await axios.get(linksArray[8]);
      setTimeout(() => setAlertCommentsAPIData(alerts?.data), 500);

      const allComments = await axios.get(linksArray[9]);

      setTimeout(() => setAllCommentsAPIData(allComments?.data), 500);
    }

    // ELSE
    else if (sendDataStatus === false) {
      const nps = await axios.get(defaultArray[0]);
      setNpsApiData(nps?.data);
      // console.log("nps else");
      // console.log(nps?.data);

      const nss = await axios.get(defaultArray[1]);
      setNssApiData(nss?.data);

      const totalCards = await axios.get(defaultArray[2]);
      setTotalCardsAPIDatas(totalCards?.data);

      const npsOverTime = await axios.get(defaultArray[3]);
      setNpsOverTimeAPIData(npsOverTime?.data);

      const nssOverTime = await axios.get(defaultArray[4]);
      setNssOverTimeAPIData(nssOverTime?.data);

      const npsVsSentiment = await axios.get(defaultArray[5]);
      setNpsVsSentiAPIData(npsVsSentiment?.data);

      const clinics = await axios.get(defaultArray[6]);
      setClinicsAPIData(clinics?.data);

      const topComments = await axios.get(defaultArray[7]);
      setTopCommentsAPIData(topComments?.data);

      const alerts = await axios.get(defaultArray[8]);
      setAlertCommentsAPIData(alerts?.data);

      const allComments = await axios.get(defaultArray[9]);
      setAllCommentsAPIData(allComments?.data);
    }
  }, [finalEndMonth]);

  // useEffect(() => {
  //   // For loop
  //   // for (let i = 0; i < 10; i++) {
  //   //   if (i === 0) {
  //   //     if (sendDataStatus === true) {
  //   //       axios.get(linksArray[i]).then((res) => {
  //   //         setNpsApiData(res?.data);
  //   //       });
  //   //     } else if (sendDataStatus === false) {
  //   //       axios.get(defaultArray[i]).then((res) => {
  //   //         setNpsApiData(res?.data);
  //   //       });
  //   //     }
  //   //   }
  //   //   // NSS
  //   //   if (i === 1) {
  //   //     if (sendDataStatus === true) {
  //   //       axios.get(linksArray[i]).then((res) => {
  //   //         setNssApiData(res?.data);
  //   //       });
  //   //     } else if (sendDataStatus === false) {
  //   //       axios.get(defaultArray[i]).then((res) => {
  //   //         setNssApiData(res?.data);
  //   //       });
  //   //     }
  //   //   }
  //   //   // Total cards
  //   //   if (i === 2) {
  //   //     if (sendDataStatus === true) {
  //   //       axios.get(linksArray[i]).then((res) => {
  //   //         setTotalCardsAPIDatas(res?.data);
  //   //       });
  //   //     } else if (sendDataStatus === false) {
  //   //       axios.get(defaultArray[i]).then((res) => {
  //   //         setTotalCardsAPIDatas(res?.data);
  //   //       });
  //   //     }
  //   //   }
  //   //   // // npsOverTimeAPIData
  //   //   // if (i === 3) {
  //   //   //   if (sendDataStatus === true) {
  //   //   //     axios.get(linksArray[i]).then((res) => {
  //   //   //       setNpsOverTimeAPIData(res?.data);
  //   //   //     });
  //   //   //   } else if (sendDataStatus === false) {
  //   //   //     axios.get(defaultArray[i]).then((res) => {
  //   //   //       setNpsOverTimeAPIData(res?.data);
  //   //   //     });
  //   //   //   }
  //   //   // }
  //   //   // // NssOverTimeAPIData
  //   //   // if (i === 4) {
  //   //   //   if (sendDataStatus === true) {
  //   //   //     axios.get(linksArray[i]).then((res) => {
  //   //   //       setNssOverTimeAPIData(res?.data);
  //   //   //     });
  //   //   //   } else if (sendDataStatus === false) {
  //   //   //     axios.get(defaultArray[i]).then((res) => {
  //   //   //       setNssOverTimeAPIData(res?.data);
  //   //   //     });
  //   //   //   }
  //   //   // }
  //   //   // // setNpsVsSentiAPIData
  //   //   // if (i === 5) {
  //   //   //   if (sendDataStatus === true) {
  //   //   //     axios.get(linksArray[i]).then((res) => {
  //   //   //       setNpsVsSentiAPIData(res?.data);
  //   //   //       // console.log("npsvsSenti");
  //   //   //       // console.log(res?.data);
  //   //   //     });
  //   //   //   } else if (sendDataStatus === false) {
  //   //   //     axios.get(defaultArray[i]).then((res) => {
  //   //   //       setNpsVsSentiAPIData(res?.data);
  //   //   //       // console.log("npsvsSenti else");
  //   //   //       // console.log(res?.data);
  //   //   //     });
  //   //   //   }
  //   //   // }
  //   //   // // setClinicsAPIData
  //   //   // if (i === 6) {
  //   //   //   if (sendDataStatus === true) {
  //   //   //     axios.get(linksArray[i]).then((res) => {
  //   //   //       setClinicsAPIData(res?.data);
  //   //   //     });
  //   //   //   } else if (sendDataStatus === false) {
  //   //   //     axios.get(defaultArray[i]).then((res) => {
  //   //   //       setClinicsAPIData(res?.data);
  //   //   //     });
  //   //   //   }
  //   //   // }
  //   //   // // setTopCommentsAPIData
  //   //   // if (i === 7) {
  //   //   //   if (sendDataStatus === true) {
  //   //   //     axios.get(linksArray[i]).then((res) => {
  //   //   //       setTopCommentsAPIData(res?.data);
  //   //   //     });
  //   //   //   } else if (sendDataStatus === false) {
  //   //   //     axios.get(defaultArray[i]).then((res) => {
  //   //   //       setTopCommentsAPIData(res?.data);
  //   //   //     });
  //   //   //   }
  //   //   // }
  //   //   // // setAlertCommentsAPIData
  //   //   // if (i === 8) {
  //   //   //   if (sendDataStatus === true) {
  //   //   //     axios.get(linksArray[i]).then((res) => {
  //   //   //       setAlertCommentsAPIData(res?.data);
  //   //   //     });
  //   //   //   } else if (sendDataStatus === false) {
  //   //   //     axios.get(defaultArray[i]).then((res) => {
  //   //   //       setAlertCommentsAPIData(res?.data);
  //   //   //     });
  //   //   //   }
  //   //   // }
  //   //   // // setAllCommentsAPIData
  //   //   // if (i === 9) {
  //   //   //   if (sendDataStatus === true) {
  //   //   //     axios.get(linksArray[i]).then((res) => {
  //   //   //       setAllCommentsAPIData(res?.data);
  //   //   //     });
  //   //   //   } else if (sendDataStatus === false) {
  //   //   //     axios.get(defaultArray[i]).then((res) => {
  //   //   //       setAllCommentsAPIData(res?.data);
  //   //   //     });
  //   //   //   }
  //   //   // }
  //   // }
  // }, [finalStartDate, finalEndDate, finalStartMonth, finalEndMonth]);

  return (
    <div className="relative">
      <Filter />
      {activePageValue === "NPS_Overall" ? <NPSOverall /> : ""}
      {activePageValue === "NPS_Analysis" ? <NPSAnalysisPage /> : ""}
      {activePageValue === "NSS_Analysis" ? <NSSAnalysisPage /> : ""}
      {activePageValue === "Comments" ? <CommentsPage /> : ""}
      {/*  */}
      {/* <NPSAnalysisPage /> */}
      {/* <NSSAnalysisPage /> */}
      {/* <CommentsPage /> */}
    </div>
  );
};

export default NPSDashboard;
