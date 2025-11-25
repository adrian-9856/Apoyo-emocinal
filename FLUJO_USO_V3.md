# 🎯 FLUJO DE USO - VERSIÓN 3.0

## 📌 CAMBIOS IMPORTANTES

### ✅ LO QUE CAMBIÓ

1. **"Sexo" → "Género"**
   - Nuevas opciones: Hombre, Mujer, Trans hombre, No binario, Otro

2. **Lista de Espera SIMPLIFICADA**
   - Todos los campos son texto libre (sin dropdowns)
   - **SOLO 1 dropdown al final**: columna L "Acción"
   - Seleccionar "Enviar" → mueve a Nuevos Ingresos

3. **Nuevos Ingresos REORGANIZADO**
   - Terapeuta movido AL FINAL (columna K)
   - **Flujo correcto**: Primero llenar todo → Al final asignar terapeuta
   - Ya NO tiene columna de "Estado" automática

4. **Asignaciones SIMPLIFICADO**
   - De 16 columnas → 10 columnas
   - Estado en columna H (antes L)
   - Dropdown 1-20 para sesiones

---

## 🔥 FLUJO COMPLETO PASO A PASO

```
┌─────────────────────────────────────────┐
│  1️⃣  LISTA DE ESPERA (12 columnas)      │
│                                         │
│  Llenar campos C-K (texto libre):      │
│  • C: Nombre Completo                  │
│  • D: Creemos ID                       │
│  • E: Género (texto libre)             │
│  • F: Rango Edad (texto libre)         │
│  • G: Malestar Principal               │
│  • H: Derivado Por                     │
│  • I: Contacto Emergencia              │
│  • J: Teléfono                         │
│  • K: Observaciones                    │
│                                         │
│  AL FINAL:                             │
│  • L: Acción → Seleccionar "Enviar" 🔥 │
│                                         │
└────────────┬────────────────────────────┘
             │ AUTOMÁTICO
             ↓
┌─────────────────────────────────────────┐
│  2️⃣  NUEVOS INGRESOS (11 columnas)      │
│                                         │
│  Se copia automáticamente:             │
│  • C-J: Datos del participante         │
│                                         │
│  AHORA LLENAR:                         │
│  • E: Género (dropdown) ✏️              │
│  • H: Tipo Atención (dropdown) ✏️       │
│                                         │
│  AL FINAL (cuando todo esté listo):    │
│  • K: Terapeuta Asignado 🔥             │
│      (Gerber/Melissa/Diana/Karina)     │
│                                         │
└────────────┬────────────────────────────┘
             │ AUTOMÁTICO
             ↓
┌─────────────────────────────────────────┐
│  3️⃣  ASIGNACIONES Y TERAPIAS (10 cols)  │
│                                         │
│  Se crea automáticamente con:          │
│  • Todos los datos                     │
│  • G: No. Sesión = 1                   │
│  • H: Estado = "En proceso"            │
│                                         │
│  TERAPEUTA TRABAJA:                    │
│  • G: Actualiza sesión (1-20) ✏️        │
│                                         │
│  AL TERMINAR:                          │
│  • H: Marca "Finalizado" 🔥             │
│                                         │
└────────────┬────────────────────────────┘
             │ PROMPTS
             ↓
┌─────────────────────────────────────────┐
│  📝 DIÁLOGO 1: Tipo de finalización     │
│                                         │
│  Opciones:                             │
│  1 = Proceso culminado                 │
│  2 = Deserción                         │
│  3 = Gestión de casos                  │
│                                         │
└────────────┬────────────────────────────┘
             ↓
┌─────────────────────────────────────────┐
│  📝 DIÁLOGO 2: Motivo detallado         │
│                                         │
│  Escribe por qué se finaliza           │
│  (campo de texto libre)                │
│                                         │
└────────────┬────────────────────────────┘
             │ AUTOMÁTICO
             ↓
┌─────────────────────────────────────────┐
│  ✉️  EMAIL AL DIRECTOR                  │
│                                         │
│  Contenido:                            │
│  • Participante                        │
│  • Terapeuta                           │
│  • Tipo de finalización                │
│  • Sesiones realizadas                 │
│  • Duración en días                    │
│  • Motivo detallado                    │
│                                         │
└────────────┬────────────────────────────┘
             │ AUTOMÁTICO
             ↓
┌─────────────────────────────────────────┐
│  📊 COPIA A HOJA FINAL                  │
│                                         │
│  Según tipo:                           │
│  • Proceso culminado → Culminados      │
│  • Deserción → Deserciones             │
│  • Gestión → Gestión de Casos          │
│                                         │
│  ⚠️ MANTIENE el original en Asignaciones│
│     (con color de fondo)               │
│                                         │
└─────────────────────────────────────────┘
```

---

## 📋 ESTRUCTURA DE COLUMNAS

### LISTA DE ESPERA (12 columnas)

