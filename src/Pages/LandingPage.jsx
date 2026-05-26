import { Wallet, TrendingUp, BarChart3, Shield, Smartphone, Zap, ArrowRight } from 'lucide-react';
import {useNavigate, Link} from 'react-router-dom'


export default function LandingPage() {

    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Hero Section */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Wallet className="text-blue-600" size={32} />
              <h1 className="text-xl font-bold text-gray-900">Finanzas Simple</h1>
            </div>
            <button
              onClick={()=>navigate('/login')}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Iniciar Sesión
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-6 shadow-lg">
            <Wallet className="text-white" size={40} />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Controla tus Finanzas
            <br />
            <span className="text-blue-600">de manera Simple</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            La aplicación más sencilla e intuitiva para gestionar tus ingresos y gastos personales.
            Toma control de tu dinero hoy mismo.
          </p>
          <button
            onClick={()=>navigate('/login')}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Comenzar Gratis
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20" id='features'>
          {/* Feature 1 */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Seguimiento en Tiempo Real
            </h3>
            <p className="text-gray-600">
              Visualiza tus ingresos y gastos al instante. Mantén el control total de tus finanzas con actualizaciones en tiempo real.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="text-green-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Reportes y Gráficas
            </h3>
            <p className="text-gray-600">
              Analiza tus hábitos financieros con gráficas detalladas y reportes visuales fáciles de entender.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="text-purple-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              100% Seguro
            </h3>
            <p className="text-gray-600">
              Tus datos están protegidos con los más altos estándares de seguridad. Tu información es privada y segura.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow border border-gray-100">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Smartphone className="text-orange-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Diseño Responsive
            </h3>
            <p className="text-gray-600">
              Accede desde cualquier dispositivo. Diseño optimizado para móvil, tablet y escritorio.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow border border-gray-100">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="text-red-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Rápido y Fácil
            </h3>
            <p className="text-gray-600">
              Interfaz intuitiva que te permite registrar transacciones en segundos. No necesitas ser un experto financiero.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow border border-gray-100">
            <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
              <Wallet className="text-cyan-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Categorías Personalizadas
            </h3>
            <p className="text-gray-600">
              Organiza tus gastos por categorías predefinidas: alimentación, transporte, entretenimiento y más.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Listo para tomar control de tus finanzas?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Únete a miles de usuarios que ya están mejorando su salud financiera.
          </p>
          <button
            onClick={()=>navigate('/login')}
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Comienza Ahora - Es Gratis
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-blue-600 mb-2">10,000+</p>
            <p className="text-gray-600">Usuarios Activos</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-600 mb-2">500K+</p>
            <p className="text-gray-600">Transacciones Registradas</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-600 mb-2">4.9/5</p>
            <p className="text-gray-600">Calificación Promedio</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Wallet size={24} />
                <h3 className="text-lg font-semibold">Finanzas Simple App</h3>
              </div>
              <p className="text-gray-400">
                La mejor herramienta para gestionar tus finanzas personales de manera simple y efectiva.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Producto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Características</a></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Registrarse</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Compañía</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="https://juandmh.dev/" target='_blank' rel='noreferrer' className="hover:text-white transition-colors">Sobre Nosotros</a></li>
                <li><a href="https://juandmh.dev/" target='_blank' rel='noreferrer' className="hover:text-white transition-colors">Contacto</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2026 Finanzas Simple App. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}