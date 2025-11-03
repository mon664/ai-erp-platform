/** @type {import('next').NextConfig} */
const nextConfig = {
  // Railway 환경에서 포트 설정
  port: process.env.PORT || 3000,
  // 빌드 최적화
  poweredByHeader: false,
  // 정적 파일 최적화
  compress: true,
}

module.exports = nextConfig