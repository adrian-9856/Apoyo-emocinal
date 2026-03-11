# 🔧 Instrucciones para Aplicar las Correcciones

## 📋 Problemas Corregidos

### ✅ 1. Checkboxes en columnas equivocadas
**Antes:** Los checkboxes se ponían en TODAS las columnas (Asistencia + Evolución)
**Ahora:** Solo se ponen en columnas de ASISTENCIA (columnas impares: S1, S2, S3...)

### ✅ 2. Pregunta molesta al hacer clic
**Antes:** Al hacer clic en un checkbox preguntaba si querías agregar evolución
**Ahora:** Los checkboxes funcionan normalmente SIN interrupciones

### ✅ 3. Escritura directa de evoluciones
**Mantenido:** Puedes escribir directamente en las celdas de evolución (Evolución S1, S2, etc.)

### ✅ 4. Función masiva intacta
**Mantenido:** La función de nota masiva sigue disponible en el menú

---

## 🚀 Cómo Aplicar las Correcciones

### Paso 1: Abre tu Google Apps Script
1. Abre tu hoja de cálculo de Google Sheets
2. Ve a: **Extensiones** → **Apps Script**
3. Verás tu código actual

### Paso 2: Abre el archivo de correcciones
1. Abre el archivo: `CORRECCIONES_APLICAR.gs` (el que acabo de crear)
2. Copia TODO el contenido

### Paso 3: Aplica los cambios

#### 🔧 Cambio A: Función `crearNuevoGrupoAE()`

1. En tu código actual, busca la función `function crearNuevoGrupoAE() {`
2. Selecciona TODA la función (desde `function crearNuevoGrupoAE()` hasta el último `}` de esa función)
3. Borra la función completa
4. Pega la nueva versión desde el archivo `CORRECCIONES_APLICAR.gs`

#### 🔧 Cambio B: Función `onEdit()`

1. En tu código actual, busca la función `function onEdit(e) {`
2. Selecciona TODA la función (desde `function onEdit(e)` hasta el último `}`)
3. Borra la función completa
4. Pega la nueva versión desde el archivo `CORRECCIONES_APLICAR.gs`

#### 🔧 Cambio C (OPCIONAL): Función `gestionarAsistenciaYEvolucionAE()`

Esta función ya NO se usa automáticamente. Tienes 2 opciones:

**Opción 1 (Recomendada):** Eliminarla completamente
- Busca `function gestionarAsistenciaYEvolucionAE(e)`
- Elimina toda la función

**Opción 2:** Dejarla comentada por si la necesitas después
- Agrega `/*` antes de la función
- Agrega `*/` después de la función

### Paso 4: Guarda y Prueba
1. Haz clic en **Guardar** (icono del diskette 💾)
2. Cierra el editor de Apps Script
3. Vuelve a tu hoja de cálculo
4. Recarga la página (F5 o Ctrl+R)

---

## 🧪 Cómo Probar que Funciona

### ✅ Prueba 1: Crear un nuevo grupo
1. En tu hoja: **Menú** → **💜 Apoyo Emocional** → **👥 Gestión de Grupos** → **🆕 Crear Nuevo Grupo**
2. Sigue los pasos normales
3. **Verifica que:**
   - Las columnas de **Asistencia** (S1, S2, S3...) tienen checkboxes ✅
   - Las columnas de **Evolución** (Evolución S1, S2, S3...) NO tienen checkboxes ✅

### ✅ Prueba 2: Checkboxes sin interrupciones
1. Abre un grupo existente (ej: "Escuela de Padres 1 (2026)")
2. Haz clic en un checkbox de asistencia
3. **Verifica que:**
   - El checkbox se marca/desmarca normalmente
   - NO aparece ninguna pregunta ✅
   - El porcentaje de asistencia se calcula automáticamente ✅

### ✅ Prueba 3: Escribir evoluciones directamente
1. Haz clic en cualquier celda de "Evolución S1" (o S2, S3...)
2. Escribe tu nota directamente
3. Presiona Enter
4. **Verifica que:**
   - La nota se guarda normalmente ✅
   - No hay ningún comportamiento extraño ✅

