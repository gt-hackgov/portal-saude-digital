import { NextRequest } from "next/server";

export const validateBearerToken = (request: NextRequest): boolean => {
  const authHeader = request.headers.get("authorization");
  
  if (!authHeader) {
    return false;
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return false;
  }

  const token = parts[1];

  if (!token || !token.startsWith("mock-token")) {
    return false;
  }

  return true;
};
