import { atom } from "recoil";

const endMonthValue = atom({
  key: "endMonthValue", // unique ID (with respect to other atoms/selectors)
  default: "12", // default value (aka initial value)
});

export default endMonthValue;
