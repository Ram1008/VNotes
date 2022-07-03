import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext"

const AddNote = () => {
    const context = useContext(noteContext);
    const {notes, addNote } = context;
    const [note, setNote] = useState({title: "",description: "",tag: ""});
    const handleClick =(e)=>{
        // isse page reload ni 
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote ({title: "",description: "",tag: ""})
    }

    const onChange =(e)=>{
        // niche k syntax ka mtlb h ki jo note me h vo to rahe lekin jo bhi value over write ho rhi h vo uske name k carrosponding aa jae jaise title aaya to title: value(jo bhi likha gaya h)
        setNote ({...note, [e.target.name]: e.target.value})
    }

  return (
    <div  className="container my-3"><h3 className="container my-3 " style={{align: 'center'}} >
    Add a Note
  </h3>
  <form>
    <div className="mb-3">
      <label htmlFor="title" className="form-label" >Title</label>
      <input type="text" className="form-control" id="title" name = 'title' value={note.title} onChange={onChange} aria-describedby="emailHelp"/>
       
    </div>
    <div className="mb-3">
      <label htmlFor="tag" className="form-label">Tag</label>
      <input type="text" className="form-control" id="tag" value={note.tag} onChange={onChange} name='tag' aria-describedby="emailHelp"/>
       
    </div>
    <div className="mb-3">
      <label htmlFor="description" className="form-label">Description</label>
      <input type="text" className="form-control" name='description' value={note.description} onChange={onChange} id="description"/>
    </div>
    
    <button type="submit" disabled = {note.title.length <3 || note.description.length <1} className="btn btn-primary" onClick={handleClick}>Add Note</button>
  </form>
  </div>
  )
  }

export default AddNote;