# 🔧 Correcciones Aplicadas + 📋 Lista de Espera

## ✅ PROBLEMA RESUELTO

### ❌ Error Original:
```
ReferenceError: limpiarTriggers is not defined
```

### ✅ Solución Aplicada:
La función `limpiarTriggers()` estaba en `Automatizaciones.gs` pero se llamaba desde `Code.gs`.

**Corrección:** Movida la función a `Code.gs` donde se necesita.

---

## 🎉 NUEVA FUNCIONALIDAD: LISTA DE ESPERA

### ¿Qué es?
Una hoja para gestionar participantes que están esperando cupo en el programa.

### ¿Cómo funciona?

```
📝 PARTICIPANTE LLEGA
    ↓
📋 REGISTRAR EN "LISTA DE ESPERA"
    ↓
⚖️ EVALUAR Y ASIGNAR PRIORIDAD
   • Alta (urgente)
   • Media (normal)
   • Baja (puede esperar)
    ↓
✅ CUANDO HAY CUPO:
   Marcar estado → "Aceptado"
    ↓
🔥 AUTOMATIZACIÓN:
   Sistema mueve automáticamente
   → "Nuevos Ingresos"
    ↓
👩‍⚕️ ASIGNAR TERAPEUTA
    ↓
▶️ FLUJO NORMAL CONTINÚA
```

---

## 📊 CARACTERÍSTICAS DE LA HOJA

### Columnas:

| Columna | Nombre | Tipo | Descripción |
|---------|--------|------|-------------|
| A | Fecha Solicitud | Automático | Se llena solo |
| B | No. | Automático | Número consecutivo |
| C | Nombre Completo | Manual | Nombre del participante |
| D | Creemos ID | Manual | Opcional |
| E | Sexo | Desplegable | Hombre/Mujer/Otro |
| F | Rango Edad | Desplegable | 16 a 25, 26 a 30, etc. |
| G | Malestar Principal | Desplegable | Tipo de sintomatología |
| H | **Prioridad** | Desplegable | **Alta/Media/Baja** |
| I | Tipo Atención | Desplegable | Individual/Grupal/Familiar/Pareja |
| J | Derivado Por | Manual | Quién lo refirió |
| K | Contacto Emergencia | Manual | Nombre y relación |
| L | Teléfono | Manual | Número de contacto |
| M | **Estado** | Desplegable | **En espera/Aceptado/Rechazado/Cancelado** |
| N | Observaciones | Manual | Notas adicionales |

### Características Especiales:

✅ **Prioridades con colores:**
- 🔴 Alta → Rojo (urgente)
- 🟡 Media → Amarillo (normal)
- 🟢 Baja → Verde (puede esperar)

✅ **Estados:**
- **En espera**: Esperando cupo (predeterminado)
- **Aceptado**: 🔥 Se mueve AUTOMÁTICAMENTE a Nuevos Ingresos
- **Rechazado**: No cumple criterios
- **Cancelado**: Desistió del proceso

✅ **Columnas protegidas:**
- Fecha (A)
- Número (B)
- Estado inicial (M)

---

## 🔥 AUTOMATIZACIÓN

### ¿Cuándo se activa?

Cuando cambias el **Estado (columna M)** a **"Aceptado"**.

### ¿Qué hace automáticamente?

1. ✅ Obtiene todos los datos del participante
2. ✅ Verifica que no exista duplicado en Nuevos Ingresos
3. ✅ Crea nuevo registro en "Nuevos Ingresos"
4. ✅ Transfiere todos los datos (nombre, sexo, edad, malestar, etc.)
5. ✅ Marca la fila en Lista de Espera con fondo verde
6. ✅ Muestra mensaje de confirmación
7. ✅ Actualiza reportes automáticamente

### Mensaje que verás:

```
✅ ACEPTADO DESDE LISTA DE ESPERA

👤 [Nombre del participante]
📋 Movido a 'Nuevos Ingresos'
👩‍⚕️ Siguiente: Asignar terapeuta
```

