import { useState, useEffect } from "react";
import { Eye, EyeOff, Lock, Save } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../APIcalls/apiCalls";
import { useFinanzas } from '../../AppContext/FinanzasContext';

export default function ChangePasswordForm({setChangePassword}) {


    const { refreshT, logout } = useFinanzas();

    const [showCurrentPassword, setShowCurrentPassword] =
        useState(false);

    const [showNewPassword, setShowNewPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [formData, setFormData] = useState({
        current_password: "",
        new_password: "",
        confirm_password: "",
    });

    const [errors, setErrors] = useState({});

    // =========================
    // Mutation
    // =========================

    const changePasswordMutation = useMutation({

        mutationFn: changePassword,

        onSuccess: () => {

            alert(
                "Contraseña actualizada correctamente"
            );

            setFormData({
                current_password: "",
                new_password: "",
                confirm_password: "",
            });

            setErrors({});
            logout();
        },

        onError: (error) => {

            // backend validation
            if (
                error.response?.data?.current_password
            ) {

                setErrors({
                    current_password:
                        error.response.data
                            .current_password[0],
                });

                return;
            }

            if (
                error.response?.data?.confirm_password
            ) {

                setErrors({
                    confirm_password:
                        error.response.data
                            .confirm_password[0],
                });

                return;
            }

            alert(
                "Error actualizando contraseña"
            );
        },
    });

    // =========================
    // Handle Change
    // =========================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // limpiar errores mientras escribe
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    // =========================
    // Validations
    // =========================

    const validate = () => {

        const newErrors = {};

        if (!formData.current_password) {

            newErrors.current_password =
                "Ingresa tu contraseña actual";
        }

        if (!formData.new_password) {

            newErrors.new_password =
                "Ingresa una nueva contraseña";

        } else if (
            formData.new_password.length < 8
        ) {

            newErrors.new_password =
                "Debe tener mínimo 8 caracteres";
        }

        if (
            formData.confirm_password !==
            formData.new_password
        ) {

            newErrors.confirm_password =
                "Las contraseñas no coinciden";
        }

        setErrors(newErrors);

        return (
            Object.keys(newErrors).length === 0
        );
    };

    // =========================
    // Submit
    // =========================

    const handleSubmit = async(e) => {

        e.preventDefault();

        const payload = {
            ...formData,
            refresh: refreshT,
        };

        if (!validate()) return;

        await changePasswordMutation.mutate(
            payload
        );
        setTimeout(() => {
            setChangePassword(false);
        }, 2000);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2
                className="
                    text-xl
                    font-bold
                    text-gray-900
                    mb-6
                "
            >
                Cambiar contraseña
            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                {/* Current Password */}
                <div>

                    <label
                        className="
                            block
                            text-sm
                            font-medium
                            text-gray-700
                            mb-2
                        "
                    >
                        Contraseña actual
                    </label>

                    <div className="relative">

                        <div
                            className="
                                absolute
                                inset-y-0
                                left-0
                                pl-3
                                flex
                                items-center
                                pointer-events-none
                            "
                        >
                            <Lock
                                size={18}
                                className="text-gray-400"
                            />
                        </div>

                        <input
                            type={
                                showCurrentPassword
                                    ? "text"
                                    : "password"
                            }
                            name="current_password"
                            value={
                                formData.current_password
                            }
                            onChange={handleChange}
                            className="
                                w-full
                                pl-10
                                pr-12
                                py-3
                                border
                                border-gray-300
                                rounded-lg
                                focus:ring-2
                                focus:ring-blue-500
                                focus:border-transparent
                                outline-none
                            "
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowCurrentPassword(
                                    !showCurrentPassword
                                )
                            }
                            className="
                                absolute
                                inset-y-0
                                right-0
                                pr-3
                                flex
                                items-center
                                text-gray-400
                                hover:text-gray-600
                            "
                        >
                            {showCurrentPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>

                    </div>

                    {errors.current_password && (
                        <p
                            className="
                                text-red-500
                                text-sm
                                mt-1
                            "
                        >
                            {
                                errors.current_password
                            }
                        </p>
                    )}

                </div>

                {/* New Password */}
                <div>

                    <label
                        className="
                            block
                            text-sm
                            font-medium
                            text-gray-700
                            mb-2
                        "
                    >
                        Nueva contraseña
                    </label>

                    <div className="relative">

                        <div
                            className="
                                absolute
                                inset-y-0
                                left-0
                                pl-3
                                flex
                                items-center
                                pointer-events-none
                            "
                        >
                            <Lock
                                size={18}
                                className="text-gray-400"
                            />
                        </div>

                        <input
                            type={
                                showNewPassword
                                    ? "text"
                                    : "password"
                            }
                            name="new_password"
                            value={
                                formData.new_password
                            }
                            onChange={handleChange}
                            className="
                                w-full
                                pl-10
                                pr-12
                                py-3
                                border
                                border-gray-300
                                rounded-lg
                                focus:ring-2
                                focus:ring-blue-500
                                focus:border-transparent
                                outline-none
                            "
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowNewPassword(
                                    !showNewPassword
                                )
                            }
                            className="
                                absolute
                                inset-y-0
                                right-0
                                pr-3
                                flex
                                items-center
                                text-gray-400
                                hover:text-gray-600
                            "
                        >
                            {showNewPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>

                    </div>

                    {errors.new_password && (
                        <p
                            className="
                                text-red-500
                                text-sm
                                mt-1
                            "
                        >
                            {errors.new_password}
                        </p>
                    )}

                </div>

                {/* Confirm Password */}
                <div>

                    <label
                        className="
                            block
                            text-sm
                            font-medium
                            text-gray-700
                            mb-2
                        "
                    >
                        Confirmar contraseña
                    </label>

                    <div className="relative">

                        <div
                            className="
                                absolute
                                inset-y-0
                                left-0
                                pl-3
                                flex
                                items-center
                                pointer-events-none
                            "
                        >
                            <Lock
                                size={18}
                                className="text-gray-400"
                            />
                        </div>

                        <input
                            type={
                                showConfirmPassword
                                    ? "text"
                                    : "password"
                            }
                            name="confirm_password"
                            value={
                                formData.confirm_password
                            }
                            onChange={handleChange}
                            className="
                                w-full
                                pl-10
                                pr-12
                                py-3
                                border
                                border-gray-300
                                rounded-lg
                                focus:ring-2
                                focus:ring-blue-500
                                focus:border-transparent
                                outline-none
                            "
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword(
                                    !showConfirmPassword
                                )
                            }
                            className="
                                absolute
                                inset-y-0
                                right-0
                                pr-3
                                flex
                                items-center
                                text-gray-400
                                hover:text-gray-600
                            "
                        >
                            {showConfirmPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>

                    </div>

                    {errors.confirm_password && (
                        <p
                            className="
                                text-red-500
                                text-sm
                                mt-1
                            "
                        >
                            {
                                errors.confirm_password
                            }
                        </p>
                    )}

                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={changePasswordMutation.isPending}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg transition-colors">

                    <Save size={18} />

                    {changePasswordMutation.isPending
                        ? "Actualizando..."
                        : "Actualizar contraseña"}

                </button>

            </form>
        </div>
    );
}