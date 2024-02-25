import React, { useState, useEffect } from "react";
import Head from "next/head";
import Breadcrumb from "react-bootstrap/Breadcrumb";
// json
import productsJson from "@/fake-db/product-data";
// component
import Header from "@/components/header";
import RenderProducts from "@/components/ecommerce/shop/RenderProducts";
// icon
import { BiSliderAlt } from "react-icons/bi";
import { MdOutlineClose } from "react-icons/md";

// brand filter array list
type brandFilter = { value: string; label: string };
const brandFilter: brandFilter[] = [
  { value: "redmi", label: "Redmi" },
  { value: "apple", label: "Apple" },
  { value: "samsung", label: "Samsung" },
  { value: "asus", label: "Asus" }
];
// category filter array list
type categoryFilter = { value: string; label: string };
const categoryFilter: categoryFilter[] = [
  { value: "mobile", label: "Mobile" },
  { value: "laptop", label: "Laptop" },
  { value: "tablet", label: "Tablet" },
  { value: "earphone", label: "Earphone" }
];
// price filter array list
type priceFilter = { value: { minPrice: number; maxPrice: number }; label: string };
const priceFilter = [
  { value: { minPrice: 0, maxPrice: 100 }, label: "< $100" },
  { value: { minPrice: 100, maxPrice: 199 }, label: "$100 - $199" },
  { value: { minPrice: 200, maxPrice: 599 }, label: "$200 - 599" },
  { value: { minPrice: 600, maxPrice: 999 }, label: "$600 - $999" },
  { value: { minPrice: 1000, maxPrice: 0 }, label: "> $1000" }
];

