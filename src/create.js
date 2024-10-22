const JSZip = require("jszip");

function processFile(_Zip, file) {
  if (file.path.startsWith("@")) {
    _Zip.folder(file.path.slice(1));
    return;
  }

  if (!file.path) {
    console.error("No path provided");
    return;
  }
  if (!file.content) {
    console.error("No content provided");
    return;
  }

  if (file.base64) {
    if (typeof file.base64 !== "boolean") {
      console.error("No base64 provided");
      return;
    }
    _Zip.file(file.path, file.content, { base64: true });
    return;
  } else {
    _Zip.file(file.path, file.content);
    return;
  }
}

module.exports = async (zip = []) => {
  const _Zip = new JSZip();

  zip.forEach((file) => {
    processFile(_Zip, file);
  });

  return await _Zip.generateAsync({ type: "blob", compression: "DEFLATE" });
};
