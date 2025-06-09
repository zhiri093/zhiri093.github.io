// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Navbar, Nav, Row, Col, Card, Button, Form, Modal, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Persona definitions
const Personas = () => (
  <div className="persona-section p-4 mb-4 rounded">
    <h3 className="text-center mb-4">Our Target Clients</h3>
    <Row>
      <Col md={6} className="mb-4">
        <Card className="h-100 persona-card">
          <Card.Body>
            <Card.Title>Lucy Thompson</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Marketing Executive, 32</Card.Subtitle>
            <Card.Text>
              <ul>
                <li>Always on-the-go with a busy schedule</li>
                <li>Values efficiency and convenience</li>
                <li>Prefers mobile apps for bookings</li>
                <li><strong>Goal:</strong> Book a short haircut with Jessica on Monday at 2pm</li>
              </ul>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6}>
        <Card className="h-100 persona-card">
          <Card.Body>
            <Card.Title>Marcus Chen</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">University Student, 21</Card.Subtitle>
            <Card.Text>
              <ul>
                <li>Fashion-conscious and budget-aware</li>
                <li>Researches services before booking</li>
                <li>Prefers online communication</li>
                <li><strong>Goal:</strong> Find pricing for color treatments and book a consultation</li>
              </ul>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </div>
);

// Service card component
const ServiceCard = ({ title, description, duration, price }) => (
  <Card className="h-100 service-card">
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>{description}</Card.Text>
      <div className="service-details">
        <span>⏱️ {duration} min</span>
        <span>💲 {price}</span>
      </div>
    </Card.Body>
  </Card>
);

// Stylist card component
const StylistCard = ({ name, specialty, bio }) => (
  <Card className="h-100 stylist-card">
    <Card.Img variant="top" src={`https://i.pravatar.cc/200?u=${name}`} />
    <Card.Body>
      <Card.Title>{name}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{specialty}</Card.Subtitle>
      <Card.Text>{bio}</Card.Text>
    </Card.Body>
  </Card>
);

