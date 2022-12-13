import { useState } from "react";
import { ROUTE_PATHS } from "_/constants";
import { useAuth } from "_/contexts";

interface Props{
    navigate: (path: string) => void
}

export function NavBar( {navigate }: Props){
    const [openMobileMenu, setOpenMobileMenu] = useState(false)
    const { logout } = useAuth()
    const goToCheckin = () => navigate(ROUTE_PATHS.checkin)
    const goToBooking = () => navigate(ROUTE_PATHS.booking)
    const goToHome = () => navigate(ROUTE_PATHS.home)

    return (
        <div className="relative bg-white">
            {/* Desktop Menu */}
            <div className="md:mx-0 mx-auto max-w-full px-2 sm:px-6">
                <div className="flex justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">

                <button onClick={goToHome}>
                    <b className="text-primary text-3xl tracking-logo">NeteApp</b>
                </button>

                {/* Burger icon to open moblie menu */}
                <div className="-mr-2 md:hidden">
                    <button type="button" className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false"
                        onClick={() => setOpenMobileMenu(true)}>
                        <span className="sr-only">Open menu</span>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>

                <nav className="hidden space-x-10 md:flex">
                    <button onClick={goToCheckin} className="text-base font-medium text-gray-500 hover:text-gray-900">Fazer Check-in</button>
                    <button onClick={goToBooking} className="text-base font-medium text-gray-500 hover:text-gray-900">Criar Reserva</button>

                </nav>
                <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                    <button onClick={logout} className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:primary-dark">Logout</button>
                </div>

                </div>
            </div>

            {/* Mobile menu: */}
            <div className={`absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden ${openMobileMenu? '' : 'hidden'}`}>
                <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="px-5 pt-5 pb-6">
                    <div className="flex items-center justify-between">
                        {/* Close mobile menu button */}
                        <div className="-mr-2">
                            <button type="button" className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            onClick={() => setOpenMobileMenu(false)}>
                            <span className="sr-only">Close menu</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            </button>
                        </div>

                    </div>
                    <div className="mt-6">
                        <nav className="grid gap-y-8">
                            <button onClick={goToCheckin} className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50">
                                <span className="ml-3 text-base font-medium text-gray-900">Fazer Check-in</span>
                            </button>

                            <button onClick={goToBooking} className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50">
                                <span className="ml-3 text-base font-medium text-gray-900">Fazer Reserva</span>
                            </button>

                            <button onClick={logout} className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50">
                                <span className="ml-3 text-base font-medium text-gray-900">Logout</span>
                            </button>

                        </nav>
                    </div>
                </div>

                </div>
            </div>
        </div>
    )
}