import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router ,HashRouter,Route,Link,hashHistory} from 'react-router-dom';
import MediaQuery from 'react-responsive';

import PCIndex from './components/pc_index';
import PCNewsDetails from './components/pc_news_details';
import PCUserCenter from './components/pc_usercenter'

import MobileNewsDetails from './components/mobile_news_details';
import MobileIndex from './components/mobile_index';
import MobileUserCenter from './components/mobile_usercenter'
class Root extends React.Component{
	render(){

		return (<div>
				<MediaQuery query = '(min-device-width:1224px)'>
					<HashRouter history={hashHistory} >
						<div>
							<Route exact path='/' component={PCIndex}></Route>
							<Route path='/details/:uniquekey' component={PCNewsDetails}></Route>
							<Route path='/usercenter'  component={PCUserCenter}></Route>
						</div>
					</HashRouter>
				</MediaQuery>
				<MediaQuery query = '(max-device-width:1224px)'>
					<HashRouter history={hashHistory} >
						<div>
							<Route exact path='/' component={MobileIndex}></Route>
							<Route path='/details/:uniquekey'  component={MobileNewsDetails}></Route>
							<Route path='/usercenter'  component={MobileUserCenter} />

						</div>
					</HashRouter>
				</MediaQuery>
			</div>)
	}
}

ReactDOM.render(<Root/>,document.getElementById('app'))