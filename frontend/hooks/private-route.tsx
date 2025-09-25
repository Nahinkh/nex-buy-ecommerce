'use client'
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation'
import React, { ReactNode, useEffect, useState } from 'react'


interface Props{
    children: ReactNode;
}
const PrivateRoute = ({children}:Props) => {
    const router = useRouter();
    const {user }= useAuthStore();
    const [loading, setLoading] = useState(true);
// useEffect(() => {
//   const token = sessionStorage.getItem("token");
//   if (!token) {
//     sessionStorage.setItem("redirectAfterLogin", window.location.pathname);
//     router.push("/login");
//   } else {
//     setLoading(false);
//   }
// }, [router]);
    // if(loading){
    //     return <div>Loading...</div>
    // }
  return (
    <div>{children}</div>
  )
}

export default PrivateRoute