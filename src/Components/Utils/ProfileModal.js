import React, { useState } from "react";
import { Modal, Header, Button, Grid, Icon } from "semantic-ui-react";

function ProfileModal({ profileModal, setProfileModal }) {
  return (
    <>
      <Modal
        closeOnDimmerClick={false}
        size="large"
        onClose={setProfileModal(false)}
        open={profileModal}
      ></Modal>
    </>
  );
}

export default ProfileModal;
