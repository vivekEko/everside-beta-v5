import React from "react";
import CustomCalendar2 from "../Misc/CustomCalendar2";
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
import NPSDetailedCard from "../NPS Analysis/NPSDetailCard";
import NSSDetailedCard from "../NSS/NSSDetailedCard";
import NPSAllGraph from "../NPS Analysis/NPSAllGraph";
import NSSAllGraph from "../NSS/NSSAllGraph";
import TotalComments from "../Comments/TotalComments";
import NPSallComments from "./NPSallComments";
import CustomCalendar4 from "../Misc/CustomCalendar4";

const NPSOverall = () => {
  return (
    <div>
      <section className="mt-[8px] flex justify-between items-center gap-2 flex-col xs:flex-row sm:flex-col  xl:flex-row">
        <div className="flex items-center  flex-col sm:flex-row gap-2 sm:w-full xl:w-[66%]">
          {/* <NPSDetailedCard />
          <NSSDetailedCard /> */}
          <NPSCard />
          <NSSCard />
        </div>
        <TotalCard />
      </section>
      <section className="my-[8px]  flex flex-col md:flex-row justify-center gap-2">
        {/* <TotalComments /> */}
        {/* <Comments /> */}
        <NPSallComments />
        <AlertComments />
      </section>
      <section className="my-[8px]  flex flex-col xl:flex-row justify-center gap-2">
        <NPSOverTime />
        <NSSOverTime />
        {/* <NPSAllGraph />
        <NSSAllGraph /> */}
      </section>

      <section className="my-[8px]  grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2">
        <NPSvsSentiment />
        <HealthProfessionals />
        <Clinics />
        <Clients />
      </section>
      {/* <CustomCalendar4 /> */}
    </div>
  );
};

export default NPSOverall;
