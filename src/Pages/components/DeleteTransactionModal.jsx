import { Trash2, X } from "lucide-react";

function DeleteTransactionModal({setIsModalDeleteOpen, setIdToDelete, deleteMutation, handleDelete, idToDelete}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setIsModalDeleteOpen(false)}
      />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-md mx-4 rounded-2xl shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={() => {
            setIsModalDeleteOpen(false);
            setIdToDelete(null);
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-red-100 mb-4">
          <Trash2 size={30} className="text-red-600" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-center text-gray-900">
          Eliminar transacción
        </h2>

        {/* Message */}
        <p className="text-gray-500 text-center mt-2">
          ¿Estás seguro de eliminar esta transacción? Esta acción no se puede
          deshacer.
        </p>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          {/* Cancel */}
          <button
            onClick={() => {
              setIsModalDeleteOpen(false);
              setIdToDelete(null);
            }}
            className="flex-1 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            No
          </button>

          {/* Confirm */}
          <button
            onClick={() => handleDelete(idToDelete)}
            disabled={deleteMutation.isPending}
            className="flex-1 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {deleteMutation.isPending ? "Eliminando..." : "Sí, eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteTransactionModal;