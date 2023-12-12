import React, { useState } from 'react'
import '../component/MainStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ModalPopUp from './ModalPopUp';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Form, Button } from 'react-bootstrap';

function Main() {
    // const [modalShow, setModalShow] = React.useState(false);         // throught this method we don't have to write import upwards like this => import React, { useState } from 'react'

    const [modalShow, setModalShow] = useState(false);
    const [createdGroupNames, setCreatedGroupNames] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [noteContent, setNoteContent] = useState([]); // State to track textarea content
    const [notes, setNotes] = useState([]);
    const [isSideBarVisible, setIsSideBarVisible] = useState(true);

    const handleGroupCreated = (groupName, selectedColor) => {
        const newGroup = { name: groupName, color: selectedColor };
        setCreatedGroupNames((prevGroupNames) => [...prevGroupNames, newGroup]);
        setSelectedGroup(newGroup);

        setIsSideBarVisible(true);
    };

    const handleGroupSelection = (group) => {
        setSelectedGroup(group);

        if (window.innerWidth < 768) {
            setIsSideBarVisible(false);
        }

    };

    const handleInputChange = (e) => {
        setNoteContent(e.target.value);
    };


    const handleButtonClick = () => {
        if (selectedGroup) {
            // Retrieve existing notes from localStorage
            const existingNotes = JSON.parse(localStorage.getItem('noteTakingKey')) || [];

            // Create a new note object with content, current time, and selected group information
            const newNote = {
                content: noteContent,
                time: new Date().toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                }),
                date: new Date().toLocaleString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                }),
                group: selectedGroup,
            };

            // Push the new note to the existing array
            existingNotes.push(newNote);

            // Store the updated array in localStorage
            localStorage.setItem('noteTakingKey', JSON.stringify(existingNotes));
            setNotes(existingNotes); // Update the notes state here

            // Optionally, you can clear the input value after submission
            setNoteContent('');
        } else {
            alert('Please select a group before adding a note.');
        }

    };

    function handleBackButtonClick() {
        setSelectedGroup(null);
        setIsSideBarVisible(true);
    }

    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    {isSideBarVisible && (
                        <div className='col-12 col-md-4 main-side-bar'>
                            <div className='row'>
                                <div className='col-12'>
                                    <div>
                                        <h2 className='main-head-text my-4 px-3'>Pocket Notes</h2>
                                    </div>
                                    <div className='text-align-center text-center'>
                                        <button type="button" className="btn main-btn-style my-3" onClick={() => setModalShow(true)}><b>+</b> Create Notes Group</button>
                                        <ModalPopUp
                                            show={modalShow}
                                            onHide={() => setModalShow(false)}
                                            groupCreated={handleGroupCreated} // Updated prop name
                                        />
                                    </div>
                                </div>
                                <div className='col-12 scrollable-col'>
                                    {/* Display the created group names under each other */}
                                    {createdGroupNames.length > 0 && (
                                        <div className='text-center'>
                                            <ul>
                                                {createdGroupNames.map((group, index) => (
                                                    <li
                                                        className={`my-3 p-4 main-li-style ${selectedGroup && selectedGroup.name === group.name ? 'selected' : ''}`}
                                                        key={index}
                                                        onClick={() => handleGroupSelection(group)}
                                                    >
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <div
                                                                className='main-color-circle'
                                                                style={{ backgroundColor: group.color, marginRight: '10px' }}
                                                            >
                                                            </div>
                                                            <h3>{group.name}</h3>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    {/* <div className='col-md-8 main-text-area p-0 d-none d-md-block'> */}
                    <div className={`col-md-8 main-text-area p-0  ${isSideBarVisible ? '' : 'col-12'}`}>

                        <div className="container-fluid parent-container">
                            <div className="row">
                                <div className="col-12 main-first-child p-0">
                                    <div className='main-nav'>
                                        {selectedGroup && (
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div className='d-md-none mx-3'>
                                                    <FontAwesomeIcon
                                                        icon={faArrowLeft}
                                                        style={{
                                                            fontSize: '1.5em',
                                                            cursor: 'pointer',
                                                            marginRight: '10px',
                                                        }}
                                                        onClick={handleBackButtonClick} // Add your back button logic here
                                                    />
                                                </div>
                                                <div
                                                    className='main-color-circle mx-4'
                                                    style={{ backgroundColor: selectedGroup.color, marginRight: '10px' }}
                                                >

                                                </div>
                                                <h2 className='main-h2-text my-4'>{selectedGroup.name}</h2>
                                            </div>
                                        )}
                                    </div>
                                    <div className='show-data'>
                                        <div className='container main-user-note'>
                                            {selectedGroup &&
                                                notes
                                                    .filter((note) => note.group && selectedGroup && note.group.name === selectedGroup.name)
                                                    .map((note, index) => (
                                                        <div key={index} className='row my-4'>
                                                            <div className='container-fluid'>
                                                                <div className='row mx-4'>
                                                                    <div className='col-2'>
                                                                        <div><p className='mb-0'>{note.time}</p></div>
                                                                        <div><p className='mb-0'>{note.date}</p> </div>
                                                                    </div>
                                                                    <div className='col-10'>
                                                                        <div className='note-content'><p>{note.content}</p></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 main-second-child">
                                    <div className="p-4">
                                        {selectedGroup && (
                                            <div style={{ height: '20vh' }}>
                                                <Form.Control
                                                    as="div"  // Use a div instead of textarea
                                                    style={{ position: 'relative', height: '100%', width: "100%", padding: "1rem 1rem" }}
                                                >
                                                    <textarea
                                                        style={{ width: '100%', height: '100%', border: 'none', outline: 'none', resize: 'none' }}
                                                        placeholder="Enter your text here"
                                                        value={noteContent}
                                                        onChange={handleInputChange}
                                                    />
                                                    <div
                                                        style={{
                                                            position: 'absolute',
                                                            bottom: '10px',
                                                            right: '10px',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faPaperPlane}
                                                            style={{
                                                                fontSize: '1.5em',
                                                            }}
                                                            onClick={handleButtonClick} 
                                                        />
                                                    </div>
                                                </Form.Control>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main;