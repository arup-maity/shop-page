import React from "react";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { AiOutlineSearch, AiOutlineUnorderedList } from "react-icons/ai";
import { MdNotifications } from "react-icons/md";

interface SearchInputProps {
  onSearch: (q: string) => void;
}

const Header: React.FC<SearchInputProps> = ({ onSearch }) => {
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value.trim());
  };

  return (
    <>
      <Navbar bg="white" expand="lg" className="header">
        <Container>
          <Navbar.Brand href="/" className="p-0">
            <div className="brand-logo">
              <img src="/brand-logo.png" alt="" className="img-fluid" />
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <Navbar.Offcanvas id={`offcanvasNavbar-expand-lg`} aria-labelledby={`offcanvasNavbarLabel-expand-lg`} placement="start">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                <div className="brand-logo">
                  <img src="/brand-logo.jpg" alt="" className="img-fluid" />
                </div>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Form className="header-search-box d-flex border rounded">
                <div className="d-flex align-items-center w-100 ">
                  <div className="d-none d-lg-flex align-items-center mx-2">
                    <AiOutlineUnorderedList size="20" className="me-2" />
                    <span className="fw-semibold">Categories</span>
                  </div>
                  <Form.Control type="text" placeholder="Search ..." className="border-0" aria-label="Search" onChange={handleInput} />
                  <button type="submit" className="search-btn d-flex align-items-center bg-transparent border-0">
                    <AiOutlineSearch size={18} />
                  </button>
                </div>
              </Form>
              <Nav className="d-none d-lg-flex align-items-md-center justify-content-lg-end flex-lg-grow-1 pe-3 ">
                <Nav.Item className="mx-lg-3">
                  <div className="header-user-avater">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      height="1.5em"
                      width="1.5em"
                      xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="8" r="5"></circle>
                      <path d="M20 21a8 8 0 1 0-16 0"></path>
                    </svg>
                  </div>
                </Nav.Item>
                <Nav.Item className="mx-lg-3">
                  <div className="">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="32"
                        d="M80 176a16 16 0 0 0-16 16v216c0 30.24 25.76 56 56 56h272c30.24 0 56-24.51 56-54.75V192a16 16 0 0 0-16-16zm80 0v-32a96 96 0 0 1 96-96h0a96 96 0 0 1 96 96v32"></path>
                    </svg>
                  </div>
                </Nav.Item>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
