import { atom } from "recoil";

const sendData = atom({
  key: "sendData", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export default sendData;
