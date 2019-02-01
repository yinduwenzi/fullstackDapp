
const routes = require('next-routes')();

routes
.add('/compaigns/new','/compaigns/new')
.add('/compaigns/:address','/compaigns/show')
.add('/compaigns/:address/requests','/compaign/requests/index')
.add('/compaigns/:address/requests/new','/compaign/requests/index')

module.exports = routes;
