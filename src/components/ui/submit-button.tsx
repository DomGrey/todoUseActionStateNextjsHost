"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Processing..." : children}
    </Button>
  );
}