// Booking form modal
const BookingModal = ({ show, handleClose }) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [selectedStylist, setSelectedStylist] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  const services = [
    { id: 1, name: 'Haircut & Style', price: '$45' },
    { id: 2, name: 'Color Treatment', price: '$85+' },
    { id: 3, name: 'Deep Conditioning', price: '$65' },
    { id: 4, name: 'Special Occasion', price: '$95' }
  ];
  
  const stylists = [
    { id: 1, name: 'Jessica Rivera', specialty: 'Color Specialist' },
    { id: 2, name: 'Michael Chen', specialty: 'Cutting Expert' },
    { id: 3, name: 'Sophia Johnson', specialty: 'Styling Artist' }
  ];
  
  const times = ['9:00 AM', '10:30 AM', '12:00 PM', '1:30 PM', '3:00 PM', '4:30 PM'];
  
  const resetForm = () => {
    setStep(1);
    setSelectedService('');
    setSelectedStylist('');
    setSelectedDate('');
    setSelectedTime('');
  };
  
  const handleSubmit = () => {
    alert(`Booking confirmed with ${selectedStylist} for ${selectedService} on ${selectedDate} at ${selectedTime}`);
    handleClose();
    resetForm();
  };
  
  return (
    <Modal show={show} onHide={() => { handleClose(); resetForm(); }} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{step === 1 ? 'Select Service' : step === 2 ? 'Choose Stylist' : step === 3 ? 'Pick Date & Time' : 'Confirm Booking'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {step === 1 && (
          <div className="booking-step">
            <h5>What service would you like?</h5>
            <Row className="g-3 mt-3">
              {services.map(service => (
                <Col md={6} key={service.id}>
                  <Card 
                    className={`service-option ${selectedService === service.name ? 'selected' : ''}`}
                    onClick={() => setSelectedService(service.name)}
                  >
                    <Card.Body>
                      <Card.Title>{service.name}</Card.Title>
                      <Card.Text>{service.price}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}
        
        {step === 2 && (
          <div className="booking-step">
            <h5>Which stylist would you prefer?</h5>
            <Row className="g-3 mt-3">
              {stylists.map(stylist => (
                <Col md={6} key={stylist.id}>
                  <Card 
                    className={`stylist-option ${selectedStylist === stylist.name ? 'selected' : ''}`}
                    onClick={() => setSelectedStylist(stylist.name)}
                  >
                    <Card.Img variant="top" src={`https://i.pravatar.cc/150?u=${stylist.name}`} />
                    <Card.Body>
                      <Card.Title>{stylist.name}</Card.Title>
                      <Card.Text>{stylist.specialty}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}
        
        {step === 3 && (
          <div className="booking-step">
            <Row>
              <Col md={6}>
                <h5>Select Date</h5>
                <Form.Group className="mb-3">
                  <Form.Control 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <h5>Available Times</h5>
                <div className="time-slots">
                  {times.map((time, index) => (
                    <Button 
                      key={index}
                      variant={selectedTime === time ? 'primary' : 'outline-secondary'}
                      className="m-1"
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </Col>
            </Row>
          </div>
        )}
        
        {step === 4 && (
          <div className="booking-step text-center">
            <h4>Confirm Your Appointment</h4>
            <div className="confirmation-details p-4 mt-3">
              <p><strong>Service:</strong> {selectedService}</p>
              <p><strong>Stylist:</strong> {selectedStylist}</p>
              <p><strong>Date:</strong> {selectedDate}</p>
              <p><strong>Time:</strong> {selectedTime}</p>
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        {step > 1 && (
          <Button variant="secondary" onClick={() => setStep(step - 1)}>
            Back
          </Button>
        )}
        {step < 4 ? (
          <Button 
            variant="primary" 
            onClick={() => setStep(step + 1)}
            disabled={
              (step === 1 && !selectedService) || 
              (step === 2 && !selectedStylist) || 
              (step === 3 && (!selectedDate || !selectedTime))
            }
          >
            Next
          </Button>
        ) : (
          <Button variant="success" onClick={handleSubmit}>
            Confirm Booking
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

// Home page component
const Home = () => {
  const [showBooking, setShowBooking] = useState(false);
  
  const services = [
    {
      title: "Haircut & Styling",
      description: "Professional haircut with blow-dry and styling",
      duration: 60,
      price: "$45-65"
    },
    {
      title: "Color Services",
      description: "Full color, highlights, balayage, and more",
      duration: 120,
      price: "$85-150"
    },
    {
      title: "Hair Treatments",
      description: "Deep conditioning and repair treatments",
      duration: 45,
      price: "$40-80"
    },
    {
      title: "Special Occasion",
      description: "Updos and styling for weddings and events",
      duration: 90,
      price: "$75-120"
    }
  ];
  
  const stylists = [
    {
      name: "Jessica Rivera",
      specialty: "Color Specialist",
      bio: "10+ years experience, specializes in balayage and creative color"
    },
    {
      name: "Michael Chen",
      specialty: "Cutting Expert",
      bio: "Master barber with precision cutting techniques"
    },
    {
      name: "Sophia Johnson",
      specialty: "Styling Artist",
      bio: "Award-winning stylist for special occasions"
    }
  ];
  
  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section text-center text-white">
        <h1>Luminous Salon</h1>
        <p className="lead">Where style meets personality</p>
        <Button variant="light" size="lg" onClick={() => setShowBooking(true)}>
          Book Appointment
        </Button>
      </div>
      
      <Container className="py-5">
        <Row className="mb-5">
          <Col md={8} className="mx-auto text-center">
            <h2>Welcome to Luminous Salon</h2>
            <p className="lead">
              We're dedicated to bringing out your unique beauty with personalized hair services. 
              Our expert stylists stay at the forefront of trends and techniques to give you 
              the perfect look for any occasion.
            </p>
          </Col>
        </Row>
        
        <Personas />
        
        <h3 className="text-center mb-4">Our Services</h3>
        <Row className="g-4 mb-5">
          {services.map((service, index) => (
            <Col md={3} key={index}>
              <ServiceCard {...service} />
            </Col>
          ))}
        </Row>
        
        <h3 className="text-center mb-4">Meet Our Stylists</h3>
        <Row className="g-4 mb-5">
          {stylists.map((stylist, index) => (
            <Col md={4} key={index}>
              <StylistCard {...stylist} />
            </Col>
          ))}
        </Row>
        
        <Row className="contact-info mb-5 p-4 rounded">
          <Col md={4} className="text-center">
            <h4>Hours</h4>
            <p>Mon-Fri: 9am - 7pm</p>
            <p>Sat: 10am - 5pm</p>
            <p>Sun: Closed</p>
          </Col>
          <Col md={4} className="text-center">
            <h4>Location</h4>
            <p>123 Style Avenue</p>
            <p>Ottawa, ON K1S 0B5</p>
            <p>Near Algonquin College</p>
          </Col>
          <Col md={4} className="text-center">
            <h4>Contact</h4>
            <p>info@luminoussalon.ca</p>
            <p>(613) 555-0123</p>
            <Button variant="outline-light" className="mt-2">
              Get Directions
            </Button>
          </Col>
        </Row>
        
        <div className="text-center mt-5">
          <Button variant="primary" size="lg" onClick={() => setShowBooking(true)}>
            Book Your Appointment Now
          </Button>
        </div>
      </Container>
      
      <BookingModal show={showBooking} handleClose={() => setShowBooking(false)} />
    </div>
  );
};

// About page component
const About = () => (
  <Container className="py-5">
    <h2 className="text-center mb-5">About Luminous Salon</h2>
    
    <Row className="mb-5">
      <Col md={6}>
        <h3>Our Story</h3>
        <p>
          Founded in 2018, Luminous Salon began with a simple vision: to create a space where 
          clients feel valued and leave looking and feeling their best. Our founder, Elena Rodriguez, 
          brought together a team of talented stylists who share a passion for creativity and 
          excellence in hair care.
        </p>
        <p>
          Over the years, we've grown into a beloved neighborhood salon known for our welcoming 
          atmosphere and exceptional results. We continuously invest in education to stay current 
          with the latest trends and techniques.
        </p>
      </Col>
      <Col md={6}>
        <img 
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1674&auto=format&fit=crop" 
          alt="Salon interior" 
          className="img-fluid rounded"
        />
      </Col>
    </Row>
    
    <Row className="mt-5">
      <Col md={6} className="order-md-2">
        <h3>Our Philosophy</h3>
        <p>
          At Luminous Salon, we believe that great hair is more than just a style - it's a form 
          of self-expression. We take the time to understand your lifestyle, preferences, and 
          hair needs to create a look that's uniquely you.
        </p>
        <p>
          We use only premium, eco-conscious products that deliver beautiful results while being 
          gentle on your hair and the environment. Our commitment to sustainability extends to 
          our salon operations as well.
        </p>
      </Col>
      <Col md={6} className="order-md-1">
        <img 
          src="https://images.unsplash.com/photo-1599351431407-5b0b8c7a3d24?q=80&w=1632&auto=format&fit=crop" 
          alt="Salon products" 
          className="img-fluid rounded"
        />
      </Col>
    </Row>
    
    <div className="text-center mt-5">
      <Button variant="outline-primary" size="lg" as={Link} to="/">
        View Our Services
      </Button>
    </div>
  </Container>
);

// Gallery page component
const Gallery = () => {
  const galleryItems = [
    { id: 1, category: "Color" },
    { id: 2, category: "Cut" },
    { id: 3, category: "Styling" },
    { id: 4, category: "Special Occasion" },
    { id: 5, category: "Color" },
    { id: 6, category: "Cut" },
    { id: 7, category: "Styling" },
    { id: 8, category: "Special Occasion" }
  ];
  
  return (
    <Container className="py-5">
      <h2 className="text-center mb-5">Our Work</h2>
      
      <div className="gallery-filter mb-4 text-center">
        <Button variant="outline-secondary" className="m-1">All</Button>
        <Button variant="outline-secondary" className="m-1">Color</Button>
        <Button variant="outline-secondary" className="m-1">Cut</Button>
        <Button variant="outline-secondary" className="m-1">Styling</Button>
        <Button variant="outline-secondary" className="m-1">Special Occasion</Button>
      </div>
      
      <Row className="gallery-grid g-4">
        {galleryItems.map(item => (
          <Col md={3} key={item.id}>
            <div className="gallery-item">
              <img 
                src={`https://source.unsplash.com/random/300x400/?hairstyle,${item.category}`} 
                alt={`${item.category} style`}
                className="img-fluid"
              />
              <div className="gallery-overlay">
                <div className="overlay-content">
                  <h5>{item.category} Style</h5>
                  <Button variant="light">View Details</Button>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

// Contact page component
const Contact = () => (
  <Container className="py-5">
    <h2 className="text-center mb-5">Contact Us</h2>
    
    <Row>
      <Col md={6} className="mb-4">
        <div className="contact-card p-4 rounded h-100">
          <h4>Visit Our Salon</h4>
          <p className="mt-4">📍 123 Style Avenue, Ottawa, ON K1S 0B5</p>
          <p>📱 (613) 555-0123</p>
          <p>✉️ info@luminoussalon.ca</p>
          
          <h5 className="mt-4">Hours</h5>
          <p>Monday-Friday: 9am - 7pm</p>
          <p>Saturday: 10am - 5pm</p>
          <p>Sunday: Closed</p>
          
          <Button variant="outline-primary" className="mt-3">
            Get Directions
          </Button>
        </div>
      </Col>
      
      <Col md={6}>
        <div className="contact-form p-4 rounded">
          <h4>Send Us a Message</h4>
          <Form className="mt-4">
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Your name" />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Your email" />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="tel" placeholder="Your phone number" />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="How can we help you?" />
            </Form.Group>
            
            <Button variant="primary" type="submit">
              Send Message
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
    
    <div className="mt-5 text-center">
      <h4>Follow Us</h4>
      <div className="social-links mt-3">
        <Button variant="outline-dark" className="m-2">Instagram</Button>
        <Button variant="outline-dark" className="m-2">Facebook</Button>
        <Button variant="outline-dark" className="m-2">TikTok</Button>
      </div>
    </div>
  </Container>
);

// Footer component
const Footer = () => (
  <footer className="footer bg-dark text-white py-4">
    <Container>
      <Row>
        <Col md={4} className="mb-3 mb-md-0">
          <h5>Luminous Salon</h5>
          <p>Professional hair services with a personal touch.</p>
          <p>© {new Date().getFullYear()} Luminous Salon. All rights reserved.</p>
        </Col>
        
        <Col md={4} className="mb-3 mb-md-0">
          <h5>Quick Links</h5>
          <ul className="list-unstyled">
            <li><Link to="/" className="text-white">Home</Link></li>
            <li><Link to="/about" className="text-white">About Us</Link></li>
            <li><Link to="/gallery" className="text-white">Gallery</Link></li>
            <li><Link to="/contact" className="text-white">Contact</Link></li>
          </ul>
        </Col>
        
        <Col md={4}>
          <h5>Designed By</h5>
          <p>SEG3125 Group #7</p>
          <p>Alex Morgan & Taylor Kim</p>
          <p>University of Ottawa</p>
        </Col>
      </Row>
    </Container>
  </footer>
);

// Main App component
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar bg="light" expand="lg" sticky="top" className="custom-navbar">
          <Container>
            <Navbar.Brand as={Link} to="/" className="fw-bold">
              <span className="brand-highlight">Luminous</span> Salon
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
                <Nav.Link as={Link} to="/gallery">Gallery</Nav.Link>
                <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                <Button variant="primary" as={Link} to="/" className="ms-2 booking-btn">
                  Book Now
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;