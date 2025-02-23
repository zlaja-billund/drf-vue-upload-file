<script setup>

import { useDropzone } from 'vue3-dropzone';
import { useFileStore } from './stores';

const fileStore = useFileStore();

const { getRootProps, getInputProps, isDragActive, ...rest } = useDropzone({
  onDrop,
});


function onDrop(acceptFiles, rejectReasons) {
  const formData = new FormData();

  for(var x = 0; x < acceptFiles.length; x++) {
    formData.append("files", acceptFiles[x]);
  }

  fileStore.postFiles(formData).then((response) => {
      fileStore.addFilesToList(response);
  }).catch((err) => {
      console.error(err);
    });
}

function handleClickDeleteFile(index, id) {
  fileStore.deleteFile(id).then(() => {
    fileStore.deleteFileFromList(index);
  }).catch((err) => {
    console.error(err);
  });
}

const showFilesList = () => {
  console.log("files in list", fileStore.files);
}

</script>

<template>

<div>
  <div v-if="fileStore.files.length > 0" class="files">
    <div class="file-item" v-for="(file, index) in fileStore.files" :key="index">
      <span>{{ file.file }}</span>
      <span class="delete-file" @click="handleClickDeleteFile(index, file.id)">Delete</span>
    </div>
  </div>
  <div v-else class="dropzone" v-bind="getRootProps()">
    <div class="border" :class="{isDragActive, }">
      <div class="icon"><v-icon name="bi-cloud-upload" fill="#ccc" scale="5" /></div>
      <input v-bind="getInputProps()" />
      <p v-if="isDragActive">Drop the files here ...</p>
      <p v-else>Drag and drop files here, or Click to select files</p>
    </div>
  </div>
</div>

</template>

<style scoped>
dropzone,
.files {
  width: 500px;
  margin: 0 auto;
  padding: 10px;
  border-radius: 8px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  font-size: 12px;
  line-height: 1.5;
}

.border {
  border: 2px dashed #ccc;
  border-radius: 8px;
  /*display: flex;*/
  align-items: center;
  justify-content: center;
  padding: 20px;
  transition: all 0.3s ease;
  background: #fff;
  width: 500px;
  text-align: center;

  &.isDragActive {
    border: 2px dashed #ffb300;
    background: rgb(255 167 18 / 20%);

    .icon {
      svg {
        fill: #ffb300;
      }
    }
  }
}

.file-item {
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgb(255 167 18 / 20%);
  padding: 7px;
  padding-left: 15px;
  margin-top: 10px;

  &:first-child {
    margin-top: 0;
  }

  .delete-file {
    background: red;
    color: #fff;
    padding: 5px 10px;
    border-radius: 8px;
    cursor: pointer;
  }
}
</style>
