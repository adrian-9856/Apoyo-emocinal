# 📧 Solución para Problema de Correos

**Fecha:** 2 de marzo de 2026
**Problema:** Ningún correo está llegando desde el sistema

---

## 🔍 Diagnóstico Rápido

### Paso 1: Verificar si los correos están configurados

1. Abre el Google Sheet
2. Ve al menú: **🏥 Apoyo Emocional → ⚙️ Avanzado → 🧪 Probar Emails Terapeutas**
3. El sistema mostrará cuántos correos están configurados

**Resultado esperado:**
```
✅ Gerber: [email configurado]
✅ Melissa: [email configurado]
✅ Diana: [email configurado]
✅ Karina: [email configurado]

Total configurados: 4/4
```

**Si ves ❌ NO CONFIGURADO** → Ir a [Paso 2: Configurar Emails](#paso-2-configurar-emails)

---

### Paso 2: Configurar Emails

1. Ve al menú: **🏥 Apoyo Emocional → ⚙️ Avanzado → 👥 Configurar Emails Terapeutas**
2. El sistema te pedirá el email de cada terapeuta:
   - Ingresa el email de Gerber
   - Ingresa el email de Melissa
   - Ingresa el email de Diana
   - Ingresa el email de Karina
3. Haz clic en **OK** para cada uno

**Importante:** Los emails deben ser válidos y estar en formato: `nombre@dominio.com`

---

### Paso 3: Verificar Permisos de Google Apps Script

Los correos NO se enviarán si Google Apps Script no tiene permisos. Sigue estos pasos:

1. Abre el Google Sheet
2. Ve a: **Extensiones → Apps Script**
3. En el editor de Apps Script, haz clic en el ícono de **⚙️ (Configuración)** en el panel izquierdo
4. Busca la sección **"Permisos"** o **"Autorizaciones"**
5. Verifica que el script tenga permiso para:
   - ✅ Enviar correos electrónicos
   - ✅ Leer/escribir hojas de cálculo

**Si faltan permisos:**
1. Cierra el editor de Apps Script
2. Vuelve al Google Sheet
3. Ve al menú: **🏥 Apoyo Emocional → ⚙️ Avanzado → ✉️ Probar Email Director**
4. Cuando se ejecute por primera vez, Google pedirá autorización
5. Haz clic en **Revisar permisos**
6. Selecciona tu cuenta de Google
7. Haz clic en **Permitir**

---

### Paso 4: Probar Envío de Correo

Después de configurar y autorizar, prueba el envío:

1. Ve al menú: **🏥 Apoyo Emocional → ⚙️ Avanzado → 🧪 Probar Emails Terapeutas**
2. El sistema mostrará qué emails están configurados
3. Haz clic en **SÍ** para enviar correos de prueba
4. Espera la confirmación

**Resultado esperado:**
```
✅ Email enviado correctamente a Gerber
✅ Email enviado correctamente a Melissa
✅ Email enviado correctamente a Diana
✅ Email enviado correctamente a Karina

Total: 4 enviados, 0 errores
```

---

## ❌ Problemas Comunes

### Problema 1: "No hay emails configurados"

**Solución:**
- Ve a: **🏥 Apoyo Emocional → ⚙️ Avanzado → 👥 Configurar Emails Terapeutas**
- Configura los emails de todos los terapeutas

---

### Problema 2: "Error al enviar email - Faltan permisos"

**Solución:**
- Ve a: **Extensiones → Apps Script**
- Ejecuta cualquier función de correo (ej: `probarEmail`)
- Google pedirá autorización
- Haz clic en **Revisar permisos → Permitir**

---

### Problema 3: "Email enviado pero no llega"

**Posibles causas:**
1. **Correo en spam** - Revisa la carpeta de spam/correo no deseado
2. **Email incorrecto** - Verifica que el email esté bien escrito
3. **Límite de envíos excedido** - Google Apps Script tiene límite de 100 emails por día para cuentas gratuitas

**Solución:**
1. Revisa la carpeta de spam en Gmail
2. Verifica los emails configurados con **🧪 Probar Emails Terapeutas**
3. Si usas cuenta gratuita de Gmail, verifica que no hayas excedido el límite diario

---

### Problema 4: "Exception: Service invoked too many times"

**Causa:** Has enviado demasiados correos en poco tiempo (límite de Google)

**Solución:**
- Espera 24 horas
- Reduce la frecuencia de pruebas
- Considera usar una cuenta de Google Workspace (límite más alto)

---

## ✅ Checklist de Verificación

Antes de reportar que los correos no funcionan, verifica:

- [ ] Los emails están configurados para todos los terapeutas (4/4)
- [ ] Google Apps Script tiene permisos autorizados
- [ ] La prueba de correo funciona (✉️ Probar Email Director)
- [ ] Los correos de prueba llegan correctamente
- [ ] No hay errores en el registro (Logger.log)
- [ ] No has excedido el límite diario de envíos

---

## 🔧 Solución Paso a Paso (Completa)

Si sigues teniendo problemas, sigue estos pasos EN ORDEN:

### 1. Configurar Email Director
```
Menú → 🏥 Apoyo Emocional → ⚙️ Avanzado
     → 📧 Configurar Email Director
```
Ingresa tu email (ej: director@creamos.org)

### 2. Configurar Emails Terapeutas
```
Menú → 🏥 Apoyo Emocional → ⚙️ Avanzado
     → 👥 Configurar Emails Terapeutas
```
Ingresa el email de cada terapeuta

### 3. Autorizar Permisos
```
Menú → 🏥 Apoyo Emocional → ⚙️ Avanzado
     → ✉️ Probar Email Director
```
- Haz clic en **Revisar permisos**
- Haz clic en **Permitir**

### 4. Probar Envío
```
Menú → 🏥 Apoyo Emocional → ⚙️ Avanzado
     → 🧪 Probar Emails Terapeutas
```
- Haz clic en **SÍ** para enviar pruebas
- Verifica que lleguen los correos

### 5. Verificar Instalación
```
Menú → 🏥 Apoyo Emocional → ⚙️ Avanzado
     → ✅ Verificar Instalación
```
Esto verificará que todo esté correctamente instalado

---

## 📊 Cuándo se Envían Correos

El sistema envía correos automáticamente en estos casos:

### 1. Asignación de Terapeuta
**Cuándo:** Cuando asignas un terapeuta en "Lista de Espera" (columna M)
**Destinatario:** El terapeuta asignado
**Contenido:** Notificación de nuevo caso asignado

### 2. Finalización de Caso
**Cuándo:** Cuando cambias el estado a "Proceso culminado" o "retirxs" en "Terapias Individual"
**Destinatario:** El director (email configurado)
**Contenido:** Resumen del caso finalizado

### 3. Alerta de Suicidio
**Cuándo:** Cuando se detecta protocolo de suicidio activado en Bienestar
**Destinatario:** El director y el terapeuta asignado
**Contenido:** Alerta urgente de protocolo activado

---

## 🆘 Si Nada Funciona

Si después de seguir TODOS los pasos anteriores los correos siguen sin llegar:

1. **Verifica los logs:**
   - Ve a: **Extensiones → Apps Script**
   - Haz clic en **Ejecuciones** (panel izquierdo)
   - Busca errores en las ejecuciones recientes

2. **Copia el error exacto** que aparece en los logs

3. **Reporta el problema** con:
   - El error exacto de los logs
   - Los pasos que seguiste
   - Capturas de pantalla si es posible

---

## ✅ Resultado Esperado

Una vez que todo esté configurado correctamente:

1. ✅ Los correos de prueba llegan correctamente
2. ✅ Cuando asignas un terapeuta, recibe un email automático
3. ✅ Cuando finalizas un caso, el director recibe un email
4. ✅ Las alertas de suicidio se envían inmediatamente

---

**Última actualización:** 2 de marzo de 2026
