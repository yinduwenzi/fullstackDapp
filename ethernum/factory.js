import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xCC1eFAb95487A14E2C5aeAdB1BF1e4653BB91b41'
)
export default instance;
