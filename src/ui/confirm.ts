import { cancel, confirm, isCancel, outro } from "@clack/prompts";

export type ConfirmInfo = {
  message: string;
  initialValue: boolean;
  finalMessageTrue?: string;
  finalMessageFalse?: string;
};

export async function confirmUI({
  message,
  initialValue,
  finalMessageTrue,
  finalMessageFalse,
}: ConfirmInfo): Promise<boolean> {
  const value: boolean | symbol = await confirm({
    message,
    active: "Sí",
    inactive: "No",
    vertical: true,
    initialValue,
  });

  if (isCancel(value)) {
    cancel("Cancelado");
    return false;
  }

  if (finalMessageFalse && finalMessageTrue)
    outro(value ? finalMessageTrue : finalMessageFalse);
  return value;
}
