import { format, parseISO } from "date-fns";
import { Trash2, Calendar, PencilLine, Tag } from "lucide-react";
import { es } from "date-fns/locale";

function MobiletransactionView({
  transaction,
  setIsModalDeleteOpen,
  setIdToDelete,
  getCategoryColor,
  getCategoryIcon,
  setIsModalEditOpen,
  setTransactionToEdit,
}) {
  return (
    <div className="px-4 py-4">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">
              {getCategoryIcon(transaction.category)}
            </span>
            <h3 className="font-medium text-gray-900">
              {transaction.description}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar size={14} />
            {format(parseISO(transaction.date), "d 'de' MMM, yyyy", {
              locale: es,
            })}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`text-lg font-semibold ${
              transaction.t_type === "Ingreso"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {transaction.t_type === "Ingreso" ? "+" : "-"}$
            {Math.abs(transaction.amount).toLocaleString()}
          </span>
          <button
            onClick={() => {
              setIsModalDeleteOpen(true);
              setIdToDelete(transaction.id);
            }}
            className="text-red-600 hover:text-red-800 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
            aria-label="Eliminar"
          >
            <Trash2 size={18} />
          </button>
          <button
            onClick={() => {
                setTransactionToEdit(transaction);
                setIsModalEditOpen(true);
            }}
            className="text-yellow-600 hover:text-yellow-800 p-2 rounded-lg hover:bg-red-50 transition-colors">
            <PencilLine size={18} />
          </button>
        </div>
      </div>
      <div
        className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium"
        style={{
          backgroundColor: `${getCategoryColor(transaction.category)}20`,
          color: getCategoryColor(transaction.category),
        }}
      >
        <Tag size={12} />
        {transaction.category}
      </div>
    </div>
  );
}

export default MobiletransactionView;