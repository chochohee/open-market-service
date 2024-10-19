import { state } from "./state.js";

export async function isLoggedIn() {
  const jwt = sessionStorage.getItem("accessToken");

  if (jwt) {
    try {
      const response = await fetch("https://estapi.openmarket.weniv.co.kr/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        state.isLoggedIn = true;
      } else if (response.status === 401) {
        // 인증 실패 시 리프레시 토큰으로 재요청
        if (refreshToken) {
          const refreshResponse = await fetch(
            "https://estapi.openmarket.weniv.co.kr/accounts/token/refresh/",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${refreshToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (refreshResponse.ok) {
            const newTokens = await refreshResponse.json();
            sessionStorage.setItem("accessToken", newTokens.accsessToken);
            state.isLoggedIn = true;
          } else {
            console.error("리프레시 토큰 오류:", refreshResponse.statusText);
            state.isLoggedIn = false;
          }
        } else {
          console.error("리프레시 토큰이 없습니다.");
          state.isLoggedIn = false;
        }
      } else {
        console.error("인증 실패:", response.statusText);
        state.isLoggedIn = false;
      }
    } catch (error) {
      console.error("서버 오류:", error);
      state.isLoggedIn = false;
    }
  } else {
    state.isLoggedIn = false;
  }
}
