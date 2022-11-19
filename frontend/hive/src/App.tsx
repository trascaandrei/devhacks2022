import * as React from 'react';

import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import routes from './utils/routes';

// import Footer from './components/Layout/Footer';


class App extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {};
	}
	
	render() {
		return (
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
		);
	}
}
		
export default App;
		