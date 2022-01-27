require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider-privkey');
const privateKeys = process.env.PRIVATE_KEYS || ""

module.exports = {
  networks: {
    development: {
      host: "192.168.1.7",
      port: 7545,
      network_id: "*" // Match any network id
    },
    ropsten: {
     //以下网络列表由本地测试网络和 Infura 托管的 Ropsten 网络组成，两者均由 HDWalletProvider 提供
      provider: function() {
        return new HDWalletProvider(
          privateKeys.split(','), // Array of account private keys
          `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`// Url to an Ethereum Node
        )
      },
      // 指定部署的 gas limit。 默认为 4712388
      gas: 5000000,
      // 指定部署的 gas价格。 默认为 100000000000（100香农）
      gasPrice: 25000000000,
      network_id: 3
    }
  },
  // (未编译合约)目录
  contracts_directory: './contracts/',
  // 指定合约构建生成目录
  contracts_build_directory: './bulid/abis/',

  compilers: {
    // Solidity编译器设置
    solc: {
      optimizer: {
        enabled: true,
        runs: 200   // 优化次数
      }
    }
  }
}