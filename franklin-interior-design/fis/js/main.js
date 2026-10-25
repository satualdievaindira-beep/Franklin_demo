(function () {
  "use strict";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  // Номер WhatsApp (без + и пробелов)
  var WA = "996555070861";

  $("#year").textContent = new Date().getFullYear();

  // Меню
  var burger = $("#burger"), nav = $("#nav");
  function menu(open) { nav.classList.toggle("open", open); burger.setAttribute("aria-expanded", String(open)); }
  burger.addEventListener("click", function () { menu(!nav.classList.contains("open")); });
  $$("a", nav).forEach(function (a) { a.addEventListener("click", function () { menu(false); }); });

  // Галерея: стрелки
  var rail = $("#rail");
  function slide(dir) { rail.scrollBy({ left: dir * 360, behavior: "smooth" }); }
  $("#w-prev").addEventListener("click", function () { slide(-1); });
  $("#w-next").addEventListener("click", function () { slide(1); });

  // Окно просмотра
  var lb = $("#lb");
  function closeLb() { lb.hidden = true; }
  $$(".work").forEach(function (w) {
    w.addEventListener("click", function () {
      $("#lb-img").src = w.dataset.src;
      $("#lb-img").alt = w.dataset.title;
      $("#lb-title").textContent = w.dataset.title;
      lb.hidden = false;
      $("#lb-close").focus();
    });
  });
  $("#lb-close").addEventListener("click", closeLb);
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLb(); });

  // Форма -> WhatsApp
  function check(input, errId, ok, msg) {
    $(errId).textContent = ok ? "" : msg;
    input.classList.toggle("bad", !ok);
    return ok;
  }
  $("#form").addEventListener("submit", function (e) {
    e.preventDefault();
    var name = $("#f-name"), phone = $("#f-phone");
    var a = check(name, "#e-name", name.value.trim().length > 1, "Введите имя");
    var b = check(phone, "#e-phone", phone.value.replace(/\D/g, "").length >= 9, "Введите телефон полностью");
    if (!(a && b)) return;
    var area = $("#f-area").value.trim();
    var text = "Здравствуйте! Заявка с сайта.\nИмя: " + name.value.trim() +
      "\nТелефон: " + phone.value.trim() +
      "\nЗадача: " + $("#f-type").value +
      (area ? "\nПлощадь: " + area + " м²" : "");
    window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(text), "_blank", "noopener");
  });
})();
