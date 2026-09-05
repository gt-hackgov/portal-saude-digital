"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Appointment = {
  date: string;
  time: string;
  location: string;
  specialty: string;
  notes: string;
  createdAt: string;
};

export default function ScheduledAppointmentsPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem("saudeAppointments");
    if (!raw) {
      setAppointments([]);
      return;
    }

    try {
      const parsed = JSON.parse(raw) as Appointment[];
      setAppointments(parsed);
    } catch {
      setAppointments([]);
    }
  }, []);

  return (
      <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-white px-6 py-10 dark:bg-none dark:bg-zinc-900">
      <div className="mx-auto w-full max-w-6xl rounded-3xl bg-white p-8 shadow-lg dark:bg-zinc-950">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-indigo-600">Consultas agendadas</p>
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">Histórico de agendamentos</h1>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Veja as consultas que você já agendou e volte ao painel para novos agendamentos.
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
          >
            Voltar ao painel
          </button>
        </header>

        {appointments.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-zinc-200 bg-zinc-50 p-10 text-center text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            <p className="text-lg font-semibold">Nenhuma consulta agendada ainda.</p>
            <p className="mt-2 text-sm">Use a página de agendamento para marcar sua primeira consulta.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {appointments.map((appointment, index) => (
              <div key={index} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">Data e horário</p>
                    <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                      {appointment.date} às {appointment.time}
                    </p>
                  </div>
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-200">
                    {appointment.specialty}
                  </span>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">Unidade</p>
                    <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-100">{appointment.location}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">Agendado em</p>
                    <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-100">{new Date(appointment.createdAt).toLocaleString()}</p>
                  </div>
                </div>

                {appointment.notes ? (
                  <div className="mt-6 rounded-2xl bg-zinc-50 p-4 text-sm text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
                    <p className="font-semibold">Observações</p>
                    <p className="mt-2 whitespace-pre-wrap">{appointment.notes}</p>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
