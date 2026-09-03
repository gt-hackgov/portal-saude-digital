"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const locations = [
  "UBS Centro",
  "UBS Vila Nova",
  "UBS Jardim das Flores",
  "UBS Santa Maria",
];

const specialties = [
  "Clínica Geral",
  "Pediatria",
  "Ginecologia",
  "Dermatologia",
  "Cardiologia",
];

export default function SchedulePage() {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState(locations[0]);
  const [specialty, setSpecialty] = useState(specialties[0]);
  const [notes, setNotes] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!date || !time || !location || !specialty) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      setSuccess(false);
      return;
    }

    const appointment = {
      date,
      time,
      location,
      specialty,
      notes,
      createdAt: new Date().toISOString(),
    };

    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("saudeAppointments");
      const current = stored ? JSON.parse(stored) : [];
      window.localStorage.setItem("saudeAppointments", JSON.stringify([...current, appointment]));
    }

    setError("");
    setSuccess(true);
  };

  return (
          <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-white px-6 py-10 dark:bg-none dark:bg-zinc-900">
      <div className="mx-auto w-full max-w-4xl rounded-3xl bg-white p-8 shadow-lg dark:bg-zinc-950">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-indigo-600">Agendamento de consulta</p>
            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">Marque sua consulta</h1>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Preencha os dados abaixo para agendar sua consulta em uma UBS.
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Data da consulta</span>
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-indigo-400"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Horário</span>
              <input
                type="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-indigo-400"
              />
            </label>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Unidade básica de saúde</span>
              <select
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-indigo-400"
              >
                {locations.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Especialidade</span>
              <select
                value={specialty}
                onChange={(event) => setSpecialty(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-indigo-400"
              >
                {specialties.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Observações</span>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={4}
              placeholder="Descreva sintomas ou outros detalhes importantes"
              className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-indigo-400"
            />
          </label>

          {error ? <p className="text-sm text-red-600 dark:text-red-300">{error}</p> : null}
          {success ? (
            <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-800 dark:border-green-700 dark:bg-green-900/20 dark:text-green-100">
              Consulta agendada com sucesso! Verifique seus dados no painel.
            </div>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Agendar consulta
          </button>
        </form>
      </div>
    </div>
  );
}
