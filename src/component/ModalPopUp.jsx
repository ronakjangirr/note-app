import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalPopUp(props) {
    const colors = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'];

    const [groupName, setGroupName] = useState('');
    const [selectedColor, setSelectedColor] = useState(colors[0]); // Set initial color
    let [errorName, setErrorName] = useState('')

    const handleGroupNameChange = (event) => {
        setGroupName(event.target.value);
    };

    function formValidation() {
        let isValid = true
        if (!groupName) {
            setErrorName("Please enter group name")
            isValid = false;
        } else {
            setErrorName('');
        }
        return isValid;
    }

    const handleCreateClick = () => {
        if (formValidation()) {
            props.onHide();
            // Pass the group name to the parent component
            props.groupCreated(groupName, selectedColor); // Updated prop name
            setGroupName('');
        } else {
            alert("Form is not valid");
        }
    };

    const { onHide, groupCreated, ...otherProps } = props;

    return (
        <>
            <Modal
                {...otherProps}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <div className='text-center mt-4'>
                    <h3>Create New Notes Group</h3>
                </div>
                <Modal.Body >
                    <Form>
                        <div className='container text-start'>
                            <div className='row g-3'>
                                <div className='col-6'>
                                    <h5>Group Name</h5>
                                </div>
                                <div className='col-6'>
                                    <Form.Control
                                        type="text"
                                        placeholder="Your note name"
                                        autoFocus
                                        value={groupName}
                                        onChange={handleGroupNameChange}
                                        style={{ border: errorName ? '1px solid red' : '1px solid #ced4da' }}
                                    />
                                    {<p style={{ color: 'red' }}>{errorName}</p>}

                                </div>
                                <div className='col-6'>
                                    <h5>Choose Color</h5>
                                </div>
                                <div className='col-6'>
                                    <div className="color-picker-container">
                                        {colors.map((showColor, index) => (
                                            <div
                                                key={index}
                                                className={`color-circle ${selectedColor === showColor ? 'selected' : ''}`}
                                                style={{ backgroundColor: showColor }}
                                                onClick={() => setSelectedColor(showColor)}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='text-center my-3'>
                            <Button onClick={handleCreateClick} className='main-create-btn'>Create</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalPopUp