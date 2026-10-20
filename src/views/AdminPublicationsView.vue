<template>
  <div class="admin-publications-page">
    <div class="container py-5">
      <!-- 1. TOP STATISTICS HEADER -->
      <div class="d-flex flex-column flex-xl-row justify-content-between align-items-xl-center gap-4 mb-4 pb-3 border-bottom">
        <div>
          <div class="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-teal-light text-teal fw-bold text-uppercase small mb-2">
            <span class="badge-dot bg-teal rounded-circle me-1" style="width: 6px; height: 6px; display: inline-block;"></span>
            Action Plans &amp; Strategic Publications
          </div>
          <h2 class="fw-bold text-dark-teal mb-1">Manage Action Plans</h2>
          <p class="text-muted mb-0">Deploy institutional action plans, policy frameworks, and official reports to the public database.</p>
        </div>

        <!-- 3 Compact KPI Metric Cards -->
        <div class="d-flex flex-wrap gap-3">
          <!-- KPI 1: Total Documents -->
          <div class="d-flex align-items-center gap-3 bg-white px-3 py-2 rounded-4 shadow-sm border border-secondary-subtle">
            <div class="kpi-icon-box bg-teal-light text-teal rounded-3 d-flex align-items-center justify-content-center">
              <i class="fas fa-file-contract"></i>
            </div>
            <div>
              <div class="text-uppercase text-muted fw-bold" style="font-size: 10px; letter-spacing: 0.5px;">Total Documents</div>
              <div class="d-flex align-items-baseline gap-1">
                <span class="fs-5 fw-bold text-dark">{{ publications.length }}</span>
                <span class="small fw-bold text-success">({{ activeCount }} Active)</span>
              </div>
            </div>
          </div>

          <!-- KPI 2: Active Years Coverage -->
          <div class="d-flex align-items-center gap-3 bg-white px-3 py-2 rounded-4 shadow-sm border border-secondary-subtle">
            <div class="kpi-icon-box bg-primary-subtle text-primary rounded-3 d-flex align-items-center justify-content-center">
              <i class="fas fa-calendar-alt"></i>
            </div>
            <div>
              <div class="text-uppercase text-muted fw-bold" style="font-size: 10px; letter-spacing: 0.5px;">Years Coverage</div>
              <div class="fs-5 fw-bold text-dark">{{ yearsCoverage }}</div>
            </div>
          </div>

          <!-- KPI 3: Total Storage -->
          <div class="d-flex align-items-center gap-3 bg-white px-3 py-2 rounded-4 shadow-sm border border-secondary-subtle">
            <div class="kpi-icon-box bg-success-subtle text-success rounded-3 d-flex align-items-center justify-content-center">
              <i class="fas fa-database"></i>
            </div>
            <div>
              <div class="text-uppercase text-muted fw-bold" style="font-size: 10px; letter-spacing: 0.5px;">Total Storage</div>
              <div class="fs-5 fw-bold text-dark">{{ totalStorage }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Alerts -->
      <div v-if="successMessage" class="alert alert-success alert-dismissible fade show rounded-3 shadow-sm mb-4" role="alert">
        <div class="d-flex align-items-center">
          <i class="fas fa-check-circle fa-lg me-2"></i>
          <div>{{ successMessage }}</div>
        </div>
        <button type="button" class="btn-close" @click="successMessage = ''" aria-label="Close"></button>
      </div>

      <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show rounded-3 shadow-sm mb-4" role="alert">
        <div class="d-flex align-items-center">
          <i class="fas fa-exclamation-triangle fa-lg me-2"></i>
          <div>{{ errorMessage }}</div>
        </div>
        <button type="button" class="btn-close" @click="errorMessage = ''" aria-label="Close"></button>
      </div>

      <div class="row g-4">
        <!-- 2. UPLOAD FORM COLUMN -->
        <div class="col-lg-5">
          <div class="card border-0 shadow-sm rounded-4 h-100">
            <div class="card-header bg-white border-0 pt-4 px-4 pb-2">
              <h5 class="fw-bold text-dark-teal mb-0">
                <i class="fas fa-cloud-upload-alt text-teal me-2"></i> Upload Action Plan
              </h5>
              <p class="text-muted small mt-1 mb-0">Deploy institutional frameworks to POST /api/v1/publications</p>
            </div>
            <div class="card-body p-4">
              <form @submit.prevent="handleSubmit">
                <!-- Title with Leading Icon -->
                <div class="mb-3">
                  <label class="form-label fw-bold small text-muted">Action Plan Title <span class="text-danger">*</span></label>
                  <div class="input-group">
                    <span class="input-group-text bg-light border-end-0 rounded-start-3 text-muted">
                      <i class="fas fa-heading small"></i>
                    </span>
                    <input
                      type="text"
                      v-model="form.title"
                      class="form-control rounded-end-3 border-start-0"
                      placeholder="e.g. Annual Action Plan 2026"
                      required
                    />
                  </div>
                </div>

                <div class="row g-3 mb-3">
                  <!-- Year with Leading Icon -->
                  <div class="col-sm-6">
                    <label class="form-label fw-bold small text-muted">Fiscal Year <span class="text-danger">*</span></label>
                    <div class="input-group">
                      <span class="input-group-text bg-light border-end-0 rounded-start-3 text-muted">
                        <i class="fas fa-calendar small"></i>
                      </span>
                      <input
                        type="text"
                        v-model="form.year"
                        class="form-control rounded-end-3 border-start-0"
                        placeholder="e.g. 2026"
                        required
                      />
                    </div>
                  </div>
                  <!-- Release Date with Leading Icon -->
                  <div class="col-sm-6">
                    <label class="form-label fw-bold small text-muted">Release Date <span class="text-danger">*</span></label>
                    <div class="input-group">
                      <span class="input-group-text bg-light border-end-0 rounded-start-3 text-muted">
                        <i class="fas fa-calendar-day small"></i>
                      </span>
                      <input
                        type="date"
                        v-model="form.releaseDate"
                        class="form-control rounded-end-3 border-start-0"
                        required
                      />
                    </div>
                  </div>
                </div>

                <!-- Description -->
                <div class="mb-3">
                  <label class="form-label fw-bold small text-muted">Description <span class="text-danger">*</span></label>
                  <textarea
                    v-model="form.description"
                    rows="4"
                    class="form-control rounded-3"
                    placeholder="Provide a comprehensive summary of the action plan goals, allocations, and key strategic priorities..."
                    required
                  ></textarea>
                </div>

                <!-- PDF File Upload Dropzone -->
                <div class="mb-4">
                  <label class="form-label fw-bold small text-muted">PDF Document <span class="text-danger">*</span></label>
                  <div 
                    class="upload-dropzone p-4 text-center rounded-3 border-2 border-dashed"
                    :class="{ 'border-teal bg-teal-light': isDragging, 'border-secondary-subtle': !isDragging }"
                    @dragover.prevent="isDragging = true"
                    @dragleave.prevent="isDragging = false"
                    @drop.prevent="handleFileDrop"
                    @click="$refs.fileInput.click()"
                  >
                    <input
                      ref="fileInput"
                      type="file"
                      accept=".pdf,application/pdf"
                      class="d-none"
                      @change="handleFileSelect"
                    />

                    <div v-if="!selectedFile">
                      <i class="fas fa-cloud-upload-alt fa-3x text-teal mb-2"></i>
                      <p class="mb-1 fw-bold text-dark-teal">Click or Drag &amp; Drop PDF document here</p>
                      <span class="text-muted small">Official publication PDF document (Up to 25MB)</span>
                    </div>

                    <div v-else class="d-flex align-items-center justify-content-between bg-white p-3 rounded-3 shadow-sm text-start border border-teal-light">
                      <div class="d-flex align-items-center gap-3 text-truncate">
                        <i class="fas fa-file-pdf fa-2x text-danger"></i>
                        <div class="text-truncate">
                          <div class="fw-bold text-dark text-truncate">{{ selectedFile.name }}</div>
                          <div class="text-success small fw-semibold">
                            <i class="fas fa-check-circle me-1"></i>{{ formatBytes(selectedFile.size) }} • Ready to deploy
                          </div>
                        </div>
                      </div>
                      <button 
                        type="button" 
                        class="btn btn-sm btn-outline-danger border-0 rounded-circle ms-2"
                        @click.stop="selectedFile = null"
                        title="Remove file"
                      >
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Submit Button: Publish Action Plan -->
                <button
                  type="submit"
                  class="btn btn-teal text-white w-100 rounded-pill py-3 fw-bold shadow-sm publish-btn"
                  :disabled="isSubmitting"
                >
                  <span v-if="isSubmitting">
                    <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Publishing to Database...
                  </span>
                  <span v-else>
                    <i class="fas fa-cloud-upload-alt me-2"></i> Publish Action Plan
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>

        <!-- 3. DATABASE LEDGER COLUMN -->
        <div class="col-lg-7">
          <div class="card border-0 shadow-sm rounded-4 h-100">
            <div class="card-header bg-white border-0 pt-4 px-4 pb-2 d-flex justify-content-between align-items-center">
              <div>
                <h5 class="fw-bold text-dark-teal mb-0">
                  <i class="fas fa-folder-open text-teal me-2"></i> Database Ledger
                </h5>
                <p class="text-muted small mt-1 mb-0">Synchronized records from /api/v1/publications</p>
              </div>
              <div class="d-flex align-items-center gap-2">
                <span class="badge bg-light text-dark rounded-pill border px-3 py-2 fw-bold">
                  {{ filteredPublications.length }} / {{ publications.length }}
                </span>
                <button class="btn btn-sm btn-outline-teal rounded-pill" @click="fetchPublications" title="Refresh">
                  <i class="fas fa-sync-alt" :class="{ 'fa-spin': isLoadingList }"></i>
                </button>
              </div>
            </div>

            <div class="card-body p-4">
              <!-- Search Bar & Year Filter Pills -->
              <div class="mb-4">
                <div class="input-group mb-3">
                  <span class="input-group-text bg-light border-end-0 rounded-start-3 text-muted">
                    <i class="fas fa-search small"></i>
                  </span>
                  <input
                    type="text"
                    v-model="searchQuery"
                    class="form-control rounded-end-3 border-start-0"
                    placeholder="Search action plans by title, year, or summary..."
                  />
                  <button 
                    v-if="searchQuery" 
                    type="button" 
                    class="btn btn-outline-secondary border-start-0" 
                    @click="searchQuery = ''"
                  >
                    <i class="fas fa-times small"></i>
                  </button>
                </div>

                <!-- Year Filter Pills -->
                <div class="d-flex align-items-center gap-2 flex-wrap">
                  <span class="small fw-bold text-muted text-uppercase" style="font-size: 11px;">Filter Year:</span>
                  <button
                    v-for="yr in availableYears"
                    :key="yr"
                    type="button"
                    class="btn btn-sm rounded-pill px-3 fw-bold transition-all"
                    :class="selectedYearFilter === yr ? 'btn-teal text-white' : 'btn-light text-secondary'"
                    @click="selectedYearFilter = yr"
                  >
                    {{ yr }}
                  </button>
                </div>
              </div>

              <!-- Loading State -->
              <div v-if="isLoadingList" class="text-center py-5">
                <div class="spinner-border text-teal mb-2" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <div class="text-muted small">Synchronizing publications...</div>
              </div>

              <!-- Empty DB State -->
              <div v-else-if="publications.length === 0" class="text-center py-5 text-muted">
                <i class="fas fa-file-alt fa-3x mb-3 text-secondary opacity-50"></i>
                <p class="mb-0">No publications added yet. Use the form on the left to upload your first action plan.</p>
              </div>

              <!-- No Search Filter Results -->
              <div v-else-if="filteredPublications.length === 0" class="text-center py-5 text-muted">
                <i class="fas fa-search fa-2x mb-2 text-secondary opacity-50"></i>
                <p class="mb-2 fw-semibold">No matching action plans found</p>
                <button 
                  class="btn btn-sm btn-outline-teal rounded-pill px-3" 
                  @click="searchQuery = ''; selectedYearFilter = 'All'"
                >
                  Reset Filters
                </button>
              </div>

              <!-- Document Cards List with Left Teal Border Accents & Circular Buttons -->
              <div v-else class="list-group list-group-flush gap-3">
                <div 
                  v-for="pub in filteredPublications" 
                  :key="pub.id"
                  class="list-group-item bg-white rounded-3 p-3 border shadow-sm publication-card"
                >
                  <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
                    <h6 class="fw-bold text-dark-teal mb-0 text-truncate" :title="pub.title">
                      {{ pub.title }}
                    </h6>
                    
                    <!-- Dedicated Action Buttons -->
                    <div class="d-flex align-items-center gap-1 shrink-0">
                      <span 
                        class="badge rounded-pill me-1"
                        :class="pub.active ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'"
                        style="font-size: 10px; cursor: pointer;"
                        @click="toggleActive(pub.id)"
                        :title="pub.active ? 'Click to deactivate' : 'Click to activate'"
                      >
                        {{ pub.active ? 'Active' : 'Inactive' }}
                      </span>

                      <a 
                        v-if="pub.url && pub.url !== '#'"
                        :href="getPdfUrl(pub)" 
                        target="_blank"
                        class="btn btn-sm btn-light border rounded-circle circular-action-btn"
                        title="View Online"
                      >
                        <i class="fas fa-eye small text-teal"></i>
                      </a>
                      <button 
                        class="btn btn-sm btn-light border rounded-circle circular-action-btn"
                        @click="openEditModal(pub)"
                        title="Edit publication"
                      >
                        <i class="fas fa-pen small text-teal"></i>
                      </button>
                      <button 
                        class="btn btn-sm btn-light border rounded-circle circular-action-btn text-danger"
                        @click="openDeleteModal(pub)"
                        title="Delete publication"
                      >
                        <i class="fas fa-trash-alt small"></i>
                      </button>
                    </div>
                  </div>

                  <p class="text-muted small text-truncate-2 mb-3">{{ pub.description }}</p>

                  <div class="d-flex align-items-center gap-2 small text-muted">
                    <span class="badge bg-teal-light text-teal rounded-pill">{{ pub.year }}</span>
                    <span>•</span>
                    <span><i class="far fa-calendar-alt me-1"></i> {{ pub.releaseDate || 'N/A' }}</span>
                    <span>•</span>
                    <span><i class="fas fa-hdd me-1"></i> {{ pub.fileSize || 'PDF' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div 
      v-if="showDeleteModal" 
      class="custom-modal-backdrop d-flex align-items-center justify-content-center p-3"
      @click.self="closeDeleteModal"
    >
      <div class="card border-0 shadow-lg rounded-4 custom-modal-content p-4" style="max-width: 440px; width: 100%;">
        <div class="text-center mb-3">
          <div class="modal-icon-badge bg-warning-subtle text-warning mx-auto mb-3 d-flex align-items-center justify-center">
            <i class="fas fa-exclamation-triangle fa-2x"></i>
          </div>
          <h5 class="fw-bold text-dark mb-2">Delete Action Plan?</h5>
          <p class="text-muted small mb-0">
            Are you sure you want to delete <span class="fw-bold text-dark">"{{ itemToDelete?.title }}"</span>? This publication will be permanently removed from the public portal.
          </p>
        </div>

        <div class="d-flex gap-2 mt-3">
          <button 
            type="button" 
            class="btn btn-light rounded-pill flex-fill fw-semibold py-2"
            @click="closeDeleteModal"
          >
            Cancel
          </button>
          <button 
            type="button" 
            class="btn btn-danger rounded-pill flex-fill fw-semibold py-2 shadow-sm"
            :disabled="isDeleting"
            @click="executeDelete"
          >
            <span v-if="isDeleting" class="spinner-border spinner-border-sm me-1"></span>
            <span>{{ isDeleting ? 'Deleting...' : 'Delete Plan' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Action Plan Modal -->
    <div 
      v-if="showEditModal" 
      class="custom-modal-backdrop d-flex align-items-center justify-content-center p-3"
      @click.self="closeEditModal"
    >
      <div class="card border-0 shadow-lg rounded-4 custom-modal-content p-4" style="max-width: 580px; width: 100%; max-height: 90vh; overflow-y: auto;">
        <div class="d-flex justify-content-between align-items-center pb-3 border-bottom mb-3">
          <div class="d-flex align-items-center gap-2">
            <div class="bg-teal-light text-teal p-2 rounded-3">
              <i class="fas fa-edit fa-lg"></i>
            </div>
            <div>
              <h5 class="fw-bold text-dark-teal mb-0">Edit Action Plan</h5>
              <span class="text-muted small">Update metadata or replace the PDF document</span>
            </div>
          </div>
          <button type="button" class="btn-close" @click="closeEditModal"></button>
        </div>

        <div v-if="editErrorMessage" class="alert alert-danger py-2 px-3 small rounded-3 mb-3 d-flex justify-content-between align-items-center">
          <span>{{ editErrorMessage }}</span>
          <button type="button" class="btn-close btn-close-white small" @click="editErrorMessage = ''"></button>
        </div>

        <form @submit.prevent="handleUpdate">
          <!-- Title with Leading Icon -->
          <div class="mb-3">
            <label class="form-label fw-bold small text-muted">Action Plan Title <span class="text-danger">*</span></label>
            <div class="input-group">
              <span class="input-group-text bg-light border-end-0 rounded-start-3 text-muted">
                <i class="fas fa-heading small"></i>
              </span>
              <input 
                type="text" 
                v-model="editForm.title" 
                class="form-control rounded-end-3 border-start-0" 
                required 
              />
            </div>
          </div>

          <!-- Year & Release Date with Leading Icons -->
          <div class="row g-3 mb-3">
            <div class="col-sm-6">
              <label class="form-label fw-bold small text-muted">Fiscal Year <span class="text-danger">*</span></label>
              <div class="input-group">
                <span class="input-group-text bg-light border-end-0 rounded-start-3 text-muted">
                  <i class="fas fa-calendar small"></i>
                </span>
                <input 
                  type="text" 
                  v-model="editForm.year" 
                  class="form-control rounded-end-3 border-start-0" 
                  required 
                />
              </div>
            </div>
            <div class="col-sm-6">
              <label class="form-label fw-bold small text-muted">Release Date <span class="text-danger">*</span></label>
              <div class="input-group">
                <span class="input-group-text bg-light border-end-0 rounded-start-3 text-muted">
                  <i class="fas fa-calendar-day small"></i>
                </span>
                <input 
                  type="date" 
                  v-model="editForm.releaseDate" 
                  class="form-control rounded-end-3 border-start-0" 
                  required 
                />
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="mb-3">
            <label class="form-label fw-bold small text-muted">Description <span class="text-danger">*</span></label>
            <textarea 
              v-model="editForm.description" 
              rows="3" 
              class="form-control rounded-3" 
              required
            ></textarea>
          </div>

          <!-- Current File & Optional Replacement -->
          <div class="mb-3">
            <label class="form-label fw-bold small text-muted">PDF Document</label>
            <div class="p-2 px-3 bg-light rounded-3 d-flex align-items-center justify-content-between mb-2 small">
              <div class="d-flex align-items-center gap-2 text-truncate">
                <i class="fas fa-file-pdf text-danger fa-lg"></i>
                <span class="text-truncate fw-semibold">Current: {{ editForm.currentFileName || 'Existing Document' }} ({{ editForm.currentFileSize || 'PDF' }})</span>
              </div>
              <a 
                v-if="editForm.currentUrl"
                :href="getPdfUrl({ url: editForm.currentUrl })"
                target="_blank"
                class="text-teal fw-bold ms-2"
              >
                View
              </a>
            </div>

            <!-- Optional File Dropzone -->
            <div 
              class="upload-dropzone p-3 text-center rounded-3 border-2 border-dashed"
              :class="{ 'border-teal bg-teal-light': isEditDragging, 'border-secondary-subtle': !isEditDragging }"
              @dragover.prevent="isEditDragging = true"
              @dragleave.prevent="isEditDragging = false"
              @drop.prevent="handleEditFileDrop"
              @click="$refs.editFileInput.click()"
            >
              <input 
                ref="editFileInput"
                type="file"
                accept=".pdf,application/pdf"
                class="d-none"
                @change="handleEditFileSelect"
              />

              <div v-if="!editFile">
                <span class="fw-bold small text-dark d-block">Replace PDF (Optional)</span>
                <span class="text-muted small">Click or drag &amp; drop a new PDF to overwrite</span>
              </div>

              <div v-else class="d-flex align-items-center justify-content-between bg-white p-2 rounded-3 shadow-sm text-start">
                <div class="d-flex align-items-center gap-2 text-truncate">
                  <i class="fas fa-file-pdf text-success fa-lg"></i>
                  <div class="text-truncate">
                    <div class="fw-bold text-dark small text-truncate">{{ editFile.name }}</div>
                    <div class="text-success small">{{ formatBytes(editFile.size) }} (Ready to upload)</div>
                  </div>
                </div>
                <button 
                  type="button" 
                  class="btn btn-sm btn-outline-danger border-0 rounded-circle"
                  @click.stop="editFile = null"
                  title="Remove replacement file"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Buttons -->
          <div class="d-flex gap-2 pt-2 border-top mt-4">
            <button 
              type="button" 
              class="btn btn-light rounded-pill flex-fill fw-semibold py-2"
              @click="closeEditModal"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="btn btn-teal text-white rounded-pill flex-fill fw-bold py-2 shadow-sm"
              :disabled="isUpdating"
            >
              <span v-if="isUpdating" class="spinner-border spinner-border-sm me-1"></span>
              <span>{{ isUpdating ? 'Saving Changes...' : 'Save Changes' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import BaseUrl from '@/services/baseURL';

const form = ref({
  title: '',
  year: new Date().getFullYear().toString(),
  releaseDate: new Date().toISOString().split('T')[0],
  description: ''
});

const selectedFile = ref(null);
const isDragging = ref(false);
const isSubmitting = ref(false);
const isLoadingList = ref(false);
const successMessage = ref('');
const errorMessage = ref('');
const publications = ref([]);

// Search and Filter State
const searchQuery = ref('');
const selectedYearFilter = ref('All');

// Delete Modal State
const showDeleteModal = ref(false);
const itemToDelete = ref(null);
const isDeleting = ref(false);

// Edit Modal State
const showEditModal = ref(false);
const editForm = ref({
  id: null,
  title: '',
  year: '',
  releaseDate: '',
  description: '',
  currentFileName: '',
  currentFileSize: '',
  currentUrl: ''
});
const editFile = ref(null);
const isEditDragging = ref(false);
const isUpdating = ref(false);
const editErrorMessage = ref('');

const apiBase = BaseUrl.baseUrl || 'http://localhost:8096';

const activeCount = computed(() => {
  return publications.value.filter(p => p.active).length;
});

const availableYears = computed(() => {
  const years = new Set(publications.value.map(p => p.year).filter(Boolean));
  if (years.size === 0) {
    return ['All', '2026', '2025', '2024'];
  }
  const sorted = Array.from(years).sort((a, b) => b.localeCompare(a));
  return ['All', ...sorted];
});

const yearsCoverage = computed(() => {
  if (publications.value.length === 0) return '2024 - 2026';
  const years = publications.value
    .map(p => parseInt(p.year))
    .filter(y => !isNaN(y))
    .sort((a, b) => a - b);
  if (years.length === 0) return '2024 - 2026';
  const min = years[0];
  const max = years[years.length - 1];
  return min === max ? `${min}` : `${min} - ${max}`;
});

const totalStorage = computed(() => {
  if (publications.value.length === 0) return '0.0 MB';
  let totalBytes = 0;
  publications.value.forEach(p => {
    if (!p.fileSize) return;
    const sizeStr = p.fileSize.toString().trim().toUpperCase();
    const num = parseFloat(sizeStr);
    if (isNaN(num)) return;
    if (sizeStr.includes('GB')) totalBytes += num * 1024 * 1024 * 1024;
    else if (sizeStr.includes('MB')) totalBytes += num * 1024 * 1024;
    else if (sizeStr.includes('KB')) totalBytes += num * 1024;
    else if (sizeStr.includes('B')) totalBytes += num;
    else totalBytes += num * 1024;
  });
  if (totalBytes === 0) return '0.0 MB';
  return formatBytes(totalBytes);
});

const filteredPublications = computed(() => {
  return publications.value.filter(pub => {
    const matchesYear = selectedYearFilter.value === 'All' || pub.year === selectedYearFilter.value;
    const q = searchQuery.value.toLowerCase().trim();
    const matchesQuery = !q || 
      (pub.title && pub.title.toLowerCase().includes(q)) || 
      (pub.description && pub.description.toLowerCase().includes(q)) ||
      (pub.year && pub.year.toLowerCase().includes(q)) ||
      (pub.releaseDate && pub.releaseDate.toLowerCase().includes(q));
    return matchesYear && matchesQuery;
  });
});

const formatBytes = (bytes, decimals = 1) => {
  if (!bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const formatReleaseDateForInput = (dateStr) => {
  if (!dateStr) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) {
    return d.toISOString().split('T')[0];
  }
  return dateStr;
};

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      errorMessage.value = 'Please upload a valid PDF document.';
      selectedFile.value = null;
      return;
    }
    selectedFile.value = file;
    errorMessage.value = '';
  }
};

const handleFileDrop = (event) => {
  isDragging.value = false;
  const file = event.dataTransfer.files[0];
  if (file) {
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      errorMessage.value = 'Please upload a valid PDF document.';
      return;
    }
    selectedFile.value = file;
    errorMessage.value = '';
  }
};

const handleEditFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      editErrorMessage.value = 'Please upload a valid PDF document.';
      editFile.value = null;
      return;
    }
    editFile.value = file;
    editErrorMessage.value = '';
  }
};

const handleEditFileDrop = (event) => {
  isEditDragging.value = false;
  const file = event.dataTransfer.files[0];
  if (file) {
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      editErrorMessage.value = 'Please upload a valid PDF document.';
      return;
    }
    editFile.value = file;
    editErrorMessage.value = '';
  }
};

