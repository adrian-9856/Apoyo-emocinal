# 🚨 CORRECCIÓN URGENTE - Problemas Encontrados

## ❌ PROBLEMAS IDENTIFICADOS

### 1. **Nuevos Ingresos tiene columnas extra (H, I, J)**
**Qué está mal:** La hoja "Nuevos Ingresos" tiene columnas extra con datos de:
- Columna H: "Formulario de Bienestar"
- Columna I: "Sistema Automático"
- Columna J: "Apoyo Psicológico"

**Por qué:** Estos datos NO deberían estar en "Nuevos Ingresos". Probablemente se copiaron incorrectamente desde otra hoja.

**Solución:** Eliminar las columnas H, I, J de "Nuevos Ingresos".

---

### 2. **Terapias tiene valores iniciales incorrectos**
**Qué está mal:** La hoja "Terapias" tiene:
- Guiones "-" en las columnas J y K
- Ceros "0" en las columnas M y N
- **En TODAS las filas**, incluso vacías

**Por qué:** La función `crearTerapias()` estaba inicializando valores incorrectamente.

**Solución:** Ya corregí el código. La hoja debe recrearse limpia.

---

## ✅ SOLUCIÓN RÁPIDA - 3 PASOS

### OPCIÓN A: Si NO tienes datos importantes (RECOMENDADA)

Si estás en fase de pruebas y NO hay datos importantes que perder:

#### PASO 1: Actualizar el código
1. Ve a **Extensiones** → **Apps Script**
2. Copia el código actualizado de `SistemaCompleto.gs`
3. Pega en el editor (reemplaza todo)
4. Guarda (Ctrl+S o Cmd+S)
5. Cierra el editor

#### PASO 2: Borrar las hojas problemáticas
1. En el Google Sheet, **elimina estas hojas**:
   - "Nuevos Ingresos"
   - "Terapias"

#### PASO 3: Recrear las hojas
1. Recarga el Google Sheet (F5)
2. Espera a que aparezca el menú "🏥 Apoyo Emocional"
3. Ve a: **🏥 Apoyo Emocional** → **⚙️ Instalación** → **🔄 Instalar Actualizaciones**
4. Esto recreará las hojas correctamente

**✅ LISTO - Las hojas ahora estarán limpias y correctas**

---

### OPCIÓN B: Si TIENES datos importantes

Si ya tienes datos en "Nuevos Ingresos" o "Terapias" que NO quieres perder:

#### PASO 1: Hacer backup de los datos
1. En "Nuevos Ingresos":
   - Selecciona SOLO las columnas A-G (las correctas)
   - Copia los datos (Ctrl+C)
   - Crea una hoja temporal y pega ahí

2. En "Terapias":
   - Selecciona SOLO las filas que tienen datos reales (participantes)
   - Copia esas filas
   - Crea una hoja temporal y pega ahí

#### PASO 2: Limpiar las hojas problemáticas
1. En "Nuevos Ingresos":
   - Selecciona las columnas H, I, J
   - Clic derecho → "Eliminar columnas H-J"

2. En "Terapias":
   - Selecciona TODAS las filas desde la 2 hasta la última
   - Clic derecho → "Eliminar filas 2-X"
   - Esto dejará solo el header

#### PASO 3: Actualizar el código
1. Ve a **Extensiones** → **Apps Script**
2. Copia el código actualizado de `SistemaCompleto.gs`
3. Pega en el editor
4. Guarda (Ctrl+S)
5. Cierra el editor

#### PASO 4: Restaurar los datos
1. De tu hoja temporal, copia los datos de "Nuevos Ingresos"
2. Pega en la hoja "Nuevos Ingresos" (desde fila 2)

3. De tu hoja temporal, copia los datos de "Terapias"
4. Pega en la hoja "Terapias" (desde fila 2)

**✅ LISTO - Los datos están restaurados y las hojas están correctas**

---

## 🔍 VERIFICACIÓN POST-CORRECCIÓN

