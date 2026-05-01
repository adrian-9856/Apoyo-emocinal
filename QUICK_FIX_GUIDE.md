# QUICK FIX GUIDE - Top 10 Critical Issues

## Fix #1: Define Missing COL_ENVIAR_INTERES Constant (1 min)

**Location**: Top of SistemaCompleto.gs, after line 24

**Add this line**:
```javascript
/** Columna "Enviar a Lista de Espera" en Hoja de Interés (1-based) - columna 11 (K) */
var COL_ENVIAR_INTERES = 11;
```

This fixes the crash when using the "Hoja de Interés" workflow.

---

## Fix #2: Merge onOpen() Functions (5 min)

**Problem**: Only ONE onOpen() will execute. Users won't see the SistemaGrupos menu.

**Solution**: Modify SistemaCompleto.gs `onOpen()` function (line 34) to also call the SistemaGrupos menu:

```javascript
function onOpen() {
  try {
    const ui = SpreadsheetApp.getUi();

    // ── MENÚ COMPLETO (Apoyo Emocional) ──
    // [Existing SistemaCompleto menu code here...]
    
    ui.createMenu('🏥 Apoyo Emocional')
      .addItem('🔄 ACTUALIZAR TODO', 'actualizarTodo')
      // ... rest of menu ...
      .addToUi();

    // ── MENÚ GRUPOS (if SistemaGrupos exists) ──
    try {
      _crearMenuGruposAE(ui); // Function from SistemaGrupos
    } catch(e) {
      // Silently ignore if SistemaGrupos not loaded
      Logger.log('SistemaGrupos no disponible: ' + e.message);
    }

    // Ejecutar mantenimiento automático al abrir
    try {
      mantenimientoAutomatico();
    } catch (error) {
      Logger.log('Error en mantenimiento automático: ' + error.message);
    }
  } catch (error) {
    Logger.log('onOpen ejecutado desde contexto sin UI disponible: ' + error.message);
  }
}
```

Then rename SistemaGrupos onOpen() to:
```javascript
function _crearMenuGruposAE(ui) {
  ui.createMenu('💜 Apoyo Emocional — Grupos')
    .addSubMenu(ui.createMenu('👥 Gestión de Grupos')
      // ... rest of menu ...
    .addToUi();
}
```

---

## Fix #3: Replace Hardcoded 500-row Ranges in Formulas (10 min)

**Problem**: Data beyond row 500 is ignored. Reports will be wrong if you have 600+ sessions.

**Location**: Lines 5310-5320 in SistemaCompleto.gs

**Current code**:
```javascript
reporte.getRange('C17').setFormula(
  '=IFERROR(SUMPRODUCT((\'Terapias Individual\'!B2:B500="Gerber")*(\'Terapias Individual\'!M2:M500)),0)'
);
```

**Replace with**:
```javascript
// Dynamic range formula - grows as data grows
reporte.getRange('C17').setFormula(
  '=IFERROR(SUMPRODUCT(' +
  '(INDIRECT("\'Terapias Individual\'!B2:B"&MAX(500,COUNTA(\'Terapias Individual\'!A:A)))="Gerber")*' +
  'INDIRECT("\'Terapias Individual\'!M2:M"&MAX(500,COUNTA(\'Terapias Individual\'!A:A)))),0)'
);
```

Apply same change to lines 5311-5313 (Melissa, Diana, Karina) and 5317-5320 (inasistencias).

**OR simpler approach**: Move to Apps Script calculation instead of sheet formulas (more control).

---

## Fix #4: Add Bounds Checking to Array Access (15 min)

**Problem**: Code crashes if `.getValues()[0]` returns undefined.

**Locations**: Lines 1739, 1991, 4652, 8754, and 5 more

**Pattern to replace**:
```javascript
// BAD
const datos = sheetOrigen.getRange(fila, 3, 1, 5).getValues()[0];
const nombre = datos[0]; // CRASH if datos is undefined
```

**Replace with**:
```javascript
// GOOD
const valuesArray = sheetOrigen.getRange(fila, 3, 1, 5).getValues();
if (!valuesArray || valuesArray.length === 0) {
  throw new Error('Fila ' + fila + ' está vacía');
}
const datos = valuesArray[0];
const nombre = datos[0] || '';
```

---

## Fix #5: Fix Month-End Detection Logic (5 min)

**Location**: Line 3353-3364 (verificarYEnviarRecordatorioReporteMensual)

