// API 설정을 중앙에서 관리
let API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// 개발 환경에서 외부 IP 자동 감지 (선택사항)
if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_API_BASE_URL) {
  // 브라우저에서 실행 중인 경우에만 외부 IP 사용
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      API_BASE_URL = `http://${hostname}:8000`;
    }
  }
}

export { API_BASE_URL }; 