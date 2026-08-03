import { Prompt } from "@clack/core";

export async function next(
  message: string = "Presiona cualquier tecla para continuar...\n",
): Promise<void> {
  const prompt: Prompt<void> = new Prompt({
    render: () => message,
  });

  prompt.on("key", () => {
    prompt.emit("submit");
  });

  await prompt.prompt();
}
