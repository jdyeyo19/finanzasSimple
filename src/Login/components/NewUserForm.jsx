import {User, Mail, Lock, EyeOff, Eye} from 'lucide-react'
import { useState, useMemo } from 'react'
import {newUser} from '../helpers/loginHelpers.js'
import { useFinanzas } from '../../AppContext/FinanzasContext';
import { useNavigate } from 'react-router-dom';

function NewUserForm ({isRegistered, setIsRegister}) {

    const [showPassword, setShowPassword] = useState(false);
    const { login } = useFinanzas();
    const navigate = useNavigate();
    const [registering, setRegistering] = useState(false)

    // form state
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // errors
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    // handle inputs
    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    // handleblur
    const handleBlur = (e) => {

    const { name } = e.target;

    setTouched((prev) => ({
            ...prev,
            [name]: true,
        }));
    };

    // validations
    useMemo(() => {

        const newErrors = {};

        // first name
        if (formData.firstName.trim().length < 2) {
            newErrors.firstName = "El nombre debe tener mínimo 2 caracteres";
        }

        // last name
        if (formData.lastName.trim().length < 2) {
            newErrors.lastName = "El apellido debe tener mínimo 2 caracteres";
        }

        // email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email)) {
            newErrors.email = "Correo inválido";
        }

        // password
        if (formData.password.length < 8) {
            newErrors.password = "La contraseña debe tener mínimo 8 caracteres";
        }

        // confirm password
        if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = "Las contraseñas no coinciden";
        }

        setErrors(newErrors);

    }, [formData]);

    // button enabled only if no errors
    const isFormValid =
        Object.keys(errors).length === 0 &&
        Object.values(formData).every((value) => value.trim() !== "");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setRegistering(true);

        if (!isFormValid) return;
        // API CALL HERE
        const response = await newUser(formData);

        if (response.status === 201){
            let access = response.data.tokens.access;
            let refresh = response.data.tokens.refresh;
            login(access, refresh)
            navigate('/home');
            setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        })
        }else if(response.status >= 400 && response.status < 500){
            alert("Email ya registrado, usa uno diferente")
        }else{
            alert("Fallas en el sistema por favor intenta mas tarde")
        }
        setRegistering(false);
    };

    return(
        <form className="space-y-5" onSubmit={handleSubmit} method="post">
                {/* First Name Field - Only for Register */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="text-gray-400" size={20} />
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="firstName"
                    placeholder="Tu nombre"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                {touched.firstName && errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.firstName}
                    </p>
                )}
              </div>

            {/* Last Name Field - Only for Register */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Apellido
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="text-gray-400" size={20} />
                  </div>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="lastName"
                    placeholder="Tu apellido"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                {touched.lastName && errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.lastName}
                    </p>
                )}
              </div>
                {/* Email Field */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Correo Electrónico
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="text-gray-400" size={20} />
                        </div>
                        <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="email"
                        placeholder="tu@email.com"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                        />
                    </div>
                    {touched.email && errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                      </p>
                    )}
                </div>
                {/* Password Field */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Contraseña
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="text-gray-400" size={20} />
                        </div>
                        <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="password"
                        placeholder="••••••••"
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                        />
                        <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {touched.password && errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                          {errors.password}
                      </p>
                    )}
                </div>
                {/*hacer confirmar contraseña */}
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                        Confirmar Contraseña
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="text-gray-400" size={20} />
                        </div>
                        <input
                        type={showPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="confirmPassword"
                        placeholder="••••••••"
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                        />
                        <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        >
                        </button>
                    </div>
                    {touched.confirmPassword && errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                          {errors.confirmPassword}
                      </p>
                    )}
                </div>
                {/* submit Button */}
                <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full py-3 rounded-lg font-semibold transition-all
                    ${
                        isFormValid
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
            >
                {registering?"Registrando...":"Registrarse"}
                </button>

                {/* Login Link */}
                <div className="mt-6 text-center">

                    <p className="text-gray-600">

                        ¿Ya tienes una cuenta?

                        <button
                            type="button"
                            onClick={() => setIsRegister(true)}
                            className="text-blue-600 hover:text-blue-700 font-semibold ml-1"
                        >
                            Inicia Sesión
                        </button>

                    </p>

                </div>
        </form>
    )
}

export default NewUserForm