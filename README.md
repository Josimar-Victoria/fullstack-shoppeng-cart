# 🛍️ fullstack-shoppeng-cart 

> E-commerce completo con Next.js, NestJS, Supabase y TypeScript

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10-red?logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?logo=supabase)](https://supabase.com/)

---

## 📸 Vista Previa

```
🏠 Home → 📦 Productos → 🛒 Carrito → ✅ Checkout
                  ↓
          🔐 Login/Registro
                  ↓
          📝 Mis Productos (Gestión CRUD)
```

---

## ⚡ Inicio Rápido (5 minutos)

### 1. Clonar e Instalar

```bash
# Clonar el repositorio
git clone https://github.com/Josimar-Victoria/fullstack-shoppeng-cart
cd fullstack-shoppeng-cart

# Instalar backend
cd backend
npm install

# Instalar frontend
cd ../frontend
npm install
```

### 2. Configurar Supabase

1. **Crear cuenta:** https://supabase.com (gratis)
2. **Crear proyecto nuevo** (espera 2 minutos)
3. **Ir a SQL Editor** y ejecutar:

```sql
-- Copiar y pegar en SQL Editor de Supabase

-- Tabla de usuarios
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de productos
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock INTEGER DEFAULT 0,
  type VARCHAR(50) DEFAULT 'product',
  image TEXT,
  category VARCHAR(100),
  rating DECIMAL(3,2) DEFAULT 0,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices para mejor rendimiento
CREATE INDEX idx_products_user_id ON products(user_id);
CREATE INDEX idx_products_category ON products(category);
```

4. **Copiar credenciales:**
   - Ve a **Settings** → **API**
   - Copia `Project URL` y `service_role key`

### 3. Crear Variables de Entorno

#### `backend/.env`
```env
SUPABASE_URL=https://siwmhgmaxgerzdpjqxfy.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpd21oZ21heGdlcnpkcGpxeGZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0MDc3NjIsImV4cCI6MjA3Njk4Mzc2Mn0.LAmSA4WuChPO-aXo8mVNy_Tu9fo7hHVOEFULzMtwUsQ
JWT_SECRET=tu_secreto_aqui
```

#### `frontend/.env.local`
```env
BACKEND_API_URL="http://localhost:3000"
```

### 4. Ejecutar el Proyecto

**Terminal 1 (Backend):**
```bash
cd backend
npm run start:dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

### 5. ¡Listo! 🎉

Abre tu navegador en: **http://localhost:3000**

---

## ✨ Funcionalidades Principales

### 👤 Usuario
- ✅ Registro e inicio de sesión con JWT
- ✅ Ver catálogo de productos
- ✅ Agregar productos al carrito
- ✅ Ver detalles de productos
- ✅ Gestionar carrito de compras

### 🛠️ Vendedor (Panel de Gestión)
- ✅ **Crear** productos nuevos
- ✅ **Ver** todos mis productos
- ✅ **Editar** productos existentes (botón ✏️)
- ✅ **Eliminar** productos con confirmación (botón 🗑️)
- ✅ Validación de permisos (solo el dueño puede editar/eliminar)

---

## 🎯 Flujo de Uso

### 1. Registro/Login
```
http://localhost:3000
↓
Click en "Registrarse"
↓
Email: test@example.com
Password: 123456
Nombre: Usuario Test
↓
¡Sesión iniciada! ✅
```

### 2. Crear Producto
```
Click en "Crear Nuevo Producto"
↓
Llenar formulario:
  - Nombre: PlayStation 5
  - Precio: 499.99
  - Stock: 10
  - Categoría: Tecnología
  - Imagen: 🎮
↓
Click en "Guardar"
↓
¡Producto creado! ✅
```

### 3. Gestionar Productos
```
Click en "Mis Productos"
↓
Ver lista de tus productos
↓
Opciones por producto:
  • ✏️ Editar → Modificar datos
  • 🗑️ Eliminar → Confirmar en modal
↓
¡Producto actualizado/eliminado! ✅
```

---

## 🏗️ Arquitectura

```
┌─────────────────────────┐
│   Frontend (Next.js)    │  ← Usuario interactúa
│   localhost:3000        │
└───────────┬─────────────┘
            │ HTTP Requests
            ↓
┌─────────────────────────┐
│   API Routes (Proxy)    │  ← Middleware/Seguridad
│   /api/*                │
└───────────┬─────────────┘
            │ REST API
            ↓
┌─────────────────────────┐
│   Backend (NestJS)      │  ← Lógica de negocio
│   localhost:3001        │
└───────────┬─────────────┘
            │ SQL Queries
            ↓
┌─────────────────────────┐
│   Supabase (PostgreSQL) │  ← Base de datos
└─────────────────────────┘
```

---

## 📁 Estructura del Proyecto

```
fullstack-marketplace/
│
├── frontend/                    # Next.js 14 (App Router)
│   ├── src/
│   │   ├── app/
│   │   │   ├── api/            # API Routes (Proxy)
│   │   │   │   ├── auth/
│   │   │   │   │   ├── register/route.ts
│   │   │   │   │   └── login/route.ts
│   │   │   │   └── products/
│   │   │   │       ├── route.ts          # GET, POST
│   │   │   │       ├── [id]/route.ts     # GET, PUT, DELETE
│   │   │   │       └── user/
│   │   │   │           └── my-products/route.ts
│   │   │   │
│   │   │   ├── page.tsx                  # Home
│   │   │   ├── productos/page.tsx        # Catálogo
│   │   │   ├── mis-productos/page.tsx    # 🔥 Gestión CRUD
│   │   │   ├── crear-productos/page.tsx
│   │   │   ├── editar-producto/[id]/page.tsx
│   │   │   ├── detalle/[id]/page.tsx
│   │   │   └── carrito/page.tsx
│   │   │
│   │   ├── components/
│   │   │   ├── ItemCard.tsx              # 🔥 Con botones edit/delete
│   │   │   ├── Navbar.tsx
│   │   │   └── modals/
│   │   │       └── ConfirmationModal.tsx # 🔥 Modal de confirmación
│   │   │
│   │   ├── hook/
│   │   │   ├── useApi.ts                 # 🔥 Hook HTTP requests
│   │   │   └── useToast.ts
│   │   │
│   │   └── lib/
│   │       ├── types.ts
│   │       └── cart-context.tsx
│   │
│   ├── .env.local              # Variables de entorno
│   └── package.json
│
├── backend/                     # NestJS 10
│   ├── src/
│   │   ├── auth/               # Autenticación JWT
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── jwt.strategy.ts
│   │   │
│   │   ├── products/           # 🔥 CRUD Productos
│   │   │   ├── products.controller.ts
│   │   │   └── products.service.ts
│   │   │
│   │   ├── database/
│   │   │   └── supabase.service.ts
│   │   │
│   │   └── main.ts
│   │
│   ├── .env                    # Variables de entorno
│   └── package.json
│
└── README.md                   # Este archivo
```

---

## 🔌 API Endpoints

### Autenticación

| Método | Endpoint | Acceso | Descripción |
|--------|----------|--------|-------------|
| POST | `/auth/register` | Público | Registrar usuario |
| POST | `/auth/login` | Público | Iniciar sesión |

### Productos

| Método | Endpoint | Acceso | Descripción |
|--------|----------|--------|-------------|
| GET | `/products` | Público | Listar todos los productos |
| GET | `/products/:id` | Público | Ver un producto |
| GET | `/products/user/my-products` | 🔒 Privado | Mis productos |
| POST | `/products` | 🔒 Privado | Crear producto |
| PUT | `/products/:id` | 🔒 Privado | Actualizar producto |
| DELETE | `/products/:id` | 🔒 Privado | Eliminar producto |

---

## 🔐 Seguridad

### Frontend
- Token JWT almacenado en `localStorage`
- Rutas protegidas con validación de token
- Redirección automática si no hay sesión

### Backend
- JWT con expiración configurable (default: 7 días)
- Passwords hasheados con bcrypt
- Validación de ownership en operaciones CRUD
- Solo el dueño puede editar/eliminar sus productos

---

## 🧪 Probar la Aplicación

### Test Manual Completo

#### 1. Registro
```bash
# Abrir: http://localhost:3000
# Click en "Registrarse"
# Llenar:
Email: demo@test.com
Password: 123456
Nombre: Demo User
# Click "Registrar"
# ✅ Debe redirigir al home con sesión iniciada
```

#### 2. Crear Producto
```bash
# Click en "Crear Nuevo Producto"
# Llenar:
Nombre: MacBook Pro M3
Descripción: Laptop profesional de última generación
Precio: 2499.99
Stock: 5
Tipo: Producto
Categoría: Tecnología
Imagen: 💻
Rating: 4.9
# Click "Guardar"
# ✅ Debe crear y mostrar en lista
```

#### 3. Ver "Mis Productos"
```bash
# Click en "Mis Productos"
# ✅ Debe mostrar el producto creado
# ✅ Debe mostrar botones flotantes: ✏️ (amarillo) y 🗑️ (rojo)
```

#### 4. Eliminar Producto
```bash
# Click en botón 🗑️
# ✅ Modal aparece: "¿Estás seguro de que deseas eliminar...?"
# Click "Confirmar Eliminación"
# ✅ Spinner aparece brevemente
# ✅ Modal se cierra
# ✅ Producto desaparece de la lista
# ✅ Console log: "✅ Producto eliminado exitosamente"
```

#### 5. Editar Producto
```bash
# Click en botón ✏️
# ✅ Navega a /editar-producto/[id]
# Modificar campos
# Click "Guardar"
# ✅ Producto actualizado
```

---

## 🐛 Solución de Problemas

### Backend no inicia

```bash
# Error: "Port 3001 already in use"
# Solución:

# Mac/Linux:
lsof -ti:3001 | xargs kill -9

# Windows:
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### Frontend muestra "Failed to fetch"

```bash
# Verificar que el backend esté corriendo
# Verificar .env.local:
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001  # ← Debe ser correcto

# Reiniciar frontend
npm run dev
```

### Error "No autorizado" al eliminar

```bash
# Verificar token en localStorage
# Abrir DevTools → Console:
console.log(localStorage.getItem('authToken'));

# Si es null, cerrar sesión y volver a iniciar
localStorage.clear();
# Volver a hacer login
```

### Modal no se cierra después de eliminar

```bash
# Verificar en el código que:
setIsModalOpen(false);
# Se ejecute después de deleteRequest()

# Revisar console.log para errores
```

---

## 📚 Tecnologías Utilizadas

### Frontend
- **Next.js 14+** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utility-first
- **Lucide React** - Iconos modernos
- **Context API** - Estado global del carrito

### Backend
- **NestJS 10** - Framework Node.js escalable
- **TypeScript** - Tipado estático
- **Passport JWT** - Autenticación
- **Bcrypt** - Hash de passwords
- **Class Validator** - Validación de DTOs

### Base de Datos
- **Supabase** - PostgreSQL como servicio
- **PostgreSQL** - Base de datos relacional

---

## 🚀 Siguientes Pasos

### Features Próximas
- [ ] Sistema de Toast notifications
- [ ] Paginación en lista de productos
- [ ] Búsqueda y filtros avanzados
- [ ] Sistema de reseñas
- [ ] Integración de pagos (Stripe)

### Mejoras Técnicas
- [ ] Tests unitarios (Jest)
- [ ] Tests E2E (Playwright)
- [ ] CI/CD con GitHub Actions
- [ ] Docker Compose para desarrollo
- [ ] Documentación con Storybook

---

## 📖 Documentación Adicional

- [QUICK_START.md](./QUICK_START.md) - Guía de inicio rápido
- [CHANGELOG.md](./CHANGELOG.md) - Historial de cambios
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Cómo contribuir
- [API_DOCS.md](./API_DOCS.md) - Documentación de API

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Lee [CONTRIBUTING.md](./CONTRIBUTING.md) para conocer el proceso.

1. Fork el proyecto
2. Crea tu rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](./LICENSE) para más detalles.

---

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Email: tu-email@example.com

---

## 🙏 Agradecimientos

- [Next.js Team](https://nextjs.org/)
- [NestJS Team](https://nestjs.com/)
- [Supabase Team](https://supabase.com/)
- [Vercel](https://vercel.com/)
- Comunidad Open Source

---

## ⭐ Muestra tu apoyo

Si este proyecto te fue útil, ¡dale una ⭐ en GitHub!

---

<div align="center">

**Hecho con ❤️ y ☕**

[⬆ Volver arriba](#-marketplace-full-stack)

</div>
