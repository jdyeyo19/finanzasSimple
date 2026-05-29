import { Wallet } from "lucide-react";
import { useState, useEffect } from "react";
import RegisterForm from "./components/RegisterForm";
import NewUserForm from "./components/NewUserForm";
import { useFinanzas } from "../AppContext/FinanzasContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setAccessToken } from "../services/authservice";

function Login() {
  const { accessT, setAccessT } = useFinanzas();
  const navigate = useNavigate();
  const [isRegistered, setIsRegister] = useState(true);

  useEffect(() => {
    const autoLogin = async () => {
      const response = await axios.post(
        "https://finanzassimpleapi.onrender.com/api/financial/token/refresh",
        {},
        {
          withCredentials: true,
        },
      );

      if (response.data.access) {
        setAccessToken(response.data.access);
        setAccessT(response.data.access);

        navigate("/home");
      }
    };

    autoLogin();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <LogoAndTitle />
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <FormTitle isRegistered={isRegistered} />
          {isRegistered ? (
            <RegisterForm
              isRegistered={isRegistered}
              setIsRegister={setIsRegister}
            />
          ) : (
            <NewUserForm
              isRegistered={isRegistered}
              setIsRegister={setIsRegister}
            />
          )}
        </div>
        <div className="mt-8 text-center">
          <p className="text-blue-100 text-sm">
            © 2026 FinanzasApp. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </section>
  );
}

const LogoAndTitle = () => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-lg">
        <Wallet className="text-blue-600" size={32} />
      </div>
      <h1 className="text-3xl font-bold text-white mb-2">FinanzasApp</h1>
      <p className="text-blue-100">Controla tus ingresos y gastos personales</p>
    </div>
  );
};

const FormTitle = ({ isRegistered }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        {!isRegistered ? "Crear Cuenta" : "Iniciar Sesión"}
      </h2>
      <p className="text-gray-600">
        {!isRegistered
          ? "Regístrate para comenzar a gestionar tus finanzas"
          : "Accede a tu cuenta para continuar"}
      </p>
    </div>
  );
};

export default Login;
