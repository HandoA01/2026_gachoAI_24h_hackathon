# Git 플로우 (Git Flow)

우리 팀의 코드 일관성과 안정적인 협업을 위해 아래의 Git Flow 정책을 준수합니다. **모든 `develop` 브랜치로의 반영은 반드시 Pull Request(PR)를 거치며, 원본 레포에 직접 push는 금지합니다.**

---

## 1. Fork 기반 협업 구조

본 프로젝트는 **Fork 기반 워크플로우**를 따릅니다.

```
원본 레포 (upstream)
    ↓ fork
팀원 A fork (origin)    팀원 B fork    팀원 C fork
    ↓ branch                ↓               ↓
feat/#1-login          feat/#2-home    feat/#3-profile
    ↓ PR                    ↓               ↓
원본 레포의 develop 브랜치로 PR 생성
```

## 2. 브랜치 전략 (Branch Strategy)

| 브랜치명 | 위치 | 설명 | 권한 |
| :--- | :--- | :--- | :--- |
| `main` | upstream | 제품 배포 브랜치 (가장 안정적) | PR 필수 |
| `develop` | upstream | 다음 버전 개발 브랜치 (기능 통합) | PR 필수 |
| `feat/#이슈번호-기능명` | 내 fork | 각 기능별 작업 브랜치 | 자유 |

## 3. 작업 프로세스 (Workflow)

### Step 1. Fork 동기화 (작업 시작 전 필수)
원본 레포에 다른 팀원의 변경사항이 머지됐을 수 있으니, 작업 시작 전 반드시 sync.

**GitHub 웹**:
1. 내 fork 레포 페이지 접속
2. 코드 위쪽의 `Sync fork` 버튼 클릭 → `Update branch`

**로컬**:
```bash
git checkout develop
git pull origin develop
```

### Step 2. 작업 브랜치 생성
이슈 번호와 기능명을 포함하여 브랜치 생성.

```bash
# 예시: feat/#1-login
git checkout -b feat/#이슈번호-기능명
```

### Step 3. 작업 및 커밋
커밋 메시지 컨벤션에 맞춰 커밋 진행.

```bash
git add .
git commit -m "feat: 로그인 페이지 UI 구현"
```

### Step 4. 원격 저장소 Push 및 PR 생성
작업이 완료되면 내 fork에 push 후, **원본 레포 develop 브랜치로 PR** 생성.

```bash
git push origin feat/#이슈번호-기능명
```

GitHub에서 PR 생성 시 드롭다운 확인:
- **base repository**: 원본 레포
- **base**: develop
- **head repository**: 내 fork
- **compare**: feat/#이슈번호-기능명

### Step 5. 코드 리뷰 및 머지
- 팀원의 리뷰 후 승인되면 원본 owner가 머지
- 머지된 작업 브랜치는 삭제

### Step 6. 다음 작업 준비
- 내 fork에서 Sync fork (또는 `git pull upstream develop`)
- 새 작업 브랜치 생성

## 4. 커밋 메시지 규칙 (Commit Convention)

```
<type>: <설명>
```

| 타입 | 설명 |
| :--- | :--- |
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `refactor` | 리팩토링 (기능 변경 없음) |
| `style` | 코드 포맷팅, 세미콜론 등 (의미 변경 없음) |
| `docs` | 문서 수정 (README, 주석 등) |
| `chore` | 빌드, 패키지 등 부수적 변경 |
| `test` | 테스트 코드 추가/수정 |
| `design` | 디자인/UI 수정 |

**예시**:
- `feat: 로그인 페이지 UI 구현`
- `fix: 회원가입 이메일 검증 오류 수정`
- `refactor: useAuth 훅 분리`
- `chore: prettier 설정 추가`

## 5. 브랜치 네이밍 규칙

```
<type>/#<이슈번호>-<기능명>
```

**예시**:
- `feat/#1-login`
- `feat/#2-signup-flow`
- `fix/#15-button-disabled-state`
- `refactor/#20-api-error-handling`

## 6. PR 규칙

PR 제목은 커밋 컨벤션과 동일하게:
```
feat: 로그인 페이지 구현 (#1)
```

PR 본문 템플릿:
```markdown
## 작업 내용
- 무엇을 작업했는지 bullet point로 작성

## 변경 사항
- 추가된 파일, 수정된 파일 등

## 확인 방법
- 동작 확인을 위한 가이드

## 스크린샷 (UI 변경 시 필수)
- 변경 전/후 캡쳐
```

## 7. 우리 팀 필수 수칙

1. **No Direct Push**: 원본 레포의 `main`, `develop` 브랜치에 직접 push 금지.
2. **Sync First**: 작업 시작 전 반드시 fork sync.
3. **One Feature per Branch**: 하나의 브랜치에는 하나의 기능/수정만.
4. **Branch Cleanup**: 머지된 브랜치는 즉시 삭제.
5. **PR Description**: PR 생성 시 작업 내용과 스크린샷(UI 변경 시) 첨부.
