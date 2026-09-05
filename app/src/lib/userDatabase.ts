export type UserRecord = {
  cpf: string;
  username: string;
  password: string;
};

export type CurrentUser = {
  cpf: string;
  username: string;
  role: "paciente" | "medico";
};

const STORAGE_USERS_KEY = "saudeDigitalUsers";
const STORAGE_CURRENT_USER_KEY = "saudeDigitalUser";

const normalizeCpf = (value: string) => value.replace(/\D/g, "");

const defaultUsers: UserRecord[] = [
  {
    cpf: "12925945007",
    username: "Maria",
    password: "saude123",
  },
];

export function getUsers(): UserRecord[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_USERS_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as UserRecord[];
  } catch {
    return [];
  }
}

export function setUsers(users: UserRecord[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
}

export function seedDefaultUsers() {
  if (typeof window === "undefined") return;
  const currentUsers = getUsers();
  if (currentUsers.length === 0) {
    setUsers(defaultUsers);
    return;
  }

  const existingCpf = currentUsers.some(
    (user) => normalizeCpf(user.cpf) === normalizeCpf(defaultUsers[0].cpf)
  );

  if (!existingCpf) {
    setUsers([...currentUsers, ...defaultUsers]);
  }
}

export function findUserByCpf(cpf: string): UserRecord | undefined {
  const users = getUsers();
  const normalizedCpf = normalizeCpf(cpf);
  return users.find((user) => normalizeCpf(user.cpf) === normalizedCpf);
}

export function getCurrentUser(): CurrentUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as CurrentUser;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: CurrentUser) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(user));
}

export function clearCurrentUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
}
