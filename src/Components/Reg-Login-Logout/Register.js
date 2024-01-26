import React, {useEffect} from "react";
import {useNavigate} from 'react-router-dom'

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import axios from "axios";
 import { apiUrl } from "../AuthContext";


const Register = () => {
  const navigate = useNavigate();
  
  console.log(apiUrl, "api");
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        `${apiUrl}/users/register`,
        {
          username: values.username,
          email: values.email,
          password: values.password,
          gender: values.gender,
          age: parseInt(values.age, 10),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        if (response.data && response.data.id) {
          // Регистрация успешна
          console.log("Registration successful:", response.data);

                  // Сохраняем user_id в localStorage
        localStorage.setItem("user_id", response.data.id);
      
          // Сохраняем данные в localStorage
          window.localStorage.setItem("user_data", JSON.stringify(values));

          console.log("Email:", values.email);
          console.log("Password:", values.password);
      
          // Переходим на страницу LogIn
          navigate("/login");
      
          // Ваши остальные действия с данными (например, отправка на сервер)
        } else {
          // Ошибка регистрации
          console.error("Registration failed:", response.data);
        }
      } else {
        // Обработка ошибок с кодом ответа, отличным от 200
        console.error("Error during registration. Status code:", response.status);
        // Выводим также содержимое ответа
        console.error("Response data:", response.data);
      }
      
    } catch (error) {
      // Ошибка запроса
      console.error("Error during registration:", error.message);
    }
  
    setSubmitting(false);
  };
  
  
  

  // Функция для проверки наличия данных в localStorage
  const isDataSaved = () => {
    return localStorage.getItem("user_data") !== null;
  };

  // Выполняется при загрузке компонента
  useEffect(() => {
    if (isDataSaved()) {
      // Если данные есть, вы можете сделать что-то дополнительное
      console.log("Данные уже сохранены в localStorage");
    } else {
      console.log("Данные не сохранены в localStorage");
    }
  }, []); // [] означает, что useEffect будет выполняться только при монтировании компонента

  return (
    <>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          age: "",
          gender: "",
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().required("Имя пользователя обязательно"),
          email: Yup.string()
            .email("Некорректный формат email")
            .required("Email обязателен"),
          password: Yup.string()
            .min(6, "Минимальная длина пароля - 6 символов")
            .matches(
              /[A-Z]/,
              "Пароль должен содержать хотя бы одну заглавную букву"
            )
            .required("Пароль обязателен"),
          age: Yup.string().required("Возраст обязателен"),
          gender: Yup.string().required("Пол обязателен"),
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="center-container">
            <div className="input-style">
              <Field
                type="text"
                name="username"
                className="inpt"
                placeholder="Имя пользователя"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="error-message"
              />
            </div>
            <div className="input-style">
              <Field
                type="email"
                name="email"
                className="inpt"
                placeholder="Email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>
            <div className="input-style">
              <Field
                type="password"
                name="password"
                className="inpt"
                placeholder="Пароль"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
            </div>
            <div className="input-style">
              <Field
                type="number"
                name="age"
                className="inpt"
                placeholder="Возраст"
              />
              <ErrorMessage
                name="age"
                component="div"
                className="error-message"
              />
            </div>
            <div className="input-style">
              <Field
                as="select"
                name="gender"
                className="inpt"
                placeholder="Выберите пол"
              >
                <option value="">Выберите пол</option>
                <option value="male">Мужской</option>
                <option value="female">Женский</option>
              </Field>
              <ErrorMessage
                name="gender"
                component="div"
                className="error-message"
              />
            </div>

            <div className="add-button-container">
              <button type="submit" disabled={isSubmitting} className="add-button-style">
                Зарегистрироваться
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

 export default Register;
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { registerData } from '../RTK-API/registerSlices';  // Импортируем асинхронное действие

// const Register = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const registrationStatus = useSelector((state) => state.register.status);

//   useEffect(() => {
//     // Вы можете добавить обработку статусов (например, успех, ошибка) здесь
//     if (registrationStatus === 'succeeded') {
//       navigate("/login");
//       console.log("Регистрация успешна!");
      
//       // Возможно, здесь нужно сделать какие-то дополнительные действия
//     } else if (registrationStatus === 'failed') {
//       console.error("Ошибка при регистрации!");
//       // Возможно, здесь нужно обработать ошибку или предоставить сообщение пользователю
//     }
//   }, [registrationStatus]);

//   const handleSubmit = (values, { setSubmitting }) => {
//     dispatch(registerData(values));  // Отправляем данные для регистрации через асинхронное действие
//     setSubmitting(false);
//   };

//   return (
//     <>
//       <Formik
//         initialValues={{
//           username: "",
//           email: "",
//           password: "",
//           age: "",
//           gender: "",
//         }}
//         validationSchema={Yup.object().shape({
//           username: Yup.string().required("Имя пользователя обязательно"),
//           email: Yup.string()
//             .email("Некорректный формат email")
//             .required("Email обязателен"),
//           password: Yup.string()
//             .min(6, "Минимальная длина пароля - 6 символов")
//             .matches(
//               /[A-Z]/,
//               "Пароль должен содержать хотя бы одну заглавную букву"
//             )
//             .required("Пароль обязателен"),
//           age: Yup.string().required("Возраст обязателен"),
//           gender: Yup.string().required("Пол обязателен"),
//         })}
//         onSubmit={handleSubmit}
//       >
//         {({ isSubmitting }) => (
//           <Form className="center-container">
//             {/* ... (оставшаяся часть кода) */}
//             <div className="add-button-container">
//               <button type="submit" disabled={isSubmitting} className="add-button-style">
//                 Зарегистрироваться
//               </button>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </>
//   );
// };

// export default Register;
