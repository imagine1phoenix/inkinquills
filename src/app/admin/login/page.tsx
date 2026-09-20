"use client";

import { useActionState } from "react";
import { loginAdmin, type LoginState } from "@/actions/auth";

const initialState: LoginState = { error: "" };

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAdmin, initialState);

  return (
    <div className="min-h-screen bg-[#E8E5DC] px-4 py-24 text-midnight md:px-8 md:py-32">
      <main className="mx-auto max-w-md border-2 border-midnight bg-[#F4F2EC] p-6 shadow-[8px_8px_0_var(--electric-blue)] md:p-8">
        <p className="font-ui text-xs font-bold uppercase tracking-[0.3em] text-electric-blue">Ink in Quills / Control Room</p>
        <h1 className="mt-3 font-display text-6xl font-black uppercase leading-[0.85]">Admin<br />Login</h1>
        <p className="mt-5 font-body text-base text-midnight/70">Enter the admin password to manage the club website.</p>
        <form action={formAction} className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-2 block font-ui text-[10px] font-bold uppercase tracking-widest">Password</span>
            <input name="password" type="password" autoComplete="current-password" required className="w-full border-2 border-midnight bg-white px-3 py-3 font-body text-base text-midnight outline-none focus:border-electric-blue" />
          </label>
          {state.error && <p role="alert" className="border-2 border-red-700 bg-red-50 px-3 py-2 font-ui text-xs font-bold text-red-800">{state.error}</p>}
          <button type="submit" disabled={isPending} className="w-full border-2 border-midnight bg-metro-yellow px-5 py-3 font-ui text-xs font-bold uppercase tracking-widest shadow-[5px_5px_0_var(--midnight)] disabled:opacity-50">
            {isPending ? "Checking..." : "Enter admin"}
          </button>
        </form>
      </main>
    </div>
  );
}