# 🚀 GUÍA RÁPIDA - CodigoCompleto_LIMPIO.gs

## ✅ ESTE ES EL ARCHIVO CORRECTO

**Archivo:** `CodigoCompleto_LIMPIO.gs`
**Líneas:** 804 (super limpio y rápido)

---

## 📋 QUÉ TIENE

### ✅ 3 Automatizaciones (TODO funciona):

1. **Lista de Espera → Nuevos Ingresos**
   - Columna L (12): Seleccionar "Enviar"
   - ✅ Copia automáticamente

2. **Nuevos Ingresos → Asignaciones**
   - Columna K (11): Seleccionar Terapeuta
   - ✅ Crea caso automáticamente

3. **Asignaciones → Finalización**
   - Columna G (7): Seleccionar "Finalizado"
   - ✅ Pregunta tipo y motivo
   - ✅ Envía email
   - ✅ Copia a hoja final

### ✅ Hojas (6 hojas, sin Asistencia Grupal):

1. Lista de Espera (12 columnas)
2. Nuevos Ingresos (11 columnas)
3. Asignaciones y Terapias (8 columnas) ← SUPER SIMPLE
4. Procesos Culminados (6 columnas)
5. Deserciones (6 columnas)
6. Gestión de Casos (6 columnas)
7. Reporte (automático)

---

## 📝 CÓMO INSTALAR

### 1. Abrir Apps Script
```
Google Sheets → Extensiones → Apps Script
```

### 2. Copiar ESTE archivo
```
CodigoCompleto_LIMPIO.gs (804 líneas)
```

### 3. Cambiar email (línea 707)
```javascript
const emailDirector = "director@apoyoemocional.org";
```
Cambiar por email real

### 4. Guardar
```
Ctrl+S
```

### 5. Ejecutar
```
En Google Sheets:
🏥 Apoyo Emocional → 🚀 Instalar Sistema
```

### 6. Crear Trigger
```
Apps Script → Activadores (⏰) → + Agregar
Función: onEditSistema
Tipo: Al editar
```

---

## 🎯 ESTRUCTURA ASIGNACIONES (8 COLUMNAS)

```
A - Terapeuta           (viene de Nuevos Ingresos)
B - Participante
C - Creemos ID
D - Género
E - Tipo Terapia        (viene de Nuevos Ingresos)
F - No. Sesión          (dropdown 1-20)
G - Estado              (En proceso/Finalizado) ← AUTOMATIZACIÓN
H - Motivo Finalización (automático)
```

**SIN dropdowns innecesarios**
Los datos de Terapeuta y Tipo ya vienen correctamente desde Nuevos Ingresos

---

## ⚡ FLUJO COMPLETO

```
1. LISTA DE ESPERA
   ↓
   Llenar C-K (texto libre)
   L → "Enviar"
   ✅ Automático a Nuevos Ingresos

2. NUEVOS INGRESOS
   ↓
   Completar E (Género) y H (Tipo)
   K → Seleccionar Terapeuta
   ✅ Automático a Asignaciones

3. ASIGNACIONES
   ↓
   Actualizar F (Sesión 1-20)
   G → "Finalizado"
   ✅ Pregunta tipo (1-3)
   ✅ Pregunta motivo
   ✅ Envía email
   ✅ Copia a hoja final
```

---

## ✅ VERIFICAR QUE FUNCIONA

### 1. Verificar Trigger
```
🏥 Apoyo Emocional → 🔍 Verificar Triggers
Debe decir: "✅ 1 trigger(s) activo(s)"
```

### 2. Probar Lista de Espera
```
1. Llenar una fila (C-K)
2. En L seleccionar "Enviar"
3. Debe aparecer mensaje verde
4. Debe copiarse a Nuevos Ingresos
```

### 3. Probar Asignación
```
1. En Nuevos Ingresos, columna K
2. Seleccionar un terapeuta
3. Debe aparecer mensaje verde
4. Debe crearse en Asignaciones con 8 columnas
```

### 4. Probar Finalización
```
1. En Asignaciones, columna G
2. Cambiar a "Finalizado"
3. Debe aparecer diálogo pidiendo tipo
4. Debe aparecer diálogo pidiendo motivo
5. Debe enviarse email
6. Debe copiarse a hoja final
```

---

## 🔧 SI HAY PROBLEMAS

### Error: "No se encontró la función"
```
Verifica que copiaste TODO el archivo (804 líneas)
La función debe ser: instalarSistemaCompleto
```

### Las automatizaciones no funcionan
```
Verifica el trigger:
Apps Script → Activadores → Debe existir onEditSistema
Si no existe, créalo manualmente
```

### No aparece el menú
```
Recarga la página (F5)
El menú debe aparecer: 🏥 Apoyo Emocional
```

---

## 📊 DIFERENCIAS CON VERSIÓN ANTERIOR

| Concepto | Antes | Ahora |
|----------|-------|-------|
| Líneas código | 1,607 | 804 |
| Asignaciones columnas | 10 | 8 |
| Hojas | 9 | 7 |
| Dropdowns en Asignaciones | 4 | 2 |
| Asistencia Grupal | ✅ | ❌ |
| Funciones trigger | onEditSistemaCompleto | onEditSistema |
| Funciones instalación | instalarSistemaCompletoMejorado | instalarSistemaCompleto |

---

## ✅ RESUMEN

- ✅ Código 50% más pequeño
- ✅ Más rápido
- ✅ Más simple
- ✅ Sin funciones innecesarias
- ✅ TODAS las automatizaciones funcionan
- ✅ Sin Asistencia Grupal
- ✅ Asignaciones super simple (8 columnas)

---

**¡TODO ESTÁ LISTO PARA COPIAR Y PEGAR!** 🎉
