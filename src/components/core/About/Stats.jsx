import React from "react";
const stats = [
  { count: "5k", label: "Active Student" },
  { count: "10+", label: "Mentor" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];
const Stats = () => {
  return (
    <section>
      <div>
        <div className="text-white flex justify-evenly p-6 bg-richblack-500 text-[20px] font-bold">
          {stats.map((data, index) => {
            return (
              <div key={index} className="mb-0">
                <h1 className="text-center mb-0">{data.count}</h1>
                <h2 className="text-center mt-0">{data.label}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
