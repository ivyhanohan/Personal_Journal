E<template>
    <div class="container mt-5">
      <h3>Add Journal Entry</h3>
      <form @submit.prevent="addEntry">
        <div class="mb-3">
          <label>Title</label>
          <input v-model="title" type="text" class="form-control" required />
        </div>
        <div class="mb-3">
          <label>Content</label>
          <textarea v-model="content" class="form-control" required></textarea>
        </div>
        <div class="mb-3">
          <label>Tags</label>
          <input v-model="tags" type="text" class="form-control" placeholder="Comma-separated" />
        </div>
        <div class="mb-3">
          <label>Image</label>
          <input @change="onFileChange" type="file" class="form-control" />
        </div>
        <button type="submit" class="btn btn-primary">Save</button>
      </form>
    </div>
  </template>
  
  <script>
  import { db, storage } from '../firebase';
  import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
  import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
  
  export default {
    data() {
      return {
        title: '',
        content: '',
        tags: '',
        file: null,
      };
    },
    methods: {
      async onFileChange(e) {
        this.file = e.target.files[0];
      },
      async addEntry() {
        let imageUrl = '';
        if (this.file) {
          const storageRef = ref(storage, `journal-images/${this.file.name}`);
          await uploadBytes(storageRef, this.file);
          imageUrl = await getDownloadURL(storageRef);
        }
  
        await addDoc(collection(db, 'entries'), {
          title: this.title,
          content: this.content,
          tags: this.tags.split(',').map(tag => tag.trim()),
          createdAt: serverTimestamp(),
          imageUrl,
        });
  
        this.$router.push('/dashboard');
      },
    },
  };
  </script>
  