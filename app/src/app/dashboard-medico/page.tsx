"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, clearCurrentUser } from "@/lib/userDatabase";
import { ThemeToggle } from "@/components/ThemeToggle";

const especialidades = [
  { nome: "Clínica Geral", quantidade: 42 },
  { nome: "Pediatria", quantidade: 27 },
  { nome: "Cardiologia", quantidade: 15 },
  { nome: "Dermatologia", quantidade: 9 },
];

const consultasHoje = [
  { paciente: "Maria Silva", horario: "08:00", risco: "Baixo" as const },
  { paciente: "João Souza", horario: "09:30", risco: "Alto" as const },
  { paciente: "Ana Costa", horario: "10:15", risco: "Médio" as const },
  { paciente: "Pedro Lima", horario: "11:00", risco: "Alto" as const },
];

const riscoStyles: Record<string, string> = {
  Baixo: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  Médio: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  Alto: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
};

export default function DashboardMedicoPage() {
  const router = useRouter();
  const [checkedAuth, setCheckedAuth] = useState(false);
  const [isMedico, setIsMedico] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    setIsMedico(user?.role === "medico");
    setCheckedAuth(true);
  }, []);

  useEffect(() => {
    if (checkedAuth && !isMedico) {
      router.replace("/");
    }
  }, [checkedAuth, isMedico, router]);

  const handleLogout = () => {
    clearCurrentUser();
    router.push("/");
  };

  const maxQuantidade = Math.max(...especialidades.map((e) => e.quantidade));

  if (!checkedAuth || !isMedico) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-white px-6 py-10 dark:bg-none dark:bg-zinc-900">
      <div className="mx-auto w-full max-w-6xl">
        <header className="flex flex-col gap-4 rounded-3xl bg-white p-8 shadow-lg dark:bg-zinc-950 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-indigo-600">Painel do médico</p>
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
              Visão geral da UBS
            </h1>
            <p className="mt-2 max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
              Acompanhe a demanda por especialidade e as consultas do dia.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
            >
              Sair
            </button>
          </div>
        </header>

        <section className="mt-8 rounded-3xl bg-white p-8 shadow-lg dark:bg-zinc-950">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Volume de agendamentos por especialidade
          </h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Últimos 30 dias (dados de exemplo)
          </p>

                    <div className="mt-6 flex items-end gap-6">
            {especialidades.map((item) => (
              <div key={item.nome} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {item.quantidade}
                </span>
                <div className="flex h-32 w-full items-end">
                  <div
                    className="w-full rounded-t-lg bg-indigo-500 dark:bg-indigo-600"
                    style={{ height: `${(item.quantidade / maxQuantidade) * 100}%` }}
                  />
                </div>
                <span className="text-center text-xs text-zinc-600 dark:text-zinc-400">
                  {item.nome}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl bg-white p-8 shadow-lg dark:bg-zinc-950">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Consultas de hoje
          </h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Risco de falta calculado por modelo de IA (dados de exemplo — modelo real é uma
            evolução futura do projeto)
          </p>

          <div className="mt-6 divide-y divide-zinc-100 dark:divide-zinc-800">
            {consultasHoje.map((consulta) => (
              <div
                key={`${consulta.paciente}-${consulta.horario}`}
                className="flex items-center justify-between py-4"
              >
                <div>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">
                    {consulta.paciente}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{consulta.horario}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${riscoStyles[consulta.risco]}`}
                >
                  Risco {consulta.risco}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}