**Current (unreliable) code**:
```javascript
const hoy = new Date();
const manana = new Date(hoy);
manana.setDate(hoy.getDate() + 1);
const pasadoManana = new Date(manana);
pasadoManana.setDate(manana.getDate() + 1);
if (pasadoManana.getMonth() !== manana.getMonth()) { // Unclear logic
  enviarRecordatorioReporteMensual();
}
```

**Replace with**:
```javascript
const hoy = new Date();
const manana = new Date(hoy);
manana.setDate(hoy.getDate() + 1);

// Get last day of the month
const ultimoDiaDelMes = new Date(manana.getFullYear(), manana.getMonth() + 1, 0).getDate();
const diaManana = manana.getDate();

if (diaManana === ultimoDiaDelMes) {
  // Tomorrow is the last day of the month
  enviarRecordatorioReporteMensual();
  Logger.log('📧 Email recordatorio enviado (hoy es penúltimo día)');
}
```

---

## Fix #6: Replace Hardcoded 1000-Row Range Limits (10 min)

**Problem**: Data validation doesn't apply to rows beyond 1000.

**Locations**: Lines 441, 892-895, 903, 910, 918, 943, 946, 949, 960, 967, 974, 988, 997, 1028

**Current pattern**:
```javascript
sheet.getRange('A2:A1000').protect().setWarningOnly(true);
terapias.getRange('F2:F1000').setDataValidation(generoRule);
```

**Create helper function**:
```javascript
function aplicarValidacionDinamica(sheet, colLetter, reglaValidacion, nombreCol) {
  const ultimaFila = Math.max(1000, sheet.getLastRow() + 100); // Buffer for future
  const range = sheet.getRange(colLetter + '2:' + colLetter + ultimaFila);
  range.setDataValidation(reglaValidacion);
  Logger.log('✅ Validación aplicada a ' + nombreCol + ' (filas 2-' + ultimaFila + ')');
}
```

Then use:
```javascript
aplicarValidacionDinamica(terapias, 'F', generoRule, 'Género');
aplicarValidacionDinamica(terapias, 'B', terapeutaRule, 'Terapeuta');
```

---

## Fix #7: Add Verification to Cleanup Operations (5 min)

**Location**: Lines 4978-5028 (limpiarDatosParaNuevoMes)

**Add verification pattern**:
```javascript
function limpiarHojaSegura(hoja, nombreHoja) {
  try {
    if (!hoja || hoja.getLastRow() < 2) {
      Logger.log('ℹ️ ' + nombreHoja + ' ya está vacía');
      return true;
    }
    
    const ultimaFila = hoja.getLastRow();
    const ultimaCol = hoja.getLastColumn();
    
    // Clear content
    hoja.getRange(2, 1, ultimaFila - 1, ultimaCol).clearContent();
    
    // Clear format
    hoja.getRange(2, 1, ultimaFila - 1, ultimaCol).clearFormat();
    
    SpreadsheetApp.flush(); // Ensure Google Sheets saves
    
    // Verify success
    if (hoja.getLastRow() === 1) {
      Logger.log('✅ ' + nombreHoja + ' limpiada exitosamente');
      return true;
    } else {
      Logger.log('⚠️ ' + nombreHoja + ' podría no estar completamente limpia');
      return false;
    }
  } catch (e) {
    Logger.log('❌ Error limpiando ' + nombreHoja + ': ' + e.message);
    throw e;
  }
}
```

Use it:
```javascript
limpiarHojaSegura(espera, 'Lista de Espera');
limpiarHojaSegura(terapias, 'Terapias Individual');
```

---

## Fix #8: Validate Sheet Column Counts (5 min)

**Location**: Lines 8173, 8270, 8910, 9099, 9428 (import functions)

**Add validation**:
```javascript
function validarEstructuraHoja(sheet, nombreEsperado, columnasEsperadas) {
  if (!sheet) {
    throw new Error('Hoja "' + nombreEsperado + '" no existe');
  }
  
  const columnasReales = sheet.getLastColumn();
  
  if (columnasReales < columnasEsperadas) {
    Logger.log('⚠️ Advertencia: ' + nombreEsperado + ' tiene ' + columnasReales + 
               ' columnas, se esperaban ' + columnasEsperadas);
  }
  
  return Math.min(columnasReales, columnasEsperadas);
}
```

Use it:
```javascript
// Before: const datos = sheet.getRange(2, 1, sheet.getLastRow() - 1, 16).getValues();
// After:
const colsALeer = validarEstructuraHoja(sheet, 'Hoja de Interés', 16);
const datos = sheet.getRange(2, 1, sheet.getLastRow() - 1, colsALeer).getValues();
```

---

## Fix #9: Cache Sheet References (10 min)

