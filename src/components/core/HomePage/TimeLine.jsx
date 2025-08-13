import React from "react";
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import auntyimg from "../../../assets/Images/TimelineImage.png";

const TimeLineData = [
  {
    logo: logo1,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    logo: logo2,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    logo: logo3,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    logo: logo4,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
];

const TimeLine = () => {
  return (
    <div>
      <div className="flex flex-row gap-16 items-center mb-11">
        {/* left section div */}
        <div className="w-[45%]flex flex-col gap-5">
          {TimeLineData.map((element, index) => {
            return (
              <div className="flex flex-row gap-10 mb-12" key={index}>
                <div className="w-[50px] h-[50px] bg-white flex items-center">
                  <img src={element.logo} className="m-auto" />
                </div>

                <div>
                  <h2 className="font-semibold text-[18px]">
                    {element.heading}
                  </h2>
                  <p className="text-base">{element.Description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* right section div */}
        <div className="relative shadow-blue-200 mb-11">
          <img src={auntyimg} className="shadow-white object-cover h-fit" />
          <div className="absolute bg-caribbeangreen-700 flex flex-row text-white uppercase p-9 left-[50%] translate-x-[-50%] translate-y-[-30%] " >
            <div className="flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7">
              <p className="font-bold text-3xl">10</p>
              <p className="text-caribbeangreen-300 text-sm">Year of experience</p>
            </div>

             <div className="flex flex-row gap-5 items-center  px-7">
              <p className="font-bold text-3xl">250</p>
              <p className="text-caribbeangreen-300 text-sm">Type of courses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;

