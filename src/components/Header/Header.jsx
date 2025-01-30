import { useHeaderLogic } from '../../hooks/useHeaderLogic'
import searchImg from '@assets/svg/searchImg.svg'
import './Header.css'

export function Header() {
	const { handleSubmit, handleChange } = useHeaderLogic()

	return (
		<header className="header">
			<img
				className="logo"
				src="./assets/images/UriWeatherWhite.png"
				alt="Logo Uri Weather"
			/>
			<form className="form" action="submit" onSubmit={handleSubmit}>
				<img className="searchIcon" src={searchImg} alt="buscar" />
				<input
					onChange={handleChange}
					className="formInput"
					type="text"
					placeholder="Ingrese una ciudad..."
				/>
				{<p className="inputError">{}</p>}
			</form>
		</header>
	)
}
