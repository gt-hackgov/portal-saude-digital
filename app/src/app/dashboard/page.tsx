"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FeatureCard } from "@/components/FeatureCard";

export default function DashboardPage() {
  const router = useRouter();
  const [userName] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem("saudeDigitalUser");
    if (!raw) return null;

    try {
      const user = JSON.parse(raw);
      return user.email ?? "Usuário";
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (!userName) {
      router.replace("/");
    }
  }, [router, userName]);

  const welcomeMessage = useMemo(() => {
    if (!userName) return "Olá";
    return `Olá, ${userName.split("@")[0]}!`;
  }, [userName]);

  const handleLogout = () => {
    localStorage.removeItem("saudeDigitalUser");
    router.push("/");
  };

  const handleAction = (action: string) => {
    alert(`Função: ${action} (demo)`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-white px-6 py-10">
      <div className="mx-auto w-full max-w-6xl">
        <header className="flex flex-col gap-6 rounded-3xl bg-white p-8 shadow-lg dark:bg-zinc-950">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-indigo-600">Painel do usuário</p>
              <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">{welcomeMessage}</h1>
              <p className="mt-2 max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
                Selecione uma opção abaixo para continuar.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
              >
                Sair
              </button>
            </div>
          </div>
        </header>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <FeatureCard
            title="Agendar consulta"
            description="Escolha data e horário para sua próxima consulta."
            onClick={() => handleAction("Agendar consulta")}
            icon={<span className="text-lg">🩺</span>}
          />
          <FeatureCard
            title="Agendar exame"
            description="Escolha o tipo de exame e o local de coleta."
            onClick={() => handleAction("Agendar exame")}
            icon={<span className="text-lg">🧪</span>}
          />
          <FeatureCard
            title="Resultado de exames"
            description="Veja os resultados dos exames já realizados."
            onClick={() => handleAction("Resultado de exames")}
            icon={<span className="text-lg">📄</span>}
          />
          <FeatureCard
            title="Procurar UBS mais próxima"
            description="Encontre a unidade básica de saúde mais próxima de você."
            onClick={() => handleAction("Procurar UBS mais próxima")}
            icon={<span className="text-lg">📍</span>}
          />
        </section>
      </div>
    </div>
  );
}
