// Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTwitter, FaShieldAlt, FaWifi, FaBed, FaUserFriends, FaCheckCircle } from 'react-icons/fa';
import logo from './assets/La Villa.png';
import image1 from './assets/room.jpeg';
import image2 from './assets/room1.jpeg';
import image3 from './assets/room2.jpeg';
import image4 from './assets/room3.jpg';
import image5 from './assets/room4.webp';
import fontPath from './assets/CinzelDecorative-Regular.ttf';
import Navbar from './Navbar';

const images = [image1, image2, image3, image4, image5];

function Home() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    const fontFace = `
      @font-face {
        font-family: 'MyCustomFont';
        src: url('${fontPath}') format('truetype');
      }
    `;
    styleSheet.insertRule(fontFace, styleSheet.cssRules.length);
  }, []);

  return (
    <div style={styles.container}>
      <Navbar />

      {/* Hero / Slider */}
      <div style={styles.frame}>
        <div style={{ ...styles.background, backgroundImage: `url(${images[currentImage]})` }}>
          <button onClick={() => window.location.href = '/clientbooking'} style={styles.bookNowButton}>
            Book Now
          </button>
        </div>
      </div>

      {/* About Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionHeading}>La Villa PG Accommodations</h2>
        <p>Find your next comfortable stay with secure booking, real-time availability, and hassle-free support.</p>
      </div>

      {/* What We Offer */}
      <div style={styles.sectionDark}>
        <h2 style={styles.sectionHeadingBlue}>What We Offer</h2>
        <div style={styles.offerGrid}>
          <div style={styles.offerCard}>
            <img src={image2} alt="Clean Rooms" style={styles.cardImage} />
            <h4>Clean Rooms</h4>
            <p>Spacious, ventilated, and cleaned regularly.</p>
          </div>
          <div style={styles.offerCard}>
            <img src={image3} alt="Fully Furnished" style={styles.cardImage} />
            <h4>Furnished Living</h4>
            <p>Beds, wardrobes, tables – move in stress-free.</p>
          </div>
          <div style={styles.offerCard}>
            <img src={image4} alt="Convenient Location" style={styles.cardImage} />
            <h4>Prime Locations</h4>
            <p>Easy access to transport, food, and shopping.</p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div style={styles.section}>
        <h2 style={styles.sectionHeading}>How It Works</h2>
        <div style={styles.processGrid}>
          <div style={styles.processStep}><h4>Search PG/Hostel</h4><p>Select city and location</p></div>
          <div style={styles.processStep}><h4>Book Online</h4><p>Instant confirmation & payment</p></div>
          <div style={styles.processStep}><h4>Move In</h4><p>Walk in with your bags</p></div>
        </div>
      </div>

      {/* Amenities */}
      <div style={styles.sectionDark}>
        <h2 style={styles.sectionHeadingBlue}>Amenities</h2>
        <div style={styles.featuresGrid}>
          <div style={styles.featureItem}><FaShieldAlt size={40} color="#3AAFA9" /><h4>24/7 Security</h4></div>
          <div style={styles.featureItem}><FaWifi size={40} color="#3AAFA9" /><h4>High-Speed WiFi</h4></div>
          <div style={styles.featureItem}><FaBed size={40} color="#3AAFA9" /><h4>Furnished Rooms</h4></div>
          <div style={styles.featureItem}><FaUserFriends size={40} color="#3AAFA9" /><h4>Housekeeping</h4></div>
        </div>
      </div>

      {/* Comparison Section */}
      

      {/* Testimonials */}
      <div style={styles.section}>
        <h2 style={styles.sectionHeadingBlue}>Testimonials</h2>
        <div style={styles.testimonialGrid}>
          <blockquote style={styles.testimonial}>“Spacious and well‑maintained.” – Suresh Kumar</blockquote>
          <blockquote style={styles.testimonial}>“Hassle-free booking, excellent amenities.” – Naga</blockquote>
          <blockquote style={styles.testimonial}>“Great location and comfort.” – Aswin</blockquote>
        </div>
      </div>
<section style={styles.
sectionDark}>
  <h2 style={{
    fontSize: '32px',
    color: '#3AAFA9',
    marginBottom: '40px',
    fontFamily: 'Cinzel Decorative, serif'
  }}>
    Why Choose Us Over Others?
  </h2>

  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    maxWidth: '900px',
    margin: '0 auto',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0, 191, 255, 0.2)'
  }}>
    {/* Header Row */}
    <div style={cellHeader}>Features</div>
    <div style={cellHeader}>La Villa PG</div>
    <div style={cellHeader}>Traditional PGs</div>

    {/* Row 1 */}
    <div style={cell}>Online Booking</div>
    <div style={cellHighlight}>✅ Available</div>
    <div style={cell}>❌ Not Available</div>

    {/* Row 2 */}
    <div style={cell}>Monthly Reports</div>
    <div style={cellHighlight}>✅ Dashboard View</div>
    <div style={cell}>❌ Manual Check</div>

    {/* Row 3 */}
    <div style={cell}>Secure Payments</div>
    <div style={cellHighlight}>✅ UPI, Card, Wallet</div>
    <div style={cell}>❌ Cash Only</div>

    {/* Row 4 */}
    <div style={cell}>Support</div>
    <div style={cellHighlight}>✅ 24/7 Support</div>
    <div style={cell}>❌ Limited Hours</div>
  </div>
