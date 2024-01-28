import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { apiUrl } from "../RTK/api";
import Modal from "./Pages/Modal";

import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  openModal,
  closeModal,
  setUserData,
} from "../RTK/authSlice";

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleModalClick = () => {
    console.log("закрывается");
    dispatch(closeModal());
    navigate("/register");
  };

  // Получаем значения из состояния Redux
  const isModalOpen = useSelector((state) => state.auth.isModalOpen);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Вызываем асинхронный action creator, который отправит запрос на сервер
      await dispatch(loginUser(values));

      // Получаем актуальный userId после успешной аутентификации
      const response = await axios.get(`${apiUrl}/users`);
      const allUsers = response.data;

      const desiredUser = allUsers.find(
        (user) => user.email.toLowerCase() === values.email.toLowerCase()
      );

      const userId = desiredUser.id;

      window.localStorage.setItem("userId", userId);
      dispatch(setUserData({ email: values.email, userId: userId }));
      console.log("User ID:", userId);
      navigate("/tasklist");
    } catch (error) {
      dispatch(openModal());

      console.error("Login failed:", error.message);
    } finally {
      // В любом случае, даже при ошибке, устанавливаем setSubmitting(false)
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* <AuthProvider token={token} userId={userId}> */}
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object().shape({
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
              <button
                className="add-button-style"
                type="submit"
                disabled={isSubmitting}
              >
                LogIn
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {/* </AuthProvider> */}

      {isModalOpen && (
        <Modal onClick={handleModalClick}>
          <p>Вы еще не зарегистрированы или были удалены.</p>
          <p>Нажмите здесь, чтобы перейти к регистрации.</p>
        </Modal>
      )}
    </>
  );
};

export default LogIn;
