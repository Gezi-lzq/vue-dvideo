//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

// 准备actions--用于响应组件中的动作
const actions = {

    async InitBlockchain(context,DVideo) {
      const web3 = window.web3;
      //Load account
      const accounts = await web3.eth.getAccounts();
      //Get network ID
      const networkId = await web3.eth.net.getId();
      //Get network data
      const networkData = DVideo.networks[networkId];
      if (networkData) {

        const dvideo = new web3.eth.Contract(DVideo.abi, networkData.address);
        context.commit('InitNetword',{ account:accounts[0] , dvideo } )
        context.dispatch('LoadVideoDate')
      } else {
        context.commit('InitNetword',{ account:accounts[0] , dvideo:null } )
        //If network data doesn't exisits, log error
        window.alert("DVideo contrast not deploy to detected network");
      }
    },
  
    async LoadVideoDate(context){
        const videosCount = await context.state.dvideo.methods.videoCount().call();
        let videos = []
        for (var i = videosCount; i >= 1; i--) {
          const video = await context.state.dvideo.methods.videos(i).call();
          videos = [...videos, video];
          console.log(videos)
        }

        context.commit('SetVideos', {videos,videosCount} );

        const latest = videos[0];
        let currentHash = latest.hash;
        let currentTitle = latest.title;
        
        context.commit('SetcurrentVideo',{currentHash,currentTitle})
    },

    async addVideo(context,value) {
        ipfs.add(value.buffer,(error, result) => {
            if(error) {
                console.error(error)
                return
            }
            console.log(context.state.dvideo)
            context.state.dvideo.methods.uploadVideo(result[0].hash, value.title).send({ from: this.state.account }).on('transactionHash', (hash) => {
                console.log("上传智能合约",hash)
                context.dispatch('LoadVideoDate')
              })
        })
    },
  
  };
  export default actions;