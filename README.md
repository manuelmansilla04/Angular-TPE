# DevBoard **Angular**

Aplicación web desarrollada como Trabajo Práctico Final del Seminario Angular 2026.

- **Nombre:** Mansilla Franco
- **DNI:** 45891208
- **Email:** manuelmansilla2004@gmail.com
- **Sede:** Tandil


## Temática

**DevBoard** es un explorador de repositorios de GitHub. El usuario puede buscar proyectos por tecnología o nombre, guardar favoritos con una etiqueta y prioridad personal, editarlos y eliminarlos.

---

## Requerimientos cumplidos

| Requisito | Implementación |
|---|---|
| Ruteo | `/home` (explorar) y `/favorites` (mis favoritos) |
| Componentes | `repo-card` y `repo-search` dentro de Home |
| Interfaces | `Repository` y `Favorite` en `interfaces/repository.interface.ts` |
| Control de Flujo | `@for` en grillas y listas, `@if` para estados vacíos/error |
| @Input / @Output | `repo-card` recibe datos con `@Input`, emite eventos con `@Output`; `repo-search` emite la búsqueda con `@Output` |
| GET | `GithubService` consume la API pública de GitHub |
| POST / PUT / DELETE | `FavoritesService` gestiona favoritos en MockAPI |
| Reactive Form | Búsqueda con validaciones en `repo-search`; edición de favoritos en `favorites` |

---

## Configuración de MockAPI

1. Crear cuenta en [mockapi.io] (https://mockapi.io)
2. Crear un proyecto nuevo
3. Agregar un recurso llamado `favorites` con los campos del modelo `Favorite`
4. Reemplazar la URL en `src/app/services/favorites.service.ts`

## Cómo correr el proyecto

```bash
npm install
ng serve
```

Luego abrir [http://localhost:4200](http://localhost:4200)
