# 가천 코인 프로젝트 문서

이 폴더는 가천 코인 프로젝트의 모든 기획 및 기술 문서를 포함합니다.

## 문서 구조

```
docs/
├── abstract.md              # 프로젝트 개요 (한 페이지 요약)
├── plan.md                  # 개발 로드맵 (Phase별 일정)
├── references/
│   ├── scenarios.md         # 사용자 시나리오 (회원가입, 게시물, 코인 분배 등)
│   ├── data-model.md        # 프론트엔드 TypeScript 데이터 구조
│   ├── erd-spec.md          # 백엔드 ERD 명세 (참고용)
│   ├── architect.md         # 프론트엔드 아키텍처 (폴더 구조, 데이터 흐름)
│   ├── git_flow.md          # Git 워크플로우 (Fork 기반)
│   └── api-spec.md          # 백엔드 API 명세
└── dailyLogger/
    └── 2026-05-16.md        # 작업 로그 (날짜별)
```

## 읽는 순서 (추천)

### 새로 합류한 팀원
1. `abstract.md` - 우리가 뭘 만드는지
2. `references/scenarios.md` - 사용자가 어떻게 쓰는지
3. `references/architect.md` - 코드는 어떻게 구성되어 있는지
4. `references/git_flow.md` - 어떻게 협업하는지

### 백엔드 협업 시
1. `references/erd-spec.md`
2. `references/data-model.md`
3. `references/api-spec.md`

### AI 코딩 에이전트(Claude 등) 활용 시
- 프로젝트 루트의 `DESIGN.md` 와 함께 참고하면 일관된 코드 생성 가능
- 페이지/컴포넌트 요청 시 관련 docs를 함께 컨텍스트로 제공

## 문서 업데이트 정책

- 기능 추가/변경 시 관련 문서 동시 수정
- 일일 작업 후 `dailyLogger/YYYY-MM-DD.md` 작성
- 문서 변경은 `docs:` 커밋 prefix 사용
