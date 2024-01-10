import React, {useEffect} from "react";
import {useNavigate} from 'react-router-dom'

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useDispatch } from 'react-redux';
import { registerUser } from '../React-Redux/Reg-Login-Logout/actions';

const Register = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Вызываем асинхронный action creator, который отправит запрос на сервер
      await dispatch(registerUser(values));
  
      // После успешной регистрации переходим на страницу LogIn
      navigate("/login");
  
      // Ваши остальные действия, если нужны
    } catch (error) {
      // Обработка ошибок, если что-то пошло не так
      console.error("Error during registration:", error.message);
    } finally {
      // В любом случае, даже при ошибке, устанавливаем setSubmitting(false)
      setSubmitting(false);
    }
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
