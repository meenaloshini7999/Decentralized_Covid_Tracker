import web3 from './web3';
import main from '../abis/Main';

const instance = new web3.eth.Contract(
    main.abi,
    main.networks[5777].address
  );

export default instance;
