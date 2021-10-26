import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  Header,
  Button,
  Grid,
  Icon,
  Divider,
  Image,
} from "semantic-ui-react";
import Cropper from "react-cropper";
import uploadPic from "../Utils/uploadPicToCloudinary";
import { updateProfilePic, waitForSomeTime } from "../Utils/ViewDataUtil";
import cookie from "js-cookie";

function ProfileModal({ profileModal, setProfileModal, profilePic }) {
  const [cropper, setCropper] = useState();
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState();
  const [statusText, setStatusText] = useState(
    "이미지를 업로드하고 잘라보세요 (icon)"
  );
  const inputRef = useRef();

  const handleImageChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "media") {
      setMedia(files[0]);
      setMediaPreview(URL.createObjectURL(files[0]));
      // console.log("objectURL is ", URL.createObjectURL(files[0]));  https://kyounghwan01.github.io/blog/JS/JSbasic/Blob-url/#createobjecturl
    }
  };

  const cropperStyle = {
    height: "400px",
    width: "100%",
  };

  const submitData = async () => {
    let picUrl;
    let uploadResult = false;

    if (false) {
      alert("ASDF");
      setMedia(cropper.getCroppedCanvas().toDataURL()); // passing actual crop image
      //   setMediaPreview(cropper.getCroppedCanvas().toDataURL())
      cropper.destroy(); // release the cropper from the memory
    }

    if (media !== null && cropper) {
      setStatusText("이미지를 업로드 중입니다");
      picUrl = await uploadPic(cropper.getCroppedCanvas().toDataURL());
      waitForSomeTime(500);
      cropper.destroy();
      if (!picUrl) {
        setStatusText("이미지 업로드에 실패했습니다");
      }
      uploadResult = await updateProfilePic(
        picUrl,
        cookie.get("loadoUserToken")
      );
    }
    if (!uploadResult) {
      setStatusText("이미지 업로드에 실패했습니다");
      return;
    }
    setProfileModal(false);
    window.location.reload();
  };

  return (
    <>
      <Modal
        closeOnDimmerClick={false}
        size="large"
        // onClose={setProfileModal(false)}
        open={profileModal}
      >
        <Modal.Header>
          {statusText}{" "}
          <Icon
            name="image"
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => inputRef.current.click()}
          />
          <input
            ref={inputRef}
            onChange={handleImageChange}
            name="media"
            style={{ display: "none" }}
            type="file"
            accept="image/*"
          />
        </Modal.Header>
        <Grid columns={2}>
          <Grid.Column>
            <Modal.Content image>
              {mediaPreview ? (
                <Cropper
                  style={cropperStyle}
                  cropBoxResizable
                  zoomable
                  highlight
                  responsive
                  guides
                  dragMode="move"
                  initialAspectRatio={1}
                  preview=".img-preview"
                  src={mediaPreview}
                  viewMode={1}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  background={false}
                  autoCropArea={1}
                  checkOrientation={false}
                  onInitialized={(cropper) => setCropper(cropper)}
                />
              ) : (
                <Image
                  src="https://react.semantic-ui.com/images/wireframe/image.png"
                  style={{ ...cropperStyle, cursor: "pointer" }}
                  onClick={() => inputRef.current.click()}
                />
              )}
              {/* cropper can only generate preview from a url string not from object, so we passed mediapreview not media state */}
            </Modal.Content>
          </Grid.Column>
          <Grid.Column>
            <Modal.Content image>
              <div style={{ margin: "15px 0px" }}>
                <Header as="h3">
                  <Icon name="file image outline" />
                  <Header.Content content="최종 이미지" />
                </Header>
              </div>
              <div>
                <div
                  style={{
                    width: "100%",
                    height: "300px",
                    display: "inline-block",
                    padding: "10px",
                    overflow: "hidden",
                    boxSizing: "border-box",
                  }}
                  className="img-preview"
                ></div>
              </div>
            </Modal.Content>
          </Grid.Column>
        </Grid>
        <Modal.Actions>
          <Button
            title="Reset (R)"
            icon="redo"
            circular
            onClick={() => cropper && cropper.reset()}
          />
          {/* 
          <Button
            title="Move Canvas (M)"
            icon="move"
            circular
            onClick={() => cropper && cropper.setDragMode("move")}
          /> */}

          <Button
            title="New Cropbox (C)"
            icon="crop"
            circular
            onClick={() => cropper && cropper.setDragMode("crop")}
          />

          <Button
            negative
            content="취소"
            icon="cancel"
            onClick={() => setProfileModal(false)}
          />

          <Button
            content="프로필 업로드"
            icon="checkmark"
            positive
            onClick={submitData}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default ProfileModal;
