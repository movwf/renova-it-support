/* eslint-disable no-await-in-loop */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
// @ts-nocheck

export const cloudinaryConfig = {
  url: process.env.REACT_APP_CLOUDINARY_URL,
};

const serializeImagesData = (uploadedImagesData: any) =>
  uploadedImagesData.map((image) => image.secure_url);

export const uploadImage = async (fileList: FileList) => {
  const formData = new FormData();
  const uploadedImages = [];

  for (let i = 0; i < fileList.length; i += 1) {
    formData.append('file', fileList[i]);
    formData.append('upload_preset', 'tqwjgv8f');

    await fetch(cloudinaryConfig.url, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        uploadedImages.push(data);
      });
  }

  return serializeImagesData(uploadedImages);
};
