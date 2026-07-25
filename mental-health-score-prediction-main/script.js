/* ==========================================================================
   MindPulse — script.js
   Vanilla JS: validation, API call, result rendering, loading, errors.
   ========================================================================== */

(() => {
  'use strict';

  // --------------------------------------------------------------------
  // Config
  // --------------------------------------------------------------------
  const API_BASE_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost')
    ? 'http://127.0.0.1:8000'
    : 'https://mental-health-score-prediction-z3w7.onrender.com';
  const PREDICT_ENDPOINT = `${API_BASE_URL}/predict`;

  const GAUGE_CIRCUMFERENCE = 2 * Math.PI * 92; // r = 92, matches SVG + CSS

  // --------------------------------------------------------------------
  // Element refs
  // --------------------------------------------------------------------
  const form = document.getElementById('predictForm');
  const submitBtn = document.getElementById('submitBtn');
  const resetBtn = document.getElementById('resetBtn');
  const tryAgainBtn = document.getElementById('tryAgainBtn');
  const formStatus = document.getElementById('formStatus');

  const resultSection = document.getElementById('result-section');
  const gaugeFill = document.getElementById('gaugeFill');
  const scoreNumber = document.getElementById('scoreNumber');
  const scoreBadge = document.getElementById('scoreBadge');
  const resultInterpretation = document.getElementById('resultInterpretation');
  const progressFill = document.getElementById('progressFill');

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Fields that require numeric validation, mapped to constraints
  const NUMERIC_FIELDS = {
    age: { min: 10, max: 100, label: 'age' },
    avg_daily_usage_hours: { min: 0, max: 24, label: 'average daily usage hours' },
    daily_unlocks: { min: 0, max: 100000, label: 'daily unlocks' },
    study_hours: { min: 0, max: 24, label: 'study hours' },
    physical_activity_hours: { min: 0, max: 24, label: 'physical activity hours' },
    sleep_hours_per_night: { min: 0, max: 24, label: 'sleep hours' },
  };

  const REQUIRED_SELECT_FIELDS = [
    'gender',
    'academic_level',
    'most_used_platform',
    'purpose_of_use',
    'stress_level',
  ];

  // ======================================================================
  // Validation
  // ======================================================================
  function clearFieldError(fieldEl) {
    const wrapper = fieldEl.closest('.field');
    if (!wrapper) return;
    wrapper.classList.remove('has-error');
    const errEl = wrapper.querySelector('.field__error');
    if (errEl) errEl.textContent = '';
  }

  function setFieldError(fieldEl, message) {
    const wrapper = fieldEl.closest('.field');
    if (!wrapper) return;
    wrapper.classList.add('has-error');
    const errEl = wrapper.querySelector('.field__error');
    if (errEl) errEl.textContent = message;
  }

  function validateForm() {
    let isValid = true;

    // Country (free text, required)
    const countryEl = document.getElementById('country');
    clearFieldError(countryEl);
    if (!countryEl.value.trim()) {
      setFieldError(countryEl, 'Please enter a country.');
      isValid = false;
    }

    // Required selects
    REQUIRED_SELECT_FIELDS.forEach((name) => {
      const el = document.getElementById(name);
      clearFieldError(el);
      if (!el.value) {
        setFieldError(el, 'Please make a selection.');
        isValid = false;
      }
    });

    // Numeric fields
    Object.entries(NUMERIC_FIELDS).forEach(([name, rules]) => {
      const el = document.getElementById(name);
      clearFieldError(el);
      const raw = el.value.trim();

      if (raw === '') {
        setFieldError(el, `Please enter a value.`);
        isValid = false;
        return;
      }

      const value = Number(raw);
      if (Number.isNaN(value)) {
        setFieldError(el, 'Must be a number.');
        isValid = false;
        return;
      }

      if (value < rules.min || value > rules.max) {
        setFieldError(el, `Must be between ${rules.min} and ${rules.max}.`);
        isValid = false;
      }
    });

    return isValid;
  }

  // ======================================================================
  // Payload building
  // ======================================================================
  function buildPayload() {
    const data = new FormData(form);
    return {
      age: Number(data.get('age')),
      gender: data.get('gender'),
      country: data.get('country').trim(),
      academic_level: data.get('academic_level'),
      most_used_platform: data.get('most_used_platform'),
      purpose_of_use: data.get('purpose_of_use'),
      avg_daily_usage_hours: Number(data.get('avg_daily_usage_hours')),
      daily_unlocks: Number(data.get('daily_unlocks')),
      study_hours: Number(data.get('study_hours')),
      physical_activity_hours: Number(data.get('physical_activity_hours')),
      sleep_hours_per_night: Number(data.get('sleep_hours_per_night')),
      stress_level: data.get('stress_level'),
    };
  }

  // ======================================================================
  // API call
  // ======================================================================
  async function fetchPrediction(payload) {
    const response = await fetch(PREDICT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      let detailMessage = `Request failed with status ${response.status}.`;
      try {
        const errBody = await response.json();
        if (errBody && errBody.detail) {
          detailMessage = Array.isArray(errBody.detail)
            ? errBody.detail.map((d) => d.msg).join(' ')
            : String(errBody.detail);
        }
      } catch (_) {
        /* response wasn't JSON — keep default message */
      }
      throw new Error(detailMessage);
    }

    return response.json();
  }

  // ======================================================================
  // Loading state
  // ======================================================================
  function setLoading(isLoading) {
    submitBtn.classList.toggle('is-loading', isLoading);
    submitBtn.disabled = isLoading;
    submitBtn.setAttribute('aria-busy', String(isLoading));
  }

  // ======================================================================
  // Error handling / status messaging
  // ======================================================================
  function showStatus(message, type = 'error') {
    formStatus.textContent = message;
    formStatus.classList.toggle('is-success', type === 'success');
  }

  function clearStatus() {
    formStatus.textContent = '';
    formStatus.classList.remove('is-success');
  }

  // ======================================================================
  // Result rendering
  // ======================================================================
  function getTier(score) {
    if (score < 3) {
      return { key: 'poor', label: 'Poor', text: 'Your habits are taking a real toll right now. Consider trimming late-night screen time and protecting your sleep window — small, consistent changes tend to move this number the most.' };
    }
    if (score < 5) {
      return { key: 'fair', label: 'Fair', text: 'You\'re holding steady, but a few areas — sleep, movement, or usage — are pulling the score down. Worth a closer look at where your day actually goes.' };
    }
    if (score < 7) {
      return { key: 'good', label: 'Good', text: 'Solid balance overall. Your habits are broadly supportive of your wellbeing, with some room to fine-tune for an even steadier baseline.' };
    }
    return { key: 'excellent', label: 'Excellent', text: 'Your daily rhythm — sleep, activity, and screen time — is working in your favor. Keep doing what you\'re doing.' };
  }

  function animateCount(el, targetValue, duration = 900) {
    const start = performance.now();
    const from = 0;

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = from + (targetValue - from) * eased;
      el.textContent = current.toFixed(1);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = targetValue.toFixed(1);
    }
    requestAnimationFrame(tick);
  }

  function renderResult(score) {
    const clamped = Math.max(0, Math.min(10, score));
    const tier = getTier(clamped);

    resultSection.hidden = false;
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Gauge ring
    const fraction = clamped / 10;
    const offset = GAUGE_CIRCUMFERENCE * (1 - fraction);
    requestAnimationFrame(() => {
      gaugeFill.style.strokeDashoffset = String(offset);
    });

    const tierColorVar = {
      poor: 'var(--tier-poor)',
      fair: 'var(--tier-fair)',
      good: 'var(--tier-good)',
      excellent: 'var(--tier-excellent)',
    }[tier.key];
    gaugeFill.style.stroke = tierColorVar;

    // Score number counter
    animateCount(scoreNumber, clamped);

    // Badge
    scoreBadge.textContent = tier.label;
    scoreBadge.setAttribute('data-tier', tier.key);

    // Interpretation copy
    resultInterpretation.textContent = tier.text;

    // Progress bar
    requestAnimationFrame(() => {
      progressFill.style.width = `${fraction * 100}%`;
    });

    // Reveal animation on the card itself
    const resultCard = document.getElementById('resultCard');
    resultCard.classList.remove('is-visible');
    resultCard.offsetHeight; // force reflow to restart animation
    resultCard.classList.add('is-visible');
  }

  // ======================================================================
  // Form submit
  // ======================================================================
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearStatus();

    if (!validateForm()) {
      showStatus('Please fix the highlighted fields before continuing.');
      return;
    }

    const payload = buildPayload();
    setLoading(true);

    try {
      const result = await fetchPrediction(payload);
      const score = result.predicted_mental_health_score;
      showStatus('Prediction received.', 'success');
      renderResult(score);
    } catch (err) {
      console.error('Prediction request failed:', err);
      const isNetworkError = err instanceof TypeError;
      showStatus(
        isNetworkError
          ? 'Couldn\'t reach the prediction server. Check that the API is running and reachable, then try again.'
          : `Something went wrong: ${err.message}`
      );
    } finally {
      setLoading(false);
    }
  });

  // ======================================================================
  // Reset
  // ======================================================================
  form.addEventListener('reset', () => {
    clearStatus();
    document.querySelectorAll('.field.has-error').forEach((el) => {
      el.classList.remove('has-error');
      const err = el.querySelector('.field__error');
      if (err) err.textContent = '';
    });
  });

  tryAgainBtn.addEventListener('click', () => {
    resultSection.hidden = true;
    document.getElementById('predict-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
    form.reset();
  });

  // Live-clear individual field errors as the user types/selects
  form.querySelectorAll('input, select').forEach((el) => {
    el.addEventListener('input', () => clearFieldError(el));
    el.addEventListener('change', () => clearFieldError(el));
  });

  // ======================================================================
  // Button glow-follow-cursor (ripple/glow effect)
  // ======================================================================
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('pointermove', (e) => {
      const rect = btn.getBoundingClientRect();
      btn.style.setProperty('--x', `${e.clientX - rect.left}px`);
      btn.style.setProperty('--y', `${e.clientY - rect.top}px`);
    });
  });

  // ======================================================================
  // Scroll reveal
  // ======================================================================
  const revealTargets = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  revealTargets.forEach((el) => observer.observe(el));
})();