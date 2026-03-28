<template>
  <div class="wrapper">
    <div class="card">
      <h1>Kalkulator BMI</h1>

      <div class="inputs">
        <div class="input-group">
          <label>Podaj masę (kg)</label>
          <input 
            v-model="weight" 
            type="number"
            min="0"
            step="0.1"
            placeholder="np. 80" 
          />
        </div>

        <div class="input-group">
          <label>Podaj wzrost (cm)</label>
          <input 
            v-model="height" 
            type="number"
            min="0"
            step="0.1"
            placeholder="np. 190" 
          />
        </div>
      </div>

      <transition name="fade">
        <div v-if="bmi !== null" class="result">
          <p class="bmi-value">{{ bmi }}</p>

          <div class="bmi-bar">
            <div 
              class="bmi-fill" 
              :style="{ width: bmiPercent + '%' }">
            </div>
          </div>

          <p class="category" :class="categoryClass">
            {{ category }}
          </p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import './assets/styles.css'

const weight = ref('')
const height = ref('')

const bmi = computed(() => {
  const w = parseFloat(weight.value)
  const h = parseFloat(height.value)

  if (!w || !h || w <= 0 || h <= 0) return null

  const meters = h / 100
  return (w / (meters ** 2)).toFixed(2)
})

const category = computed(() => {
  if (!bmi.value) return ''

  const val = parseFloat(bmi.value)

  if (val < 18.5) return 'Niedowaga'
  if (val < 25) return 'Waga prawidłowa'
  if (val < 30) return 'Nadwaga'
  return 'Otyłość'
})

const categoryClass = computed(() => ({
  underweight: category.value === 'Niedowaga',
  normal: category.value === 'Waga prawidłowa',
  overweight: category.value === 'Nadwaga',
  obese: category.value === 'Otyłość'
}))

// pasek extra dla wygladu ;))
const bmiPercent = computed(() => {
  if (!bmi.value) return 0
  const val = parseFloat(bmi.value)
  return Math.min((val / 40) * 100, 100)
})
</script>