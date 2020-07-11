/* =======================================================
  * Website Name: Jack Luo - v2.0.0
  * Website URL: https://jack-luo.com/
  * Author: Jack Luo
  * License: None
  ======================================================== */
$("nav, body").hide();

$(document).ready(function () {
  $("body").delay("slow").fadeIn(1000);
  $("#nav-bar-button-open").click(function () {
    $("nav").slideDown(400);
    $("header").slideUp(400);
    $("#active-page").toggleClass("page-one-normal page-one-small");
    $("#nav-bar-button-open").fadeOut();
    $("#nav-bar-button-close").fadeIn();
  });
  $("#nav-bar-button-close").click(function () {
    $("nav").slideUp(400);
    $("header").slideDown(400);
    $("#active-page").toggleClass("page-one-normal page-one-small");
    $("#nav-bar-button-close").fadeOut();
    $("#nav-bar-button-open").fadeIn();
  });
});

/* 
  All other works
*/

// Type Writer
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};

