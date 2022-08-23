<script setup lang="ts">
import { useWhitelistStore } from '@/store/whitelist'

const whitelistStore = useWhitelistStore()

whitelistStore.fetch()
</script>

<template>
  <table class="table table-hover align-middle">
    <thead>
      <tr>
        <th>Address</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, id) in whitelistStore.docs" :key="id">
        <td>{{ item.address }}</td>
        <td class="text-end">
          <button
            class="btn btn-danger"
            @click="whitelistStore.remove(id)"
          >
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>