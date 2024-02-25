import Link from "next/link";
import React, { useState } from "react";
//
import { AiFillStar, AiOutlineHeart, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Rating from "@/components/rating";
import Pagination from "@/components/pagination";

const RenderProducts = ({ products }: any) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState(6);
  const productCount = products.length;

  return (
    <>
      <div className="row g-4">
        {products &&
          products?.slice((currentPage - 1) * perPage, currentPage * perPage).map((item: any, index: number) => {
            return (
              <div key={index} className="col-12 col-md-6 col-lg-4">
                <div className="single-product bg-white">
                  <div className="image-container p-2">
                    <div className="image-50">
                      <img src={item.thumbnail} alt="" />
                    </div>
                    <div className="wishlist-btn">
                      <AiOutlineHeart size="22" />
                    </div>
                  </div>
                  <div className="product-content p-2">
                    <div className="product-title text-truncate">
                      <Link href={`/${item.title}`}>{item.title}</Link>
                    </div>
                    <div className="product-category">{item.category}</div>
                    <div className="product-rating d-flex align-items-center">
                      <Rating count={5} value={item.rating} size={17} />
                      {item.review && <span className="ms-2">({item.review})</span>}
                    </div>
                    <div className="product-price mt-2">
                      <strong>${item.price}</strong>
                      {item.regularPrice && <del>${item.regularPrice}</del>}
                      {item.discount && <span>{Math.ceil(item.discount)}% off</span>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="d-flex justify-content-center my-5">
        <Pagination totalItems={productCount} perPage={perPage} currentPage={currentPage} onChange={(page) => setCurrentPage(page)} />
      </div>
    </>
  );
};

export default RenderProducts;
