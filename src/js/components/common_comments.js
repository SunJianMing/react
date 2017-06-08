import React from 'react';

import {Row,Col,Form,Input,Button,Card,Notification,Message} from 'antd';

const FormItem = Form.Item;

class CommonComments extends React.Component{
	constructor(){
		super();
		this.state = {comments:''}
	}
	componentDidMount(){
		var myFetchOptions = {
			method:'GET'
		}
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey="+this.props.uniquekey,myFetchOptions)
		.then(response=>response.json())
		.then(json=>this.setState({comments:json}))
	}
	bandleSubmit(e){
		e.preventDefault();
		var myFetchOptions = {
			method: 'GET'
		};
		var formdata = this.props.form.getFieldsValue();
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey + "&commnet=" + formdata.remark, myFetchOptions).then(response => response.json()).then(json => {
			this.componentDidMount();
		})
		formdata.remark = ''
	};
	addUserCollecting(){
		var myFetchOptions = {
			method:"GET"
		}
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid="+localStorage.userid + "&uniquekey="+this.props.uniquekey,myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			Notification['success']({message:'ReactNews的提醒',description:'收藏该文章成功',duration:3})
		})
	};
	render(){
		let {getFieldProps} = this.props.form;
		const {comments} = this.state;
		
		const commentsList = comments.length ?
			comments.map((commentsItem,index)=>(
					<Card key={index} title={commentsItem.UserName} extra={<a href="#">发布于 {commentsItem.datetime}</a>}>
						<p>{commentsItem.Comments}</p>
					</Card>
				))
		 :'暂无评论';
		return (
				<div className='comments'>
					<Row>
						<Col span={24}>
							{commentsList}
							<Form onSubmit={this.bandleSubmit.bind(this)}>
								<FormItem label='您的评论'>
									<Input type="textarea" id="myInput"	placeholder='随便写' {...getFieldProps('remark',{initialValue: ''})} />
								</FormItem>
								<Button type='primary' htmlType='submit'>提交评论</Button>
								&nbsp;&nbsp;
								<Button type='primary' htmlType='button' onClick={this.addUserCollecting.bind(this)}>收藏该文章</Button>
							</Form>
						</Col>
					</Row>
				</div>
			)
	}
}

export default CommonComments = Form.create({})(CommonComments)