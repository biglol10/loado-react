import axios from "axios";

const uploadPic = async (media) => {
  try {
    const form = new FormData();
    form.append("file", media);
    form.append("upload_preset", "Loado_Image");
    form.append("cloud_name", "biglol");
    console.log("URL IS ", process.env.REACT_APP_CLOUDINARY_URL);
    const res = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, form);
    return res.data.url;
  } catch (error) {
    return;
  }
};

export default uploadPic;
