import React from "react";
import { useNavigate } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import { registerUser } from "../RTK/registerSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const resultAction = await dispatch(registerUser(values));

      // Убедимся, что действие выполнено успешно
      if (registerUser.fulfilled.match(resultAction)) {
        navigate("/login");
      } else {
        // Обработка случая, если регистрация не удалась
        const error = resultAction.payload?.error || "Unknown error";
        console.error("Registration failed:", error);

        // Выведем подробности ошибки в консоль
        if (resultAction.error) {
          console.error("Error details:", resultAction.error);
        }
      }
    } catch (error) {
      // Обработка других ошибок
      console.error("Error during registration:", error.message);
    }

    setSubmitting(false);
  };

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
              <button
                type="submit"
                disabled={isSubmitting}
                className="add-button-style"
              >
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
