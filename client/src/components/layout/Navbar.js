import { Menu, Search, Dropdown } from 'semantic-ui-react';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useAuth, logout } from '../../context/auth/AuthState';

const Navbar = ({ title, icon }) => {
  const [authState, authDispatch] = useAuth();
  const { isAuthenticated, user } = authState;

  const onLogout = () => {
    logout(authDispatch);
  };

  // const authLinks = (
  //   <Fragment>
  //     <li>
  //       <Link to='/'>Shared</Link>
  //     </li>
  //     <li>
  //       <Link to='/department'>Department</Link>
  //     </li>
  //     <li>
  //       <Link to='/user'>User</Link>
  //     </li>
  //     <li>
  //       <Link to='/new'>New</Link>
  //     </li>
  //     <li>
  //       <Link to='/userProfile'>UserProfile</Link>
  //     </li>
  //     <li>
  //       <Link onClick={onLogout} to='/login'>
  //         <i className='fas fa-sign-out-alt' />{' '}
  //         <span className='hide-sm'>Logout</span>
  //       </Link>
  //     </li>
  //     <li>Hello {user && user.name}</li>
  //   </Fragment>
  // );

  // const guestLinks = (
  //   <Fragment>
  //     <li>
  //       <Link to='/'>Shared</Link>
  //     </li>
  //     <li>
  //       <Link to='/register'>Register</Link>
  //     </li>
  //     <li>
  //       <Link to='/login'>Login</Link>
  //     </li>
  //   </Fragment>
  // );

  return (
    <Menu style={{ backgroundColor: 'black', color: 'white' }}>
      <Menu.Menu position='left'>
        {isAuthenticated ? ( // 如果有登入的話
          <Menu.Item as={Link} to='/' style={{ color: 'white' }}>
            Shared Document
          </Menu.Item>
        ) : (
          <Menu.Item as={Link} to='/' style={{ color: 'white' }}>
            Shared Document
          </Menu.Item>
        )}
      </Menu.Menu>

      <Menu.Item>
        <Search />
      </Menu.Item>
      <Menu.Item
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'white',
        }}
      >
        <h2> TSMC Document</h2>
      </Menu.Item>

      <Menu.Menu position='right'>
        {isAuthenticated ? (
          <>
            <Menu.Item as={Link} to='/new' style={{ color: 'white' }}>
              發表文章
            </Menu.Item>{' '}
            {/* <Menu.Item as={Link} to='/department' style={{ color: 'white' }}>
              Main page
            </Menu.Item>{' '}
            <Menu.Item as={Link} to='/user' style={{ color: 'white' }}>
              View
            </Menu.Item> */}
            <Dropdown item text={user && user.name} style={{ color: 'white' }}>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={onLogout}
                  style={{ color: 'white' }}
                  as={Link}
                  to='/login'
                >
                  Logout
                </Dropdown.Item>
                {/* <Dropdown.Item as={Link} to='/'>
                  Main page
                </Dropdown.Item>
                <Dropdown.Item>想到在加</Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>
          </>
        ) : (
          <>
            <Menu.Item as={Link} to='/login' style={{ color: 'white' }}>
              Sign in
            </Menu.Item>{' '}
            <Menu.Item as={Link} to='/register' style={{ color: 'white' }}>
              Register
            </Menu.Item>
          </>
        )}
      </Menu.Menu>
    </Menu>

    // <div className='navbar bg-primary'>
    //   <h1>
    //     <Link to='/'>
    //       <i className={icon} /> {title}
    //     </Link>
    //   </h1>
    //   <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    // </div>
  );
};

// Navbar.protoTypes = {
//   title: PropTypes.string.isRequired,
//   icon: PropTypes.string,
// };

// Navbar.defaultProps = {
//   title: 'TSMC',
//   icon: 'fas fa-id-card-alt',
// };

export default Navbar;
