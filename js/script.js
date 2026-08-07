// =====================================
// MENU MOBILE
// =====================================

const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });

  document.querySelectorAll(".menu a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
      menuToggle.classList.remove("active");
    });
  });
}

// =====================================
// FORMULÁRIO DE COBERTURA
// =====================================

const coverageForm = document.querySelector(".coverage-form");

if (coverageForm) {
  coverageForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const input = this.querySelector("input");

    if (!input.value.trim()) {
      alert("Digite seu endereço ou bairro.");

      input.focus();

      return;
    }

    alert(
      `Estamos verificando a disponibilidade para:

${input.value}`,
    );

    // Aqui futuramente pode integrar WhatsApp ou API
  });
} // =====================================
// CARROSSEL DE DEPOIMENTOS
// =====================================

const cards = document.querySelectorAll(".testimonial-card");
const dots = document.querySelectorAll(".dot");

const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let current = 0;
let autoSlide;

function showSlide(index) {
  if (!cards.length) return;

  cards.forEach((card) => {
    card.classList.remove("active");
  });

  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  cards[index].classList.add("active");

  if (dots[index]) {
    dots[index].classList.add("active");
  }

  current = index;
}

function nextSlide() {
  let index = current + 1;

  if (index >= cards.length) {
    index = 0;
  }

  showSlide(index);
}

function prevSlide() {
  let index = current - 1;

  if (index < 0) {
    index = cards.length - 1;
  }

  showSlide(index);
}

function restartAuto() {
  clearInterval(autoSlide);

  autoSlide = setInterval(() => {
    nextSlide();
  }, 5000);
}

if (cards.length) {
  showSlide(0);

  restartAuto();

  if (next) {
    next.addEventListener("click", () => {
      nextSlide();

      restartAuto();
    });
  }

  if (prev) {
    prev.addEventListener("click", () => {
      prevSlide();

      restartAuto();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);

      restartAuto();
    });
  });
}

// =====================================
// FAQ ACCORDION
// =====================================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const button = item.querySelector(".faq-question");

  if (button) {
    button.addEventListener("click", () => {
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove("active");

          const answer = other.querySelector(".faq-answer");

          if (answer) {
            answer.style.maxHeight = null;
          }
        }
      });

      item.classList.toggle("active");

      const answer = item.querySelector(".faq-answer");

      if (item.classList.contains("active")) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = null;
      }
    });
  }
});

const firstFaq = document.querySelector(".faq-item.active .faq-answer");

if (firstFaq) {
  firstFaq.style.maxHeight = firstFaq.scrollHeight + "px";
}
// =====================================
// BOTÃO VOLTAR AO TOPO
// =====================================

const backTop = document.querySelector(".back-top");

if (backTop) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backTop.classList.add("show");
    } else {
      backTop.classList.remove("show");
    }
  });

  backTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  });
}

// =====================================
// SCROLL REVEAL
// =====================================

const reveals = document.querySelectorAll("section, footer");

reveals.forEach((element) => {
  element.classList.add("reveal");
});

function revealScroll() {
  reveals.forEach((element) => {
    const position = element.getBoundingClientRect().top;

    if (position < window.innerHeight - 120) {
      element.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealScroll);

revealScroll();

// =====================================
// CONTADORES
// =====================================

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counter = entry.target;

      const target = Number(counter.dataset.target);

      let value = 0;

      const speed = Math.ceil(target / 80);

      function updateCounter() {
        value += speed;

        if (value >= target) {
          counter.innerText = target + "+";
        } else {
          counter.innerText = value;

          requestAnimationFrame(updateCounter);
        }
      }

      updateCounter();

      counterObserver.unobserve(counter);
    }
  });
});

counters.forEach((counter) => {
  counterObserver.observe(counter);
});
// =====================================
// EFEITO DE PARTÍCULAS NO FUNDO
// =====================================

const canvas = document.getElementById("particles");

if (canvas) {
  const ctx = canvas.getContext("2d");

  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;
  }

  resizeCanvas();

  window.addEventListener("resize", resizeCanvas);

  function createParticles() {
    particles = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,

        y: Math.random() * canvas.height,

        radius: Math.random() * 2 + 1,

        speedX: (Math.random() - 0.5) * 0.3,

        speedY: (Math.random() - 0.5) * 0.3,
      });
    }
  }

  createParticles();

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.x += particle.speedX;

      particle.y += particle.speedY;

      if (particle.x <= 0 || particle.x >= canvas.width) {
        particle.speedX *= -1;
      }

      if (particle.y <= 0 || particle.y >= canvas.height) {
        particle.speedY *= -1;
      }

      ctx.beginPath();

      ctx.arc(
        particle.x,

        particle.y,

        particle.radius,

        0,

        Math.PI * 2,
      );

      ctx.fillStyle = "rgba(0,200,255,.45)";

      ctx.fill();
    });

    requestAnimationFrame(animateParticles);
  }

  animateParticles();
}

// =====================================
// ANO AUTOMÁTICO NO FOOTER
// =====================================

const footerYear = document.querySelector(".footer-bottom");

if (footerYear) {
  const year = new Date().getFullYear();

  footerYear.innerHTML = `© ${year} Empresa Internet Fibra. Todos os direitos reservados.`;
}
