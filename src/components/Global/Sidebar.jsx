import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import activeInnerPage from "../../recoil/atoms/activeInnerPage";
import hamburgerStatusRecoil from "../../recoil/atoms/HamburgerAtom";
import componentName from "../../recoil/atoms/PageNameAtom";
import BoxIconLarge from "../Sidebar/IconContainer/BoxIconLarge";
import BoxIconSmall from "../Sidebar/IconContainer/BoxIconSmall";
import DashboardIcon from "../Sidebar/IconContainer/DashboardIcon";
import NPSDashboardIcon from "../Sidebar/IconContainer/NPSDashboardIcon";
import SidebarLink from "../Sidebar/LinkContainer/SidebarLink";
import SidebarMiniLink from "../Sidebar/LinkContainer/SidebarMiniLink";

const Sidebar = () => {
  const [hamburgerStatus, setHamburgerStatus] = useRecoilState(
    hamburgerStatusRecoil
  );

  const [componentNameValue, setComponentNameValue] =
    useRecoilState(componentName);

  // const [childNPSLinkStatus, setChildNPSLinkStatus] = useState(false);
  const [bgColorValue, setbgColorValue] = useState("transparent");
  const [strokeColor, setStrokeColor] = useState("#000C08");

  const [pageName, setPageName] = useState("/");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setPageName("/");
    } else {
      setPageName(location.pathname);
    }
  }, [location]);

  useEffect(() => {
    if (pageName === componentNameValue) {
      setbgColorValue("#00AC69");
      setStrokeColor("#00AC69");
    } else {
      setbgColorValue("transparent");
      setStrokeColor("#000C08");
    }
  }, [pageName, componentNameValue]);

  const [activePageValue, setActivePageValue] = useRecoilState(activeInnerPage);

  return (
    <div
      className={`h-[calc(100vh-50px)] mt-[50px] fixed inset-y-0 left-0 z-30  overflow-y-auto overflow-x-hidden transition-all duration-[400ms] ease-out transform    scrollbar-hide  bg-white border-r-2 border-b-[#EBECEB] border-[1px] w-[150px]${
        hamburgerStatus
          ? "ease-in   "
          : "ease-out  -translate-x-[100%] lg:translate-x-0 "
      }`}
    >
      <div className="pt-[65px]  ">
        <div>
          <div className="mb-[30px]">
            <Link to="/">
              <SidebarLink
                iconName="/"
                pageName={pageName}
                linkName="Dashboard"
                onClick={() => {
                  setPageName("/");
                  setComponentNameValue("/");
                  setHamburgerStatus(!hamburgerStatus);
                  setActivePageValue(null);
                }}
                icon={
                  <DashboardIcon
                    bgColor={bgColorValue}
                    strokeColor={strokeColor}
                    iconName="/"
                    pageName={pageName}
                  />
                }
              />
            </Link>
          </div>

          <div className="mb-[30px]">
            <Link to="/npsDashboard">
              <SidebarLink
                iconName="/npsDashboard"
                pageName={pageName}
                linkName="NPS"
                onClick={() => {
                  setPageName("/npsDashboard");
                  setComponentNameValue("/npsDashboard");
                  // setChildNPSLinkStatus(!childNPSLinkStatus);
                  setHamburgerStatus(!hamburgerStatus);
                  setActivePageValue("NPS_Overall");
                }}
                icon={
                  <NPSDashboardIcon
                    bgColor={bgColorValue}
                    strokeColor={strokeColor}
                    iconName="/npsDashboard"
                    pageName={pageName}
                  />
                }
              />
            </Link>
            <div className={`mt-[10px] w-[90%] ml-auto `}>
              <Link to="/npsDashboard">
                <SidebarMiniLink
                  iconName="NPS_Analysis"
                  pageName={activePageValue}
                  linkName="NPS_Analysis"
                  onClick={() => {
                    setPageName("/npsDashboard");
                    setComponentNameValue("/npsDashboard");
                    setHamburgerStatus(!hamburgerStatus);
                    setActivePageValue("NPS_Analysis");
                  }}
                  icon={
                    <NPSDashboardIcon
                      bgColor={bgColorValue}
                      strokeColor={strokeColor}
                      iconName="NPS_Analysis"
                      pageName={activePageValue}
                    />
                  }
                />
              </Link>

              <Link to="/npsDashboard">
                <SidebarMiniLink
                  iconName="NSS_Analysis"
                  pageName={activePageValue}
                  linkName="NSS_Analysis"
                  onClick={() => {
                    setPageName("/npsDashboard");
                    setComponentNameValue("/npsDashboard");
                    setHamburgerStatus(!hamburgerStatus);
                    setActivePageValue("NSS_Analysis");
                  }}
                  icon={
                    <NPSDashboardIcon
                      bgColor={bgColorValue}
                      strokeColor={strokeColor}
                      iconName="NSS_Analysis"
                      pageName={activePageValue}
                    />
                  }
                />
              </Link>

              <Link to="/npsDashboard">
                <SidebarMiniLink
                  iconName="Comments"
                  pageName={activePageValue}
                  linkName="Comments"
                  onClick={() => {
                    setPageName("/npsDashboard");
                    setComponentNameValue("/npsDashboard");
                    setHamburgerStatus(!hamburgerStatus);
                    setActivePageValue("Comments");
                  }}
                  icon={
                    <NPSDashboardIcon
                      bgColor={bgColorValue}
                      strokeColor={strokeColor}
                      iconName="Comments"
                      pageName={activePageValue}
                    />
                  }
                />
              </Link>
            </div>
          </div>

          <div className="mb-[30px]">
            <Link to="/engagementModel">
              <SidebarLink
                iconName="/engagementModel"
                pageName={pageName}
                linkName="Engagement Model"
                onClick={() => {
                  setPageName("/engagementModel");
                  setComponentNameValue("/engagementModel");
                  setHamburgerStatus(!hamburgerStatus);
                  setActivePageValue(null);
                }}
                icon={
                  <BoxIconLarge
                    bgColor={bgColorValue}
                    strokeColor={strokeColor}
                    iconName="/engagementModel"
                    pageName={pageName}
                  />
                }
              />
            </Link>
          </div>

          <div className="mb-[30px]">
            <Link to="/SDOH">
              <SidebarLink
                iconName="/SDOH"
                pageName={pageName}
                linkName="SDOH"
                onClick={() => {
                  setPageName("/SDOH");
                  setComponentNameValue("/SDOH");
                  setHamburgerStatus(!hamburgerStatus);
                  setActivePageValue(null);
                }}
                icon={
                  <BoxIconLarge
                    bgColor={bgColorValue}
                    strokeColor={strokeColor}
                    iconName="/SDOH"
                    pageName={pageName}
                  />
                }
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
