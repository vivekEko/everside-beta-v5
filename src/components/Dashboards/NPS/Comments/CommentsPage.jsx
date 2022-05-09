import React from "react";
import AlertComments from "../NPS Overall Dashboard/AlertComments";
import WordFrequency from "../NPS Overall Dashboard/WordFrequency";
import Comments from "../NPS Overall Dashboard/Comments";
import Filter from "../Misc/Filter";
import CommentsTotalcards from "./CommentsTotalcards";
import TotalComments from "./TotalComments";
import Allalerts from "./Allalerts";

const CommentsPage = () => {
  return (
    <div>
      {/* <Filter /> */}
      {/* Total Cards */}
      {/* <CommentsTotalcards /> */}

      {/* word cloud and alerts */}
      <section className="my-[30px]  flex flex-col-reverse lg:flex-row justify-center gap-[18px]">
        <TotalComments />
        <div className=" lg:w-[45%]">
          <CommentsTotalcards />
          <Allalerts />
        </div>
      </section>
      {/* <section className="my-[30px]  flex flex-col sm:flex-row justify-center gap-[18px]">
        <Comments />
      </section> */}
    </div>
  );
};

export default CommentsPage;
