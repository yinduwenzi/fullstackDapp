const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
//const {interface,bytecode} = require('./compile');
const compileFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  'position derive fix girl joke situate black trick rival doll planet bike',
  'https://ropsten.infura.io/v3/ddd714e3ad984bdf8c6b73124d426e2f'
);
const web3 = new Web3(provider);

const deploy = async ()=>{
  //console.log(compileFactory.interface);
  const accounts = await web3.eth.getAccounts();
  //console.log('attemp to deploy',accounts[0]);
  //const result = await new web3.eth.Contract(JSON.parse(interface)).deploy({data:'0x'+bytecode,arguments:['mark']})
//  .send({from:accounts[0],gas:'1000000'});

  const result = await new web3.eth.Contract(JSON.parse(compileFactory.interface)).deploy({data:'0x'+compileFactory.bytecode})
  .send({from:accounts[0],gas:'1000000'});

  console.log('contract deployed to',result.options.address);
}

deploy();
