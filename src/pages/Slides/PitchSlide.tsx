import React from "react";
import { pitchData } from "@/components/dummy";

const PitchDeck = () => {
  return (
    <div className="p-10 space-y-16 font-[Geist] bg-gray-50 text-gray-800">
      {pitchData.map((slide, index) => {
        // 🧩 Special handling for the "team" section
        if (slide.type === "team") {
          return (
            <section
              key={index}
              className="flex flex-col md:flex-row items-center gap-10 bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Left side text */}
              <div className="w-full md:w-1/2 space-y-5">
                <h2 className="text-3xl font-bold">
                  {slide.title}{" "}
                  <span className="text-[#FF5619]">{slide.highlight}</span>
                </h2>

                {slide.bullets && (
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {slide.bullets.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                )}

                <p className="italic text-gray-600 leading-relaxed">
                  {slide.paragraph}
                </p>
              </div>

              {/* Right side — team grid */}
              <div className="w-full md:w-1/2">
                <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
                  {slide.team.map((member, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center text-center"
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="rounded-lg shadow-lg w-full h-[240px] object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <p className="text-sm font-medium text-gray-800 mt-2">
                        {member.name}
                      </p>
                      <p className="text-xs text-gray-500">{member.role}</p>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-center text-gray-500 mt-4">
                  Leadership behind Flowbit
                </p>
              </div>
            </section>
          );
        }

        // 🧩 Default layout for normal slides
        return (
          <section
            key={index}
            className={`flex flex-col ${
              index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
            } items-center gap-10 bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
          >
            {/* Left side text */}
            <div className="w-full md:w-1/2 space-y-5">
              <h2 className="text-3xl font-bold">
                {slide.title}{" "}
                <span className="text-[#FF5619]">{slide.highlight}</span>
              </h2>

              {slide.bullets && (
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {slide.bullets.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              )}

              <p className="italic text-gray-600 leading-relaxed">
                {slide.paragraph}
              </p>
            </div>

            {/* Right side image */}
            <div className="w-full md:w-1/2">
              <img
                src={slide.image}
                alt={slide.caption}
                className="rounded-2xl shadow-lg w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
              />
              <p className="text-xs text-center text-gray-500 mt-2">
                {slide.caption}
              </p>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default PitchDeck;