**Problem**: getSheetByName() called 129 times - very inefficient.

**Create a sheet cache at top of main functions**:
```javascript
function actualizarReportes() {
  // Cache all sheets at start
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = {
    reporte: ss.getSheetByName('Reporte'),
    terapias: ss.getSheetByName('Terapias Individual'),
    culminados: ss.getSheetByName('Procesos Culminados'),
    retiradx: ss.getSheetByName('Retiradx'),
    noAsistidas: ss.getSheetByName('Personas no asistidas'),
    derivaciones: ss.getSheetByName('Derivaciones Institucionales'),
    intervencion: ss.getSheetByName('Intervención de casos'),
    bienestar: ss.getSheetByName('C_03_Formulario de Bienestar (2026)'),
    mensuales: ss.getSheetByName('Reportes Mensuales'),
    hojaInteres: ss.getSheetByName('Hoja de interés')
  };
  
  // Then use sheets.reporte instead of ss.getSheetByName('Reporte')
  if (sheets.reporte) {
    sheets.reporte.getRange('B2').setFormula('=TEXT(NOW(),"DD/MM/YYYY HH:MM")');
  }
  
  // ... rest of function ...
}
```

---

## Fix #10: Extract Common Email Template (15 min)

**Problem**: Email HTML is duplicated in multiple functions.

**Create reusable template**:
```javascript
function construirEmailHTML(titulo, contenido, boton = null) {
  const html = '<!DOCTYPE html>' +
    '<html>' +
    '<head>' +
    '<style>' +
    'body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }' +
    '.container { max-width: 600px; margin: 0 auto; padding: 20px; }' +
    '.header { background-color: #ff9800; color: white; padding: 20px; border-radius: 5px 5px 0 0; }' +
    '.content { background-color: #fff; padding: 20px; border: 1px solid #ddd; }' +
    '.button { display: inline-block; padding: 12px 24px; background-color: #4CAF50; ' +
      'color: white; text-decoration: none; border-radius: 5px; margin: 10px 0; }' +
    '.footer { background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; }' +
    '</style>' +
    '</head>' +
    '<body>' +
    '<div class="container">' +
    '<div class="header"><h2>' + titulo + '</h2></div>' +
    '<div class="content">' + contenido;
  
  if (boton) {
    html += '<p><a href="' + boton.url + '" class="button">' + boton.texto + '</a></p>';
  }
  
  html += '</div>' +
    '<div class="footer">' +
    '<p>Creamos - Sistema de Apoyo Emocional</p>' +
    '<p><small>Este es un email automático. Por favor no responda directamente.</small></p>' +
    '</div>' +
    '</div>' +
    '</body>' +
    '</html>';
  
  return html;
}
```

Use it:
```javascript
// Instead of duplicating HTML in each function
const emailContent = construirEmailHTML(
  '📋 Asignación de Terapeuta',
  '<p>Se ha asignado a <strong>' + nombreParticipante + '</strong></p>' +
  '<p>Terapeuta: <strong>' + terapeuta + '</strong></p>',
  { texto: 'Ver detalles', url: ss.getUrl() }
);

MailApp.sendEmail(emailDirectora, '📋 Nueva asignación', emailContent, {
  htmlBody: emailContent
});
```

---

## TESTING CHECKLIST

After applying these fixes, run:

- [ ] Test 1: Add 600+ therapy records and verify totals match
- [ ] Test 2: Run system on last day of month to verify reminder email sent
- [ ] Test 3: Bind both SistemaCompleto and SistemaGrupos and verify both menus appear
- [ ] Test 4: Create new sheet with 50 rows and verify validation applies automatically
- [ ] Test 5: Run cleanup operation and verify data deleted successfully
- [ ] Test 6: Import CSV with different column count and verify no crash
- [ ] Test 7: Load spreadsheet with 1000+ records and measure actualizarReportes() time

---

## TIME ESTIMATE

- Fix #1: 1 minute
- Fix #2: 5 minutes  
- Fix #3: 10 minutes
- Fix #4: 15 minutes
- Fix #5: 5 minutes
- Fix #6: 10 minutes
- Fix #7: 5 minutes
- Fix #8: 5 minutes
- Fix #9: 10 minutes
- Fix #10: 15 minutes

**Total: ~80 minutes** (can be done in 2 sessions)

---

## NEXT STEPS

1. Apply fixes in priority order (Fix #1-3 are critical blockers)
2. Test each fix as you go
3. After all fixes, run full system test
4. Consider refactoring hardcoded therapist names and sheet names
5. Implement proper constants file for easy customization
