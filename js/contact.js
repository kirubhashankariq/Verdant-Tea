/**
 * VERDANT TEA ATELIER - CONTACT JAVASCRIPT
 * STRICT FORM VALIDATION DIRECTIVES:
 * 1. Name field: Block all numbers. If a user types a number, it MUST NOT appear in the field.
 * 2. Phone field: Block all letters. Only valid phone number characters allowed.
 * 3. Email field: Strict Regex validation before allowing form submission.
 * 4. Interactive Confirmation Modal on valid submission.
 * 5. Interactive FAQ Accordion toggles.
 */

(function () {
  'use strict';

  function initContactForm() {
    const form = document.getElementById('conciergeContactForm');
    const nameInput = document.getElementById('contactName');
    const phoneInput = document.getElementById('contactPhone');
    const emailInput = document.getElementById('contactEmail');
    const inquiryType = document.getElementById('contactInquiryType');
    const messageInput = document.getElementById('contactMessage');

    if (!form || !nameInput || !phoneInput || !emailInput) return;

    // Error message containers
    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    // 1. STRICT NAME INPUT: Block all numbers (0-9) completely
    nameInput.addEventListener('keydown', (e) => {
      // Allow control keys (backspace, delete, tab, arrows, copy/paste shortcuts)
      if (e.key === 'Backspace' || e.key === 'Delete' || e.key === 'Tab' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.ctrlKey || e.metaKey) {
        return;
      }
      // If key is a digit 0-9, BLOCK IT IMMEDIATELY
      if (/[0-9]/.test(e.key)) {
        e.preventDefault();
        showInlineError(nameError, 'Numbers are strictly prohibited in the Name field.');
      }
    });

    nameInput.addEventListener('input', () => {
      // Strip any numbers that might have slipped through
      const originalValue = nameInput.value;
      const sanitized = originalValue.replace(/[0-9]/g, '');
      if (originalValue !== sanitized) {
        nameInput.value = sanitized;
        showInlineError(nameError, 'Numbers were automatically removed.');
      } else {
        clearInlineError(nameError);
      }
      validateName();
    });

    nameInput.addEventListener('paste', (e) => {
      const pasteData = (e.clipboardData || window.clipboardData).getData('text');
      if (/[0-9]/.test(pasteData)) {
        e.preventDefault();
        const cleaned = pasteData.replace(/[0-9]/g, '');
        document.execCommand('insertText', false, cleaned);
        showInlineError(nameError, 'Pasted numbers were removed.');
      }
    });

    // 2. STRICT PHONE INPUT: Block all letters (a-zA-Z)
    phoneInput.addEventListener('keydown', (e) => {
      // Allow control keys
      if (e.key === 'Backspace' || e.key === 'Delete' || e.key === 'Tab' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.ctrlKey || e.metaKey) {
        return;
      }
      // If key is a letter, BLOCK IT IMMEDIATELY
      if (/[a-zA-Z]/.test(e.key)) {
        e.preventDefault();
        showInlineError(phoneError, 'Alphabet letters are strictly prohibited in the Phone field.');
      }
    });

    phoneInput.addEventListener('input', () => {
      const original = phoneInput.value;
      // Allow only numbers, plus sign, dash, parentheses, and spaces
      const sanitized = original.replace(/[^0-9+\-()\s]/g, '');
      if (original !== sanitized) {
        phoneInput.value = sanitized;
        showInlineError(phoneError, 'Letters and invalid symbols were removed.');
      } else {
        clearInlineError(phoneError);
      }
      validatePhone();
    });

    phoneInput.addEventListener('paste', (e) => {
      const pasteData = (e.clipboardData || window.clipboardData).getData('text');
      if (/[a-zA-Z]/.test(pasteData)) {
        e.preventDefault();
        const cleaned = pasteData.replace(/[^0-9+\-()\s]/g, '');
        document.execCommand('insertText', false, cleaned);
        showInlineError(phoneError, 'Pasted letters were removed.');
      }
    });

    // 3. STRICT EMAIL INPUT: Strict Regex verification
    const STRICT_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

    emailInput.addEventListener('input', () => {
      clearInlineError(emailError);
    });

    emailInput.addEventListener('blur', () => {
      validateEmail();
    });

    function validateName() {
      const val = nameInput.value.trim();
      if (!val) {
        showInlineError(nameError, 'Full Name is required.');
        return false;
      }
      if (val.length < 2) {
        showInlineError(nameError, 'Please enter at least 2 characters.');
        return false;
      }
      clearInlineError(nameError);
      return true;
    }

    function validatePhone() {
      const val = phoneInput.value.trim();
      if (!val) {
        showInlineError(phoneError, 'Phone number is required.');
        return false;
      }
      // Must contain at least 7 digits
      const digitsCount = (val.match(/\d/g) || []).length;
      if (digitsCount < 7) {
        showInlineError(phoneError, 'Please enter a valid telephone number with at least 7 digits.');
        return false;
      }
      clearInlineError(phoneError);
      return true;
    }

    function validateEmail() {
      const val = emailInput.value.trim();
      if (!val) {
        showInlineError(emailError, 'Email address is required.');
        return false;
      }
      if (!STRICT_EMAIL_REGEX.test(val)) {
        showInlineError(emailError, 'Please enter a valid email address (e.g., sommelier@atelier.com).');
        return false;
      }
      clearInlineError(emailError);
      return true;
    }

    function validateMessage() {
      if (!messageInput) return true;
      const val = messageInput.value.trim();
      if (!val) {
        showInlineError(messageError, 'Message or consultation request is required.');
        return false;
      }
      if (val.length < 10) {
        showInlineError(messageError, 'Please describe your inquiry in at least 10 characters.');
        return false;
      }
      clearInlineError(messageError);
      return true;
    }

    function showInlineError(el, msg) {
      if (!el) return;
      el.textContent = msg;
      el.classList.remove('hidden');
    }

    function clearInlineError(el) {
      if (!el) return;
      el.textContent = '';
      el.classList.add('hidden');
    }

    // FORM SUBMISSION EVENT LISTENER
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateName();
      const isPhoneValid = validatePhone();
      const isEmailValid = validateEmail();
      const isMsgValid = validateMessage();

      if (!isNameValid || !isPhoneValid || !isEmailValid || !isMsgValid) {
        if (window.showToast) {
          window.showToast('Please correct form errors before submission.');
        }
        return;
      }

      // Submission Success - Open interactive modal
      const inquiryData = {
        id: 'CONCIERGE-' + Math.floor(100000 + Math.random() * 900000),
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        type: inquiryType ? inquiryType.value : 'Private Salon Tasting',
        message: messageInput ? messageInput.value.trim() : ''
      };

      openSubmissionSuccessModal(inquiryData);
      form.reset();
    });
  }

  function openSubmissionSuccessModal(data) {
    const modal = document.getElementById('contactSuccessModal');
    const backdrop = document.getElementById('contactSuccessBackdrop');
    const detailsEl = document.getElementById('contactModalDetails');

    if (!modal || !backdrop) {
      alert(`Inquiry Confirmed! Dossier ID: ${data.id}. Our Head Sommelier will contact ${data.name} shortly.`);
      return;
    }

    if (detailsEl) {
      detailsEl.innerHTML = `
        <div class="space-y-2 text-xs font-mono text-stone-600 dark:text-stone-300 border-t border-b border-stone-200 dark:border-stone-800 py-3 my-3">
          <div class="flex justify-between"><span>Dossier Reference:</span><span class="font-bold text-stone-900 dark:text-stone-100">${data.id}</span></div>
          <div class="flex justify-between"><span>Guest Name:</span><span class="font-bold text-stone-900 dark:text-stone-100">${data.name}</span></div>
          <div class="flex justify-between"><span>Verified Email:</span><span>${data.email}</span></div>
          <div class="flex justify-between"><span>Verified Phone:</span><span>${data.phone}</span></div>
          <div class="flex justify-between"><span>Nature of Inquiry:</span><span class="text-emerald-700 dark:text-emerald-400 font-semibold">${data.type}</span></div>
        </div>
      `;
    }

    modal.classList.remove('hidden');
    backdrop.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    if (window.showToast) {
      window.showToast('Inquiry Transmitted to Head Sommelier');
    }
  }

  window.closeContactSuccessModal = function () {
    const modal = document.getElementById('contactSuccessModal');
    const backdrop = document.getElementById('contactSuccessBackdrop');
    if (modal) modal.classList.add('hidden');
    if (backdrop) backdrop.classList.add('hidden');
    document.body.style.overflow = '';
  };

  // FAQ Accordion Handler
  function initFaqAccordion() {
    const faqButtons = document.querySelectorAll('.faq-toggle-btn');
    faqButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        const icon = btn.querySelector('.faq-icon');
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';

        // Close other FAQs for clean aesthetic
        faqButtons.forEach(otherBtn => {
          if (otherBtn !== btn) {
            otherBtn.setAttribute('aria-expanded', 'false');
            const otherContent = otherBtn.nextElementSibling;
            const otherIcon = otherBtn.querySelector('.faq-icon');
            if (otherContent) otherContent.classList.add('hidden');
            if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
          }
        });

        // Toggle current
        if (isExpanded) {
          btn.setAttribute('aria-expanded', 'false');
          if (content) content.classList.add('hidden');
          if (icon) icon.style.transform = 'rotate(0deg)';
        } else {
          btn.setAttribute('aria-expanded', 'true');
          if (content) content.classList.remove('hidden');
          if (icon) icon.style.transform = 'rotate(45deg)';
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
    initFaqAccordion();

    const closeBtn = document.getElementById('closeContactModalBtn');
    const backdrop = document.getElementById('contactSuccessBackdrop');
    if (closeBtn) closeBtn.addEventListener('click', window.closeContactSuccessModal);
    if (backdrop) backdrop.addEventListener('click', window.closeContactSuccessModal);
  });
})();
