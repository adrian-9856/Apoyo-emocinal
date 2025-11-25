# 🎯 GUÍA CÓDIGO FINAL v4.0

## ✅ ARCHIVO A USAR

### ⭐ **`CodigoFinal.gs`** - ESTE ES EL ARCHIVO CORRECTO

**Versión:** 4.0 - 100% Funcional
**Tamaño:** 794 líneas
**Cambio Principal:** Hoja se llama **"Terapias"** (no "Asignaciones y Terapias")

---

## 🎉 CAMBIOS PRINCIPALES EN V4.0

### 1. **Nombre de Hoja Simplificado**
- ❌ **Antes:** "Asignaciones y Terapias"
- ✅ **Ahora:** "Terapias"
- **Razón:** Nombre más corto y directo

### 2. **Código 100% Funcional**
- Sin código innecesario
- Sin funciones obsoletas
- Solo lo esencial que funciona
- 794 líneas optimizadas

### 3. **Todo en Un Solo Archivo**
- Copiar y pegar completo
- Sin archivos separados
- Sin confusiones

---

## 📦 ESTRUCTURA DEL SISTEMA

### 7 Hojas en Total

1. **Lista de Espera** (12 columnas)
   - Campos de texto libre
   - Columna L: "Enviar" → Mueve a Nuevos Ingresos

2. **Nuevos Ingresos** (11 columnas)
   - Columna K: Seleccionar Terapeuta → Crea en Terapias

3. **Terapias** (8 columnas) ← NOMBRE NUEVO
   - Terapeuta
   - Participante
   - Creemos ID
   - Género
   - Tipo Terapia
   - No. Sesión (1-20)
   - Estado (En proceso/Finalizado)
   - Motivo Finalización

4. **Procesos Culminados** (6 columnas)

5. **Deserciones** (6 columnas)

6. **Gestión de Casos** (6 columnas)

7. **Reporte** (automático)

---

## ⚡ LAS 3 AUTOMATIZACIONES

### 1️⃣ Lista de Espera → Nuevos Ingresos
**Columna:** L (12)
**Acción:** Seleccionar "Enviar"
**Resultado:** Copia datos a Nuevos Ingresos

### 2️⃣ Nuevos Ingresos → Terapias
**Columna:** K (11)
**Acción:** Seleccionar Terapeuta (Gerber/Melissa/Diana/Karina)
**Resultado:** Crea caso en hoja "Terapias" con 8 columnas

**Datos que fluyen automáticamente:**
- ✅ Terapeuta (de columna K de Nuevos Ingresos)
- ✅ Tipo Terapia (de columna H de Nuevos Ingresos)
- ✅ No necesitas volver a seleccionarlos

### 3️⃣ Terapias → Finalización
**Columna:** G (7)
**Acción:** Seleccionar "Finalizado"
**Resultado:**
1. Aparece diálogo: "Seleccione tipo (1-3)"
2. Aparece diálogo: "Ingrese motivo"
3. Envía email al director
4. Copia a hoja final correspondiente
5. Colorea la fila según el tipo

---

## 🚀 INSTALACIÓN RÁPIDA

### Paso 1: Copiar el Código
```
1. Abrir: CodigoFinal.gs
2. Ctrl+A (Seleccionar todo)
3. Ctrl+C (Copiar)
```

### Paso 2: Pegar en Google Sheets
```
1. Google Sheets → Extensiones → Apps Script
2. Crear archivo: CodigoFinal.gs
3. Ctrl+V (Pegar TODO el código)
4. Guardar (Ctrl+S)
```

### Paso 3: Cambiar Email
```
Buscar línea 698:
const emailDirector = "director@apoyoemocional.org";

Cambiar por tu email real:
const emailDirector = "tu-email@dominio.com";

Guardar (Ctrl+S)
```

### Paso 4: Instalar Sistema
```
1. Regresar a Google Sheets
2. Recargar página (F5)
3. Aparecerá menú: 🏥 Apoyo Emocional
4. Click: 🚀 Instalar Sistema
5. Esperar mensaje de confirmación
```

### Paso 5: Crear Trigger
```
1. Apps Script → Activadores (icono reloj ⏰)
2. + Agregar activador
3. Función: onEditSistema
4. Tipo de evento: Al editar
5. Guardar
```

---

## ✅ VERIFICAR INSTALACIÓN

### Checklist:
```
□ Copié TODO el archivo CodigoFinal.gs (794 líneas)
□ Cambié el email del director (línea 698)
□ Guardé el código
□ Ejecuté: 🏥 Apoyo Emocional → 🚀 Instalar Sistema
□ Creé el trigger: onEditSistema (Al editar)
□ Veo 7 hojas creadas
□ La hoja se llama "Terapias" (no "Asignaciones y Terapias")
□ Terapias tiene 8 columnas
□ Nuevos Ingresos tiene datos de ejemplo
```