const fetchPublications = async () => {
  isLoadingList.value = true;
  try {
    const res = await axios.get(`${apiBase}/api/v1/publications/all`);
    publications.value = Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    // Fallback to public endpoint if /all not available
    try {
      const publicRes = await axios.get(`${apiBase}/api/v1/publications`);
      publications.value = Array.isArray(publicRes.data) ? publicRes.data : [];
    } catch (e) {
      console.error('Failed to load publications:', e);
    }
  } finally {
    isLoadingList.value = false;
  }
};

const handleSubmit = async () => {
  if (!selectedFile.value) {
    errorMessage.value = 'Please choose a PDF file to upload.';
    return;
  }

  isSubmitting.value = true;
  errorMessage.value = '';
  successMessage.value = '';

  try {
    const formData = new FormData();
    formData.append('title', form.value.title);
    formData.append('year', form.value.year);
    formData.append('description', form.value.description);
    formData.append('releaseDate', form.value.releaseDate);
    formData.append('file', selectedFile.value);

    await axios.post(`${apiBase}/api/v1/publications`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    successMessage.value = `Publication "${form.value.title}" successfully uploaded and saved!`;

    // Reset Form
    form.value.title = '';
    form.value.description = '';
    selectedFile.value = null;

    // Refresh publications list
    await fetchPublications();
  } catch (err) {
    console.error('Upload failed:', err);
    errorMessage.value = err.response?.data?.message || err.message || 'Failed to upload publication. Please verify server connection.';
  } finally {
    isSubmitting.value = false;
  }
};

// Delete Handlers
const openDeleteModal = (pub) => {
  itemToDelete.value = pub;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  itemToDelete.value = null;
};

const executeDelete = async () => {
  if (!itemToDelete.value) return;
  isDeleting.value = true;
  try {
    await axios.delete(`${apiBase}/api/v1/publications/${itemToDelete.value.id}`);
    successMessage.value = `Publication "${itemToDelete.value.title}" deleted successfully.`;
    closeDeleteModal();
    await fetchPublications();
  } catch (err) {
    console.error('Delete failed:', err);
    errorMessage.value = 'Failed to delete publication.';
    closeDeleteModal();
  } finally {
    isDeleting.value = false;
  }
};

// Edit Handlers
const openEditModal = (pub) => {
  editForm.value = {
    id: pub.id,
    title: pub.title || '',
    year: pub.year || '',
    releaseDate: formatReleaseDateForInput(pub.releaseDate),
    description: pub.description || '',
    currentFileName: pub.fileName || (pub.url ? pub.url.split('/').pop() : ''),
    currentFileSize: pub.fileSize || 'PDF',
    currentUrl: pub.url || pub.fileUrl || ''
  };
  editFile.value = null;
  editErrorMessage.value = '';
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
  editFile.value = null;
  editErrorMessage.value = '';
};

const handleUpdate = async () => {
  if (!editForm.value.title || !editForm.value.year || !editForm.value.releaseDate || !editForm.value.description) {
    editErrorMessage.value = 'Please fill in all required fields.';
    return;
  }

  isUpdating.value = true;
  editErrorMessage.value = '';

  try {
    const formData = new FormData();
    formData.append('title', editForm.value.title);
    formData.append('year', editForm.value.year);
    formData.append('description', editForm.value.description);
    formData.append('releaseDate', editForm.value.releaseDate);
    if (editFile.value) {
      formData.append('file', editFile.value);
    }

    await axios.put(`${apiBase}/api/v1/publications/${editForm.value.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    successMessage.value = `Publication "${editForm.value.title}" successfully updated!`;
    closeEditModal();
    await fetchPublications();
  } catch (err) {
    console.error('Update failed:', err);
    editErrorMessage.value = err.response?.data?.message || err.response?.data || err.message || 'Failed to update publication.';
  } finally {
    isUpdating.value = false;
  }
};

const getPdfUrl = (pub) => {
  const url = pub.url || pub.fileUrl;
  if (!url || url === '#') return '#';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${apiBase}${url.startsWith('/') ? '' : '/'}${url}`;
};

onMounted(fetchPublications);
</script>

<style scoped>
.admin-publications-page {
  background-color: #f8f9fa;
  min-height: 100vh;
  padding-top: 100px;
}

.text-dark-teal {
  color: #0c2a38;
}

.bg-teal-light {
  background-color: rgba(0, 124, 145, 0.1);
}

.text-teal {
  color: #007c91;
}

.btn-teal {
  background-color: #007c91;
  border-color: #007c91;
}

.btn-teal:hover {
  background-color: #006071;
  border-color: #006071;
}

.btn-outline-teal {
  color: #007c91;
  border-color: #007c91;
}

.btn-outline-teal:hover {
  background-color: #007c91;
  color: white;
}

.border-teal {
  border-color: #007c91 !important;
}

.upload-dropzone {
  cursor: pointer;
  background-color: #fbfcfd;
  transition: all 0.2s ease-in-out;
}

.upload-dropzone:hover {
  background-color: rgba(0, 124, 145, 0.04);
}

.transition-hover {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.transition-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.custom-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(6px);
  z-index: 1050;
}

.custom-modal-content {
  background: #ffffff;
  animation: modalFadeIn 0.2s ease-out;
}

.modal-icon-badge {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  border: 1px solid rgba(255, 193, 7, 0.3);
}

.kpi-icon-box {
  width: 44px;
  height: 44px;
}

.publication-card {
  border-left: 4px solid #007c91 !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.publication-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 124, 145, 0.08) !important;
}

.circular-action-btn {
  width: 32px;
  height: 32px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease-in-out;
}

.circular-action-btn:hover {
  background-color: rgba(0, 124, 145, 0.08);
}

.publish-btn {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.publish-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(0, 124, 145, 0.25) !important;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
