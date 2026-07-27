import { isCancel, cancel, text } from '@clack/prompts';

async function promptLoop(): Promise<void> {
  while (true) {
    const value = await text({
      message: 'What is the meaning of life?',
      validate: (value) => {
        if (!value) return "error";
        if (value === "hola") return "no se puede bro"
        return undefined
      }
    });

    if (isCancel(value)) {
      console.clear()
      cancel('No canceles bro');
      // process.exit(1);
    }

    if (value === 'salir') {
      break;
    }

    // A partir de aquí, TypeScript sabe que `value` es estrictamente `string`
    console.log(`Procesando: ${value.toString()}`);
  }
}

promptLoop().catch((err: unknown) => {
  console.error('Error no controlado:', err);
  process.exit(1);
});
