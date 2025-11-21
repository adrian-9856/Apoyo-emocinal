# 🔥 GUÍA COMPLETA: ACTIVAR AUTOMATIZACIONES

## ⚡ ¿QUÉ SON LOS TRIGGERS?

Los **triggers** (activadores) son como "botones automáticos" que ejecutan código cuando haces algo en la hoja.

### Ejemplo simple:
```
TÚ escribes en una celda
    ↓
TRIGGER detecta el cambio
    ↓
CÓDIGO se ejecuta automáticamente
    ↓
¡MAGIA! 🎉 (Mueve datos, actualiza reportes, etc.)
```

---

## 🚀 PASO A PASO: INSTALAR EL TRIGGER

### PASO 1: Abrir Apps Script
1. En tu **Google Sheet**
2. Menú superior: **Extensiones**
3. Clic en: **Apps Script**

![Apps Script Menu](https://via.placeholder.com/400x100/4285F4/FFFFFF?text=Extensiones+%E2%86%92+Apps+Script)

---

### PASO 2: Ir a Activadores (Triggers)
1. En Apps Script, mira el **menú lateral izquierdo**
2. Busca el ícono de **reloj ⏰** (se llama "Activadores" o "Triggers")
3. Haz **clic** en ese ícono

```
┌─────────────────────┐
│  📄 Archivos        │
│  ⏰ Activadores  ← AQUÍ │
│  🔧 Servicios       │
│  ⚙️  Configuración  │
└─────────────────────┘
```

---

### PASO 3: Agregar Nuevo Trigger
1. Verás una pantalla que dice **"No hay activadores configurados"**
2. Abajo a la derecha, hay un botón azul: **"+ Agregar activador"**
3. Haz **clic** en ese botón

---

### PASO 4: Configurar el Trigger

Aparecerá un formulario. **COPIA EXACTAMENTE** esta configuración:

```
┌────────────────────────────────────────────────────┐
│ Elija qué función desea ejecutar:                 │
│ [onEditSistemaCompleto]  ← SELECCIONAR ESTA      │
└────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────┐
│ Elija qué implementación se debe ejecutar:        │
│ [Head]                   ← DEJAR COMO ESTÁ        │
└────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────┐
│ Seleccione el tipo de evento:                     │
│ [Desde una hoja de cálculo]  ← SELECCIONAR ESTA  │
└────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────┐
│ Seleccione el tipo de evento:                     │
│ [Al editar]              ← SELECCIONAR ESTA       │
└────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────┐
│ Configuración de notificaciones de fallos:        │
│ [Notificarme inmediatamente]  ← SELECCIONAR      │
└────────────────────────────────────────────────────┘
```

---

### PASO 5: Guardar
1. Clic en el botón **"Guardar"** (abajo a la derecha)
2. Si pide **autorización**, sigue estos pasos:

#### Si pide autorización:
```
a) Clic en "Revisar permisos"
b) Selecciona tu cuenta de Google
c) Aparece: "Google no ha verificado esta aplicación"
   → Clic en "Opciones avanzadas" (texto pequeño abajo)
d) Clic en "Ir a Sistema Apoyo Emocional (no seguro)"
e) Lee los permisos
f) Clic en "Permitir"
```

---

### PASO 6: Verificar que Funciona

1. **Cierra** el editor de Apps Script
2. **Vuelve** a tu Google Sheet
3. En el menú superior debe aparecer: **🏥 Apoyo Emocional**
4. Clic en: **🏥 Apoyo Emocional → Automatizaciones → 🔍 Verificar Triggers**

**Debe aparecer:**
```
✅ 1 trigger(s) activo(s)
• onEditSistemaCompleto

🎉 AUTOMATIZACIÓN FUNCIONANDO
```

---

## 🎯 PROBAR QUE TODO FUNCIONA

### PRUEBA 1: Lista de Espera → Nuevos Ingresos

1. Ve a la hoja **"Lista de Espera"**
2. En la fila 2, llena:
   - Columna C (Nombre): "Test Automatización"
   - Columna E (Sexo): Selecciona "Mujer"
   - Columna F (Edad): Selecciona "26 a 30"
   - Columna G (Malestar): Selecciona cualquiera
   - Columna H (Prioridad): Selecciona "Alta"
   - Columna I (Tipo): Selecciona "Individual"
3. En columna **M (Estado)**: Selecciona **"Aceptado"**
4. **ESPERA 2-3 segundos**
5. Debe aparecer un mensaje: **"✅ ACEPTADO DESDE LISTA DE ESPERA"**
6. Ve a la hoja **"Nuevos Ingresos"** → Debe estar ahí el participante

### PRUEBA 2: Asignar Terapeuta

1. En **"Nuevos Ingresos"**
2. En la fila del participante que acabas de mover
3. Columna **H (Terapeuta)**: Selecciona **"Diana"**
4. **ESPERA 2-3 segundos**
5. Debe aparecer: **"✅ ASIGNACIÓN EXITOSA"**
6. Ve a **"Asignaciones y Terapias"** → Debe estar ahí

---

## 🔥 QUÉ AUTOMATIZACIONES TIENES ACTIVAS

Con el trigger instalado, estas son **AUTOMÁTICAS**:

### 1️⃣ Lista de Espera → Nuevos Ingresos
```
Hoja: Lista de Espera
Columna: M (Estado)
Cuando seleccionas: "Aceptado"
→ Se mueve SOLO a "Nuevos Ingresos"
```

### 2️⃣ Nuevos Ingresos → Asignaciones
```
Hoja: Nuevos Ingresos
Columna: H (Terapeuta)
Cuando seleccionas: Gerber/Melissa/Diana/Karina
→ Se crea SOLO en "Asignaciones y Terapias"
```

### 3️⃣ Asignaciones → Hojas Finales
```
Hoja: Asignaciones y Terapias
Columna: L (Estado Proceso)
Cuando cambias a:
  • "Proceso culminado" → Va a "Procesos Culminados"
  • "Deserción" → Va a "Deserciones"
  • "Gestión de casos" → Va a "Gestión de Casos"
```

### 4️⃣ Actualización de Reportes
```
Cada vez que pasa algo de lo anterior
→ Los reportes se actualizan SOLOS
```

---

## 📊 DIAGRAMA DEL FLUJO COMPLETO

```
┌──────────────────────┐
│  PARTICIPANTE LLEGA  │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   LISTA DE ESPERA    │
│  - Registrar datos   │
│  - Asignar prioridad │
└──────────┬───────────┘
           │
           │ Marcar: "Aceptado"
           │ 🔥 AUTOMÁTICO
           ▼
┌──────────────────────┐
│  NUEVOS INGRESOS     │
│  (Se crea solo)      │
└──────────┬───────────┘
           │
           │ Asignar: Terapeuta
           │ 🔥 AUTOMÁTICO
           ▼
┌──────────────────────┐
│ ASIGNACIONES Y       │
│ TERAPIAS             │
│  - Gestionar sesiones│
└──────────┬───────────┘
           │
           │ Cambiar: Estado
           │ 🔥 AUTOMÁTICO
           ▼
┌──────────────────────┐
│  HOJAS FINALES       │
│  - Culminados        │
│  - Deserciones       │
│  - Gestión Casos     │
└──────────────────────┘
```

---

## ❌ PROBLEMAS COMUNES

### ❌ "El trigger no funciona"

**Solución 1:** Verificar que existe
```
Apps Script → ⏰ Activadores
Debe aparecer: onEditSistemaCompleto | Al editar
```

**Solución 2:** Eliminarlo y recrearlo
```
1. En Activadores, clic en ⋮ (tres puntos) del trigger
2. Clic en "Eliminar"
3. Volver a crear desde PASO 3
```

**Solución 3:** Ver errores
```
Apps Script → Ejecuciones (ícono de reloj)
Buscar líneas en ROJO
Copiar el mensaje de error
```

---

### ❌ "Marca como editado pero no pasa nada"

**Causa:** El valor no es exacto

**Solución:**
- ✅ **USAR SIEMPRE** las listas desplegables (flecha ▼)
- ❌ **NO ESCRIBIR** manualmente

**Valores EXACTOS que activan automatización:**

Para Estado (Lista de Espera):
- ✅ "Aceptado"
- ❌ "aceptado" (minúsculas no funciona)
- ❌ "ACEPTADO" (mayúsculas no funciona)
- ❌ "Aceptado " (espacio extra no funciona)

Para Terapeuta:
- ✅ "Gerber", "Melissa", "Diana", "Karina"
- ❌ Cualquier otra cosa

Para Estado Proceso:
- ✅ "Proceso culminado", "Deserción", "Gestión de casos"
- ❌ "culminado", "Desersion", etc.

---

### ❌ "Aparece error en rojo"

**Pasos:**
1. **Apps Script → Ejecuciones**
2. Buscar la línea con error (roja)
3. Hacer **clic** para ver detalles
4. **Copiar** el mensaje completo
5. Buscar en **TROUBLESHOOTING.md** el error
6. Si no está, contactar con el mensaje

---

## 🎓 CAPACITAR A TU EQUIPO

### Puntos clave para enseñar:

1. **Nunca escribir manualmente**
   - Siempre usar listas desplegables ▼

2. **Esperar 2-3 segundos**
   - Después de seleccionar algo importante
   - Debe aparecer mensaje de confirmación

3. **Si no aparece mensaje**
   - Algo falló
   - Verificar que se usó lista desplegable
   - Verificar trigger activo

4. **No tocar estas columnas:**
   - Lista de Espera: A, B, M (tienen fórmulas)
   - Nuevos Ingresos: A, B, L (tienen fórmulas)
   - Otras hojas: Columnas con fórmulas

5. **Si hay error:**
   - No entrar en pánico
   - Tomar captura de pantalla
   - Copiar mensaje de error
   - Contactar al administrador

---

## 📹 VIDEO TUTORIAL

### Cómo crear el trigger (paso a paso visual):

1. **Minuto 0:00-0:30** - Abrir Apps Script
2. **Minuto 0:30-1:00** - Ir a Activadores
3. **Minuto 1:00-2:00** - Configurar trigger
4. **Minuto 2:00-2:30** - Guardar y autorizar
5. **Minuto 2:30-3:00** - Verificar funcionamiento
6. **Minuto 3:00-4:00** - Prueba completa

*Nota: Puedes grabar un video corto siguiendo estos pasos para tu equipo*

---

## ✅ CHECKLIST FINAL

Verifica que todo esté listo:

```
□ Apps Script abierto
□ Código copiado en los 3 archivos (.gs)
□ Código guardado (Ctrl+S)
□ Trigger creado en Activadores
□ Función: onEditSistemaCompleto
□ Tipo: Al editar
□ Permisos autorizados
□ Verificación ejecutada (✅ 1 trigger activo)
□ Prueba Lista de Espera → ✅
□ Prueba Asignar Terapeuta → ✅
□ Prueba Finalizar Caso → ✅
□ Equipo capacitado
□ Funcionando en producción 🎉
```

---

## 🆘 NECESITAS AYUDA

**Ejecución con error:**
```
Apps Script → Ejecuciones → Copiar error → Buscar en docs
```

**Trigger no funciona:**
```
Menú → Automatizaciones → Verificar Triggers
```

**Diagnóstico completo:**
```
Menú → Automatizaciones → Diagnóstico Completo
```

**Contacto:**
- GitHub Issues
- Consultar TROUBLESHOOTING.md

---

## 🎉 ¡LISTO!

Con el trigger instalado, **TODO ES AUTOMÁTICO**:

- ✅ Aceptar participante → Se mueve solo
- ✅ Asignar terapeuta → Se registra solo
- ✅ Finalizar caso → Se clasifica solo
- ✅ Reportes → Se actualizan solos

**¡No más copiar y pegar!** 🚀

---

**Versión:** 2.1
**Última actualización:** Noviembre 2024
