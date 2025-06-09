import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

const LoginOption = ({ onClose }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);

    const handleLoginClick = () => {
        onClose();
        navigate("/login");
    };

    const handleSignupClick = () => {
        onClose();
        navigate("/login");
    };

    const handleLogoutClick = () => {
        dispatch(logout());
        onClose();
        navigate("/login");
    };

    return (
        <div className="w-64 p-6 bg-gray-900 border border-gray-500 rounded-[2rem] flex flex-col items-center space-y-4 fixed right-0">
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-3 left-3 w-8 h-8 bg-[#A4A6F6] text-white font-bold rounded-full flex items-center justify-center"
            >
                X
            </button>

            {!token ? (
                <>
                    {/* Login Button */}
                    <button
                        onClick={handleLoginClick}
                        className="w-32 py-2 bg-[#A4A6F6] text-white font-extrabold italic rounded-full text-lg"
                    >
                        Login
                    </button>

                    {/* Signup Button */}
                    <button
                        onClick={handleSignupClick}
                        className="w-32 py-2 bg-[#A4A6F6] text-white font-extrabold italic rounded-full text-lg"
                    >
                        Signup
                    </button>
                </>
            ) : (
                /* Logout Button */
                <button
                    onClick={handleLogoutClick}
                    className="w-32 py-2 bg-red-500 text-white font-extrabold italic rounded-full text-lg hover:bg-red-600"
                >
                    Logout
                </button>
            )}
        </div>
    );
};

export default LoginOption;
