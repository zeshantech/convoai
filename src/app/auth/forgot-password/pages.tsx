"use client";

import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Password reset link has been sent to your email.");
    } else {
      setMessage(data.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <h2 className="mb-4 text-xl font-bold">Forgot Password</h2>
        {message && <p className="mb-4 text-green-500">{message}</p>}
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <button type="submit" className="w-full px-3 py-2 text-white bg-blue-500 rounded">
          Send Reset Link
        </button>
        <div className="mt-4 text-center">
          <a href="/auth/signin" className="text-blue-500">
            Back to Sign In
          </a>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
