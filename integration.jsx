import React from 'react';
import './integration.css'; // Import your CSS file for styling

const Integrations = () => {
    return (
        <div className="integrations-container">
            <h1 className="integrations-heading">Integrations</h1>
            <p className="integrations-subheading">
                Integrate your agent with our current applications and those soon to come! Each message is <strong>2 Message Credits</strong>.
            </p>

            <section className="platform-section">
                <h2 className="platform-heading">Messaging Platforms</h2>
                <div className="platforms-grid">
                    <div className="platform-card">
                        <div className="platform-icon chatsimple-icon"></div>
                        <h3 className="platform-title">Chatsimple</h3>
                        <p className="platform-description">Connect Chatsimple to your website</p>
                        <button className="connect-button">Connect</button>
                    </div>

                    <div className="platform-card">
                        <div className="platform-icon messenger-icon"></div>
                        <h3 className="platform-title">Messenger</h3>
                        <p className="platform-description">Connect Chatsimple to Messenger</p>
                        <button className="connect-button">Connect</button>
                        <button className="help-button">Help</button>
                    </div>

                    <div className="platform-card">
                        <div className="platform-icon whatsapp-icon"></div>
                        <h3 className="platform-title">WhatsApp</h3>
                        <p className="platform-description">Connect Chatsimple to WhatsApp</p>
                        <button className="connect-button">Connect</button>
                        <button className="help-button">Help</button>
                    </div>

                    <div className="platform-card">
                        <div className="platform-icon instagram-icon"></div>
                        <h3 className="platform-title">Instagram</h3>
                        <p className="platform-description">Connect Chatsimple to Instagram</p>
                        <button className="connect-button">Connect</button>
                        <button className="help-button">Help</button>
                    </div>

                    <div className="platform-card">
                        <div className="platform-icon sms-icon"></div>
                        <h3 className="platform-title">Text Messaging</h3>
                        <p className="platform-description">Connect Chatsimple to a SMS number</p>
                        <button className="connect-button">Connect</button>
                    </div>

                    <div className="platform-card">
                        <div className="platform-icon gmail-icon"></div>
                        <h3 className="platform-title">Gmail</h3>
                        <p className="platform-description">Connect Chatsimple to Gmail</p>
                        <button className="coming-soon-button">Coming Soon</button>
                    </div>
                </div>
            </section>

            <section className="platform-section">
                <h2 className="platform-heading">CRM Platforms</h2>
                <div className="platforms-grid">
                    <div className="platform-card">
                        <div className="platform-icon salesforce-icon"></div>
                        <h3 className="platform-title">Salesforce</h3>
                        <p className="platform-description">Export Chatsimple Leads to Salesforce</p>
                        <button className="connect-button">Connect</button>
                    </div>

                    <div className="platform-card">
                        <div className="platform-icon hubspot-icon"></div>
                        <h3 className="platform-title">HubSpot</h3>
                        <p className="platform-description">Export Chatsimple Leads to HubSpot</p>
                        <button className="connect-button">Connect</button>
                        <button className="help-button">Help</button>
                    </div>

                    <div className="platform-card">
                        <div className="platform-icon zoho-icon"></div>
                        <h3 className="platform-title">Zoho</h3>
                        <p className="platform-description">Export Chatsimple Leads to Zoho</p>
                        <button className="connect-button">Connect</button>
                    </div>

                    <div className="platform-card">
                        <div className="platform-icon pipedrive-icon"></div>
                        <h3 className="platform-title">Pipedrive</h3>
                        <p className="platform-description">Export Chatsimple Leads to Pipedrive</p>
                        <button className="connect-button">Connect</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Integrations;
