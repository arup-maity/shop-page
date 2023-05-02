import React from 'react'

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { AiOutlineSearch, AiOutlineUnorderedList } from 'react-icons/ai';
import { MdNotifications } from 'react-icons/md';

interface SearchInputProps {
    onSearch: (q: string) => void;
}

const Header: React.FC<SearchInputProps> = ({ onSearch }) => {

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value.trim())
    }

    return (
        <>
            <Navbar bg="white" expand='lg' className="header">
                <Container>
                    <Navbar.Brand href="/" className='p-0'>
                        <div className="brand-logo">
                            <img src="/brand-logo.jpg" alt="" className='img-fluid' />
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-lg`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                        placement="start"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                                <div className="brand-logo">
                                    <img src="/brand-logo.jpg" alt="" className='img-fluid' />
                                </div>
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Form className="header-search-box d-flex">
                                <div className="d-none d-lg-flex align-items-center">
                                    <Form.Control
                                        type="text"
                                        placeholder="Search ..."
                                        className='border-0'
                                        aria-label="Search"
                                        onChange={handleInput}
                                    />
                                    <button type='submit' className='search-btn d-flex align-items-center bg-transparent border-0'><AiOutlineSearch size={18} /></button>
                                </div>
                            </Form>
                            <Nav className="d-lg-flex align-items-md-center justify-content-lg-end flex-lg-grow-1 pe-3 ">
                                <Nav.Item className='mx-lg-3 d-flex align-items-center'>
                                    <AiOutlineUnorderedList size='20' className='me-2' />
                                    <span className='fw-semibold'>Categories</span>
                                </Nav.Item>
                                <Nav.Item className='mx-lg-3' >
                                    <div className="header-notifi-btn position-relative">
                                        <MdNotifications size={22} />
                                        <span className="pulse"></span>
                                    </div>
                                </Nav.Item>
                                <Nav.Item className='mx-lg-3' >
                                    <div className="header-user-avater">
                                        <img src="/user.jpg" alt="" />
                                    </div>
                                </Nav.Item>
                            </Nav>

                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    )
}

export default Header