<template>
  <div class="page-container">
    <div class="heading_container heading_center">
          <h2>
            Government IT <span>Systems Registry</span>
          </h2>
          
        </div>
        <br>
        <br>

    <!-- Search Box -->
    <input
      type="text"
      v-model="searchText"
      @keyup.enter="filterData"
      placeholder="Search by system, institute, or category"
      class="search-box"
    />

    <!-- Table -->
    <table class="data-table">
      <thead>
        <tr>
          <th>Institute</th>
          <th>System Name</th>
          <th>Category</th>
          <th>Technology</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredSystems" :key="index">
          <td>{{ item.institute }}</td>
          <td>{{ item.systemName }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.technology }}</td>
          <td>{{ item.status }}</td>
        </tr>

        <tr v-if="filteredSystems.length === 0">
          <td colspan="5" class="no-data">No matching records found</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const searchText = ref("");

const systems = ref([
  {
    institute: "Ministry of Finance",
    systemName: "Budget Management System",
    category: "Finance",
    technology: "Vue Java",
    status: "Active"
  },
  {
    institute: "Department of Immigration",
    systemName: "Visa Processing System",
    category: "Citizen Services",
    technology: "Angular Spring",
    status: "Active"
  },
  {
    institute: "ICTA",
    systemName: "Government Cloud Platform",
    category: "Infrastructure",
    technology: "OpenStack",
    status: "Active"
  },
  {
    institute: "Department of Motor Traffic",
    systemName: "Vehicle Registration System",
    category: "Transport",
    technology: "PHP MySQL",
    status: "Under Upgrade"
  }
]);

const filteredSystems = computed(() => {
  if (!searchText.value.trim()) return systems.value;

  // Split search text into words
  const words = searchText.value
    .toLowerCase()
    .trim()
    .split(/\s+/);

  return systems.value.filter(item => {
    const rowText = Object.values(item)
      .join(" ")
      .toLowerCase();

    // ALL words must exist in row text
    return words.every(word => rowText.includes(word));
  });
});
</script>

<style scoped>
.page-container {
  padding: 30px;
  font-family: Arial, sans-serif;
}

.search-box {
  width: 400px;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 15px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

.data-table th {
  background-color: #f3f3f3;
}

.no-data {
  text-align: center;
  font-style: italic;
}
</style>
