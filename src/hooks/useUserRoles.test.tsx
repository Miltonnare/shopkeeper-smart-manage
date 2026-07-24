import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useUserRoles } from "./useUserRoles";
import { useAuth } from "@/components/auth/AuthContext";

// Mock the AuthContext hook
vi.mock("@/components/auth/AuthContext", () => ({
  useAuth: vi.fn(),
}));

describe("useUserRoles hook", () => {
  it("should return loading state and roles from useAuth context", () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      session: null,
      roles: ["admin", "sales"],
      loading: false,
      error: null,
      isAuthenticated: true,
      isAdmin: true,
      hasRole: () => true,
      refreshRoles: async () => {},
    });

    const { result } = renderHook(() => useUserRoles());
    expect(result.current.loading).toBe(false);
    expect(result.current.roles).toContain("admin");
    expect(result.current.roles).toContain("sales");
    expect(result.current.error).toBeNull();
  });
});
