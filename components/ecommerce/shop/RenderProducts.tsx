import Link from 'next/link'
import React, { useState } from 'react'

import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'


import { AiFillStar, AiOutlineHeart, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import Rating from '@/components/rating'

const RenderProducts = ({ products }: any) => {

    const [Paged, setPaged] = useState(1)
    const [perPage, setPerPage] = useState(6)

    const renderPageItems = () => {
        const arrLength = products.length !== 0 ? Number(products.length) / perPage : 1

        return new Array(Math.ceil(arrLength)).fill(0).map((item, index) => {
            return (
                <PaginationItem
                    key={index}
                    active={Paged === index + 1}
                    onClick={() => setPaged(index + 1)}
                >
                    <PaginationLink href='/' onClick={e => e.preventDefault()}>
                        {index + 1}
                    </PaginationLink>
                </PaginationItem>
            )
        })
    }

    return (
        <>
            <div className="row g-4">
                {
                    products && products?.slice((Paged - 1) * perPage, Paged * perPage).map((item: any, index: number) => {
                        return (
                            <div key={index} className="col-lg-4">
                                <div className="single-product bg-white">
                                    <div className="image-container p-2">
                                        <div className="image-50">
                                            <img src={item.thumbnail} alt="" />
                                        </div>
                                        <div className="wishlist-btn">
                                            <AiOutlineHeart size='22' />
                                        </div>
                                    </div>
                                    <div className="product-content p-2">
                                        <div className='product-title text-truncate'>
                                            <Link href={`/${item.title}`}>{item.title}</Link>
                                        </div>
                                        <div className='product-category'>{item.category}</div>
                                        <div className="product-rating d-flex align-items-center">
                                            <Rating count={5} value={item.rating} size={17} />
                                            {
                                                item.review && <span className='ms-2'>({item.review})</span>
                                            }
                                        </div>
                                        <div className="product-price mt-2">
                                            <strong>${item.price}</strong>
                                            {
                                                item.regularPrice && <del>${item.regularPrice}</del>
                                            }
                                            {
                                                item.discount && <span>{Math.ceil(item.discount)}% off</span>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <Pagination className='d-flex justify-content-center ecommerce-shop-pagination mt-5'>
                <PaginationItem className='prev-item' onClick={() => setPaged(1)}>
                    <PaginationLink href='/' onClick={e => e.preventDefault()}><AiOutlineLeft /></PaginationLink>
                </PaginationItem>
                {renderPageItems()}
                <PaginationItem className='next-item' onClick={() => setPaged(Math.ceil(Number(products.length) / perPage))}>
                    <PaginationLink href='/' onClick={e => e.preventDefault()}><AiOutlineRight /></PaginationLink>
                </PaginationItem>
            </Pagination>
        </>
    )
}

export default RenderProducts