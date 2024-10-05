import React,{ useRef,useEffect,useState, useContext, useCallback } from "react"; // eslint-disable-next-line
import NoteContext from "../context/notes/NoteContext";
import { useSelector } from "react-redux";
import AlertContext from "../context/AlertContext";
import Spinner from "./Spinner";

const EntireNote = (props) => {


    const { title, description, tag, id } = props; // Ensure you're passing the `id` prop as well
    const textareaRef = useRef(null);
    const initialHeightRef = useRef(0); // Ref to store initial height
    const [isEditable, setIsEditable] = useState(false);
    const [currentDescription, setCurrentDescription] = useState(description);
    const context = useContext(NoteContext);
    const {editNote,summarizeContent} = context;
    const mode = useSelector(state => state.mode);
    const fontColor = mode==='light'? 'black':'white'; 
    const [isSummarized, setisSummarized] = useState(false);
    const [summary, setSummary] = useState('');
    const {showAlert} = useContext(AlertContext);
    const [loading,setLoading] = useState(false);
    const [wordLength,setWordLength] = useState(0);

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

    // eslint-disable-next-line
    },[isEditable]);


    const handleEditClick = (event) => {
        event.preventDefault();
        textareaRef.current.focus()
        if(event.key === 'escape'){
            setIsEditable(!isEditable);
        }
        if (isEditable) {
            // If already in editable state, call the editNote function
            editNote(id, title, currentDescription, tag);
        }
        setIsEditable(!isEditable); // Toggle editable state
    };
    
    
    useEffect(() => {
        if (summary) {
            setisSummarized(true);
            // console.log("Summary updated: ", summary);
            // console.log("isSummarized :- ", isSummarized);
        }
    }, [summary]);  // This will log when the `summary` state changes  


    const [summarizationState, setSummarizationState] = useState('idle');

    const handleSummarizeClick = useCallback(async (event) => {
        event.preventDefault();
        const descriptionLength = currentDescription.split(/\s+/).filter((element) => element.length !== 0).length;
        if(descriptionLength<=0){
            setSummary('Empty Description Cannot be summarized');
            return;
        }
        try {
          setSummarizationState('loading');
        //   setSummary("Summarizing..."); // Show loading state
        setLoading(true);
          
          const summaryResponse = await summarizeContent(currentDescription);
          
          // Ensure that only the summary-related states are updated, not other parts
          if (summaryResponse === 'Upgrade API Token') {
            setSummarizationState('error');
            setSummary('Upgrade API Token!');
            setLoading(false);
          } else if (summaryResponse) {
            setSummarizationState('success');
            setSummary(summaryResponse);
            setLoading(false);
          } else {
            setSummarizationState('error');
            setSummary("Unable to summarize the content.");
            setLoading(false);
            }
        } catch (error) {
          setSummarizationState('error');
          setSummary("An error occurred while summarizing the content.");
        }
        setLoading(false);
      }, [currentDescription, summarizeContent]);
      






    const handleCopyClick = useCallback((event) => {
        navigator.clipboard.writeText(currentDescription);
        showAlert("Description Copied Successfully!", "success");
    });

    const removeExtraSpacesClick = useCallback((event) => {

        event.preventDefault();
        const cleanDescription = currentDescription.split(/[  ]+/);

        setCurrentDescription(cleanDescription.join(" "));

        editNote(id, title, cleanDescription, tag)

        showAlert("Removed Extra Spaces Successfully!", "success");
    });


    const wordCount = useCallback((event) => {
            event.preventDefault();
            const textCount = currentDescription.split(/\s+/).filter((element) => element.length !== 0).length;
            setWordLength(textCount);
        },
        [currentDescription,showAlert]
    );
    
    const clearText = useCallback((event) => {
        event.preventDefault();
        const clearedText = ' ';
        setCurrentDescription(clearedText);
        editNote(id,title, clearedText, tag);
        showAlert("Alert Cleared Successfully!", "success");
    });


    
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

        <div>
            <div className="container">
            <button className = {`btn btn-${mode==='light' ? 'success' : 'dark'} my-3 mx-1`} onClick = {handleSummarizeClick}>Summarize Note</button>
            <button className = {`btn btn-${mode==='light' ? 'success' : 'dark'} my-3 mx-1`} onClick = {handleCopyClick}>Copy Full Description</button>
            <button className = {`btn btn-${mode==='light' ? 'success' : 'dark'} my-3 mx-1`} onClick = {removeExtraSpacesClick}>Clear Extra Spaces</button>
            <button className = {`btn btn-${mode==='light' ? 'success' : 'dark'} my-3 mx-1`} onClick={wordCount}>Word Count</button>
            <button className = {`btn btn-${mode==='light' ? 'success' : 'dark'} my-3 mx-1`} onClick = {clearText}>Clear Text</button>
            </div>
            
            <p style={{color : fontColor}}>{wordLength !== 0 ? `The no of words in the description is :-  ${wordLength}` : ''}</p>
            {loading? <Spinner/> : ''}
            {summary ?  <><h4 className="my-3" style={{color : fontColor}}>Summary : -</h4><p style={{ fontWeight: 'bold', fontFamily: 'italic', color: mode === 'light' ? 'black' : 'white' }}>{summary}</p></> : ""}
            
        </div>
      
    </>
  );
};

export default EntireNote;
