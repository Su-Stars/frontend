'use server'

import { redirect } from 'next/navigation'

export async function navigateToHome() {
  redirect('/')
}

export async function navigateToLogin() {
  redirect('/login')
}

export async function navigateToSignup() {
  redirect('/sign-up')
}