const Home = () => {
  // state
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [products, setProducts] = useState([{}]);
  const [filter, setFilter] = useState<any>({
    q: "",
    brand: [],
    category: [],
    price: [],
    sort: ""
  });

  useEffect(() => {
    getProduct();
  }, [filter]);

  const getProduct = () => {
    const filterByName = productsJson.filter(
      (product) =>
        product.title.toLowerCase().includes(filter.q.toLowerCase()) || product.brand.toLowerCase().includes(filter.q.toLowerCase()) || product.category.toLowerCase().includes(filter.q.toLowerCase())
    );

    const filteredData = filterByName.filter((product) => {
      if (filter.brand.length > 0 && !filter.brand.includes(product.brand)) {
        return false;
      }
      if (filter.category.length > 0 && !filter.category.includes(product.category)) {
        return false;
      }
      return true;
    });

    const filterPrice = filteredData.filter((product: any) => {
      if (filter.price.length > 0) {
        for (let i = 0; i < filter.price.length; i++) {
          if (product.price >= filter.price[i].minPrice && filter.price[i].maxPrice === 0) {
            return true;
          }
          if (product.price >= filter.price[i].minPrice && product.price <= filter.price[i].maxPrice) {
            return true;
          }
        }
      } else {
        return true;
      }
    });

    const filterSort = filterPrice.sort((a, b) => {
      if (filter.sort === "price-desc") {
        return b.price - a.price;
      }
      if (filter.sort === "price-asc") {
        return a.price - b.price;
      }
      return a.id - b.id;
    });

    return setProducts(filterSort);
  };

  const handleBrand = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    const isChecked = event.target.checked;
    setFilter((prevFilters: any) => {
      const newFilters = { ...prevFilters };
      if (isChecked) {
        // for multiple select brand filter
        newFilters["brand"].push(value);
        // for single select brand filter
        // return { ...prevFilters, brand: value }
      } else {
        // for multiple select brand filter
        newFilters["brand"] = newFilters["brand"].filter((v: any) => v !== value);
        // for single select brand filter
        // return { ...prevFilters, brand: '' }
      }
      return newFilters;
    });
  };
  const handleCategory = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    const isChecked = event.target.checked;
    setFilter((prevFilters: any) => {
      const newFilters = { ...prevFilters };
      if (isChecked) {
        // for multiple select category filter
        newFilters["category"].push(value);
        // for single select category filter
        // return { ...prevFilters, category: value }
      } else {
        newFilters["category"] = newFilters["category"].filter((v: any) => v !== value); // for multiple select category filter
        // return { ...prevFilters, category: '' } // for single select category filter
      }
      return newFilters;
    });
  };
  const handlePrice = (event: React.ChangeEvent<HTMLInputElement>, value: { minPrice: number; maxPrice: number }) => {
    const isChecked = event.target.checked;
    setFilter((prevFilters: any) => {
      const newFilters = { ...prevFilters };
      if (isChecked) {
        // for multiple select price filter
        newFilters["price"].push(value);
        // for single select price filter
        // return { ...prevFilters, price: value }
      } else {
        // for multiple select price filter
        newFilters["price"] = newFilters["price"].filter((v: any) => v !== value);
        // for single select price filter
        // return { ...prevFilters, price: '' }
      }
      return newFilters;
    });
  };

  const handleSearch = (q: string) => {
    setFilter({
      ...filter,
      brand: [],
      category: [],
      price: [],
      sort: "",
      q
    });
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header onSearch={handleSearch} />
      <div className="container">
        <div className="py-3">
          <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item>Shop Page</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="row g-4">
          <div className="col-12 col-lg-3">
            <div className={`filter-sidebar-wrapper ${openFilter ? "open" : ""}`}>
              <div className="wrapper-title d-flex align-items-center justify-content-between p-3 mb-2">
                <h5 className="mb-0">Filter</h5>
                <div className="">
                  <div className="d-block d-lg-none" onClick={() => setOpenFilter((prev) => !prev)}>
                    <MdOutlineClose size={20} />
                  </div>
                </div>
                <div className="d-none d-lg-block">
                  <BiSliderAlt size="20" />
                </div>
              </div>
              <div className="filter-list px-3 pb-3">
                <div className="filter-item">
                  <div className="filter-title fw-semibold mb-2">Brands</div>
                  <ul className="list-unstyled m-0">
                    {brandFilter.map((item: any, index: any) => {
                      return (
                        <li key={index}>
                          <input type="checkbox" id={item.value} checked={filter.brand.includes(item.value)} onChange={(event) => handleBrand(event, item.value)} />
                          <label htmlFor={item.value} className="ms-2">
                            {item.label}
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <hr />
                <div className="filter-item">
                  <div className="filter-title fw-semibold mb-2">Category</div>
                  <ul className="list-unstyled m-0">
                    {categoryFilter.map((item: any) => {
                      return (
                        <li key={item.value}>
                          <input type="checkbox" id={item.value} checked={filter.category.includes(item.value)} onChange={(event) => handleCategory(event, item.value)} />
                          <label htmlFor={item.value} className="ms-2">
                            {item.label}
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <hr />
                <div className="filter-item">
                  <div className="filter-title fw-semibold mb-2">Price</div>
                  <ul className="list-unstyled">
                    {priceFilter.map((item: any, index: number) => {
                      return (
                        <li key={index}>
                          <input type="checkbox" id={`id-${index}`} checked={filter.price.includes(item.value)} onChange={(event) => handlePrice(event, item.value)} />
                          <label htmlFor={`id-${index}`} className="ms-2">
                            {item.label}
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-9">
            <div className="">
              <div className="d-flex align-items-center justify-content-between gap-4 mb-2">
                <div className="">
                  <div className="d-block d-lg-none bg-white py-1 px-3 rounded" onClick={() => setOpenFilter((prev) => !prev)}>
                    <BiSliderAlt /> Filter
                  </div>
                </div>
                <select name="product-sort" id="product-sort" className="filter-sort-input" onChange={(e) => setFilter({ ...filter, sort: e.target.value })}>
                  <option value="">Sort By</option>
                  <option value="price-desc">Price high to low</option>
                  <option value="price-asc">Price low to high</option>
                </select>
              </div>
              <div className="product-list">
                <RenderProducts products={products} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
