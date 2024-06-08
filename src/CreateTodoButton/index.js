import './CreateTodoButton.css';


function CreateTodoButton({ setOpenModal}){
    return (
      <button className='CreateTodoButton' 
      onClick={
          () => 
            setOpenModal(state => !state)  // Cambia el estado de setOpenModal
      }
      >+</button>
    )
}

export { CreateTodoButton };