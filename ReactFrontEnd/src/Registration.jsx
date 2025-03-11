import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const RegistrationForm = () => {
  const apiUrl = 'http://localhost:1005/auth/register'
  const [data, setData] = useState({})
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission (page refresh)

    fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(async res => {
        if (!res.ok) {  // If the status code is not OK (not in 200-299 range)
          const error = await res.json();
          // Reject with the error message from the response body
          throw new Error(error.message || 'An error occurred during registration');
        }
        console.log("heree");

        return res.json(); // If status is OK, parse the response JSON
      })
      .then(res => {
        console.log("Response from API:", res);
        // If no error, proceed to store the token and show success alert
        localStorage.setItem('token', res.token); // Store the token in local storage

        Swal.fire({
          title: 'Welcome!',
          text: 'You have successfully registered.',
          icon: 'success',
          confirmButtonText: 'Continue',
          confirmButtonColor: '#4CAF50', // Green Button
          background: '#f9f9f9', // Light Background
          color: '#333', // Text Color
          timer: 2500, // Auto-close after 2.5 seconds
          timerProgressBar: true, // Show progress bar
          showClass: {
            popup: 'animate__animated animate__fadeInDown' // Fancy animation
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp' // Fancy animation
          }
        }).then(() => {
          navigate('/'); // Redirect to home page after success
        });
      })
      .catch(err => {
        console.error("Error during registration:", err);

        // Show SweetAlert2 error popup on failure (network issues, invalid data, etc.)
        Swal.fire({
          title: 'Oops!',
          text: err.message || 'An error occurred during registration. Please try again.',
          icon: 'error',
          confirmButtonText: 'Try Again',
          confirmButtonColor: '#FF5733', // Red Button
          background: '#fce4e4', // Light Red Background
          color: '#900', // Darker Red Text
          showClass: {
            popup: 'animate__animated animate__shakeX' // Shake animation for error
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOut' // Fade out animation
          }
        });
      });
  };

  return (
    <StyledWrapper>
      <header className="nav-header">
        <div className="logo-container">
          <img src="images/glowvana-logo-purple.png" alt="Logo" className="logo" />
        </div>
      </header>

      <div className="container">
        <div className="grid-container">
          <section id="back-div" className="gradient-bg">
            <div className="card">
              <h1 className="title pb-4">Sign up</h1>

              <form className="form" onSubmit={handleSubmit}>
                <div>
                  <input className="input" type="text" placeholder="Full Name"
                    formControlName="full_name"
                    required onChange={(e) => {
                      setData({ ...data, full_name: e.target.value })
                    }} />
                </div>
                <div>
                  <input className="input" type="email" placeholder="Email"
                    formControlName="email"
                    required onChange={(e) => {
                      setData({ ...data, email: e.target.value })
                    }} />
                </div>
                <div>
                  <input className="input" type="tel" placeholder="Contact"
                    formControlName="phone_number"
                    required onChange={(e) => {
                      setData({ ...data, phone_number: e.target.value })
                    }} />
                </div>
                <div>
                  <input className="input" type="password" placeholder="Password"
                    formControlName="password"
                    required onChange={(e) => {
                      setData({ ...data, password: e.target.value })
                    }} />
                </div>
                <div>
                  <input className="input" type="password" placeholder="Confirm Password"
                    formControlName="confirmpassword"
                    required onChange={(e) => {
                      setData({ ...data, confirmpassword: e.target.value })
                    }} />
                </div>
                <button className="signup-btn" type='submit'>SIGN UP</button>
              </form>
              <div className="login">
                <p>Already have an acount ? <Link className="nav-link" to="/login">Log in</Link> </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
            /* Ensure the wrapper takes full height of the screen */
            // display: flex;
            // justify-content: center;  /* Horizontally center the content */
            // align-items: center;      /* Vertically center the content */
            // height: 100vh;            /* Full viewport height */
            // background-color: #f1f1f1; /* Optional: Change the background color */

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
  }

            /* Title */
            .title {
              font - size: 2.5rem;
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
            font-size: 1.2rem;
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
            /* border-color: #CFB5D6; */
            outline: none;
  }

            /* Button */
            .signup-btn {
              width: 100%;
            padding: 12px;
            color: white;
            background: linear-gradient(to right, #CFB5D6, #2c1a33);
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: transform 0.3s ease;
  }

            .signup-btn:hover {
              transform: scale(1.05);
  }

            /* Login & Terms */
            .login, .terms {
              text-align: center;
            font-size: 0.875rem;
            margin-top: 10px;
  }

            .login a, .terms a {
              color: #2c1a33;
            text-decoration: none;
  }

            .login a:hover, .terms a:hover {
              text - decoration: underline;
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
              max - width: 100%;
            padding: 15px;
    }

            .card {
              padding: 20px;
    }

            .title {
              font - size: 2rem;
    }

            input {
              padding: 10px;
    }

            .signup-btn {
              padding: 10px;
    }
}

            @media (max-width: 480px) {
    .container {
              min - height: 100vh;
            padding: 10px;
    }

            .title {
              font - size: 1.8rem;
    }

            .card {
              padding: 15px;
    }

            label {
              font - size: 0.9rem;
    }

            input {
              padding: 8px;
    }

            .signup-btn {
              padding: 10px;
            font-size: 0.9rem;
    }

            .forgot-password {
              font - size: 0.8rem;
    }

            .login, .terms {
              font - size: 0.8rem;
    }
}

            `;

export default RegistrationForm;