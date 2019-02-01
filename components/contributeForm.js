import React,{Component} from 'react';
import { Form,Input,Button,Message } from 'semantic-ui-react';
import Campaign from '../ethernum/campaign';
import web3 from '../../ethernum/web3';
import {Router} from '../routes';

class ContributeForm extends Component{

  state={
    value:'',
    errorMessage:'',
    loading:'false'

  };

 onSubmit = async ()=>{
   event.preventDefault();
   const campaign = Campaign(this.props.address);
   const accounts = await web3.eth.getAccounts();
   this.setState({loading:true});
   try{
     await campaign.methods.contribute().send({
       from:accounts[0],
       value:web3.utils.toWei(this.state.value,'ether')})
     }catch(error){
       this.setState({errorMessage:error.message});
     }
     Router.replaceRoute(`/compaigns/${this.props.address}`)
     this.setState({loading:false});
 }

  render(){
    return(
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
         <label>总的投资额度</label>
         <input
           value={this.state.value}
           onChange={event=>this.setState({value:event.target.value})}
           label="ether"
           labelPosition="right"
           />
        </Form.Field>
        <Message error header="错误提示" content={this.state.errorMessage}/>
        <Button primary loading={this.state.loading}>投资</Button>
      </Form>
    )
  }
}


export default contributeForm;
