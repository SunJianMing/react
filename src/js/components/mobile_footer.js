import React from 'react';
import {Row,Col} from 'antd';
export default class MobileFooter extends React.Component{
	render(){
		return (
				<footer id='footer'>
					<Row>
						<Col span={2}></Col>
						<Col span={20} className='footerText'>
							&copy;&nbsp;2016 ReactNews. All Rights Reserved.
						</Col>
						<Col span={2}></Col>
					</Row>
				</footer>
			)
	}
}
