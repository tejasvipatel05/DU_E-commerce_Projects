import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const LoginForm = () => {
  const apiUrl = 'http://localhost:1005/auth/login';
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(async res => {
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message || 'An error occurred');
        }
        return res.json();
      })
      .then(res => {
        if (res.error) {
          Swal.fire({
            title: 'Oops!',
            text: res.error.message || 'An error occurred. Please try again.',
            icon: 'error',
            confirmButtonColor: '#FF5733',
            background: '#fce4e4',
            color: '#900'
          });
        } else {
          localStorage.setItem('token', res.token);
          Swal.fire({
            title: 'Welcome Back!',
            text: 'You have successfully logged in.',
            icon: 'success',
            confirmButtonColor: '#4CAF50',
            background: '#f9f9f9',
            color: '#333',
            timer: 2500,
            timerProgressBar: true
          }).then(() => {
            navigate('/');
          });
        }
      })
      .catch(err => {
        console.error('Error during login:', err);
        Swal.fire({
          title: 'Oops!',
          text: err.message || 'An error occurred. Please try again.',
          icon: 'error',
          confirmButtonColor: '#FF5733',
          background: '#fce4e4',
          color: '#900'
        });
      });
  };

  return (
    <StyledWrapper>
      <header class="nav-header">
        <div class="logo-container">
          <img src="images/glowvana-logo-purple.png" alt="Logo" class="logo" />
        </div>
      </header>
      <div className="container">
        <div className="grid-container">
          <section id="back-div" className="gradient-bg">
            <div className="card">
              <h1 className="title pb-4">Log in</h1>
              <form className="form" onSubmit={handleSubmit}>
                <div>
                    <input
                      className="input"
                      type="email"
                      required
                      placeholder="Email" formControlName="email"
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                    />
                    {/* <p className="error-text">Please enter a valid email.</p> */}
                </div>
                <div>
                    <input
                      className="input"
                      type="password"
                       placeholder="Password" formControlName="password"
                      required
                      onChange={(e) => setData({ ...data, password: e.target.value })}
                    />
                    {/* <p className="error-text">Password is required (minimum 6 characters).</p> */}
                </div>
                {/* <div className="forgot-password"> */}
                <Link to="/forgot-password" className="forgot-password">Forgot your password?</Link>
                {/* </div> */}

                <button type="submit" className="login-btn">LOG IN</button>
              </form>

              <div className="signup">
                Don't have an account? <Link to="/signup">Sign up</Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </StyledWrapper>
  );
};

// const StyledWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   background-color: #f8f9fc;

//   .login-container {
//     text-align: center;
//   }

//   .logo {
//     width: 150px;
//     margin-bottom: 20px;
//   }

//   .form {
//     background-color: #fff;
//     padding: 40px;
//     border-radius: 12px;
//     box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
//     border: 2px solid transparent;
//     background-clip: padding-box;
//     position: relative;
//     max-width: 400px;
//     width: 100%;
//   }

//   .form::before {
//     content: "";
//     position: absolute;
//     top: -2px; left: -2px;
//     right: -2px; bottom: -2px;
//     z-index: -1;
//     border-radius: 12px;
//     background: linear-gradient(135deg, #CFB5D6, #2c1a33);
//   }

//   .title {
//     font-size: 22px;
//     font-weight: 600;
//     color: #2c1a33;
//     margin-bottom: 20px;
//   }

//   label {
//     display: block;
//     text-align: left;
//     margin-bottom: 15px;
//   }

//   .input {
//     width: 100%;
//     padding: 12px;
//     border-radius: 6px;
//     border: 1px solid #ccc;
//     font-size: 14px;
//     outline: none;
//   }

//   .input:focus {
//     border-color: #CFB5D6;
//   }

//   .error-text {
//     font-size: 12px;
//     color: red;
//     margin-top: 5px;
//     display: none;
//   }

//   .forgot-password {
//     text-align: right;
//     margin-bottom: 15px;
//   }

//   .forgot-password a {
//     font-size: 13px;
//     color: #2c1a33;
//     text-decoration: none;
//   }

