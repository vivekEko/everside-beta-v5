import React, { useEffect, useState } from "react";
import NPSDashboard from "../Dashboards/NPS/NPS Overall Dashboard/NPSDashboard";
import Auth from "./Auth";

const Home = () => {
  const [userIsValid, setUserIsValid] = useState(
    sessionStorage.getItem("useStatus")
  );

  useEffect(() => {
    console.log("validity of user:");
    console.log(userIsValid);
  }, [userIsValid]);

  return <div>{userIsValid ? <NPSDashboard /> : <Auth />}</div>;
};

export default Home;
