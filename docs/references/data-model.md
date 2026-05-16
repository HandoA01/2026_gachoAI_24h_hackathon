# 데이터 모델 정의 (Data Model)

본 문서는 프론트엔드에서 다루는 핵심 데이터 구조를 정의합니다. 백엔드 API 응답 형식과 매칭됩니다.

## 1. User (사용자)

```typescript
interface User {
  id: number;
  userId: string;         // 로그인 ID (영문/숫자)
  name: string;           // 이름
  email: string;          // @gachon.ac.kr 이메일
  profileImage?: string;  // 프로필 이미지 URL (Optional)
  coin: number;           // 보유 코인
  tags: string[];         // 관심 태그 (Physics, Chemistry 등)
  expertTitles: ExpertTitle[]; // 전문가 타이틀 (다중)
  createdAt: string;
}

interface ExpertTitle {
  id: number;
  tag: string;            // 어떤 분야의 전문가인지
  level: 'Bronze' | 'Silver' | 'Gold'; // 등급
  earnedAt: string;
}
```

## 2. Post (게시물)

```typescript
interface Post {
  id: number;
  title: string;
  content: string;
  author: User;           // 작성자 정보
  tags: string[];         // 분류 태그
  roles: Role[];          // 역할별 모집 정보
  totalCoinReward: number; // 총 할당 코인
  status: PostStatus;
  deadline: string;       // 모집 마감일 (ISO date)
  createdAt: string;
  updatedAt: string;
  participants: Participant[]; // 참여자 목록
  commentCount: number;
}

type PostStatus = 'RECRUITING' | 'COMPLETED' | 'REJECTED' | 'CANCELED';
// 모집중 / 완료 / 반려 / 취소

interface Role {
  id: number;
  name: string;           // 역할명 (예: 팀장, 디자이너)
  maxCount: number;       // 모집 인원
  currentCount: number;   // 현재 참여 인원
  coinReward: number;     // 1명당 지급 코인
}

interface Participant {
  id: number;
  user: User;
  role: Role;
  status: 'PENDING' | 'APPROVED' | 'REJECTED'; // 작성자의 승인 상태
  joinedAt: string;
}
```

## 3. Comment (댓글)

```typescript
interface Comment {
  id: number;
  postId: number;
  author: User;
  content: string;
  parentId?: number;      // 대댓글인 경우 부모 댓글 ID (depth=1)
  createdAt: string;
  updatedAt: string;
}
```

## 4. Tag (분류 태그)

```typescript
interface Tag {
  id: number;
  name: string;           // Physics, Chemistry, Maths, Programming, Language ...
  color: TagColor;        // 디자인 시스템 토큰
}

type TagColor =
  | 'physics'      // violet
  | 'chemistry'    // orange
  | 'maths'        // yellow
  | 'programming'  // blue
  | 'language';    // pink
```

## 5. Auth (인증)

```typescript
interface LoginRequest {
  userId: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

interface SignUpStep1Request {
  email: string; // @gachon.ac.kr
}

interface SignUpVerifyRequest {
  email: string;
  verificationCode: string; // 6자리
}

interface SignUpStep2Request {
  email: string;
  userId: string;
  name: string;
  password: string;
}
```

## 6. CoinTransaction (코인 거래 내역, 선택)

```typescript
interface CoinTransaction {
  id: number;
  userId: number;
  type: 'EARN' | 'SPEND' | 'REFUND';
  amount: number;
  relatedPostId?: number;
  description: string;
  createdAt: string;
}
```

## 7. Notification (알림, 선택)

```typescript
interface Notification {
  id: number;
  type: 'INVITATION' | 'JOIN_REQUEST' | 'POST_COMPLETED' | 'COMMENT';
  title: string;
  body: string;
  isRead: boolean;
  relatedPostId?: number;
  createdAt: string;
}
```
