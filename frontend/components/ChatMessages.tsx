import { Heading } from '@radix-ui/themes'
import React from 'react'

function ChatMessages() {
  const placeHolderMsg = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32."
  const chatHistory = []
  if (chatHistory.length === 0) {
    return (
       <div className='w-[50%] h-[90dvh] mx-auto fixed top-0 left-0 right-0' style={{outline: "1px solid red"}}>
            <div className='text-center pt-4 mb-auto'>
                <Heading>Chatbot</Heading>
            </div>
            <p className='p-4 rounded-md border-1 border-slate-500'>
                {placeHolderMsg}
            </p>
            
        </div>
    )
  }
}

export default ChatMessages