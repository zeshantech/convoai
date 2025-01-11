"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Password has been reset. You can now sign in.");
      setTimeout(() => {
        router.push("/auth/signin");
      }, 3000);
    } else {
      setMessage(data.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <h2 className="mb-4 text-xl font-bold">Reset Password</h2>
        {message && <p className="mb-4 text-green-500">{message}</p>}
        <div className="mb-4">
          <label className="block mb-1">New Password</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <button type="submit" className="w-full px-3 py-2 text-white bg-blue-500 rounded">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
