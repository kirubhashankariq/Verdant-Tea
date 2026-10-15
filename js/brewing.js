/**
 * VERDANT TEA ATELIER - BREWING GUIDE JAVASCRIPT
 * Handles:
 * 1. Tea Varietal Preset Switcher
 * 2. Temperature Unit Toggle (°C / °F)
 * 3. Interactive Leaf & Water Ratio Calculator
 * 4. Live Digital Steeping Timer with Web Audio API chime
 * 5. Vessel Selector Interactive Details
 */

(function () {
  'use strict';

  // Tea parameters database
  const teaPresets = {
    gyokuro: {
      name: 'Uji Ceremonial Gyokuro',
      type: 'Shaded Green Tea',
      tempC: 60,
      tempF: 140,
      leafPer100ml: 5.0,
      timeSeconds: 90,
      infusions: '3-4 steeps',
      notes: 'Brew with cool water to preserve rich l-theanine umami. High temperatures will cause bitterness.',
      steps: ['Cool boiling water down to 60°C (140°F)', 'Warm the kyusu vessel with water, then discard', 'Add 5g of leaves per 100ml water', 'Steep for 90 seconds without swirling or agitating', 'Pour down to the very last drops where flavors concentrate']
    },
    sencha: {
      name: 'High Mountain Sencha Asamushi',
      type: 'Light Steamed Green',
      tempC: 75,
      tempF: 167,
      leafPer100ml: 3.5,
      timeSeconds: 60,
      infusions: '3 steeps',
      notes: 'Balanced astringency and sweet grassy fragrance. Pour gently in alternating cups to equalize strength.',
      steps: ['Use filtered soft water heated to 75°C (167°F)', 'Measure 4g of needle-like leaves into clay kyusu', 'Pour 150ml of water gently around edges', 'Steep precisely for 60 seconds', 'For second steep, increase temperature slightly to 80°C and brew for only 20 seconds']
    },
    dahongpao: {
      name: 'Da Hong Pao Rock Oolong',
      type: 'Wuyi Cliff Yan Cha',
      tempC: 95,
      tempF: 203,
      leafPer100ml: 6.0,
      timeSeconds: 30,
      infusions: '8-10 Gongfu steeps',
      notes: 'High heat activates the charcoal rock rhyme (Yan Yun). Perform a quick 5-second flash rinse before drinking.',
      steps: ['Perform a 5-second hot rinse to awaken the tightly curled leaves', 'Use boiling water at 95°C–98°C', 'Steep first infusion for 25–30 seconds', 'Decant completely into a fairness pitcher (Cha Hai)', 'Increase infusion time by 10 seconds for each subsequent steep']
    },
    silverneedle: {
      name: 'Silver Needle (Bai Hao Yin Zhen)',
      type: 'Imperial White Tea',
      tempC: 80,
      tempF: 176,
      leafPer100ml: 3.0,
      timeSeconds: 180,
      infusions: '4-5 steeps',
      notes: 'Delicate downy buds require gentle steeping. Can be brewed longer without developing harsh tannins.',
      steps: ['Heat mountain spring water to 80°C (176°F)', 'Add whole silvery buds into a clear glass pitcher or gaiwan', 'Observe the vertical dancing leaves as they slowly hydrate', 'Infuse for 3 full minutes (180s) to extract subtle melon notes', 'Leaves remain sweet through four extended infusions']
    },
    darjeeling: {
      name: 'Castleton First Flush Black',
      type: 'High Elevation Black',
      tempC: 90,
      tempF: 194,
      leafPer100ml: 2.5,
      timeSeconds: 150,
      infusions: '2-3 steeps',
      notes: 'First flush Darjeelings are lightly oxidized. Avoid rolling boiling water to retain the delicate floral muscatel.',
      steps: ['Boil water and let cool for 90 seconds to reach 90°C', 'Warm porcelain teapot thoroughly', 'Add 3g loose leaf per 200ml cup', 'Steep undisturbed for 2 minutes and 30 seconds', 'Decant immediately to prevent over-extraction']
    },
    chamomile: {
      name: 'Egyptian Chamomile & Lavender',
      type: 'Herbal Botanical Blend',
      tempC: 100,
      tempF: 212,
      leafPer100ml: 2.0,
      timeSeconds: 300,
      infusions: '1-2 extended infusions',
      notes: 'Whole botanical flowers benefit from rolling boiling water and a long covered steep to release essential calming oils.',
      steps: ['Bring freshly drawn water to a full rolling boil (100°C / 212°F)', 'Place whole flower heads in a covered teapot or infuser', 'Cover tightly to trap aromatic herbal steam and essential oils', 'Steep for 5 full minutes (300 seconds)', 'Pour amber golden liqueur into your favorite ceramic cup']
    }
  };

  // State
  let currentKey = 'gyokuro';
  let tempUnit = 'C';
  let timerDuration = 90;
  let timerRemaining = 90;
  let timerInterval = null;
  let isTimerRunning = false;

  // Web Audio Chime Synthesizer
  function playTeaBell() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      // Fundamental tone (Singing bowl ~528Hz Solfeggio Love frequency)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(528, ctx.currentTime);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(532, ctx.currentTime); // Slight beating for resonant bowl effect

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.5);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 3.6);
      osc2.stop(ctx.currentTime + 3.6);
    } catch (e) {
      console.log('Audio playback prevented or unsupported');
    }
  }

  function initBrewingGuide() {
    const calcSection = document.getElementById('brewingCalculatorSection');
    if (!calcSection) return;

    // Varietal Buttons
    const varietalButtons = document.querySelectorAll('.tea-varietal-btn');
    varietalButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        varietalButtons.forEach(b => {
          b.classList.remove('bg-stone-900', 'text-stone-50', 'dark:bg-stone-100', 'dark:text-stone-900', 'font-semibold');
          b.classList.add('bg-stone-100', 'text-stone-700', 'dark:bg-stone-800', 'dark:text-stone-300');
        });
        btn.classList.remove('bg-stone-100', 'text-stone-700', 'dark:bg-stone-800', 'dark:text-stone-300');
        btn.classList.add('bg-stone-900', 'text-stone-50', 'dark:bg-stone-100', 'dark:text-stone-900', 'font-semibold');

        currentKey = btn.getAttribute('data-tea');
        updateBrewingParameters();
      });
    });

    // Temp unit buttons
    const btnC = document.getElementById('tempUnitC');
    const btnF = document.getElementById('tempUnitF');
    if (btnC && btnF) {
      btnC.addEventListener('click', () => {
        tempUnit = 'C';
        btnC.classList.add('bg-stone-900', 'text-stone-50', 'dark:bg-stone-100', 'dark:text-stone-900');
        btnC.classList.remove('bg-stone-200', 'text-stone-700', 'dark:bg-stone-700', 'dark:text-stone-300');
        btnF.classList.remove('bg-stone-900', 'text-stone-50', 'dark:bg-stone-100', 'dark:text-stone-900');
        btnF.classList.add('bg-stone-200', 'text-stone-700', 'dark:bg-stone-700', 'dark:text-stone-300');
        updateBrewingParameters();
      });

      btnF.addEventListener('click', () => {
        tempUnit = 'F';
        btnF.classList.add('bg-stone-900', 'text-stone-50', 'dark:bg-stone-100', 'dark:text-stone-900');
        btnF.classList.remove('bg-stone-200', 'text-stone-700', 'dark:bg-stone-700', 'dark:text-stone-300');
        btnC.classList.remove('bg-stone-900', 'text-stone-50', 'dark:bg-stone-100', 'dark:text-stone-900');
        btnC.classList.add('bg-stone-200', 'text-stone-700', 'dark:bg-stone-700', 'dark:text-stone-300');
        updateBrewingParameters();
      });
    }

    // Water volume slider
    const waterSlider = document.getElementById('waterVolumeSlider');
    const waterValueDisplay = document.getElementById('waterVolumeDisplay');
    const leafValueDisplay = document.getElementById('leafWeightDisplay');
    if (waterSlider) {
      waterSlider.addEventListener('input', (e) => {
        const ml = parseInt(e.target.value, 10);
        if (waterValueDisplay) waterValueDisplay.textContent = `${ml} ml`;
        const preset = teaPresets[currentKey];
        if (leafValueDisplay && preset) {
          const grams = ((ml / 100) * preset.leafPer100ml).toFixed(1);
          leafValueDisplay.textContent = `${grams} g (${preset.name})`;
        }
      });
    }

    // Timer buttons
    const startTimerBtn = document.getElementById('startTimerBtn');
    const pauseTimerBtn = document.getElementById('pauseTimerBtn');
    const resetTimerBtn = document.getElementById('resetTimerBtn');

    if (startTimerBtn) startTimerBtn.addEventListener('click', startTimer);
    if (pauseTimerBtn) pauseTimerBtn.addEventListener('click', pauseTimer);
    if (resetTimerBtn) resetTimerBtn.addEventListener('click', resetTimer);

    // Initial load
    updateBrewingParameters();
  }

  function updateBrewingParameters() {
    const preset = teaPresets[currentKey];
    if (!preset) return;

    // Reset timer to preset duration
    timerDuration = preset.timeSeconds;
    timerRemaining = preset.timeSeconds;
    pauseTimer();
    renderTimerDisplay();

    // Update displays
    const titleEl = document.getElementById('paramTeaTitle');
    const typeEl = document.getElementById('paramTeaType');
    const tempEl = document.getElementById('paramTeaTemp');
    const timeEl = document.getElementById('paramTeaTime');
    const infusionsEl = document.getElementById('paramTeaInfusions');
    const notesEl = document.getElementById('paramTeaNotes');
    const stepsEl = document.getElementById('paramTeaSteps');

    if (titleEl) titleEl.textContent = preset.name;
    if (typeEl) typeEl.textContent = preset.type;
    if (tempEl) {
      tempEl.textContent = tempUnit === 'C' ? `${preset.tempC}°C` : `${preset.tempF}°F`;
    }
    if (timeEl) {
      const mins = Math.floor(preset.timeSeconds / 60);
      const secs = preset.timeSeconds % 60;
      timeEl.textContent = `${mins}m ${secs > 0 ? secs + 's' : ''}`;
    }
    if (infusionsEl) infusionsEl.textContent = preset.infusions;
    if (notesEl) notesEl.textContent = preset.notes;

    if (stepsEl) {
      stepsEl.innerHTML = preset.steps.map((st, i) => `
        <li class="flex items-start gap-3">
          <span class="w-5 h-5 flex items-center justify-center bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 font-mono text-xs font-semibold flex-shrink-0">
            ${i + 1}
          </span>
          <span class="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">${st}</span>
        </li>
      `).join('');
    }

    // Trigger water slider calculation
    const waterSlider = document.getElementById('waterVolumeSlider');
    if (waterSlider) {
      waterSlider.dispatchEvent(new Event('input'));
    }
  }

  function startTimer() {
    if (isTimerRunning) return;
    if (timerRemaining <= 0) timerRemaining = timerDuration;

    isTimerRunning = true;
    toggleTimerButtonStates();

    timerInterval = setInterval(() => {
      timerRemaining--;
      renderTimerDisplay();

      if (timerRemaining <= 0) {
        clearInterval(timerInterval);
        isTimerRunning = false;
        toggleTimerButtonStates();
        playTeaBell();
        if (window.showToast) {
          window.showToast(`Steep Complete! Pour your ${teaPresets[currentKey].name} immediately.`);
        }
      }
    }, 1000);
  }

  function pauseTimer() {
    if (timerInterval) clearInterval(timerInterval);
    isTimerRunning = false;
    toggleTimerButtonStates();
  }

  function resetTimer() {
    pauseTimer();
    timerRemaining = timerDuration;
    renderTimerDisplay();
  }

  function toggleTimerButtonStates() {
    const startBtn = document.getElementById('startTimerBtn');
    const pauseBtn = document.getElementById('pauseTimerBtn');
    if (!startBtn || !pauseBtn) return;

    if (isTimerRunning) {
      startBtn.classList.add('opacity-50', 'cursor-not-allowed');
      pauseBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    } else {
      startBtn.classList.remove('opacity-50', 'cursor-not-allowed');
      pauseBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }
  }

  function renderTimerDisplay() {
    const timeDisplay = document.getElementById('digitalTimerDisplay');
    const progressEl = document.getElementById('timerProgressBar');
    if (!timeDisplay) return;

    const mins = Math.floor(Math.max(0, timerRemaining) / 60);
    const secs = Math.max(0, timerRemaining) % 60;
    timeDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    if (progressEl && timerDuration > 0) {
      const percentage = ((timerDuration - timerRemaining) / timerDuration) * 100;
      progressEl.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
    }
  }

  document.addEventListener('DOMContentLoaded', initBrewingGuide);
})();
