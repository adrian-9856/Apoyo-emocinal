# 📧 CÓMO CONFIGURAR EMAILS DE TERAPEUTAS

## ¿Por qué necesito configurar los emails?

Cuando asignas un terapeuta en la **Lista de Espera** (columna M "Terapeuta Asignado"), el sistema **automáticamente envía un email al terapeuta** para notificarle del nuevo caso.

**PERO** para que esto funcione, primero debes configurar el email de cada terapeuta.

---

## 📋 Pasos para Configurar Emails

### 1. Abrir el Menú de Configuración

En tu Google Sheet:
1. Haz clic en el menú: **🏥 Apoyo Emocional**
2. Selecciona: **📧 Configurar Emails Terapeutas**

### 2. Ingresar Emails

El sistema te pedirá el email de cada terapeuta uno por uno:

```
📧 Email de Gerber
Email actual: No configurado

Ingresa el email de Gerber:
___________________________
          [OK] [Cancelar]
```

**Ingresa el email completo**, por ejemplo:
- `gerber@creamos.org`
- `melissa.lopez@gmail.com`
- `diana_terapeuta@yahoo.com`
- etc.

### 3. Repetir para Cada Terapeuta

El sistema te pedirá los emails para:
- ✅ Gerber
- ✅ Melissa
- ✅ Diana
- ✅ Karina

### 4. Confirmar

Al final verás un resumen:

```
✅ EMAILS CONFIGURADOS:

• Gerber: gerber@creamos.org
• Melissa: melissa.lopez@gmail.com
• Diana: diana_terapeuta@yahoo.com
• Karina: karina.sanchez@creamos.org
```

---

## ✅ ¿Cómo Saber Si Funcionó?

### Cuando asignas un terapeuta:

**SIN email configurado:**
```
⚠️ CASO ASIGNADO (SIN EMAIL)

👤 Participante: Juan Pérez
👨‍⚕️ Terapeuta: Gerber

❌ No se envió email (no configurado)

CONFIGURAR EMAILS:
Menú → 🏥 Apoyo Emocional → 📧 Configurar Emails Terapeutas
```

**CON email configurado:**
```
✅ CASO ASIGNADO

👤 Participante: Juan Pérez
👨‍⚕️ Terapeuta: Gerber

📧 Email enviado exitosamente al terapeuta

El terapeuta debe confirmar asistencia en columna N.
```

---

## 📬 ¿Qué Recibe el Terapeuta?

El terapeuta recibirá un email así:

```
De: noreply@google.com
Asunto: 🔔 Nuevo Caso Asignado: Juan Pérez

Hola Gerber,

Se te ha asignado un nuevo caso:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Participante: Juan Pérez
👨‍⚕️ Terapeuta asignado: Gerber
📋 Fila en Lista de Espera: 5
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 ACCIÓN REQUERIDA:

1. Abre el Google Sheet:
   [enlace al sheet]

2. Ve a la hoja "Lista de Espera"

3. Busca la fila 5 (Juan Pérez)

4. En la columna "Asistió a Cita" (columna N), selecciona:
   • "Vino" - Si la persona asistió a la cita
   • "No vino" - Si la persona NO asistió

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ IMPORTANTE:
Una vez que selecciones "Vino" o "No vino", el sistema
automáticamente moverá el caso a la hoja correspondiente:
• Si VINO → Nuevos Ingresos + Terapias (trabajo activo)
• Si NO VINO → Personas no asistidas (sin registro)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sistema de Apoyo Emocional
Notificación automática
```

---

## 🔧 Cambiar un Email Existente

Si necesitas cambiar el email de un terapeuta:

1. Ve al menú: **🏥 Apoyo Emocional → 📧 Configurar Emails Terapeutas**
2. El sistema mostrará el email actual
3. Ingresa el nuevo email
4. El sistema actualizará automáticamente

---

## ⚠️ Problemas Comunes

### "No se pudo enviar el email"

**Causa:** El email no está configurado para ese terapeuta
**Solución:** Configura los emails siguiendo los pasos arriba

### "Email inválido"

**Causa:** El email no tiene formato correcto (falta @ o .)
**Solución:** Verifica que el email esté completo:
- ❌ `gerber` → incorrecto
- ❌ `gerber@creamos` → incorrecto
- ✅ `gerber@creamos.org` → correcto

### El terapeuta no recibe emails

**Causas posibles:**
1. El email está mal escrito
2. El email está en spam/correo no deseado
3. El terapeuta no tiene acceso a ese email

**Solución:**
1. Verifica el email configurado en el menú
2. Pide al terapeuta que revise spam
3. Usa un email que el terapeuta revise regularmente

---

## 📊 Flujo Completo

```
1. Lista de Espera
   └─> Asignar terapeuta (columna M)
       └─> Sistema envía email al terapeuta ✅
           └─> Terapeuta recibe notificación 📧
               └─> Terapeuta confirma asistencia (columna N)
                   ├─> Vino → Nuevos Ingresos + Terapias ✅
                   └─> No vino → Personas no asistidas ❌
```

---

## 🎯 Resumen Rápido

1. **Configurar emails UNA vez**: Menú → 🏥 Apoyo Emocional → 📧 Configurar Emails
2. **Asignar terapeuta**: Columna M en Lista de Espera
3. **Email automático**: Sistema envía email al terapeuta
4. **Terapeuta confirma**: Columna N (Vino / No vino)
5. **Sistema procesa**: Mueve automáticamente al destino correcto

---

## 💡 Nota Importante

**Solo necesitas configurar los emails UNA vez**. Después de configurarlos, el sistema los recordará y enviará emails automáticamente cada vez que asignes un terapeuta.

Si algún terapeuta cambia de email, simplemente vuelve a ejecutar la configuración y actualiza su email.
