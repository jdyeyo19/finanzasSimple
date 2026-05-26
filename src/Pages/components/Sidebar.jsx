import {TrendingUp, TrendingDown} from 'lucide-react';

function Sidebar({setActiveView, activeView, balance, totalIncome, totalExpenses}){

    return(
        <aside className="hidden lg:block lg:w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow-sm p-4 space-y-2">
              <button
                onClick={() => setActiveView('dashboard')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeView === 'dashboard'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveView('transactions')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeView === 'transactions'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                Transacciones
              </button>
              <button
                onClick={() => setActiveView('profile')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeView === 'profile'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                Perfil
              </button>
            </nav>

            {/* Balance Card - Desktop Sidebar */}
            <div className="mt-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white">
              <p className="text-blue-100 text-sm mb-2">Balance Total</p>
              <p className="text-3xl font-bold mb-4">${balance ? balance.toLocaleString():0}</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} />
                    <span className="text-sm">Ingresos</span>
                  </div>
                  <span className="font-medium">${totalIncome ?totalIncome.toLocaleString():0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingDown size={16} />
                    <span className="text-sm">Gastos</span>
                  </div>
                  <span className="font-medium">-${totalExpenses ? totalExpenses.toLocaleString():0}</span>
                </div>
              </div>
            </div>
        </aside>
    )
}

export default Sidebar;