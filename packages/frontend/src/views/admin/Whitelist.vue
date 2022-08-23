<script setup lang="ts">
import WhitelistTable from '@/components/admin/whitelist/Table.vue'
import AddModal from '@/components/admin/whitelist/AddModal.vue'
import { ref } from 'vue'
import { importWhitelist } from '@/firebase/functions'
import { parse } from 'papaparse'
import { deleteAllFromWhitelist } from '@/firebase/functions'
import { web3 } from '@/web3'

const addModal = ref()

const importFromCsv = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.item(0)

  if (!file) return

  parse<[string]>(file, {
    complete(res) {
      const data = res.data.map((arr) => arr[0]?.toLowerCase())
      const addresses = data.filter(web3.utils.isAddress)
      importWhitelist({ addresses })
    },
  })
}

const deleteAll = () => {
  const isSure = confirm('You are sure?')

  if (isSure) {
    deleteAllFromWhitelist()
  }
}
</script>

<template>
  <div class="d-flex align-items-center mb-4">
    <h1 class="me-1 mb-0">Whitelist</h1>
    <button class="btn btn-success btn-sm" @click="addModal.show">
      <i class="bi bi-plus"></i>
    </button>
    <div class="ms-auto">
      <button class="btn btn-primary btn-sm me-1" @click="deleteAll">
        Delete all
        <i class="bi bi-trash"></i>
      </button>
      <label class="btn btn-success btn-sm">
        Import <input type="file" class="d-none" @input="importFromCsv" />
        <i class="bi bi-upload"></i>
      </label>
    </div>
  </div>

  <WhitelistTable />
  <AddModal ref="addModal" />
</template>
