import React from 'react'
import {useForm} from 'react-hook-form';
function FormDemo() {
    //states
    let {register, handleState, handleSubmit} = useForm();

    function onFormSubmit(userObj){
        console.log(userObj);
    }
  return (
    <div>
        <p>Sample Form</p>
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <div>
                <label htmlFor='username'>Name : </label>
                <input type='text' id='username' {...register('username')}/>
            </div>
            <div>
                <label htmlFor='email'>Email : </label>
                <input type='email' id='email' {...register('email')}/>
            </div>
            <button type='submit'>Submit </button>
        </form>
    </div>
  )
}

export default FormDemo;
