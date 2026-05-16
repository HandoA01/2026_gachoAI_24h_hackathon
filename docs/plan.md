# 프로젝트 개발 계획 (Development Plan)

본 문서는 가천 코인 프론트엔드 프로젝트의 단계별 개발 로드맵을 정의합니다.

## 1. 개발 로드맵 (Roadmap)

### Phase 1: 인프라 및 환경 설정 (Environment Setup)
- [x] **Step 1.1**: 프로젝트 초기화 (Vite + React 19 + TypeScript)
- [x] **Step 1.2**: 디자인 시스템 및 Tailwind v4 디자인 토큰 적용 (`DESIGN.md`, `index.css`)
- [x] **Step 1.3**: ESLint + Prettier 설정 및 VSCode 통일 (`.vscode/settings.json`)
- [x] **Step 1.4**: 폴더 구조 세팅 (`api/`, `components/`, `pages/`, `hooks/`, `stores/`, `types/`, `utils/`, `constants/`)
- [x] **Step 1.5**: Git Flow 정립 (Fork 기반, `develop` 브랜치 + `feat/#이슈번호`)

### Phase 2: 공통 컴포넌트 구현 (UI Foundation)
- [ ] **Step 2.1**: Button 컴포넌트 (Primary/Secondary/Outline/Text, 3 사이즈)
- [ ] **Step 2.2**: Input / TextArea 컴포넌트 (기본/에러/Disabled)
- [ ] **Step 2.3**: Card / Chip / Badge 컴포넌트
- [ ] **Step 2.4**: AppBar / BottomBar (네비게이션)
- [ ] **Step 2.5**: Modal / Toast / Loader (피드백)

### Phase 3: 라우팅 및 페이지 골격 (Routing & Pages)
- [ ] **Step 3.1**: React Router 설정 및 라우트 정의 (`constants/routes.ts`)
- [ ] **Step 3.2**: 로그인 / 회원가입 페이지 (Step 1 → 인증 → Step 2)
- [ ] **Step 3.3**: 메인 페이지 (게시물 목록)
- [ ] **Step 3.4**: 게시물 상세 페이지
- [ ] **Step 3.5**: 게시물 생성 페이지
- [ ] **Step 3.6**: 프로필 페이지

### Phase 4: 상태 관리 및 API 연동 (State & API)
- [ ] **Step 4.1**: Zustand 스토어 구성 (`authStore`, `userStore`)
- [ ] **Step 4.2**: Axios 인스턴스 및 인터셉터 (`api/client.ts`)
- [ ] **Step 4.3**: API 함수 모듈화 (`api/auth.ts`, `api/posts.ts`, `api/users.ts`)
- [ ] **Step 4.4**: 페이지별 API 연동 및 로딩/에러 처리

### Phase 5: 통합 및 배포 (Integration & Deploy)
- [ ] **Step 5.1**: 전체 시나리오 통합 테스트 (회원가입 → 게시물 → 코인 분배)
- [ ] **Step 5.2**: Vercel 배포 및 환경 변수 설정 (`.env`)
- [ ] **Step 5.3**: `README.md` 업데이트 (실행 방법, 배포 URL)

## 2. 우선순위 및 일정 전략

1. **최우선 (오늘)**: 공통 컴포넌트 + 핵심 페이지 7개 (로그인, 회원가입 3단계, 메인, 상세, 생성)
2. **차순위**: 프로필 페이지 + API 연동 (Mock → 실제 API 교체)
3. **마지막**: 배포 + 디테일 다듬기 (애니메이션, 빈 상태 등)

## 3. 검증 전략

- **수동 테스트**: 각 페이지 사용 흐름 직접 검증 (로그인 → 게시물 생성 → 참여 → 댓글)
- **반응형 확인**: 모바일 사이즈(max 390px)에서 깨짐 없는지 점검
- **다양한 디바이스**: Chrome DevTools의 iPhone / Galaxy 프리셋 활용
- **컴포넌트 일관성**: `DESIGN.md` 토큰 외 hex 값 직접 사용 여부 확인
