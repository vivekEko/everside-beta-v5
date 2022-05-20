import { atom } from "recoil";

const startDateValue = atom({
  key: "startDateValue", // unique ID (with respect to other atoms/selectors)
  default: "2014", // default value (aka initial value)
});

export default startDateValue;
