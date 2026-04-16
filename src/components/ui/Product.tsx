import { useQuery } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
interface productType {
  id: number;
  title: string;
  image: string;
  price: number;
}
const getData = async () => {
  return await fetch("https://fakestoreapi.com/products").then((res) =>
    res.json(),
  );
};

const Product = ({
  setSession
}: {
  setSession: Dispatch<SetStateAction<string | null>>;
}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () => getData(),
  });


  return (
    <div className="container w-full py-10 mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Product</h2>
        <button
          className="px-4 py-2 text-sm font-semibold text-white bg-gray-800 rounded-md hover:bg-gray-600"
          onClick={() => setSession(null)}
        >
          Logout
        </button>
      </div>
      {!isError ? (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {isLoading ? (
            <>
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="w-full bg-gray-200 rounded-lg animate-pulse h-80"
                ></div>
              ))}
            </>
          ) : (
            <>
              {data?.map((product: productType) => (
                <div
                  key={`product-${product.id}`}
                  className="flex flex-col items-center p-4 border rounded-lg border-slate-100 bg-slate-50"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-cover w-full h-48 bg-white rounded-lg"
                  />
                  <p className="w-full mt-5 text-sm text-center truncate">
                    {product.title.split(" ").slice(0, 4).join(" ")}
                  </p>
                  <hr className="w-full my-4 border-gray-200" />
                  <div className="flex items-center justify-between w-full">
                    <span className="text-lg font-semibold">
                      ${product.price}
                    </span>
                    <button className="flex justify-center px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-700 w-fit">
                      buy
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-48 text-2xl bg-red-100 border border-red-200 rounded-lg">
          <p className="text-red-400">Product not found</p>
        </div>
      )}
    </div>
  );
};

export default Product;
