const JSZip = require("jszip");

module.exports = async (zip) => {
  const _Zip = await JSZip.loadAsync(zip);

  const files = [];
  const allFiles = _Zip.filter((relativePath, file) => !file.dir);
  const allFolders = _Zip
    .filter((relativePath, file) => file.dir)
    .map((data) => {
      return {
        path: "@" + data.name,
      };
    });

  files.push(...allFolders);

  await Promise.all(
    allFiles.map(async (file) => {
      const data = { path: file.name };
      const content = await file.async("nodebuffer");
      data.content = content.toString("base64");
      data.base64 = true;

      files.push(data);
    })
  );

  return files;
};
