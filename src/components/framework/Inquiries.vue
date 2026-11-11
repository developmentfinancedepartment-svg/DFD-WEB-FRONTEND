<template>
  <div class="inquiries-page py-16 px-4 bg-slate-50 min-h-screen">
    <div class="max-w-xl mx-auto">
      <div class="inquiry-card bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
        <!-- Centered Header -->
        <div class="text-center mb-6">
          <h2 class="inquiry-heading text-2xl font-bold text-slate-900 tracking-tight">
            Submit an Official Inquiry
          </h2>
          <p class="inquiry-subtitle text-sm text-slate-500 max-w-md mx-auto text-center mt-1.5 mb-0 leading-relaxed">
            Have questions regarding credit schemes or policy frameworks? Reach out directly to our dedicated desk.
          </p>
        </div>

        <form action="mailto:dgdf@dfd.treasury.gov.lk" method="post" enctype="text/plain" class="space-y-4">
          <!-- First & Last Name -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="inqFirstName" class="inquiry-label block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                First Name
              </label>
              <input
                type="text"
                id="inqFirstName"
                name="firstName"
                placeholder="e.g. Priyantha"
                required
                class="inquiry-input border border-slate-200 bg-white rounded-xl py-3 px-4 text-sm text-slate-800 placeholder-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-500/10 transition-all outline-none w-full"
              />
            </div>
            <div>
              <label for="inqLastName" class="inquiry-label block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Last Name
              </label>
              <input
                type="text"
                id="inqLastName"
                name="lastName"
                placeholder="e.g. Kumara"
                required
                class="inquiry-input border border-slate-200 bg-white rounded-xl py-3 px-4 text-sm text-slate-800 placeholder-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-500/10 transition-all outline-none w-full"
              />
            </div>
          </div>

          <!-- Contact Number & Email -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="inqPhone" class="inquiry-label block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Contact Number
              </label>
              <input
                type="tel"
                id="inqPhone"
                name="contactNumber"
                placeholder="07XXXXXXXX"
                required
                class="inquiry-input border border-slate-200 bg-white rounded-xl py-3 px-4 text-sm text-slate-800 placeholder-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-500/10 transition-all outline-none w-full"
              />
            </div>
            <div>
              <label for="inqEmail" class="inquiry-label block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                id="inqEmail"
                name="email"
                placeholder="name@example.com"
                required
                class="inquiry-input border border-slate-200 bg-white rounded-xl py-3 px-4 text-sm text-slate-800 placeholder-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-500/10 transition-all outline-none w-full"
              />
            </div>
          </div>

          <!-- Message -->
          <div>
            <label for="inqMessage" class="inquiry-label block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Message
            </label>
            <textarea
              id="inqMessage"
              name="message"
              rows="5"
              placeholder="How can we help you? Describe your inquiry in detail..."
              required
              class="inquiry-input border border-slate-200 bg-white rounded-xl py-3 px-4 text-sm text-slate-800 placeholder-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-500/10 transition-all outline-none w-full resize-y min-h-[140px]"
            ></textarea>
          </div>

          <!-- Submit Button -->
          <div class="pt-2">
            <button
              type="submit"
              class="inquiry-submit-btn bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-teal-700/20 hover:shadow-xl hover:shadow-teal-700/30 transition-all duration-200 flex items-center justify-center gap-2 w-full text-sm uppercase tracking-wider active:scale-[0.99] cursor-pointer"
            >
              <i class="fas fa-paper-plane text-sm"></i>
              <span>Submit Inquiry</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.inquiry-card {
  background-color: #ffffff;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 20px 25px -5px rgba(226, 232, 240, 0.5), 0 8px 10px -6px rgba(226, 232, 240, 0.5);
  border: 1px solid #f1f5f9;
}

.inquiry-heading {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.02em;
}

.inquiry-subtitle {
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.5;
}

.inquiry-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #475569;
  margin-bottom: 0.375rem;
}

.inquiry-input {
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: #1e293b;
  transition: all 0.2s ease;
  outline: none;
}

.inquiry-input::placeholder {
  color: #94a3b8;
}

.inquiry-input:focus {
  border-color: #0d9488;
  box-shadow: 0 0 0 4px rgba(13, 148, 136, 0.1);
}

.inquiry-submit-btn {
  background: linear-gradient(to right, #0d9488, #0f766e);
  color: #ffffff;
  border: none;
  border-radius: 0.75rem;
  padding: 0.875rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 10px 15px -3px rgba(15, 118, 110, 0.2);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.inquiry-submit-btn:hover {
  background: linear-gradient(to right, #0f766e, #115e59);
  box-shadow: 0 20px 25px -5px rgba(15, 118, 110, 0.3);
  transform: translateY(-1px);
}

.inquiry-submit-btn:active {
  transform: scale(0.99);
}
</style>

<script>
export default {};
</script>