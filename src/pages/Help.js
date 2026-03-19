import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqCategories = [
    {
      category: 'Account & Authentication',
      icon: '🔐',
      faqs: [
        {
          q: 'How do I log in to the system?',
          a: 'HLE uses a secure email-based OTP authentication system. Enter your registered email address on the login page, click "Send OTP", and check your inbox for a 6-digit verification code. Enter this code within 5 minutes to access your dashboard. No passwords required!'
        },
        {
          q: 'What if I don\'t receive the OTP?',
          a: 'First, check your Spam or Promotions folder. If the OTP is not there, ensure your internet connection is stable and wait 2 minutes before requesting a new OTP. The OTP is valid for 5 minutes only. If issues persist, contact your hostel administrator.'
        },
        {
          q: 'Can I change my email address?',
          a: 'Yes. Go to Profile → Settings → Change Email. You\'ll need to verify both your old and new email addresses through OTP verification. This ensures account security.'
        },
      ]
    },
    {
      category: 'Complaints & Maintenance',
      icon: '🛠️',
      faqs: [
        {
          q: 'How do I raise a maintenance complaint?',
          a: 'Go to your Student Dashboard → Click "Raise Complaint" → Select category (Electrical, Plumbing, Carpentry, etc.) → Add title and description → Upload a photo of the issue → Select priority level → Submit. The system automatically notifies the warden and assigns it to the appropriate caretaker.'
        },
        {
          q: 'Can I use voice to raise complaints?',
          a: 'Yes! HLE supports voice-based complaint filing. Click the microphone icon on the complaint form, speak your issue in Hindi or English, and our AI will convert it to text automatically. You can then review and submit.'
        },
        {
          q: 'How long does it take to resolve complaints?',
          a: 'Resolution time depends on priority: Critical issues (24 hours), Urgent issues (2-3 days), Normal issues (3-5 days). You can track real-time status updates on your dashboard and receive notifications at each stage.'
        },
        {
          q: 'Can I delete my complaint after submission?',
          a: 'Yes, but only within 24 hours of raising it and only if the status is "Raised" (not yet assigned). After 24 hours or once assigned to a caretaker, deletion is not allowed to maintain accountability.'
        },
        {
          q: 'What is photo verification and why is it mandatory?',
          a: 'Photo verification ensures accountability. When raising a complaint, you must upload a "before" photo showing the issue. When marking as resolved, the caretaker must upload an "after" photo proving the work is completed. This creates a visual audit trail.'
        },
      ]
    },
    {
      category: 'Food & Mess Management',
      icon: '🍕',
      faqs: [
        {
          q: 'How do I check the daily mess menu?',
          a: 'Go to Food Hub → Today\'s Menu. You\'ll see breakfast, lunch, dinner, and snacks with detailed timings. The menu is updated daily by the mess committee and shows the complete week\'s schedule.'
        },
        {
          q: 'How do I rate mess food?',
          a: 'After each meal, go to Food Hub → Rate Today\'s Meal → Select the meal (breakfast/lunch/dinner) → Give a star rating (1-5) → Add optional feedback. Your feedback helps improve food quality through AI-powered sentiment analysis.'
        },
        {
          q: 'Who can see my mess feedback?',
          a: 'Individual ratings are anonymous. Only aggregated data (average ratings, sentiment trends) is visible to the mess committee and hostel administration. Your personal feedback remains confidential unless you choose to make it public.'
        },
      ]
    },
    {
      category: 'Bills & Payments',
      icon: '💰',
      faqs: [
        {
          q: 'How do I view my hostel bills?',
          a: 'Go to My Bills section. You\'ll see all your monthly dues including mess charges, electricity, water, and other fees. Each bill shows detailed breakdowns, due dates, and payment status.'
        },
        {
          q: 'Can I download bill receipts?',
          a: 'Yes! Click on any bill → View Details → Download PDF. You can generate hostel clearance certificates for the entire semester or year, which are required for exam hall tickets and final year clearance.'
        },
      ]
    },
    {
      category: 'Privacy & Security',
      icon: '🔒',
      faqs: [
        {
          q: 'Who can see my complaints and personal data?',
          a: 'HLE uses role-based access control (RBAC). Students can only see their own complaints. Wardens see all complaints in their hostel. Caretakers see only complaints assigned to them. Admins have full system access for oversight. Personal data (phone, email, room number) is never shared publicly.'
        },
        {
          q: 'Is my data safe and encrypted?',
          a: 'Yes. All passwords are hashed using bcrypt. API communication uses JWT tokens. Sensitive data is encrypted in transit (HTTPS) and at rest (PostgreSQL encryption). We follow industry-standard security practices and regularly update our systems.'
        },
      ]
    },
    {
      category: 'System Features',
      icon: '⚙️',
      faqs: [
        {
          q: 'What is the Maintenance Heatmap?',
          a: 'The heatmap is a visual representation of complaint frequency across different hostel blocks and room numbers. Red zones indicate high complaint areas, helping administrators identify recurring problems and allocate maintenance resources effectively.'
        },
        {
          q: 'What is the Live Public Dashboard?',
          a: 'A transparent, real-time view of all active complaints, resolution rates, and system metrics accessible to everyone without login. This ensures complete accountability and lets students track overall hostel maintenance performance.'
        },
        {
          q: 'What should I do in an emergency?',
          a: 'Click the red "Emergency SOS" button on your dashboard. This immediately alerts the warden, security, and admin with your location and issue. Use this only for genuine emergencies like fire, medical issues, or safety threats.'
        },
      ]
    },
  ];

  const allFaqs = faqCategories.flatMap(cat => 
    cat.faqs.map(faq => ({ ...faq, category: cat.category, icon: cat.icon }))
  );

  const filteredFaqs = searchQuery.trim() === '' 
    ? faqCategories 
    : [{
        category: 'Search Results',
        icon: '🔍',
        faqs: allFaqs.filter(faq => 
          faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }];

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <Navbar />

      {/* HERO */}
      <div style={{ 
        backgroundColor: '#FFFFFF',
        padding: '3rem 2rem',
        borderBottom: '3px solid #000000',
        textAlign: 'center',
      }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          fontWeight: 'bold', 
          fontFamily: 'system-ui',
          margin: 0,
          marginBottom: '1rem',
        }}>
          Help Center
        </h1>
        <p style={{ 
          fontSize: '1.1rem',
          fontFamily: 'monospace',
          color: '#666',
          maxWidth: '600px',
          margin: '0 auto',
        }}>
          Find answers to frequently asked questions about HLE features and functionality
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>

        {/* SEARCH BAR */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
            <input
              type="text"
              placeholder="Search for help... (e.g., 'How do I raise a complaint?')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem 1rem 1rem 3rem',
                border: '3px solid #000000',
                fontSize: '1rem',
                fontFamily: 'monospace',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            <span style={{ 
              position: 'absolute', 
              left: '1rem', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              fontSize: '1.2rem' 
            }}>
              🔍
            </span>
          </div>
        </div>

        {/* FAQ CATEGORIES */}
        {filteredFaqs.map((category, catIndex) => (
          <div key={catIndex} style={{ marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              fontFamily: 'system-ui',
              marginBottom: '1.5rem',
              borderBottom: '3px solid #000000',
              paddingBottom: '0.75rem',
            }}>
              {category.icon} {category.category}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {category.faqs.map((faq, faqIndex) => {
                const faqId = `${catIndex}-${faqIndex}`;
                const isExpanded = expandedFaq === faqId;

                return (
                  <div 
                    key={faqIndex} 
                    style={{ 
                      backgroundColor: 'white', 
                      border: '3px solid #000000',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onClick={() => setExpandedFaq(isExpanded ? null : faqId)}
                    onMouseEnter={(e) => {
                      if (!isExpanded) {
                        e.currentTarget.style.backgroundColor = '#F3F4F6';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                    }}
                  >
                    <div style={{ 
                      padding: '1.25rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                      <h3 style={{ 
                        fontSize: '1.1rem', 
                        fontWeight: 'bold', 
                        fontFamily: 'system-ui',
                        margin: 0,
                        color: isExpanded ? '#2563EB' : '#000000',
                      }}>
                        {faq.q}
                      </h3>
                      <div style={{ 
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#666',
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s',
                      }}>
                        ▼
                      </div>
                    </div>

                    {isExpanded && (
                      <div style={{ 
                        padding: '0 1.25rem 1.25rem 1.25rem',
                        borderTop: '2px solid #E5E7EB',
                        marginTop: '0.5rem',
                      }}>
                        <p style={{ 
                          fontFamily: 'monospace', 
                          lineHeight: '1.8',
                          color: '#333',
                          margin: 0,
                          fontSize: '0.95rem',
                          paddingTop: '1rem',
                        }}>
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* NO RESULTS */}
        {searchQuery && filteredFaqs[0].faqs.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem',
            backgroundColor: 'white',
            border: '3px solid #000000',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'system-ui', marginBottom: '0.5rem' }}>
              No results found
            </h3>
            <p style={{ fontFamily: 'monospace', color: '#666' }}>
              Try different keywords or browse categories above
            </p>
          </div>
        )}

        {/* CONTACT SECTION */}
        <div style={{ marginTop: '4rem' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            fontFamily: 'system-ui',
            marginBottom: '1.5rem',
            borderBottom: '3px solid #000000',
            paddingBottom: '0.75rem',
          }}>
            📞 Still Need Help?
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ backgroundColor: 'white', padding: '2rem', border: '3px solid #000000' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'system-ui', marginBottom: '1rem' }}>
                Contact Support
              </h3>
              <div style={{ fontFamily: 'monospace', lineHeight: '2', color: '#333' }}>
                <div><strong>Email:</strong> support@hle.edu.in</div>
                <div><strong>Phone:</strong> +91-XXXX-XXXXXX</div>
                <div><strong>Office Hours:</strong> Mon-Fri, 9 AM - 5 PM</div>
                <div><strong>Location:</strong> Hostel Office, Ground Floor</div>
              </div>
            </div>

            <div style={{ backgroundColor: 'white', padding: '2rem', border: '3px solid #000000' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'system-ui', marginBottom: '1rem' }}>
                Emergency Contact
              </h3>
              <div style={{ fontFamily: 'monospace', lineHeight: '2', color: '#333' }}>
                <div><strong>Warden:</strong> +91-XXXX-XXXXXX</div>
                <div><strong>Security:</strong> +91-XXXX-XXXXXX</div>
                <div><strong>Medical:</strong> +91-XXXX-XXXXXX</div>
                <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#FEE2E2', border: '2px solid #DC2626' }}>
                  <strong style={{ color: '#DC2626' }}>🚨 For emergencies, use the Emergency SOS button on your dashboard</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div style={{ marginTop: '3rem', backgroundColor: '#F9FAFB', padding: '2rem', border: '3px solid #000000' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'system-ui', marginBottom: '1rem' }}>
            Quick Links
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            <a href="/about" style={{ fontFamily: 'monospace', color: '#2563EB', textDecoration: 'none', fontWeight: 'bold' }}>
              → About HLE
            </a>
            <a href="/dashboard" style={{ fontFamily: 'monospace', color: '#2563EB', textDecoration: 'none', fontWeight: 'bold' }}>
              → Dashboard
            </a>
            <a href="/complaints/create" style={{ fontFamily: 'monospace', color: '#2563EB', textDecoration: 'none', fontWeight: 'bold' }}>
              → Raise Complaint
            </a>
            <a href="/food" style={{ fontFamily: 'monospace', color: '#2563EB', textDecoration: 'none', fontWeight: 'bold' }}>
              → Food Hub
            </a>
            <a href="/bills" style={{ fontFamily: 'monospace', color: '#2563EB', textDecoration: 'none', fontWeight: 'bold' }}>
              → My Bills
            </a>
            <a href="/notices" style={{ fontFamily: 'monospace', color: '#2563EB', textDecoration: 'none', fontWeight: 'bold' }}>
              → Notices
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Help;