export function headerModal() {
  const mypageBtn = document.querySelector(".my-page-btn");
  const mypageModal = document.querySelector(".my-page-modal");
  const logoutBtn = document.querySelector(".logout");

  console.log("mypageBtn:", mypageBtn); // 추가된 로그
  console.log("mypageModal:", mypageModal); // 추가된 로그
  console.log("logoutBtn:", logoutBtn); // 추가된 로그

  // 모달 리스너 추가
  if (mypageBtn) {
    mypageBtn.addEventListener("click", (e) => {
      e.preventDefault();
      mypageModal.classList.toggle("none");
    });

    document.addEventListener("click", (e) => {
      e.preventDefault();
      if (!mypageModal.contains(e.target) && !mypageBtn.contains(e.target)) {
        mypageModal.classList.add("none");
      }
    });
  }

  //로그아웃 리스너
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("accessToken");
      state.isLoggedIn = false;
      location.reload();
    });
  }
}
