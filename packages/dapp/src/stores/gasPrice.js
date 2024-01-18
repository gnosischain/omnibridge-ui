import { BigNumber, providers, utils } from 'ethers';
import { OWLRACLE_API_KEY } from 'lib/constants';
import { getRPCUrl, logDebug, logError } from 'lib/helpers';

const lowest = arr =>
  arr
    .reduce((low, item) => {
      const lowValue = item.gasPrice.low;
      return low > lowValue ? lowValue : low;
    }, arr[0].gasPrice.low)
    .toFixed(2);

const highest = arr =>
  arr
    .reduce((high, item) => {
      const highValue = item.gasPrice.high;
      return high < highValue ? highValue : high;
    }, arr[0].gasPrice.high)
    .toFixed(2);

const median = arr => {
  const mid = Math.floor(arr.length / 2);
  const nums = arr
    .slice()
    .map(
      a =>
        (Number(a.gasPrice.open.toFixed(2)) +
          Number(a.gasPrice.close.toFixed(2))) /
        2,
    )
    .sort((a, b) => a - b);
  return (
    arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2
  ).toFixed(2);
};

const gasPriceFromSupplier = async () => {
  try {
    const rpcUrl = getRPCUrl(1, true)[0];
    const provider = new providers.JsonRpcProvider(rpcUrl);
    const gasPrice = await provider.getGasPrice();
    return {
      standard: gasPrice,
      fast: gasPrice
    }
  } catch (e) {
    logError(`Gas Price not available. ${e.message}`);
  }
  return null;
};

const {
  REACT_APP_GAS_PRICE_FALLBACK_GWEI,
  REACT_APP_GAS_PRICE_SPEED_TYPE,
  REACT_APP_GAS_PRICE_UPDATE_INTERVAL,
} = process.env;

const DEFAULT_GAS_PRICE_UPDATE_INTERVAL = 60000;
const DEFAULT_GAS_PRICE_SPEED_TYPE = 'standard';

class GasPriceStore {
  gasPrice = BigNumber.from('0');

  speedType = DEFAULT_GAS_PRICE_SPEED_TYPE;

  updateInterval = DEFAULT_GAS_PRICE_UPDATE_INTERVAL;

  medianHistoricalPrice = BigNumber.from('0');

  lowestHistoricalPrice = BigNumber.from('0');

  highestHistoricalPrice = BigNumber.from('0');

  constructor() {
    this.gasPrice = utils.parseUnits(
      REACT_APP_GAS_PRICE_FALLBACK_GWEI || '0',
      'gwei',
    );

    this.speedType =
      REACT_APP_GAS_PRICE_SPEED_TYPE || DEFAULT_GAS_PRICE_SPEED_TYPE;

    this.updateInterval =
      REACT_APP_GAS_PRICE_UPDATE_INTERVAL || DEFAULT_GAS_PRICE_UPDATE_INTERVAL;

    this.updateGasPrice();

    this.updateHistoricalPrice();
  }

  async updateGasPrice() {
    const gasPrices = await gasPriceFromSupplier();
    try {
      if (gasPrices) {
        const { [this.speedType]: price } = gasPrices;
        if (price) {
          this.gasPrice = gasPrices;
        }
        logDebug('Updated Gas Price', gasPrices);
      }
    } catch (gasPriceError) {
      logError({ gasPriceError });
    }

    setTimeout(() => this.updateGasPrice(), this.updateInterval);
  }

  async updateHistoricalPrice() {
    try {
      const response = await fetch(
        OWLRACLE_API_KEY
          ? `https://api.owlracle.info/v4/eth/history?apikey=${OWLRACLE_API_KEY}&candles=1008&timeframe=10`
          : `https://api.owlracle.info/v4/eth/history?candles=1008&timeframe=10`,
      );
      if (!response.ok) {
        throw new Error(
          `Owlracle request failed with status ${response.status}`,
        );
      }

      const data = await response.json();

      const lowestPrice = lowest(data);
      this.lowestHistoricalPrice = utils.parseUnits(lowestPrice, 'gwei');

      const medianPrice = median(data);
      this.medianHistoricalPrice = utils.parseUnits(medianPrice, 'gwei');

      const highestPrice = highest(data);
      this.highestHistoricalPrice = utils.parseUnits(highestPrice, 'gwei');

      logDebug('Updated Historical Gas Price', {
        lowest: Number(lowestPrice),
        median: Number(medianPrice),
        highest: Number(highestPrice),
      });
    } catch (historicalGasPriceError) {
      this.lowestHistoricalPrice = BigNumber.from(0);
      this.highestHistoricalPrice = BigNumber.from(0);
      this.medianHistoricalPrice = BigNumber.from(0);
      logError({ historicalGasPriceError });
    }
  }
}

const ethGasStore = new GasPriceStore();

export const getCurrentEthGasPrice = () => ethGasStore.gasPrice;

export const getLowestHistoricalEthGasPrice = () =>
  ethGasStore.lowestHistoricalPrice;

export const getMedianHistoricalEthGasPrice = () =>
  ethGasStore.medianHistoricalPrice;

export const getHighestHistoricalEthGasPrice = () =>
  ethGasStore.highestHistoricalPrice;
