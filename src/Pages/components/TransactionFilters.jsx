import { useState } from "react";
import { Search, Filter, X } from "lucide-react";

export default function TransactionFilters({ categories, onFilter }) {
  const [filters, setFilters] = useState({
    category: "",
    date: "",
    year: "",
    month: "",
    start_date: "",
    end_date: "",
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // eliminar filtros vacíos
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== ""),
    );

    onFilter(cleanFilters);

    setIsOpen(false);
  };

  const clearFilters = () => {
    const emptyFilters = {
      category: "",
      date: "",
      year: "",
      month: "",
      start_date: "",
      end_date: "",
    };
    const nofilters = {};
    setFilters(emptyFilters);

    onFilter(nofilters);
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      {/* Open Filters Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center gap-2
          px-4 py-2
          rounded-lg
          bg-blue-600
          text-white
          hover:bg-blue-700
          transition-colors
        "
      >
        <Filter size={18} />
        Filtros
      </button>

      {/* Filter Panel */}
      {isOpen && (
        <div
          className="
            mt-4
            bg-white
            border
            border-gray-200
            rounded-2xl
            shadow-lg
            p-6
          "
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Filtrar transacciones</h2>

            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Categoría
              </label>

              <select
                name="category"
                value={filters.category}
                onChange={handleChange}
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-lg
                  px-4 py-2
                  focus:ring-2
                  focus:ring-blue-500
                  outline-none
                "
              >
                <option value="">Todas</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Exact Date */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Fecha exacta
              </label>

              <input
                type="date"
                name="date"
                value={filters.date}
                onChange={handleChange}
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-lg
                  px-4 py-2
                  focus:ring-2
                  focus:ring-blue-500
                  outline-none
                "
              />
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-medium mb-2">Año</label>

              <input
                type="number"
                name="year"
                placeholder="2026"
                value={filters.year}
                onChange={handleChange}
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-lg
                  px-4 py-2
                  focus:ring-2
                  focus:ring-blue-500
                  outline-none
                "
              />
            </div>

            {/* Month */}
            <div>
              <label className="block text-sm font-medium mb-2">Mes</label>

              <select
                name="month"
                value={filters.month}
                onChange={handleChange}
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-lg
                  px-4 py-2
                  focus:ring-2
                  focus:ring-blue-500
                  outline-none
                "
              >
                <option value="">Todos</option>
                <option value="1">Enero</option>
                <option value="2">Febrero</option>
                <option value="3">Marzo</option>
                <option value="4">Abril</option>
                <option value="5">Mayo</option>
                <option value="6">Junio</option>
                <option value="7">Julio</option>
                <option value="8">Agosto</option>
                <option value="9">Septiembre</option>
                <option value="10">Octubre</option>
                <option value="11">Noviembre</option>
                <option value="12">Diciembre</option>
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Fecha inicial
              </label>

              <input
                type="date"
                name="start_date"
                value={filters.start_date}
                onChange={handleChange}
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-lg
                  px-4 py-2
                  focus:ring-2
                  focus:ring-blue-500
                  outline-none
                "
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Fecha final
              </label>

              <input
                type="date"
                name="end_date"
                value={filters.end_date}
                onChange={handleChange}
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-lg
                  px-4 py-2
                  focus:ring-2
                  focus:ring-blue-500
                  outline-none
                "
              />
            </div>

            {/* Buttons */}
            <div className="col-span-full flex gap-3 mt-4">
              <button
                type="submit"
                className="
                  flex items-center gap-2
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  px-5 py-2.5
                  rounded-lg
                  transition-colors
                "
              >
                <Search size={18} />
                Aplicar filtros
              </button>

              <button
                type="button"
                onClick={()=>clearFilters()}
                className="
                  bg-gray-100
                  hover:bg-gray-200
                  text-gray-700
                  px-5 py-2.5
                  rounded-lg
                  transition-colors
                "
              >
                Limpiar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
