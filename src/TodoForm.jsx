import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';

const TodoForm = () => {
    const [tasks, setTasks] = useState([]);

    // Зчитуємо збережені задачі з локального сховища при завантаженні компонента
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(savedTasks);
    }, []);

    const addTask = (task) => {
        const newTasks = [...tasks, task];
        setTasks(newTasks);
        // Зберігаємо задачі в локальне сховище при додаванні нової задачі
        localStorage.setItem('tasks', JSON.stringify(newTasks));
    };

    const removeTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
        // Зберігаємо задачі в локальне сховище при видаленні задачі
        localStorage.setItem('tasks', JSON.stringify(newTasks));
    };

    const onSubmit = (values, form) => {
        addTask(values.task);
        form.reset();
    };

    const validate = (values) => {
        const errors = {};
        if (!values.task || values.task.trim().length < 5) {
            errors.task = 'Мінімальна довжина поля - 5 символів';
        }
        return errors;
    };

    return (
        <div>
            <Form onSubmit={onSubmit} validate={validate}>
                {({ handleSubmit, form, submitting }) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Завдання:</label>
                            <Field name="task" validate={(value) => (value && value.length < 5 ? 'Мінімальна довжина поля - 5 символів' : undefined)}>
                                {({ input, meta }) => (
                                    <div>
                                        <input {...input} type="text" placeholder="Введіть нове завдання" />
                                        {meta.touched && meta.error && <span style={{ color: 'red' }}>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div>
                            <button type="submit" disabled={submitting}>
                                Додати завдання
                            </button>
                        </div>
                    </form>
                )}
            </Form>

            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <span>{task}</span>
                        <button onClick={() => removeTask(index)}>Видалити</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoForm;
