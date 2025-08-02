# 0725 Project

## [프로젝트 문서 (Notion)](https://scythe-snowplow-4f2.notion.site/0725-Community-Forum-Project-23b7c27c3ffb80f09bafc79a8d187d5b)

<a href="https://scythe-snowplow-4f2.notion.site/0725-Community-Forum-Project-23b7c27c3ffb80f09bafc79a8d187d5b" target="_blank">
  <img src="https://img.shields.io/badge/Notion-Documentation-white?logo=notion" alt="Notion Page" width="200px">
</a>

> [!IMPORTANT]
> 프로젝트의 구조, 개발 현황 및 기타 정보를 확인하려면 위의 Notion 링크를 클릭하세요.

# Source Code Tree

```
.
├── app.controller.ts
├── app.module.ts
├── common
│   ├── constants
│   │   └── index.ts
│   ├── dto
│   │   ├── base.ts
│   │   └── pagination.dto.ts
│   ├── filters
│   │   └── typeorm-exception.filter.ts
│   ├── guards
│   │   └── jwt-auth.guard.ts
│   ├── interceptors
│   │   └── transform.interceptor.ts
│   ├── redis
│   │   ├── index.ts
│   │   ├── redis.module.ts
│   │   └── redis.service.ts
│   ├── types
│   │   └── express-request.interface.ts
│   └── utils
│       └── setupSwagger.ts
├── main.ts
├── migrations
│   └── ...
└── modules
    ├── auth
    │   ├── auth.controller.ts
    │   ├── auth.module.ts
    │   ├── auth.service.ts
    │   ├── dto
    │   │   ├── base.dto.ts
    │   │   ├── request.dto.ts
    │   │   └── response.dto.ts
    │   └── jwt.strategy.ts
    ├── comments
    │   ├── comments.controller.ts
    │   ├── comments.entity.ts
    │   ├── comments.module.ts
    │   ├── comments.service.ts
    │   └── dto
    │       ├── base.dto.ts
    │       ├── request.dto.ts
    │       └── response.dto.ts
    ├── posts
    │   ├── dto
    │   │   ├── base.dto.ts
    │   │   ├── request.dto.ts
    │   │   └── response.dto.ts
    │   ├── posts.controller.ts
    │   ├── posts.entity.ts
    │   ├── posts.module.ts
    │   └── posts.service.ts
    ├── search
    │   ├── dto
    │   │   └── request.dto.ts
    │   ├── search.controller.ts
    │   ├── search.module.ts
    │   └── search.service.ts
    ├── topic
    │   ├── dto
    │   │   ├── request.dto.ts
    │   │   └── response.dto.ts
    │   ├── topic.controller.ts
    │   ├── topic.module.ts
    │   └── topic.service.ts
    ├── topics
    │   ├── dto
    │   │   ├── base.dto.ts
    │   │   ├── request.dto.ts
    │   │   └── response.dto.ts
    │   ├── topics.controller.ts
    │   ├── topics.entity.ts
    │   ├── topics.module.ts
    │   └── topics.service.ts
    └── users
        ├── dto
        │   ├── base.dto.ts
        │   └── response.dto.ts
        ├── users.controller.ts
        ├── users.entity.ts
        ├── users.module.ts
        └── users.service.ts
```
