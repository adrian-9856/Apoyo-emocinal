# 🏥 Sistema de Apoyo Emocional

Sistema automatizado para la gestión de casos de apoyo emocional y seguimiento terapéutico.

**Versión:** 2.0 - Corregida y Optimizada
**Desarrollador:** Adrian Torres - Manufacturing Operations
**Fecha:** Noviembre 2024

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Instalación](#-instalación)
- [Configuración del Trigger](#-configuración-del-trigger-importante)
- [Uso del Sistema](#-uso-del-sistema)
- [Hojas del Sistema](#-hojas-del-sistema)
- [Automatizaciones](#-automatizaciones)
- [Solución de Problemas](#-solución-de-problemas)
- [Preguntas Frecuentes](#-preguntas-frecuentes)

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
3. Crea 3 archivos nuevos:

#### Archivo 1: Code.gs
```
Archivo → Nuevo → Archivo de secuencia de comandos
Nombre: Code.gs
```
Copia el contenido de `Code.gs` de este repositorio

#### Archivo 2: Automatizaciones.gs
```
Archivo → Nuevo → Archivo de secuencia de comandos
Nombre: Automatizaciones.gs
```
Copia el contenido de `Automatizaciones.gs` de este repositorio

#### Archivo 3: Utilidades.gs
```
Archivo → Nuevo → Archivo de secuencia de comandos
Nombre: Utilidades.gs
```
Copia el contenido de `Utilidades.gs` de este repositorio

### Paso 3: Guardar el proyecto

1. Haz clic en el **ícono del disco** o presiona `Ctrl+S`
2. Dale un nombre al proyecto: **"Sistema Apoyo Emocional"**
3. Cierra el editor de Apps Script

### Paso 4: Ejecutar instalación

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
6. Si pide autorización, repite los pasos de permisos del Paso 4 de Instalación

### Verificar que el Trigger funciona:

1. Ve a: **🏥 Apoyo Emocional → Automatizaciones → 🔍 Verificar Triggers**
2. Debe aparecer: **"✅ 1 trigger(s) activo(s)"**
3. Si dice **"❌ NO HAY TRIGGERS"**, repite los pasos anteriores

---

## 📖 Uso del Sistema

### Flujo de Trabajo Completo

```
1. REGISTRO
   ↓
   Ingresar participante en "Nuevos Ingresos"
   ↓
2. ASIGNACIÓN (AUTOMÁTICA)
   ↓
   Seleccionar terapeuta en columna H
   → Sistema envía automáticamente a "Asignaciones"
   ↓
3. GESTIÓN DE SESIONES
   ↓
   Actualizar sesiones en "Asignaciones y Terapias"
   - Número de sesión (Col G)
   - Asistencia (Col J)
   - Comentarios (Col K)
   ↓
4. FINALIZACIÓN (AUTOMÁTICA)
   ↓
   Cambiar estado en columna L:
   - "Proceso culminado"
   - "Deserción"
   - "Gestión de casos"
   → Sistema envía automáticamente a hoja final
   ↓
5. REPORTES AUTOMÁTICOS
   ↓
   Ver estadísticas en "Reporte Automático Completo"
```

### Paso a Paso Detallado

#### 1. Registrar Nuevo Participante

**Hoja:** Nuevos Ingresos

1. Completa la información del participante:
   - **Columna C:** Nombre completo
   - **Columna D:** Creemos ID (opcional)
   - **Columna E:** Sexo (desplegable)
   - **Columna F:** Rango de edad (desplegable)
   - **Columna G:** Malestar principal (desplegable)
   - **Columna I:** Tipo de atención (desplegable)
   - **Columna J:** Derivado por
   - **Columna K:** Contacto de emergencia

2. **Columnas automáticas** (no llenar):
   - **Columna A:** Fecha de ingreso (automática)
   - **Columna B:** Número consecutivo (automático)
   - **Columna L:** Estado (automático)

#### 2. Asignar Terapeuta (Automatización)

**Hoja:** Nuevos Ingresos

1. En la **Columna H** (Terapeuta Asignado), selecciona:
   - Gerber
   - Melissa
   - Diana
   - Karina

2. **✨ AUTOMÁTICO:** Al seleccionar, el sistema:
   - Crea el caso en "Asignaciones y Terapias"
   - Registra fecha de inicio
   - Calcula próxima sesión (7 días)
   - Actualiza estado a "Asignado"
   - Muestra mensaje de confirmación

#### 3. Gestionar Sesiones

**Hoja:** Asignaciones y Terapias

**Columnas importantes:**

- **G - No. Sesión Actual:** Actualizar en cada sesión (1, 2, 3, 4...)
- **J - Asistencia Última:** Seleccionar del desplegable
  - Asistió ✅
  - Faltó ❌
  - Falta justificada
  - Cancelada
  - Reprogramada
- **K - Comentarios Sesión:** Notas sobre la sesión
- **H - Fecha Última Sesión:** Se actualiza automáticamente al cambiar número de sesión
- **I - Próxima Sesión:** Se calcula automáticamente (+7 días)

#### 4. Finalizar Caso (Automatización)

**Hoja:** Asignaciones y Terapias

1. En la **Columna L** (Estado Proceso), cambiar a:
   - **"Proceso culminado"** → Terapia completada exitosamente
   - **"Deserción"** → Participante abandonó
   - **"Gestión de casos"** → Requiere atención especializada

2. **✨ AUTOMÁTICO:** Al cambiar estado, el sistema:
   - Calcula duración total (días)
   - Registra total de sesiones
   - Envía a hoja correspondiente
   - Actualiza reportes
   - Cambia color de fila
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

## 📊 Hojas del Sistema

### 1. Nuevos Ingresos
**Propósito:** Registro inicial de participantes

**Columnas clave:**
- C: Nombre completo
- H: Terapeuta asignado (🔥 AUTOMATIZACIÓN)
- L: Estado ingreso (automático)

### 2. Asignaciones y Terapias
**Propósito:** Gestión de casos activos

**Columnas clave:**
- A: Terapeuta
- G: Número de sesión actual
- J: Asistencia
- L: Estado proceso (🔥 AUTOMATIZACIÓN)

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

**Versión:** 2.0
**Última actualización:** Noviembre 2024
**Desarrollador:** Adrian Torres

---

¿Necesitas ayuda adicional? Ejecuta en el menú:
```
🏥 Apoyo Emocional → ❓ Ayuda
```
