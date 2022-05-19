import Header from "./components/Global/Header";
import Sidebar from "./components/Global/Sidebar";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Dashboard from "./components/Dashboards/Main Dashboard/Dashboard";
import NPSDashboard from "./components/Dashboards/NPS/NPS Overall Dashboard/NPSDashboard";
import NPSAnalysisPage from "./components/Dashboards/NPS/NPS Analysis/NPSAnalysisPage";
import NSSPage from "./components/Dashboards/NPS/NSS/NSSPage";
import { useRecoilState } from "recoil";
import DateFilterStatus from "./recoil/atoms/DateFilterStatusAtom";
import CommentsPage from "./components/Dashboards/NPS/Comments/CommentsPage";
import EngagementModel from "./components/Dashboards/EngagementModel/EngagementModel";
import SDOH from "./components/Dashboards/SDOH/SDOH";
import hamburgerStatusRecoil from "./recoil/atoms/HamburgerAtom";
import Filter from "./components/Dashboards/NPS/Misc/Filter";
import Auth from "./components/Global/Auth";
import { useEffect, useState } from "react";
import UserAuthAtom from "./recoil/atoms/UserAuthAtom";
import Home from "./components/Global/Home";

function App() {
  const [datePickerStatus, setDatePickerStatus] =
    useRecoilState(DateFilterStatus);

  const [hamburgerStatus, setHamburgerStatus] = useRecoilState(
    hamburgerStatusRecoil
  );

  return (
    <div>
      <div className="cursor-default relative">
        {/*Calendar Overlay */}
        {/* <div
      onClick={() => setDatePickerStatus(!datePickerStatus)}
      className={`h-screen w-full fixed bg-[#00000025] z-[100] lg:hidden ${
        datePickerStatus ? "block" : "hidden"
      }`}
    ></div> */}

        {/*Sidebar Overlay */}
        <div
          onClick={() => setHamburgerStatus(!hamburgerStatus)}
          className={`h-screen w-full fixed bg-[#00000025] z-[20] ${
            hamburgerStatus ? "block lg:hidden" : "hidden"
          } xl:hidden`}
        ></div>
        <Header />
        <main className="bg-[#E5E5E5] bg-opacity-40">
          <Router>
            <Sidebar />
            <div className="lg:pl-[170px] p-[8px] sm:p-[10px] md:p-[20px]">
              {/* <Filter /> */}
              <Routes>
                <Route path="*" element={<Navigate replace to="/" />} />
                {/* <Route exact path="/" element={<Dashboard />}></Route> */}
                {/* <Route exact path="/" element={<Auth />}></Route> */}
                <Route exact path="/" element={<Home />}></Route>

                <Route
                  exact
                  path="/npsDashboard"
                  element={<NPSDashboard />}
                ></Route>
                <Route
                  exact
                  path="/npsDashboard/npsAnalysis"
                  element={<NPSAnalysisPage />}
                ></Route>
                <Route
                  exact
                  path="/npsDashboard/nss"
                  element={<NSSPage />}
                ></Route>
                <Route
                  exact
                  path="/npsDashboard/comments"
                  element={<CommentsPage />}
                ></Route>
                <Route
                  exact
                  path="/engagementModel"
                  element={<EngagementModel />}
                ></Route>
                <Route exact path="/SDOH" element={<SDOH />}></Route>
              </Routes>
            </div>
          </Router>
        </main>
      </div>
    </div>
  );
}

export default App;
