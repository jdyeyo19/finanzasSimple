

function MobileMenu({activeView, setActiveView, setIsMobileMenuOpen}){
    return(
        <div className="lg:hidden fixed top-16 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-2">
            <button
              onClick={() => {
                setActiveView('dashboard');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                activeView === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                setActiveView('transactions');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                activeView === 'transactions' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
              }`}
            >
              Transacciones
            </button>
            <button
              onClick={() => {
                setActiveView('profile');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                activeView === 'profile' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
              }`}
            >
              Perfil
            </button>
          </nav>
        </div>
    )
}

export default MobileMenu;