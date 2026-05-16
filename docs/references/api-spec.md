# API 명세서 (API Specification)

본 문서는 가천 코인 프론트엔드에서 호출하는 백엔드 API의 명세입니다.

## 기본 정보

- **Base URL**: `https://api.gachon-coin.dev` (개발), `https://api.gachon-coin.com` (운영)
- **인증 방식**: JWT (Bearer Token)
- **요청/응답 형식**: JSON (UTF-8)
- **공통 헤더**:
  - `Content-Type: application/json`
  - `Authorization: Bearer <access_token>` (인증 필요 API)

## 공통 응답 포맷

### 성공
```json
{
  "success": true,
  "data": { ... }
}
```

### 실패
```json
{
  "success": false,
  "error": {
    "code": "INVALID_EMAIL",
    "message": "가천대 이메일만 사용할 수 있습니다."
  }
}
```

---

## 1. 인증 (Auth)

### 1.1 회원가입 - 이메일 인증 요청
- **POST** `/api/auth/signup/email`
- **Body**:
```json
{ "email": "user@gachon.ac.kr" }
```
- **Response**: 200 OK (인증번호가 이메일로 발송됨)

### 1.2 회원가입 - 인증번호 확인
- **POST** `/api/auth/signup/verify`
- **Body**:
```json
{
  "email": "user@gachon.ac.kr",
  "verificationCode": "123456"
}
```
- **Response**: `{ "verifyToken": "..." }` (다음 단계에서 사용)

### 1.3 회원가입 - 회원 정보 등록
- **POST** `/api/auth/signup/complete`
- **Body**:
```json
{
  "verifyToken": "...",
  "userId": "ysllpj77",
  "name": "이예서",
  "password": "Password123!"
}
```
- **Response**: `LoginResponse` (자동 로그인)

### 1.4 로그인
- **POST** `/api/auth/login`
- **Body**:
```json
{
  "userId": "ysllpj77",
  "password": "Password123!"
}
```
- **Response**:
```json
{
  "accessToken": "...",
  "refreshToken": "...",
  "user": { ... }
}
```

### 1.5 로그아웃
- **POST** `/api/auth/logout`
- **Auth**: Required

### 1.6 토큰 갱신
- **POST** `/api/auth/refresh`
- **Body**: `{ "refreshToken": "..." }`

---

## 2. 게시물 (Posts)

### 2.1 게시물 목록 조회
- **GET** `/api/posts`
- **Query Parameters**:
  - `page`: 페이지 번호 (default: 1)
  - `size`: 페이지 크기 (default: 10)
  - `tag`: 태그 필터 (선택)
  - `status`: `RECRUITING` | `COMPLETED` (선택)
- **Response**:
```json
{
  "posts": [Post, ...],
  "totalCount": 100,
  "hasNext": true
}
```

### 2.2 게시물 상세 조회
- **GET** `/api/posts/:postId`
- **Response**: `Post` (참여자, 댓글 포함)

### 2.3 게시물 생성
- **POST** `/api/posts`
- **Auth**: Required
- **Body**:
```json
{
  "title": "알고리즘 스터디 팀원 모집합니다",
  "content": "...",
  "tags": ["Programming"],
  "deadline": "2026-06-01",
  "roles": [
    { "name": "팀장", "maxCount": 1, "coinReward": 80 },
    { "name": "팀원", "maxCount": 3, "coinReward": 50 }
  ]
}
```

### 2.4 게시물 수정
- **PATCH** `/api/posts/:postId`
- **Auth**: Required (작성자만)

### 2.5 게시물 상태 변경
- **PATCH** `/api/posts/:postId/status`
- **Body**: `{ "status": "COMPLETED" | "CANCELED" }`

### 2.6 참여 신청
- **POST** `/api/posts/:postId/join`
- **Auth**: Required
- **Body**: `{ "roleId": 123 }`

### 2.7 참여 승인/거절 (작성자)
- **PATCH** `/api/posts/:postId/participants/:participantId`
- **Body**: `{ "status": "APPROVED" | "REJECTED" }`

### 2.8 참여 취소 (탈퇴)
- **DELETE** `/api/posts/:postId/participants/me`

---

## 3. 댓글 (Comments)

### 3.1 댓글 목록 조회
- **GET** `/api/posts/:postId/comments`

### 3.2 댓글 작성
- **POST** `/api/posts/:postId/comments`
- **Body**:
```json
{
  "content": "내용입니다",
  "parentId": null
}
```

### 3.3 댓글 삭제
- **DELETE** `/api/comments/:commentId`

---

## 4. 사용자 (Users)

### 4.1 내 정보 조회
- **GET** `/api/users/me`
- **Auth**: Required
- **Response**: `User`

### 4.2 내 정보 수정
- **PATCH** `/api/users/me`
- **Body**: `{ "name": "...", "profileImage": "..." }`

### 4.3 사용자 프로필 조회
- **GET** `/api/users/:userId`

### 4.4 코인 거래 내역
- **GET** `/api/users/me/coins`
- **Response**: `CoinTransaction[]`

### 4.5 전문가 추천 (작성자가 게시물에서 호출)
- **GET** `/api/users/experts?tag=Programming&limit=5`
- **Response**: 해당 태그의 전문가 타이틀 보유자 Top N

---

## 5. 에러 코드

| 코드 | HTTP | 설명 |
| :--- | :--- | :--- |
| `INVALID_EMAIL` | 400 | 가천대 이메일이 아님 |
| `INVALID_VERIFICATION_CODE` | 400 | 인증번호 불일치 또는 만료 |
| `DUPLICATE_USER_ID` | 409 | 중복된 ID |
| `INSUFFICIENT_COIN` | 400 | 코인 부족 |
| `UNAUTHORIZED` | 401 | 토큰 없음 또는 만료 |
| `FORBIDDEN` | 403 | 권한 없음 (예: 작성자만 가능) |
| `NOT_FOUND` | 404 | 리소스 없음 |
| `ROLE_FULL` | 400 | 모집 인원 마감 |
| `INTERNAL_ERROR` | 500 | 서버 오류 |
