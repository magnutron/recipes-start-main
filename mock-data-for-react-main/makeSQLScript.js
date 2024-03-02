const fs = require('fs');
const path = require('path');

const args = process.argv[2];

if (args && args !== "dk" && args !== "en") {
  console.error("Language not supported");
  process.exit(1);
}

let language = "dk";
let jsonFilePath = path.join(__dirname, 'dbDK.json');
let nameOfSQLScript = "recipesMySQL_DK.sql";
if (args === "en") {
  jsonFilePath = path.join(__dirname, 'dbEN.json');
  nameOfSQLScript = "recipesMySQL_EN.sql";
}
n

fs.readFile(jsonFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error("Error reading the JSON file:", err);
    return;
  }

  const jsonData = JSON.parse(data);
  const categories = jsonData.categories;
  const recipes = jsonData.recipes;

  let sqlScript = `CREATE DATABASE IF NOT EXISTS recipesDB;
USE recipesDB;

DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE recipes (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_id INT,
    instructions TEXT,
    thumb VARCHAR(255),
    youTube VARCHAR(255),
    ingredients TEXT,
    source VARCHAR(255),
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);\n\n`;

  // Insert categories
  categories.forEach(category => {
    sqlScript += `INSERT INTO categories (name) VALUES ('${category.replace(/'/g, "\\'")}');\n`;
  });

  // Prepare recipes insert statement
  recipes.forEach(recipe => {
    const { id, name, category, instructions, thumb, youTube, ingredients, source } = recipe;
    const instructionsEscaped = instructions.replace(/'/g, "\\'").replace(/\r\n/g, '\\r\\n');
    sqlScript += `INSERT INTO recipes (id, name, category_id, instructions, thumb, youTube, ingredients, source) VALUES (${id}, '${name.replace(/'/g, "\\'")}', (SELECT id FROM categories WHERE name = '${category.replace(/'/g, "\\'")}'), '${instructionsEscaped}', '${thumb}', '${youTube}', '${ingredients.replace(/'/g, "\\'")}', '${source}');\n`;
  });

  // Save or output the SQL script
  const outputFilePath = path.join(__dirname, nameOfSQLScript);
  fs.writeFile(outputFilePath, sqlScript, (err) => {
    if (err) {
      console.error("Error writing the SQL script file:", err);
      return;
    }
    console.log("SQL script generated successfully:", outputFilePath);
  });
});
