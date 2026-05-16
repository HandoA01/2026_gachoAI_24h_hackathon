# 가천 코인 (Gachon Coin) Design System

> 가천대학교 학생 커뮤니티 기반 코인 거래소 + 게시판 모바일 웹앱
> 디자인 시스템: ADOS 기반 (Common, Neutral, Cool Neutral, Red, Green, Blue, Orange, Violet, Cyan, Yellow, Pink, Lime)

---

## 1. Visual Theme

- **무드**: 신뢰감 있는 학생 커뮤니티, 깔끔하고 모던
- **톤**: 진한 네이비 블루 메인 + 의미 단위 액센트 컬러 (보라, 오렌지, 노랑)
- **타겟**: 가천대학교 학생 (모바일 우선)
- **레이아웃**: 모바일 전용, 최대 너비 390px

## 2. Color Palette

### Brand Colors (의미 단위)

- **Primary** (메인 액션, 로그인/Sign in 버튼): `#0057A8` (blue-34)
- **Primary Hover**: `#0077E5` (blue-45)
- **Primary Light** (배경): `#E5F3FF` (blue-95)
- **Accent** (모집중 뱃지, CTA): `#8B52FF` (violet-66)

### Semantic Colors

- **Success** (완료): `#00A811` (green-34)
- **Warning** (주의): `#FFBB0F` (yellow-53)
- **Error** (오류, 반려): `#E50000` (red-45)
- **Info**: `#0F8BFF` (blue-53)

### Tag Colors (게시물 태그)

- **Physics**: `#8B52FF` (violet-66) 배경 `#EEE5FF` (violet-95)
- **Chemistry**: `#FF9152` (orange-66) 배경 `#FFEFE5` (orange-95)
- **Maths**: `#FFCE52` (yellow-66) 배경 `#FFF8E5` (yellow-95)
- **Programming**: `#52ABFF` (blue-66) 배경 `#E5F3FF` (blue-95)
- **Language**: `#FF52BA` (pink-66) 배경 `#FFE5F5` (pink-95)

### Neutral (텍스트, 배경)

- **Text Primary**: `#1A1A1A` (neutral-10)
- **Text Secondary**: `#6B6B6B` (neutral-42)
- **Text Tertiary**: `#A6A6A6` (neutral-65)
- **Text Disabled**: `#C9C9C9` (neutral-79)
- **Border**: `#E3E3E3` (neutral-89)
- **Background**: `#FFFFFF` (common-100)
- **Background Subtle**: `#F0F0F0` (neutral-94)
- **Background Card**: `#FCFCFC` (neutral-99)

### Coin (가천 코인)

- **Coin Icon BG**: `#6B6B6B` (neutral-42)
- **Coin Number**: `#1A1A1A` (neutral-10)

## 3. Typography

- **Font Family**: `Pretendard`, system-ui, sans-serif
- **Heading 1** (페이지 타이틀): 22px / Bold / -0.02em
- **Heading 2** (섹션 타이틀): 18px / SemiBold / -0.01em
- **Heading 3** (카드 타이틀): 16px / SemiBold
- **Body Large**: 16px / Regular / 24px line-height
- **Body**: 14px / Regular / 20px line-height
- **Body Small**: 13px / Regular / 18px line-height
- **Caption**: 12px / Regular / 16px line-height
- **Button**: 15px / SemiBold

## 4. Components

### Button

- **Height**: Large 52px / Medium 44px / Small 36px
- **Radius**: 12px (Large, Medium), 8px (Small)
- **Padding X**: Large 20px / Medium 16px / Small 12px
- **Primary**: bg `#0057A8`, text white, hover `#0077E5`
- **Secondary**: bg `#E5F3FF`, text `#0057A8`, border none
- **Outline**: bg transparent, border 1px `#E3E3E3`, text `#1A1A1A`
- **Text**: bg transparent, text `#0057A8`, underline on hover
- **Disabled**: bg `#E3E3E3`, text `#A6A6A6`

### Input

- **Height**: 52px
- **Radius**: 12px
- **Border**: 1px `#E3E3E3`
- **Padding**: 16px
- **Background**: `#FCFCFC`
- **Font Size**: 15px
- **Placeholder**: `#A6A6A6`
- **Focus**: border `#0057A8` 2px
- **Error**: border `#E50000` 1px

### Card

- **Radius**: 16px
- **Padding**: 20px
- **Background**: `#FFFFFF`
- **Border**: 1px `#F0F0F0`
- **Shadow**: 0 1px 3px rgba(0,0,0,0.04)
- **Gap (내부 요소 간)**: 12px

### Chip / Tag

- **Height**: 28px
- **Radius**: 999px (pill)
- **Padding X**: 12px
- **Font**: 13px / Medium

### Badge (모집중, 완료, 반려)

- **Height**: 24px
- **Radius**: 999px (pill)
- **Padding X**: 10px
- **Font**: 12px / SemiBold

### AppBar

- **Height**: 56px
- **Padding X**: 16px
- **Background**: `#FFFFFF`
- **Border Bottom**: 1px `#F0F0F0`
- **Title Font**: 17px / SemiBold

### BottomBar (탭바)

- **Height**: 64px
- **Background**: `#FFFFFF`
- **Border Top**: 1px `#F0F0F0`
- **Icon Size**: 24px
- **Active Color**: `#0057A8`
- **Inactive Color**: `#A6A6A6`

## 5. Layout

- **Mobile width**: 390px (max-w)
- **Container padding**: 16px (좌우)
- **Section gap**: 24px
- **Card gap (목록)**: 12px

## 6. Spacing Scale

- xs: 4px
- sm: 8px
- md: 12px
- lg: 16px
- xl: 24px
- 2xl: 32px
- 3xl: 48px

## 7. Border Radius

- sm: 8px
- md: 12px (기본)
- lg: 16px (카드)
- full: 9999px (pill, avatar)

## 8. States

- **Hover**: 색상 변경 (Primary→PrimaryHover) 또는 opacity 0.9
- **Active/Pressed**: opacity 0.8 또는 scale(0.98)
- **Focus**: outline 2px solid Primary, offset 2px
- **Disabled**: opacity 0.5, cursor not-allowed

## 9. Guidelines (Do / Don't)

### Do

- 터치 영역 최소 44x44px 확보 (BottomBar 아이콘, Button 등)
- 색상은 의미 단위로만 사용 (Error=빨강, Success=초록)
- 텍스트 색은 neutral 스케일만 (검정 직접 사용 X)
- 폼은 한 화면에 하나의 Primary 액션만
- 카드 간 12px gap 유지

### Don't

- 그라데이션 사용 금지
- 한 화면에 5색 이상 사용 금지
- 임의의 hex 값 사용 금지 (반드시 토큰 사용)
- 텍스트에 shadow 사용 금지
- 18px 이하 텍스트에 Bold 사용 자제 (가독성)
- 모집중/완료/반려 외의 상태 임의 추가 금지
