"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { toast } from "sonner";

export function Navbar({ user }: { user?: { userId: string } }) {
    const router = useRouter();

    async function handleLogout() {
        await logout();
        toast.success("Logged out successfully");
        router.push("/login");
    }


    return (
        <nav className="border-b bg-white px-8 py-3 flex justify-between items-center">
            {/* Logo */}
            <Link href="/dashboard" className="text-xl font-bold tracking-tight">
                DevResource <span className="text-blue-600">Hub</span>
            </Link>

            {/* Profile Dropdown */}
            {user ? <div className="flex items-center gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none" suppressHydrationWarning>
                        <Avatar className="cursor-pointer hover:bg-gray-100 transition-colors flex items-center justify-center">
                            <AvatarFallback className="bg-gray-100">
                                <User className="h-5 w-5 text-gray-700" />
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-red-600 cursor-pointer focus:text-red-600"
                            onClick={handleLogout}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div> : null}

        </nav>
    );
}