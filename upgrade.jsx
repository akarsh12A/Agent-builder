import React, { useState } from "react";
import "./upgrade.css";

const SubscriptionPlans = () => {
  const [billingCycle, setBillingCycle] = useState("monthly"); // 'monthly' or 'annual'

  const handleBillingChange = (cycle) => {
    setBillingCycle(cycle);
  };

  const pricing = {
    monthly: {
      free: "$0",
      pro: "$99",
      business: "$399",
      enterprise: "Custom pricing",
    },
    annual: {
      free: "$0",
      pro: "$79", // Adjust the annual prices as per your requirement
      business: "$319",
      enterprise: "Custom pricing",
    },
  };

  return (
    <div className="subscription-plans">
      <h1>Subscription Plans</h1>
      <div className="billing-toggle">
        <span
          className={`billing-option ${
            billingCycle === "monthly" ? "active" : ""
          }`}
          onClick={() => handleBillingChange("monthly")}
        >
          Monthly
        </span>
        <span
          className={`billing-option ${
            billingCycle === "annual" ? "active" : ""
          }`}
          onClick={() => handleBillingChange("annual")}
        >
          Annual
        </span>
        <span className="save-20">
          <center>Subscribe annually, save 20%</center>
        </span>
      </div>

      <div className="plans">
        <div className="plan free">
          <h2>Free</h2>
          <p className="price">{pricing[billingCycle].free}/month</p>
          <ul>
            <li>100 AI responses/mo</li>
            <li>10 training materials</li>
            <li>1 user included</li>
            <li>1 AI agent</li>
            <li>Model: Llama-3.1 405B</li>
            <li>AI Nav & Widget</li>
          </ul>
          <button>Manage Subscription</button>
        </div>

        <div className="plan pro">
          <h2>Pro</h2>
          <p className="price">{pricing[billingCycle].pro}/month</p>
          <ul>
            <li>6,000 AI responses/mo</li>
            <li>500 training materials</li>
            <li>3 users included</li>
            <li>3 AI agents</li>
            <li>All from Free, plus:</li>
            <li>Channel integration (FB, IG, WhatsApp, etc.)</li>
            <li>Basic CRM integration</li>
            <li>AI meeting scheduling</li>
            <li>Models: GPT-4o Mini, GPT-4 Turbo, GPT-4o</li>
          </ul>
          <button>Upgrade</button>
        </div>

        <div className="plan business">
          <h2>Business</h2>
          <p className="price">{pricing[billingCycle].business}/month</p>
          <ul>
            <li>40,000 AI responses/mo</li>
            <li>750 training materials</li>
            <li>10 users included</li>
            <li>10 AI agents</li>
            <li>All from Pro, plus:</li>
            <li>Customer success manager</li>
            <li>Purchase intent & triggers (SMS or email)</li>
            <li>Conversational insights</li>
            <li>Salesforce & HubSpot integration</li>
          </ul>
          <button>Upgrade</button>
        </div>

        <div className="plan enterprise">
          <h2>Enterprise</h2>
          <p className="price">{pricing[billingCycle].enterprise}</p>
          <ul>
            <li>Unlimited AI responses/mo</li>
            <li>Unlimited training materials</li>
            <li>Unlimited users included</li>
            <li>Custom AI agents</li>
            <li>All from Business, plus:</li>
            <li>Fully customized plan</li>
            <li>Enterprise onboarding - dedicated CSM, Engineer, etc.</li>
            <li>Custom integration</li>
            <li>SLA's</li>
            <li>API integrations</li>
            <li>Custom data retention policy</li>
            <li>AI native webpages</li>
          </ul>
          <button>Contact Us</button>
        </div>
      </div>

      <div className="add-ons">
        <h2>Add Ons</h2>
        <div className="add-ons-container">
          <div className="add-on">
            <h3>Remove Powered By Chatsimple</h3>
            <p className="price">$59/mo</p>
            <button className="add-button">Add</button>
          </div>
          <div className="add-on">
            <h3>Phone Number for SMS</h3>
            <p className="price">$20/mo</p>
            <button className="coming-soon">Coming Soon</button>
          </div>
          <div className="add-on">
            <h3>Live Chat Seat</h3>
            <p className="price">$49/mo</p>
            <button className="coming-soon">Coming Soon</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReviewCard = ({
  name,
  position,
  company,
  review,
  date,
  rating,
  avatar,
}) => (
  <div className="review-card">
    <div className="card-header">
      <img src={avatar} alt={`${name}'s avatar`} className="avatar" />
      <div className="header-info">
        <h4>{name}</h4>
        <p>
          {position}, {company}
        </p>
        <p className="date">{date}</p>
      </div>
      <div className="rating">{Array(rating).fill("⭐").join(" ")}</div>
    </div>
    <div className="card-body">
      <p>{review}</p>
    </div>
  </div>
);

const Reviews = () => (
  <div className="reviews-container">
    <ReviewCard
      name="Mark L."
      position="Partner, Apple Business Manager"
      company="Small-Business (50 or fewer emp.)"
      review="ChatSimple – An Essential Tool on Our IT Support Journey... (Review content here)"
      date="Sep 25, 2023"
      rating={5}
      avatar="/path-to-avatar1.jpg"
    />
    <ReviewCard
      name="usutako AI"
      position="(Position in Japanese)"
      company="(Company in Japanese)"
      review="20代でChatbotが作れるようなサイト見つけました... (Review content here)"
      date="Jul 31, 2023"
      rating={5}
      avatar="/path-to-avatar2.jpg"
    />
    <ReviewCard
      name="Morgan V."
      position="Directeur marketing"
      company="Small-Business (50 or fewer emp.)"
      review="Exceptional Customer Service and Prompt Solutions... (Review content here)"
      date="Oct 30, 2023"
      rating={5}
      avatar="/path-to-avatar3.jpg"
    />
    <ReviewCard
      name="Joseph A."
      position="CEO and Founder"
      company="Small-Business (50 or fewer emp.)"
      review="Awesome product!... (Review content here)"
      date="Aug 30, 2023"
      rating={5}
      avatar="/path-to-avatar4.jpg"
    />
    <ReviewCard
      name="Sutra | AI"
      position="(Position)"
      company="(Company)"
      review="SutraGPT Update: Three days ago, I asked you guys to help me build SutraGPT... (Review content here)"
      date="Jul 26, 2023"
      rating={5}
      avatar="/path-to-avatar5.jpg"
    />
    <ReviewCard
      name="Haider."
      position="(Position)"
      company="(Company)"
      review="@hasantox This is mind blowing, creating a chatbot in a few minutes... (Review content here)"
      date="Jul 25, 2023"
      rating={5}
      avatar="/path-to-avatar6.jpg"
    />
  </div>
);

const FAQSection = () => {
  const faqStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
    backgroundColor: "#f8f9fa",
  };

  const cardStyle = {
    flex: "1",
    padding: "20px",
    margin: "10px",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    color: "#333",
  };

  const titleStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  };

  const textStyle = {
    fontSize: "16px",
    lineHeight: "1.5",
  };

  const highlightedTextStyle = {
    fontWeight: "bold",
  };

  return (
    <div>
      <h1>Frequently Asked Questions</h1> {/* Added FAQ heading */}
      <div style={faqStyle}>
        <div style={cardStyle}>
          <div style={titleStyle}>Do I need to install something?</div>
          <div style={textStyle}>
            No, you don't. Just copy and paste a single line of code, and you're
            good to go.
          </div>
        </div>

        <div style={cardStyle}>
          <div style={titleStyle}>What if I don't like your service?</div>
          <div style={textStyle}>
            You can cancel at any time.{" "}
            <span style={highlightedTextStyle}>No strings attached.</span>
          </div>
        </div>

        <div style={cardStyle}>
          <div style={titleStyle}>Is my data safe?</div>
          <div style={textStyle}>
            Absolutely.{" "}
            <span style={highlightedTextStyle}>You own your data</span>, and it
            will always be safe.
          </div>
        </div>
      </div>
    </div>
  );
};

const upgrade = () => {
  return (
    <div>
      <SubscriptionPlans />
      <Reviews />
      <FAQSection /> {/* Added FAQ section here */}
    </div>
  );
};

export default upgrade;
