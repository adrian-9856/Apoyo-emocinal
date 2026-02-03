# ➕ SOLUCIÓN: Agregar Columnas Faltantes a Terapias

## 🔍 PROBLEMA IDENTIFICADO

La hoja "Terapias" **solo tiene 10 columnas** cuando debería tener **14 columnas**.

### Columnas ACTUALES (incorrectas):
```
A: Terapeuta
B: Fecha
C: Participante
D: Creamos ID
E: Género
F: No. Sesión          ← ESTÁ EN COLUMNA INCORRECTA
G: Estado              ← ESTÁ EN COLUMNA INCORRECTA
H: Motivo Finalización ← ESTÁ EN COLUMNA INCORRECTA
I: Sesiones Mes Anterior ← ESTÁ EN COLUMNA INCORRECTA
J: Inasistencias       ← ESTÁ EN COLUMNA INCORRECTA
```

### Columnas FALTANTES (que necesitas):
```
F: Edad                     ❌ FALTA
G: Malestar Principal       ❌ FALTA
H: Derivación o Referencia  ❌ FALTA (¡AQUÍ DEBERÍA ESTAR EVA!)
I: Nombre de quien deriva   ❌ FALTA
```

---

## ✅ SOLUCIÓN AUTOMÁTICA (1 CLIC)

He creado una función que agrega las 4 columnas faltantes automáticamente.

### PASOS:

#### 1. Actualizar el código
1. Ve a **Extensiones** → **Apps Script**
2. Copia el código actualizado de `SistemaCompleto.gs`
3. Pega en el editor (reemplaza todo)
4. Guarda (Ctrl+S o Cmd+S)
5. Cierra el editor

#### 2. Recargar el Sheet
1. Cierra completamente el Google Sheet
2. Vuelve a abrirlo (F5)
3. Espera a que aparezca el menú "🏥 Apoyo Emocional"

#### 3. Ejecutar la función de actualización
1. Ve a: **🏥 Apoyo Emocional** → **⚙️ Instalación** → **➕ AGREGAR Columnas Faltantes Terapias**
2. Lee la advertencia
3. Confirma que quieres continuar
4. La función automáticamente:
   - ✅ Inserta las 4 columnas faltantes (F, G, H, I)
   - ✅ Mueve las columnas existentes a sus posiciones correctas
   - ✅ Actualiza los headers
   - ✅ Ajusta anchos de columnas
   - ✅ Aplica validaciones de datos

#### 4. Verificar que esté correcto
Después de ejecutar, la hoja "Terapias" debe tener:

```
A: Terapeuta
B: Fecha
C: Participante
D: Creamos ID
E: Género
F: Edad                        ✅ NUEVA
G: Malestar Principal          ✅ NUEVA
H: Derivación o Referencia     ✅ NUEVA (¡AQUÍ APARECE EVA!)
I: Nombre de quien deriva      ✅ NUEVA
J: No. Sesión                  (movida desde F)
K: Estado                      (movida desde G)
L: Motivo Finalización         (movida desde H)
M: Sesiones Mes Anterior       (movida desde I)
N: Inasistencias               (movida desde J)
```

**Total: 14 columnas (A-N)**

---

## 📊 ¿QUÉ HACE LA FUNCIÓN?

La función `agregarColumnasFaltantesTerapias()`:

1. **Verifica la estructura actual:**
   - Si ya tiene 14 columnas → No hace nada (ya está actualizado)
   - Si tiene 10 columnas → Procede con la actualización
   - Si tiene otro número → Muestra advertencia

2. **Inserta 4 columnas nuevas:**
   - Inserta después de la columna E (Género)
   - Esto automáticamente mueve las columnas F-J a las posiciones J-N

3. **Actualiza los headers:**
   - Pone los nombres correctos en las 14 columnas
   - Aplica formato (color verde, texto blanco, negrita)

4. **Ajusta anchos de columnas:**
   - Cada columna tiene el ancho óptimo

5. **Aplica validaciones:**
   - Actualiza las validaciones para las nuevas posiciones

---

## ⚠️ IMPORTANTE - ANTES DE EJECUTAR

### Haz un backup de tus datos:
1. Selecciona toda la hoja "Terapias"
2. Copia (Ctrl+C)
3. Crea una nueva hoja temporal
4. Pega ahí (Ctrl+V)

**Por si acaso algo sale mal, podrás restaurar los datos.**

---

## 🔍 VERIFICACIÓN POST-ACTUALIZACIÓN

Después de ejecutar la función, verifica:

### ✅ Columnas correctas:
- [ ] Terapias tiene exactamente 14 columnas (A-N)
- [ ] Columna H se llama "Derivación o Referencia"
- [ ] Los headers están en color verde
- [ ] Los anchos de columna se ven bien

### ✅ Datos movidos correctamente:
- [ ] Los números de sesión están en columna J (no en F)
- [ ] Los estados están en columna K (no en G)
- [ ] Las inasistencias están en columna N (no en J)

### ✅ Validaciones funcionando:
- [ ] Columna A (Terapeuta): Muestra lista de terapeutas
- [ ] Columna E (Género): Muestra lista de géneros
- [ ] Columna J (No. Sesión): Muestra números 1-20
- [ ] Columna K (Estado): Muestra estados

---

## 🎯 DESPUÉS DE LA ACTUALIZACIÓN

Una vez que las columnas estén agregadas:

### Para nuevos casos:
Cuando alguien selecciona "Vino" en Lista de Espera, el sistema ahora transferirá:
- ✅ Edad
- ✅ Malestar Principal
- ✅ Derivación o Referencia (EVA)
- ✅ Nombre de quien deriva

### Para casos existentes:
Los casos que ya están en Terapias tendrán estas 4 columnas **vacías** porque no tenían esos datos antes. Esto es normal.

Solo los **casos nuevos** tendrán estos campos completos.

---

## ❓ PREGUNTAS FRECUENTES

### ¿Se perderán mis datos existentes?
**NO.** Los datos existentes se mueven a las columnas correctas. Por ejemplo:
- Los números de sesión que estaban en F se mueven a J
- Los estados que estaban en G se mueven a K
- Etc.

### ¿Qué pasa con los casos que ya tengo en Terapias?
Las 4 columnas nuevas (F, G, H, I) estarán **vacías** para esos casos porque no tenían esos datos antes. Solo los casos nuevos las tendrán llenas.

### ¿Puedo deshacer si algo sale mal?
Sí, por eso es importante hacer el backup antes. Si algo sale mal:
1. Elimina la hoja "Terapias" actual
2. Crea una nueva hoja llamada "Terapias"
3. Copia los datos desde tu backup
4. Vuelve a intentar

### ¿Necesito ejecutar esta función cada vez?
**NO.** Solo la ejecutas **UNA VEZ**. Después de eso, la hoja ya tendrá las 14 columnas y no necesitas hacerlo de nuevo.

---

## 🚀 RESUMEN RÁPIDO

1. ⬇️ Actualiza el código en Apps Script
2. 🔄 Recarga el Google Sheet
3. ➕ Ejecuta: **🏥 → ⚙️ Instalación → ➕ AGREGAR Columnas Faltantes Terapias**
4. ✅ Verifica que ahora tenga 14 columnas
5. 🎉 ¡Listo! La referencia de Eva ahora aparecerá en columna H

---

**Fecha:** 2026-02-03
**Versión:** v2.1 - Corrección estructura Terapias
**Impacto:** CRÍTICO - Agrega columnas faltantes para referencia Eva
