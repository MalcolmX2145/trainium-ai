"use client";
import { SignInButton, SignOutButton, SignedIn, SignedOut } from '@clerk/nextjs'
import React from 'react'

const HomePage = () => {
  return (
    <div>
      HomePage

      {/* Check if user is signed out and if so show signinbutton */}
      <SignedOut>
        <SignInButton />
      </SignedOut>

      {/* Check if user is signed in and if so show signoutbutton */}
      <SignedIn>
        <SignOutButton />
      </SignedIn>
    </div>
  )
}

export default HomePage