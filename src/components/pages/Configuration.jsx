import React, { useState } from 'react';

// Components
import { Helmet } from 'react-helmet-async';
//import { Routes, Route } from 'react-router-dom';
import Ajustes from '../common/SettingsView/Settings';
import Navbar from '../common/SettingsView/Navbar';
import Preferencias from '../common/SettingsView/Preferences';
import Cuenta from '../common/SettingsView/Account';

// Styles
import '../../css/configuration.css';

export default function Configuration() {
	const [configRoute, setConfigRoute] = useState('ajustes');

	const changeRoute = (spanButton) => {
		setConfigRoute(spanButton.textContent.toLowerCase());
		document.getElementById('config-navbar').childNodes.forEach((element) => {
			element.classList.remove('active');
		});
		spanButton.parentNode.classList.add('active');
	};

	return (
		<main>
			<Helmet>
				<title>Configuración</title>
				<meta name="description" content="Nested component" />
			</Helmet>
			<h1>Configuración</h1>
			<div className="row">
				<Navbar changeRoute={(e) => changeRoute(e)} />
				{configRoute === 'ajustes' && <Ajustes />}
				{configRoute === 'preferencias' && <Preferencias />}
				{configRoute === 'cuenta' && <Cuenta />}
			</div>
		</main>
	);
}
