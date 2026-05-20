# State Management

Usar Zustand para:
- auth
- websocket
- filtros globais
- tema

Usar React Query para:
- dados vindos da API
- cache
- sincronização

Evitar prop drilling.

# State Philosophy

Global state exists ONLY for:
- cross-screen operational coordination
- shared campaign state
- operational synchronization

Global state MUST NOT:
- become workflow engine
- become persistence layer
- become backend replacement
- contain presentation logic
- contain UI-only state