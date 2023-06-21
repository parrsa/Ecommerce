// import React from 'react'
// import { Link } from 'react-router-dom';
// import { LinkContainer } from 'react-router-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import { logout } from '../actions/userAction';
// import SearchBox from './SearchBox';
// import { Row, Col } from 'react-bootstrap';
// const Header = () => {

//   const userLogin = useSelector(state => state.userLogin)
//   const { userInfo } = userLogin;

//   const cart = useSelector(state => state.cart)
//   const { cartItems } = cart;

//   const dispatch = useDispatch();

//   const logoutHandler = () => {
//     dispatch(logout(userInfo, cartItems))
//   }

//   return (

//     // <header>
//     //   <Navbar class="nav" bg='dark' className=' d-flex h-25  ' dir='rtl' variant='dark' expand="lg" collapseOnSelect>
//     //     <Container>
//     //       <div className=''>
//     //         <LinkContainer to='/'>
//     //           <Navbar.Brand  >
//     //             <div id='logo'>
//     //               <p className='logo'>Shop Parsa</p>
//     //             </div>
//     //           </Navbar.Brand>
//     //         </LinkContainer>
//     //       </div>
//     //       <SearchBox />
//     //       <div>
//     //         <Navbar.Toggle aria-controls="basic-navbar-nav" />

//     //         <Navbar.Collapse id="basic-navbar-nav">
//     //           <Nav className='mr-auto'>

//     //             <LinkContainer to='/Cart'>
//     //               <Nav.Link ><i class="fas fa-shopping-cart p-1"></i></Nav.Link>
//     //             </LinkContainer>

//     //             {
//     //               userInfo ? (
//     //                 <NavDropdown title={userInfo.name} className='p-1' id="username">
//     //                   <LinkContainer to='/profile'>
//     //                     <NavDropdown.Item>پروفایل</NavDropdown.Item>
//     //                   </LinkContainer>

//     //                   <NavDropdown.Item onClick={logoutHandler}>خروج</NavDropdown.Item>

//     //                 </NavDropdown>
//     //               ) : (

//     //                 <LinkContainer to='/Login'>
//     //                   <Nav.Link className='border rounded'><i className='fas fa-user'></i><span className='me-2'>ورود / سیستم</span></Nav.Link>
//     //                 </LinkContainer>

//     //               )}


//     //             {userInfo && userInfo.isAdmin && (
//     //               <NavDropdown title='پنل مدیریت' id="adminname">
//     //                 <LinkContainer to='/admin/userlist'>
//     //                   <NavDropdown.Item>کاربران</NavDropdown.Item>
//     //                 </LinkContainer>

//     //                 <LinkContainer to='/admin/productlist'>
//     //                   <NavDropdown.Item>محصولات</NavDropdown.Item>
//     //                 </LinkContainer>

//     //                 <LinkContainer to='/admin/orderlist'>
//     //                   <NavDropdown.Item>سفارشات</NavDropdown.Item>
//     //                 </LinkContainer>

//     //               </NavDropdown>
//     //             )}
//     //           </Nav>
//     //         </Navbar.Collapse>
//     //       </div>
//     //     </Container>
//     //   </Navbar>
//     // </header>

//   )
// }

// export default Header



import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userAction';
import SearchBox from './SearchBox';

function NavScrollExample() {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin;

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout(userInfo, cartItems))
  }

  return (
    <Navbar className=' ' bg="" variant='light' expand="lg" >
      <Container className=''>
        <Navbar.Brand href="#">shop</Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <div className='w-100  '>
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
           <LinkContainer to='/'>
              <Nav.Link  href="#action1">صفحه اصلی</Nav.Link>
           </LinkContainer>

              {/* <NavDropdown title="مصحولات" style={{ marginRight: "0px" }} id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">لپ تاپ</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  موبایل
                </NavDropdown.Item>
                <NavDropdown.Item href="#action5">
                  تبلت
                </NavDropdown.Item>
              </NavDropdown> */}
              <SearchBox />
            </Nav>
          </div>

          <div className='button-cat-login' id='button-cat-login'>
            <LinkContainer to='/Cart'>
              <Button className='btn-cart border rounded'><i class="fas fa-shopping-cart p-1"></i>سبد خرید</Button>
            </LinkContainer>

            {
              userInfo ? (
                <NavDropdown title={userInfo.name} className='p-1' id="username">
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>پروفایل</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>خروج</NavDropdown.Item>

                </NavDropdown>
              ) : (

                <LinkContainer to='/Login'>
                  <Button className='btn-login border rounded'><i className='fas fa-user'></i><span className='me-2'>ورود / سیستم</span></Button>
                </LinkContainer>

              )}


            {userInfo && userInfo.isAdmin && (
              <NavDropdown title='پنل مدیریت' id="adminname">
                <LinkContainer to='/admin/userlist'>
                  <NavDropdown.Item>کاربران</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to='/admin/productlist'>
                  <NavDropdown.Item>محصولات</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to='/admin/orderlist'>
                  <NavDropdown.Item>سفارشات</NavDropdown.Item>
                </LinkContainer>

              </NavDropdown>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;