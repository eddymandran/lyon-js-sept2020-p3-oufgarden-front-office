import React from "react";
import { useForm } from "react-hook-form";
import "./styles/Login.scss";

const required = "This field is required";

const errorMessage = (error) => {
  return <div className="invalid-feedback">{error}</div>;
};

const LoginF = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="container">
      <div className="box">
        <h3>Client Login</h3>

        <div className="col-sm-12">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <div className="input-wrapper">
                <div className="field">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Email"
                    name="Email"
                    ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                  />
                  {errors.Email &&
                    errors.Email.type === "required" &&
                    errorMessage(required)}
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Password"
                    name="Password"
                    ref={register({ required: true })}
                  />
                  {errors.Password &&
                    errors.Password.type === "required" &&
                    errorMessage(required)}
                </div>

                <div className="form-group">
                  <button type="submit" className="button">
                    Login
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  /* const { register, handleSubmit, handleChange, errors } = useForm();

  return (
    <div className='container'>
      <div className='box'>
        <form onSubmit={handleSubmit}>
          <div className='input-wrapper'>
            <div className='field'>
              <label className='label'>Email Address</label>
              <div className='control'>
                <input
                  className='form-control'
                  type='email'
                  placeholder='Email'
                  name='Email'
                  ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                />
                {errors.Email &&
                  errors.Email.type === 'required' &&
                  errorMessage(required)}
              </div>
            </div>
            <div className='field'>
              <label className='label'>Password</label>
              <div className='control'>
                <input
                  className='form-control'
                  type='password'
                  placeholder='Password'
                  name='Password'
                  onChange={handleChange}
                  ref={register({ required: true })}
                />
                {errors.Password &&
                  errors.Password.type === 'required' &&
                  errorMessage(required)}
              </div>
            </div>

            <button type='submit' className='button'>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  ); */
};

export default LoginF;
