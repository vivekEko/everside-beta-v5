import { atom } from "recoil";

const regionSelectedValue = atom({
  key: "regionSelectedValue", // unique ID (with respect to other atoms/selectors)
  default: "all", // default value (aka initial value)
});

export default regionSelectedValue;
