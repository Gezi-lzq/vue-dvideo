<template>
    <header>
        <nav class="container">
            <div class="branding">
                <img src="../assets/dvideo.png" width="36" height="36" alt=""/>
                <router-link class="header" :to="{ name: 'Home' }">
                    Dvideo
                </router-link>
            </div>
            <div class="userInfo">
                {{$store.state.account}}
                <img v-bind:src="$store.getters.avatar" >
            </div>
        </nav>
    </header>
</template>

<script>

export default {
    name: "Navbar",
    data(){
        return {
            
        };
    },
}
</script>

<style lang="scss" scoped>
header {
  background-color: rgb(64, 64, 92);
  padding: 0 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;
  nav {
    display: flex;
    padding: 25px 0;
    margin: 0 10px;
    .branding {
      display: flex;
      align-items: center;
      .header {
        font-weight: 600;
        font-size: 26px;
        color: rgb(233, 233, 233);
        text-decoration: none;
        margin: auto 5px;
      }
    }
    .userInfo {
        color: rgb(163, 163, 163);
        position: relative;
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: flex-end;
        margin:0 10px;
        img {
            margin: 0 10px;
            width: 35px;
            height: 35px;
        }
    }
  }

}
</style>

