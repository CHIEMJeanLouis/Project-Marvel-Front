const pointer = document.querySelector(".fa-solid");

window.addEventListener("mousemove", (e) => {
  pointer.style.left = e.pageX + "px";
  pointer.style.top = e.pageY + "px";
});
