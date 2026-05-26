import { useState } from "react";
import { X } from "lucide-react";
import { editTransaction } from "../APIcalls/apiCalls";

export default function EditTransactionModal({
  transaction,
  setTransactionToEdit,
  isModalEditOpen,
  setIsModalEditOpen,
  categories,
  refetch,
  editMutation,
}) {
  const [description, setDescription] = useState(transaction.description);
  const [amount, setAmount] = useState(Math.abs(transaction.amount));
  const [t_type, setT_type] = useState(transaction.t_type);
  const [category, setCategory] = useState(transaction.category);
  const [date, setDate] = useState(transaction.date);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !amount || !category) {
      alert("Por favor completa todos los campos");
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      alert("Por favor ingresa un monto válido");
      return;
    }

    const transaccionData = {
        description,
        amount: t_type === "Gasto" ? -numAmount : numAmount,
        t_type,
        category,
        date,
    }
    editMutation.mutate({
        id: transaction.id,
        data: transaccionData
    });

    // Reset form
    setDescription("");
    setAmount("");
    setT_type("Gasto");
    setCategory("");
    setDate(new Date().toISOString().split("T")[0]);
    setIsModalEditOpen(false);
    setTransactionToEdit(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={()=>{
            setIsModalEditOpen(false);
            setTransactionToEdit(null);
        }} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg mx-4 bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="px-6 py-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Editar Transacción
            </h3>

            <button
              onClick={()=>{
                setIsModalEditOpen(false);
                setTransactionToEdit(null);
            }}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo
              </label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setT_type("Ingreso")}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    t_type === "Ingreso"
                      ? "border-green-500 bg-green-50 text-green-700 font-medium"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  Ingreso
                </button>

                <button
                  type="button"
                  onClick={() => setT_type("Gasto")}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    t_type === "Gasto"
                      ? "border-red-500 bg-red-50 text-red-700 font-medium"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  Gasto
                </button>
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Descripción
              </label>

              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ej: Supermercado, Salario..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Amount */}
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Monto
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>

                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <p className="text-yellow-700">Nota: No uses puntos o comas elevadas, solo coma "," para decimales.</p>
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Categoría
              </label>

              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Selecciona una categoría</option>

                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Fecha
              </label>

              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={()=>{
                    setIsModalEditOpen(false);
                    setTransactionToEdit(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                {editMutation.isPending ? "Editando..." : "Editar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
