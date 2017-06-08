import React from 'react';

import {Menu,Icon,Modal,Tabs,Form,Input,Button,Message} from 'antd';

import {HashRouter,Route,Link} from 'react-router-dom';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
 class MoblieHeader  extends React.Component{
	constructor(){
		super();
		this.state = {
			current:'top',
			modalVisible : false,
			action:'login',
			hasLogined:false,
			userNickName:'',
			userid:0
		}
	}
	componentWillMount(){
		if(localStorage.userid!=''){
			this.setState({
				hasLogined:true,
				userNickName:localStorage.userNickName,
				userid:localStorage.userid
			})
		}
	}
	login(){
		this.setModalVisible(true)
	}

	setModalVisible(value){
		this.setState({
			modalVisible:value
		})
	}
	handleClickSubmit(e){
		e.preventDefault();
		var myFetchOptions = {
			method:'GET'
		}
		var formData = this.props.form.getFieldsValue();
		

		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action+"&username="+formData.userName+"&password="+formData.password+"&r_userName="+formData.r_userName+"&r_password="+formData.r_password+"&r_confirmPassword="+formData.r_confirmPassword,myFetchOptions).
		then(response=>response.json())
		.then(json=>{
			this.setState({
				userNickName:json.NickUserName,
				userid:json.UserId
			})
			localStorage.userid = json.UserId;
			localStorage.userNickName = json.NickUserName;
		})

		if(this.state.action == 'login'){
			this.setState({hasLogined:true})
			
		}
		Message.success('请求成功')
		this.setModalVisible(false)

	}
	callback(key){
		if(key == '1'){
			this.setState({action:'login'})
		}else if(key == '2'){
			this.setState({'action':'register'})
		}
	}
	render(){
		let {getFieldProps} = this.props.form;
		const userShow = this.state.hasLogined ?
			<HashRouter>
				<Link target="_self" to={`/usercenter`}>
					<Icon type='inbox'/>
				</Link>
			</HashRouter>
			:
			 <Icon type='setting' onClick={this.login.bind(this)}/>
			 ;
		return (
				<div id='mobileheader'>
					<header>
						<a href='/'>
							<img src='./src/images/logo.png'/>
						</a>
						<span>ReactNews</span>
						{userShow}
					</header>
						<Modal title='用户中心' visible={this.state.modalVisible} onOk={()=>this.setModalVisible(false)} onCancel={()=>this.setModalVisible(false)}  okText='关闭'>
							<Tabs type='card' onChange={this.callback.bind(this)}>
								<TabPane tab='登录' key='1'>
									<Form onSubmit={this.handleClickSubmit.bind(this)}>
										<FormItem lbael='账号'>
											<Input placeholder='请输入您的账号' {...getFieldProps('userName')}/>
										</FormItem>
										<FormItem lbael='密码'>
											<Input type='password' placeholder='请输入您的密码' {...getFieldProps('password')}/>
										</FormItem>
										<Button type='primary' htmlType='submit'>登录</Button>
									</Form>
								</TabPane>
								<TabPane tab='注册' key='2'>
									<Form onSubmit={this.handleClickSubmit.bind(this)}>
										<FormItem label='账号'>
											<Input placeholder='请输入您的账号' {...getFieldProps('r_userName')}/>
										</FormItem>
										<FormItem label='密码'>
											<Input type='password' placeholder='请输入您的密码' {...getFieldProps('r_password')}/>
										</FormItem>
										<FormItem label='确认密码'>
											<Input type='password' placeholder='请确认您的账号' {...getFieldProps('r_confirmPassword')}/>
										</FormItem>
										<Button type='primary' htmlType='submit'>注册</Button>
									</Form>
								</TabPane>
							</Tabs>
						</Modal>

				</div>
			)
	}
}

export default  MoblieHeader = Form.create({})(MoblieHeader)