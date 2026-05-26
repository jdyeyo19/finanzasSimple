import { format, parseISO } from "date-fns";
import { Trash2, Calendar, PencilLine } from "lucide-react";
import { es } from "date-fns/locale";

function TableRow({
  transaction,
  getCategoryIcon,
  getCategoryColor,
  setIsModalDeleteOpen,
  setIdToDelete,
  setIsModalEditOpen,
  setTransactionToEdit,
}) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar size={16} />
          {format(parseISO(transaction.date), "d 'de' MMM, yyyy", {
            locale: es,
          })}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm font-medium text-gray-900">
          {transaction.description}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">
            {getCategoryIcon(transaction.category)}
          </span>
          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
            style={{
              backgroundColor: `${getCategoryColor(transaction.category)}20`,
              color: getCategoryColor(transaction.category),
            }}
          >
            {transaction.category}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <span
          className={`text-sm font-semibold ${
            transaction.t_type === "Ingreso" ? "text-green-600" : "text-red-600"
          }`}
        >
          {transaction.t_type === "Ingreso" ? "+" : "-"}$
          {Math.abs(transaction.amount).toLocaleString()}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <button
          onClick={() => {
            setIsModalDeleteOpen(true);
            setIdToDelete(transaction.id);
          }}
          className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
          aria-label="Eliminar transacción"
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
      </td>
    </tr>
  );
}

export default TableRow;
