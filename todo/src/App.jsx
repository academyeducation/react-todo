import { useState, useEffect, useRef } from "react";

import styles from "./App.module.css";

function App() {
    const [todos, setTodos] = useState([]);
    const [todoInput, setTodoInput] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        if (localStorage.getItem("todos")) {
            setTodos(JSON.parse(localStorage.getItem("todos")));
        }
        inputRef.current.focus();
    }, []);

    const handleInputChange = (e) => {
        setTodoInput(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            console.log("Enter key pressed");
            const newTodo = {
                id: todos.length + 1,
                title: todoInput,
                checked: false,
            };

            setTodos([newTodo, ...todos]);
            localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
            setTodoInput("");
        }
    };

    const handleCheckboxChange = (id) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    checked: !todo.checked,
                };
            }
            return todo;
        });
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    };

    const handleDelete = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    };

    const handleUp = (id) => {
        const index = todos.findIndex((todo) => todo.id === id);
        if (index === 0) {
            return;
        }
        const updatedTodos = [...todos];
        const temp = updatedTodos[index];
        updatedTodos[index] = updatedTodos[index - 1];
        updatedTodos[index - 1] = temp;
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    };

    const handleDown = (id) => {
        const index = todos.findIndex((todo) => todo.id === id);
        if (index === todos.length - 1) {
            return;
        }
        const updatedTodos = [...todos];
        const temp = updatedTodos[index];
        updatedTodos[index] = updatedTodos[index + 1];
        updatedTodos[index + 1] = temp;
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    };

    return (
        <>
            <main className={styles.mainContainer}>
                <input
                    className={styles.todoInput}
                    ref={inputRef}
                    type="text"
                    placeholder="Todo list..."
                    value={todoInput}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                <div className={styles.scrollContainer}>
                    {todos.map((todo, index) => (
                        <div
                            key={index}
                            className={todo.checked ? `${styles.todoItemChecked} ${styles.todoItem}` : styles.todoItem}
                        >
                            <input
                                type="checkbox"
                                checked={todo.checked}
                                onChange={() => handleCheckboxChange(todo.id)}
                            />
                            {todo.title}
                            <button className={styles.button} onClick={() => handleUp(todo.id)}>{`<`}</button>
                            <button className={styles.button} onClick={() => handleDown(todo.id)}>{`>`}</button>
                            <button className={styles.button} onClick={() => handleDelete(todo.id)}>
                                X
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}

export default App;
