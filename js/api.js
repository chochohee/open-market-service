const baseUrl = "https://estapi.openmarket.weniv.co.kr";

//모든상품 불러오기
export async function fetchAllProducts() {
  try {
    const response = await fetch(`${baseUrl}/product`);
    if (!response.ok) {
      console.error("오류발생", response.statusText);
      return null; // 상태가 좋지 않으면 null 반환
    }

    const json = await response.json(); // JSON 데이터 변환
    return json; // 데이터를 반환
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    return null; // 오류 발생 시 null 반환
  }
}

// 상품ID별 개별상품 불러오기
export async function fetchDetailProducts(productId) {
  try {
    const response = await fetch(`${baseUrl}/products/${productId}`);

    if (!response.ok) {
      console.error("오류발생", response.statusText);
      return null;
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    return null;
  }
}

// 액세스토큰 검증
export async function getUserData(jwt) {
  try {
    const response = await fetch(`${baseUrl}/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("서버 오류:", error);
    throw error; // 에러를 호출한 곳에서 처리할 수 있도록 던짐
  }
}

//  refreshToken 으로 새 accessToken 받아오기
export async function refreshAccessToken(refreshToken) {
  try {
    const response = await fetch(`${baseUrl}/accounts/token/refresh/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("리프레시 토큰 오류:", error);
    throw error;
  }
}