| Col | Campo | Tipo | Notas |
|-----|-------|------|-------|
| A | Fecha Solicitud | Auto | Fórmula automática |
| B | No. | Auto | Número consecutivo |
| C | Nombre Completo | **Texto** | Llenar manual |
| D | Creemos ID | **Texto** | Llenar manual |
| E | Género | **Texto** | Texto libre |
| F | Rango Edad | **Texto** | Texto libre |
| G | Malestar Principal | **Texto** | Texto libre |
| H | Derivado Por | **Texto** | Texto libre |
| I | Contacto Emergencia | **Texto** | Texto libre |
| J | Teléfono | **Texto** | Texto libre |
| K | Observaciones | **Texto** | Texto libre |
| L | **Acción** | **Dropdown** | **"Enviar"** → MUEVE a Nuevos Ingresos |

### NUEVOS INGRESOS (11 columnas)

| Col | Campo | Tipo | Notas |
|-----|-------|------|-------|
| A | Fecha Ingreso | Auto | Fórmula automática |
| B | No. | Auto | Número consecutivo |
| C | Nombre Completo | Auto | Se copia de Lista Espera |
| D | Creemos ID | Auto | Se copia de Lista Espera |
| E | Género | Dropdown | Hombre/Mujer/Trans hombre/No binario/Otro |
| F | Rango Edad | Texto | Se copia de Lista Espera |
| G | Malestar Principal | Texto | Se copia de Lista Espera |
| H | Tipo Atención | Dropdown | Individual/Grupal/Familiar/Pareja |
| I | Derivado Por | Texto | Se copia de Lista Espera |
| J | Contacto Emergencia | Texto | Se copia de Lista Espera |
| K | **Terapeuta Asignado** | **Dropdown** | **Gerber/Melissa/Diana/Karina** → ENVÍA a Asignaciones |

### ASIGNACIONES Y TERAPIAS (10 columnas)

| Col | Campo | Tipo | Notas |
|-----|-------|------|-------|
| A | Terapeuta | Auto | Se copia de Nuevos Ingresos |
| B | No. | Auto | Número consecutivo |
| C | Participante | Auto | Se copia de Nuevos Ingresos |
| D | Creemos ID | Auto | Se copia de Nuevos Ingresos |
| E | Género | Auto | Se copia de Nuevos Ingresos |
| F | Tipo Terapia | Auto | Se copia de Nuevos Ingresos |
| G | No. Sesión | Dropdown | 1, 2, 3... hasta 20 |
| H | **Estado Proceso** | **Dropdown** | **En proceso / Finalizado** |
| I | Fecha Inicio | Auto | Fecha de asignación |
| J | Motivo Finalización | Auto | Se llena al finalizar |

---

## 🎯 DROPDOWNS POR HOJA

### Lista de Espera
- **L (Acción)**: Enviar

### Nuevos Ingresos
- **E (Género)**: Hombre / Mujer / Trans hombre / No binario / Otro
- **H (Tipo Atención)**: Individual / Grupal / Familiar / Pareja
- **K (Terapeuta)**: Gerber / Melissa / Diana / Karina

### Asignaciones y Terapias
- **A (Terapeuta)**: Gerber / Melissa / Diana / Karina
- **E (Género)**: Hombre / Mujer / Trans hombre / No binario / Otro
- **F (Tipo Terapia)**: Individual / Grupal / Familiar / Pareja
- **G (No. Sesión)**: 1, 2, 3... 20
- **H (Estado)**: En proceso / Finalizado

---

## ⚙️ OPCIONES DE INSTALACIÓN

### OPCIÓN 1: Archivos Separados (3 archivos)

```
Apps Script:
├── Code.gs            (758 líneas - Instalación y hojas)
├── Automatizaciones.gs (935 líneas - Triggers y automatizaciones)
└── Utilidades.gs      (782 líneas - Diagnóstico y utilidades)
```

**Ventaja**: Código organizado por función
**Desventaja**: 3 archivos que mantener sincronizados

### OPCIÓN 2: Archivo Unificado (RECOMENDADO)

```
Apps Script:
└── SistemaCompleto.gs (2475 líneas - TODO EN UNO)
```

**Ventaja**: Un solo archivo, fácil de actualizar
**Desventaja**: Archivo grande (pero bien comentado)

---

## 🚀 CÓMO INSTALAR

### Si usas ARCHIVOS SEPARADOS:

1. Apps Script → Crear 3 archivos:
   - Code.gs
   - Automatizaciones.gs
   - Utilidades.gs

2. Copiar código de cada archivo del repositorio

3. Guardar (Ctrl+S)

### Si usas ARCHIVO UNIFICADO:

1. Apps Script → Crear 1 archivo:
   - SistemaCompleto.gs

2. Copiar código del repositorio

3. Guardar (Ctrl+S)

### DESPUÉS (para ambas opciones):

4. Configurar email del director:
   - Buscar: `const emailDirector =`
   - Cambiar por email real

5. Ejecutar instalación:
   ```
   Menú → 🏥 Apoyo Emocional → 🚀 Instalar Sistema Completo
   ```

