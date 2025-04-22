
import Hero from '../components/landing_page/Hero'
import Services from '../components/landing_page/Services'
import Footer from '../components/landing_page/Footer'
import Navbar from '../components/landing_page/Navbar'
import About from '../components/landing_page/About'
import Features from '../components/landing_page/Features'
import '../css/landing.css'

const LandingPage = () => {
  return (
   <>
      <div>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Features /> {/* ✅ Add this line */}
      <Footer />
    </div>
   </>
  )
}

export default LandingPage