import React, { useState } from "react";

const FilterByIngrediendsComponent = ({ setFilter, actFIlters }) => {

  const filters = [
    { value: "mozzarella", label: "Mozzarella" },
    { value: "alfredo-sauce", label: "Alfredo Sauce" },
    { value: "parmesan", label: "Parmesan" },
  ];

  return (
    <div className="lg:mx-12">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white mx-5 ">
        Filter by:{" "}
      </h1>

      <div className="mt-4 space-y-1 lg:mt-8">
        {filters.map((filter) => {
          return (
            <a
              key={filter.value}
              href="#"
              onClick={() => setFilter(filter.value)}
              className={
                "block text-gray-800 dark:text-blue-400 hover:underline px-5 py-2 rounded " +
                (actFIlters[filter.value] ? " bg-cyan-700 " : "")
              }
            >
              {filter.label}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default FilterByIngrediendsComponent;
