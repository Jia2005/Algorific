import React from 'react';

function Login() {
  return (
    <form name="login" method="post" action="log.php">
      <br /><br />
      <h1 align="center" style={{ color: 'white' }}>Welcome</h1>
      <br />
      <label>
        <span style={{ color: 'white' }}>Email</span>
        <input className='in' type="email" name="Email" placeholder="Enter Email Address" style={{ fontSize: '16px' }} />
      </label>
      <br />
      <label>
        <span style={{ color: 'white' }}>Password</span>
        <input className='in' type="password" name="Password" placeholder="Enter Password" style={{ fontSize: '16px' }} />
      </label>
      <p className="forgot-pass"><a href="k.html" style={{ color: 'white' }}>Forgot password?</a></p>
      <br />
      <div>
        <button type="submit" className="submit btn" style={{ backgroundColor: '#000000', color: 'rgb(255, 255, 255)' }}>
          Sign In
        </button>
      </div>
    </form>
  );
}

export default Login;
