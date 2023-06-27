import { BigNumber } from 'ethers';

export const ETH_XDAI_BRIDGE = 'eth-xdai';
export const BSC_XDAI_BRIDGE = 'bsc-xdai';
export const POA_XDAI_BRIDGE = 'poa-xdai';
export const KOVAN_SOKOL_BRIDGE = 'kovan-sokol';
export const ETH_BSC_BRIDGE = 'eth-bsc';

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';
export const ETHER_CURRENCY_LOGO =
  'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png';
export const BNB_CURRENCY_LOGO =
  'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png';
export const GOERLI_CURRENCY_LOGO = 
  'https://s2.coinmarketcap.com/static/img/coins/64x64/23669.png'
export const GNOSIS_CURRENCY_LOGO =
  'https://s2.coinmarketcap.com/static/img/coins/64x64/1659.png'
export const LARGEST_UINT256 = BigNumber.from(
  '115792089237316195423570985008687907853269984665640564039457584007913129639935',
);

export const OWLRACLE_API_KEY = process.env.REACT_APP_OWLRACLE_API_KEY;

export const POLLING_INTERVAL =
  process.env.REACT_APP_UI_STATUS_UPDATE_INTERVAL || 5000;

export const DEFAULT_BRIDGE_DIRECTION =
  process.env.REACT_APP_DEFAULT_BRIDGE_DIRECTION || ETH_XDAI_BRIDGE;

export const COINZILLA_API_KEY =
  process.env.REACT_APP_COINZILLA_API_KEY || null;

export const NON_ETH_CHAIN_IDS = [56, 77, 99, 100];

export const XDAI_CHAIN_IDS = [77, 99, 100];

export const nativeCurrencies = {
  1: {
    chainId: 1,
    decimals: 18,
    logoURI: ETHER_CURRENCY_LOGO,
    address: ADDRESS_ZERO,
    name: 'Ether',
    symbol: 'ETH',
    mode: 'NATIVE',
  },
  42: {
    chainId: 42,
    decimals: 18,
    logoURI: ETHER_CURRENCY_LOGO,
    address: ADDRESS_ZERO,
    name: 'Kovan Ether',
    symbol: 'KETH',
    mode: 'NATIVE',
  },
  56: {
    chainId: 56,
    decimals: 18,
    logoURI: BNB_CURRENCY_LOGO,
    name: 'Binance Coin',
    address: ADDRESS_ZERO,
    symbol: 'ETH',
    mode: 'NATIVE',
  },
  10200: {
    chainId: 10200,
    decimals: 18,
    logoURI: GNOSIS_CURRENCY_LOGO,
    name: 'Chiado',
    address: ADDRESS_ZERO,
    symbol: 'Chiado xDAI',
    mode: 'NATIVE',
  },
};

export const nativeCurrencyMediators = {
  1: '0xa6439ca0fcba1d0f80df0be6a17220fed9c9038a'.toLowerCase(),
  5: '0x00147c84f13764dCDAbAF1cbAe622fa6f6839085'.toLowerCase(),
  56: '0xefc33f8b2c4d51005585962be7ea20518ea9fd0d'.toLowerCase(),
  10200: '0x09D549a48AC52F3f9945E7de6402c609c92aa2E1'.toLowerCase(),
};

export const networkNames = {
  1: 'ETH Mainnet',
  3: 'Ropsten Testnet',
  4: 'Rinkeby Testnet',
  5: 'Görli Testnet',
  42: 'Kovan Testnet',
  56: 'Binance Smart Chain',
  77: 'Sokol Testnet',
  99: 'POA Network',
  100: 'Gnosis Chain',
};

export const networkLabels = {
  1: 'Mainnet',
  3: 'Ropsten',
  4: 'Rinkeby',
  5: 'Görli',
  42: 'Kovan',
  56: 'BSC',
  77: 'Sokol',
  99: 'POA',
  100: 'Gnosis Chain',
};

export const networkCurrencies = {
  1: {
    name: 'Ethereum',
    symbol: 'ETH',
  },
  5: {
    name: 'Goerli Ethereum',
    symbol: 'GoerliETH',
  },
  56: {
    name: 'Binance Coin',
    symbol: 'BNB',
  },
  100: {
    name: 'xDai',
    symbol: 'xDai',
  },
  10200: {
    name: 'Chiado GC testnet',
    symbol: 'xDai',
  },
  10200: {
    name: 'Chiado GC testnet',
    symbol: 'xDai',
  },
};

const {
  REACT_APP_MAINNET_RPC_URL,
  REACT_APP_GOERLI_RPC_URL,
  REACT_APP_XDAI_RPC_URL,
  REACT_APP_BSC_RPC_URL,
  REACT_APP_CHIADO_RPC_URL,
} = process.env;

export const chainUrls = {
  1: {
    rpc: REACT_APP_MAINNET_RPC_URL.split(' '),
    explorer: 'https://blockscout.com/eth/mainnet',
    chainId: 1,
    name: networkNames[1],
  },
  5: {
    rpc: REACT_APP_GOERLI_RPC_URL.split(' '),
    explorer: 'https://eth-goerli.blockscout.com/',
    chainId: 5,
    name: networkNames[5],
  },
  56: {
    rpc: REACT_APP_BSC_RPC_URL.split(' '),
    explorer: 'https://bscscan.com',
    chainId: 56,
    name: networkNames[56],
  },
  100: {
    rpc: REACT_APP_XDAI_RPC_URL.split(' '),
    explorer: 'https://blockscout.com/xdai/mainnet',
    chainId: 100,
    name: networkNames[100],
  },
  10200: {
    rpc: REACT_APP_CHIADO_RPC_URL.split(' '),
    explorer: 'https://blockscout.com/gnosis/chiado',
    chainId: 10200,
    name: networkNames[10200],
  },
};

export const defaultTokensUrl = {
  100: 'https://tokens.honeyswap.org',
  1: 'https://tokens.uniswap.org',
  5: '',
  42: '',
  77: '',
  99: '',
  56: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/tokenlist.json',
  10200: '',
};

export const GRAPH_HEALTH_ENDPOINT =
  'https://api.thegraph.com/index-node/graphql';

export const LOCAL_STORAGE_KEYS = {
  DONT_SHOW_CLAIMS: 'dont-show-claims',
  MAINNET_RPC_URL: 'mainnet-rpc-url',
  GOERLI_RPC_URL: 'goerli-rpc-url',
  XDAI_RPC_URL: 'xdai-rpc-url',
  BSC_RPC_URL: 'bsc-rpc-url',
  CHIADO_RPC_URL: 'chiado-rpc-url',
  NEVER_SHOW_CLAIMS: 'never-show-claims',
  INFINITE_UNLOCK: 'infinite-unlock',
  CUSTOM_TOKENS: 'customTokens',
  DISABLE_BALANCE_WHILE_TOKEN_FETCH: 'disable-balance-while-token-fetch',
  BRIDGE_DIRECTION: 'bridge-direction',
};

export const SENTRY_DSN = process.env.REACT_APP_SENTRY_DSN;
