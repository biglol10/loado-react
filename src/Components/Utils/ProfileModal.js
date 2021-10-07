import React, { useState } from "react";
import { Modal, Header, Button, Grid, Icon } from "semantic-ui-react";
import Cropper from "react-cropper";

function ProfileModal({ profileModal, setProfileModal }) {
  const [cropper, setCropper] = useState();

  return (
    <>
      <Modal
        closeOnDimmerClick={false}
        size="large"
        // onClose={setProfileModal(false)}
        open={profileModal}
      >
        <Modal.Header content="이미지를 업로드하고 잘라보세요" />
        <Grid columns={2}>
          <Grid.Column>
            <Modal.Content image>
              <Cropper
                style={{ height: "400px", width: "100%" }}
                cropBoxResizable
                zoomable
                highlight
                responsive
                guides
                dragMode="move"
                initialAspectRatio={1}
                preview=".img-preview"
                src={null}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                autoCropArea={1}
                checkOrientation={false}
                onInitialized={(cropper) => setCropper(cropper)}
              />
            </Modal.Content>
          </Grid.Column>
        </Grid>
      </Modal>
    </>
  );
}

export default ProfileModal;
