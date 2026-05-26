import { Trash2, Calendar, Tag, X } from "lucide-react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { deleteTransaction, editTransaction } from "../APIcalls/apiCalls";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import TableRow from "./TableRow";
import DeleteTransactionModal from "./DeleteTransactionModal";
import TableHeaders from "./TableHeaders";
import MobiletransactionView from "./MobileTransactionView";
import EditTransactionModal from "./EditTransactionModal";
import TransactionFilters from "./TransactionFilters";

export default function TransactionList({ transactions, categories, setFilters }) {
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const getCategoryIcon = (categoryName) => {
    const category = categories.find((c) => c.name === categoryName);
    return category?.icon || "📦";
  };

  const getCategoryColor = (categoryName) => {
    const category = categories.find((c) => c.name === categoryName);
    return category?.color || "#6b7280";
  };
  //Borrar transaccion con tanstack
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },
  });
  //modal de confirmacion para borrar transaccion
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const handleDelete = (id) => {
    deleteMutation.mutate(id);
    setIsModalDeleteOpen(false);
  };
  //Editar transaccion con tanstack
  const editMutation = useMutation({
    mutationFn: ({ id, data }) => editTransaction(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },
  });
  //modal para editar transaccion
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const handleEdit = (id, data) => {
    editMutation.mutate(id, data);
    setIsModalDeleteOpen(false);
  };
  //busqueda filtrada
  const handleFilter = async (filters) => {
    setFilters(filters)
  };

  return (
    <>
      <TransactionFilters categories={categories} onFilter={handleFilter} />
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Todas las Transacciones
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {transactions.length} transacciones en total
          </p>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <TableHeaders />
            <tbody className="divide-y divide-gray-200">
              {sortedTransactions?.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  transaction={transaction}
                  getCategoryColor={getCategoryColor}
                  getCategoryIcon={getCategoryIcon}
                  setIsModalDeleteOpen={setIsModalDeleteOpen}
                  setIdToDelete={setIdToDelete}
                  setIsModalEditOpen={setIsModalEditOpen}
                  setTransactionToEdit={setTransactionToEdit}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden divide-y divide-gray-200">
          {sortedTransactions.map((transaction) => (
            <MobiletransactionView
              key={transaction.id}
              transaction={transaction}
              getCategoryColor={getCategoryColor}
              getCategoryIcon={getCategoryIcon}
              setIsModalDeleteOpen={setIsModalDeleteOpen}
              setIdToDelete={setIdToDelete}
              setIsModalEditOpen={setIsModalEditOpen}
              setTransactionToEdit={setTransactionToEdit}
            />
          ))}
        </div>

        {transactions.length === 0 && (
          <div className="px-6 py-12 text-center text-gray-500">
            <p>No hay transacciones registradas</p>
            <p className="text-sm mt-2">
              Comienza agregando tu primera transacción
            </p>
          </div>
        )}
        {/* Modal for delete transaction */}
        {isModalDeleteOpen && (
          <DeleteTransactionModal
            setIdToDelete={setIdToDelete}
            deleteMutation={deleteMutation}
            setIsModalDeleteOpen={setIsModalDeleteOpen}
            handleDelete={handleDelete}
            idToDelete={idToDelete}
          />
        )}
        {/* Modal for edit transaction */}
        {isModalEditOpen && (
          <EditTransactionModal
            transaction={transactionToEdit}
            setIsModalEditOpen={setIsModalEditOpen}
            setTransactionToEdit={setTransactionToEdit}
            categories={categories}
            editMutation={editMutation}
            setTransactionToEdit={setTransactionToEdit}
          />
        )}
      </div>
    </>
  );
}
