import React, { useEffect, useState } from 'react';
//import Axios from 'axios';

// Components
import { Formik, Field, Form, ErrorMessage } from 'formik';

// Config
//import config from '../../../appconfig.json';

function LoginForm({ changeForm }) {
	const [emailLabel, setEmailLabel] = useState(null)
	const [passwordLabel, setPasswordLabel] = useState(null)

	useEffect(() => {
		setEmailLabel(document.getElementById('login-email-label'));
		setPasswordLabel(document.getElementById('login-password-label'));

	}, [])

	const [visiblePassword, setVisiblePassword] = useState(false);

	const marginTopField = { marginTop: "40px" };
	const heightForm = { height: "500px" };

	return (
		<Formik
			initialValues={{ email: '', password: '' }}
			validate={(values) => {
				const errors = {};
				if (values.email) {
					if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
						errors.email = 'Correo electrónico inválido';
					}
				} else {
					errors.email = 'Requerido';
				}

				if (!values.password) {
					errors.password = 'Requerido';
				}

				//? if errors is empty, the form is fine to submit
				const loginButton = document.getElementsByClassName('login-submit-btn')[0];
				if (Object.keys(errors).length === 0) {
					loginButton.classList.remove('login-submit-btn--disabled');
				} else {
					loginButton.classList.add('login-submit-btn--disabled');
				}

				return errors;
			}}
			onSubmit={(values, { setSubmitting }) => {
				setSubmitting(false);
				alert(JSON.stringify(values, null, 2));
				/* Axios.post(`http://${config.host}:${config.port}/login`, values).then((res) => {
					console.log();
				}); */
			}}
		>
			<Form className="login-form-content" style={heightForm}>
				<div>
					<h4 className="login-form-brand-text">Mino</h4>
					<div className="login-form-title">
						<h1>Ingresar</h1>
					</div></div>
				<div className="login-form-fields">
					<div className="login-form-field">
						<Field
							className="login-form-input"
							type="email"
							name="email"
							autoComplete="false"
							onInput={(e) => {
								e.target.value && emailLabel.classList.add('login-form-input-active');
								e.target.value = e.target.value.toLowerCase();
							}}
							onFocus={(e) => {
								console.log(emailLabel);
								emailLabel.classList.add('login-form-input-active');
								e.target.addEventListener('blur', () => {
									!e.target.value && emailLabel.classList.remove('login-form-input-active')
								});
							}}
						/>
						<label htmlFor="email" id="login-email-label">Email</label>
						<ErrorMessage className="input-error" name="email" component="div" />
					</div>
					<div className="login-form-field" style={marginTopField}>
						<Field
							className="login-form-input"
							type={visiblePassword ? "text" : "password"}
							name="password"
							onInput={(e) => {
								e.target.value && passwordLabel.classList.add('login-form-input-active')
							}}
							onFocus={() => {
								passwordLabel.classList.add('login-form-input-active')
							}}
							onBlur={(e) => {
								!e.target.value && passwordLabel.classList.remove('login-form-input-active')
							}}
						/>
						{visiblePassword ? (
							<svg onClick={() => setVisiblePassword(false)} className="eye-icon" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" color="#000"><title id="eyeIconTitle">Visible</title><path d="M22 12C22 12 19 18 12 18C5 18 2 12 2 12C2 12 5 6 12 6C19 6 22 12 22 12Z" /><circle cx="12" cy="12" r="3" /></svg>
						) : (
							<svg onClick={() => setVisiblePassword(true)} className="eye-icon" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" color="#000"> <title id="eyeClosedIconTitle">Oculto</title> <path d="M20 9C20 9 19.6797 9.66735 19 10.5144M12 14C10.392 14 9.04786 13.5878 7.94861 13M12 14C13.608 14 14.9521 13.5878 16.0514 13M12 14V17.5M4 9C4 9 4.35367 9.73682 5.10628 10.6448M7.94861 13L5 16M7.94861 13C6.6892 12.3266 5.75124 11.4228 5.10628 10.6448M16.0514 13L18.5 16M16.0514 13C17.3818 12.2887 18.3535 11.3202 19 10.5144M5.10628 10.6448L2 12M19 10.5144L22 12" /> </svg>
						)}
						<label htmlFor="password" id="login-password-label">Contraseña</label>
					</div>
					<div className="login-forgot-password" onClick={() => changeForm("RecoverPassword")}>¿Olvidaste tu contraseña?</div>
				</div>
				<div>
					<button className="login-submit-btn login-submit-btn--disabled" type="submit" >
						Continuar
					</button>
					<div className="login-register-btn">
						Aún no tenés una cuenta? <span onClick={() => changeForm("Register")}>Regístrate</span>
					</div>
				</div>
			</Form>
		</Formik>
	);
}

