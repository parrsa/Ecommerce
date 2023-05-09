import React from 'react'
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logout } from '../actions/userAction';
import SearchBox from './SearchBox';
const Header = () => {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  
  const logoutHandler = () => {
    dispatch(logout(userInfo))
  }

  return (

    <header>
      <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
        <Container>

          <LinkContainer to='/'>
            <Navbar.Brand>Shop Parsa</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox/>
            <Nav className='mr-auto'>

              <LinkContainer to='/Cart'>
                <Nav.Link ><i class="fas fa-shopping-cart"></i>Cart</Nav.Link>
              </LinkContainer>


              {
                userInfo ? (
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                  </NavDropdown>
                ) : (

                  <LinkContainer to='/Login'>
                    <Nav.Link><i className='fas fa-user'></i>Login</Nav.Link>
                  </LinkContainer>

                )}


              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id="adminname">
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>

                </NavDropdown>
              )}


            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header