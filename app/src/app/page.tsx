"use client";

import { useState } from "react";
import Link from "next/link";
import { LoginModal } from "@/components/LoginModal";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 via-white to-indigo-50 text-zinc-900">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white">
            PSD
          </div>
          <div>
            <p className="text-sm font-semibold tracking-wide">Portal Saúde Digital</p>
            <p className="text-xs text-zinc-600">Acesso aos seus serviços de saúde</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowLogin(true)}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            Entrar
          </button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 pb-20">
        <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-5xl">
              Bem-vindo ao Portal Saúde Digital
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-zinc-700">
              Acesse seus serviços de saúde de maneira simples e segura. Agende consultas, confira seus exames
              e encontre a UBS mais próxima usando um único lugar.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setShowLogin(true)}
                className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
              >
                Entrar com gov.br
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-10 shadow-lg ring-1 ring-zinc-100 dark:bg-zinc-950 dark:ring-zinc-800">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Como funciona</h2>
            <ul className="mt-6 space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-indigo-600" />
                Acesse com sua conta gov.br para ativar todos os serviços.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-indigo-600" />
                Agende consultas e exames em poucos cliques.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-indigo-600" />
                Veja resultados e procure a UBS mais próxima.
              </li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 bg-white py-6 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950">
        Desenvolvido por Bruna e Gabriela para o projeto HackGov. Todos os direitos reservados.
      </footer>

      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}
