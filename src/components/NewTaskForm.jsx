import { useState } from 'react';


const NewTaskForm = ({ handleSubmit }) => {

    // const [name, setName] = useState('');
    const kDefaultFormState = {
        title:'',
        description:'',
    };

    const [formData, setFormData] = useState(kDefaultFormState);

    const handleChange = event => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        const newFormData = {...formData, [fieldName]: fieldValue};
        setFormData(newFormData);
    };


    const onHandleSubmit = (event) => {
        handleSubmit(formData);
        setFormData(kDefaultFormState);
        // event.preventDefault();
        // const newTask ={
        //     title,
        //     description:'',
        //     // is_complete: false,
        // };
        // handleSubmit(newTask);
        // setName('');
    };


    return(
        <form onSubmit = {onHandleSubmit}>
            <div>
                <label htmlFor = "title">Task Title: </label>
                <input type="text" id="title" name="title" value = {formData.title} onChange ={handleChange} />
            </div>
            <div>
                <label htmlFor = "description">Task Description: </label>
                <input type="description" id = "description" name="description" value = {formData.description} onChange ={handleChange} />
            </div>
            <div>
                <input type="submit" value="Add a task" />
            </div>
         </form>
    );
};

export default NewTaskForm;