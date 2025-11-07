import { useState } from "react";
import uuid from "react-uuid";

const id = () => uuid();

const initNotes = [];

function Note({ id, text, editNote}) {
    return (
       <button onClick={() => {editNote(id)}}>
            <span>{text}</span>
       </button>
    );
}


function Notes({notes, editNote}) {
    return ( notes.map((note) =>
            <Note id={note.id} text={note.text} editNote={editNote}/>
    ))
}

function BlockNotes() {
    const [notes, setNotes] = useState(initNotes);
    const [text, setText] = useState("");
    const [idNote, setIdNote] = useState("");

    const addNote = () => {
        const newNote = {
            id: id(),
            text: text
        };
        setNotes([...notes, newNote]);
        setText("");
    }

    const editNote = (id) => {
        notes.map((note) => {
            if (note.id === id) {
                setIdNote(id);
                setText(note.text);
            }})
        }

    const saveNote = (id) => () => {
        const updatedNotes = notes.map((note) => {
            if (note.id === id) {
                return { ...note, text: text };
            }
            return note;
        });
        setNotes(updatedNotes);
        setIdNote("");
        setText("");
    }


    return (
        
        <div className="notes-block">
            <Notes notes={notes} editNote={editNote}/>
            <textarea value={text} onChange={(e)=>{setText(e.target.value)}}></textarea>
            <button onClick={ idNote ? saveNote(idNote) : addNote}>
                { idNote ? "Edit Note" : "Add Note" }
            </button>
        </div>
    );
}

export default BlockNotes;