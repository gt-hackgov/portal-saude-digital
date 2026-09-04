# 🏥 Conecta Saúde

Plataforma de agendamento digital para Unidades Básicas de Saúde (UBS) do SUS, com painel de gestão para profissionais de saúde.

Conecta Saúde é uma aplicação frontend desenvolvida com Next.js e React, que conecta cidadãos e profissionais de saúde em um único sistema de agendamento, com indicadores de gestão para a UBS.

## ✨ Funcionalidades

### 🏠 Página inicial
- Apresentação da plataforma
- Escolha de perfil (paciente ou médico) antes do login

### 👤 Paciente
- Login simulado (padrão gov.br)
- Agendar consulta e exame
- Consultar histórico de consultas agendadas
- Buscar UBS mais próxima

### 🩺 Médico
- Painel com volume de agendamentos por especialidade
- Lista de consultas do dia com marcação de risco de falta
- Exportação da lista de triagem em CSV (pacientes de risco alto)
- Painel de Administração da UBS: indicadores de uso, gráficos (barras e pizza), tabela de frequência e insights de gestão

### 🌗 Geral
- Alternância entre modo claro e escuro (com preferência salva no navegador)

## 🚀 Tecnologias

- **Next.js 16** (App Router, Turbopack) — framework principal
- **React 19**
- **TypeScript**
- **Tailwind CSS 4** — estilização

## 📦 Instalação

### Pré-requisitos
- Node.js 20+
- npm

### 1. Clone o repositório
```bash
git clone https://github.com/gt-hackgov/conecta-saude.git
cd conecta-saude/app
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Execute o projeto
```bash
npm run dev
```

Acesse: http://localhost:3000

## 🔐 Credenciais de teste

| CPF | Senha |
|---|---|
| 129.259.450-07 | saude123 |

Funciona para os dois perfis (paciente e médico) — não existe, ainda, distinção real de permissões por usuário (ver aviso de segurança abaixo).

## 🛣️ Rotas principais

| Rota | Descrição |
|---|---|
| `/` | Página inicial e login |
| `/agendar-consulta` | Agendamento (paciente) |
| `/consultas-agendadas` | Histórico (paciente) |
| `/dashboard` | Painel do paciente |
| `/dashboard-medico` | Painel do médico |
| `/dashboard-medico/administracao` | Administração da UBS |

## 📁 Estrutura
app/src/
├── app/ # Páginas (Next.js App Router)
├── components/ # Componentes reutilizáveis
└── lib/ # Simulação de banco de dados (localStorage)

## ⚠️ Aviso técnico

Este é um projeto acadêmico em desenvolvimento incremental. Limitações conhecidas atuais:

- Autenticação e dados são simulados via `localStorage` do navegador — não há back-end conectado ainda (em desenvolvimento no repositório [conectasaudebe](https://github.com/gt-hackgov/conectasaudebe)).
- Não há verificação real de perfil (qualquer usuário pode escolher "paciente" ou "médico" no login).
- Dados de indicadores e score de risco são fictícios, para fins de demonstração.

## 🌿 Fluxo de contribuição

Este projeto segue o fluxo: branches novas a partir de `develop` → Pull Request para `develop` → validação → merge de `develop` para `main` ao final de cada fase.

```bash
git checkout develop
git pull
git checkout -b feat/nome-da-sua-task
```
