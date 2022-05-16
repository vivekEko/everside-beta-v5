import { atom } from "recoil";

const regionStatus = atom({
  key: "regionStatus", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export default regionStatus;
