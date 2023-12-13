import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

function CommonModal(args) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color='danger' onClick={toggle}>
        Click Me
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>아이디 찾기</ModalHeader>
        <ModalBody>가입한 아이디는 example 입니다.</ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={toggle}>
            돌아가기
          </Button>{' '}
          {/* <Button color='secondary' onClick={toggle}>
            Cancel
          </Button> */}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default CommonModal;
