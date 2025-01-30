import { GlobalProvider } from './context/GlobalProvider'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { Main } from './components/Main/Main'
import './styles/Responsive.css'
import './styles/App.css'

export function App() {
	return (
		<div className="App">
			<div className="wrapContainer">
				<GlobalProvider>
					<Header />
					<Main />
				</GlobalProvider>
			</div>
			<Footer />
		</div>
	)
}
