"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FeatureCard } from "@/components/FeatureCard";
import { ChatModal } from "@/components/ChatModal";

export default function DashboardPage() {
  const router = useRouter();
  const [userName] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem("saudeDigitalUser");
    if (!raw) return null;

    try {
      const user = JSON.parse(raw);
      return user.username ?? "Usuário";
    } catch {
      return null;
    }
  });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const displayName = useMemo(() => {
    if (!userName) return "Usuário";
    return userName.split("@")[0];
  }, [userName]);

  useEffect(() => {
    if (!userName) {
      router.replace("/");
    }
  }, [router, userName]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

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
        <header className="relative flex flex-col gap-6 rounded-3xl bg-white p-8 shadow-lg dark:bg-zinc-950">
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
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="rounded-xl border border-zinc-200 bg-white p-2 text-sm shadow-sm transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
                aria-label="Notificações"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C10.896 2 10 2.896 10 4V5.586L7.707 8.293C7.512 8.488 7.256 8.744 7.061 9.061L4.707 11.414C4.512 11.609 4.256 11.865 4.061 12.182L2 14.182V16H22V14.182L19.939 12.182C19.744 11.865 19.488 11.609 19.293 11.414L16.939 9.061C16.744 8.744 16.488 8.488 16.293 8.293L14 5.586V4C14 2.896 13.104 2 12 2Z" fill="currentColor"/>
                  <path d="M12 22C13.1046 22 14 21.1046 14 20H10C10 21.1046 10.8954 22 12 22Z" fill="currentColor"/>
                </svg>
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
              >
                Sair
              </button>
            </div>
          </div>

          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-24 mt-16 w-64 rounded-xl bg-white shadow-lg dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700"
            >
              <ul className="py-2">
                <li>
                  <button
                    onClick={() => {
                      setNotificationModalOpen(true);
                      setDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                  >
                    Previna-se da Dengue!
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setNotificationModalOpen(true);
                      setDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                  >
                    Sua consulta está próxima: Faltam 2 dias!
                  </button>
                </li>
              </ul>
            </div>
          )}
        </header>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <FeatureCard
            title="Agendar consulta"
            description="Escolha data e horário para sua próxima consulta."
            onClick={() => router.push("/agendar-consulta")}
            icon={<span className="text-lg">🩺</span>}
          />
          <FeatureCard
            title="Consultas agendadas"
            description="Veja suas consultas marcadas e histórico de agendamentos."
            onClick={() => router.push("/consultas-agendadas")}
            icon={<span className="text-lg">📅</span>}
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

      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsChatOpen(true)}
          className="rounded-full bg-indigo-600 p-4 text-white shadow-lg transition hover:bg-indigo-700"
          aria-label="Abrir chat"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.05 1.05 4.42L2 22l5.58-1.05C9.95 21.64 11.46 22 13 22h7c1.1 0 2-.9 2-2V12c0-5.52-4.48-10-10-10z" fill="currentColor"/>
          </svg>
        </button>
      </div>

      {notificationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl dark:bg-zinc-900">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Notificação</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Previna-se da Dengue!{" "}
              <button
                onClick={() => {
                  setIsChatOpen(true);
                  setNotificationModalOpen(false);
                }}
                className="text-indigo-600 underline hover:no-underline"
              >
                Clique aqui para saber como
              </button>
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setNotificationModalOpen(false)}
                className="rounded-xl bg-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      <ChatModal open={isChatOpen} onClose={() => setIsChatOpen(false)} userName={displayName} />
    </div>
  );
}
