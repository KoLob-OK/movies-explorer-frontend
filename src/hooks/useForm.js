import { useState, useCallback, useContext } from 'react';

import CurrentUserContext from '../context/CurrentUserContext';

const useForm = () => {
    const [enteredValues, setEnteredValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const currentUser = useContext(CurrentUserContext);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setEnteredValues({
            ...enteredValues,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: e.target.validationMessage,
        });

        // 1 вариант - сравнение введенных данных с текущим пользователем
        if (value !== currentUser.name && value !== currentUser.email) {
            setIsFormValid(e.target.closest(".form").checkValidity());
        } else {
            setIsFormValid(false);
        }
        // setIsFormValid(e.target.closest(".form").checkValidity());
    };

    // 2 вариант - создание отдельных обработчиков для полей name и email:
/*    const handleNameChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setEnteredValues({
            ...enteredValues,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: e.target.validationMessage,
        });

        if (value !== currentUser.name) {
            setIsFormValid(e.target.closest(".form").checkValidity());
        } else {
            setIsFormValid(false);
        }
    };*/

/*    const handleEmailChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setEnteredValues({
            ...enteredValues,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: e.target.validationMessage,
        });

        if (value !== currentUser.email) {
            setIsFormValid(e.target.closest(".form").checkValidity());
        } else {
            setIsFormValid(false);
        }
    };*/

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsFormValid = false) => {
            setEnteredValues(newValues);
            setErrors(newErrors);
            setIsFormValid(newIsFormValid);
        },
        [setEnteredValues, setErrors, setIsFormValid]
    );

    return {
        enteredValues,
        errors,
        handleChange,
        // handleNameChange,
        // handleEmailChange,
        isFormValid,
        resetForm,
    };
};

export default useForm;
