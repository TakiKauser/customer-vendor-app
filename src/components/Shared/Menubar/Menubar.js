import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

const Menubar = () => {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand className='fw-bold'>
                        <Nav.Link href="/">cus-vend</Nav.Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mx-auto">
                        <Nav.Link href="/">Home</Nav.Link>

                            <NavDropdown title="Products" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="category">Category</NavDropdown.Item>
                                <NavDropdown.Item href="category_list">Category List</NavDropdown.Item>
                                <NavDropdown.Item href="products">Products</NavDropdown.Item>
                                <NavDropdown.Item href="product_list">Product List</NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="Parties" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="customer">Customer</NavDropdown.Item>
                                <NavDropdown.Item href="vendor">Vendor</NavDropdown.Item>
                                <NavDropdown.Item href="customer_list">Customer List</NavDropdown.Item>
                                <NavDropdown.Item href="vendor_list">Vendor List</NavDropdown.Item>

                            </NavDropdown>
                            
                            <Nav.Link href="#hsCode">HS_Code</Nav.Link>
                            <Nav.Link href="purchase">Purchase</Nav.Link>
                            {/* <Link to="/hsCode" activeStyle={{ color: 'yellow', fontWeight: 'bold' }} className="navlink">hs_code</Link> */}
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Menubar;