import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import axios from 'axios';
import { AuthProvider, apiUrl } from "../AuthContext";

import Modal from './pages/Modal'; // Добавляем импорт компонента Modal (если у вас его нет, создайте)

import '../styles.css';

const userId = localStorage.getItem("user_id");
console.log("User ID:", userId);


const LogIn = () => {
  const [token, setToken] = useState("");
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        `${apiUrl}/auth/login`,
        {
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    
      console.log("Login response:", response);
    
      if (response.status === 200) {
        const token = response.data.token;
    
        window.localStorage.setItem("token", token);
        setToken(token);
    
        console.log("Registration successful:", JSON.stringify(values));
    
        if (token) {
          navigate("/tasklist");
        }
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data && error.response.data.message;
    
        if (errorMessage === "Такого пользователя нет!") {
          setShowRegistrationModal(true);
        } else {
          console.error("Login failed:", errorMessage);
        }
      } else {
        console.error("Unexpected error during login:", error);
      }
    } finally {
      if (setSubmitting) {
        setSubmitting(false);
      }
    }
  }    

  const handleModalClick = () => {
    setShowRegistrationModal(false);
    // Переход на страницу регистрации
    navigate("/register");
  };

  return (
    <>
      <AuthProvider token={token} userId={userId}>
        <Formik
          initialValues={{
            email: "",
            password: ""
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Некорректный формат email")
              .required("Email обязателен"),
            password: Yup.string()
              .min(8, "Минимальная длина пароля - 8 символов")
              .matches(
                /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
                "Пароль должен содержать хотя бы одну заглавную букву, одну цифру и один символ!"
              )
              .required("Пароль обязателен"),
          })}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="center-container">
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
              <div className="add-button-container">
                <button className="add-button-style" type="submit" disabled={isSubmitting}>
                  Войти
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </AuthProvider>

      {showRegistrationModal && (
        <Modal onClick={handleModalClick}>
          <p >Вы еще не зарегистрированы</p>
          <p >Нажмите здесь, чтобы перейти к регистрации.</p>
        </Modal>
      )}
    </>
  );
}

export default LogIn;
