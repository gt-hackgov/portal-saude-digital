"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { findUserByCpf, seedDefaultUsers, setCurrentUser } from "@/lib/userDatabase";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function LoginModal({ open, onClose }: Props) {
  const router = useRouter();
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const modalRef = useRef<HTMLDivElement | null>(null);

  const isValidCpf = (value: string) => {
    const onlyDigits = value.replace(/\D/g, "");
    if (!/^[0-9]{11}$/.test(onlyDigits)) return false;
    if (/^([0-9])\1+$/.test(onlyDigits)) return false;

    const calculateCheckDigit = (digits: string, factor: number) => {
      const total = digits
        .split("")
        .reduce((sum, digit) => sum + Number(digit) * factor--, 0);
      const remainder = total % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };

    const firstCheck = calculateCheckDigit(onlyDigits.slice(0, 9), 10);
    const secondCheck = calculateCheckDigit(onlyDigits.slice(0, 10), 11);
    return firstCheck === Number(onlyDigits[9]) && secondCheck === Number(onlyDigits[10]);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    seedDefaultUsers();
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    setTimeout(() => modalRef.current?.querySelector<HTMLInputElement>("input")?.focus(), 0);
  }, [open]);

  if (!open) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Placeholder validation. In a real implementation, auth would happen via gov.br.
    if (!cpf || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    if (!isValidCpf(cpf)) {
      setError("Por favor, insira um CPF válido.");
      return;
    }

    const user = findUserByCpf(cpf);
    if (!user) {
      setError("CPF não registrado. Por favor, use um CPF válido cadastrado.");
      return;
    }

    if (user.password !== password) {
      setError("Senha incorreta.");
      return;
    }

    setCurrentUser({ cpf: user.cpf, username: user.username });
    router.push("/dashboard");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        ref={modalRef}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl dark:bg-zinc-900"
        role="dialog"
        aria-modal="true"
      >
        <header className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Entrar com gov.br
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Faça login com sua conta gov.br para acessar os serviços.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
            aria-label="Fechar modal"
          >
            ✕
          </button>
        </header>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              CPF
            </label>
            <input
              value={cpf}
              onChange={(event) => setCpf(event.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-indigo-400"
              placeholder="000.000.000-00"
              type="text"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Senha
            </label>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-indigo-400"
              placeholder="••••••••"
              type="password"
            />
          </div>

          {error ? (
            <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
          ) : null}

          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Entrar com gov.br
          </button>

          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Este é um exemplo de fluxo; a autenticação real deve usar os serviços oficiais do
            gov.br.
          </p>
        </form>
      </div>
    </div>
  );
}
