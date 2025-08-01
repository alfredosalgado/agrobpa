# Documento de Requisitos - Sitio Web AgroBPA

## 1. Descripción General del Proyecto

**AgroBPA Consultores** es una empresa especializada en asesoría técnica para la implementación de Buenas Prácticas Agrícolas (BPA). El sitio web debe reflejar profesionalismo, confianza y compromiso con la agricultura sustentable, dirigido principalmente a productores agrícolas y empresas del sector agroalimentario en Chile.

## 2. Objetivos del Sitio Web

- Presentar los servicios de consultoría en BPA de manera clara y profesional
- Generar confianza y credibilidad en el sector agrícola
- Facilitar el contacto directo con potenciales clientes
- Mostrar la propuesta de valor y diferenciadores de AgroBPA
- Optimizar la experiencia de usuario en dispositivos móviles y desktop

## 3. Arquitectura y Estructura del Sitio

### 3.1 Estructura de Archivos
```
c:/Users/Alfredo/Desktop/Proyectos/Serviciosagrobpa/web/
├── index.html
├── assets/
│   ├── css/
│   │   ├── global.css
│   │   ├── header.css
│   │   ├── hero.css
│   │   ├── about.css
│   │   ├── services.css
│   │   ├── contact.css
│   │   └── footer.css
│   ├── js/
│   │   ├── global.js
│   │   ├── header.js
│   │   ├── hero.js
│   │   ├── about.js
│   │   ├── services.js
│   │   ├── contact.js
│   │   └── footer.js
│   └── img/
│       ├── logo.png
│       └── hero.jpg
```

### 3.2 Secciones del Sitio Web

1. **Header/Navegación**
   - Logo de AgroBPA
   - Menú de navegación responsivo
   - Botón de contacto destacado

2. **Hero Section**
   - Imagen de fondo de 100vh (hero.jpg)
   - Título principal y subtítulo
   - Call-to-action principal
   - Flecha animada de scroll down

3. **Sección Nosotros**
   - Misión, Visión y Valores
   - Propuesta de valor

4. **Servicios**
   - Servicios principales de BPA
   - Beneficios y características

5. **Contacto**
   - Información de contacto
   - Formulario de contacto
   - Ubicación

6. **Footer**
   - Información de la empresa
   - Enlaces importantes
   - Redes sociales

7. **Elementos Flotantes**
   - Botón scroll to top
   - Botón WhatsApp animado

## 4. Especificaciones Técnicas

### 4.1 Tecnologías
- **HTML5**: Estructura semántica
- **CSS3**: Estilos y animaciones
- **JavaScript Vanilla**: Interactividad
- **Responsive Design**: Mobile-first approach

### 4.2 Breakpoints Responsivos
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Laptop**: 1024px - 1439px
- **Desktop**: 1440px+

### 4.3 Paleta de Colores (basada en el logo)
- **Verde Principal**: #2D5016 (verde oscuro del logo)
- **Verde Secundario**: #4A7C59 (verde medio)
- **Verde Claro**: #7BA05B (verde claro)
- **Marrón**: #8B4513 (marrón del logo)
- **Blanco**: #FFFFFF
- **Gris Oscuro**: #333333
- **Gris Claro**: #F5F5F5

## 5. Contenido del Sitio

### 5.1 Hero Section
- **Título**: "Asesoría Técnica para una Agricultura Sustentable"
- **Subtítulo**: "Líderes en implementación de Buenas Prácticas Agrícolas en Chile"
- **CTA**: "Conoce Nuestros Servicios"

### 5.2 Sección Nosotros

**Misión**
Brindar asesoría técnica y estratégica de excelencia en la implementación de Buenas Prácticas Agrícolas (BPA), promoviendo la producción sustentable, segura y responsable en el sector agroalimentario.

**Visión**
Ser reconocidos como líderes en asesorías de Buenas Prácticas Agrícolas a nivel nacional, impulsando una agricultura sustentable, innovadora y comprometida con la calidad e inocuidad alimentaria.

