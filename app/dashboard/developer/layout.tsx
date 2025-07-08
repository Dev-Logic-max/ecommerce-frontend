"use client";

import { ToastContainer } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";
import "../../globals.css";
import Navbar from "@/components/common/Navbar";
import { AdminsThemeProvider } from "@/components/theme/AdminsThemeProvider";
import { DeveloperNavbar } from "@/components/Navbar/DeveloperNavbar";
import { DeveloperSidebar } from "@/components/Sidebar/DeveloperSidebar";
import { useEffect, useState } from "react";
import { cn } from '@/lib/utils';

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedState = localStorage.getItem("sidebarExpanded");
        if (savedState !== null) {
            setSidebarExpanded(savedState === "true");
        }
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem("sidebarExpanded", String(sidebarExpanded));
        }
    }, [sidebarExpanded, mounted]);

    if (!mounted) return null;

    return (
        <AdminsThemeProvider>
            <main>
                {/* Navbar */}
                <DeveloperNavbar />

                {/* Sidebar */}
                <DeveloperSidebar expanded={sidebarExpanded} onToggle={() => setSidebarExpanded(!sidebarExpanded)} />

                {/* Main content area */}
                <div className={cn("ms-auto transition-all duration-500 ease-in-out", sidebarExpanded ? "lg:w-[calc(100%-256px)]" : "lg:w-[calc(100%-110px)]")}>
                    {children}
                </div>
            </main>
        </AdminsThemeProvider>
    );
}
