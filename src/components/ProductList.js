import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "./LoadingComponent";
import PaginationComponent from "./PaginationComponent";
import FilterByIngrediendsComponent from "./FilterByIngrediendsComponent";

export default function ProductList() {
  const [page, setPage] = React.useState(1);

  const [activeFilters, setActiveFilters] = useState({});
  const setFilter = (filter) => {
    if (activeFilters[filter]) {
      delete activeFilters[filter];
    } else {
      activeFilters[filter] = true;
    }
    setActiveFilters(activeFilters);
    refetch();
  };

  const url = `https://world.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=categories&tag_contains_0=contains&tag_0=pizzas&json=true`;

  const fetchPizzas = (page = 1) =>
    fetch(url + formatFilters() + `&page=${page}`).then((res) => res.json());

  const navigate = useNavigate();

  const { isLoading, isError, error, data, isFetching, refetch } = useQuery(
    ["pizzas", page],
    () => fetchPizzas(page),
    { keepPreviousData: true }
  );

  const formatFilters = () => {
    let counter = 1;
    let str = "";
    for (const property in activeFilters) {
      console.log(`${property}: ${activeFilters[property]}`);
      str += `&tagtype_${counter}=ingredients&tag_contains_${counter}=contains&tag_${counter}=${property}`;
      counter++;
    }
    return str;
  };

  return (
    <div>
      {isLoading ? (
        <LoadingComponent />
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <>
          <section className="bg-white dark:bg-gray-900">
            {isFetching ? <LoadingComponent /> : null}
            <div className="container px-6 py-12 mx-auto">
              <div className="mt-8 xl:mt-16 lg:flex lg:-mx-12">
                <FilterByIngrediendsComponent
                  setFilter={setFilter}
                  actFIlters={activeFilters}
                />

                <div className="flex-1 mt-8 lg:mx-12 lg:mt-0">
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
                    {data?.products?.map((product) => (
                      <div key={product.id}>
                        <img
                          className="object-cover w-full rounded-lg h-64 "
                          src={product.image_url}
                        />
                        <h2 className="mt-4 text-2xl font-semibold text-gray-800 capitalize dark:text-white truncate">
                          {product.product_name}
                        </h2>
                        <h3
                          className="text-md text-gray-400 capitalize dark:text-white truncate"
                          title={product.countries}
                        >
                          {product.brands} - {product.countries}
                        </h3>
                        <p
                          className="mt-2 text-center text-lg tracking-wider text-gray-700 dark:text-blue-400 cursor-pointer hover:rounded hover:bg-cyan-700"
                          onClick={() => {
                            navigate(`/details/${product.id}`);
                          }}
                        >
                          Details
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <PaginationComponent pageNumber={page} setPage={setPage} />
        </>
      )}
    </div>
  );
}