function RegisterForm({ changeForm }) {
	const [registerNameLabel, setRegisterNameLabel] = useState(null);
	const [registerSurnameLabel, setRegisterSurnameLabel] = useState(null);
	const [registerEmailLabel, setRegisterEmailLabel] = useState(null);
	const [registerPasswordLabel, setRegisterPasswordLabel] = useState(null);
	const [registerConfirmPasswordLabel, setRegisterConfirmPasswordLabel] = useState(null);

	const pswValMayusc = document.getElementById("password-validation-mayusc-bubble");
	const pswValNumber = document.getElementById("password-validation-number-bubble");
	const pswValSymbol = document.getElementById("password-validation-symbol-bubble");
	const pswValLength = document.getElementById("password-validation-length-bubble");

	const registerNameInput = document.getElementsByName('name')[0];
	const registerSurnameInput = document.getElementsByName('surname')[0];
	const registerEmailInput = document.getElementsByName('email')[0];
	const pswValMatch = document.getElementsByName('confirmPassword')[0];

	useEffect(() => {
		setRegisterNameLabel(document.getElementById('register-name-label'));
		setRegisterSurnameLabel(document.getElementById('register-surname-label'));
		setRegisterEmailLabel(document.getElementById('register-email-label'));
		setRegisterPasswordLabel(document.getElementById('register-password-label'));
		setRegisterConfirmPasswordLabel(document.getElementById('register-confirm-password-label'));
	}, [])

	const [visiblePassword, setVisiblePassword] = useState(false);

	const marginTopField = { marginTop: "30px" };
	const heightForm = { height: "620px" };

	return (
		<Formik
			initialValues={{ name: '', surname: '', email: '', password: '', confirmPassword: '' }}
			validate={(values) => {
				const errors = {};

				if (values.name) {
					if (values.name.length < 3) {
						errors.name = 'El nombre debe tener al menos 3 caracteres';
						registerNameInput.classList.add('login-form-field--error');
					} else if (values.name.length > 20) {
						errors.name = 'El nombre debe tener como máximo 20 caracteres';
						registerNameInput.classList.add('login-form-field--error');
					} else {
						registerNameInput.classList.remove('login-form-field--error');
					}
				} else {
					errors.name = 'Requerido';
				}

				if (values.surname) {
					if (values.surname.length < 3) {
						errors.surname = 'El nombre debe tener al menos 3 caracteres';
						registerSurnameInput.classList.add('login-form-field--error');
					} else if (values.surname.length > 20) {
						errors.surname = 'El nombre debe tener como máximo 20 caracteres';
						registerSurnameInput.classList.add('login-form-field--error');
					} else {
						registerSurnameInput.classList.remove('login-form-field--error');
					}
				} else {
					errors.surname = 'Requerido';
				}

				if (values.email) {
					if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
						registerEmailInput.classList.add('login-form-field--error');
						errors.email = 'Correo electrónico inválido';
					} else {
						registerEmailInput.classList.remove('login-form-field--error');
					}
				} else {
					errors.email = 'Requerido';
				}

				if (values.password) {
					//? Longitud mínima de 8 caracteres
					if (values.password.length >= 8) {
						pswValLength.classList.add('password-validation-bubble--active');
					} else {
						errors.password = 'La contraseña debe tener al menos 8 caracteres';
						pswValLength.classList.remove('password-validation-bubble--active');
					}
					//? Incluye al menos una mayúscula
					if (values.password.match(/[A-Z]/)) {
						pswValMayusc.classList.add('password-validation-bubble--active');
					} else {
						errors.password = 'La contraseña debe tener al menos una mayúscula';
						pswValMayusc.classList.remove('password-validation-bubble--active');
					}
					//? Incluye al menos un número
					if (values.password.match(/[0-9]/)) {
						pswValNumber.classList.add('password-validation-bubble--active');
					} else {
						errors.password = 'La contraseña debe tener al menos un número';
						pswValNumber.classList.remove('password-validation-bubble--active');
					}
					//? Incluye al menos un símbolo
					if (values.password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
						pswValSymbol.classList.add('password-validation-bubble--active');
					} else {
						errors.password = 'La contraseña debe tener al menos un símbolo';
						pswValSymbol.classList.remove('password-validation-bubble--active');
					}
				} else {
					pswValLength.classList.remove('password-validation-bubble--active');
					pswValMayusc.classList.remove('password-validation-bubble--active');
					pswValNumber.classList.remove('password-validation-bubble--active');
					pswValSymbol.classList.remove('password-validation-bubble--active');
					errors.password = 'Requerido';
				}

				if (values.confirmPassword) {
					if (values.confirmPassword !== values.password) {
						pswValMatch.classList.add('login-form-field--error');
						errors.confirmPassword = 'Las contraseñas no coinciden';
					} else {
						pswValMatch.classList.remove('login-form-field--error');
					}
				} else {
					errors.confirmPassword = 'Requerido';
				}

				//? if errors is empty, the form is fine to submit
				const loginButton = document.getElementsByClassName('login-submit-btn')[0];
				if (Object.keys(errors).length === 0) {
					loginButton.classList.remove('login-submit-btn--disabled');
				} else {
					loginButton.classList.add('login-submit-btn--disabled');
				}

				return errors;
			}}
			onSubmit={(values, { setSubmitting }) => {
				setSubmitting(false);
				alert(JSON.stringify(values, null, 2));
				/* Axios.post(`http://${config.host}:${config.port}/login`, values).then((res) => {
					console.log();
				}); */
			}}
		>
			<Form className="login-form-content" style={heightForm}>
				<div>
					<h4 className="login-form-brand-text">Mino</h4>
					<div className="login-form-title">
						<h1>Crear cuenta</h1>
					</div></div>
				<div className="login-form-fields">
					<div className="login-form-field">
						<Field
							className="login-form-input"
							type="text"
							name="name"
							onInput={(e) => {
								e.target.value && registerNameLabel.classList.add('login-form-input-active');
								e.target.value = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
							}}
							onFocus={(e) => {
								registerNameLabel.classList.add('login-form-input-active');
								e.target.addEventListener('blur', () => {
									!e.target.value && registerNameLabel.classList.remove('login-form-input-active')
								});
							}}
						/>
						<label htmlFor="name" id="register-name-label">Nombre</label>
					</div>
					<div className="login-form-field" style={marginTopField}>
						<Field
							className="login-form-input"
							type="text"
							name="surname"
							onInput={(e) => {
								e.target.value && registerSurnameLabel.classList.add('login-form-input-active');
								e.target.value = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
							}}
							onFocus={(e) => {
								registerSurnameLabel.classList.add('login-form-input-active');
								e.target.addEventListener('blur', () => {
									!e.target.value && registerSurnameLabel.classList.remove('login-form-input-active')
								});
							}}
						/>
						<label htmlFor="surname" id="register-surname-label">Apellido</label>
					</div>
					<div className="login-form-field" style={marginTopField}>
						<Field
							className="login-form-input"
							type="email"
							name="email"
							onInput={(e) => {
								e.target.value && registerEmailLabel.classList.add('login-form-input-active');
								e.target.value = e.target.value.toLowerCase();
							}}
							onFocus={(e) => {
								registerEmailLabel.classList.add('login-form-input-active');
								e.target.addEventListener('blur', () => {
									!e.target.value && registerEmailLabel.classList.remove('login-form-input-active')
								});
							}}
						/>
						<label htmlFor="email" id="register-email-label">Email</label>
						<ErrorMessage className="input-error" name="email" component="div" />
					</div>
					<div className="login-form-field" style={marginTopField}>
						<Field
							className="login-form-input"
							type={visiblePassword ? "text" : "password"}
							name="password"
							onInput={(e) => {
								e.target.value && registerPasswordLabel.classList.add('login-form-input-active')
							}}
							onFocus={() => {
								registerPasswordLabel.classList.add('login-form-input-active')
							}}
							onBlur={(e) => {
								!e.target.value && registerPasswordLabel.classList.remove('login-form-input-active')
							}}
						/>
						{visiblePassword ? (
							<svg onClick={() => setVisiblePassword(false)} className="eye-icon" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" color="#000"><title id="eyeIconTitle">Visible</title><path d="M22 12C22 12 19 18 12 18C5 18 2 12 2 12C2 12 5 6 12 6C19 6 22 12 22 12Z" /><circle cx="12" cy="12" r="3" /></svg>
						) : (
							<svg onClick={() => setVisiblePassword(true)} className="eye-icon" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" color="#000"> <title id="eyeClosedIconTitle">Oculto</title> <path d="M20 9C20 9 19.6797 9.66735 19 10.5144M12 14C10.392 14 9.04786 13.5878 7.94861 13M12 14C13.608 14 14.9521 13.5878 16.0514 13M12 14V17.5M4 9C4 9 4.35367 9.73682 5.10628 10.6448M7.94861 13L5 16M7.94861 13C6.6892 12.3266 5.75124 11.4228 5.10628 10.6448M16.0514 13L18.5 16M16.0514 13C17.3818 12.2887 18.3535 11.3202 19 10.5144M5.10628 10.6448L2 12M19 10.5144L22 12" /> </svg>
						)}
						<label htmlFor="password" id="register-password-label">Contraseña</label>
					</div>
					<div className="validation-bubbles-container">
						<div className="validation-bubble" id="password-validation-mayusc-bubble"><span>1 mayúscula</span></div>
						<div className="validation-bubble" id="password-validation-number-bubble"><span>1 número</span></div>
						<div className="validation-bubble" id="password-validation-symbol-bubble"><span>1 símbolo</span></div>
						<div className="validation-bubble" id="password-validation-length-bubble"><span>8 caracteres</span></div>
					</div>
					<div className="login-form-field" style={marginTopField}>
						<Field
							className="login-form-input"
							type={visiblePassword ? "text" : "password"}
							name="confirmPassword"
							onInput={(e) => {
								e.target.value && registerConfirmPasswordLabel.classList.add('login-form-input-active')
							}}
							onFocus={() => {
								registerConfirmPasswordLabel.classList.add('login-form-input-active')
							}}
							onBlur={(e) => {
								!e.target.value && registerConfirmPasswordLabel.classList.remove('login-form-input-active')
							}}
						/>
						<label htmlFor="confirmPassword" id="register-confirm-password-label">Confirmar contraseña</label>
						<ErrorMessage className="input-error" name="confirmPassword" component="div" />
					</div>
				</div>
				<div>
					<button className="login-submit-btn login-submit-btn--disabled" type="submit" >
						Empezar
					</button>
					<div className="login-register-btn">
						Ya tenés una cuenta? <span onClick={() => changeForm("Login")}>Iniciá Sesión</span>
					</div>
				</div>
			</Form>
		</Formik>
	);
}

export default function FormContainer() {
	const [formulario, setFormulario] = useState('Register');

	function changeForm(typeForm) {
		setFormulario(typeForm);
	}

	return (
		<>
			{formulario === 'Login' ? (
				<LoginForm changeForm={changeForm} />
			) : formulario === 'Register' ? (
				<RegisterForm changeForm={changeForm} />
			) : formulario === 'RecoverPassword' ? (
				//<RecoverPassword changeForm={changeForm} />
				null
			) : (
				formulario === 'ChangePassword' && null//<ChangePassword searchVars={location.search} />
			)}
		</>
	);
}
