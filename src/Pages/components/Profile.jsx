import { User, Mail, Calendar, Edit2, Save, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateProfile } from "../APIcalls/apiCalls";
import ChangePasswordForm from "./ChangePasswordForm";

export default function Profile({ userData }) {
  const [changePassword, setChangePassword] = useState(false)
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
  });
  useEffect(() => {
    setEditedData({
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
    });
  }, [userData]);

  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Obtener user data"],
      });
    },
    onError: (error) => {
      console.log(error.response);

      if (error.response?.status === 400) {
        alert("Ese correo ya está en uso");
      } else {
        alert("Ocurrió un error al actualizar, Intenta nuevamente");
      }
      setEditedData({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
      });
    },
  });

  const handleSave = async () => {
    if (!editedData.first_name || !editedData.last_name || !editedData.email) {
      alert("Por favor completa todos los campos");
      return;
    }

    if (!editedData.email.includes("@")) {
      alert("Por favor ingresa un email válido");
      return;
    }
    await updateProfileMutation.mutate(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(userData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-green-600 to-blue-500"></div>
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 sm:-mt-12">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">
              <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {userData.first_name.charAt(0).toUpperCase()}
                  {userData.last_name.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="text-center pt-3sm:text-left mb-4 sm:mb-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  {userData.first_name} {userData.last_name}
                </h1>
                <p className="text-gray-600">{userData.email}</p>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit2 size={18} />
                Editar Perfil
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Información Personal
        </h2>

        <div className="space-y-6">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre(s)
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editedData.first_name}
                onChange={(e) =>
                  setEditedData({ ...editedData, first_name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tu nombre"
              />
            ) : (
              <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
                <User size={20} className="text-gray-400" />
                <span className="text-gray-900">{userData.first_name}</span>
              </div>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Apellido(s)
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editedData.last_name}
                onChange={(e) =>
                  setEditedData({ ...editedData, last_name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tu apellido"
              />
            ) : (
              <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
                <User size={20} className="text-gray-400" />
                <span className="text-gray-900">{userData.last_name}</span>
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correo Electrónico
            </label>
            {isEditing ? (
              <input
                type="email"
                value={editedData.email}
                onChange={(e) =>
                  setEditedData({ ...editedData, email: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="tu@email.com"
              />
            ) : (
              <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
                <Mail size={20} className="text-gray-400" />
                <span className="text-gray-900">{userData.email}</span>
              </div>
            )}
          </div>

          {/* Join Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Miembro desde
            </label>
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
              <Calendar size={20} className="text-gray-400" />
              <span className="text-gray-900">
                {new Date(userData.date_joined).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Edit Buttons */}
          {isEditing && (
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleCancel}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <X size={18} />
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save size={18} />
                Guardar Cambios
              </button>
            </div>
          )}
        </div>
      </div>
      <div>
        {!changePassword?
        <button
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg transition-colors"
        onClick={()=>setChangePassword(true)}
        >Cambiar contraseña</button>:
        <button
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-700 disabled:bg-blue-400 text-white py-3 rounded-lg transition-colors"
          onClick={()=>setChangePassword(false)}
        >Cancelar</button>}
      </div>
      {changePassword && <ChangePasswordForm setChangePassword={setChangePassword}/>}
    </div>
  );
}
