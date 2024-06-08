import React from "react";
import { useLocalStorage } from './useLocalStorage';

const TodoContext = React.createContext();

function TodoProvider({children}){
    const {
        item: todos, 
        saveItem: saveTodos,
        loading,
        error,
      } = useLocalStorage('TODOS_V1', []);
      const [searchValue, setSearchValue] = React.useState('');

      const [openModal, setOpenModal] = React.useState(false);
    
      const completedTodos = todos.filter(
        todo => !!todo.completed).length;
    
      const totalTodos = todos.length;
    
      const searchedTodos = todos.filter(
        (todo) => {
          const todoText = todo.text.toLowerCase();
          const searchText = searchValue.toLowerCase();
          //return todo.text.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
          return todoText.includes(searchText);
        }
      );
    
      // console.log('Los usuarios buscan todos de: '+ searchValue);

      const addTodo = (text) => {
        const newTodos = [...todos];
        newTodos.push({
          completed: false,
          text,
        });
        saveTodos(newTodos);
      };
    
      
      const completeTodo = (text) => {
        const newTodos = [...todos]; // crear copia del array
        const todoIndex = newTodos.findIndex(
          (todo) => todo.text === text // buscar el indice del todo que se quiere completar
        );
        newTodos[todoIndex].completed = true;
        saveTodos(newTodos);
      };
    
      const deleteTodo = (text) => {
        const newTodos = [...todos]; // crear copia del array
        const todoIndex = newTodos.findIndex(
          (todo) => todo.text === text // buscar el indice del todo que se quiere completar
        );
        newTodos.splice(todoIndex, 1); // eliminar un todo del array
        saveTodos(newTodos);
      };

      


    return(
        <TodoContext.Provider value={{
            loading,
            error,
            completedTodos,
            totalTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            completeTodo,
            deleteTodo,
            openModal,
            setOpenModal,
            addTodo,
        }}>
            {children}
        </TodoContext.Provider>
    );

}



export { TodoContext, TodoProvider };