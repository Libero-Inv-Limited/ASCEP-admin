import React from 'react'

interface RequestResponseItemProp {
  response: DialogueRequestResponse;
}

const RequestResponseItem: React.FC<RequestResponseItemProp> = ({ response }) => {

  const dateCreated = new Date(response?.response_date).getDate();
  const monthCreated = new Date(response?.response_date).getMonth() + 1;
  const yearCreated = new Date(response?.response_date).getFullYear();

  return (
    <div className='border-blue-800 border-2 rounded-lg bg-white'>
      <div className='border-b-blue-800 border-b-2 p-2'>
        <span className='font-semibold text-primary'>{response?.user.firstname} {response?.user.lastname}</span> responded on <span className='font-semibold'>{dateCreated}/{monthCreated}/{yearCreated}</span>
      </div>
      <div className='p-2'>
        {response?.response_text}
      </div>
    </div>
  )
}

export default RequestResponseItem