import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn utility", () => {
  it("should merge tailwind classes properly", () => {
    expect(cn("px-2 py-2", "p-4")).toBe("p-4");
  });

  it("should combine non-conflicting classes", () => {
    expect(cn("text-red-500", "bg-blue-500")).toContain("text-red-500");
    expect(cn("text-red-500", "bg-blue-500")).toContain("bg-blue-500");
  });

  it("should filter out falsy values", () => {
    const active = false;
    expect(cn("text-red-500", active && "bg-blue-500", null, undefined)).toBe("text-red-500");
  });
});
