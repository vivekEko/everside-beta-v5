import { atom } from "recoil";

const NPSLoaderStatus = atom({
  key: "NPSLoaderStatus", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export default NPSLoaderStatus;
