import React,{Component} from 'react';
import {Button,Table} from 'semantic-ui-react';
import {Link} from '../../../routes';
import Layout from '../../../compaigns/layout';
import Campaign from '../../../ethernum/campaign';
import {RequestRow} from '../../../components/RequestRow';

class CompaignRequest extends Component{

  static async getInitProps(props){
    const {address} = props.query;

    const campaign = Campaign(address);
    const requestCount = campaign.methods.getRequestCount().call();
    const  approversCount = campaign.methods.approversCount();
    //疯狂js代码
    const requests = await Promise.all(
      Array(requestCount).fill().map((element,index)=>{
        return campaign.methods.requests(index).call();
      })
    )
    //console.log(requests);
    return {address,requests,approversCount};
  }

  renderRow(){
    return this.props.requests.map((request,index)=>{
      return(
         <RequestRow
            key={index}
            id = {index}
            request={request}
            address={this.props.address}>
            approversCount={this.props.approversCount}
         </RequestRow>
      );
    });
  }

  render(){
    return (

    <Layout>
    <h1>请求列表</h1>
    <Link route={`/compaigns/${this.props.address}/requests/new`}>
      <a>
      <Button primary>增加请求</Button>
      </a>
    </Link>

      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>id</Table.HeaderCell>
            <Table.HeaderCell>描述</Table.HeaderCell>
            <Table.HeaderCell>总的金额</Table.HeaderCell>
            <Table.HeaderCell>受益人地址</Table.HeaderCell>
            <Table.HeaderCell>同意的数量</Table.HeaderCell>
            <Table.HeaderCell>是否同意</Table.HeaderCell>
            <Table.HeaderCell>是否完成</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          { renderRow()}
        </Table.Body>
        </Table>
    </Layout>

    );
  }
}

export default CompaignRequest;
