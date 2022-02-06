<template>
  <div class="container-fluid text-monospace" style="padding: 20px">
    <div class="row">
      <div class="col-md-9">
        <div
          class="embed-responsive embed-responsive-16by9"
          style="max-height: 768px"
        >
          <video v-bind:src="video_src" controls></video>
        </div>
        <h3>
          <b
            ><i>{{ this.title }}</i></b
          >
        </h3>
      </div>
      <div
        class="col-md-2 overflow-auto text-center"
        style="max-height: 768px, min-width: 175px"
      >
        <h5><b>Share Video</b></h5>
        <form>
          &nbsp;
          <input
            @change.prevent="captureFile"
            type="file"
            accept=".mp4, .mkv .ogg .wmv"
            style="width: 250px; padding: 10px"
          />
          &nbsp;

          <div class="form-group mr-sm-2">
            <input
              v-model="uploadFileTitle"
              id="videoTitle"
              type="text"
              class="form-control-sm"
              placeholder="Title..."
              required
            />
          </div>

          <button
            type="submit"
            class="btn btn-danger btn-block btn-sm"
            @click.prevent.stop="UpLoad"
          >
            Upload!
          </button>
          &nbsp;
        </form>
        <div class="overflow-auto" style="max-height: 600px">
          <div
            class="card mb-4 text-center bg-secondary mx-auto"
            style="width: 175px"
            v-for="video in videos"
            :key="video.id"
          >
            <div class="card-title bg-dark">
              <small class="text-white"
                ><b>{{ video.title }}</b></small
              >
            </div>
            <div style="cursor: pointer">
              <p @click="changeVideo(video)">
                <video
                  :src="`https://ipfs.infura.io/ipfs/${video.hash}`"
                  style="width: 150px; height: 200px"
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
export default {
  name: "Home",
  data() {
    return {
      uploadFileBuffer: null,
      uploadFileTitle: null,
    };
  },
  computed: {
    video_src() {
      if (
        this.$store.state.currentHash === "" ||
        this.$store.state.currentHash === null
      ) {
        return null;
      } else {
        return "https://ipfs.infura.io/ipfs/" + this.$store.state.currentHash;
      }
    },
    videos() {
      return this.$store.state.videos;
    },
    title() {
      return this.$store.state.currentTitle;
    },
  },
  methods: {
    captureFile(event) {
      const file = event.target.files[0];
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(file);

      reader.onloadend = () => {
        this.uploadFileBuffer = Buffer(reader.result);
        console.log("buffer", this.uploadFileBuffer);
      };
    },
    UpLoad() {
      if (this.uploadFileBuffer != null && this.uploadFileTitle != null)
        console.log("Submitting file to IPFS...");
      this.$store.dispatch("addVideo", {
        buffer: this.uploadFileBuffer,
        title: this.uploadFileTitle,
      });
    },
    changeVideo(video) {
      this.$store.commit("SetcurrentVideo", {
        currentHash: video.hash,
        currentTitle: video.title,
      });
    },
  },
};
</script>

<style>
h3 {
  margin: 2vh;
}
</style>