</section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Follow Us</h3>
            <div style={styles.socialIcons}>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaTwitter /></a>
            </div>
          </div>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Contact</h3>
            <p>&copy; 2025 La Villa</p>
            <p>Phone: +91 7010494584</p>
            <p>Email: contact@lavilla.com</p>
          </div>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Subscribe</h3>
            <input type="email" placeholder="Your email" style={styles.newsletterInput} />
            <button style={styles.newsletterButton}>Subscribe</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  container: { backgroundColor: '#17252A', color: '#DEF2F1', fontFamily: 'Poppins, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' },
  frame: { height: '55vh', position: 'relative', overflow: 'hidden' },
  background: { height: '100%', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-image 1s ease' },
  bookNowButton: { padding: '12px 28px', fontSize: '20px', backgroundColor: '#2B7A78', color: '#FEFFFF', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  section: { padding: '40px 20px', textAlign: 'center' },
  sectionDark: { padding: '40px 20px', backgroundColor: '#2B7A78', textAlign: 'center' },
  sectionHeading: { fontSize: '32px', color: '#FEFFFF', marginBottom: '20px' },
  sectionHeadingBlue: { fontSize: '32px', color: '#FEFFFF', marginBottom: '20px' },
  processGrid: { display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' },
  processStep: { width: '200px' },
  featuresGrid: { display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' },
  featureItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '180px' },
  offerGrid: { display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' },
  offerCard: { width: '280px', backgroundColor: '#DEF2F1', color: '#17252A', padding: '20px', borderRadius: '10px' },
  cardImage: { width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px' },
  table: { width: '100%', maxWidth: '700px', margin: '0 auto', borderCollapse: 'collapse', color: '#DEF2F1' },
  testimonialGrid: { display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' },
  testimonial: { width: '280px', color: '#FEFFFF', fontStyle: 'italic' },
  footer: { backgroundColor: '#17252A', padding: '30px 20px', marginTop: 'auto' },
  footerContent: { display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' },
  footerSection: { flex: '1', minWidth: '200px', marginBottom: '20px' },
  footerTitle: { fontSize: '18px', marginBottom: '10px', color: '#3AAFA9' },
  socialIcons: { display: 'flex', gap: '16px', fontSize: '26px', color: '#3AAFA9' },
  newsletterInput: { padding: '10px', fontSize: '16px', borderRadius: '6px', border: '1px solid #3AAFA9', width: '100%', maxWidth: '250px', marginBottom: '8px', backgroundColor: '#DEF2F1', color: '#17252A' },
  newsletterButton: { padding: '10px 20px', fontSize: '16px', color: '#FEFFFF', backgroundColor: '#3AAFA9', border: 'none', borderRadius: '6px', cursor: 'pointer' },
};
const cell = {
  padding: '20px',
  border: '1px solid #3AAFA9',
  backgroundColor: '#2b7a78',
  fontWeight: 500
};

const cellHeader = {
  ...cell,
  backgroundColor: '#3AAFA9',
  fontWeight: 'bold'
};

const cellHighlight = {
  ...cell,
  backgroundColor: '#DEF2F1',
  color: '#17252A'
};

export default Home;
