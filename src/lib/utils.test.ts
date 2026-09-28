import { describe, expect, it } from "vitest";

import { cn } from "./utils";

describe("cn", () => {
  it("merges conditional classes", () => {
    const isHidden = false;

    expect(cn("px-2", isHidden && "hidden", "text-sm")).toBe(
      "px-2 text-sm",
    );
  });

  it("resolves conflicting Tailwind classes", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });
});
