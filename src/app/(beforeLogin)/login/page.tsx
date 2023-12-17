"use client"

import { useRouter } from 'next/navigation'
// import { redirect } from 'next/navigation'
import React from 'react'
import Main from '../_component/Main'

function Login() {
    const router = useRouter()
router.replace('/i/flow/login')
return <Main/>
//  redirect('/i/flow/login')


}

export default Login