import {Wallet, Mail, Lock, EyeOff, Eye} from 'lucide-react'
import { useState } from 'react';
import { APILogin } from '../helpers/loginHelpers';
import { useFinanzas } from '../../AppContext/FinanzasContext';
import { useNavigate } from 'react-router-dom';

function RegisterForm ({isRegistered, setIsRegister}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loging, setLoging] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [invalidLogin, setInvalidLogin] = useState(false)
    const [tooMany, setTooMany] = useState(false)
    const [forgotPassword, setForgotPassword] = useState(false)

    const { login } = useFinanzas();
    const navigate = useNavigate();

    const handleLogin = async (e) =>{
        e.preventDefault();
        setLoging(true);
        setInvalidLogin(false);
        setTooMany(false);
        const response = await APILogin(email, password);

        if (response.status == 200){
            login(response.data.access, response.data.refresh);
            setEmail("");
            setPassword("");
            navigate('/home');
        } else if(response.status == 429){
            setTooMany(true)
        }else if (response.status >= 400 && response.status < 500){
            setInvalidLogin(true)
        }

        if (!response) {
            console.log("Login failed");
            return;
        }
        setLoging(false);
    }

    return(
        <>
            <form className="space-y-5" onSubmit={handleLogin} method="post">
                    {/* Email Field */}
                <div>
                    <label
                        htmlFor='email'
                        className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="text-gray-400" size={20}/>
                        </div>
                            <input
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            type="email"
                            id="email"
                            placeholder="tu@email.com"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            required
                            />
                        </div>
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
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                    </div>
                    {/* Forgot Password */}
                    <div className="flex items-center justify-between">
                        <button
                        type="button"
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        onClick={()=>{
                            alert("¡Lo sentimos! De momento este servicio se encuentra inhabilitado. Por favor intenta más tarde")
                        }}
                        >
                        ¿Olvidaste tu contraseña?
                        </button>
                    </div>
                    {/* submit Button */}
                    <button
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all shadow-lg hover:shadow-xl"
                    type='submit'>{loging?"Iniciando...":"Iniciar Sesion"}</button>
                    {invalidLogin ? <h5>¡Email o contraseña incorrecta!</h5>:null}
                    {tooMany ? <h5>¡Demasiados intentos, Intente mas tarde!</h5>:null}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                        ¿No tienes una cuenta?
                        {' '}
                        <button
                            type='button'
                            onClick={() => setIsRegister(false)}
                            className="text-blue-600 hover:text-blue-700 font-semibold"
                        >Regístrate
                        </button>
                        </p>
                    </div>
            </form>
        </>
    )
}

export default RegisterForm