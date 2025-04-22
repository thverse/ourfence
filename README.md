# OurFence - SNS 플랫폼 프로젝트

## 📌 프로젝트 소개

X(구 Twitter)를 모티브로 한 소셜 네트워킹 서비스입니다. Next.js와 TypeScript를 기반으로 개발되었으며, 실시간 상호작용과 최적화된 사용자 경험을 제공합니다.

## 🔗 프로젝트 링크

- **GitHub**: [OurFence Repository](repository-link)
- **배포 URL**: [https://ourfence.vercel.app](deployment-link)

## 🛠 사용 기술

### Frontend

- **Framework**: Next.js 13+
- **Language**: TypeScript
- **State Management**:
  - TanStack Query (React Query)
  - Zustand
- **Styling**: Tailwind CSS
- **UI Library**: shadcn/ui
- **Form & Validation**: React Hook Form, Zod
- **HTTP Client**: Axios
- **Others**: date-fns, Lucide React

## 🔍 주요 기능

### 1. 인증 시스템

- 회원가입/로그인 기능
- 사용자 인증 상태 관리
- 보호된 라우트 구현

```typescript
// 인증 상태에 따른 라우팅 보호 예시
export default function ProtectedLayout({ children }: Props) {
  const pathname = usePathname();
  const { data: user } = useCurrentUser();
  const excludedPaths = ["/signin", "/signup"];

  if (!user && !excludedPaths.includes(pathname)) {
    redirect("/signin");
  }

  return <>{children}</>;
}
```

### 2. 게시물 관리

- 이미지 업로드가 가능한 게시물 작성
- 실시간 좋아요 기능 (Optimistic Updates)
- 무한 스크롤 피드

```typescript
// 낙관적 업데이트를 적용한 좋아요 기능 예시
const { mutate: toggleLike } = useMutation({
  mutationFn: (post: Post) => {
    return post.isLiked
      ? postService.unlikePost(post.id)
      : postService.likePost(post.id);
  },
  onMutate: async (post) => {
    await queryClient.cancelQueries({ queryKey: ["post", post.id] });
    const previousPost = queryClient.getQueryData(["post", post.id]);
    queryClient.setQueryData(["post", post.id], {
      ...post,
      isLiked: !post.isLiked,
    });
    return { previousPost };
  },
});
```

### 3. 댓글 시스템

- 실시간 댓글 작성 및 삭제
- 스팸 방지를 위한 작성 간격 제한
- 댓글 작성자 권한 관리

```typescript
// 댓글 작성 시간 제한 구현 예시
const [lastCommentTime, setLastCommentTime] = useState<number>(0);

const onSubmit = (data: CommentFormData) => {
  const now = Date.now();
  if (now - lastCommentTime < 30000) {
    toast.error(
      `${Math.floor(
        30 - (now - lastCommentTime) / 1000
      )}초 후 다시 시도해주세요.`
    );
    return;
  }
  setLastCommentTime(now);
  createComment(data);
};
```

### 4. 프로필 관리

- 프로필/커버 이미지 업로드
- 사용자 정보 수정
- 작성/좋아요/댓글 탭별 게시물 조회

```typescript
// 프로필 페이지 탭 구현 예시
const tabItems = [
  { id: PostType.ME, label: "게시물" },
  { id: PostType.LIKE, label: "좋아요" },
  { id: PostType.COMMENT, label: "댓글" },
];

const { data: postList } = usePostListFromUser({
  type: selectedTabId as PostType,
  targetUserId: userId,
});
```

## 🎯 핵심 구현 사항

### 1. 최적화된 상태 관리

- React Query를 활용한 서버 상태 관리
- 캐시 전략을 통한 성능 최적화
- Optimistic Updates로 사용자 경험 향상

### 2. 모듈형 아키텍처

- 기능별 모듈화로 코드 재사용성 향상
- Custom Hook을 통한 비즈니스 로직 분리
- 컴포넌트 계층 구조 최적화

### 3. 반응형 디자인

- 모바일 퍼스트 접근
- Tailwind CSS를 활용한 반응형 UI
- 직관적인 사용자 인터페이스

## 📈 성과 및 배운 점

1. **기술적 성과**

   - React Query를 활용한 효율적인 상태 관리 구현
   - TypeScript를 통한 타입 안정성 확보
   - 컴포넌트 재사용성 향상

2. **문제 해결**

   - 실시간 데이터 동기화 문제 해결
   - 이미지 최적화 및 성능 개선
   - 사용자 경험 최적화

3. **배운 점**
   - 대규모 애플리케이션의 상태 관리 전략
   - 컴포넌트 설계 패턴
   - 성능 최적화 기법

## 🔜 향후 계획

1. **기능 개선**

   - 실시간 알림 시스템 구현
   - 팔로우/팔로잉 기능 추가
   - 다중 이미지 업로드 지원

2. **성능 최적화**
   - 이미지 레이지 로딩 구현
   - 번들 사이즈 최적화
   - 캐싱 전략 개선

이 프로젝트를 통해 현대적인 웹 개발 기술 스택을 활용하여 실제 서비스와 유사한 기능을 구현하는 경험을 쌓았습니다. 특히 상태 관리와 사용자 경험 최적화에 중점을 두어 개발했습니다.
