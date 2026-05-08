const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');
const contactForm = document.getElementById('contactForm');

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('mobile-open');
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    menu.classList.remove('mobile-open');
  });
});

let scrollTimeout;
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (!header) return;

  // Hide the header immediately when scrolling
  header.style.transform = 'translateY(-100%)';
  header.style.opacity = '0';

  // Clear timeout to detect when scrolling stops
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    header.style.transform = 'translateY(0)';
    header.style.opacity = '1';
  }, 300); // 300ms after scrolling stops
});

if (window.gsap) {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  gsap.to('.reveal-up', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    stagger: 0.15,
    delay: 0.2,
  });

  gsap.utils.toArray('.section-fade').forEach((section) => {
    gsap.from(section.children, {
      opacity: 0,
      y: 40,
      duration: 1.1,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: section,
        start: 'top 82%',
      },
    });
  });

  gsap.utils.toArray('.gallery-item').forEach((item, i) => {
    gsap.from(item, {
      opacity: 0,
      y: 35,
      scale: 0.96,
      duration: 0.9,
      delay: i * 0.04,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 90%',
      },
    });
  });

  gsap.to('#hero .hero-video', {
    yPercent: 8,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  gsap.utils.toArray('.featured-item').forEach((item) => {
    gsap.from(item, {
      x: -25,
      opacity: 0,
      duration: 0.75,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 88%',
      },
    });
  });
}

// 3D hover depth interactions for premium card feel.
const tiltTargets = document.querySelectorAll('.tilt-card, .gallery-item');

tiltTargets.forEach((el) => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateY = ((x - midX) / midX) * 6;
    const rotateX = -((y - midY) / midY) * 6;

    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
    el.style.transition = 'transform 80ms linear';
  });

  el.addEventListener('mouseleave', () => {
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)';
    el.style.transition = 'transform 300ms ease';
  });
});

if (startDateInput && endDateInput) {
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateString = minDate.toISOString().split('T')[0];
  
  startDateInput.min = minDateString;
  endDateInput.min = minDateString;

  [startDateInput, endDateInput].forEach(input => {
    input.addEventListener('focus', () => {
      if (typeof input.showPicker === 'function') {
        input.showPicker();
      }
    });
  });

  startDateInput.addEventListener('change', () => {
    if (startDateInput.value) {
      endDateInput.min = startDateInput.value;
      if (startDateInput.value < minDateString) {
        startDateInput.setCustomValidity(`Please choose ${minDateString} or later.`);
      } else {
        startDateInput.setCustomValidity('');
      }
    }
    startDateInput.reportValidity();
  });

  endDateInput.addEventListener('change', () => {
    if (endDateInput.value && startDateInput.value && endDateInput.value < startDateInput.value) {
      endDateInput.setCustomValidity('End date cannot be before start date.');
    } else {
      endDateInput.setCustomValidity('');
    }
    endDateInput.reportValidity();
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const fullNameEl = document.getElementById('fullName');
    const emailAddressEl = document.getElementById('emailAddress');
    const customerPhoneEl = document.getElementById('customerPhone');
    const eventTypeEl = document.getElementById('eventType');
    const startDateEl = document.getElementById('startDate');
    const endDateEl = document.getElementById('endDate');
    const eventVisionEl = document.getElementById('eventVision');

    const fullName = fullNameEl ? fullNameEl.value.trim() : '';
    const emailAddress = emailAddressEl ? emailAddressEl.value.trim() : '';
    const customerPhone = customerPhoneEl ? customerPhoneEl.value.trim() : '';
    const eventType = eventTypeEl && eventTypeEl.value.trim() ? eventTypeEl.value.trim() : 'Not specified';
    const startDate = startDateEl && startDateEl.value ? startDateEl.value : 'Not specified';
    const endDate = endDateEl && endDateEl.value ? endDateEl.value : 'Not specified';
    const eventVision = eventVisionEl && eventVisionEl.value.trim() ? eventVisionEl.value.trim() : 'No extra details provided.';

    const whatsappNumber = '201026455592';
    const message = [
      'New Event Inquiry',
      `Name: ${fullName}`,
      `Email: ${emailAddress}`,
      `Customer Phone: ${customerPhone}`,
      `Event Type: ${eventType}`,
      `Dates: ${startDate} to ${endDate}`,
      `Vision: ${eventVision}`,
    ].join('\n');

    const encodedMessage = encodeURIComponent(message);
    const primaryUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    const fallbackUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

    // Use direct navigation so popup blockers do not break submission.
    window.location.href = primaryUrl;
    setTimeout(() => {
      if (document.visibilityState === 'visible') {
        window.location.href = fallbackUrl;
      }
    }, 1200);
  });
}
