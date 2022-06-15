import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { compressFile, downloadLink, getBase64 } from "@/utils";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import FormHelperText from "@mui/material/FormHelperText";
import { CustomButton } from "@/components";
import { styled } from "@mui/material/styles";

const checkValidity = (name, supportedFormats = []) =>
  supportedFormats.some((el) => name.toLowerCase().endsWith(el));

const isImageFile = (name) =>
  ["png", "jpg", "jpeg", "jfif", "webp"].some((el) =>
    name.toLowerCase().endsWith(el)
  );

const ChooseFileComponent = styled("div")`
  width: 100%;
  background-color: white;
  display: grid;
  place-items: center;
  height: 80px;
  margin-bottom: 10px;
  border-radius: 10px;
  border: 3px dashed #989696;
`;

const FileInput = ({
  onChange = () => {},
  value = null,
  supportedFormats = ["png", "jpg", "jpeg", "jfif"],
  downloadName,
  isDownloadable,
  className,
  style,
  convertToBase64 = true,
  name = "",
  onError = () => {},
}) => {
  const [file, setFile] = useState(value);
  const [fileDetails, setFileDetails] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const onDrop = async ([chosenFile]) => {
    if (chosenFile) {
      if (checkValidity(chosenFile.name, supportedFormats)) {
        setError(null);
        setFileDetails(chosenFile);
        setProcessing(true);
        // if convertToBase64 is true then convert, else return the file as it is
        if (convertToBase64) {
          // compress, if it is an image file
          if (isImageFile(chosenFile.name)) {
            // compress
            let data = await compressFile([chosenFile], { size: 0.3 });
            setFile(data ? data[0].dataWithPrefix : null);
            onChange(data ? data[0].dataWithPrefix : null);
          } else {
            // else don't compress
            let data = await getBase64(chosenFile);
            setFile(data);
            onChange(data);
          }
        } else {
          setFile(chosenFile);
          onChange(chosenFile);
        }
        setProcessing(false);
      } else {
        setFileDetails(null);
        const errorMessage = `Invalid format. \nSupported formats: ${supportedFormats}`;
        onError(errorMessage);
        setError(errorMessage);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: processing,
  });

  useEffect(() => {
    setFile(value);
  }, [value]);

  const removeFile = () => {
    setFile(null);
    onChange(null);
    setError(null);
    setFileDetails(null);
  };

  const downloadChoosenFile = () => {
    downloadLink({
      link: file,
      name: downloadName || fileDetails?.name || name,
    });
  };

  return (
    <>
      <ChooseFileComponent
        className={[`${processing ? "skeleton-box" : ""}`, className]
          .filter((el) => el)
          .join(" ")}
        {...getRootProps()}
        // onClick={processing ? () => {} : getRootProps().onClick}
        multiple={false}
        style={{
          outline: "none",
          cursor: processing ? "default" : "pointer",
          ...style,
        }}
      >
        <input {...getInputProps()} />
        {processing ? (
          "Processing..."
        ) : isDragActive ? (
          <p style={{ margin: 0 }}>Ready to Drop...</p>
        ) : (
          <p style={{ margin: 0 }}>
            {fileDetails?.name || "Drag & Drop file here"}
          </p>
        )}
      </ChooseFileComponent>
      {file && (
        <>
          <CustomButton
            color="error"
            onClick={removeFile}
            size="sm"
            startIcon={<DeleteTwoToneIcon />}
          >
            Remove Chosen File
          </CustomButton>
          {isDownloadable && (
            <CustomButton
              color="success"
              size="sm"
              onClick={downloadChoosenFile}
              startIcon={<ArrowDownwardIcon />}
            >
              Download File
            </CustomButton>
          )}
        </>
      )}
      <FormHelperText error>{error}</FormHelperText>
    </>
  );
};

export default FileInput;
