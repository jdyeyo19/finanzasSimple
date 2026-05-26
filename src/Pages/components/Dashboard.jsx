import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { format, startOfMonth, endOfMonth, eachMonthOfInterval, subMonths, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

export function Dashboard({ transactions, balance, totalIncome, totalExpenses }) {


  // Preparar datos para gráfico de categorías
  const expensesByCategory = transactions
    .filter(t => t.t_type === 'Gasto')
    .reduce((acc, t) => {
      const category = t.category;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += Math.abs(t.amount);
      return acc;
    }, {});

  const categoryData = Object.entries(expensesByCategory)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // Preparar datos para gráfico de tendencia (últimos 6 meses)
  const today = new Date();
  const sixMonthsAgo = subMonths(today, 5);
  const months = eachMonthOfInterval({ start: sixMonthsAgo, end: today });

  const trendData = months.map(month => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);

    const monthTransactions = transactions.filter(t => {
      const tDate = new Date(t.date);
      return tDate >= monthStart && tDate <= monthEnd;
    });

    const income = monthTransactions
      .filter(t => t.t_type === 'Ingreso')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const expenses = monthTransactions
      .filter(t => t.t_type === 'Gasto')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    return {
      month: format(month, 'MMM', { locale: es }),
      ingresos: income,
      gastos: expenses,
    };
  });

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Summary Cards - Desktop Only */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white">
          <p className="text-blue-100 text-sm mb-2">Balance Total</p>
          <p className="text-3xl font-bold">${balance.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-gray-600 text-sm mb-2">Ingresos Totales</p>
          <p className="text-3xl font-bold text-green-600">${totalIncome.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <p className="text-gray-600 text-sm mb-2">Gastos Totales</p>
          <p className="text-3xl font-bold text-red-600">${totalExpenses.toLocaleString()}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Chart */}
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tendencia (6 meses)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis width="auto" />
              <Tooltip formatter={(value) => `$${value}`} />
              <Legend />
              <Line type="monotone" dataKey="ingresos" stroke="#10b981" strokeWidth={2} name="Ingresos" />
              <Line type="monotone" dataKey="gastos" stroke="#ef4444" strokeWidth={2} name="Gastos" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Gastos por Categoría</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip formatter={(value) => `$${value}`} />
              <Bar dataKey="value" fill="#3b82f6" name="Gasto" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Transacciones Recientes</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentTransactions.map(transaction => (
            <div key={transaction.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex-1">
                <p className="font-medium text-gray-900">{transaction.description}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm text-gray-500">{transaction.category}</span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-500">
                    {format(parseISO(transaction.date), "d 'de' MMMM", { locale: es })}
                  </span>
                </div>
              </div>
              <div className={`text-lg font-semibold ${
                transaction.t_type === 'Ingreso' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.t_type === 'Ingreso' ? '+' : '-'}${Math.abs(transaction.amount).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}