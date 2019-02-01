import React from 'react';
import Layout from '../../components/layout';
import Campaign from '../../ethernum/campaign';
import {Card,Grid,Button} from 'semantic-ui-react';
import web3 from '../../ethernum/web3';
import ContributeFrom from '../../components/contributeForm';
import {Link} from '../../routes'

class CompaignShow extends React.Component{


  static async getInitialProps(props){
     //console.log(props.query.address);
     const campaign = Campaign(props.query.address);
     const sumary =   await campaign.methods.getSumary().call();
     //console.log(sumary);
     return {
       address:props.query.address,
       mininumContribute:sumary[0],
       balance:sumary[1],
       requestCount:sumary[2],
       approvalCount:sumary[3],
       manager:sumary[4]
     };
  }

  renderCards(){
    const{
      address,
      mininumContribute,
      balance,
      requestCount,
      approvalCount,
      manager
    }=this.props;
    const items =[
      {
        header:manager,
        meta:'管理者地址'，
        description:'当前管理者创建了众筹，并且是众筹的受益人',
        style:{overflowWrap:'break-word'}
      },
      {
        header:mininumContribute,
        meta:'最小贡献量'，
        description:'投资的最小贡献量',
        style:{overflowWrap:'break-word'}
      },
      {
        header:requestCount,
        meta:'请求数量'，
        description:'当前管理者的创建请求从合约中提钱，必须要大于50%的投资人同意',
        style:{overflowWrap:'break-word'}
      },
      {
        header:approvalCount,
        meta:'投资人数量'，
        description:'已经为众筹投资的投资人数量',
        style:{overflowWrap:'break-word'}
      },
      {
        header:web3.utils.fromWei(balance,'ether'),
        meta:'众筹合约金额(ether)'，
        description:'当前众筹中，还剩下的金额',
        style:{overflowWrap:'break-word'}
      }
    ];
    return <Card.Grop items={items}/>
  }

  render(){
    //const sumary = this.props.sumary;


    //console.log(address);
    //console.log(mininumContribute);
    return (
      <Layout>
        <h1>众筹显示</h1>
        <Grid>
         <Grid.Row>
          <Grid.Column width={10}>
            {this.renderCards()}

          </Grid.Column>
          <Grid.Column width={6}>
            <ContributeFrom address={this.props.address}/>
          </Grid.Column>
          </Grid.Row>

          <Grid.Row>
           <Grid.Column>
              <Link route={`/compaigns/${this.props.address/requests}`}>
              <a>
              <Button primary>查看请求</Button>
              </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Gird>
        //{this.renderCards()}
        //<ContributeFrom/>
      </Layout>
    )


  }
}


export default CompaignShow;
