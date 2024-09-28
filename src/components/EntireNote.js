import React,{ useRef,useEffect,useState, useContext } from "react"; // eslint-disable-next-line
import NoteContext from "../context/notes/NoteContext";
import { useSelector } from "react-redux";


const EntireNote = (props) => {

    const { title, description, tag, id } = props; // Ensure you're passing the `id` prop as well
    const textareaRef = useRef(null);
    const initialHeightRef = useRef(0); // Ref to store initial height
    const [isEditable, setIsEditable] = useState(false);
    const [currentDescription, setCurrentDescription] = useState(description);
    const context = useContext(NoteContext);
    const {editNote} = context;
    const mode = useSelector(state => state.mode);
    const fontColor = mode==='light'? 'black':'white'; 

    const handleInput = () => {
        if (!initialHeightRef.current) {
            initialHeightRef.current = textareaRef.current.scrollHeight; // Set the initial height if not already set
        }

        // Resize the textarea based on the content
        textareaRef.current.style.height = 'auto'; // Reset height to auto to allow shrinking
        textareaRef.current.style.height = `${Math.max(initialHeightRef.current, textareaRef.current.scrollHeight)}px`; // Set height to the max of initial height and scroll height
    };

    useEffect(() => {
        handleInput(); // Adjust height on mount
    }, [currentDescription]); // Adjust height when current description changes

    const handleKeyDown = (event) => {
        if(event.key === 'Escape'){
            setIsEditable(false);
            setCurrentDescription(description);
        }
    }

    useEffect(() => {

        window.addEventListener('keydown', handleKeyDown);

        return () => { 
            window.removeEventListener('keydown', handleKeyDown)
        }

    },[isEditable]);


    const handleEditClick = (event) => {
        const textarea = document.querySelector('.textarea');
        textarea.focus()
        if(event.key === 'escape'){
            setIsEditable(!isEditable);
        }
        if (isEditable) {
            // If already in editable state, call the editNote function
            editNote(id, title, currentDescription, tag);
        }
        setIsEditable(!isEditable); // Toggle editable state
    };
    

  return (
    <>

            <div className="d-flex justify-content-between align-items-center my-5">
                <div>
                    <h1 className="title my-3" style={{color : fontColor}}>{title}</h1>
                    <h5 className="my-2" style={{color : fontColor}}>Tag :- {tag}</h5>
                </div>
                <div className="edit-container" onClick={handleEditClick}>
                    <i className="fa-solid fa-pen-to-square mx-2 fa-2x ms-auto" style={{ cursor: 'pointer', color : fontColor }}></i>
                    <span className="edit-subscript">{isEditable? 'Save the Description?' :'Want to edit the description?'}</span>
                </div>
            </div>
            <div className="form-floating my-2">
                <textarea
                    ref={textareaRef}
                    className="form-control textarea"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    value={isEditable ? currentDescription : description}
                    onChange={(event) => setCurrentDescription(event.target.value)} 
                    onInput={handleInput} // Adjust height on input
                    style={{ minHeight: "100px", resize: "none", backgroundColor: isEditable ? '#fff' : '#f8f9fa' }} // Set minimum height
                    readOnly={!isEditable} // Make textarea read-only if not editable
                ></textarea>

                <label htmlFor="floatingTextarea2">Description</label>
        </div>
      
    </>
  );
};

export default EntireNote;