### Verificar Trigger:
```
🏥 Apoyo Emocional → 🔍 Verificar Triggers
Debe decir: "✅ 1 trigger(s) activo(s)"
```

---

## 🎯 FLUJO DE TRABAJO

```
┌──────────────────────────────────────┐
│  1️⃣  LISTA DE ESPERA                  │
│  • Llenar datos (texto libre)        │
│  • Columna L → "Enviar"              │
└────────────┬─────────────────────────┘
             │ AUTOMÁTICO
             ↓
┌──────────────────────────────────────┐
│  2️⃣  NUEVOS INGRESOS                  │
│  • Datos ya copiados                 │
│  • Completar campos faltantes        │
│  • Columna K → Seleccionar Terapeuta │
└────────────┬─────────────────────────┘
             │ AUTOMÁTICO
             ↓
┌──────────────────────────────────────┐
│  3️⃣  TERAPIAS (8 COLUMNAS)            │
│  • Terapeuta y Tipo ya vienen        │
│  • Actualizar No. Sesión (1-20)      │
│  • Al terminar: Estado → "Finalizado"│
│    → Tipo (1-3)                      │
│    → Motivo                          │
│    → Email                           │
│    → Copia a hoja final              │
└──────────────────────────────────────┘
```

---

## 📊 COMPARACIÓN DE VERSIONES

| Concepto | v3.1 LIMPIA | v4.0 FINAL |
|----------|-------------|------------|
| **Nombre hoja** | Asignaciones y Terapias | Terapias |
| **Líneas de código** | 804 | 794 |
| **Columnas en hoja** | 8 | 8 |
| **Automatizaciones** | 3 ✅ | 3 ✅ |
| **Nombre más corto** | ❌ | ✅ |
| **Referencias** | 6 palabras | 1 palabra |

---

## 🔧 DIFERENCIAS TÉCNICAS

### Referencias en el Código

**v3.1 LIMPIA:**
```javascript
const asignaciones = ss.getSheetByName("Asignaciones y Terapias");
if (nombreHoja === "Asignaciones y Terapias" && columna === 7)
```

**v4.0 FINAL:**
```javascript
const terapias = ss.getSheetByName("Terapias");
if (nombreHoja === "Terapias" && columna === 7)
```

### Fórmulas en Reporte

**v3.1 LIMPIA:**
```
=CONTAR.SI.CONJUNTO('Asignaciones y Terapias'!A:A;"Gerber";'Asignaciones y Terapias'!G:G;"En proceso")
```

**v4.0 FINAL:**
```
=CONTAR.SI.CONJUNTO(Terapias!A:A;"Gerber";Terapias!G:G;"En proceso")
```

**Ventaja:** Fórmulas más cortas y fáciles de leer

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### ❌ "No veo la hoja Terapias"
```
Usaste el archivo incorrecto.
✅ Usa: CodigoFinal.gs (794 líneas)
❌ NO uses: CodigoCompleto_LIMPIO.gs
```

### ❌ "La hoja se llama Asignaciones y Terapias"
```
Usaste el archivo incorrecto.
✅ Usa: CodigoFinal.gs
La hoja DEBE llamarse solo "Terapias"
```

### ❌ "Las automatizaciones no funcionan"
```
1. Verificar trigger: 🏥 Apoyo Emocional → 🔍 Verificar Triggers
2. Debe decir: "✅ 1 trigger(s) activo(s)"
3. Si no hay trigger, crearlo manualmente
```

### ❌ "No se envían emails"
```
Verificar línea 698:
const emailDirector = "tu-email-real@dominio.com";
Debe ser un email válido
```

---

## 📝 RESUMEN EJECUTIVO

### ✅ CodigoFinal.gs ES:
- ✅ 794 líneas de código funcional
- ✅ Hoja llamada "Terapias" (nombre corto)
- ✅ 8 columnas en Terapias
- ✅ 3 automatizaciones funcionando
- ✅ Sin Asistencia Grupal
- ✅ Todo en un solo archivo
- ✅ Listo para copiar y pegar

### ❌ NO ES:
- ❌ Código con funciones innecesarias
- ❌ Múltiples archivos separados
- ❌ Nombre largo "Asignaciones y Terapias"
- ❌ Código incompleto o parcial

---

## 🎉 VENTAJAS DE V4.0

1. **Nombre más corto:** "Terapias" vs "Asignaciones y Terapias"
2. **Más fácil de escribir** en fórmulas
3. **Más fácil de leer** en el código
4. **Referencias más cortas** en todo el sistema
5. **Mismo funcionamiento** de v3.1 LIMPIA
6. **100% compatible** con todos los procesos

---

**Versión:** 4.0 - Código Final
**Fecha:** Noviembre 2024
**Archivo:** CodigoFinal.gs (794 líneas)

---

**¡TODO LISTO PARA USAR! 🚀**

Copia **CodigoFinal.gs** completo y pega en Apps Script.
