const { useState } = require("react");
const axios = require("axios");
const { auth, RecaptchaVerifier, signInWithPhoneNumber } = require("./firebase");

function App() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState("");

  // 🔹 Initialize reCAPTCHA for Firebase OTP
  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
      callback: (response) => {
        console.log("Recaptcha solved:", response);
      },
    });
  };

  // 🔹 Request OTP for Registration/Login
  const requestOtp = async () => {
    if (!phone) return setMessage("Enter a valid phone number.");

    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
      setVerificationId(confirmationResult.verificationId);
      setMessage("OTP sent successfully.");
    } catch (error) {
      console.error("Error sending OTP:", error);
      setMessage("Failed to send OTP.");
    }
  };

  // 🔹 Verify OTP & Register/Login
  const verifyOtp = async () => {
    if (!otp) return setMessage("Enter OTP.");

    try {
      const credential = auth.PhoneAuthProvider.credential(verificationId, otp);
      const userCredential = await auth.signInWithCredential(credential);
      const token = await userCredential.user.getIdToken();

      const endpoint = isRegister ? "http://localhost:5000/api/auth/register" : "http://localhost:5000/api/auth/login/verify-otp";
      const response = await axios.post(endpoint, { phone_number: phone, otp: token });

      setMessage(response.data.message);
    } catch (error) {
      console.error("OTP Verification Failed:", error);
      setMessage("Invalid OTP.");
    }
  };

  // 🔹 Login with Email & Password
  const loginWithEmail = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { emailOrPhone: email, password });
      setMessage(`Login Successful! Token: ${response.data.token}`);
    } catch (error) {
      setMessage("Invalid email or password.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>{isRegister ? "Register" : "Login"} with Phone OTP</h2>
      <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <button onClick={requestOtp}>Send OTP</button>
      <div id="recaptcha-container"></div>

      <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
      <button onClick={verifyOtp}>Verify OTP</button>

      <h2>OR</h2>

      <h2>Login with Email & Password</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={loginWithEmail}>Login</button>

      <p>{message}</p>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Switch to Login" : "Switch to Register"}
      </button>
    </div>
  );
}

export default App;
