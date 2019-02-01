import React,{Component} from 'react';
import factory from '../ethernum/factory';
import {Card,Button} from 'semantic-ui-react';
import Layout from '../components/layout';
import {Link} from '../routes';
// export default ()=>{
//   return <h1>show mark</h1>
// }

class Compaindex extends Component{
  // async componentDidMount(){
  //   const compain = await factory.methods.getDeployedCampain().call();
  //   console.log(compain);
  // }

  static async getInitialProps(){
     const compain = await factory.methods.getDeployedCampain().call();
     return {compain};
  }

  renderCampaign(){
    const items = this.props.compain.map(address=>{
      return{
        header:address,
        description:<Link route={`/comaigns/${address}`}><a>查看众筹</a></Link>,
        fluid:true

      }
    });
    return <Card.Group centered items={items} />;
  }

  render(){
    //return <div>hello index</div>
    //return <div>{this.props.compain[0]}</div>

    return (
      <Layout>
      <div>
      <h3>众筹列表</h3>

      <Link route="/compaigns/new">
      <a>
      <Button floated='right' content='创建众筹'  icon='add' labelPosition='left'/>
      </a>
      </Link>
      {this.renderCampaign()}
      </div>
      </Layout>
    );
  }

}

export default Compaindex;
