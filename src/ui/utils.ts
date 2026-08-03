export function validateTitle(
  value: string | undefined,
  taskTitles: string[] = [],
): string | Error | undefined {
  if (!value || value.trim().length === 0) return "El título es obligatorio";

  if (taskTitles.some((title) => title.toLowerCase() === value.toLowerCase()))
    return "Esta tarea ya existe";

  if (value !== value.trim())
    return "El título no debe empezar ni terminar con espacios";

  if (value.length >= 100) return "El título debe ser menor a 100 caracteres";

  if (!/^[\p{L}\p{N}\s]+$/u.test(value))
    return "Solo se permiten caracteres alfanuméricos y espacios";

  return undefined;
}

export function validateDescription(
  value: string | undefined,
): string | Error | undefined {
  if (!value || value.trim().length === 0) return undefined;

  if (value !== value.trim())
    return "La descripción no debe empezar ni terminar con espacios";

  if (value.length >= 500)
    return "La descripción debe ser menor a 500 caracteres";

  if (!/^[\p{L}\p{N}\s]+$/u.test(value))
    return "Solo se permiten caracteres alfanuméricos y espacios";

  return undefined;
}