//   .forgot-password a:hover {
//     text-decoration: underline;
//   }

//   .submit {
//     width: 100%;
//     padding: 10px;
//     border-radius: 6px;
//     border: none;
//     color: #fff;
//     font-size: 14px;
//     font-weight: 600;
//     background: linear-gradient(to right, #CFB5D6, #2c1a33);
//     cursor: pointer;
//     transition: 0.3s;
//   }

//   .submit:hover {
//     background: linear-gradient(to right, #CFB5D6, #2c1a33);
//   }

//   .signin {
//     margin-top: 15px;
//     font-size: 14px;
//   }

//   .signin a {
//     color: #2c1a33;
//     text-decoration: none;
//     font-weight: bold;
//   }

//   .signin a:hover {
//     text-decoration: underline;
//   }
// `;

const StyledWrapper = styled.div`

// body {
//             background: linear-gradient(to right, #CFB5D6 , #2c1a33);
//             height: 100vh;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//         }
//         .login-container {
//             background: white;
//             border-radius: 15px;
//             padding: 30px;
//             box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
//             max-width: 400px;
//             width: 100%;
//         }
//         .social-icons img {
//             width: 30px;
//             height: 30px;
//             cursor: pointer;
//             transition: transform 0.3s ease;
//         }
//         .social-icons img:hover {
//             transform: scale(1.1);
//         }

/* Navigation Header */
.nav-header {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    background: #fff;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.logo-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo {
    height: 60px; /* Adjust based on your logo size */
}

/* Centering and Layout */
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 100px);
    width: 100%;
    padding: 20px;
    overflow: hidden;
}

.grid-container {
    display: grid;
    gap: 20px;
    max-width: 100%;
}

/* Background */
.gradient-bg {
    width: 550px;
    background: linear-gradient(to right, #CFB5D6, #2c1a33);
    border-radius: 20px;
    padding: 20px;
}

/* Card */
.card {
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 100%;
}

/* Title */
.title {
    font-size: 2.2rem;
    font-weight: bold;
    text-align: center;
    color: #2c1a33;
}

/* Form */
.form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

label {
    color: #2c1a33;
    font-size: 1rem;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 2px solid #d1d5db;
    transition: all 0.3s;
}

input:focus {
    border: 2px solid #CFB5D6;
    outline: none;
}

/* Forgot Password */
.forgot-password {
    text-align: right;
    color: #2c1a33;
    font-size: 0.875rem;
    text-decoration: none;
}

.forgot-password:hover {
    text-decoration: underline;
    color: #CFB5D6;
}

/* Button */
.login-btn {
    width: 100%;
    padding: 12px;
    color: white;
    background: linear-gradient(to right, #CFB5D6, #2c1a33);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.login-btn:hover {
    transform: scale(1.05);
}

/* Sign Up & Terms */
.signup, .terms {
    text-align: center;
    font-size: 0.875rem;
    margin-top: 10px;
}

.signup a, .terms a {
    color: #2c1a33;
    text-decoration: none;
}

.signup a:hover, .terms a:hover {
    text-decoration: underline;
    color: #CFB5D6;
}

/* Responsive Design */
@media (max-width: 768px) {
    .container {
        min-height: calc(100vh - 100px);
        padding: 10px;
        display: flex;
        align-items: center;
    }

    .gradient-bg {
        max-width: 100%;
        padding: 15px;
    }

    .card {
        padding: 20px;
    }

    .title {
        font-size: 2rem;
    }

    input {
        padding: 10px;
    }

    .login-btn {
        padding: 10px;
    }
}

@media (max-width: 480px) {
    .container {
        min-height: 100vh;
        padding: 10px;
    }

    .title {
        font-size: 1.8rem;
    }

    .card {
        padding: 15px;
    }

    label {
        font-size: 0.9rem;
    }

    input {
        padding: 8px;
    }

    .login-btn {
        padding: 10px;
        font-size: 0.9rem;
    }

    .forgot-password {
        font-size: 0.8rem;
    }

    .signup, .terms {
        font-size: 0.8rem;
    }
}

`;

export default LoginForm;
