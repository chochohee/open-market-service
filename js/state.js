export const state = {
  isLoggedIn: false,
  userType: "BUYER", // BUYER || SELLER
};

// 로그인 상태 설정
export function setLoggedIn(isLoggedIn, userType) {
  state.isLoggedIn = isLoggedIn;
  state.userType = userType;
}

// 로그인 상태 조회
export function getLoggedIn() {
  return state.isLoggedIn;
}

//사용자 유형 조회
export function getUserType() {
  return state.userType;
}

// 상태 초기화
export function resetState() {
  state.isLoggedIn = false;
  state.userType = "BUYER"; // 기본값으로 설정
}
