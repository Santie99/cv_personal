# Santie Portfolio · Sprint 06

Web personal profesional de Santie Bernal construida con Next.js, TypeScript, Tailwind CSS, Supabase y Vercel.

## Estado del proyecto

Sprint 06 incluye:

- Web pública con proyectos, servicios, sobre mí, contacto y notas.
- Supabase para contenido público y mensajes.
- `/admin` privado con login usando Supabase Auth.
- CRUD de proyectos y servicios.
- Edición de perfil.
- Gestión de mensajes.
- SEO base, sitemap, robots y JSON-LD.
- Deploy listo para Vercel.
- Gestión real de imágenes con Supabase Storage.
- Embudo de WhatsApp desde home, servicios, contacto y proyectos.
- `proxy.ts` en lugar de `middleware.ts` para limpiar warning de Next.js 16.

## Instalación local

```bash
npm install
npm run dev
```

Abrir:

```txt
http://localhost:3000
```

## Variables de entorno

Crea `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=TU_ANON_KEY
ADMIN_EMAIL=tu-correo-admin@email.com
SUPABASE_SERVICE_ROLE_KEY=TU_SERVICE_ROLE_KEY
SUPABASE_STORAGE_BUCKET=portfolio-media
```

`SUPABASE_STORAGE_BUCKET` es opcional. Si no existe, se usa `portfolio-media`.

## Supabase

Ejecutar en SQL Editor, en este orden si partes desde cero:

```txt
supabase/schema.sql
supabase/seed.sql
supabase/sprint-03-admin.sql
supabase/sprint-06-storage.sql
```

Si ya venías de sprints anteriores, para Sprint 06 solo necesitas ejecutar:

```txt
supabase/sprint-06-storage.sql
```

## Admin

Login:

```txt
/admin/login
```

Rutas principales:

```txt
/admin
/admin/proyectos
/admin/servicios
/admin/perfil
/admin/media
/admin/mensajes
/admin/guia
```

## Imágenes

Desde Sprint 06, las imágenes se gestionan en Supabase Storage:

- Bucket: `portfolio-media`.
- Lectura pública.
- Escritura solo desde admin/API server.

Usa:

```txt
/admin/media
```

para subir, copiar URL o eliminar imágenes.

También puedes subir directamente desde:

```txt
/admin/perfil
/admin/proyectos/[id]/editar
```

## WhatsApp funnel

Los CTAs toman el número desde:

```txt
/admin/perfil > WhatsApp
```

Si el campo está vacío, los botones redirigen a:

```txt
/contacto
```

Reglas implementadas:

- Home: `Hola, quiero hablarte de una idea`.
- Servicios: `Hola, quiero [texto del botón]`.
- Proyecto individual: mensaje contextual con el nombre del proyecto.
- Contacto: botón WhatsApp junto al correo.

## Validación

```bash
npm run typecheck
npm run build
```

## Documentación relevante

```txt
docs/ENTREGA_SPRINT_06.md
docs/ARCHIVOS_A_REEMPLAZAR_O_CREAR_SPRINT_06.md
docs/INSTRUCCIONES_STORAGE_SPRINT_06.md
docs/GUIA_WHATSAPP_FUNNEL_SPRINT_06.md
docs/PRUEBAS_SPRINT_06.md
```
