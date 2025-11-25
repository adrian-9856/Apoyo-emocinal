# 🏥 Sistema de Apoyo Emocional

Sistema automatizado para la gestión de casos de apoyo emocional y seguimiento terapéutico.

**Versión:** 3.1 LIMPIA - Super Simplificada
**Desarrollador:** Adrian Torres - Manufacturing Operations
**Fecha:** Noviembre 2024

---

## 📋 Tabla de Contenidos

- [🆕 Novedades Versión 3.0](#-novedades-versión-30)
- [🎯 ¿Qué Archivo Usar?](#-qué-archivo-usar)
- [Características](#-características)
- [Instalación](#-instalación)
- [Configuración del Trigger](#-configuración-del-trigger-importante)
- [Uso del Sistema](#-uso-del-sistema)
- [Hojas del Sistema](#-hojas-del-sistema)
- [Automatizaciones](#-automatizaciones)
- [Solución de Problemas](#-solución-de-problemas)
- [Preguntas Frecuentes](#-preguntas-frecuentes)

---

## 🆕 Novedades Versión 3.1 LIMPIA

### 🎉 NUEVA VERSIÓN SUPER SIMPLIFICADA

**¡Código reducido 50%!** De 1,607 líneas → 804 líneas

### ✨ CAMBIOS EN V3.1 LIMPIA

1. **Código 50% Más Pequeño**
   - Eliminadas todas las funciones innecesarias
   - De 1,607 líneas → 804 líneas
   - Más rápido y eficiente

2. **Asignaciones SUPER SIMPLIFICADA**
   - De 10 columnas → **8 columnas**
   - ❌ Eliminado dropdown de Terapeuta (fluye automáticamente desde Nuevos Ingresos)
   - ❌ Eliminado dropdown de Tipo Terapia (fluye automáticamente desde Nuevos Ingresos)
   - ✅ Los datos fluyen sin necesidad de volver a seleccionarlos

3. **Sin Asistencia Grupal**
   - ❌ Hoja "Asistencia Grupal" eliminada completamente
   - ✅ Sistema enfocado 100% en terapia individual
   - ✅ Código más limpio y rápido

4. **Archivo Único Optimizado**
   - **CodigoCompleto_LIMPIO.gs** (804 líneas)
   - Todo en un solo archivo
   - Super fácil de copiar y pegar

### 📖 Cambios Anteriores (V3.0)

1. **"Sexo" → "Género"**
   - Terminología más inclusiva
   - Nuevas opciones: Hombre, Mujer, Trans hombre, No binario, Otro

2. **Lista de Espera SIMPLIFICADA**
   - Todos los campos son texto libre (sin dropdowns)
   - **SOLO 1 dropdown al final**: columna L "Acción"
   - Seleccionar "Enviar" → mueve a Nuevos Ingresos

3. **Nuevos Ingresos REORGANIZADO**
   - Terapeuta movido AL FINAL (columna K)
   - **Flujo correcto**: Primero llenar todo → Al final asignar terapeuta
   - Ya NO tiene columna de "Estado" automática

4. **Finalización MEJORADA**
   - Al marcar "Finalizado":
     - Aparece diálogo para seleccionar tipo de finalización
     - Solicita motivo detallado
     - Envía email automático al director
     - COPIA (no mueve) a hoja final correspondiente

### 📖 Documentación Completa de v3.0

Para una guía visual detallada del nuevo flujo, consulta:
- **[FLUJO_USO_V3.md](FLUJO_USO_V3.md)** - Guía visual completa paso a paso
- **[ACTUALIZACION_SIMPLIFICADA.md](ACTUALIZACION_SIMPLIFICADA.md)** - Detalles de cambios en Asignaciones

---

## 🎯 ¿Qué Archivo Usar?

### ⭐⭐⭐ OPCIÓN MÁS RECOMENDADA: Versión LIMPIA (NUEVO)

**📄 Usa: `CodigoCompleto_LIMPIO.gs`**

✅ **Ventajas:**
- 🚀 **50% más pequeño** - Solo 804 líneas (vs 1,607 líneas)
- ⚡ **Más rápido** - Código optimizado sin funciones innecesarias
- 🎯 **Más simple** - Asignaciones con solo 8 columnas
- 📊 **Sin Asistencia Grupal** - Enfocado 100% en terapia individual
- 🔄 **Datos fluyen automáticamente** - Sin dropdowns duplicados
- 📄 **Un solo archivo** - Super fácil de copiar y pegar

📦 **Tamaño:** 25 KB (804 líneas super limpias)

**👉 IDEAL PARA:** Todos los usuarios que NO necesitan Asistencia Grupal

📖 **Guía completa:** [GUIA_CODIGO_LIMPIO.md](GUIA_CODIGO_LIMPIO.md)

---

### ⭐ OPCIÓN ALTERNATIVA: Versión Completa

**📄 Usa: `CodigoCompleto.gs`**

✅ **Ventajas:**
- Incluye Asistencia Grupal
- Un solo archivo con TODO el código
- Más funciones (pero más pesado)

❌ **Desventajas:**
- 100% más grande (1,607 líneas)
- Más lento
- Más complejo

📦 **Tamaño:** 54 KB (1,800+ líneas)

**👉 IDEAL PARA:** Usuarios que SÍ necesitan gestionar Asistencia Grupal

---

### 🗂️ OPCIÓN PARA DESARROLLADORES: Archivos Separados

**📄 Usa: `Code.gs` + `Automatizaciones.gs` + `Utilidades.gs`**

✅ **Ventajas:**
- Código organizado por función
- Más modular para desarrolladores

❌ **Desventajas:**
- 3 archivos que mantener sincronizados
- Más pasos en la instalación
- Mayor posibilidad de error si falta un archivo

**👉 IDEAL PARA:** Desarrolladores que quieren modificar código específico

---

### ⚠️ NOTA SOBRE `SistemaCompleto.gs`

Este archivo fue una versión intermedia. **NO se recomienda usar.**

Usa **`CodigoCompleto.gs`** en su lugar (versión final y corregida).

---

## ✨ Características

### 🎯 Funcionalidades Principales

- ✅ **Gestión completa de casos** - Registro desde ingreso hasta finalización
- ✅ **Automatización total** - Asignaciones y finalizaciones automáticas
- ✅ **Reportes en tiempo real** - Estadísticas actualizadas automáticamente
- ✅ **Control de asistencias** - Seguimiento de sesiones individuales y grupales
- ✅ **Validaciones de datos** - Listas desplegables para entrada consistente
- ✅ **Formato condicional** - Códigos de color para estados visuales
- ✅ **Seguimiento por terapeuta** - Carga de casos por profesional

### 🔥 Automatizaciones Incluidas

1. **Asignación automática de terapeutas** → Al seleccionar terapeuta en "Nuevos Ingresos"
2. **Finalización automática de casos** → Al cambiar estado en "Asignaciones"
3. **Actualización de reportes** → Estadísticas en tiempo real
4. **Cálculo de métricas** → Tasas de éxito, promedios, conteos

---

## 🚀 Instalación

### Paso 1: Crear nueva hoja de Google Sheets

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Nómbrala: **"Sistema Apoyo Emocional"**

### Paso 2: Abrir Apps Script

1. En tu hoja, ve a: **Extensiones → Apps Script**
2. Elimina el código que aparece por defecto

### Paso 3: Copiar el código

#### ⭐ OPCIÓN A (RECOMENDADA): Archivo Unificado

**Usa: `CodigoCompleto.gs`**

1. Crea UN SOLO archivo:
   ```
   Archivo → Nuevo → Archivo de secuencia de comandos
   Nombre: CodigoCompleto.gs
   ```

2. Abre el archivo `CodigoCompleto.gs` de este repositorio

3. **Copia TODO el contenido** (1,800+ líneas)

4. **Pega todo** en el archivo de Apps Script

5. **⚠️ IMPORTANTE:** Busca la línea que dice:
   ```javascript
   const emailDirector = "director@apoyoemocional.org";
   ```
   Y cámbiala por el email real del director

#### 🗂️ OPCIÓN B (ALTERNATIVA): Archivos Separados

**Usa: `Code.gs` + `Automatizaciones.gs` + `Utilidades.gs`**

1. Crea 3 archivos:

   **Archivo 1: Code.gs**
   ```
   Archivo → Nuevo → Archivo de secuencia de comandos
   Nombre: Code.gs
   ```
   Copia el contenido de `Code.gs` de este repositorio

   **Archivo 2: Automatizaciones.gs**
   ```
   Archivo → Nuevo → Archivo de secuencia de comandos
   Nombre: Automatizaciones.gs
   ```
   Copia el contenido de `Automatizaciones.gs` de este repositorio

   **Archivo 3: Utilidades.gs**
   ```
   Archivo → Nuevo → Archivo de secuencia de comandos
   Nombre: Utilidades.gs
   ```
   Copia el contenido de `Utilidades.gs` de este repositorio

2. **⚠️ IMPORTANTE:** En `Automatizaciones.gs`, busca la línea 565:
   ```javascript
   const emailDirector = "director@apoyoemocional.org";
   ```
   Y cámbiala por el email real del director

### Paso 4: Guardar el proyecto

1. Haz clic en el **ícono del disco** o presiona `Ctrl+S`
2. Dale un nombre al proyecto: **"Sistema Apoyo Emocional"**
3. Cierra el editor de Apps Script

### Paso 5: Ejecutar instalación

1. Regresa a tu hoja de Google Sheets
2. Recarga la página (`F5` o `Ctrl+R`)
3. Verás aparecer un nuevo menú: **🏥 Apoyo Emocional**
4. Ve a: **🏥 Apoyo Emocional → 🚀 Instalar Sistema Completo**
5. **Primera vez:** Aparecerá una ventana solicitando permisos
   - Clic en **"Revisar permisos"**
   - Selecciona tu cuenta de Google
   - Clic en **"Opciones avanzadas"**
   - Clic en **"Ir a Sistema Apoyo Emocional (no seguro)"**
   - Clic en **"Permitir"**
6. Ejecuta nuevamente: **🏥 Apoyo Emocional → 🚀 Instalar Sistema Completo**
7. Espera a que aparezca el mensaje de confirmación (30-60 segundos)
8. El sistema creará automáticamente todas las hojas con la estructura v3.0

---

## ⚡ Configuración del Trigger (IMPORTANTE)

### ¿Qué es un Trigger?

Un trigger es un activador que ejecuta código automáticamente cuando ocurre un evento (como editar una celda).

### ¿Por qué debo crearlo manualmente?

Por seguridad, Google no permite que los scripts creen triggers automáticamente. Debes hacerlo tú mismo una sola vez.

### Pasos para crear el Trigger:

1. Ve a: **Extensiones → Apps Script**
2. En el menú lateral izquierdo, haz clic en el **ícono del reloj ⏰** (Activadores/Triggers)
3. Haz clic en **"+ Agregar activador"** (esquina inferior derecha)
4. Configura así:
   - **Elija qué función desea ejecutar:** `onEditSistemaCompleto`
   - **Elija qué implementación se debe ejecutar:** `Head`
   - **Seleccione el tipo de evento:** `Desde una hoja de cálculo`
   - **Seleccione el tipo de evento:** `Al editar`
   - **Configuración de notificaciones de fallos:** `Notificarme inmediatamente`
5. Haz clic en **"Guardar"**
6. Si pide autorización, repite los pasos de permisos del Paso 5 de Instalación

**📝 Nota:** El nombre de la función es el mismo (`onEditSistemaCompleto`) tanto si usaste CodigoCompleto.gs como si usaste los 3 archivos separados.

### Verificar que el Trigger funciona:

1. Ve a: **🏥 Apoyo Emocional → Automatizaciones → 🔍 Verificar Triggers**
2. Debe aparecer: **"✅ 1 trigger(s) activo(s)"**
3. Si dice **"❌ NO HAY TRIGGERS"**, repite los pasos anteriores

---

## 📖 Uso del Sistema

### Flujo de Trabajo v3.0 - Simplificado

```
1. LISTA DE ESPERA
   ↓
   Llenar información (C-K) - TODO TEXTO LIBRE
   AL FINAL: Columna L → Seleccionar "Enviar"
   → Sistema envía automáticamente a "Nuevos Ingresos"
   ↓
2. NUEVOS INGRESOS
   ↓
   Revisar datos copiados automáticamente
   Completar dropdowns: Género (E), Tipo Atención (H)
   AL FINAL: Columna K → Seleccionar Terapeuta
   → Sistema envía automáticamente a "Asignaciones"
   ↓
3. ASIGNACIONES Y TERAPIAS (SIMPLIFICADO - 10 columnas)
   ↓
   Actualizar sesiones:
   - Número de sesión (Col G) - Dropdown 1-20
   AL FINALIZAR: Columna H → Seleccionar "Finalizado"
   → Sistema muestra diálogos:
     1. Tipo de finalización (1-3)
     2. Motivo detallado
   → Envía email al director
   → COPIA (no mueve) a hoja final correspondiente
   ↓
4. REPORTES AUTOMÁTICOS
   ↓
   Ver estadísticas en "Reporte Automático Completo"
   Incluye asistencia grupal importada
```

### Paso a Paso Detallado

#### 1. Registrar en Lista de Espera (NUEVO en v3.0)

**Hoja:** Lista de Espera

1. Completa la información del participante (TODO TEXTO LIBRE):
   - **Columna C:** Nombre completo
   - **Columna D:** Creemos ID
   - **Columna E:** Género (texto libre)
   - **Columna F:** Rango de edad (texto libre)
   - **Columna G:** Malestar principal
   - **Columna H:** Derivado por
   - **Columna I:** Contacto de emergencia
   - **Columna J:** Teléfono
   - **Columna K:** Observaciones

2. **AL FINAL:**
   - **Columna L (Acción):** Seleccionar "Enviar" del dropdown
   - **✨ AUTOMÁTICO:** El sistema mueve el registro a "Nuevos Ingresos"

3. **Columnas automáticas** (no llenar):
   - **Columna A:** Fecha de solicitud (automática)
   - **Columna B:** Número consecutivo (automático)

#### 2. Completar Nuevos Ingresos

**Hoja:** Nuevos Ingresos

1. Los datos se copian automáticamente desde Lista de Espera

2. **Completar dropdowns:**
   - **Columna E (Género):** Hombre / Mujer / Trans hombre / No binario / Otro
   - **Columna H (Tipo Atención):** Individual / Grupal / Familiar / Pareja

3. **AL FINAL - Asignar Terapeuta:**
   - **Columna K (Terapeuta Asignado):** Seleccionar del dropdown:
     - Gerber
     - Melissa
     - Diana
     - Karina

4. **✨ AUTOMÁTICO:** Al seleccionar terapeuta, el sistema:
   - Crea el caso en "Asignaciones y Terapias"
   - Registra fecha de inicio
   - Establece sesión = 1
   - Estado = "En proceso"
   - Muestra mensaje de confirmación

#### 3. Gestionar Sesiones

**Hoja:** Asignaciones y Terapias (SIMPLIFICADO - 10 columnas)

**Columnas importantes:**

- **G - No. Sesión:** Dropdown 1-20 para actualizar en cada sesión
- **H - Estado Proceso:** En proceso / Finalizado
- **I - Fecha Inicio:** Automática
- **J - Motivo Finalización:** Se llena automáticamente al finalizar

**🎯 Columnas ELIMINADAS en v3.0** (ahora más simple):
- ❌ Fecha Última Sesión
- ❌ Próxima Sesión
- ❌ Asistencia Última
- ❌ Comentarios Sesión
- ❌ Total Sesiones

#### 4. Finalizar Caso (Automatización MEJORADA en v3.0)

**Hoja:** Asignaciones y Terapias

1. En la **Columna H** (Estado Proceso), cambiar a: **"Finalizado"**

2. **✨ AUTOMÁTICO - DIÁLOGO 1:** Aparece prompt solicitando:
   ```
   Tipo de finalización:
   1 = Proceso culminado
   2 = Deserción
   3 = Gestión de casos
   ```

3. **✨ AUTOMÁTICO - DIÁLOGO 2:** Aparece prompt solicitando:
   ```
   Motivo detallado de la finalización
   (campo de texto libre)
   ```

4. **✨ AUTOMÁTICO:** El sistema:
   - Calcula duración total (días)
   - Registra total de sesiones
   - Envía email al director con todos los detalles
   - **COPIA** (no mueve) a hoja correspondiente:
     - Proceso culminado → Procesos Culminados
     - Deserción → Deserciones
     - Gestión de casos → Gestión de Casos
   - Mantiene el original en "Asignaciones" con color de fondo
   - Actualiza reportes
   - Muestra mensaje de confirmación

#### 5. Control de Asistencia Grupal

**Hoja:** Asistencia Grupal

1. Marcar con **✓** las casillas de asistencia
2. Las estadísticas se calculan automáticamente:
   - Total de participantes
   - Total de asistencias
   - Porcentaje de asistencia

#### 6. Ver Reportes

**Hoja:** Reporte Automático Completo

- Se actualiza automáticamente
- Muestra estadísticas en tiempo real:
  - Nuevos ingresos
  - Casos activos por terapeuta
  - Procesos culminados
  - Deserciones
  - Gestión de casos
  - Tasas de éxito

---

## 📊 Hojas del Sistema (v3.0)

### 1. Lista de Espera (NUEVO en v3.0)
**Propósito:** Registro inicial de solicitudes

**Estructura:** 12 columnas
**Columnas clave:**
- C-K: Datos del participante (texto libre)
- L: Acción (🔥 AUTOMATIZACIÓN - dropdown "Enviar")

### 2. Nuevos Ingresos (REORGANIZADO en v3.0)
**Propósito:** Validación y asignación de casos

**Estructura:** 11 columnas
**Columnas clave:**
- C-J: Datos copiados de Lista de Espera
- E: Género (dropdown con opciones inclusivas)
- H: Tipo Atención (dropdown)
- K: Terapeuta asignado (🔥 AUTOMATIZACIÓN - AL FINAL)

### 3. Asignaciones y Terapias (SIMPLIFICADO en v3.0)
**Propósito:** Gestión de casos activos

**Estructura:** 10 columnas (antes 16)
**Columnas clave:**
- A: Terapeuta
- G: No. Sesión (dropdown 1-20)
- H: Estado proceso (🔥 AUTOMATIZACIÓN - En proceso/Finalizado)
- I: Fecha inicio (automática)
- J: Motivo finalización (automático)

### 3. Procesos Culminados
**Propósito:** Casos finalizados exitosamente

**Datos registrados:**
- Total de sesiones
- Duración del proceso
- Motivo de culminación
- Objetivos alcanzados

### 4. Deserciones
**Propósito:** Casos abandonados

**Datos registrados:**
- Sesiones asistidas
- Motivo de deserción
- Intentos de contacto

### 5. Gestión de Casos
**Propósito:** Casos que requieren atención especializada

**Datos registrados:**
- Tipo de gestión requerida
- Acciones tomadas
- Derivaciones

### 6. Asistencia Grupal
**Propósito:** Control de asistencia a sesiones grupales

**Características:**
- Checkboxes para marcar asistencia
- Fechas de últimos 8 lunes
- Estadísticas automáticas

### 7. Reporte Automático Completo
**Propósito:** Dashboard con estadísticas en tiempo real

**Métricas incluidas:**
- Total de ingresos
- Casos activos por terapeuta
- Procesos culminados
- Tasa de deserción
- Tasa de éxito

### 8. Reportes Mensuales
**Propósito:** Historial de estadísticas mensuales

**Datos por mes:**
- Nuevos ingresos
- Culminados
- Deserciones
- Casos activos
- Distribución por terapeuta

---

## 🤖 Automatizaciones

### Automatización 1: Asignación de Terapeuta

**Se activa cuando:**
- Hoja: "Nuevos Ingresos"
- Columna: H (Terapeuta Asignado)
- Valor: Gerber / Melissa / Diana / Karina

**Acciones automáticas:**
1. Validar datos del participante
2. Verificar que no exista duplicado
3. Crear registro en "Asignaciones y Terapias"
4. Establecer fecha de inicio
5. Calcular próxima sesión (+7 días)
6. Actualizar estado a "Asignado"
7. Actualizar reportes

**Código responsable:** `procesarAsignacionCompleta()`

### Automatización 2: Finalización de Caso

**Se activa cuando:**
- Hoja: "Asignaciones y Terapias"
- Columna: L (Estado Proceso)
- Valor: Proceso culminado / Deserción / Gestión de casos

**Acciones automáticas:**
1. Obtener datos completos del caso
2. Calcular duración (días)
3. Registrar total de sesiones
4. Enviar a hoja correspondiente:
   - "Proceso culminado" → Procesos Culminados
   - "Deserción" → Deserciones
   - "Gestión de casos" → Gestión de Casos
5. Actualizar estado en "Nuevos Ingresos"
6. Cambiar color de fila
7. Actualizar reportes

**Código responsable:** `procesarFinalizacionCompleta()`

### Automatización 3: Actualización de Sesión

**Se activa cuando:**
- Hoja: "Asignaciones y Terapias"
- Columna: G (No. Sesión Actual)
- Valor: Cualquier número

**Acciones automáticas:**
1. Actualizar fecha última sesión
2. Calcular próxima sesión (+7 días)
3. Actualizar total de sesiones

**Código responsable:** `actualizarInformacionSesion()`

---

## 🔧 Solución de Problemas

### Problema 1: Las automatizaciones no funcionan

**Síntomas:**
- Al asignar terapeuta no se crea el caso en "Asignaciones"
- Al cambiar estado no se envía a hoja final

**Solución:**

1. **Verificar trigger:**
   ```
   Menú → Automatizaciones → Verificar Triggers
   ```
   - Debe decir: "✅ 1 trigger(s) activo(s)"
   - Si dice "❌ NO HAY TRIGGERS", crear trigger manualmente (ver sección "Configuración del Trigger")

2. **Ver registro de errores:**
   ```
   Extensiones → Apps Script → Ejecuciones
   ```
   - Revisar si hay errores en rojo
   - Copiar el mensaje de error

3. **Probar sistema:**
   ```
   Menú → Automatizaciones → Probar Sistema
   ```
   - Debe mostrar: "🎉 PRUEBA EXITOSA"

### Problema 2: Error de permisos

**Síntomas:**
- Mensaje: "No tienes permiso..."
- Mensaje: "Script requiere autorización..."

**Solución:**

1. **Autorizar script:**
   ```
   Extensiones → Apps Script
   Ejecutar → instalarSistemaCompletoMejorado
   ```
   - Clic en "Revisar permisos"
   - Selecciona tu cuenta
   - "Opciones avanzadas"
   - "Ir a Sistema Apoyo Emocional (no seguro)"
   - "Permitir"

2. **Si el problema persiste:**
   - Cerrar sesión de Google
   - Volver a iniciar sesión
   - Repetir proceso de autorización

### Problema 3: Fórmulas no funcionan

**Síntomas:**
- Columnas automáticas vacías
- Errores #REF! o #ERROR!

**Solución:**

```
Menú → Automatizaciones → Diagnóstico Completo
```

Si muestra errores en fórmulas:

```
Extensiones → Apps Script
Ejecutar → repararFormulas
```

### Problema 4: Datos duplicados

**Síntomas:**
- Participante aparece 2 veces en "Asignaciones"

**Solución:**

El sistema ya incluye verificación de duplicados. Si ocurre:

1. Eliminar manualmente el registro duplicado en "Asignaciones y Terapias"
2. En "Nuevos Ingresos", borrar el terapeuta asignado
3. Volver a asignar el terapeuta

### Problema 5: Hojas faltantes

**Síntomas:**
- Mensaje: "Hoja X no encontrada"
- Algunas hojas no aparecen

**Solución:**

```
Menú → Instalar Sistema Completo
```

Esto recreará todas las hojas sin afectar datos existentes.

### Problema 6: Menú no aparece

**Síntomas:**
- No aparece el menú "🏥 Apoyo Emocional"

**Solución:**

1. **Recargar página:**
   ```
   Presiona F5 o Ctrl+R
   ```

2. **Verificar código:**
   ```
   Extensiones → Apps Script
   ```
   - Verificar que existan los 3 archivos:
     - Code.gs
     - Automatizaciones.gs
     - Utilidades.gs

3. **Ejecutar onOpen manualmente:**
   ```
   Extensiones → Apps Script
   Ejecutar → onOpen
   ```

### Problema 7: Validaciones no funcionan

**Síntomas:**
- No aparecen listas desplegables
- Se puede escribir cualquier valor

**Solución:**

```
Extensiones → Apps Script
Ejecutar → configurarValidacionesMejoradas
```

### Problema 8: Colores no cambian

**Síntomas:**
- No se aplican colores según estado
- Formato condicional no funciona

**Solución:**

```
Extensiones → Apps Script
Ejecutar → configurarFormatosMejorados
```

---

## ❓ Preguntas Frecuentes

### ¿Puedo personalizar los nombres de los terapeutas?

**Sí.** Edita el código en Apps Script:

```javascript
// En Automatizaciones.gs, busca:
const terapeutas = ["Gerber", "Melissa", "Diana", "Karina"];

// Cambia los nombres:
const terapeutas = ["Tu Nombre 1", "Tu Nombre 2", "Tu Nombre 3", "Tu Nombre 4"];
```

También actualiza en `configurarValidacionesMejoradas()` en Code.gs.

### ¿Puedo agregar más opciones a las listas desplegables?

**Sí.** Edita en Code.gs, función `configurarValidacionesMejoradas()`:

```javascript
// Ejemplo: Agregar más rangos de edad
const edadRule = SpreadsheetApp.newDataValidation()
  .requireValueInList(["16 a 25", "26 a 30", "31 a 40", "41 a 50", "51 a 60", "60+", "70+"])
  .build();
```

### ¿Cómo elimino datos de prueba?

```
Menú → Automatizaciones → Diagnóstico Completo
```

En Apps Script:
```
Ejecutar → limpiarDatosPrueba
```

### ¿Puedo cambiar los colores?

**Sí.** Edita en Code.gs, función `configurarFormatosMejorados()`:

```javascript
// Ejemplo: Cambiar color de "Asignado"
const asignadoRule = SpreadsheetApp.newConditionalFormatRule()
  .whenTextEqualTo("Asignado")
  .setBackground("#tu-color-hexadecimal")
  .build();
```

### ¿Cómo exporto los reportes?

**Opción 1: Copiar hoja**
```
Clic derecho en "Reporte Automático Completo"
→ Copiar a → Nueva hoja de cálculo
```

**Opción 2: Descargar**
```
Archivo → Descargar → PDF o Excel
```

**Opción 3: Programar envío automático**
Contactar al desarrollador para implementar.

### ¿Puedo usar esto en varios equipos?

**Sí.** Opciones:

1. **Compartir la hoja:**
   ```
   Compartir → Agregar correos de tu equipo
   ```

2. **Hacer una copia:**
   ```
   Archivo → Hacer una copia
   ```
   - Repite la instalación en la nueva copia
   - Los triggers son independientes por cada copia

### ¿Cómo hago respaldo de los datos?

**Automático:**
Google Sheets guarda versiones automáticamente:
```
Archivo → Historial de versiones → Ver historial de versiones
```

**Manual:**
```
Archivo → Descargar → Microsoft Excel (.xlsx)
```

### ¿Funciona en Excel?

**No.** Este sistema usa Google Apps Script, exclusivo de Google Sheets.

Para Excel necesitarías convertir a VBA (Visual Basic for Applications).

### ¿Hay límites de registros?

**Límites de Google Sheets:**
- 10 millones de celdas por hoja
- 5 millones de celdas por libro
- Para este sistema: ~50,000 registros sin problemas

Si llegas a estos límites, considera archivar datos antiguos en otra hoja.

### ¿Cómo contacto al desarrollador?

**Adrian Torres**
- GitHub: [Crear issue en el repositorio]
- Email: [Tu email profesional]

---

## 📝 Notas Importantes

### Seguridad y Privacidad

- ⚠️ **Datos sensibles:** Este sistema maneja información personal y de salud
- 🔒 **Permisos de acceso:** Solo compartir con personal autorizado
- 📋 **Cumplimiento:** Asegurar cumplimiento con normativas locales de protección de datos
- 🗑️ **Eliminación segura:** Al eliminar datos, considerar políticas de retención

### Mejores Prácticas

1. **Respaldos regulares:** Descargar copia semanal o mensual
2. **Validación de datos:** Siempre usar listas desplegables, no escribir manualmente
3. **Documentación:** Registrar comentarios importantes en la columna K
4. **Revisión periódica:** Verificar reportes semanalmente
5. **Capacitación:** Asegurar que todo el equipo entienda el flujo de trabajo

### Mantenimiento

**Mensual:**
- Guardar reporte mensual
- Verificar que los triggers estén activos
- Revisar estadísticas generales

**Trimestral:**
- Ejecutar diagnóstico completo
- Actualizar listas desplegables si es necesario
- Archivar datos antiguos si la hoja se vuelve lenta

### Limitaciones Conocidas

- Las automatizaciones requieren conexión a internet
- Los triggers tienen un límite de 90 minutos de ejecución total por día (ampliamente suficiente para uso normal)
- Fórmulas en español pueden variar según configuración regional

---

## 📚 Recursos Adicionales

### Documentación de Google Apps Script
- [Guía oficial](https://developers.google.com/apps-script)
- [Referencia de Spreadsheet Service](https://developers.google.com/apps-script/reference/spreadsheet)

### Soporte
- [Crear Issue en GitHub](https://github.com/tu-usuario/apoyo-emocional/issues)
- [Documentación de Google Sheets](https://support.google.com/docs/topic/9054603)

---

## 📄 Licencia

Este proyecto está bajo licencia MIT. Ver archivo `LICENSE` para más detalles.

---

## 🙏 Agradecimientos

Sistema desarrollado para el equipo de Apoyo Emocional en Manufacturing Operations.

**Versión:** 3.0 - Flujo Simplificado y Unificado
**Última actualización:** Noviembre 2024
**Desarrollador:** Adrian Torres

### 📄 Archivos del Proyecto

- **CodigoCompleto.gs** ⭐ RECOMENDADO - Todo en un archivo
- **Code.gs** + **Automatizaciones.gs** + **Utilidades.gs** - Versión modular
- **FLUJO_USO_V3.md** - Guía visual completa
- **ACTUALIZACION_SIMPLIFICADA.md** - Detalles de cambios

---

¿Necesitas ayuda adicional? Ejecuta en el menú:
```
🏥 Apoyo Emocional → ❓ Ayuda
```

O consulta la guía visual: **[FLUJO_USO_V3.md](FLUJO_USO_V3.md)**
