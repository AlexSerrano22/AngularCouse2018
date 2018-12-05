import {CarbonLDP} from 'carbonldp';

const BASE_CARBON_URL = 'http://localhost:8083';
const carbon = new CarbonLDP(BASE_CARBON_URL);

carbon.extendObjectSchema(`Comment`, {
  'content': {
    '@type': 'string'
  }
});

export default carbon;
