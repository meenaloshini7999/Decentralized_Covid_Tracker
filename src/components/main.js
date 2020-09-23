import web3 from './web3';
import main from '../abis/Main';

const instance = new web3.eth.Contract(
    main.abi,
    '0x37B9d972786AF438Fd45FCDbc4bF275CabF8dcC4'
  );

export default instance;
