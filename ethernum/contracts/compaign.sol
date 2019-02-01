pragma solidity ^0.4.24;

contract CampaignFactory{
  address[] public deployedCampain;
  function createCampain(uint mininum) public {
    address newCampain = new Campaign(mininum,msg.sender);
    deployedCampain.push(newCampain);
  }

  function getDeployedCampain() public view returns(address[]){
    return deployedCampain;
  }
}


contract Campaign{
  struct Request{
    string description;//描述
    uint value;//申请总金额
    address recipients;//受益人地址
    bool compelte;//是否完成
    uint approvCount;//同意请求的投资人总数
    mapping(address=>bool) approvers;//投资人的意见
  }

  Request[] public requests;//存储请求
  address public manager;//管理者地址
  uint public mininumContribute;//最小贡献量
  mapping(address=>bool) public approvers;//存储投资人
  uint public approversCount;//投资人数量

  modifier restricted{
    require(msg.sender == manager);
    _;
  }
  constructor(uint _mininum,address _address) public{
    manager = _address;
    mininumContribute = _mininum;
  }

  function contribute() public payable{//投资人投资
    require(msg.value>mininumContribute);
    approvers[msg.sender] = true;
    approversCount++;
  }
  function createRequest(string _description,uint _value,address _address)
                                    restricted public{//投资人创建一个请求
    Request memory newrequest = Request({
      description:_description,
      value:_value,
      recipients:_address,
      compelte:false,
      approvCount:0
      });
      requests.push(newrequest);
  }

  function approvelRequst(uint index) public{//投资人是否支持请求
    Request storage request = requests[index];
    require(approvers[msg.sender]);
    require(!request.approvers[msg.sender]);
    request.approvers[msg.sender] = true;
    request.approvCount++;
  }

  function finalizeRequest(uint index) public restricted payable{//请求是否成功
    Request storage request = requests[index];
    require(request.approvCount > approversCount /2);
    request.recipients.transfer(request.value);
    request.compelte = true;
  }

  function getSumary() public view returns(uint,uint,uint,uint,address){
    return (mininumContribute,address(this).balance,requests.length,approversCount,manager);
  }

  function getRequestCount() public view returns(uint){
    return requests.length;
  }

}
