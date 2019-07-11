import notify from '../../components/shared/Toaster';


const verifyFile = (files, fileSize, fileType) => {
  const maxFileSize = fileSize; // bytes
  const acceptedFileType = fileType;
  const acceptedFileTypeArray = acceptedFileType.split(',').map(item => item.trim());

  const currentFile = files[0];
  const currentFileType = currentFile.type;
  const currentFileSize = currentFile.size;
  if (currentFileSize > maxFileSize) {
    notify('This file is too large. Please select a smaller file.');
    return false;
  }
  if (!acceptedFileTypeArray.includes(currentFileType)) {
    notify('This file type is not allowed');
    return false;
  }
  return true;
};

export default verifyFile;
