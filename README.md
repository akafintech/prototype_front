This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

# 프로젝트 설정

## 환경 변수 설정

### 1. 로컬 개발 환경
프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

### 2. 외부 IP 사용 시
외부 IP를 사용하려면 `.env.local` 파일에서 다음과 같이 설정하세요:

```env
NEXT_PUBLIC_API_BASE_URL=http://192.168.1.100:8000
```

### 3. 프로덕션 환경
프로덕션 환경에서는 실제 서버 URL로 설정하세요:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-api-server.com
```

## API 설정 중앙 관리

모든 API 호출은 `src/config/api.js`에서 중앙 관리됩니다. 
환경 변수가 설정되지 않은 경우 기본값으로 `http://localhost:8000`을 사용합니다.

## 사용법

1. 환경 변수 파일 생성 후 서버 재시작
2. 모든 API 호출이 자동으로 설정된 URL을 사용
3. 환경별로 다른 URL 사용 가능 (개발/스테이징/프로덕션)
