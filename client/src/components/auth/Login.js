import React, { useState, useContext, useEffect } from 'react';
import {
  Menu,
  Form,
  Container,
  Message,
  Header,
  Icon,
} from 'semantic-ui-react';
import { Navigate } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import {
  useAuth,
  clearErrors,
  login,
  loadUser,
} from '../../context/auth/AuthState';

const Login = () => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [authState, authDispatch] = useAuth();
  const { error, isAuthenticated } = authState;

  useEffect(() => {
    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors(authDispatch);
    }
    loadUser(authDispatch);
  }, [error, authDispatch, setAlert]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      login(authDispatch, {
        email,
        password,
      });
    }
  };
  if (isAuthenticated) return <Navigate to='/' />;

  return (
    <Container>
      <div>
        <Header as='h2' icon textAlign='center'>
          <Icon name='users' circular />
          <Header.Content>Signin</Header.Content>
        </Header>
      </div>
      <Form onSubmit={onSubmit}>
        <Form.Input
          label='Email'
          id='email'
          name='email'
          value={email}
          onChange={onChange}
          placeholder='Email'
          type='email'
          required
        />
        <Form.Input
          label='Password'
          id='password'
          name='password'
          value={password}
          placeholder='Password'
          onChange={onChange}
          type='password'
          required
        />
        <Form.Button type='submit' value='Login'>
          Sign in
        </Form.Button>
      </Form>
    </Container>

    // <div className='form-container'>
    //   <h1>
    //     Account <span className='text-primary'>Login</span>
    //   </h1>
    //   <form onSubmit={onSubmit}>
    //     <div className='form-group'>
    //       <label htmlFor='email'>Email Address</label>
    //       <input
    //         id='email'
    //         type='email'
    //         name='email'
    //         value={email}
    //         onChange={onChange}
    //         required
    //       />
    //     </div>
    //     <div className='form-group'>
    //       <label htmlFor='password'>Password</label>
    //       <input
    //         id='password'
    //         type='password'
    //         name='password'
    //         value={password}
    //         onChange={onChange}
    //         required
    //       />
    //     </div>
    //     <input
    //       type='submit'
    //       value='Login'
    //       className='btn btn-primary btn-block'
    //     />
    //   </form>
    // </div>
  );
};

export default Login;
