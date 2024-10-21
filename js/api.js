//모든상품 불러오기
async function fetchAllProducts() {
  try {
    const response = await fetch(
      "https://estapi.openmarket.weniv.co.kr/products"
    );
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

export { fetchAllProducts };

async function fetchDetailProducts(productId) {
  try {
    const response = await fetch(
      `https://estapi.openmarket.weniv.co.kr/products/${productId}`
    );

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

export { fetchDetailProducts };