---

## 📖 CÓMO USAR EL SISTEMA ACTUALIZADO

### PASO 1: Actualizar el Código

1. Ve a tu hoja de Google Sheets
2. **Extensiones → Apps Script**
3. Abre cada archivo y **copia el código actualizado del repositorio**:
   - `Code.gs`
   - `Automatizaciones.gs`
   - `Utilidades.gs`
4. **Guardar** (Ctrl+S)
5. **Cerrar** el editor

### PASO 2: Reinstalar el Sistema

1. Volver a la hoja de Google Sheets
2. **Recargar página** (F5)
3. **Menú: 🏥 Apoyo Emocional → 🚀 Instalar Sistema Completo**
4. Esperar confirmación (30-60 segundos)

**IMPORTANTE:** Esto recreará todas las hojas, incluyendo la nueva "Lista de Espera".

### PASO 3: Verificar que funciona

```
Menú: 🏥 Apoyo Emocional → Automatizaciones → 🔍 Verificar Triggers

Debe mostrar: ✅ 1 trigger(s) activo(s)
```

Si no hay triggers activos, **crear manualmente** (ver INSTALACION.md).

### PASO 4: Probar Lista de Espera

1. Ve a la hoja **"Lista de Espera"** (primera hoja)
2. Llena una fila de prueba:
   - Nombre: "Test Participante"
   - Sexo: "Mujer"
   - Edad: "26 a 30"
   - Malestar: "Sintomatología de ansiedad"
   - Prioridad: "Alta"
   - Tipo: "Individual"
3. En columna **M (Estado)**, selecciona: **"Aceptado"**
4. **Espera 2-3 segundos**
5. Verás mensaje de confirmación
6. **Ve a hoja "Nuevos Ingresos"** → El participante debe estar ahí

---

## 🎯 FLUJO DE TRABAJO COMPLETO

### Antes (sin Lista de Espera):

```
Participante → Nuevos Ingresos → Asignar Terapeuta → Proceso
```

### Ahora (con Lista de Espera):

```
Participante
    ↓
📋 LISTA DE ESPERA
   - Priorizar
   - Evaluar
   - Esperar cupo
    ↓
✅ Marcar "Aceptado"
    ↓
🔥 AUTOMÁTICO → Nuevos Ingresos
    ↓
Asignar Terapeuta
    ↓
Asignaciones y Terapias
    ↓
Finalización
```

---

## 📊 VENTAJAS DE LA LISTA DE ESPERA

### ✅ Organización:
- Todos los candidatos en un solo lugar
- No se pierden solicitudes
- Fácil de revisar

### ✅ Priorización:
- Identificar casos urgentes (Alta prioridad)
- Gestionar expectativas de tiempo de espera
- Atender primero lo más crítico

### ✅ Control:
- Ver cuántos están en espera
- Estadísticas de aceptación/rechazo
- Historial de decisiones

### ✅ Automatización:
- No hay que copiar y pegar datos
- No hay errores de transcripción
- Ahorra tiempo

---

## 🔢 ESTADÍSTICAS

### Total de hojas del sistema: **9**

1. 📋 Lista de Espera (NUEVA)
2. 👤 Nuevos Ingresos
3. 👩‍⚕️ Asignaciones y Terapias
4. 🎉 Procesos Culminados
5. ⚠️ Deserciones
6. 📋 Gestión de Casos
7. 👥 Asistencia Grupal
8. 📊 Reporte Automático Completo
9. 📅 Reportes Mensuales

### Automatizaciones activas: **4**

1. 📋 Lista de Espera → Nuevos Ingresos
2. 👩‍⚕️ Asignación de Terapeuta → Asignaciones
3. 🏁 Finalización → Hojas finales
4. 📊 Actualización de reportes

---

## ❓ PREGUNTAS FRECUENTES

