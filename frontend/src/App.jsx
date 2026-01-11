import { useEffect, useState } from 'react'
import api from './api'

export default function App() {
  const [church, setChurch] = useState(null)
  const [services, setServices] = useState([])
  const [events, setEvents] = useState([])
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [churchRes, servicesRes, eventsRes, newsRes] = await Promise.all([
        api.get('/church'),
        api.get('/services'),
        api.get('/events'),
        api.get('/news')
      ])

      setChurch(churchRes.data)
      setServices(servicesRes.data)
      setEvents(eventsRes.data)
      setNews(newsRes.data)
    } catch (error) {
      console.error('Erreur chargement données:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-church-50 to-church-100">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-church-600 rounded-full mb-4">
            <div className="w-12 h-12 border-4 border-white border-t-church-200 rounded-full animate-spin"></div>
          </div>
          <p className="text-church-600 font-semibold">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-church-600 to-church-700 text-white shadow-lg">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">🙏 {church?.name || 'Eglizia'}</div>
            <div className="space-x-6">
              <a href="#services" className="hover:text-church-200 transition">Services</a>
              <a href="#events" className="hover:text-church-200 transition">Événements</a>
              <a href="#news" className="hover:text-church-200 transition">Actualités</a>
              <a href="#contact" className="hover:text-church-200 transition">Contact</a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-church-50 to-church-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-church-900 mb-4">{church?.name}</h1>
          <p className="text-xl text-church-700 mb-8">{church?.tagline}</p>
          <p className="max-w-2xl mx-auto text-church-600">{church?.description}</p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-church-900 mb-12 text-center">Nos Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map(service => (
              <div key={service.id} className="bg-church-50 p-8 rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="text-xl font-bold text-church-700 mb-2">{service.type}</h3>
                <p className="text-church-600 mb-2">📅 {service.day} à {service.time}</p>
                <p className="text-gray-700">{service.description}</p>
                <p className="text-sm text-church-600 mt-2">Durée: {service.duration}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-16 bg-church-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-church-900 mb-12 text-center">Événements à venir</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {events.map(event => (
              <div key={event.id} className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-church-700 mb-2">{event.title}</h3>
                <p className="text-church-600 mb-2">📆 {event.date} à {event.time}</p>
                <p className="text-church-600 mb-2">📍 {event.location}</p>
                <p className="text-gray-700 mb-4">{event.description}</p>
                <p className="text-sm text-church-600">Inscrits: {event.registered}/{event.capacity}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-church-900 mb-12 text-center">Actualités</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {news.map(item => (
              <div key={item.id} className="bg-church-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                {item.image && (
                  <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-church-700 mb-2">{item.title}</h3>
                  <p className="text-sm text-church-600 mb-4">{item.date}</p>
                  <p className="text-gray-700">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-church-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-bold mb-4">📍 Localisation</h4>
              <p>{church?.address}</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">📞 Contact</h4>
              <p>Email: {church?.email}</p>
              <p>Téléphone: {church?.phone}</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Réseaux sociaux</h4>
              <div className="space-y-2">
                {church?.socialMedia?.facebook && (
                  <a href={church.socialMedia.facebook} className="block hover:text-church-400">Facebook</a>
                )}
                {church?.socialMedia?.instagram && (
                  <a href={church.socialMedia.instagram} className="block hover:text-church-400">Instagram</a>
                )}
              </div>
            </div>
          </div>
          <div className="border-t border-church-700 pt-8 text-center">
            <p>&copy; 2026 {church?.name}. Tous droits réservés. 🙏</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
