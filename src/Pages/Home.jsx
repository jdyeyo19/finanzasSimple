import { useEffect, useState, useMemo } from "react";
import { useFinanzas } from "../AppContext/FinanzasContext"
import { userInfo, filteredTransactions } from "./APIcalls/apiCalls";
import { useNavigate } from "react-router-dom";
import {useQuery} from '@tanstack/react-query';
import Navbar from "./components/Navbar";
import MobileMenu from "./components/MobileMenu";
import Sidebar from './components/Sidebar'
import MobileCardsBalance from "./components/MobileCardsBalance";
import TransactionList from "./components/TransactionList";
import Profile from "./components/Profile";
import AddTransactionModal from "./components/AddTransactionModal";
import { Dashboard } from "./components/Dashboard";


function Home (){
    const {accessT, refreshT, logout} = useFinanzas();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeView, setActiveView] = useState('dashboard');
    const [filters, setFilters] = useState({});
    const navigate = useNavigate();
    //Modal props
    const [isModalOpen, setIsModalOpen] = useState(false);
    // API call with tanstack
    // All transactions
    const {data = [], isLoading, error, refetch} = useQuery({
        queryKey: ["transactions", filters],
        queryFn: () => filteredTransactions(filters)
    })
    // User data
    const {data: userData, isLoading: userIsLoading, error: userError} = useQuery({
        queryKey:["Obtener user data"],
        queryFn: userInfo
    })

    const stats = useMemo(() => {

        const income = data
            .filter((t) => t.t_type === "Ingreso")
            .reduce((sum, t) => sum + Number(t.amount), 0);

        const expenses = data
            .filter((t) => t.t_type === "Gasto")
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);

        return {
            totalIncome: income,
            totalExpenses: expenses,
            balance: income - expenses,
        };

    }, [data]);


    useEffect(()=>{
        if (!accessT){
             navigate("/login")
             return
        }
    },[accessT])
    const initialCategories = [
        { id: '1', name: 'Salario', icon: '💼', color: '#10b981' },
        { id: '2', name: 'Freelance', icon: '💻', color: '#3b82f6' },
        { id: '3', name: 'Alimentación', icon: '🍔', color: '#b6af4a' },
        { id: '4', name: 'Transporte', icon: '🚗', color: '#f59e0b' },
        { id: '5', name: 'Entretenimiento', icon: '🎬', color: '#8b5cf6' },
        { id: '6', name: 'Servicios', icon: '💡', color: '#06b6d4' },
        { id: '7', name: 'Salud', icon: '🏥', color: '#ec4899' },
        { id: '8', name: 'Otros', icon: '📦', color: '#6b7280' },
        { id: '9', name: 'Casa', icon: '🏠', color: '#72e8e2' },
        { id: '10', name: 'Ropa', icon: '👔👗', color: '#d9ec0d' },
        { id: '11', name: 'Inversion', icon: '💵', color: '#27ea2a' },
        { id: '12', name: 'Deuda', icon: '💸', color: '#ed3017' },
        { id: '13', name: 'Educación', icon: '📚', color: '#6366f1' },
        { id: '14', name: 'Mascotas', icon: '🐶', color: '#f97316' },
        { id: '15', name: 'Viajes', icon: '✈️', color: '#0ea5e9' },
        { id: '16', name: 'Restaurantes', icon: '🍽️', color: '#14b8a6' },
        { id: '17', name: 'Regalos', icon: '🎁', color: '#e11d48' },
        { id: '18', name: 'Impuestos', icon: '🧾', color: '#7c3aed' },
        { id: '19', name: 'Ahorro', icon: '🏦', color: '#22c55e' },
        { id: '20', name: 'Suscripciones', icon: '📺', color: '#ef4444' },
    ];

    const categoriesOByName = initialCategories.sort((a, b) => a.name.localeCompare(b.name));

    if(isLoading)return <span>Cargando...</span>
    if(error)return <span>Error al Obtener datos: {error.message}</span>

    return(
        <section className="min-h-screen bg-gray-50">
            <Navbar
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                isMobileMenuOpen={isMobileMenuOpen}
                userData={userData}
                logout={logout}
                onOpen={() => setIsModalOpen(true)}/>
            {isMobileMenuOpen ?<MobileMenu
                setActiveView={setActiveView}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                activeView={activeView}/>:null}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <Sidebar
                    setActiveView={setActiveView}
                    activeView={activeView}
                    balance={stats.balance}
                    totalIncome={stats.totalIncome}
                    totalExpenses={stats.totalExpenses}/>
                    <main className="flex-1 min-w-0">
                        <MobileCardsBalance balance={stats.balance} totalIncome={stats.totalIncome} totalExpenses={stats.totalExpenses} />
                        {activeView === 'dashboard' && <Dashboard
                        transactions={data} balance={stats.balance} totalIncome={stats.totalIncome} totalExpenses={stats.totalExpenses}/>}
                        {activeView === 'transactions' && (
                            <TransactionList
                                transactions={data}
                                categories={categoriesOByName}
                                setFilters={setFilters}
                            />
                        )}
                        {activeView === 'profile' && (
                            <Profile
                                userData={userData}
                            />
                        )}
                        {/* Add Transaction Modal */}
                        <AddTransactionModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            categories={initialCategories}
                            refetch={refetch}
                        />
                    </main>
                </div>
            </div>
        </section>
    )
}
export default Home;