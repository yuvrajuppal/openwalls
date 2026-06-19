"use client";

import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmFocused, setConfirmFocused] = useState(false);

  return (
    <main className="flex-1 flex items-center justify-center py-24 md:py-36 px-margin-mobile md:px-margin-desktop">
      <div className="w-full max-w-md">
        <div className="mb-12 border-l-4 border-primary pl-6">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-[0.2em] mb-2 block">
            Get started
          </span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg tracking-tighter uppercase">
            Create Account
          </h1>
        </div>

        <form
          className="flex flex-col gap-8"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Name */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <User
                className={`w-5 h-5 transition-colors ${
                  nameFocused ? "text-primary" : "text-secondary"
                }`}
              />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setNameFocused(true)}
              onBlur={() => setNameFocused(false)}
              placeholder="Full name"
              className={`w-full h-14 pl-14 pr-5 bg-transparent border-2 border-primary focus:ring-0 font-body-md text-base transition-all outline-none rounded-none ${
                nameFocused
                  ? "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                  : "shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]"
              }`}
            />
          </div>

          {/* Email */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Mail
                className={`w-5 h-5 transition-colors ${
                  emailFocused ? "text-primary" : "text-secondary"
                }`}
              />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              placeholder="Email address"
              className={`w-full h-14 pl-14 pr-5 bg-transparent border-2 border-primary focus:ring-0 font-body-md text-base transition-all outline-none rounded-none ${
                emailFocused
                  ? "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                  : "shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]"
              }`}
            />
          </div>

          {/* Password */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Lock
                className={`w-5 h-5 transition-colors ${
                  passwordFocused ? "text-primary" : "text-secondary"
                }`}
              />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              placeholder="Password"
              className={`w-full h-14 pl-14 pr-14 bg-transparent border-2 border-primary focus:ring-0 font-body-md text-base transition-all outline-none rounded-none ${
                passwordFocused
                  ? "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                  : "shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-5 flex items-center text-secondary hover:text-primary transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Lock
                className={`w-5 h-5 transition-colors ${
                  confirmFocused ? "text-primary" : "text-secondary"
                }`}
              />
            </div>
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => setConfirmFocused(true)}
              onBlur={() => setConfirmFocused(false)}
              placeholder="Confirm password"
              className={`w-full h-14 pl-14 pr-14 bg-transparent border-2 border-primary focus:ring-0 font-body-md text-base transition-all outline-none rounded-none ${
                confirmFocused
                  ? "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                  : "shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute inset-y-0 right-5 flex items-center text-secondary hover:text-primary transition-colors"
            >
              {showConfirm ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full h-14 bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider hover:bg-secondary transition-colors active:scale-[0.99]"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-10">
          <div className="flex-1 h-px bg-outline-variant" />
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-[0.2em]">
            or
          </span>
          <div className="flex-1 h-px bg-outline-variant" />
        </div>

        {/* Sign in */}
        <p className="text-center font-body-md text-base text-secondary">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-bold underline underline-offset-4 hover:opacity-70 transition-opacity"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
