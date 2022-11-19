import * as React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import routes from './utils/routes';

// import Footer from './components/Layout/Footer';

const theme = createTheme({
	palette: {
	  primary: {
		main: '#228B22',
	  },
	},
  });

class App extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {};
	}
	
	render() {
		return (
			<ThemeProvider theme={theme}>
				<Router>
					<div className="App">
						<Routes>
							{routes.map((route: any, index: number) => (
								<Route
									path={route.path}
									key={`route-key-${index}`}
									element={<route.component />}
								/>
							))}
						</Routes>
						{/* <Footer /> */}
					</div>
				</Router>
			</ThemeProvider>
		);
	}
}
		
export default App;
		