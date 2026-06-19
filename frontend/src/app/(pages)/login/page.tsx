"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setEmailError("Enter your email address.");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }
    // Sign in logic here
  };

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const leftPanelVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const logoVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Left Panel - Background Image */}
      <motion.div
        variants={leftPanelVariants}
        initial="hidden"
        animate="visible"
        className="relative hidden lg:block w-[40%]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Animated overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Rivian Logo Overlay */}
        <motion.div
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          className="absolute top-8 left-8 flex items-center gap-2 z-10"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 2L2 16L16 30L30 16L16 2Z"
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M16 8L8 16L16 24L24 16L16 8Z"
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
          </svg>
          <span className="text-white text-xl font-bold tracking-widest">
            RIVIAN
          </span>
        </motion.div>
      </motion.div>

      {/* Right Panel - Sign In Form */}
      <div className="flex-1 flex items-center justify-center bg-[#FAF6F1] px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h1 className="text-4xl font-semibold text-gray-900 mb-3">
              Sign In
            </h1>
            <p className="text-gray-700 text-base">
              Manage your existing orders, vehicles and profile information.
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <motion.div variants={itemVariants}>
              <motion.input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email"
                animate={isShaking ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
                className={`w-full px-4 py-3 border ${
                  emailError
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-gray-400"
                } bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300`}
              />
              <AnimatePresence>
                {emailError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {emailError}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Password Field */}
            <motion.div variants={itemVariants} className="relative">
              <motion.input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                whileFocus={{ scale: 1.01 }}
                className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 pr-12 transition-all duration-300"
              />
              <motion.button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <AnimatePresence mode="wait">
                  {showPassword ? (
                    <motion.div
                      key="eye-off"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <EyeOff size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="eye"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Eye size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>

            {/* Trouble Logging In */}
            <motion.div variants={itemVariants} className="text-right">
              <motion.a
                href="#"
                whileHover={{ x: 5 }}
                className="inline-block text-gray-700 text-sm relative group"
              >
                Trouble logging in?
                <motion.span
                  className="absolute bottom-0 left-0 h-[1px] bg-gray-700"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </motion.div>

            {/* Sign In Button */}
            <motion.div variants={itemVariants} className="mt-6">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-black text-white py-4 text-base font-medium hover:bg-gray-800 transition-colors"
              >
                Sign In
              </motion.button>
            </motion.div>
          </form>

          {/* Footer */}
          <motion.div variants={itemVariants} className="mt-12 text-center text-xs text-gray-600 leading-relaxed">
            <p>
              By signing in, I have read, and I understand and agree to, the
              Rivian{" "}
              <motion.a
                href="#"
                whileHover={{ color: "#111827" }}
                className="underline transition-colors"
              >
                Terms of Use
              </motion.a>{" "}
              and{" "}
              <motion.a
                href="#"
                whileHover={{ color: "#111827" }}
                className="underline transition-colors"
              >
                Privacy Policy (US)
              </motion.a>
              , or{" "}
              <motion.a
                href="#"
                whileHover={{ color: "#111827" }}
                className="underline transition-colors"
              >
                Privacy Policy (CAN)
              </motion.a>
              .
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
