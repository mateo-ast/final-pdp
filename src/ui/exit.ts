import { confirm, isCancel, outro } from "@clack/prompts";

export async function exitUI(message: string): Promise<boolean> {
  const exit: boolean | symbol = await confirm({
    message,
    active: "Sí",
    inactive: "No",
    vertical: true,
    initialValue: false,
  });

  if (isCancel(exit)) return false;

  outro(exit ? "Adios" : "Continuemos");
  return exit;
}