**Valores**
- Compromiso
- Sostenibilidad
- Calidad Técnica
- Innovación
- Ética e Integridad
- Orientación al Cliente

### 5.3 Servicios

1. **Implementación de BPA**
   - Desarrollo e implementación de sistemas BPA
   - Capacitación del personal
   - Documentación y registros

2. **Gestión Digital de Registros**
   - Plataforma web para gestión de actividades
   - Acceso en tiempo real a información
   - Reportes y seguimiento

3. **Asesoría Técnica Continua**
   - Acompañamiento semanal en campo
   - Verificación de cumplimiento
   - Mejora continua de procesos

4. **Certificación y Cumplimiento**
   - Preparación para auditorías
   - Cumplimiento normativo nacional e internacional
   - Documentación técnica especializada

### 5.4 Información de Contacto
- **Representante**: Jorge Cabezas O.
- **Dirección**: Mercedes Pasten #645, Rosario, Rengo
- **Teléfono**: +569 39527192
- **Email**: multiserviciosrengospa@gmail.com
- **WhatsApp**: +569 39527192

## 6. Especificaciones de Diseño

### 6.1 Tipografía
- **Primaria**: 'Roboto', sans-serif (para títulos)
- **Secundaria**: 'Open Sans', sans-serif (para texto)
- **Tamaños**:
  - H1: 2.5rem (mobile) / 3.5rem (desktop)
  - H2: 2rem (mobile) / 2.8rem (desktop)
  - H3: 1.5rem (mobile) / 2rem (desktop)
  - Párrafo: 1rem (mobile) / 1.1rem (desktop)

### 6.2 Espaciado
- **Secciones**: 80px (mobile) / 120px (desktop)
- **Elementos**: 20px (mobile) / 30px (desktop)
- **Contenedores**: max-width 1200px, centrado

### 6.3 Botones
- **Primario**: Fondo verde principal, texto blanco
- **Secundario**: Borde verde principal, texto verde
- **Hover**: Efectos de transición suaves
- **Border-radius**: 5px

### 6.4 Animaciones
- **Scroll down arrow**: Movimiento vertical suave
- **WhatsApp button**: Pulso sutil
- **Hover effects**: Transiciones de 0.3s
- **Scroll animations**: Fade in y slide up

## 7. Funcionalidades Específicas

### 7.1 Navegación
- Menú hamburguesa en mobile
- Navegación sticky en desktop
- Smooth scroll entre secciones
- Indicador de sección activa

### 7.2 Hero Section
- Imagen de fondo responsive
- Overlay para mejorar legibilidad
- Flecha animada de scroll down
- Altura de 100vh

### 7.3 Elementos Flotantes
- **Scroll to top**: Aparece después de 300px de scroll
- **WhatsApp**: Siempre visible, animación de pulso
- **Posición**: Esquina inferior derecha
- **Z-index**: Alto para estar sobre otros elementos

### 7.4 Formulario de Contacto
- Validación en tiempo real
- Campos requeridos marcados
- Mensaje de confirmación
- Integración con email

## 8. Optimización y Performance

### 8.1 Imágenes
- Formato WebP con fallback a JPG
- Lazy loading para imágenes
- Compresión optimizada
- Responsive images con srcset

### 8.2 CSS y JavaScript
- Minificación de archivos
- Carga asíncrona de JS no crítico
- CSS crítico inline
- Prefetch de recursos importantes

### 8.3 SEO
- Meta tags optimizados
- Estructura semántica HTML5
- Schema markup para empresa local
- Sitemap XML

## 9. Compatibilidad

### 9.1 Navegadores
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### 9.2 Dispositivos
- Smartphones (iOS/Android)
- Tablets (iOS/Android)
- Laptops y desktops
- Pantallas de alta resolución

## 10. Entregables

1. Archivo HTML principal (index.html)
2. Archivos CSS modulares por sección
3. Archivos JavaScript modulares por sección
4. Documentación de implementación
5. Guía de mantenimiento

Este documento servirá como base para el desarrollo del sitio web profesional de AgroBPA, asegurando que cumpla con todos los requisitos técnicos y de diseño especificados.