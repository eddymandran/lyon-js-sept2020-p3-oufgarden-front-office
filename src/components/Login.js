import React from 'react';
import './App.css';
import LoginForm from './LoginForm';

function Login() {
  const inputRefs = React.useRef([React.createRef(), React.createRef()]);

  const [/* data, */ setData] = React.useState({});

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = (e) => {
    e.preventDefault();

    let isValid = true;

    for (let i = 0; i < inputRefs.current.length; i++) {
      const valid = inputRefs.current[i].current.validate();
      console.log(valid);
      if (!valid) {
        isValid = false;
      }
    }

    if (!isValid) {
      return;
    }

    console.log('Logged In');
    //Carry on as normal
  };

  return (
    <div className='App'>
      <form onSubmit={submitForm} className='form'>
        <h1>Ouf Login</h1>
        <LoginForm
          ref={inputRefs.current[0]}
          name='username'
          label='Username:'
          onChange={handleChange}
          validation={'required|min:6|max:12'}
        />
        <LoginForm
          ref={inputRefs.current[1]}
          type='password'
          name='password'
          label='Password:'
          validation='required|min:6'
          onChange={handleChange}
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}

export default Login;
