import { useState } from 'react';


const newTaskForm = () => {

    const [name, setName] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const onHandleSubmit = (event) => {
        event.preventDefault();
        const newTask ={
            name,
            description:'',
            is_complete: false,
        };
        handleSubmit(newTask);
        setName('');
    };


    return(
        <form onsubmit = {onHandleSubmit}>
            <label htmlFor = "name">Task Name: </label>
            <input type="text" id = "name" name = "name" value = {name} onChange ={handleNameChange} />
            <div>
                <input type="submit" value="Add a task" />
            </div>
         </form>
    );
};

export default newTaskForm;