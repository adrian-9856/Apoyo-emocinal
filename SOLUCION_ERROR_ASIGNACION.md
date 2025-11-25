# 🔧 SOLUCIÓN: Error "sheetOrigen.getRange is not a function"

## ❌ Error Reportado

```
TypeError: sheetOrigen.getRange is not a function
```

Este error ocurre cuando el trigger no está ejecutándose correctamente.

---

## ✅ SOLUCIÓN RÁPIDA

### Paso 1: Verificar el Trigger

1. Ve a tu Google Sheet
2. **Menú → 🏥 Apoyo Emocional → Automatizaciones → 🔍 Verificar Triggers**
3. Debe mostrar: **"✅ 1 trigger(s) activo(s)"**

Si muestra **"❌ NO HAY TRIGGERS"**, continúa al Paso 2.

---

### Paso 2: Crear el Trigger Manualmente

**⚠️ IMPORTANTE:** El trigger DEBE crearse manualmente. Google no permite que los scripts lo creen automáticamente.

1. Ve a: **Extensiones → Apps Script**

2. En el menú lateral izquierdo, haz clic en el **ícono del reloj ⏰** (Activadores/Triggers)

3. Haz clic en **"+ Agregar activador"** (esquina inferior derecha)

4. Configura EXACTAMENTE así:
   ```
   Función: onEditSistemaCompleto
   Implementación: Head
   Origen del evento: Desde una hoja de cálculo
   Tipo de evento: Al editar
   Notificaciones: Notificarme inmediatamente
   ```

5. Haz clic en **"Guardar"**

6. Si pide autorización:
   - Clic en **"Revisar permisos"**
   - Selecciona tu cuenta
   - Clic en **"Opciones avanzadas"**
   - Clic en **"Ir a Sistema Apoyo Emocional (no seguro)"**
   - Clic en **"Permitir"**

---

### Paso 3: Verificar que Funciona

1. Regresa a tu Google Sheet

2. **Menú → 🏥 Apoyo Emocional → Automatizaciones → 🔍 Verificar Triggers**

3. Debe mostrar: **"✅ 1 trigger(s) activo(s)"**

4. **Probar el sistema:**
   - Ve a "Lista de Espera"
   - Llena una fila (columnas C-K)
   - En columna L selecciona "Enviar"
   - Debe aparecer mensaje de confirmación y mover a "Nuevos Ingresos"

---

## 🔍 DIAGNÓSTICO AVANZADO

Si el problema persiste, ejecuta el diagnóstico:

1. **Extensiones → Apps Script**

2. En el editor, haz clic en **"Ejecutar"** y selecciona: **`diagnosticoCompletoMejorado`**

3. Revisa los logs:
   - Menú: **Ver → Registros de ejecución**
   - Busca errores en rojo

4. Si hay errores, copia el mensaje completo

---

## ⚙️ CAMBIOS REALIZADOS (v3.0.1)

Se agregaron validaciones adicionales en el código para evitar este error:

### En `onEditSistemaCompleto`:
```javascript
// Validar que el evento sea válido
if (!e || !e.range) {
  Logger.log("⚠️ onEditSistemaCompleto: evento no válido");
  return;
}

const sheet = e.range.getSheet();

if (!sheet || typeof sheet.getName !== 'function') {
  Logger.log("❌ ERROR: No se pudo obtener la hoja del evento");
  return;
}
```

### En las funciones de procesamiento:
```javascript
// Validar que sheetOrigen sea válido
if (!sheetOrigen || typeof sheetOrigen.getRange !== 'function') {
  Logger.log("❌ ERROR: sheetOrigen no es válido");
  ss.toast("Error: Parámetro inválido", "Error", 3);
  return false;
}

if (!fila || fila < 2) {
  Logger.log("❌ ERROR: fila inválida");
  return false;
}
```

Estas validaciones ahora muestran mensajes claros si hay un problema.

---

## 📋 CHECKLIST DE VERIFICACIÓN

```
□ Trigger creado con función: onEditSistemaCompleto
□ Tipo de evento: Al editar
□ Verificación muestra: "✅ 1 trigger(s) activo(s)"
□ Prueba en Lista de Espera funciona
□ Prueba en Nuevos Ingresos funciona
□ No hay errores en registros de Apps Script
```

---

## 🆘 SI EL PROBLEMA PERSISTE

1. **Copiar los registros:**
   - Extensiones → Apps Script
   - Ver → Registros de ejecución
   - Copiar últimos 20 mensajes

2. **Verificar que usaste el código correcto:**
   - Debe ser **CodigoCompleto.gs** (recomendado)
   - O los 3 archivos: Code.gs + Automatizaciones.gs + Utilidades.gs

3. **Verificar que el código está completo:**
   - CodigoCompleto.gs debe tener ~1,800 líneas
   - Busca la función `onEditSistemaCompleto` en el código

4. **Eliminar y recrear el trigger:**
   - Apps Script → Activadores (reloj ⏰)
   - Eliminar todos los triggers existentes
   - Crear uno nuevo siguiendo Paso 2

---

## ✅ ARCHIVOS ACTUALIZADOS

- ✅ **CodigoCompleto.gs** - Con validaciones mejoradas
- ✅ **Automatizaciones.gs** - Con validaciones mejoradas
- ✅ Este documento de solución

---

**Versión:** 3.0.1 - Corrección de error de asignación
**Fecha:** Noviembre 2024

---

**¿Sigue sin funcionar?** Proporciona:
1. Mensaje de error completo
2. Captura del trigger configurado
3. Últimos registros de Apps Script
