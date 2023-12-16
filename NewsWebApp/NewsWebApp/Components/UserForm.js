import { useRef, useState } from "react";

function UserForm(){

    const [name, setName] = useState('');
    const nameInputRef = useRef(null);

    function handleSubmit(event){
        event.preventDefault();
        alert(nameInputRef.current.value);
    }

    return (
         <form style={{padding: '20px',padding: '20px' }}> 
            <label>Name</label>
            {/* <input type="text" onChange={(event) => setName(event.target.value)}/> */}
            <input type="text" ref={nameInputRef}/>
            <button onClick={handleSubmit}>Submit</button>
         </form>
    );
}

export default UserForm;