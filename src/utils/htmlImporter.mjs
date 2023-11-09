export const importHtml = async (htmlPath) =>
  (await fetch(`./src/components/${htmlPath}`)).text();
