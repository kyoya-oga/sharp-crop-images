const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputDirectory = "./jpg";
const outputDirectory = "./webp";

fs.readdir(inputDirectory, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    if (path.extname(file) === ".jpg" || ".jpeg") {
      const inputPath = path.join(inputDirectory, file);
      const outputPath = path.join(
        outputDirectory,
        path.basename(file, ".jpeg") + ".webp"
      );

      sharp(inputPath)
        .toFormat("webp")
        .resize({
          width: 1500, // ここで望むサイズを指定できます
          height: 1500,
          fit: "cover",
          position: "center", // 中央を基準にクロップ
        })
        .toFile(outputPath, (err) => {
          if (err) throw err;
          console.log(`Converted and cropped ${inputPath} to ${outputPath}`);
        });
    }
  });
});
