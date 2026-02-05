# 🚨 SOLUCIONAR PROBLEMA DE CORREOS

## ¿Cuál es el problema?

Cuando asignas un terapeuta en **Lista de Espera** (columna M), el sistema NO está enviando el email al terapeuta.

---

## ✅ SOLUCIÓN PASO A PASO

### PASO 1: Configurar Emails de Terapeutas

**ESTO ES LO MÁS IMPORTANTE** - Si no configuras los emails, NUNCA se enviarán.

1. **Abre tu Google Sheet**

2. **Ve al menú:**
   ```
   🔧 Configuración
   └─> 👥 Configurar Emails Terapeutas
   ```

3. **El sistema te pedirá el email de cada terapeuta:**
   - Gerber
   - Melissa
   - Diana
   - Karina

4. **Ingresa cada email COMPLETO:**
   ```
   Ejemplos CORRECTOS:
   ✅ gerber@creamos.org
   ✅ melissa.lopez@gmail.com
   ✅ diana_terapeuta@yahoo.com
   ✅ karina.sanchez@creamos.org

   Ejemplos INCORRECTOS:
   ❌ gerber
   ❌ melissa@creamos
   ❌ diana (falta @)
   ```

5. **Confirma cuando termine**

---

### PASO 2: Probar que Funciona

**NUEVA FUNCIÓN** - Ahora puedes probar antes de usar en producción.

1. **Abre el menú:**
   ```
   🔧 Configuración
   └─> 👨‍⚕️ 🔍 PROBAR EMAILS TERAPEUTAS
   ```

2. **El sistema mostrará:**
   ```
   📋 ESTADO DE EMAILS DE TERAPEUTAS

   ✅ Gerber: gerber@creamos.org
   ✅ Melissa: melissa.lopez@gmail.com
   ❌ Diana: NO CONFIGURADO
   ❌ Karina: NO CONFIGURADO

   Total configurados: 2/4
   Sin configurar: 2/4
   ```

3. **Si dice "NO CONFIGURADO":**
   - Regresa al PASO 1
   - Configura los emails que faltan

4. **Si dice "configurado":**
   - Haz clic en "SÍ" para enviar email de prueba
   - Los terapeutas recibirán un email
   - Verás resultado de cada envío

5. **Resultado esperado:**
   ```
   📊 RESULTADOS:

   ✅ Gerber: EMAIL ENVIADO
   ✅ Melissa: EMAIL ENVIADO

   Enviados: 2
   Errores: 0
   ```

---

### PASO 3: Verificar Recepción

1. **Pide a los terapeutas que revisen:**
   - ✉️ Bandeja de entrada
   - 📁 Carpeta de spam/correo no deseado

2. **El email de prueba dice:**
   ```
   De: noreply@google.com
   Asunto: ✅ Prueba - Asignación de Caso

   Hola [Terapeuta],

   ✅ ESTE ES UN EMAIL DE PRUEBA ✅

   Si recibes este email, significa que el sistema
   está funcionando correctamente.
   ```

3. **Si NO reciben el email:**
   - Revisa que el email esté bien escrito
   - Revisa la carpeta de spam
   - Continúa al PASO 4 (Permisos)

---

### PASO 4: Verificar Permisos (Si NO funciona)

**Si los emails de prueba NO se envían:**

1. **Ve a Apps Script:**
   ```
   En Google Sheet:
   Extensiones → Apps Script
   ```

2. **Verifica permisos:**
   - Haz clic en: ⚙️ (ícono de configuración)
   - Permisos
   - Verifica que tenga permiso para enviar emails

3. **Si pide permisos:**
   - Haz clic en "Revisar permisos"
   - Selecciona tu cuenta de Google
   - Haz clic en "Permitir"

4. **Regresa al PASO 2** y prueba otra vez

---

### PASO 5: Usar en Producción

**Después de que PASO 2 funcione:**

1. **Asigna un terapeuta en Lista de Espera:**
   - Columna M: "Terapeuta Asignado"
   - Selecciona: Gerber, Melissa, Diana o Karina

