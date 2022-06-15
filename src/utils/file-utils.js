import Papa from "papaparse";

export async function parseCSVFile(
  file,
  {
    header = true,
    preview = false,
    dynamicTyping = true,
    comments = false,
    skipEmptyLines = true,
    transformHeader = (header) => header,
  } = {}
) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      complete: (res) => {
        // res = alterResult(res);
        resolve(res);
      },
      error: (err) => reject(err),
      skipEmptyLines,
      header,
      transformHeader,
      preview,
      dynamicTyping,
      comments,
    });
  });
}
