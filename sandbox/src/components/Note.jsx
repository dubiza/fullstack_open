const Note = ({ note }) => {
    console.log("Note props: ", note);
    return (
      <li>{note}</li>
    )
  }
  
  export default Note