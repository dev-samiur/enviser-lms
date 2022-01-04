import React from 'react';
import { StarIcon } from '@heroicons/react/solid';
import Link from 'next/link';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Products = ({ products }) => {
  return (
    <div className="bg-white mt-20">
      <div className="max-w-7xl mx-auto overflow-hidden sm:px-6 lg:px-8">
        <h2 className="mt-20 mb-20 text-3xl text-gray-900 font-extrabold tracking-tight sm:text-4xl">
          Courses
        </h2>

        <div className="-mx-px border-l border-gray-200 grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative p-4 border-r border-b border-gray-200 sm:p-6"
            >
              <div
                className="rounded-lg overflow-hidden bg-gray-200 aspect-w-1 aspect-h-1 group-hover:opacity-75"
                style={{ height: 200 }}
              >
                <img
                  src={`./venues/${product.thumbnail}`}
                  alt={product.imageAlt}
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <div className="pt-10 pb-4 text-center">
                <h3 className="text-sm font-medium text-gray-900">
                  <Link href={`/product/${product.id}`}>{product.title}</Link>
                </h3>
                <div className="mt-3 flex flex-col items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          3.5 > rating ? 'text-yellow-400' : 'text-gray-200',
                          'flex-shrink-0 h-5 w-5'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-base font-medium text-gray-900">
                  {product.price} BDT
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