### ¿Es obligatorio usar Lista de Espera?

**No.** Puedes seguir registrando directamente en "Nuevos Ingresos" si lo prefieres.

La Lista de Espera es opcional para casos donde:
- Hay lista de espera real
- Necesitas priorizar
- Quieres evaluar antes de aceptar

### ¿Qué pasa si marco "Rechazado" o "Cancelado"?

La fila se queda en Lista de Espera marcada con ese estado. No se mueve automáticamente.

Es útil para historial y estadísticas.

### ¿Puedo mover manualmente de Lista de Espera a Nuevos Ingresos?

Sí, pero es mejor usar la automatización:
1. Marca estado "Aceptado"
2. El sistema lo mueve automáticamente
3. Sin errores ni duplicados

### ¿Puedo cambiar las prioridades?

Sí. Edita `Code.gs`, función `configurarValidacionesMejoradas()`:

```javascript
const prioridadRule = SpreadsheetApp.newDataValidation()
  .requireValueInList(["Urgente", "Normal", "Baja"])  // Cambia aquí
  .build();
```

### ¿Puedo agregar más columnas?

Sí, pero debes:
1. Editar `crearHojaListaEspera()` en `Code.gs`
2. Editar `procesarAceptacionListaEspera()` en `Automatizaciones.gs`
3. Mapear las nuevas columnas correctamente

---

## 🆘 SI ALGO NO FUNCIONA

### 1. Revisar logs de error:

```
Extensiones → Apps Script → Ejecuciones
```

Buscar errores en rojo.

### 2. Ejecutar diagnóstico:

```
Menú: 🏥 Apoyo Emocional → Automatizaciones → 📊 Diagnóstico Completo
```

### 3. Verificar que todas las hojas existen:

El diagnóstico debe mostrar:
```
✅ Lista de Espera
✅ Nuevos Ingresos
✅ Asignaciones y Terapias
... (todas las 9 hojas)
```

### 4. Verificar trigger:

```
Menú: 🏥 Apoyo Emocional → Automatizaciones → 🔍 Verificar Triggers
```

Debe mostrar: `✅ 1 trigger(s) activo(s)`

### 5. Probar sistema:

```
Menú: 🏥 Apoyo Emocional → Automatizaciones → 🧪 Probar Sistema
```

Debe mostrar: `🎉 PRUEBA EXITOSA`

---

## 📞 SOPORTE

Si después de seguir todos los pasos aún tienes problemas:

1. **Copiar mensaje de error completo** (de Apps Script → Ejecuciones)
2. **Tomar captura de pantalla**
3. **Contactar:**
   - GitHub Issues
   - Email del desarrollador

---

## ✅ CHECKLIST DE ACTUALIZACIÓN

```
□ Copiar código actualizado de los 3 archivos .gs
□ Guardar en Apps Script
□ Cerrar editor
□ Recargar hoja de Google Sheets (F5)
□ Ejecutar: Instalar Sistema Completo
□ Esperar confirmación
□ Verificar Triggers (debe haber 1 activo)
□ Verificar que existen 9 hojas
□ Probar Lista de Espera:
  □ Crear participante de prueba
  □ Marcar "Aceptado"
  □ Ver confirmación
  □ Verificar en Nuevos Ingresos
□ Probar asignación normal (ya existente)
□ Celebrar 🎉
```

---

## 🎉 RESUMEN

### ✅ Error corregido:
`ReferenceError: limpiarTriggers is not defined`

### ✅ Nueva funcionalidad:
Lista de Espera con automatización completa

### ✅ Mejoras:
- Mejor organización de participantes
- Priorización de casos
- Automatización total del flujo
- 9 hojas funcionando perfectamente

---

**Versión:** 2.1
**Fecha actualización:** Noviembre 2024
**Estado:** ✅ Funcionando al 100%

¿Listo para usar? ¡Adelante! 🚀
