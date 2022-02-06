// 准备mutations--用于操作数据(state)
const mutations = {
    InitNetword(state,value){
        state.account = value.account;
        state.dvideo = value.dvideo;
    },
    SetVideos(state,value){
        state.videos = value.videos;
        state.videosCount = value.videosCount;
    },
    SetcurrentVideo(state,value){
        state.currentHash = value.currentHash;
        state.currentTitle = value.currentTitle;
    },
    SetLoading(state,value){
        state.loading = value;
    }
};
export default mutations;