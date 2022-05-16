import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import endDateValue from "../../../../recoil/atoms/EndDateAtom";
import endMonthValue from "../../../../recoil/atoms/EndMonth";
import sendData from "../../../../recoil/atoms/sendDatesValueAtom";
import startDateValue from "../../../../recoil/atoms/StartDateAtom";
import startMonthValue from "../../../../recoil/atoms/StartMonthAtom";
import { BASE_API_LINK } from "../../../../utils/BaseAPILink";
// import CustomCalendar from "../Misc/CustomCalendar";
import Filter from "../Misc/Filter";
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
import largeDateAtom from "../../../../recoil/atoms/largeDateAtom";
import { useNavigate } from "react-router-dom";
import regionStatus from "../../../../recoil/atoms/regionStatus";
import regionList from "../../../../recoil/atoms/regionList";
import goButtonStatus from "../../../../recoil/atoms/goButtonStatus";

const NPSDashboard = () => {
  const [baseAPI, setBaseAPI] = useState(BASE_API_LINK);
  const [finalStartDate, setFinalStartDate] = useRecoilState(startDateValue);
  const [finalStartMonth, setFinalStartMonth] = useRecoilState(startMonthValue);
  const [finalEndDate, setFinalEndDate] = useRecoilState(endDateValue);
  const [finalEndMonth, setFinalEndMonth] = useRecoilState(endMonthValue);
  const [sendDataStatus, setSendDataStatus] = useRecoilState(sendData);
  // const [apiNameVars, setApiNameVars] = useRecoilState(apiNameVar);
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
  const [largeDate, setLargeDate] = useRecoilState(largeDateAtom);

  const [callRegion, setCallRegion] = useRecoilState(regionStatus);
  const [regionListValue, setRegionListValue] = useRecoilState(regionList);

  const [goStatus, setGoStatus] = useRecoilState(goButtonStatus);

  const linksArray = [];
  const defaultArray = [];

  const allApiNames = [
    "netPromoterScore",
    "netSentimentScore",
    "totalCards",
    "topComments",
    "alertComments",
    "npsOverTime",
    "nssOverTime",
    "npsVsSentiments",
    "clinics_data",
    "totalComments",
    "filterRegion",
    // "wordFrequency",
    // "cityStateClinics",
    // "egStatistics",
    // "egPercentileMember"]
  ];

  useEffect(async () => {
    // Region
    if (callRegion === true) {
      const regionData = await axios.get(
        "http://192.168.1.18:8000/filterRegion?start_month=" +
          finalStartMonth +
          "&start_year=" +
          finalStartDate +
          "&end_month=" +
          finalEndMonth +
          "&end_year=" +
          finalEndDate
      );
      setRegionListValue(regionData?.data);
      console.log("api response data:");
      console.log(regionData.data);

      console.log("region atom data:");
      console.log(regionListValue.region);
    }
  }, [callRegion]);

  useEffect(async () => {
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

    console.log("fron nps dashboard send data status:");
    console.log(sendDataStatus);

    // API Calls
    if (sendDataStatus === true) {
      const nps = await axios.get(linksArray[0]);
      setTimeout(() => setNpsApiData(nps?.data), 500);
      // console.log("nps if");
      // console.log(nps?.data);

      const nss = await axios.get(linksArray[1]);
      setTimeout(() => setNssApiData(nss?.data), 500);

      const totalCards = await axios.get(linksArray[2]);
      setTimeout(() => setTotalCardsAPIDatas(totalCards?.data), 500);

      const topComments = await axios.get(linksArray[3]);
      setTimeout(() => setTopCommentsAPIData(topComments?.data), 500);

      const alerts = await axios.get(linksArray[4]);
      setTimeout(() => setAlertCommentsAPIData(alerts?.data), 500);

      const npsOverTime = await axios.get(linksArray[5]);
      setTimeout(() => setNpsOverTimeAPIData(npsOverTime?.data), 500);

      const nssOverTime = await axios.get(linksArray[6]);
      setTimeout(() => setNssOverTimeAPIData(nssOverTime?.data), 500);

      const npsVsSentiment = await axios.get(linksArray[7]);
      setTimeout(() => setNpsVsSentiAPIData(npsVsSentiment?.data), 500);

      const clinics = await axios.get(linksArray[8]);
      setTimeout(() => setClinicsAPIData(clinics?.data), 500);

      const allComments = await axios.get(linksArray[9]);
      setTimeout(() => setAllCommentsAPIData(allComments?.data), 500);
    }

    // ELSE
    else if (sendDataStatus === -1) {
      const nps = await axios.get(defaultArray[0]);
      setNpsApiData(nps?.data);
      console.log("nps else");
      console.log(nps?.data);

      const nss = await axios.get(defaultArray[1]);
      setNssApiData(nss?.data);

      const totalCards = await axios.get(defaultArray[2]);
      setTotalCardsAPIDatas(totalCards?.data);

      const topComments = await axios.get(defaultArray[3]);
      setTimeout(() => setTopCommentsAPIData(topComments?.data), 500);

      const alerts = await axios.get(defaultArray[4]);
      setTimeout(() => setAlertCommentsAPIData(alerts?.data), 500);

      const npsOverTime = await axios.get(defaultArray[5]);
      setTimeout(() => setNpsOverTimeAPIData(npsOverTime?.data), 500);

      const nssOverTime = await axios.get(defaultArray[6]);
      setTimeout(() => setNssOverTimeAPIData(nssOverTime?.data), 500);

      const npsVsSentiment = await axios.get(defaultArray[7]);
      setTimeout(() => setNpsVsSentiAPIData(npsVsSentiment?.data), 500);

      const clinics = await axios.get(defaultArray[8]);
      setTimeout(() => setClinicsAPIData(clinics?.data), 500);

      const allComments = await axios.get(defaultArray[9]);
      setTimeout(() => setAllCommentsAPIData(allComments?.data), 500);
    }
  }, [goStatus]);

  let history = useNavigate();

  if (sessionStorage.getItem("useStatus") === null) {
    history("/");
  }

  return (
    <div className="relative">
      <div className=" sticky top-12 bg-[#f5f5f5] z-10 pb-2 pt-2">
        <Filter />
      </div>
      {activePageValue === "NPS_Overall" ? <NPSOverall /> : ""}
      {activePageValue === "NPS_Analysis" ? <NPSAnalysisPage /> : ""}
      {activePageValue === "NSS_Analysis" ? <NSSAnalysisPage /> : ""}
      {activePageValue === "Comments" ? <CommentsPage /> : ""}
    </div>
  );
};

export default NPSDashboard;
