import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import {signOut} from "next-auth/react";

interface LoginModalProps {
    show: boolean;
}

const LoginModal: React.FC<LoginModalProps> = ({ show }) => {
    return (
        <Modal show={show} backdrop="static" keyboard={false}>
            <Modal.Header>
                <Modal.Title>Login Required</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Your session has expired. Please log in again.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => signOut()}>
                    Login
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LoginModal;
