import React from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "./LoadingComponent";

export default function ProductDetails() {
  let { id } = useParams();

  const url = `https://world.openfoodfacts.org/api/v0/product/${id}.json`;

  const fetchPizza = () => fetch(url).then((res) => res.json());

  const { isLoading, isError, error, data, isFetching } = useQuery(
    ["pizza", id],
    () => fetchPizza(),
    { keepPreviousData: true }
  );

  return (
    <div>
      {isLoading ? (
        <LoadingComponent />
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div className="flex  justify-center mt-4">
          <div class="max-w-4xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
            <img
              class="object-cover w-full h-64"
              src={data.product.image_url}
              alt="Pizza"
            />

            <div class="p-6">
              <div>
                <span
                  class="text-xs font-medium text-blue-600 uppercase dark:text-blue-400 truncate"
                  title={data.product.countries}
                >
                  {data.product.brands} - {data.product.countries}
                </span>
                <p class="block mt-2 text-2xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600">
                  {data.product.product_name}
                </p>
              </div>

              <div class="mt-4">
                <div class="flex flex-col items-center">
                  <p className="font-semibold ">Ingredients:</p>
                  <div className="grid gap-2 mt-8 grid-cols-5">
                    {data.product.ingredients_hierarchy.map((ing) => {
                      return (
                        <p className="truncate" title={ing}>
                          {ing}
                        </p>
                      );
                    })}
                  </div>
                  <img
                    className="mt-2"
                    src={data.product.image_ingredients_url}
                  />
                </div>

                <div class="flex flex-col items-center mt-2.5">
                  <p className="font-semibold">Allergens:</p>

                  <div className="grid gap-2 mt-8 grid-cols-5">
                    {data.product.allergens_hierarchy.map((alg) => {
                      return (
                        <p className="truncate" title={alg}>
                          {alg}
                        </p>
                      );
                    })}
                  </div>
                  <img
                    className="mt-2"
                    src={data.product?.image_allergens_url}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