### ✅ Prueba 4: Función masiva sigue funcionando
1. Marca varios checkboxes de asistencia en una sesión
2. Ve al menú: **💜 Apoyo Emocional** → **👥 Gestión de Grupos** → **📝 Registrar Nota Masiva (Sesión)**
3. Selecciona la sesión y escribe una nota
4. **Verifica que:**
   - La nota se aplica a TODOS los participantes marcados ✅
   - Funciona igual que antes ✅

---

## 📝 Resumen Técnico de los Cambios

### En `crearNuevoGrupoAE()`:

```javascript
// ❌ ANTES (INCORRECTO):
// Se aplicaban checkboxes a un rango completo
sheet.getRange(2, 6, numRows, numSesiones).insertCheckboxes()

// ✅ AHORA (CORRECTO):
// Se aplican checkboxes SOLO a columnas de asistencia individualmente
for (let s = 0; s < numSesiones; s++) {
  const colAsistencia = colSesionesOffset + 1 + (s * 2); // 6, 8, 10, 12...
  const rangeAsistencia = sheet.getRange(2, colAsistencia, numRows, 1);
  rangeAsistencia.insertCheckboxes() // Solo en columnas impares
}
```

### En `onEdit()`:

```javascript
// ❌ ANTES (LLAMABA AUTOMÁTICAMENTE):
if (sheet.getName().includes('(2026)') && col >= 6 && (col % 2 === 0)) {
  gestionarAsistenciaYEvolucionAE(e); // ← Esto causaba las preguntas molestas
}

// ✅ AHORA (COMENTADO/ELIMINADO):
// Ya no se llama automáticamente
// Los checkboxes funcionan normalmente
// Puedes escribir evoluciones directamente
```

---

## ❓ Preguntas Frecuentes

### ¿Qué pasa con los grupos que ya creé antes?
Los grupos anteriores seguirán funcionando como están. Las correcciones solo afectan a los NUEVOS grupos que crees.

### ¿Puedo arreglar los grupos antiguos?
Sí, pero tendrías que recrearlos o ajustarlos manualmente. Si tienes pocos grupos, es más fácil recrearlos.

### ¿Se perdieron mis datos?
No, todos tus datos están seguros. Solo cambiamos el código, no los datos.

### ¿La función masiva sigue funcionando?
Sí, la función masiva NO ha cambiado nada. Sigue funcionando exactamente igual desde el menú.

### ¿Puedo escribir evoluciones individuales?
Sí, ahora puedes escribir directamente en las celdas de "Evolución S1", "Evolución S2", etc. sin ninguna interrupción.

---

## 🆘 Si Algo Sale Mal

### Si ves errores al guardar:
1. Verifica que copiaste la función COMPLETA (incluyendo la llave `}` final)
2. Asegúrate de no haber borrado otras funciones por accidente
3. Revisa que no haya comentarios incompletos (`/*` sin `*/`)

### Si los checkboxes siguen apareciendo mal:
1. Verifica que aplicaste la corrección en `crearNuevoGrupoAE()`
2. Crea un NUEVO grupo de prueba (los anteriores no se actualizan automáticamente)

### Si necesitas ayuda:
1. Revisa el archivo `CORRECCIONES_APLICAR.gs` que tiene explicaciones detalladas
2. Compara tu código con las versiones corregidas
3. Asegúrate de haber guardado los cambios (💾)

---

## ✅ Checklist Final

- [ ] Abrí el editor de Apps Script
- [ ] Reemplacé la función `crearNuevoGrupoAE()` completa
- [ ] Reemplacé la función `onEdit()` completa
- [ ] (Opcional) Eliminé o comenté `gestionarAsistenciaYEvolucionAE()`
- [ ] Guardé los cambios (💾)
- [ ] Recargué la hoja de cálculo
- [ ] Probé crear un nuevo grupo
- [ ] Verifiqué que los checkboxes estén solo en asistencia
- [ ] Probé hacer clic en checkbox (sin preguntas)
- [ ] Probé escribir evolución directamente
- [ ] Probé la función masiva desde el menú

---

🎉 **¡Listo! Tu sistema ahora funciona correctamente.**
