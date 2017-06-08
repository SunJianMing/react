import React from 'react';
import MobileHeader from './mobile_header'
import MobileFooter from './mobile_footer'

import MobileList from './mobile_list'
import {Tabs,Carousel} from 'antd';
const TabPane = Tabs.TabPane;
export default class MobileIndex extends React.Component{
	render(){
		 const settings = {
		      dots:true,
		      autoplay:true,
		      speed:500,
		      slidesToShow:1,
		      infinite:true
		    }
		return (
				<div>
					<MobileHeader/>
					<Tabs>
						<TabPane tab='头条' key='1'>
							<div className='carousel'>
				                <Carousel {...settings}>
				                  <div><img src='./src/images/carousel_1.jpg'/></div>
				                  <div><img src='./src/images/carousel_2.jpg'/></div>
				                  <div><img src='./src/images/carousel_3.jpg'/></div>
				                  <div><img src='./src/images/carousel_4.jpg'/></div>
				                </Carousel>
				              </div>
							<MobileList type='top' count={20}/>
						</TabPane>
						<TabPane tab='社会' key='2'>
							<MobileList type='shehui' count={20}/>
						</TabPane>
						<TabPane tab='国内' key='3'>
							<MobileList type='guonei' count={20}/>
						</TabPane>
						<TabPane tab='国际' key='4'>
							<MobileList type='guoji' count={20}/>
						</TabPane>
						<TabPane tab='娱乐' key='5'>
							<MobileList type='yule' count={20}/>
						</TabPane>
					</Tabs>
					<MobileFooter/>

				</div>
			)
	}
}