2. **El sistema mostrará:**

   ✅ **Si email configurado:**
   ```
   ✅ CASO ASIGNADO

   👤 Participante: Juan Pérez
   👨‍⚕️ Terapeuta: Gerber

   📧 Email enviado exitosamente al terapeuta
   ```

   ⚠️ **Si email NO configurado:**
   ```
   ⚠️ CASO ASIGNADO (SIN EMAIL)

   👤 Participante: Juan Pérez
   👨‍⚕️ Terapeuta: Gerber

   ❌ No se envió email (no configurado)

   CONFIGURAR EMAILS:
   Menú → 🔧 Configuración
        → 👥 Configurar Emails Terapeutas
   ```

3. **El terapeuta recibirá:**
   ```
   De: noreply@google.com
   Asunto: 🔔 Nuevo Caso Asignado: Juan Pérez

   Hola Gerber,

   Se te ha asignado un nuevo caso:

   👤 Participante: Juan Pérez
   👨‍⚕️ Terapeuta asignado: Gerber
   📋 Fila en Lista de Espera: 5

   📌 ACCIÓN REQUERIDA:
   1. Abre el Google Sheet
   2. Ve a "Lista de Espera"
   3. Busca la fila 5
   4. En columna N, selecciona:
      • "Vino" - Si asistió
      • "No vino" - Si NO asistió
   ```

---

## 🔍 DIAGNÓSTICO DE PROBLEMAS

### Problema: "No aparece opción de configurar emails"

**Solución:**
- Cierra el Google Sheet
- Vuelve a abrirlo
- Espera 5 segundos a que cargue el menú
- Busca: 🔧 Configuración → 👥 Configurar Emails Terapeutas

### Problema: "Email enviado pero no llega"

**Posibles causas:**
1. ❌ Email mal escrito (falta @, falta .com, etc.)
2. 📁 Email en carpeta de spam
3. 📧 Bandeja llena o bloqueada

**Solución:**
1. Verifica el email en: 🔍 PROBAR EMAILS TERAPEUTAS
2. Pide al terapeuta que revise spam
3. Intenta con otro email

### Problema: "Error al enviar"

**Causa más común:** Falta de permisos

**Solución:**
1. Ve a: Extensiones → Apps Script
2. ⚙️ → Permisos
3. Autoriza el envío de emails
4. Regresa y prueba otra vez

### Problema: "Dice que se envió pero no llega a nadie"

**Posibles causas:**
1. Emails NO configurados (más común)
2. Permisos no autorizados
3. Límite de envíos de Google excedido

**Solución:**
1. Usa: 🔍 PROBAR EMAILS TERAPEUTAS
2. Verifica que diga "EMAIL ENVIADO" para cada terapeuta
3. Si dice "NO CONFIGURADO" → vuelve al PASO 1

---

## 📋 RESUMEN RÁPIDO

```
1. Configurar emails (UNA vez)
   Menú → 🔧 Configuración → 👥 Configurar Emails Terapeutas

2. Probar que funcione
   Menú → 🔧 Configuración → 👨‍⚕️ 🔍 PROBAR EMAILS TERAPEUTAS

3. Verificar recepción
   Los terapeutas revisan su email (incluyendo spam)

4. Usar en producción
   Asignar terapeuta en Lista de Espera (columna M)
```

---

## ✅ CONFIRMACIÓN DE QUE FUNCIONA

**Sabrás que TODO está bien cuando:**

1. ✅ Función de prueba muestra: "EMAIL ENVIADO" para todos
2. ✅ Terapeutas reciben el email de prueba
3. ✅ Al asignar terapeuta, ves: "📧 Email enviado exitosamente"
4. ✅ Terapeuta recibe el email con información del paciente

---

## 📞 NOTA FINAL

**Solo necesitas configurar los emails UNA vez.**

Después de configurarlos:
- El sistema los recordará
- Se enviarán automáticamente
- No necesitas hacer nada más

**Si cambias el email de un terapeuta:**
- Vuelve a ejecutar: Configurar Emails Terapeutas
- Ingresa el nuevo email
- El sistema actualizará automáticamente

---

## 🎯 SOBRE FORMULARIO DE BIENESTAR

El envío automático desde Bienestar está **DESHABILITADO** (como pediste).

**Ya NO envía automáticamente a Lista de Espera** cuando seleccionas "Sí" en la pregunta.

**Envías manualmente** cuando TÚ decidas.
