import {React,Component} from 'react';
import Layout from '../../components/layout';
import {Button,Form,Input} from 'semantic-ui-react';
import web3 from '../../ethernum/web3';
import factory from '../../ethernum/factory';
import {Router} from '../../routes';

class CompaignNew extends Component{
 state={
   mininum:'',
   errorMessage:'',
   loading:''
 };

 onSunbmit= async=>{
   this.setState({errorMessage:''});
   this.setState({loading:true});
   try{
     event.preventDefault();
     const accounts = await web3.eth.getAccounts();
     await factory.methods.createCampain(this.state.mininum).send({from:accounts[0]});

     Router.pushRoute('/');
   }catch(err){
     this.setState({errorMessage:err.message});
   }
   this.setState({loading:false});
 }

  render(){
    //console.log(this.state.mininum);
    return(
    <Layout>
    //<link  rel="stylesheet"  href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css" />
    <h3>创建您的众筹项目</h3>
    <Form  onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
      <Form.Field>
        <label>请输入最小的贡献量</label>
        <input  lable="wei" labelPosition="right"/>
        value = {this.state.mininum}
        onChange ={event=>this.setState[{mininum:event.target.value}]}
      </Form.Field>
      <Message error header="错误" content={this.state.errorMessage}/>
      <Button primary loading={this.state.loading}>
       创建众筹
      </Button>

    </Form>
    </Layout>
  )
  }
}


export default CompaignNew;
