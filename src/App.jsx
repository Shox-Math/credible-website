import React, { useMemo, useState } from "react";
import logo from "./assets/credible-logo.svg";
const flagUrl = (code) => `https://flagcdn.com/w80/${code}.png`;

export default function App() {
  const [activeDemo, setActiveDemo] = useState("tuition");
  const [amount, setAmount] = useState("8000");
  const [selectedCountry, setSelectedCountry] = useState("China");
  const [countryOpen, setCountryOpen] = useState(false);
  const [connected, setConnected] = useState([]);
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi! I’m UniPay AI. Ask me about tuition deadlines, transfer routes, budgeting, credit building, rent pressure, or payment documents.",
    },
  ]);

  const dataSources = [
    { id: "enroll", icon: "🎓", title: "University enrollment", points: 180 },
    { id: "family", icon: "💸", title: "Family transfer record", points: 190 },
    { id: "rent", icon: "🏠", title: "Rent payment history", points: 160 },
    { id: "phone", icon: "📱", title: "Phone bill history", points: 120 },
    { id: "docs", icon: "📄", title: "Tuition documents", points: 200 },
  ];

  const countries = [
    { name: "China", code: "cn" },
    { name: "India", code: "in" },
    { name: "Korea", code: "kr" },
    { name: "Vietnam", code: "vn" },
    { name: "Japan", code: "jp" },
    { name: "Brazil", code: "br" },
    { name: "Thailand", code: "th" },
    { name: "Indonesia", code: "id" },
    { name: "Colombia", code: "co" },
    { name: "United Kingdom", code: "gb" },
    { name: "Philippines", code: "ph" },
    { name: "Bangladesh", code: "bd" },
    { name: "United Arab Emirates", code: "ae" },
    { name: "Spain", code: "es" },
    { name: "Nigeria", code: "ng" },
    { name: "Pakistan", code: "pk" },
    { name: "Turkey", code: "tr" },
    { name: "Mexico", code: "mx" },
    { name: "Singapore", code: "sg" },
    { name: "Malaysia", code: "my" },
    { name: "Canada", code: "ca" },
    { name: "Australia", code: "au" },
    { name: "France", code: "fr" },
    { name: "Germany", code: "de" },
    { name: "Italy", code: "it" },
    { name: "Netherlands", code: "nl" },
    { name: "Saudi Arabia", code: "sa" },
    { name: "Egypt", code: "eg" },
    { name: "South Africa", code: "za" },
    { name: "Kenya", code: "ke" },
    { name: "Chile", code: "cl" },
    { name: "Peru", code: "pe" },
    { name: "Zimbabwe", code: "zw" },
  ];

  const feeMap = {
    China: { bank: 0.038, wallet: 0.013, fixed: 18, note: "Higher FX spread and bank wire friction." },
    India: { bank: 0.029, wallet: 0.011, fixed: 14, note: "Lower remittance spread, but review speed may vary." },
    Korea: { bank: 0.025, wallet: 0.01, fixed: 12, note: "Relatively efficient payment corridor." },
    Vietnam: { bank: 0.041, wallet: 0.016, fixed: 18, note: "Medium-high spread with processing delays." },
    Japan: { bank: 0.022, wallet: 0.009, fixed: 12, note: "Lower spread but documentation can be strict." },
    Brazil: { bank: 0.045, wallet: 0.018, fixed: 22, note: "Higher volatility and wider transfer spread." },
    Thailand: { bank: 0.033, wallet: 0.014, fixed: 15, note: "Moderate transfer cost with common student payment use." },
    Indonesia: { bank: 0.039, wallet: 0.016, fixed: 18, note: "Moderate-high corridor friction and timing uncertainty." },
    Colombia: { bank: 0.044, wallet: 0.018, fixed: 20, note: "Higher spread and additional review may apply." },
    "United Kingdom": { bank: 0.021, wallet: 0.009, fixed: 11, note: "Efficient corridor with relatively clear documentation." },
    Philippines: { bank: 0.036, wallet: 0.015, fixed: 16, note: "Common remittance corridor with medium processing cost." },
    Bangladesh: { bank: 0.048, wallet: 0.02, fixed: 24, note: "Higher friction and stronger documentation needs." },
    "United Arab Emirates": { bank: 0.026, wallet: 0.011, fixed: 14, note: "Efficient corridor but bank compliance review may vary." },
    Spain: { bank: 0.024, wallet: 0.01, fixed: 13, note: "Lower spread with standard international transfer timing." },
    Nigeria: { bank: 0.052, wallet: 0.021, fixed: 25, note: "Higher corridor cost and stronger compliance review." },
    Pakistan: { bank: 0.047, wallet: 0.019, fixed: 22, note: "Higher processing friction and documentation requirements." },
    Turkey: { bank: 0.047, wallet: 0.019, fixed: 23, note: "Higher volatility creates larger avoidable cost." },
    Mexico: { bank: 0.034, wallet: 0.014, fixed: 16, note: "Moderate spread with good digital transfer options." },
    Singapore: { bank: 0.019, wallet: 0.008, fixed: 10, note: "Efficient corridor with lower average transfer cost." },
    Malaysia: { bank: 0.031, wallet: 0.013, fixed: 15, note: "Moderate corridor with reliable digital options." },
    Canada: { bank: 0.018, wallet: 0.007, fixed: 9, note: "Low-friction corridor with faster processing." },
    Australia: { bank: 0.023, wallet: 0.01, fixed: 12, note: "Stable route with moderate transfer fees." },
    France: { bank: 0.024, wallet: 0.01, fixed: 12, note: "Stable European corridor with predictable timing." },
    Germany: { bank: 0.023, wallet: 0.009, fixed: 12, note: "Efficient banking corridor with lower spread." },
    Italy: { bank: 0.026, wallet: 0.011, fixed: 13, note: "Stable route with moderate documentation needs." },
    Netherlands: { bank: 0.022, wallet: 0.009, fixed: 11, note: "Efficient European payment corridor." },
    "Saudi Arabia": { bank: 0.028, wallet: 0.012, fixed: 15, note: "Reliable corridor with possible bank review delay." },
    Egypt: { bank: 0.05, wallet: 0.021, fixed: 25, note: "Higher spread and stronger payment verification needs." },
    "South Africa": { bank: 0.043, wallet: 0.018, fixed: 21, note: "Moderate-high transfer spread and review friction." },
    Kenya: { bank: 0.046, wallet: 0.019, fixed: 22, note: "Mobile-money friendly corridor, but documentation may vary." },
    Chile: { bank: 0.039, wallet: 0.016, fixed: 18, note: "Moderate transfer cost with FX timing sensitivity." },
    Peru: { bank: 0.041, wallet: 0.017, fixed: 19, note: "Moderate-high corridor cost and receipt timing risk." },
    Zimbabwe: { bank: 0.058, wallet: 0.024, fixed: 28, note: "Higher transfer friction and stronger documentation needs." },
  };

  const selectedCountryObj =
    countries.find((country) => country.name === selectedCountry) || countries[0];

  const score = useMemo(() => {
    return connected.reduce((sum, id) => {
      const item = dataSources.find((source) => source.id === id);
      return sum + (item?.points || 0);
    }, 0);
  }, [connected]);

  const progress = Math.min(100, Math.round((score / 850) * 100));

  const profileStatus =
    score === 0
      ? "No profile yet"
      : score < 300
      ? "Early profile"
      : score < 600
      ? "Growing profile"
      : "Strong profile";

  const demoContent = {
    tuition: {
      nav: "Tuition",
      title: "Tuition command center",
      headline: "Your tuition plan is ready. One receipt still needs attention.",
      text: "UniPay checks your invoice, family transfer, school deadline, and proof of payment so you know exactly what is finished.",
      kpis: [
        ["Tuition due", "$28,500"],
        ["Deadline", "12 days"],
        ["Next step", "Receipt"],
      ],
      left: ["Invoice uploaded", "Family transfer scheduled", "School receipt pending"],
      right: ["Upload proof", "Check portal status", "Save family copy"],
    },
    transfer: {
      nav: "Transfer",
      title: "Transfer route check",
      headline: "Compare routes before your family sends money.",
      text: "UniPay helps students compare estimated cost, speed, documentation, and deadline safety before choosing a transfer method.",
      kpis: [
        ["Amount", "$8,000"],
        ["Avoidable cost", "$322"],
        ["Best route", "Low-fee"],
      ],
      left: ["Bank route checked", "Wallet route checked", "School route checked"],
      right: ["Choose lower-cost route", "Keep transfer proof", "Set payment reminder"],
    },
    budget: {
      nav: "Budget",
      title: "Campus budget safety",
      headline: "Your rent is safe, but food spending is rising.",
      text: "UniPay combines rent, food, transportation, tuition, and emergency savings into one student-friendly monthly view.",
      kpis: [
        ["Budget safety", "84%"],
        ["Emergency fund", "$2,800"],
        ["Food trend", "+14%"],
      ],
      left: ["Rent ratio safe", "Food spending rising", "Transport stable"],
      right: ["Reduce delivery", "Protect savings", "Review next rent"],
    },
    credit: {
      nav: "Credit",
      title: "Credit builder",
      headline: "Your credit habit is strong. Keep utilization below 30%.",
      text: "UniPay explains U.S. credit rules in simple language and gives reminders before students hurt their credit history.",
      kpis: [
        ["Credit habit", "92%"],
        ["Utilization", "28%"],
        ["Next due", "3 days"],
      ],
      left: ["Payment reminder on", "Utilization safe", "No late risk"],
      right: ["Pay before statement", "Keep oldest card", "Avoid extra applications"],
    },
  };

  const currentDemo = demoContent[activeDemo];
  const transferAmount = Number(amount) || 0;
  const currentFee = feeMap[selectedCountry] || feeMap.China;
  const bankFee = transferAmount * currentFee.bank + currentFee.fixed;
  const walletFee = transferAmount * currentFee.wallet + 8;
  const savings = Math.max(0, Math.round(bankFee));

  function toggleSource(id) {
    setConnected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  function aiReply(question) {
    const q = question.toLowerCase();

    if (q.includes("credit") || q.includes("score") || q.includes("fico")) {
      return "To build credit in the U.S., focus on three things: pay on time, keep credit utilization below 30%, and avoid applying for too many cards at once. UniPay can track reminders and explain which actions may help your profile.";
    }

    if (q.includes("tuition") || q.includes("installment") || q.includes("school")) {
      return "For tuition, check four things before sending money: school deadline, transfer processing time, total FX/fee cost, and whether the school accepts that payment route. If your deadline is close, choose the route with the clearest receipt.";
    }

    if (q.includes("delay") || q.includes("late") || q.includes("missing")) {
      return "If a transfer is delayed, contact the school billing office early, save the bank confirmation, upload the proof of payment, and ask whether they can place a temporary note on your account. UniPay would flag this as a deadline-risk case.";
    }

    if (q.includes("transfer") || q.includes("route") || q.includes("send") || q.includes("wire")) {
      return "A good transfer route is not just the cheapest. Compare total cost, speed, school acceptance, refund difficulty, and receipt quality. For tuition, receipt quality and deadline safety matter almost as much as the fee.";
    }

    if (q.includes("rent") || q.includes("apartment") || q.includes("lease")) {
      return "For rent, a safer range is usually below 35–40% of your monthly budget. If rent is higher, UniPay would recommend protecting an emergency fund first and reducing flexible spending like food delivery or subscriptions.";
    }

    if (q.includes("document") || q.includes("receipt") || q.includes("invoice") || q.includes("proof")) {
      return "Keep your tuition invoice, bank transfer confirmation, payment receipt, school confirmation, rent record, and family payment copy together. These documents help with school disputes, budgeting, and future financial applications.";
    }

    if (q.includes("budget") || q.includes("saving") || q.includes("spend") || q.includes("food")) {
      return "Start with fixed costs first: tuition, rent, phone, insurance, transportation, and emergency savings. Then set a weekly limit for food and lifestyle spending. UniPay can flag risky patterns before the month gets out of control.";
    }

    if (q.includes("emergency")) {
      return "For international students, a practical emergency fund is usually 1–3 months of essential costs. Start with rent plus food plus phone plus transportation, then grow it gradually before taking on extra risk.";
    }

    return "This question may need a human advisor because it depends on your school, payment provider, document status, and deadline. UniPay would collect those details first, then route you to support with your tuition, transfer, or document context already organized.";
  }

  function sendMessage(customText) {
    const clean = (customText || chatInput).trim();
    if (!clean) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: clean },
      { role: "ai", text: aiReply(clean) },
    ]);

    setChatInput("");
  }

  function joinWaitlist() {
    if (!email.trim()) return;
    const subject = encodeURIComponent("UniPay early access request");
    const body = encodeURIComponent(
      `Hi UniPay team,\n\nI would like to join the UniPay early access waitlist.\n\nMy email: ${email}\n\nThank you!`
    );
    window.location.href = `mailto:hello@unipay.app?subject=${subject}&body=${body}`;
    setJoined(true);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700;800&display=swap');

        * { box-sizing: border-box; }

        html, body, #root {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          min-height: 100% !important;
          overflow-x: hidden;
          background: #f4f8fb;
          color: #0b1933;
          font-family: Inter, Arial, sans-serif;
        }

        button, input, select { font-family: inherit; }

        .page { width: 100%; background: #f4f8fb; }

        .nav {
          height: 76px;
          width: 100%;
          padding: 0 7vw;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(255, 255, 255, 0.95);
          border-bottom: 1px solid #e4ebf3;
          backdrop-filter: blur(18px);
        }

        .brand { display: flex; align-items: center; gap: 12px; }

        .logo {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          background: linear-gradient(135deg, #18b6d0, #9be9b5);
          color: #07182c;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 950;
          box-shadow: 0 14px 30px rgba(24, 182, 208, 0.24);
        }

        .brand-name {
          font-family: Space Grotesk, Inter, sans-serif;
          font-size: 28px;
          line-height: 1;
          font-weight: 800;
          letter-spacing: -1px;
        }

        .brand-sub {
          margin-top: 4px;
          color: #64748b;
          font-size: 13px;
          font-weight: 750;
        }

        .links {
          display: flex;
          align-items: center;
          gap: 34px;
          font-size: 16px;
          font-weight: 800;
        }

        .links a { color: #5b6677; text-decoration: none; }
        .links a:hover { color: #0891b2; }

        .join {
          border: none;
          background: #f3b400;
          color: #07182c;
          padding: 15px 26px;
          border-radius: 12px;
          font-weight: 950;
          font-size: 15px;
          cursor: pointer;
          box-shadow: 0 10px 24px rgba(243, 180, 0, 0.18);
        }

        .hero {
          min-height: calc(100vh - 76px);
          width: 100%;
          padding: 92px 7vw 86px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 70px;
          align-items: center;
          background:
            radial-gradient(circle at 90% 20%, rgba(24, 182, 208, 0.24), transparent 34%),
            linear-gradient(135deg, #f8fcff 0%, #eef7fb 52%, #e7f7f2 100%);
        }

        .pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 11px 20px;
          border-radius: 999px;
          background: #e9f8fb;
          border: 1px solid #bcecf5;
          color: #0891b2;
          font-weight: 950;
          font-size: 18px;
          margin-bottom: 30px;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #18b6d0;
        }

        h1, h2 { font-family: Space Grotesk, Inter, sans-serif; }

        h1 {
          margin: 0;
          color: #0b1933;
          font-size: clamp(82px, 7.6vw, 132px);
          line-height: 0.92;
          letter-spacing: -5px;
          font-weight: 800;
        }

        .gradient {
          background: linear-gradient(90deg, #18b6d0, #50cfa6, #e6c64f);
          -webkit-background-clip: text;
          color: transparent;
        }

        .hero-note {
          margin-top: 30px;
          max-width: 760px;
          padding: 25px 28px;
          border-radius: 22px;
          background: #ffffff;
          border: 1px solid #dce7f1;
          color: #435267;
          font-size: 20px;
          line-height: 1.75;
          box-shadow: 0 22px 60px rgba(15, 23, 42, 0.06);
        }

        .actions { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 30px; }

        .primary, .secondary {
          padding: 17px 27px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 950;
          cursor: pointer;
        }

        .primary { border: none; background: #f3b400; color: #07182c; }
        .secondary { border: 1px solid #d2dde9; background: #ffffff; color: #0b1933; }

        .hero-preview {
          background: rgba(255, 255, 255, 0.96);
          border: 1px solid #dce7f1;
          border-radius: 30px;
          padding: 34px;
          box-shadow: 0 40px 90px rgba(15, 23, 42, 0.12);
        }

        .preview-title { color: #66758a; font-size: 15px; font-weight: 900; }
        .preview-headline { margin-top: 8px; font-size: 34px; font-weight: 950; letter-spacing: -1.2px; }

        .preview-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 24px;
        }

        .preview-box {
          padding: 22px;
          border-radius: 18px;
          background: #f7fbfe;
          border: 1px solid #e1e9f1;
        }

        .preview-box small {
          display: block;
          color: #718096;
          font-weight: 900;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .preview-box b { display: block; margin-top: 8px; color: #0b1933; font-size: 30px; }

        .ai-box {
          margin-top: 18px;
          padding: 28px;
          border-radius: 22px;
          background: linear-gradient(135deg, #0d2138, #20bfd8);
          color: #ffffff;
          text-align: center;
        }

        .ai-box small { color: #ffe56c; font-weight: 950; letter-spacing: 2px; }
        .ai-box h3 { margin: 12px 0; font-size: 30px; }
        .ai-box p { margin: 0; color: #e8fbff; line-height: 1.6; }

        .stats-band {
          width: 100%;
          padding: 42px 7vw;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 22px;
          background: #ffffff;
          border-top: 1px solid #e4ebf3;
          border-bottom: 1px solid #e4ebf3;
        }

        .stat {
          padding: 28px;
          border-radius: 24px;
          background: #f7fbfe;
          border: 1px solid #dce7f1;
          text-align: center;
        }

        .stat b {
          display: block;
          font-family: Space Grotesk, Inter, sans-serif;
          font-size: 46px;
          line-height: 1;
          letter-spacing: -2px;
        }

        .stat span { display: block; margin-top: 9px; color: #64748b; font-size: 16px; font-weight: 800; }

        .section { width: 100%; padding: 96px 7vw; }
        .soft { background: #f4f8fb; }
        .white { background: #ffffff; }

        .section-head { max-width: 1180px; margin: 0 auto 62px; text-align: center; }

        .section-label {
          color: #0891b2;
          font-size: 14px;
          font-weight: 950;
          letter-spacing: 3.5px;
          text-transform: uppercase;
        }

        h2 {
          margin: 14px 0 0;
          font-size: clamp(50px, 5vw, 82px);
          line-height: 1.04;
          letter-spacing: -3px;
          color: #0b1933;
        }

        .sub, .section-text {
          max-width: 840px;
          margin: 22px auto 0;
          color: #607086;
          font-size: 21px;
          line-height: 1.68;
        }

        .universities {
          padding: 50px 7vw 60px;
          background: #f4f8fb;
          border-bottom: 1px solid #e4ebf3;
          text-align: center;
        }

        .uni-row { margin-top: 26px; display: flex; justify-content: center; flex-wrap: wrap; gap: 14px; }

        .uni {
          min-width: 178px;
          padding: 18px 22px;
          border-radius: 16px;
          background: #ffffff;
          border: 1px solid #dce7f1;
          box-shadow: 0 16px 44px rgba(15, 23, 42, 0.04);
        }

        .uni b { display: block; font-size: 18px; }
        .uni span { color: #718096; font-size: 14px; }

        .problem-grid, .pillars {
          max-width: 1320px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        .problem-card, .pillar {
          background: #ffffff;
          border: 1px solid #dce7f1;
          box-shadow: 0 24px 70px rgba(15, 23, 42, 0.07);
        }

        .problem-card { min-height: 300px; padding: 34px; border-radius: 26px; }

        .problem-card:nth-child(1), .pillar:nth-child(1) { border-top: 4px solid #18b6d0; }
        .problem-card:nth-child(2), .pillar:nth-child(2) { border-top: 4px solid #f3b400; }
        .problem-card:nth-child(3), .pillar:nth-child(3) { border-top: 4px solid #62c99a; }

        .emoji { font-size: 30px; margin-bottom: 20px; }
        .problem-card h3 { margin: 0 0 12px; font-size: 28px; }
        .problem-card b { display: block; margin-bottom: 10px; color: #18b6d0; font-family: Space Grotesk, Inter, sans-serif; font-size: 48px; }
        .problem-card p { margin: 0; color: #607086; font-size: 18px; line-height: 1.65; }

        .pillar { min-height: 430px; padding: 42px; border-radius: 28px; }
        .pillar-icon { margin-bottom: 28px; font-size: 38px; }
        .pillar h3 { margin: 0 0 10px; font-size: 34px; }
        .pillar small { color: #1e7bb6; font-size: 17px; font-weight: 950; }

        .pillar-tags { display: flex; flex-wrap: wrap; gap: 10px; margin: 30px 0; }

        .pillar-tags span {
          padding: 10px 13px;
          border-radius: 999px;
          background: #eef6fb;
          color: #23708f;
          font-size: 14px;
          font-weight: 850;
        }

        .pillar-button {
          width: 100%;
          padding: 17px;
          border: none;
          border-radius: 13px;
          color: white;
          font-size: 16px;
          font-weight: 950;
          cursor: pointer;
        }

        .blue-btn { background: #1e7bb6; }
        .gold-btn { background: #d9a000; color: #06182d; }
        .green-btn { background: #1b7b43; }

        .interactive-wrap {
          max-width: 1320px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 54px;
          align-items: center;
        }

        .sources { display: grid; gap: 16px; }

        .source {
          width: 100%;
          padding: 22px;
          border-radius: 20px;
          background: #ffffff;
          border: 1px solid #dce7f1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-align: left;
          cursor: pointer;
          box-shadow: 0 12px 34px rgba(15, 23, 42, 0.04);
        }

        .source-left { display: flex; align-items: center; gap: 16px; }

        .source-icon {
          width: 50px;
          height: 50px;
          border-radius: 14px;
          background: #eef7fb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .source h4 { margin: 0; font-size: 20px; }
        .source small { color: #718096; font-size: 14px; }
        .points { color: #0891b2; font-size: 16px; font-weight: 950; white-space: nowrap; }
        .connected { background: #eafaff; border-color: #18b6d0; }

        .score-panel { text-align: center; }

        .big-ring {
          width: 260px;
          height: 260px;
          margin: 0 auto 28px;
          border-radius: 50%;
          background: conic-gradient(#18b6d0 ${progress}%, #e7eef6 0);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 24px 70px rgba(15, 23, 42, 0.08);
        }

        .big-ring-inner {
          width: 186px;
          height: 186px;
          border-radius: 50%;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          border: 1px solid #e5edf5;
        }

        .big-ring-inner b { color: #0b1933; font-size: 42px; line-height: 1; }
        .big-ring-inner span { margin-top: 6px; color: #718096; font-size: 18px; }

        .profile-card {
          max-width: 1120px;
          margin: 0 auto;
          padding: 38px;
          border-radius: 30px;
          background: #ffffff;
          border: 1px solid #dce7f1;
          box-shadow: 0 40px 90px rgba(15, 23, 42, 0.12);
        }

        .card-top { display: flex; align-items: center; justify-content: space-between; gap: 20px; margin-bottom: 26px; }
        .card-title { color: #66758a; font-size: 15px; font-weight: 900; }
        .student-name { margin-top: 8px; font-size: 34px; font-weight: 950; letter-spacing: -1px; }

        .score-ring {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          background: conic-gradient(#18b6d0 ${progress}%, #e7eef6 0);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .score-inner {
          width: 82px;
          height: 82px;
          border-radius: 50%;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          font-weight: 950;
        }

        .score-inner span { font-size: 28px; }
        .score-inner small { color: #66758a; font-size: 13px; }

        .challenge {
          padding: 20px;
          border-radius: 16px;
          background: #fff8df;
          border: 1px solid #f5df94;
          color: #46566a;
          font-size: 18px;
          line-height: 1.6;
          text-align: center;
        }

        .challenge b { color: #b78200; }

        .check-list { display: grid; gap: 14px; margin-top: 22px; }

        .check {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          padding-bottom: 13px;
          border-bottom: 1px solid #edf2f7;
          color: #334155;
          font-size: 18px;
          font-weight: 850;
        }

        .check span:last-child { color: #089f85; }

        .country-marquee {
          width: 100%;
          overflow: hidden;
          position: relative;
          padding: 16px 0 34px;
        }

        .country-marquee::before,
        .country-marquee::after {
          content: "";
          position: absolute;
          top: 0;
          width: 130px;
          height: 100%;
          z-index: 2;
          pointer-events: none;
        }

        .country-marquee::before { left: 0; background: linear-gradient(to right, #ffffff, transparent); }
        .country-marquee::after { right: 0; background: linear-gradient(to left, #ffffff, transparent); }

        .country-track {
          display: flex;
          gap: 18px;
          width: max-content;
          animation: scrollCountries 48s linear infinite;
        }

        .country-track:hover { animation-play-state: paused; }

        .country-card {
          min-width: 240px;
          height: 126px;
          flex-shrink: 0;
          border-radius: 24px;
          background: #ffffff;
          border: 1px solid #dce7f1;
          box-shadow: 0 18px 45px rgba(15, 23, 42, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }

        .country-flag-img {
          width: 42px;
          height: 30px;
          object-fit: cover;
          border-radius: 6px;
          box-shadow: 0 3px 10px rgba(15,23,42,.14);
        }

        .country-fullname { color: #0b1933; font-size: 18px; font-weight: 900; white-space: nowrap; }

        @keyframes scrollCountries {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .send-box {
          max-width: 1040px;
          margin: 0 auto;
          padding: 38px;
          border-radius: 30px;
          background: #ffffff;
          border: 1px solid #dce7f1;
          box-shadow: 0 34px 90px rgba(15, 23, 42, 0.12);
        }

        .input-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 24px; }

        .field label { display: block; margin-bottom: 10px; color: #607086; font-size: 16px; font-weight: 950; }

        .field input {
          width: 100%;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid #dce7f1;
          background: #f7fafc;
          color: #0b1933;
          font-size: 17px;
          outline: none;
        }

        .country-select { position: relative; }

        .country-button {
          width: 100%;
          padding: 15px 16px;
          border-radius: 12px;
          border: 1px solid #dce7f1;
          background: #f7fafc;
          color: #0b1933;
          font-size: 17px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
        }

        .country-button-main { display: flex; align-items: center; gap: 12px; font-weight: 750; }

        .mini-flag {
          width: 30px;
          height: 22px;
          object-fit: cover;
          border-radius: 5px;
          box-shadow: 0 2px 7px rgba(15,23,42,.14);
        }

        .country-menu {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          width: 100%;
          max-height: 330px;
          overflow-y: auto;
          z-index: 50;
          padding: 8px;
          border-radius: 16px;
          border: 1px solid #dce7f1;
          background: white;
          box-shadow: 0 24px 70px rgba(15,23,42,.18);
        }

        .country-option {
          width: 100%;
          border: none;
          background: transparent;
          padding: 12px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 750;
          color: #0b1933;
        }

        .country-option:hover, .country-option.active {
          background: #eafaff;
          color: #07809e;
        }

        .fee-row {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: 20px;
          margin-top: 14px;
          padding: 22px;
          border-radius: 18px;
          background: #f7fafc;
          border: 1px solid #e1e9f1;
        }

        .fee-row.best { border-color: #18b6d0; background: #eafaff; }
        .fee-name { color: #0b1933; font-size: 18px; font-weight: 950; }
        .corridor-note { margin-top: 12px; color: #607086; font-size: 15px; line-height: 1.5; }
        .fee-price { font-family: Space Grotesk, Inter, sans-serif; font-size: 32px; font-weight: 800; }
        .red { color: #e05252; }
        .gold { color: #d9a000; }
        .cyan { color: #0891b2; }

        .saving {
          margin-top: 22px;
          padding: 26px;
          border-radius: 20px;
          background: #fff8df;
          border: 1px solid #f5df94;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .saving b { color: #b78200; font-family: Space Grotesk, Inter, sans-serif; font-size: 44px; }

        .demo-shell {
          max-width: 1320px;
          margin: 0 auto;
          border-radius: 30px;
          overflow: hidden;
          background: #ffffff;
          border: 1px solid #dce7f1;
          box-shadow: 0 34px 90px rgba(15, 23, 42, 0.12);
        }

        .demo-top {
          height: 66px;
          padding: 0 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #f7fafc;
          border-bottom: 1px solid #e6edf5;
          color: #637386;
          font-weight: 900;
        }

        .demo-layout { display: grid; grid-template-columns: 240px 1fr; min-height: 610px; }
        .side { padding: 24px; background: #fbfdff; border-right: 1px solid #e6edf5; }

        .tab {
          width: 100%;
          margin-bottom: 10px;
          padding: 16px;
          border: none;
          border-radius: 12px;
          background: transparent;
          color: #617083;
          font-size: 17px;
          font-weight: 900;
          text-align: left;
          cursor: pointer;
        }

        .tab.active { background: #18b6d0; color: #ffffff; }

        .demo-main { padding: 30px; }
        .kpis { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }

        .kpi {
          padding: 22px;
          border-radius: 18px;
          border: 1px solid #e1e9f1;
          background: #fbfdff;
        }

        .kpi small {
          display: block;
          color: #718096;
          font-weight: 900;
          letter-spacing: 1px;
          margin-bottom: 10px;
        }

        .kpi b { font-size: 30px; }

        .highlight {
          margin-top: 22px;
          padding: 30px;
          border-radius: 22px;
          background: linear-gradient(135deg, #0d2138, #20bfd8);
          color: #ffffff;
        }

        .highlight small { color: #ffe56c; font-weight: 950; letter-spacing: 1.5px; }
        .highlight h3 { margin: 12px 0; font-size: 30px; }
        .highlight p { margin: 0; color: #e8fbff; line-height: 1.6; }

        .info-grid { margin-top: 22px; display: grid; grid-template-columns: 1fr 1fr; gap: 22px; }

        .info-card {
          padding: 24px;
          border-radius: 20px;
          border: 1px solid #e1e9f1;
          background: #ffffff;
        }

        .info-card h4 { margin: 0 0 16px; color: #718096; font-size: 13px; letter-spacing: 1.4px; }

        .info-row {
          display: flex;
          justify-content: space-between;
          gap: 14px;
          padding: 13px 0;
          border-bottom: 1px solid #edf2f7;
          font-weight: 800;
        }

        .coach-wrap {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 330px 1fr;
          gap: 28px;
        }

        .coach-profile, .chat-box {
          background: #ffffff;
          border: 1px solid #dce7f1;
          border-radius: 26px;
          padding: 26px;
          box-shadow: 0 24px 70px rgba(15, 23, 42, 0.08);
        }

        .coach-profile h3 { margin: 0; font-size: 24px; }
        .coach-profile p { color: #607086; }

        .coach-score {
          margin-top: 18px;
          color: #18b6d0;
          font-family: Space Grotesk, Inter, sans-serif;
          font-size: 42px;
          font-weight: 800;
        }

        .messages {
          min-height: 350px;
          max-height: 350px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-right: 8px;
        }

        .message {
          max-width: 82%;
          padding: 14px 16px;
          border-radius: 16px;
          line-height: 1.55;
          font-size: 16px;
        }

        .message.ai { background: #eef6fb; align-self: flex-start; }
        .message.user { background: #18b6d0; color: white; align-self: flex-end; font-weight: 800; }

        .quick { display: flex; flex-wrap: wrap; gap: 8px; margin: 16px 0; }

        .quick button {
          border: 1px solid #dce7f1;
          background: #f7fafc;
          color: #607086;
          border-radius: 999px;
          padding: 9px 13px;
          cursor: pointer;
        }

        .chat-input { display: flex; gap: 10px; }

        .chat-input input {
          flex: 1;
          border: 1px solid #dce7f1;
          background: #f7fafc;
          border-radius: 999px;
          padding: 16px 18px;
          font-size: 16px;
          outline: none;
        }

        .chat-input button {
          width: 50px;
          height: 50px;
          border-radius: 999px;
          border: none;
          background: #18b6d0;
          color: white;
          font-weight: 950;
          cursor: pointer;
        }

        .team-grid {
          max-width: 1220px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 22px;
        }

        .member {
          background: #ffffff;
          border: 1px solid #dce7f1;
          border-radius: 24px;
          padding: 30px 20px;
          text-align: center;
          box-shadow: 0 22px 60px rgba(15, 23, 42, 0.06);
        }

        .member-avatar {
          width: 82px;
          height: 82px;
          border-radius: 999px;
          margin: 0 auto 18px;
          background: linear-gradient(135deg, #18b6d0, #9be9b5);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #07182c;
          font-size: 24px;
          font-weight: 950;
        }

        .member h3 { margin: 0; font-size: 21px; }
        .member p { margin: 8px 0 0; color: #607086; font-weight: 700; line-height: 1.45; }

        .waitlist {
          text-align: center;
          padding: 110px 7vw;
          background:
            radial-gradient(circle at 50% 0%, rgba(24, 182, 208, 0.16), transparent 38%),
            linear-gradient(135deg, #f8fcff, #eaf7fb);
        }

        .waitlist h2 { max-width: 1280px; margin-left: auto; margin-right: auto; }

        .waitlist-form {
          max-width: 720px;
          margin: 34px auto 0;
          display: flex;
          gap: 12px;
        }

        .waitlist-form input {
          flex: 1;
          border: 1px solid #dce7f1;
          background: white;
          border-radius: 12px;
          padding: 16px 18px;
          font-size: 16px;
          outline: none;
        }

        .waitlist-form button {
          border: none;
          border-radius: 12px;
          background: #f3b400;
          color: #07182c;
          padding: 16px 24px;
          font-weight: 950;
          cursor: pointer;
        }

        .success-box {
          max-width: 720px;
          margin: 34px auto 0;
          padding: 18px 24px;
          border-radius: 14px;
          background: #e8fbf4;
          border: 1px solid #62c99a;
          color: #00856f;
          font-size: 18px;
          font-weight: 900;
          text-align: center;
        }

        .free-note { margin-top: 18px; color: #607086; }

        .footer {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          flex-wrap: wrap;
          padding: 38px 7vw;
          background: #ffffff;
          border-top: 1px solid #e4ebf3;
          color: #607086;
        }

        @media (max-width: 1100px) {
          .hero, .interactive-wrap, .demo-layout, .coach-wrap { grid-template-columns: 1fr; }
          .problem-grid, .pillars, .team-grid { grid-template-columns: 1fr 1fr; }
          .stats-band, .kpis, .info-grid { grid-template-columns: repeat(2, 1fr); }
          .links { display: none; }
        }

        @media (max-width: 700px) {
          .nav, .hero, .section, .stats-band, .waitlist { padding-left: 5vw; padding-right: 5vw; }
          .problem-grid, .pillars, .team-grid, .stats-band, .kpis, .info-grid, .waitlist-form { grid-template-columns: 1fr; }
          .waitlist-form { display: grid; }
          .join { display: none; }
          h1 { font-size: 56px; letter-spacing: -2px; }
          h2 { letter-spacing: -1.5px; }
          .input-grid { grid-template-columns: 1fr; }
          .card-top { align-items: flex-start; }
          .country-card { min-width: 210px; }
        }
      `}</style>

      <div className="page">
        <nav className="nav">
          <div className="brand">
            <div className="logo">UP</div>
            <div>
              <div className="brand-name">UniPay</div>
              <div className="brand-sub">Free student finance app</div>
            </div>
          </div>

          <div className="links">
            <a href="#how">How it works</a>
            <a href="#send">Transfer check</a>
            <a href="#demo">Live demo</a>
            <a href="#coach">AI coach</a>
            <a href="#launch">Boston launch</a>
          </div>

          <button className="join" onClick={() => scrollTo("launch")}>
            Join waitlist →
          </button>
        </nav>

        <section className="hero">
          <div>
            <div className="pill">
              <span className="dot"></span>
              Launching in Boston — 2026
            </div>

            <h1>
              Student finance for the <span className="gradient">invisible</span>{" "}
              costs.
            </h1>

            <div className="hero-note">
              International students often manage tuition, rent, transfers,
              documents, and credit-building across different systems. UniPay brings
              everything into one free student finance workspace.
            </div>

            <div className="actions">
              <button className="primary" onClick={() => scrollTo("demo")}>
                Try live demo →
              </button>
              <button className="secondary" onClick={() => scrollTo("how")}>
                How it works
              </button>
            </div>
          </div>

          <div className="hero-preview">
            <div className="preview-title">Student finance workspace</div>
            <div className="preview-headline">Everything in one place.</div>

            <div className="preview-grid">
              <div className="preview-box">
                <small>Tuition</small>
                <b>$28,500</b>
              </div>
              <div className="preview-box">
                <small>Deadline</small>
                <b>12 days</b>
              </div>
              <div className="preview-box">
                <small>Documents</small>
                <b>4 / 5</b>
              </div>
              <div className="preview-box">
                <small>Cost check</small>
                <b>Free</b>
              </div>
            </div>

            <div className="ai-box">
              <small>AI RECOMMENDATION</small>
              <h3>Compare routes before sending money.</h3>
              <p>
                UniPay helps students avoid hidden costs and missing payment records.
              </p>
            </div>
          </div>
        </section>

        <section className="stats-band">
          <div className="stat">
            <b>Free</b>
            <span>No subscription for students</span>
          </div>
          <div className="stat">
            <b>65K</b>
            <span>International students in Boston</span>
          </div>
          <div className="stat">
            <b>$80B+</b>
            <span>Student payment corridor</span>
          </div>
          <div className="stat">
            <b>24/7</b>
            <span>AI finance guidance</span>
          </div>
        </section>

        <section className="universities">
          <div className="section-label">
            Serving students at Boston’s top universities
          </div>

          <div className="uni-row">
            {[
              "Northeastern",
              "Boston University",
              "Harvard",
              "MIT",
              "Tufts",
              "Hult",
              "Emerson",
            ].map((university) => (
              <div className="uni" key={university}>
                <b>{university}</b>
                <span>Student finance support</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section soft" id="how">
          <div className="section-head">
            <div className="section-label">The problem</div>
            <h2>The system cannot see the full student story.</h2>
            <p className="sub">
              Tuition payments, family support, rent history, phone bills, and
              international records are real financial signals — but students rarely
              get credit for them.
            </p>
          </div>

          <div className="problem-grid">
            <div className="problem-card">
              <div className="emoji">🎓</div>
              <h3>International students</h3>
              <b>65K+</b>
              <p>
                Boston has a dense international student market with tuition, rent,
                transfers, and credit-building needs.
              </p>
            </div>

            <div className="problem-card">
              <div className="emoji">💸</div>
              <h3>Family transfers</h3>
              <b>3–5%</b>
              <p>
                Families may lose money through exchange-rate spreads, unclear fees,
                and poor transfer timing.
              </p>
            </div>

            <div className="problem-card">
              <div className="emoji">📄</div>
              <h3>Scattered documents</h3>
              <b>4+</b>
              <p>
                Students manage invoices, receipts, bank records, rent payments, and
                school confirmations separately.
              </p>
            </div>
          </div>
        </section>

        <section className="section white">
          <div className="section-head">
            <div className="section-label">Three pillars. One free app.</div>
            <h2>A student financial engine built for how students actually live.</h2>
          </div>

          <div className="pillars">
            <div className="pillar">
              <div className="pillar-icon">🧠</div>
              <h3>CreditID</h3>
              <small>Financial wellness profile</small>
              <div className="pillar-tags">
                <span>Enrollment verified</span>
                <span>Family transfers</span>
                <span>Rent history</span>
                <span>Int’l credit record</span>
              </div>
              <button className="pillar-button blue-btn" onClick={() => scrollTo("interactive")}>
                Build profile →
              </button>
            </div>

            <div className="pillar">
              <div className="pillar-icon">⚡</div>
              <h3>VisibleSend</h3>
              <small>Transfer comparison</small>
              <div className="pillar-tags">
                <span>Clear fee view</span>
                <span>Family payment</span>
                <span>Tuition route</span>
                <span>Receipt record</span>
              </div>
              <button className="pillar-button gold-btn" onClick={() => scrollTo("send")}>
                Calculate savings →
              </button>
            </div>

            <div className="pillar">
              <div className="pillar-icon">📊</div>
              <h3>CampusBudget</h3>
              <small>Student budget safety</small>
              <div className="pillar-tags">
                <span>Rent check</span>
                <span>Emergency fund</span>
                <span>Tuition cycle</span>
                <span>AI coach</span>
              </div>
              <button className="pillar-button green-btn" onClick={() => scrollTo("coach")}>
                Start budgeting →
              </button>
            </div>
          </div>
        </section>

        <section className="section soft" id="interactive">
          <div className="section-head">
            <div className="section-label">Interactive demo</div>
            <h2>Watch your profile build in real time.</h2>
            <p className="sub">
              Click each data source to connect it and watch the financial wellness score improve.
            </p>
          </div>

          <div className="interactive-wrap">
            <div className="sources">
              {dataSources.map((source) => (
                <button
                  key={source.id}
                  className={`source ${connected.includes(source.id) ? "connected" : ""}`}
                  onClick={() => toggleSource(source.id)}
                >
                  <div className="source-left">
                    <div className="source-icon">{source.icon}</div>
                    <div>
                      <h4>{source.title}</h4>
                      <small>{connected.includes(source.id) ? "Connected" : "Click to connect"}</small>
                    </div>
                  </div>
                  <div className="points">+{source.points} pts</div>
                </button>
              ))}
            </div>

            <div className="score-panel">
              <div className="big-ring">
                <div className="big-ring-inner">
                  <b>{score}</b>
                  <span>/ 850</span>
                </div>
              </div>
              <h3>Financial Wellness Profile</h3>
              <p>{connected.length} of 5 sources connected</p>
              <p style={{ color: "#18b6d0", fontWeight: 900 }}>{profileStatus}</p>
            </div>
          </div>
        </section>

        <section className="section white">
          <div className="profile-card">
            <div className="card-top">
              <div>
                <div className="card-title">Financial Wellness Profile</div>
                <div className="student-name">International Student</div>
                <div className="brand-sub">Boston · Tuition · Rent · Transfer</div>
              </div>

              <div className="score-ring">
                <div className="score-inner">
                  <span>{score}</span>
                  <small>/ 850</small>
                </div>
              </div>
            </div>

            <div className="challenge">
              <b>The challenge:</b> students may have strong family support and
              payment history, but U.S. financial systems often cannot read that context.
            </div>

            <div className="check-list">
              <div className="check">
                <span>University enrollment</span>
                <span>{connected.includes("enroll") ? "Verified" : "Ready to connect"}</span>
              </div>
              <div className="check">
                <span>Family transfer record</span>
                <span>{connected.includes("family") ? "Connected" : "Ready to connect"}</span>
              </div>
              <div className="check">
                <span>Tuition document vault</span>
                <span>{connected.includes("docs") ? "Ready" : "Ready to connect"}</span>
              </div>
              <div className="check">
                <span>AI financial coach</span>
                <span>Live</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section white">
          <div className="section-head">
            <div className="section-label">All nationalities from day one</div>
            <h2>We speak your financial language.</h2>
            <p className="section-text">
              UniPay supports students and family payment records from many international corridors.
            </p>
          </div>

          <div className="country-marquee">
            <div className="country-track">
              {[...countries, ...countries].map((country, index) => (
                <div className="country-card" key={`${country.name}-${index}`}>
                  <img className="country-flag-img" src={flagUrl(country.code)} alt={`${country.name} flag`} />
                  <span className="country-fullname">{country.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section soft" id="send">
          <div className="section-head">
            <div className="section-label">VisibleSend</div>
            <h2>How much can your family save?</h2>
            <p className="section-text">
              This calculator is only a demo. UniPay is free for students and helps compare routes before sending money.
            </p>
          </div>

          <div className="send-box">
            <div className="input-grid">
              <div className="field">
                <label>Sending from</label>
                <div className="country-select">
                  <button className="country-button" onClick={() => setCountryOpen(!countryOpen)}>
                    <span className="country-button-main">
                      <img className="mini-flag" src={flagUrl(selectedCountryObj.code)} alt="" />
                      {selectedCountryObj.name}
                    </span>
                    <span>⌄</span>
                  </button>

                  {countryOpen && (
                    <div className="country-menu">
                      {countries
                        .filter((country) => feeMap[country.name])
                        .map((country) => (
                          <button
                            key={country.name}
                            className={`country-option ${selectedCountry === country.name ? "active" : ""}`}
                            onClick={() => {
                              setSelectedCountry(country.name);
                              setCountryOpen(false);
                            }}
                          >
                            <img className="mini-flag" src={flagUrl(country.code)} alt="" />
                            {country.name}
                          </button>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="field">
                <label>Amount (USD)</label>
                <input value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="Enter amount" />
              </div>
            </div>

            <div className="fee-row">
              <div>
                <div className="fee-name">Typical bank route</div>
                <div className="corridor-note">{currentFee.note}</div>
              </div>
              <div className="fee-price red">${Math.round(bankFee).toLocaleString()}</div>
            </div>

            <div className="fee-row">
              <div>
                <div className="fee-name">Typical wallet route</div>
                <div className="corridor-note">Lower fee, but school receipt timing may vary.</div>
              </div>
              <div className="fee-price gold">${Math.round(walletFee).toLocaleString()}</div>
            </div>

            <div className="fee-row best">
              <div>
                <div className="fee-name">UniPay route check</div>
                <div className="corridor-note">Free comparison layer for students and families.</div>
              </div>
              <div className="fee-price cyan">Free</div>
            </div>

            <div className="saving">
              <div>
                <div className="section-label">Estimated avoidable cost</div>
                <span style={{ color: "#607086" }}>
                  Based on {selectedCountry} → U.S. student payment route.
                </span>
              </div>
              <b>${savings.toLocaleString()}</b>
            </div>
          </div>
        </section>

        <section className="section white" id="demo">
          <div className="section-head">
            <div className="section-label">Live product demo</div>
            <h2>A dashboard that feels like a real student finance app.</h2>
            <p className="section-text">
              Click the left menu. Every section changes the recommendation, numbers, checklist, and activity.
            </p>
          </div>

          <div className="demo-shell">
            <div className="demo-top">
              <span>app.unipay.com / {currentDemo.title.toLowerCase().replaceAll(" ", "-")}</span>
              <span style={{ color: "#00a676" }}>● 4 accounts synced</span>
            </div>

            <div className="demo-layout">
              <div className="side">
                {Object.keys(demoContent).map((key) => (
                  <button key={key} className={`tab ${activeDemo === key ? "active" : ""}`} onClick={() => setActiveDemo(key)}>
                    {demoContent[key].nav}
                  </button>
                ))}
              </div>

              <div className="demo-main">
                <div className="kpis">
                  {currentDemo.kpis.map(([label, value]) => (
                    <div className="kpi" key={label}>
                      <small>{label}</small>
                      <b>{value}</b>
                    </div>
                  ))}
                </div>

                <div className="highlight">
                  <small>{currentDemo.title}</small>
                  <h3>{currentDemo.headline}</h3>
                  <p>{currentDemo.text}</p>
                </div>

                <div className="info-grid">
                  <div className="info-card">
                    <h4>CHECKLIST</h4>
                    {currentDemo.left.map((item, index) => (
                      <div className="info-row" key={item}>
                        <span>{item}</span>
                        <span>{index === 0 ? "Ready" : index === 1 ? "Active" : "Next"}</span>
                      </div>
                    ))}
                  </div>

                  <div className="info-card">
                    <h4>STUDENT ACTION</h4>
                    {currentDemo.right.map((item, index) => (
                      <div className="info-row" key={item}>
                        <span>{item}</span>
                        <span>{index === 0 ? "Now" : index === 1 ? "Today" : "Later"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section soft" id="coach">
          <div className="section-head">
            <div className="section-label">Live AI demo</div>
            <h2>Meet your AI financial coach.</h2>
            <p className="section-text">
              Ask about tuition, rent, credit, transfers, budget, or documents. The chat responds live.
            </p>
          </div>

          <div className="coach-wrap">
            <div className="coach-profile">
              <div className="card-title">PROFILE</div>
              <h3>UniPay Student</h3>
              <p>International student · Boston</p>
              <div className="coach-score">{score}</div>
              <p>Wellness score / 850</p>
              <p style={{ color: "#18b6d0", fontWeight: 900 }}>{profileStatus}</p>

              <div className="check-list">
                <div className="check">
                  <span>Enrollment</span>
                  <span>{connected.includes("enroll") ? "Verified" : "Not connected"}</span>
                </div>
                <div className="check">
                  <span>Transfer record</span>
                  <span>{connected.includes("family") ? "Ready" : "Not connected"}</span>
                </div>
                <div className="check">
                  <span>Document vault</span>
                  <span>{connected.includes("docs") ? "Active" : "Not connected"}</span>
                </div>
              </div>
            </div>

            <div className="chat-box">
              <div className="messages">
                {messages.map((message, index) => (
                  <div className={`message ${message.role}`} key={index}>
                    {message.text}
                  </div>
                ))}
              </div>

              <div className="quick">
                {[
                  "How do I build credit?",
                  "Can I pay tuition in installments?",
                  "What happens if my transfer is delayed?",
                  "How much emergency savings do I need?",
                  "Best transfer route?",
                  "Can I afford my rent?",
                  "What documents do I need?",
                  "How should I budget this month?",
                ].map((question) => (
                  <button key={question} onClick={() => sendMessage(question)}>
                    {question}
                  </button>
                ))}
              </div>

              <div className="chat-input">
                <input
                  value={chatInput}
                  onChange={(event) => setChatInput(event.target.value)}
                  onKeyDown={(event) => event.key === "Enter" && sendMessage()}
                  placeholder="Ask your coach anything..."
                />
                <button onClick={() => sendMessage()}>↑</button>
              </div>
            </div>
          </div>
        </section>

        <section className="section white">
          <div className="section-head">
            <div className="section-label">Founding team</div>
            <h2>Built by a cross-functional fintech launch team.</h2>
          </div>

          <div className="team-grid">
            <div className="member">
              <div className="member-avatar">YC</div>
              <h3>Yihan Chen</h3>
              <p>Founder & Product Strategy Lead</p>
            </div>
            <div className="member">
              <div className="member-avatar">HR</div>
              <h3>Husna Rafi</h3>
              <p>Customer Research & UX Strategy Lead</p>
            </div>
            <div className="member">
              <div className="member-avatar">JR</div>
              <h3>Jayaram Rani</h3>
              <p>Finance Modeling & Operations Lead</p>
            </div>
            <div className="member">
              <div className="member-avatar">MX</div>
              <h3>Minghao Xu</h3>
              <p>Data Analytics & Market Intelligence Lead</p>
            </div>
            <div className="member">
              <div className="member-avatar">PH</div>
              <h3>Phillip Henshaw</h3>
              <p>Growth Strategy & Partnerships Lead</p>
            </div>
          </div>
        </section>

        <section className="waitlist" id="launch">
          <div className="section-label">Boston launch — 2026</div>

          <h2>
            Join the waitlist. <span className="gradient">UniPay is free.</span>
          </h2>

          <p className="section-text">
            Join students preparing for tuition, rent, transfers, budgeting,
            credit-building, and U.S. financial life.
          </p>

          {!joined ? (
            <div className="waitlist-form">
              <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your university email address" />
              <button onClick={joinWaitlist}>Send email →</button>
            </div>
          ) : (
            <div className="success-box">
              ✓ You are on the list! We will reach out before the Boston launch.
            </div>
          )}

          <div className="free-note">
            No subscription. No payment. Built as a free student finance assistant.
          </div>
        </section>

        <footer className="footer">
          <div>© 2026 UniPay. All rights reserved.</div>
          <div>Built for international students and families.</div>
        </footer>
      </div>
    </>
  );
}
