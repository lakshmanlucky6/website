import React from 'react'

export default function AddArticle() {

  return (
    <div className='display-3 text-center text-secondary'>
        <p className='w-50'>Add New Article</p>
        <form>
            <div className='mb-3'>
                <label></label>
                <input></input>
            </div>
            <div className='mb-3'>
                <label htmlFor='category'>Select a category</label>
                <select id='category'>

                </select>
            </div>
            <div>
                <label htmlFor='content' className='form-label' >Content</label>
                <textarea></textarea>
            </div>
        </form>
    </div>
  )
}
