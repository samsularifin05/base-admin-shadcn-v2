/* eslint-disable no-undef */
import { readFile, writeFile } from "fs/promises";
import path from "path";
import readline from "readline";
import fs from "fs";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt untuk nama file
rl.question(
  "Masukkan nama file yang ingin Anda perbarui: ",
  async (fileName) => {
    try {
      await generateFormState(fileName);
      await editFileIndexPage(fileName);
      createFolderStructure(fileName);
    } catch (error) {
      console.error("Error:", error);
      rl.close();
    }
  }
);

const generateFormState = async (fileName) => {
  const currentFileDir = path.dirname(new URL(import.meta.url).pathname);
  const filePath = path.resolve(
    currentFileDir,
    `../src/app/store/model/index.ts`
  );

  let fieldName = fileName;
  fieldName = capitalcase(fileName);

  try {
    // Baca isi file TypeScript yang sudah ada
    let data = await readFile(filePath, "utf8");

    // Tambahkan import statement jika belum ada
    let newData = data;

    // Tambahkan atau perbarui impor interface FormState
    const importRegex = /import\s+\{([\s\S]*?)\}\s+from\s+"@\/pages";/;
    newData = newData.replace(importRegex, (match, p1) => {
      if (!p1.includes(`${fieldName}Dto, initial${fieldName}`)) {
        return `import {\n  ${p1.trim()},\n  ${fieldName}Dto, initial${fieldName}\n} from "@/pages";`;
      }
      return match;
    });

    // Tambahkan field baru ke interface FormState jika belum ada
    const interfaceRegex = /export\s+interface\s+FormState\s+{([\s\S]*?)\}/;
    newData = newData.replace(interfaceRegex, (match, p1) => {
      // Pastikan properti fieldName belum ada sebelumnya
      if (!p1.includes(`${fieldName}: ${fieldName}Dto`)) {
        return `export interface FormState {\n  ${p1.trim()}\n  ${fieldName}: ${fieldName}Dto\n}`;
      }
      return match;
    });

    // Tambahkan nilai initial ke initialState jika belum ada
    const initialStateRegex =
      /export\s+const\s+initialState\s*:\s*FormState\s*=\s*{([\s\S]*?)\};/;
    newData = newData.replace(initialStateRegex, (match, p1) => {
      // Pastikan properti fieldName belum ada dalam initialState
      if (!p1.includes(`${fieldName}: initial${fieldName},`)) {
        return `export const initialState: FormState = {\n  ${p1.trim()},\n  ${fieldName}: initial${fieldName}\n}`;
      }
      return match;
    });

    // Tulis perubahan kembali ke file TypeScript yang sudah ada
    await writeFile(filePath, newData, "utf8");
    console.log("File updated successfully.");

    rl.close(); // Tutup readline setelah selesai
  } catch (err) {
    console.error("Error:", err);
    rl.close(); // Tutup readline jika terjadi kesalahan
  }
};
const createFolderStructure = (folderName) => {
  const currentFileDir = path.dirname(new URL(import.meta.url).pathname);
  const baseFolderPath = path.resolve(
    currentFileDir,
    `../src/pages/${folderName}`
  );
  folderName = capitalcase(folderName);

  const foldersToCreate = ["api", "model", "ui"];

  try {
    // Buat folder utama
    if (!fs.existsSync(baseFolderPath)) {
      fs.mkdirSync(baseFolderPath, { recursive: true });
    }

    // Buat subfolder dan file index.ts
    foldersToCreate.forEach((subFolder) => {
      const subFolderPath = path.join(baseFolderPath, subFolder);
      if (!fs.existsSync(subFolderPath)) {
        fs.mkdirSync(subFolderPath, { recursive: true });
      }

      const indexPath = path.join(subFolderPath, "index.ts");
      if (!fs.existsSync(indexPath)) {
        fs.writeFileSync(indexPath, ``, "utf8");
      }

      // Tambahkan file request.dto.ts dan response.dto.ts di folder model
      if (subFolder === "model") {
        const requestDtoPath = path.join(subFolderPath, "request.dto.ts");
        const responseDtoPath = path.join(subFolderPath, "response.dto.ts");
        if (!fs.existsSync(requestDtoPath)) {
          fs.writeFileSync(
            requestDtoPath,
            `export interface ${folderName}Dto {\n  name: string;\n}\n\nexport const initial${folderName}: ${folderName}Dto = {\n  name: ""\n};\n`,
            "utf8"
          );
        }
        if (!fs.existsSync(responseDtoPath)) {
          fs.writeFileSync(
            responseDtoPath,
            `export interface Response${folderName}Dto {\n  name: string;\n}\n`,
            "utf8"
          );
        }
        const modelIndexPath = path.join(subFolderPath, "index.ts");
        fs.writeFileSync(
          modelIndexPath,
          `export * from "./request.dto";\nexport * from "./response.dto";\n`,
          "utf8"
        );
      }
    });

    // Buat file index.ts di dalam folder utama
    const mainIndexPath = path.join(baseFolderPath, "index.ts");
    if (!fs.existsSync(mainIndexPath)) {
      fs.writeFileSync(
        mainIndexPath,
        `export * from "./model";\nexport * from "./api";\nexport * from "./ui";`,
        "utf8"
      );
    }
    console.log(`Folder structure for ${folderName} created successfully.`);
    rl.close();
  } catch (err) {
    console.error("Error:", err);
    rl.close();
  }
};
const editFileIndexPage = async (folderName) => {
  // const indexPath = path.resolve(__dirname, "../src/pages/index.ts");
  const currentFileDir = path.dirname(new URL(import.meta.url).pathname);
  const indexPath = path.resolve(currentFileDir, `../src/pages/index.ts`);

  try {
    // Baca isi file index.ts
    let data = await readFile(indexPath, "utf8");

    // Tambahkan export statement jika belum ada
    let newData = data;

    // Periksa apakah sudah ada ekspor dari foldername
    const regex = new RegExp(
      `export\\s*\\*\\s*from\\s*"\\.\\/(${folderName})";`,
      "g"
    );
    if (!regex.test(newData)) {
      // Tambahkan ekspor baru
      newData += `export * from "./${folderName}";\n`;

      // Tulis perubahan kembali ke file index.ts
      await writeFile(indexPath, newData, "utf8");
      console.log(`Export to ${folderName} added successfully.`);
    } else {
      console.log(`Export to ${folderName} already exists.`);
    }
  } catch (err) {
    console.error("Error:", err);
  }
};

function capitalcase(str) {
  if (typeof str !== "string") {
    throw new Error("Input harus berupa string");
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
