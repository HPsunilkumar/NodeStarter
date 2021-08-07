const { ESLint } = require("eslint");

async function ESLintListener() {
  // 1. Create an instance.
  const eslint = new ESLint();
  const results = await eslint.lintFiles(['*/*.js', '*/*/*.js']);

  // 3. Format the results.
  const formatter = await eslint.loadFormatter("stylish");
  const resultText = formatter.format(results);

  // 4. Output it.
  console.log(resultText);
}

module.exports = ESLintListener;