import { Routes, Route, useNavigate, Link } from "react-router-dom"; 
import { useEffect, useState } from "react";
import Products from "../components/products";
import SalesHistory from "../components/sales-history";
import ProviderList from "../components/ProviderList";
import { getUserById } from "../api";

const Dashboard = ({ isLogin }) => {
    const width = window.innerWidth > 768;
    const [isMenu, setIsMenu] = useState(width);
    const user = JSON.parse(sessionStorage.getItem("user"));
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogin) {
            navigate("/login");
        }
    }, []);

    return isLogin && (
        <div className="flex flex-col md:flex-row h-screen">
            <section className="md:w-1/5 md:h-full p-4 bg-red-800">
                <div className="w-full flex gap-4 items-center">
                    <img className="rounded-lg w-1/5 md:w-2/5" src="https://i.imgur.com/YV4nyrv.jpeg" alt="logo" />
                    <p className="text-lg font-semibold text-white">{user.nombre || "Usuario"}</p>
                    <i onClick={() => setIsMenu(!isMenu)} className="fa-solid fa-bars text-white text-3xl ml-auto mr-2 md:hidden"></i>
                </div>
                {
                    isMenu &&
                    <div className="flex flex-col mt-4 gap-2">
                        <Link onClick={() => width ? null : setIsMenu(!isMenu)} className="w-full text-white text-center text font-medium  py-2 duration-300 delay-75 transition-all rounded-3xl hover:cursor-pointer hover:bg-slate-600 " to="products">Productos</Link>
                        <Link onClick={() => width ? null : setIsMenu(!isMenu)} className="w-full text-white text-center text font-medium  py-2 duration-300 delay-75 transition-all rounded-3xl hover:cursor-pointer hover:bg-slate-600 " to="sales-history">Historial de ventas</Link>
                        <Link onClick={() => width ? null : setIsMenu(!isMenu)} className="w-full text-white text-center text font-medium  py-2 duration-300 delay-75 transition-all rounded-3xl hover:cursor-pointer hover:bg-slate-600 " to="provider">Proveedores</Link>
                        <button onClick={() => navigate("/login")} className="w-full text-white text-center text font-medium  py-2 duration-300 delay-75 transition-all rounded-3xl hover:cursor-pointer hover:bg-red-500 ">Cerrar Sesion</button>
                    </div>
                }
            </section>
            <section className="relative md:w-4/5 flex-grow p-4">
                <section className="h-full flex flex-col bg-slate-100/90 rounded-xl">
                    <Routes>
                        <Route path="/products/*" element={<Products />} />
                        <Route path="/sales-history/*" element={<SalesHistory />} />
                        <Route path="/provider/*" element={<ProviderList />} />
                    </Routes>
                </section>
            </section>
        </div>
    );
};

export default Dashboard;
