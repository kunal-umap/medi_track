import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './LoginSignup.css';
import { loginAction, signupAction } from '@/container/action';
import { useNavigate } from 'react-router-dom';

function LoginSignup() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    let values = {
      email,
      password,
      conformPassword: password,
      username
    }
    const validate = dispatch(signupAction(values));

    validate
      .then((data: any) => {
        console.log(data)
        navigate('/login-signup');
      })
      .catch((error: any) => {
        alert(error.err);
      })
      setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    let values = {
      email,
      password,
    }
    console.log(values)
    const validate = dispatch(loginAction(values));

    validate
      .then((data: any) => {
        console.log(data)
        navigate('/');
      })
      .catch((error: any) => {
        alert(error.err);
      })

  };
  const handleSignIN = ()=>{
    setIsSignUpMode(false);
  }
  const handleSignUP = ()=>{
    setIsSignUpMode(true);

  }

  return (
    <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="email" onChange={e => setemail(e.target.value)} />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" onChange={e => setpassword(e.target.value)} />
            </div>
            <input type="submit" value="Login" className="btn solid" onClick={handleSignInClick}/>
            {/* <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div> */}
          </form>
          <form action="#" className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" onChange={e => setusername(e.target.value)} />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" onChange={e => setemail(e.target.value)} />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" onChange={e => setpassword(e.target.value)} />
            </div>
            <input type="submit" className="btn" value="Sign up" onClick={handleSignUpClick} />
            {/* <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div> */}
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button className="btn transparent" onClick={handleSignUP}>
              Sign up
            </button>
          </div>
          <img src="img/log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button className="btn transparent"  onClick={handleSignIN}>
              Sign in
            </button>
          </div>
          <img src="img/register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
