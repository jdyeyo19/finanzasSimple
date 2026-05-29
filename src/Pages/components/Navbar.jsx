import { Plus, TrendingUp, TrendingDown, Wallet, Menu, X, LogOut } from 'lucide-react';
import { clearTokens } from '../../services/authservice';
import { useState } from 'react';
import '../CSS/components.css'
import { endSession } from '../APIcalls/apiCalls'

function Navbar({setIsMobileMenuOpen, isMobileMenuOpen, userData, logout, onOpen}) {
    const [showConfirm, setShowConfirm] = useState(false);

    async function confirmLogout() {
        const response = await endSession();
        console.log(response);
        console.log(response.message);
        clearTokens();
        logout();
        setShowConfirm(false);
    }

    return(
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                        <Wallet className="text-blue-600" size={32} />
                        <h1 className="text-xl font-bold text-gray-900">Finanzas Simple</h1>
                    </div>

                    <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {userData ? userData.first_name.charAt(0).toUpperCase():"U"}
                            {userData ? userData.last_name.charAt(0).toUpperCase():"N"}
                        </div>
                        <span className="text-sm text-gray-700">{userData?userData.first_name:"User"} {userData?userData.last_name:"Name"}</span>
                    </div>
                    <button
                        onClick={onOpen}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus size={20} />
                        <span className="hidden sm:inline">Agregar</span>
                    </button>
                    <button
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Cerrar Sesión"
                        onClick={()=>{
                            setShowConfirm(true)
                        }}
                    >
                        <LogOut size={20} />
                    </button>
                    </div>
                </div>
            </div>
            {showConfirm && (
            <div className="confirm-overlay">
                <div className="confirm-modal">
                    <h3>¡¡Cerrar Sesión!!</h3>

                    <p>
                    ¿Estás segur@ que deseas finalizar tu sesión?
                    </p>

                    <div className="confirm-actions">
                    <button
                        className="cancel-btn"
                        onClick={() => setShowConfirm(false)}
                    >
                        No
                    </button>

                    <button
                        className="confirm-btn"
                        onClick={confirmLogout}
                    >
                        Si, Salir
                    </button>
                    </div>
                </div>
            </div>
        )}
        </header>
    )
}


export default Navbar