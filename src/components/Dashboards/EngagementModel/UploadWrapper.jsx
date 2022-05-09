import React from "react";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import uploadIcon from "../../../assets/img/global-img/uploadIcon.svg";

const UploadWrapper = () => {
  return (
    <div>
      <div className="w-[100%] px-5 p-3 py-5  rounded-lg bg-white mb-5">
        <h1 className=" text-left font-bold  text-lg mb-5  opacity-80 text-[#000C08]">
          Upload File
        </h1>
        <div className="border-[2px] border-dashed border-[#00ac69]  rounded-2xl  w-full flex justify-center items-center">
          <div className="">
            {/* <CloudUploadOutlinedIcon
              fontSize="large"
              className="text-blue-500 "
            /> */}
            <img
              src={uploadIcon}
              alt="upload"
              className="w-[80px] mx-auto text-center"
            />
            <p className="opacity-40">Drag & Drop your files here </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadWrapper;
