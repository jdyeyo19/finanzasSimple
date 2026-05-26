import {TrendingUp, TrendingDown} from 'lucide-react';

function MobileCardsBalance({balance, totalIncome, totalExpenses}){

    return(
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-lg p-4 text-white">
                <p className="text-blue-100 text-sm mb-1">Balance</p>
                <p className="text-2xl font-bold">${balance ? balance.toLocaleString():0}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center gap-2 text-green-600 mb-1">
                <TrendingUp size={16} />
                <p className="text-sm">Ingresos</p>
            </div>
            <p className="text-xl font-bold text-gray-900">${totalIncome ? totalIncome.toLocaleString():0}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center gap-2 text-red-600 mb-1">
                <TrendingDown size={16} />
                <p className="text-sm">Gastos</p>
            </div>
            <p className="text-xl font-bold text-gray-900">${totalExpenses ? totalExpenses.toLocaleString():0}</p>
            </div>
        </div>
    )
};

export default MobileCardsBalance;