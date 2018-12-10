import {CarbonLDP} from 'carbonldp';

const BASE_CARBON_URL = 'http://localhost:8083';
const carbon = new CarbonLDP(BASE_CARBON_URL);

carbon.extendObjectSchema(`Comment`, {
  'body': {
    '@type': 'string'
  },
  'post': {
    '@type': '@id'
  },
  'author': {
    '@type': '@id'
  }
});

carbon.extendObjectSchema(`Post`, {
  'title': {
    '@type': 'string'
  },
  'content': {
    '@type': 'string'
  },
  'author': {
    '@type': '@id'
  },
  'comments': {
    '@container': '@set',
    '@type': '@id'
  },
  'tags': {
    '@container': '@set',
    '@type': '@id'
  }
});

carbon.extendObjectSchema(`Author`, {
  'firstName': {
    '@type': 'string'
  },
  'lastName': {
    '@type': 'string'
  },
  'posts': {
    '@container': '@set',
    '@type': '@id'
  }
});

carbon.extendObjectSchema(`Tag`, {
  'title': {
    '@type': 'string'
  },
  'posts': {
    '@container': '@set',
    '@type': '@id'
  }
});

export default carbon;

