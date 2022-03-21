"use strict";

/* スムーススクロール */
$(function(){
  $('a[href^="#"]').click(function(){
    const speed = 500;
    const href= $(this).attr("href");
    const target = $(href == "#" || href == "" ? 'html' : href);
    const position = target.offset().top;
    $("html, body").animate({scrollTop:position}, speed, "swing");
    return false;
  });
});


/* ハンバーガーメニュー設定 */
{
  /* ハンバーガーのボタン */
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  /* クリックで表示されるメニューの要素 */
  const navi = document.getElementById("hamburger-nav");
  const hamburgerBg = document.querySelector(".hamburger-bg");
  /* メニュー内のリスト */
  const hamburgerList = document.querySelectorAll(".hamburger-list");


  /* ハンバーガーボタンをクリックしたときの処理 */
  hamburgerIcon.addEventListener("click", () => {
    hamburgerIcon.classList.toggle("active");
    navi.classList.toggle("active");
    hamburgerBg.classList.toggle("active");
  });
  /* リスト以外をクリックしたときの処理 */
  hamburgerBg.addEventListener('click', () => {
    hamburgerBg.classList.remove('active');
    hamburgerIcon.classList.remove("active");
    navi.classList.remove("active");
  });
  /* リンクのクリックでナビゲーションを閉じる */
  hamburgerList.forEach((hamburgerList) => {
    hamburgerList.addEventListener("click", function () {
      hamburgerBg.classList.remove('active');
      hamburgerIcon.classList.remove("active");
      navi.classList.remove("active");
    });
  });
}


/* スクロールのドラッグ有効化 */
jQuery.prototype.mousedragscrollable = function () {
  let target;
  $(this).each(function (i, e) {
    $(e).mousedown(function (event) {
      event.preventDefault();
      target = $(e);
      $(e).data({
        down: true,
        move: false,
        x: event.clientX,
        y: event.clientY,
        scrollleft: $(e).scrollLeft(),
        scrolltop: $(e).scrollTop(),
      });
      return false;
    });
    $(e).click(function (event) {
      if ($(e).data("move")) {
        return false;
      }
    });
  });
  $(document)
    .mousemove(function (event) {
      if ($(target).data("down")) {
        event.preventDefault();
        let move_x = $(target).data("x") - event.clientX;
        let move_y = $(target).data("y") - event.clientY;
        if (move_x !== 0 || move_y !== 0) {
          $(target).data("move", true);
        } else {
          return;
        }
        $(target).scrollLeft($(target).data("scrollleft") + move_x);
        $(target).scrollTop($(target).data("scrolltop") + move_y);
        return false;
      }
    })
    .mouseup(function (event) {
      $(target).data("down", false);
      return false;
    });
};
$(".achiebement__list").mousedragscrollable();