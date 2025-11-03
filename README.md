# AI ERP Platform

AI 기반 자동화 ERP 관리 시스템

## 🚀 기능

- **AI 챗봇**: 자연어로 판매/구매/재고 데이터 입력
- **자동 분석**: GLM-4.6 기반 데이터 자동 분석
- **Dolibarr 연동**: ERP 시스템과 자동 동기화
- **실시간 통계**: 매출, 재고, 거래 내역 실시간 확인

## 📋 빠른 시작

### 1. 환경변수 설정

`.env.local` 파일 생성:
```bash
# Dolibarr 설정
DOLIBARR_URL=http://localhost:80
DOLIBARR_API_KEY=your_api_key_here

# AI API
GLM_API_KEY=your_glm_key_here
OPENAI_API_KEY=sk-xxx
GEMINI_API_KEY=AIzaSyxxx

# 데이터베이스
DATABASE_URL=postgresql://erp_user:erp_password_123@containers.railway.app:5432/dolibarr_db

# 세션
JWT_SECRET=your_jwt_secret_here
```

### 2. 로컬 개발
```bash
npm install
npm run dev
```

### 3. Railway 배포
```bash
# Railway 프로젝트 연결
railway link

# 배포
railway up
```

## 🎯 사용법

### AI 챗봇 명령어
- `판매: 김치찌개 500개 강원삼푸터에`
- `구매: 돼지고기 100kg 서울육류에서`
- `오늘 매출 알려줘`

### API 엔드포인트
- `POST /api/chat` - AI 챗봇 응답
- `GET /api/stats` - 통계 데이터

## 🏗️ 프로젝트 구조

```
src/
├── app/
│   ├── api/
│   │   └── chat/          # AI 챗봇 API
│   ├── layout.tsx         # 레이아웃
│   ├── page.tsx          # 메인 페이지
│   └── globals.css       # 전역 스타일
├── components/
│   ├── ChatInterface.tsx  # 챗봇 UI
│   └── ERPStats.tsx      # 통계 UI
└── lib/
    └── dolibarr.ts       # Dolibarr 연동
```

## 📱 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI**: GLM-4.6, OpenAI GPT, Google Gemini
- **Database**: PostgreSQL (Railway)
- **ERP**: Dolibarr
- **Deployment**: Railway

## 🔗 연동 서비스

- [Railway](https://railway.app) - 호스팅 및 데이터베이스
- [Dolibarr](https://www.dolibarr.org) - ERP 시스템
- [GLM](https://bigmodel.cn) - AI 모델

## 📄 라이선스

MIT License