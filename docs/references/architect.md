# 시스템 아키텍처 설계 (Frontend Architecture)

본 문서는 가천 코인 프론트엔드의 폴더 구조와 계층별 역할을 정의합니다. React + TypeScript 기반의 Feature-folder 구조를 따릅니다.

## 1. 폴더 구조 (Project Structure)

```
src/
├── api/                # API 함수 및 axios 인스턴스
│   ├── client.ts       # axios 기본 설정 + 인터셉터 (auth header, error handling)
│   ├── auth.ts         # 로그인/회원가입 관련 API
│   ├── posts.ts        # 게시물 관련 API
│   ├── users.ts        # 유저/프로필 관련 API
│   └── comments.ts     # 댓글 관련 API
├── assets/             # 정적 자산
│   ├── images/         # 이미지 (PNG, JPG)
│   └── icons/          # SVG 아이콘
├── components/         # 재사용 가능한 UI 컴포넌트
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── Button.types.ts
│   ├── Input/
│   ├── Card/
│   ├── Chip/
│   ├── Badge/
│   ├── AppBar/
│   ├── BottomBar/
│   ├── Modal/
│   └── Toast/
├── pages/              # 라우팅 단위 페이지
│   ├── Login/
│   │   ├── Login.tsx
│   │   └── Login.types.ts
│   ├── SignUp/
│   │   ├── SignUpEmail.tsx       # 이메일 + 인증번호
│   │   ├── SignUpInfo.tsx        # ID/이름/PW
│   │   └── SignUp.types.ts
│   ├── Home/                     # 메인 (게시물 목록)
│   ├── PostDetail/               # 게시물 상세
│   ├── PostCreate/               # 게시물 생성
│   └── Profile/                  # 프로필
├── hooks/              # 커스텀 훅
│   ├── useAuth.ts      # 인증 관련 훅
│   ├── usePosts.ts     # 게시물 페칭 훅
│   └── useToast.ts     # 토스트 알림 훅
├── stores/             # Zustand 전역 상태
│   ├── authStore.ts    # 로그인 상태, 토큰
│   └── userStore.ts    # 유저 정보, 코인
├── types/              # 전역 TypeScript 타입
│   ├── user.ts
│   ├── post.ts
│   └── api.ts
├── utils/              # 유틸 함수
│   ├── format.ts       # 날짜/숫자 포맷
│   ├── validation.ts   # 폼 검증
│   └── cn.ts           # className 합치기 (clsx + tailwind-merge)
├── constants/          # 상수 정의
│   ├── routes.ts       # 라우트 경로
│   ├── tags.ts         # 태그 목록 및 컬러
│   └── messages.ts     # 에러/안내 메시지
├── App.tsx
├── main.tsx
└── index.css           # Tailwind + 디자인 토큰
```

## 2. 계층별 역할

### 2.1 API Layer (`api/`)
- 모든 백엔드 통신을 담당. axios 기반.
- `client.ts`는 baseURL, 토큰 자동 첨부, 401 시 자동 로그아웃 등의 인터셉터 포함.
- 각 도메인별 파일로 분리 (`auth.ts`, `posts.ts` 등).

### 2.2 Components Layer (`components/`)
- 도메인 독립적 재사용 UI만 위치.
- 각 컴포넌트는 폴더 단위로 분리 (`Button/Button.tsx` + `Button/Button.types.ts`).
- 페이지 전용 컴포넌트는 해당 페이지 폴더 내에 둠.

### 2.3 Pages Layer (`pages/`)
- 라우팅 단위. 각 페이지는 컴포넌트 조합과 비즈니스 로직(상태, API 호출)을 담당.
- 페이지 전용 sub-component가 있다면 페이지 폴더 내에 작성.

### 2.4 Stores Layer (`stores/`)
- Zustand 기반 전역 상태.
- `authStore`: 토큰, 로그인 여부 (`persist` 미들웨어로 localStorage 동기화).
- `userStore`: 현재 로그인된 유저 정보, 보유 코인.

### 2.5 Hooks Layer (`hooks/`)
- 재사용 가능한 로직을 훅으로 추상화.
- API 호출 + 상태 관리 패턴을 캡슐화 (예: `usePosts`).

## 3. 데이터 흐름 (Data Flow)

```
[User Action]
    ↓
[Page Component] - useState / Zustand 상태 변경
    ↓
[Hook (선택)] - 비즈니스 로직 캡슐화
    ↓
[API Layer] - axios 요청
    ↓
[Backend]
    ↓
[Response]
    ↓
[Page] - 상태 업데이트 → 리렌더링
```

## 4. 주요 규칙

### 4.1 컴포넌트 작성 규칙
- 함수형 컴포넌트만 사용 (Class X)
- Props는 `.types.ts` 파일에 인터페이스로 분리
- `variant`, `size`, `disabled` 등 자주 쓰는 prop은 표준화
- 스타일은 Tailwind 클래스만 사용 (inline style, css module X)
- 컬러는 반드시 `DESIGN.md`의 토큰 사용 (raw hex 금지)

### 4.2 상태 관리 원칙
- **로컬 상태**: `useState` (해당 컴포넌트에서만 사용)
- **페이지 간 공유**: Zustand store
- **서버 상태**: 페이지 내에서 useEffect + axios (필요 시 React Query 도입)

### 4.3 라우팅 규칙
- 모든 경로는 `constants/routes.ts`에 상수로 정의
- 보호된 경로(로그인 필요)는 `<ProtectedRoute>` 래퍼로 처리

## 5. 기술 사양 요약

- **Framework**: React 19, TypeScript 5
- **Build Tool**: Vite 8
- **Routing**: React Router v6
- **Styling**: Tailwind CSS v4 (디자인 토큰 기반)
- **State**: Zustand
- **HTTP**: Axios
- **Form Validation**: 자체 구현 또는 react-hook-form (필요 시)
- **Icons**: lucide-react
- **Deployment**: Vercel