6. Crear trigger:
   ```
   Apps Script → Activadores (⏰)
   + Agregar activador
   Función: onEditSistemaCompleto
   Tipo: Al editar
   Guardar
   ```

---

## 🎨 FLUJO VISUAL RÁPIDO

```
LISTA ESPERA          NUEVOS INGRESOS       ASIGNACIONES
============          ===============       ============

C-K: Texto libre      Se copia auto         Se crea auto
                            ↓                      ↓
L: "Enviar" 🔥        Llenar E,H            Trabajar con G
      ↓                     ↓                      ↓
  MUEVE AUTO          K: Terapeuta 🔥       H: "Finalizado" 🔥
                            ↓                      ↓
                      ENVÍA AUTO            PROMPTS + EMAIL
                                                  ↓
                                            COPIA A FINAL
```

---

## 📧 EMAIL AL DIRECTOR

**IMPORTANTE:** Configurar antes de usar

```javascript
// Automatizaciones.gs (o SistemaCompleto.gs)
// Línea aproximada: 565

const emailDirector = "TU_EMAIL_AQUI@dominio.com"; // ⚠️ CAMBIAR
```

**Contenido del email:**
- Participante, Terapeuta
- Tipo de finalización
- Sesiones realizadas
- Duración del proceso
- Motivo detallado

---

## ✅ VERIFICACIÓN RÁPIDA

### ¿Está todo funcionando?

```
□ Código instalado (opción 1 o 2)
□ Email del director configurado
□ Sistema ejecutado (Instalar Sistema Completo)
□ Trigger creado (onEditSistemaCompleto - Al editar)
□ Validaciones aplicadas

PRUEBA:
□ Lista Espera → llenar fila → "Enviar" → ¿se mueve?
□ Nuevos Ingresos → asignar Terapeuta (K) → ¿se crea en Asignaciones?
□ Asignaciones → marcar "Finalizado" (H) → ¿aparecen prompts?
□ ¿Llegó email al director?
□ ¿Se copió a hoja final?
□ ¿Se mantuvo en Asignaciones con color?
```

---

## 🆘 SOLUCIÓN RÁPIDA DE PROBLEMAS

### ❌ "No aparecen dropdowns"
```
Menú → 🏥 Apoyo Emocional → 🔧 Configurar Validaciones
```

### ❌ "No funciona la automatización"
```
Apps Script → Activadores
Verificar: onEditSistemaCompleto - Al editar - ✅
```

### ❌ "No se mueve de Lista Espera"
```
Verificar:
- Columna L tiene dropdown "Enviar"
- Trigger está activo
- Nombre en columna C no está vacío
```

### ❌ "No se envía email"
```
Verificar:
- Email configurado en línea 565 (o buscar "emailDirector")
- Permisos de MailApp autorizados
- Revisar: Apps Script → Ejecuciones (buscar errores)
```

### ❌ "Terapeuta no envía a Asignaciones"
```
Verificar:
- Trigger activo
- Terapeuta está en columna K (no H)
- Seleccionando desde dropdown (no escribiendo)
```

---

## 📊 RESUMEN DE COLUMNAS CLAVE

| Hoja | Columna | Campo | Acción |
|------|---------|-------|--------|
| Lista Espera | **L** | Acción | "Enviar" → mueve |
| Nuevos Ingresos | **K** | Terapeuta | Asignar → envía |
| Asignaciones | **H** | Estado | "Finalizado" → prompts |

---

## 🎯 ORDEN CORRECTO DE USO

### ✅ CORRECTO:

```
1. Llenar TODO en Lista Espera (C-K)
2. AL FINAL: Seleccionar "Enviar" (L)
   ↓
3. Llenar faltantes en Nuevos Ingresos (E, H si necesario)
4. AL FINAL: Asignar Terapeuta (K)
   ↓
5. Trabajar sesiones en Asignaciones (G)
6. AL TERMINAR: Marcar "Finalizado" (H)
```

### ❌ INCORRECTO:

```
❌ Asignar terapeuta antes de llenar datos
❌ Marcar "Finalizado" sin llenar sesiones
❌ Usar texto libre en lugar de dropdown
```

---

## 💡 CONSEJOS

1. **Género**: Ahora acepta más opciones inclusivas
2. **Lista Espera**: Más rápido - todo es texto libre
3. **Flujo**: Más intuitivo - acciones al final
4. **No se pierde nada**: Finalizados se copian, no se mueven
5. **Director informado**: Email automático cada finalización

---

## 📞 SOPORTE

**Diagnóstico:**
```
Menú → Automatizaciones → Diagnóstico Completo
```

**Ver logs:**
```
Apps Script → Ejecuciones
```

**Verificar triggers:**
```
Menú → Automatizaciones → Verificar Triggers
```

---

**Versión:** 3.0
**Fecha:** Noviembre 2024
**Compatibilidad:** Google Sheets + Apps Script

🎉 ¡Sistema más simple, más rápido, más inclusivo!
