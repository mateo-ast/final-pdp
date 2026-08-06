import { cancel, isCancel, select } from "@clack/prompts";

export type SeeTaskSortOptionMenu =
  "title" | "createdDate" | "expirationDate" | "cancel";

export async function seeTasksSortMenuUI(): Promise<SeeTaskSortOptionMenu> {
  const value: SeeTaskSortOptionMenu | symbol =
    await select<SeeTaskSortOptionMenu>({
      message: "Elija el orden",
      options: [
        { value: "title", label: "Por título", hint: "descendiente (a-z)" },
        {
          value: "createdDate",
          label: "Por fecha de creación",
          hint: "desde la más antigua",
        },
        {
          value: "expirationDate",
          label: "Por fecha de expiración",
          hint: "desde la más cerca de expirar",
        },
      ],
    });

  if (isCancel(value)) {
    cancel("Cancelado");
    return "cancel";
  }

  return value;
}