Después de aplicar la solución, verifica:

### Nuevos Ingresos debe tener:
- [ ] **Exactamente 7 columnas:** A, B, C, D, E, F, G
- [ ] Headers: Fecha Ingreso, No., Nombre Completo, Creamos ID, Género, Edad, Malestar Principal
- [ ] **NO** debe tener columnas H, I, J

### Terapias debe tener:
- [ ] **Exactamente 14 columnas:** A-N
- [ ] Headers correctos (ver abajo)
- [ ] Filas vacías **SIN valores iniciales**
- [ ] **NO** debe tener guiones "-" en filas vacías
- [ ] **NO** debe tener ceros "0" en filas vacías

#### Headers de Terapias (14 columnas):
```
A: Terapeuta
B: Fecha
C: Participante
D: Creamos ID
E: Género
F: Edad
G: Malestar Principal
H: Derivación o Referencia (AQUÍ APARECE EVA)
I: Nombre de quien deriva
J: No. Sesión
K: Estado
L: Motivo Finalización
M: Sesiones Mes Anterior
N: Inasistencias
```

---

## ⚠️ IMPORTANTE

### ¿Por qué pasó esto?

**Problema 1 (Nuevos Ingresos):**
- Probablemente alguien copió datos desde "Lista de Espera" a "Nuevos Ingresos" manualmente
- "Lista de Espera" tiene 14 columnas, pero "Nuevos Ingresos" solo debe tener 7

**Problema 2 (Terapias):**
- El código tenía un bug que inicializaba columnas M y N con valor 0 en TODAS las filas
- Esto creaba guiones y ceros en filas vacías
- **Ya está corregido en el código actualizado**

### ¿Cómo evitar que pase de nuevo?

1. **NUNCA copiar datos manualmente** entre hojas (usar el sistema automático)
2. **Usar las funciones del menú** para agregar datos
3. **NO editar las columnas** que tienen fórmulas protegidas

---

## 📋 CHECKLIST FINAL

Marca cada item cuando lo completes:

- [ ] Actualizar el código en Apps Script
- [ ] Limpiar "Nuevos Ingresos" (eliminar columnas H, I, J)
- [ ] Limpiar "Terapias" (eliminar filas con valores iniciales)
- [ ] O recrear las hojas desde cero (si no hay datos)
- [ ] Verificar que "Nuevos Ingresos" tiene 7 columnas
- [ ] Verificar que "Terapias" tiene 14 columnas
- [ ] Verificar que NO hay guiones ni ceros en filas vacías
- [ ] Probar agregar un caso de prueba
- [ ] Verificar que la transferencia "Vino" funciona correctamente

---

## 🎯 RESUMEN DE CAMBIOS EN EL CÓDIGO

**Archivo:** `SistemaCompleto.gs`

**Cambio realizado:**
```javascript
// ANTES (INCORRECTO):
for (let i = 2; i <= 200; i++) {
  sheet.getRange('M' + i).setValue(0);  // ❌ Inicializa con 0
  sheet.getRange('N' + i).setValue(0);  // ❌ Inicializa con 0
}

// AHORA (CORRECTO):
// NO inicializar valores - se llenarán cuando se agreguen casos
// Las filas vacías permanecen vacías ✅
```

---

## 📞 PRÓXIMO PASO

**Elige la opción que corresponda a tu situación:**

- ✅ **OPCIÓN A:** No tengo datos importantes → Recrear hojas desde cero (5 minutos)
- ✅ **OPCIÓN B:** Tengo datos importantes → Limpiar y restaurar (15 minutos)

**Después de aplicar la corrección:**
1. Verifica que todo esté correcto (usa el checklist)
2. Prueba agregar un caso de prueba
3. Si todo funciona → **¡Sistema listo para producción!**

---

**Fecha:** 2026-02-03
**Estado:** CORRECCIÓN CRÍTICA
**Prioridad:** ALTA
