import { cancel, confirm, isCancel, outro } from "@clack/prompts";

export async function confirmSave(): Promise<boolean> {
  const save: boolean | symbol = await confirm({
    message: "¿Desea guardar las tareas?",
    active: "Sí",
    inactive: "No",
    vertical: true,
    initialValue: true,
  });

  if (isCancel(save)) {
    cancel("No se guardaron las tareas");
    return false;
  }

  outro(save ? "Se guardaron las tareas" : "No se guardaron las tareas");
  return save;
}
