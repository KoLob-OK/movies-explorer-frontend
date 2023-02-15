const regExEmail = '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\' +
    '.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([\\-a-zA-Z0-9]+\\.)+[a-zA-Z]{2,}))$';
// Расшифровка регулярки почты:
/* ^(
      (
        [^<>()[\]\\.,;:\s@"]+          - один или более символ, кроме указанных
            (\. - точка
            [^<>()[\]\\.,;:\s@"]+      - один или более символ, кроме указанных
                )
                *                      - ноль или более
                )
                |                      - ИЛИ
                (".+")                 - один или более символ в двойных кавычках
                )
                @                      - символ `@`
                (
                (
                \[                     - открывающая квадратная скобка
                [0-9]{1,3}             - от 1 до 3 цифр
                \.                     - точка
                [0-9]{1,3}
                \.
                [0-9]{1,3}
                \.
                [0-9]{1,3}
                \]                      - закрывающая квадратная скобка
                )
                |                       - ИЛИ
                (
                (
                [\-a-zA-Z0-9]+          - символ `-`, одна или более буква латиницы, цифра
                \.                      - точка
                )+                      - один или более
                [a-zA-Z]{2,}            - хотя бы `2` буквы латиницы
                )
                ) */

const regExPassword = '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-#!$@%^&*_+~=:;?\\/])[-\\w#!$@%^&*+~=:;?\\/]{6,}$';
// Расшифровка регулярки почты:
/* {6,}                        - от 6 символов
   {6,20}                      - от 6 до 20 символов
   (?=.*\d)                    - минимум одна цифра
   (?=.*[a-z])                 - минимум одна буква в нижнем регистре
   (?=.*[A-Z])                 - минимум одна буква в верхнем регистре
   (?=.*[-#!$@%^&*_+~=:;?])    - минимум один символ из набора */

const MOVIES_BASE_URL = 'https://api.nomoreparties.co';

export {
    regExEmail,
    regExPassword,
    MOVIES_BASE_URL,
};
