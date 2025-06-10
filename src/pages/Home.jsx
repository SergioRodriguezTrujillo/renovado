"use client"

import Header from "../components/Header"
import Footer from "../components/Footer"
import "./Home.css"

function Home() {
  return (
    <div className="home-page">
      <Header />

      <main>
        {/* Sección Hero */}
        <section className="intro section-light">
          <div className="container">
            <div className="hero-image">
              <img src="/images/00001.jpg" alt="Barbería Renovado" />
              <div className="hero-text">
                <h2>Barbería Cristiana Renovados</h2>
                <p>"Crea en mí, oh Dios, un corazón limpio, y renueva un espíritu recto dentro de mí."</p>
                <p>Salmo 51:10</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección Sobre Nosotros */}
        <section className="about-section section-white">
          <div className="container">
            <h2 className="section-title">Nuestro Local</h2>
            <div className="about-content">
              <div className="about-image">
                <img src="/images/barberia.jpg" alt="Local de Barbería Renovado" />
              </div>
              <div className="about-text">
                <h3>Nuestro Propósito</h3>
                <p>
                  En la Barbería Renovados creemos que un buen corte de cabello es solo el comienzo de una
                  transformación. Nuestro espacio ha sido diseñado para brindarte más que un servicio estético; es un
                  lugar donde encontrarás paz, buena conversación y la oportunidad de renovarte por dentro y por fuera.
                </p>
                <p className="bible-verse">"Renuévense en el espíritu de su mente" (Efesios 4:23)</p>
                <p>
                  Bajo este principio, nos esforzamos por crear un ambiente donde cada cliente se sienta valorado,
                  respetado y salga no solo con una mejor apariencia, sino también con un espíritu renovado.
                </p>
                <div className="button-container">
                  <a href="/galeria" className="btn-primary">
                    <i className="material-icons">photo_library</i>
                    <span>Descubre nuestros estilos</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección Barbero */}
        <section className="barber-section section-light">
          <div className="container">
            <h2 className="section-title">Nuestro Barbero</h2>
            <div className="barber-content">
              <div className="barber-image">
                <img src="/images/barbero.jpg" alt="Barbero de Renovado" />
              </div>
              <div className="barber-text">
                <h3>Sirviendo con excelencia</h3>
                <p>
                  Nuestro barbero no solo es experto en su oficio, sino también es una persona comprometida con valores
                  cristianos de servicio y excelencia. Con más de 10 años de experiencia, combina técnicas modernas con
                  un trato personalizado que refleja el amor de Cristo.
                </p>
                <p className="bible-verse">
                  "Y todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres" (Colosenses 3:23)
                </p>
                <p>
                  Esta escritura guía nuestro trabajo diario, asegurándonos de que cada corte sea realizado con la mayor
                  dedicación y cuidado, como un acto de servicio a Dios y a nuestros clientes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección Servicios */}
        <section className="services-section section-white">
          <div className="container">
            <h2 className="section-title">Servicios</h2>
            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon">
                  <img src="/images/diseño/119.jpg" alt="Icono de corte de cabello" />
                </div>
                <h3>Cortes de Cabello</h3>
                <p>
                  Respetamos cada cabello como parte de tu identidad, ofreciendo cortes que realzan tu personalidad y te
                  hacen sentir renovado.
                </p>
                <p className="service-price">Desde $150.00</p>
              </div>
              <div className="service-card">
                <div className="service-icon">
                  <img src="/images/diseño/001.jpg" alt="Icono de barba" />
                </div>
                <h3>Arreglo de Barba</h3>
                <p>
                  Una barba bien cuidada refleja disciplina y carácter. Nuestro servicio de arreglo de barba te ayudará
                  a mantener un aspecto distinguido que honra la imagen con la que fuiste creado.
                </p>
                <p className="service-price">Desde $50.00</p>
              </div>
              <div className="service-card">
                <div className="service-icon">
                  <img src="/images/barba/081.jpg" alt="Icono de cejas" />
                </div>
                <h3>Arreglo de Cejas</h3>
                <p>Enmarcamos tus ojos con un arreglo de cejas que resalta tu mirada y completa tu imagen renovada.</p>
                <p className="service-price">Desde $50.00</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección Ubicación */}
        <section className="location-section section-light">
          <div className="container">
            <h2 className="section-title">Encuéntranos</h2>
            <div className="location-content">
              <div className="location-info">
                <h3>"Ven y renueva tu vida"</h3>
                <p>
                  <strong>Dirección:</strong> Calle Moncada #224 % Callamo & Cisnero
                </p>
                <p>
                  <strong>Horario:</strong> Lunes a Sábado de 9:00 AM a 6:00 PM
                </p>
                <p>
                  <strong>Teléfono:</strong> +53 54959570
                </p>
                <div className="button-container">
                  <a href="https://wa.me/54959570" className="btn-primary" target="_blank" rel="noopener noreferrer">
                    <i className="material-icons">chat</i>
                    <span>Agenda tu cita por WhatsApp</span>
                  </a>
                </div>
              </div>
              <div className="location-map">
                <a
                  href="https://www.google.com/maps?q=20.209300,-75.995192"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-link"
                >
                  <img
                    src="/images/mapa.png"
                    alt="Ubicación de Barbería Renovado"
                    className="map-image"
                  />
                  <div className="map-overlay">
                    <span>Haz clic para ver en Google Maps</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Home
