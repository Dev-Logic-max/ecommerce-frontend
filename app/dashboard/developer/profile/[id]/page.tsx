"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import authApi from "@/lib/api/auth"
import { useParams } from "next/navigation"

export default function ProfileDetails() {
    const [developerUsers, setDeveloperUsers] = useState([])
    const params = useParams()
    const id = params
    console.log('params users', id)

    useEffect(() => {
        console.log('Start')
        if (id) fetchDeveloperUser()
            console.log('End')
    }, [])

    const fetchDeveloperUser = async () => {
        try {
            // const id = user?.id
            //   if (!id) throw new Error('User ID is undefined');
            if (!id) console.log('User ID is undefined', id);
            const response = await authApi.getDeveloperUser((1));
            setDeveloperUsers(response.data || []);
        } catch (error) {
            toast.error('Failed to fetch developer User profile!');
            setDeveloperUsers([]);
        }
    };

    return (
        <div className="flex min-h-screen bg-background w-full">
            <h1>Developer Profile</h1>
        </div>
    )
}
