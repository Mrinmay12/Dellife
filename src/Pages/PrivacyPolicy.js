import React from 'react'
import "./PrivacyPolicy.css"
export default function PrivacyPolicy() {
  return (
    <div class="policy-container">
    <div className='privacyheader'>
        <h1>Privacy Policy</h1>
    </div>

    <section class="policy-content">
        <h2>Introduction</h2>
        <p>Welcome to [Social Software Name]. We value your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website or use our services.</p>

        <h2>Data We Collect</h2>
        <p>We collect the following types of data:</p>
        <ul>
            <li><strong>Personal Identification Data:</strong> Name, email address, phone number, etc.</li>
            <li><strong>Usage Data:</strong> Information about how you use our website and services.</li>
            <li><strong>Cookies and Tracking:</strong> Data collected through cookies and similar tracking technologies.</li>
        </ul>

        <h2>How We Use Your Data</h2>
        <p>We use your data to:</p>
        <ul>
            <li>Provide and maintain our services.</li>
            <li>Improve our website and services.</li>
            <li>Communicate with you, including customer support.</li>
            <li>Comply with legal obligations.</li>
        </ul>

        <h2>Data Sharing</h2>
        <p>We do not share your personal data with third parties except:</p>
        <ul>
            <li>With service providers who assist in operating our services.</li>
            <li>When required by law.</li>
            <li>In the event of a business transfer, such as a merger or acquisition.</li>
        </ul>

        <h2>Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
            <li>Access the personal data we hold about you.</li>
            <li>Request the correction of your personal data.</li>
            <li>Request the deletion of your personal data.</li>
            <li>Object to the processing of your personal data.</li>
        </ul>

        <h2>Contact Us</h2>
        <p>If you have any questions or concerns about this privacy policy, please contact us at <a href="mailto:privacy@socialsoftware.com">privacy@socialsoftware.com</a>.</p>
    </section>

    <footer>
        <p>&copy; 2024 [Dellife]. All rights reserved.</p>
    </footer>
</div>
  )
}
