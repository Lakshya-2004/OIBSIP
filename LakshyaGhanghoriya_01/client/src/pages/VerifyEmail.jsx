// pages/VerifyEmail.jsx

import {
  useEffect,
  useState,
} from "react";

import {
  useSearchParams,
  Link,
} from "react-router-dom";

import api from "../services/api";

function VerifyEmail() {
  const [searchParams] =
    useSearchParams();

  const [loading, setLoading] =
    useState(true);

  const [success, setSuccess] =
    useState(false);

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    verifyUserEmail();
  }, []);

  const verifyUserEmail = async () => {
    try {
      const token =
        searchParams.get("token");

      if (!token) {
        setMessage(
          "Invalid verification link"
        );

        setLoading(false);

        return;
      }

      const { data } = await api.post(
        "/auth/verify-email",
        {
          token,
        }
      );

      setSuccess(true);

      setMessage(
        data.message ||
          "Email verified successfully 🎉"
      );
    } catch (error) {
      setSuccess(false);

      setMessage(
        error.response?.data?.message ||
          "Verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

          *{
            box-sizing:border-box;
          }

          body{
            margin:0;
            padding:0;
            background:#0b0b0b;
          }

          .verify-page{
            min-height:100vh;
            overflow:hidden;
            position:relative;

            background:
              radial-gradient(circle at top left, rgba(255,77,45,0.18), transparent 35%),
              radial-gradient(circle at bottom right, rgba(255,140,0,0.15), transparent 35%),
              #0b0b0b;

            display:flex;
            justify-content:center;
            align-items:center;

            padding:30px 20px;

            font-family:'DM Sans',sans-serif;
          }

          /* FLOATING FOOD */

          .food{
            position:absolute;
            opacity:0.14;
            filter:blur(1.5px);
            animation:float 8s ease-in-out infinite;
            user-select:none;
            pointer-events:none;
          }

          .food1{
            top:5%;
            left:5%;
            font-size:110px;
          }

          .food2{
            top:10%;
            right:7%;
            font-size:120px;
            animation-delay:1s;
          }

          .food3{
            bottom:8%;
            left:10%;
            font-size:115px;
            animation-delay:2s;
          }

          .food4{
            bottom:12%;
            right:10%;
            font-size:95px;
            animation-delay:3s;
          }

          .food5{
            top:48%;
            left:-15px;
            font-size:75px;
            animation-delay:4s;
          }

          .food6{
            top:50%;
            right:-10px;
            font-size:80px;
            animation-delay:5s;
          }

          .food7{
            top:28%;
            left:22%;
            font-size:65px;
            animation-delay:2s;
          }

          .food8{
            bottom:24%;
            right:24%;
            font-size:72px;
            animation-delay:3s;
          }

          .food9{
            top:70%;
            left:40%;
            font-size:85px;
            animation-delay:5s;
          }

          .food10{
            top:18%;
            left:48%;
            font-size:90px;
            animation-delay:6s;
          }

          @keyframes float{
            0%{
              transform:translateY(0px) rotate(0deg);
            }

            50%{
              transform:translateY(-20px) rotate(8deg);
            }

            100%{
              transform:translateY(0px) rotate(0deg);
            }
          }

          /* CARD */

          .verify-card{
            width:100%;
            max-width:520px;

            position:relative;
            z-index:10;

            background:rgba(18,18,18,0.92);

            backdrop-filter:blur(18px);

            border:1px solid rgba(255,255,255,0.08);

            border-radius:32px;

            padding:50px 40px;

            overflow:hidden;

            box-shadow:
              0 25px 80px rgba(0,0,0,0.55),
              0 0 0 1px rgba(255,255,255,0.03);
          }

          .verify-card::before{
            content:'';

            position:absolute;

            width:260px;
            height:260px;

            background:
              radial-gradient(circle,
              rgba(255,77,45,0.25),
              transparent 70%);

            top:-120px;
            right:-80px;

            z-index:0;
          }

          .verify-card::after{
            content:'';

            position:absolute;

            width:220px;
            height:220px;

            background:
              radial-gradient(circle,
              rgba(255,140,0,0.18),
              transparent 70%);

            bottom:-120px;
            left:-80px;

            z-index:0;
          }

          .verify-content{
            position:relative;
            z-index:2;
            text-align:center;
          }

          .brand{
            display:flex;
            justify-content:center;
            align-items:center;
            gap:12px;

            margin-bottom:28px;
          }

          .brand-logo{
            width:58px;
            height:58px;

            border-radius:18px;

            background:
              linear-gradient(135deg,#ff4d2d,#ff8c00);

            display:grid;
            place-items:center;

            font-size:28px;

            box-shadow:
              0 10px 30px rgba(255,77,45,0.35);
          }

          .brand-title{
            font-family:'Syne',sans-serif;
            font-size:28px;
            font-weight:800;
            letter-spacing:-0.5px;
          }

          .brand-title span{
            color:#ff4d2d;
          }

          .status-icon{
            width:120px;
            height:120px;

            margin:0 auto 24px;

            border-radius:50%;

            display:grid;
            place-items:center;

            font-size:58px;

            background:
              rgba(255,255,255,0.04);

            border:
              1px solid rgba(255,255,255,0.06);

            animation:pulse 2s infinite;
          }

          .success{
            box-shadow:
              0 0 35px rgba(34,197,94,0.25);
          }

          .error{
            box-shadow:
              0 0 35px rgba(239,68,68,0.25);
          }

          .loading{
            box-shadow:
              0 0 35px rgba(59,130,246,0.25);
          }

          @keyframes pulse{
            0%{
              transform:scale(1);
            }

            50%{
              transform:scale(1.05);
            }

            100%{
              transform:scale(1);
            }
          }

          .verify-title{
            margin:0 0 12px;

            font-size:34px;
            font-weight:800;

            color:#fff;

            line-height:1.2;
          }

          .verify-subtitle{
            margin:0 auto 30px;

            color:rgba(255,255,255,0.6);

            font-size:15px;

            line-height:1.7;

            max-width:380px;
          }

          .verify-btn{
            display:inline-flex;
            justify-content:center;
            align-items:center;

            gap:10px;

            width:100%;

            padding:15px 20px;

            border-radius:16px;

            text-decoration:none;

            background:
              linear-gradient(135deg,#ff4d2d,#ff8c00);

            color:#fff;

            font-size:15px;
            font-weight:700;

            transition:0.35s;

            box-shadow:
              0 10px 30px rgba(255,77,45,0.28);
          }

          .verify-btn:hover{
            transform:
              translateY(-3px) scale(1.02);

            box-shadow:
              0 18px 40px rgba(255,77,45,0.38);
          }

          .mini-badge{
            display:inline-flex;
            align-items:center;
            gap:8px;

            padding:10px 16px;

            border-radius:30px;

            margin-bottom:24px;

            background:
              rgba(255,77,45,0.12);

            border:
              1px solid rgba(255,77,45,0.18);

            color:#ff9a76;

            font-size:13px;
            font-weight:600;
          }

          .loading-dots{
            display:flex;
            justify-content:center;
            gap:8px;
            margin-top:10px;
          }

          .loading-dots span{
            width:10px;
            height:10px;

            border-radius:50%;

            background:#ff4d2d;

            animation:bounce 1s infinite;
          }

          .loading-dots span:nth-child(2){
            animation-delay:0.2s;
          }

          .loading-dots span:nth-child(3){
            animation-delay:0.4s;
          }

          @keyframes bounce{
            0%,80%,100%{
              transform:scale(0.7);
              opacity:0.5;
            }

            40%{
              transform:scale(1.1);
              opacity:1;
            }
          }

          @media(max-width:600px){

            .verify-card{
              padding:40px 24px;
              border-radius:26px;
            }

            .verify-title{
              font-size:28px;
            }

            .status-icon{
              width:100px;
              height:100px;
              font-size:50px;
            }

            .brand-title{
              font-size:24px;
            }
          }
        `}
      </style>

      <div className="verify-page">

        {/* FLOATING FOOD */}
        <div className="food food1">🍕</div>
        <div className="food food2">🍔</div>
        <div className="food food3">🍟</div>
        <div className="food food4">🌮</div>
        <div className="food food5">🍕</div>
        <div className="food food6">🍔</div>
        <div className="food food7">🌭</div>
        <div className="food food8">🍕</div>
        <div className="food food9">🍟</div>
        <div className="food food10">🍔</div>

        <div className="verify-card">
          <div className="verify-content">

            {/* BRAND */}
            <div className="brand">
              <div className="brand-logo">
                🍕
              </div>

              <div className="brand-title">
                Pizza
                <span>Station</span>
              </div>
            </div>

            {/* LOADING */}
            {loading ? (
              <>
                <div className="mini-badge">
                  🔄 Verifying Your Account
                </div>

                <div className="status-icon loading">
                  📧
                </div>

                <h2 className="verify-title">
                  Verifying Email...
                </h2>

                <p className="verify-subtitle">
                  Please wait while we securely
                  verify your email address and
                  activate your account.
                </p>

                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </>
            ) : success ? (
              <>
                <div className="mini-badge">
                  🎉 Account Activated
                </div>

                <div className="status-icon success">
                  ✅
                </div>

                <h2 className="verify-title">
                  Email Verified
                </h2>

                <p className="verify-subtitle">
                  {message}
                </p>

                <Link
                  to="/login"
                  className="verify-btn"
                >
                  🍕 Continue To Login
                </Link>
              </>
            ) : (
              <>
                <div className="mini-badge">
                  ⚠️ Verification Failed
                </div>

                <div className="status-icon error">
                  ❌
                </div>

                <h2 className="verify-title">
                  Verification Failed
                </h2>

                <p className="verify-subtitle">
                  {message}
                </p>

                <Link
                  to="/register"
                  className="verify-btn"
                >
                  🔁 Back To Register
                </Link>
              </>
            )}

          </div>
        </div>
      </div>
    </>
  );
}

export default VerifyEmail;