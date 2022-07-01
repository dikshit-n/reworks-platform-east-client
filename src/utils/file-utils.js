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

export const downloadLink = ({ link, name }) => {
  let aTag = document.createElement("a");
  aTag.href = link;
  aTag.target = "_blank";
  aTag.download = name;
  aTag.click();
};

export async function getBase64(file) {
  return new Promise((resolve) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      // console.log(reader.result);
      resolve(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
      resolve(null);
    };
  });
}

export const imageUrlToBase64 = async (url) => {
  try {
    if (url && url.startsWith("http")) {
      let image = await axiosInstance.post("/services/image_to_base64", {
        url,
      });
      const { raw } = image.data;
      return raw;
    } else return url;
  } catch (err) {
    return null;
  }
};

export const compressFile = async (files, options = {}) => {
  let data;
  try {
    if (typeof window !== "undefined") {
      if (!Compressor) Compressor = require("compress.js");
      let compress = new Compressor();
      data = await compress.compress(files, {
        size: options.size ? options.size : 2, // the max size in MB, defaults to 2MB
        quality: options.quality ? options.quality : 0.75, // the quality of the image, max is 1,
        maxWidth: 1920, // the max width of the output image, defaults to 1920px
        maxHeight: 1920, // the max height of the output image, defaults to 1920px
        resize: options.resize !== undefined ? options.resize : false, // defaults to true, set false if you do not want to resize the image width and height
      });
    } else data = null;
  } catch (err) {
    data = null;
  }
  data = data
    ? data.map((el) => ({
        ...el,
        dataWithPrefix: el.prefix + el.data,
      }))
    : null;
  return data;
};
