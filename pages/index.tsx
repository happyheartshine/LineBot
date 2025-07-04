import React, { useEffect, useState } from "react";
import liff from "@line/liff";

interface LIFFProfile {
  displayName: string;
  userId: string;
  pictureUrl?: string;
  statusMessage?: string;
}

export default function Home() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const NEXT_PUBLIC_LIFF_ID="2000385185-oJdGpm79";
  useEffect(() => {
    const initializeLIFF = async () => {
      try {
        setLoading(true);
        setError("");
        
        // Check if LIFF ID is configured
        const liffId = NEXT_PUBLIC_LIFF_ID;
        if (!liffId) {
          throw new Error("LIFF ID not configured. Please set NEXT_PUBLIC_LIFF_ID in .env.local");
        }

        console.log("Initializing LIFF with ID:", liffId);
        
        await liff.init({ liffId });
        console.log("LIFF initialized successfully");
        
        if (liff.isLoggedIn()) {
          console.log("User is logged in");
          const profile: LIFFProfile = await liff.getProfile();
          setName(profile.displayName);
        } else {
          console.log("User is not logged in, redirecting to login");
          liff.login();
        }
      } catch (err) {
        console.error("LIFF initialization error:", err);
        setError(err instanceof Error ? err.message : "Failed to initialize LIFF");
      } finally {
        setLoading(false);
      }
    };

    initializeLIFF();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "2rem", fontFamily: "Arial" }}>
        <h1>Loading...</h1>
        <p>Initializing LINE LIFF...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "2rem", fontFamily: "Arial" }}>
        <h1>Error</h1>
        <p style={{ color: "red" }}>{error}</p>
        <p>Please check your LIFF configuration in the LINE Developers Console.</p>
      </div>
    );
  }

  return (
    <div className="survey-bg">
      <div className="speech-bubble">
        アンケートにご協力ください ご意見をお聞かせください。
      </div>
      <div className="survey-box">
        <div className="survey-header">ご来店アンケート</div>
        <div className="survey-content">
          <div className="question">
            <label>Q1. 本日の接客はいかがでしたか？</label>
            <div className="emoji-row">
              <span className="emoji">😊</span>
              <span className="emoji">🙂</span>
              <span className="emoji">😐</span>
              <span className="emoji">😞</span>
              <span className="emoji">😡</span>
            </div>
          </div>
          <div className="question">
            <label>Q2. また来店したいと思いますか？</label>
            <div className="button-row">
              <button className="answer-btn">はい</button>
              <button className="answer-btn">いいえ</button>
            </div>
          </div>
          <div className="question">
            <label>Q3. ご意見・ご要望をお聞かせください</label>
            <textarea className="comment-box border-[1px] mt-2 w-full bg-[#F7F7F7]"></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
