<!-- eslint-disable vue/multi-word-component-names -->

<template>
    <div class="container mt-5">
      <h3>Your Journal Entries</h3>
      <div v-for="entry in entries" :key="entry.id" class="card mt-3">
        <div class="card-body">
          <h5 class="card-title">{{ entry.title }}</h5>
          <p class="card-text">{{ entry.content }}</p>
          <span v-for="tag in entry.tags" :key="tag" class="badge bg-secondary me-1">{{ tag }}</span>
          <img v-if="entry.imageUrl" :src="entry.imageUrl" alt="Entry Image" class="img-fluid mt-3" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { db } from '../firebase';
  import { collection, query, onSnapshot } from 'firebase/firestore';
  
  export default {
    data() {
      return {
        entries: [],
      };
    },
    created() {
      const q = query(collection(db, 'entries'));
      onSnapshot(q, (snapshot) => {
        this.entries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      });
    },
  };
  </script>
  