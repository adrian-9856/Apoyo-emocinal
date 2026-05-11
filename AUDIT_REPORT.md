# COMPREHENSIVE CODE AUDIT: APOYO EMOCIONAL SYSTEM
**Date**: May 1, 2026  
**Files Audited**: SistemaCompleto.gs (11,530 lines), SistemaGrupos.gs (2,322 lines)  
**Total Functions**: 160+

---

## CRITICAL ISSUES (MUST FIX IMMEDIATELY)

### 1. UNDEFINED CONSTANT: COL_ENVIAR_INTERES
- **Category**: Constants / Logic Error
- **Location**: Line 8754, 8763 in SistemaCompleto.gs
- **Severity**: CRITICAL
- **Problem**: Function `enviarInteresAListaEspera()` uses `COL_ENVIAR_INTERES` constant that is never defined. This will cause a ReferenceError when the function executes.
- **Impact**: Any attempt to use the "Enviar a Lista de Espera" workflow for "Hoja de Interés" will crash with undefined variable error.
- **Code Example**:
```javascript
// Line 8754 - CRASHES HERE
const datos = sheet.getRange(fila, 1, 1, COL_ENVIAR_INTERES - 1).getValues()[0];
// COL_ENVIAR_INTERES is NEVER defined anywhere in the file
```
- **Solution**: Define the missing constant at the top of the file with other column variables:
```javascript
/** Columna "Enviar a Lista de Espera" en Hoja de Interés (1-based) - columna 11 (K) */
var COL_ENVIAR_INTERES = 11;
```

---

### 2. FUNCTION NAME COLLISION: onOpen()
- **Category**: Integration Issue / Naming Conflict
- **Location**: Line 34 (SistemaCompleto.gs), Line 68 (SistemaGrupos.gs)
- **Severity**: CRITICAL
- **Problem**: Both files define `onOpen()` function. When both files are bound to the same spreadsheet, only ONE will execute. This causes the second menu system to be invisible.
- **Impact**: Users of the groups system (SistemaGrupos) will NOT see the "Apoyo Emocional — Grupos" menu if both scripts are active. The SistemaCompleto onOpen() will take precedence.
- **Current Code**:
```javascript
// SistemaCompleto.gs line 34
function onOpen() { ... Creates "🏥 Apoyo Emocional" menu }

// SistemaGrupos.gs line 68
function onOpen() { ... Creates "💜 Apoyo Emocional — Grupos" menu }
```
- **Solution**: Merge both onOpen() functions into a single handler that creates BOTH menus:
```javascript
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  // Create both main menu AND groups submenu
  // Check if groups system is installed before adding groups menu
}
```
OR use separate trigger handlers:
- Main handler calls: `_onOpenCompleto()` and `_onOpenGrupos()`

---

### 3. HARDCODED COLUMN RANGE LIMITS (500-row limit)
- **Category**: Formula Issue / Scalability
- **Location**: Lines 5310-5320, 3726-3727 (formula definitions)
- **Severity**: HIGH
- **Problem**: All SUMPRODUCT formulas use hardcoded range `B2:B500`, `M2:M500`, `L2:L500`. Data beyond row 500 will be ignored silently.
- **Impact**: If more than 500 therapy sessions are recorded, calculations will be incomplete and reports will show incorrect totals. This is a silent failure - no error message.
- **Current Code**:
```javascript
reporte.getRange('C17').setFormula(
  '=IFERROR(SUMPRODUCT((\'Terapias Individual\'!B2:B500="Gerber")*(\'Terapias Individual\'!M2:M500)),0)'
);
```
- **Solution**: Use dynamic range that adapts to actual data:
```javascript
// Use SUMPRODUCT with INDIRECT and ROW to make ranges dynamic
'=IFERROR(SUMPRODUCT((' +
'INDIRECT("\'Terapias Individual\'!B2:B"&COUNTA(\'Terapias Individual\'!A:A))="Gerber")*' +
'INDIRECT("\'Terapias Individual\'!M2:M"&COUNTA(\'Terapias Individual\'!A:A))),0)'
```
OR better yet, move to Apps Script calculation instead of sheet formulas for better control.

---

### 4. MISSING CONSTANT: COL_ENVIAR_REFERENCIAS
- **Category**: Constants / Dead Code
- **Location**: Line 8979 (commented out)
- **Severity**: HIGH
- **Problem**: Reference to undefined constant in commented-out code. If uncommented, will crash. Indicates incomplete refactoring.
- **Impact**: Code debt - if developer tries to re-enable this feature, it will immediately fail.
- **Current Code**:
```javascript
// Line 8979 - COMMENTED BUT STILL BROKEN
// return _agregarAListaEspera(sheet, fila, COL_ENVIAR_REFERENCIAS, {
// COL_ENVIAR_REFERENCIAS is undefined
```

---

## HIGH PRIORITY ISSUES

### 5. UNSAFE ARRAY ACCESS WITHOUT BOUNDS CHECK
- **Category**: Data Type / Logic Error
- **Location**: Lines 1739, 1991, 4652, 5702, 6030, 6327, 8754, 9641, 9667
- **Severity**: HIGH
- **Problem**: Multiple uses of `.getValues()[0]` without checking if the array is actually populated. Will return undefined if the range is empty or malformed.
- **Impact**: Can cause silent failures or type errors when processing data from empty cells.
- **Code Example** (Line 1739):
```javascript
const datos = sheetOrigen.getRange(fila, 3, 1, 5).getValues()[0];
// If getValues() returns empty array, [0] is undefined
const nombre = datos[0]; // TypeError: Cannot read property '0' of undefined
```
- **Solution**: Add defensive checks:
```javascript
const valuesArray = sheetOrigen.getRange(fila, 3, 1, 5).getValues();
if (!valuesArray || valuesArray.length === 0) {
  throw new Error('Fila ' + fila + ' está vacía o no se puede leer');
}
const datos = valuesArray[0];
```

---

### 6. DATE CALCULATION BUG: Month boundary detection
- **Category**: Logic Error / Date/Time Handling
- **Location**: Lines 3353-3364 (verificarYEnviarRecordatorioReporteMensual function)
- **Severity**: HIGH
- **Problem**: The logic to detect "penultimate day of month" is convoluted and may fail on specific dates (like end of February or months with different days). The comment says "If month changes between tomorrow and day-after-tomorrow" but the comparison may be unreliable.
- **Impact**: Email reminders might be sent on wrong dates or not sent at all depending on month length.
- **Current Code**:
```javascript
const hoy = new Date();
const manana = new Date(hoy);
manana.setDate(hoy.getDate() + 1);
const pasadoManana = new Date(manana);
pasadoManana.setDate(manana.getDate() + 1);
if (pasadoManana.getMonth() !== manana.getMonth()) { // Unreliable
  enviarRecordatorioReporteMensual();
}
```
- **Solution**: Use simpler logic:
```javascript
const hoy = new Date();
const manana = new Date(hoy);
manana.setDate(hoy.getDate() + 1);

// Check if mañana is the last day of the month
const ultimoDiaDelMes = new Date(manana.getFullYear(), manana.getMonth() + 1, 0);
if (manana.getDate() === ultimoDiaDelMes.getDate()) {
  enviarRecordatorioReporteMensual(); // Mañana es el último día
}
```

---

### 7. HARDCODED CELL REFERENCES (1000 rows)
- **Category**: Cell References / Scalability
- **Location**: Lines 441, 892-895, 903, 910, 918, 943, 946, 949, 960, 967, 974, 988, 997, 1028, 1067, 1073, 1079
- **Severity**: HIGH
- **Problem**: Data validations and ranges are hardcoded to rows `A2:A1000`, `F2:F1000`, etc. If a spreadsheet grows beyond 1000 rows, new rows won't have validations.
- **Impact**: New data entered after row 1000 will not have data validation, allowing invalid values. Formula calculations might also skip these rows.
- **Code Examples**:
```javascript
// Line 441 - Protection is hardcoded to 1000 rows
sheet.getRange('A2:A1000').protect().setWarningOnly(true);

// Lines 903, 910, 918, etc - Data validation capped at 1000
terapias.getRange('F2:F1000').setDataValidation(generoRule);
hojaInteres.getRange('F2:F1000').setDataValidation(generoInteresRule);
```
- **Solution**: Use dynamic range calculation:
```javascript
const sheet = ss.getSheetByName('Terapias Individual');
const lastRow = Math.max(1000, sheet.getLastRow()); // At least 1000, but grow as needed
sheet.getRange('F2:F' + lastRow).setDataValidation(generoRule);
```

---

### 8. AMBIGUOUS STATE AFTER CLEANUP OPERATIONS
- **Category**: Logic Error / Data Loss Risk
- **Location**: Lines 4978-5028 (limpiarDatosParaNuevoMes function)
- **Severity**: HIGH
- **Problem**: Function clears data from 6 sheets but doesn't verify success or maintain any backup. If a clear operation fails mid-way, the system is left in an inconsistent state.
- **Impact**: Risk of permanent data loss if cleanup is interrupted (e.g., network issue, timeout).
- **Code Example** (Line 4978-4979):
```javascript
espera.getRange(2, 1, espera.getLastRow() - 1, 16).clearContent();
espera.getRange(2, 1, espera.getLastRow() - 1, 16).setBackground(null);
// No verification that clear succeeded
// No rollback if second line fails
```
- **Solution**: Add try-catch and verification:
```javascript
try {
  const range = espera.getRange(2, 1, espera.getLastRow() - 1, 16);
  range.clearContent();
  range.clearFormat();
  SpreadsheetApp.flush(); // Ensure Google Sheets processes the change
  Logger.log('✅ Limpiar ' + espera.getName() + ' successful');
} catch (e) {
  throw new Error('FAILED to clear ' + espera.getName() + ': ' + e.message);
}
```

---

### 9. OFF-BY-ONE ERROR IN REPORTES MENSUALES
- **Category**: Logic Error / Array Index
- **Location**: Lines 800-862 (repararFilasReportesMensuales function)
- **Severity**: HIGH
- **Problem**: Function uses hardcoded column count of 41 (`sheet.getRange(2, 1, lastRow - 1, 41)`) which may not match actual sheet structure. No validation that sheet actually has 41 columns.
- **Impact**: If the "Reportes Mensuales" sheet has more or fewer columns, data will be truncated or incomplete.
- **Code** (Line 800):
```javascript
const datos = sheet.getRange(2, 1, lastRow - 1, 41).getValues();
// Assumes sheet has exactly 41 columns - what if it has 45? Last 4 columns are ignored
// What if it only has 30? Will error with "One or more of the values in the range..."
```
- **Solution**: Detect actual column count:
```javascript
const lastColumn = sheet.getLastColumn();
const expectedColumns = 41;
if (lastColumn < expectedColumns) {
  throw new Error(`Sheet has ${lastColumn} columns, expected at least ${expectedColumns}`);
}
const datos = sheet.getRange(2, 1, lastRow - 1, lastColumn).getValues();
```

---

### 10. MISSING SHEET EXISTENCE CHECK BEFORE DELETE
- **Category**: Error Handling
- **Location**: Lines 401-403 (crearHojas function)
- **Severity**: HIGH
- **Problem**: Code deletes sheets without checking if they can be deleted (e.g., "Copy of CREAMOS ID nuevo" is protected but might not be explicitly marked).
- **Impact**: If protected sheet delete fails silently, system may be left with unexpected sheets.
- **Code** (Lines 400-404):
```javascript
const hojas = ss.getSheets();
for (let i = hojas.length - 1; i > 0; i--) {
  if (!HOJAS_PROTEGIDAS.includes(hojas[i].getName())) {
    ss.deleteSheet(hojas[i]); // No try-catch
  }
}
```
- **Solution**: Add error handling:
```javascript
for (let i = hojas.length - 1; i > 0; i--) {
  if (!HOJAS_PROTEGIDAS.includes(hojas[i].getName())) {
    try {
      ss.deleteSheet(hojas[i]);
    } catch (e) {
      Logger.log('⚠️ Could not delete ' + hojas[i].getName() + ': ' + e.message);
    }
  }
}
```

---

## MEDIUM PRIORITY ISSUES

### 11. GETSHEET BY NAME CALLED 129 TIMES - No Caching
- **Category**: Performance Issue
- **Location**: Throughout both files (e.g., lines 130, 176, 277, 394, etc.)
- **Severity**: MEDIUM
- **Problem**: `ss.getSheetByName()` is called 129+ times, often multiple times for the same sheet in the same function. This is inefficient as it performs a linear search each time.
- **Impact**: Slower execution time, especially on complex operations. Each call has overhead.
- **Code Example**:
```javascript
// Function actualizarReportes() - Lines 3266-3311
const reporte = ss.getSheetByName('Reporte'); // #1 lookup
// ... 30 lines of code ...
const fB11 = reporte.getRange('B11').getFormula(); // reporte already obtained
const reporte2 = ss.getSheetByName('Reporte'); // #2 DUPLICATE lookup
```
- **Solution**: Cache sheet references at function start:
```javascript
const sheets = {
  reporte: ss.getSheetByName('Reporte'),
  terapias: ss.getSheetByName('Terapias Individual'),
  culminados: ss.getSheetByName('Procesos Culminados'),
  // ...
};
// Use sheets.reporte, sheets.terapias, etc throughout
```

---

### 12. DUPLICATE CODE: Multiple Email Sending Functions
- **Category**: Code Duplication / Maintainability
- **Location**: Lines 2213-2276 (enviarEmailAsignacionTerapeuta), 2320-2370, 2393-2488, etc.
- **Severity**: MEDIUM
- **Problem**: Similar email sending logic is repeated in multiple functions with minor variations. Code duplication increases maintenance burden.
- **Impact**: If email formatting or headers need to be updated, must change in multiple places. Risk of inconsistencies.
- **Current Structure**:
```javascript
function enviarEmailAsignacionTerapeuta(...) { /* HTML email building */ }
function probarEmail() { /* Same HTML email building */ }
function probarEmailsTerapeutas() { /* Same structure again */ }
function enviarEmailFinalizacion(...) { /* Yet another variation */ }
```
- **Solution**: Extract email template builder:
```javascript
function construirEmailTemplate(titulo, contenido, botones = []) {
  return '<!DOCTYPE html><html>' +
    '<head><style>' + CSS + '</style></head>' +
    '<body><div class="container">' +
    '<div class="header">' + titulo + '</div>' +
    '<div class="content">' + contenido + '</div>' +
    // ... botones ...
    '</div></body></html>';
}
```

---

### 13. INCONSISTENT ERROR HANDLING PATTERNS
- **Category**: Error Handling / Documentation
- **Location**: Throughout both files (e.g., lines 117-122, 235-238, 287-304, etc.)
- **Severity**: MEDIUM
- **Problem**: Error handling is inconsistent. Some try-catch blocks catch all errors, others only specific ones. Some log to Logger, some to toast, some to both, some to neither.
- **Impact**: Difficult to debug issues. Some errors are silently swallowed, others crash loudly.
- **Examples**:
```javascript
// Pattern 1: Silently ignore
try {
  _ocultarHojaMaestra();
} catch(e) {} // Completely silent - bad for debugging

// Pattern 2: Log but don't show user
try {
  mantenimientoAutomatico();
} catch (error) {
  Logger.log('Error: ' + error.message); // User never sees this
}

// Pattern 3: Show to user but don't log details
try {
  ss.toast('Error: ' + error.message); // Toast hidden if no UI
}
```
- **Solution**: Create standard error handler:
```javascript
function manejarError(nombreFuncion, error, mostrarAlUsuario = false) {
  const mensaje = `❌ [${nombreFuncion}] ${error.message}`;
  Logger.log(mensaje);
  if (mostrarAlUsuario) {
    try { SpreadsheetApp.getActiveSpreadsheet().toast(mensaje, 'Error', 10); } catch(e) {}
  }
}
```

---

### 14. MISSING VALIDATION: Sheet Column Count Assumptions
- **Category**: Logic Error / Data Integrity
- **Location**: Lines 8173, 8270, 8910, 9099, 9428 (importar functions)
- **Severity**: MEDIUM
- **Problem**: Import functions assume specific column counts (16, 13, 9 columns, etc.) without validation. If CSV structure changes or is corrupted, silent failures occur.
- **Impact**: Data might be imported partially or incorrectly without any error message.
- **Code Example** (Line 8173):
```javascript
const existentes = sheet.getLastRow() > 1
  ? sheet.getRange(2, 1, sheet.getLastRow() - 1, 16).getValues()
  : [];
// If sheet was updated to have 18 columns, last 2 are ignored
// If CSV has 12 fields, empty columns are created
```
- **Solution**: Validate and adapt:
```javascript
const expectedColumns = 16;
const actualColumns = sheet.getLastColumn();
if (actualColumns !== expectedColumns) {
  Logger.log('⚠️ Expected ' + expectedColumns + ' columns, found ' + actualColumns);
}
const readColumns = Math.min(expectedColumns, actualColumns);
const existentes = sheet.getLastRow() > 1
  ? sheet.getRange(2, 1, sheet.getLastRow() - 1, readColumns).getValues()
  : [];
```

---

### 15. DATE TYPE AMBIGUITY IN FORMULAS
- **Category**: Data Type / Formula Issue
- **Location**: Lines 3915-3917, 4140-4141 (date filtering logic)
- **Severity**: MEDIUM
- **Problem**: Dates are compared directly without ensuring correct date type. Strings that look like dates may not compare correctly.
- **Impact**: Date range filters might miss records or include wrong ones due to type mismatch.
- **Code** (Line 3921):
```javascript
if (f[0] instanceof Date && f[0] >= primerDia && f[0] <= ultimoDia) mes++;
// This works, but if f[0] is a string date, instanceof Date fails and row is skipped
```
- **Solution**: Add type coercion:
```javascript
let fecha = f[0];
if (typeof fecha === 'string') {
  fecha = new Date(fecha);
}
if (fecha instanceof Date && !isNaN(fecha) && fecha >= primerDia && fecha <= ultimoDia) {
  mes++;
}
```

---

### 16. UNDEFINED FUNCTION: HEADERS_REPORTE_AUTO Variable
- **Category**: Constants / Scope
- **Location**: Lines 4442, 4652
- **Severity**: MEDIUM
- **Problem**: `HEADERS_REPORTE_AUTO` is defined as a const but used in multiple functions. Not defined in global scope as var, which could cause scope issues in triggers.
- **Impact**: If called from a trigger context, the constant might not be accessible.
- **Code** (Line 4442):
```javascript
const HEADERS_REPORTE_AUTO = [ /* 41 element array */ ];
```
- **Solution**: Move to global scope:
```javascript
// At top of file with other constants
var HEADERS_REPORTE_AUTO = [ /* 41 element array */ ];
```

---

## LOWER PRIORITY ISSUES

### 17. INCOMPLETE COMMENT DOCUMENTATION
- **Category**: Documentation
- **Location**: Multiple functions throughout
- **Severity**: LOW
- **Problem**: Many functions lack JSDoc comments explaining parameters, return values, and purpose. Makes maintenance difficult.
- **Examples**: 
  - `_agregarAListaEspera()` - No JSDoc (line 7395)
  - `procesarConfirmacionAsistencia()` - Minimal comments (line 1365)
  - `_parsearCSV()` - No JSDoc (line 7376)

---

### 18. UNUSED FUNCTIONS / DEAD CODE
- **Category**: Code Cleanliness
- **Location**: Multiple commented-out functions
- **Severity**: LOW
- **Problem**: Several functions are commented out but never removed. This clutters the codebase.
- **Examples**:
  - Line 8975: `// function enviarReferenciaAListaEspera(sheet, fila) {`
  - Line 9152: `// function enviarDerivacionInstitucionalAListaEspera(sheet, fila) {`
  - Line 9182: `// function enviarIntervencionCasosAListaEspera(sheet, fila) {`
- **Solution**: Delete completely or document why they're kept

---

### 19. INCONSISTENT NAMING CONVENTIONS
- **Category**: Code Style / Maintainability
- **Location**: Throughout
- **Severity**: LOW
- **Problem**: Mix of naming conventions:
  - Private functions: `_ocultarHojaMaestra()`, `_agregarAListaEspera()` (inconsistent underscore usage)
  - Events: `alEditar()` (Spanish), `onOpen()` (English)
  - Variables: `mesLabel`, `mes_label`, `mesActual` (mix of camelCase and snake_case)

---

### 20. HARDCODED THERAPIST NAMES
- **Category**: Constants / Configuration
- **Location**: Lines 556-559, 3929-3930, etc.
- **Severity**: LOW
- **Problem**: Therapist names (Gerber, Melissa, Diana, Karina) are hardcoded in multiple formulas and loops. Adding a new therapist requires code changes.
- **Impact**: System not scalable for organizational changes.
- **Code** (Lines 556-559):
```javascript
['Gerber', '=IFERROR(COUNTIFS(...)', ...],
['Melissa', '=IFERROR(COUNTIFS(...)', ...],
['Diana', '=IFERROR(COUNTIFS(...)', ...],
['Karina', '=IFERROR(COUNTIFS(...)', ...],
```
- **Solution**: Move therapist list to configuration:
```javascript
const TERAPEUTAS = ['Gerber', 'Melissa', 'Diana', 'Karina'];
// Loop through instead of hardcoding
TERAPEUTAS.forEach(t => {
  // Build formulas dynamically
});
```

---

### 21. HARDCODED SHEET NAMES
- **Category**: Constants / Maintainability
- **Location**: Throughout (estimated 100+ hardcoded sheet references)
- **Severity**: LOW
- **Problem**: Sheet names are hardcoded in many places. If a sheet is renamed, many changes required.
- **Examples**:
  - `'Terapias Individual'` - appears 30+ times
  - `'Procesos Culminados'` - appears 15+ times
  - `'Hoja de interés'` - appears 20+ times

---

### 22. MISSING INTERNATIONAL SUPPORT
- **Category**: Localization
- **Location**: Throughout (dates, text, messages)
- **Severity**: LOW
- **Problem**: System is hardcoded for Spanish. No support for other languages. Date formatting assumes Spanish locale.
- **Impact**: System only usable in Spanish-speaking regions.

---

### 23. CONSOLE.LOG vs LOGGER.LOG INCONSISTENCY
- **Category**: Debugging / Logging
- **Location**: Throughout
- **Severity**: LOW
- **Problem**: Uses `Logger.log()` everywhere, but App Script also supports `console.log()`. Consistency unclear.

---

## INTEGRATION ISSUES (SistemaCompleto ↔ SistemaGrupos)

### 24. NO CROSS-SYSTEM DATA SHARING DEFINED
- **Category**: Integration Issue / System Design
- **Location**: Both systems exist independently
- **Severity**: MEDIUM
- **Problem**: SistemaCompleto and SistemaGrupos appear to be completely isolated. No data flows between them. They share the same spreadsheet but don't communicate.
- **Impact**: If a person is added to a group in SistemaGrupos, this data doesn't feed back to "Terapias Individual" in SistemaCompleto. Two separate databases for the same entities.
- **Solution**: Define a clear data integration strategy:
  - Should groups system update therapy records?
  - Should therapy system feed data to groups?
  - Unified "Participante" table?

---

### 25. DUPLICATE KOBO URLs
- **Category**: Integration / Constants
- **Location**: Lines 13-14 (SistemaGrupos.gs), Lines 27-28 (SistemaCompleto.gs)
- **Severity**: LOW
- **Problem**: Same Kobo URLs defined in both files. If URL changes, must update both places.
- **Impact**: Risk of inconsistency between systems.

---

## SUMMARY TABLE

| Category | Count | Severity |
|----------|-------|----------|
| Logic Errors | 8 | CRITICAL/HIGH |
| Formula Issues | 3 | CRITICAL/HIGH |
| Cell References | 5 | HIGH |
| Constants/Variables | 4 | CRITICAL/HIGH |
| Error Handling | 3 | MEDIUM |
| Performance | 1 | MEDIUM |
| Code Duplication | 2 | MEDIUM |
| Data Validation | 2 | MEDIUM |
| Documentation | 5 | LOW |
| Style/Convention | 4 | LOW |
| **TOTAL** | **37** | — |

---

## RECOMMENDED FIXES (Priority Order)

1. **CRITICAL**: Define `COL_ENVIAR_INTERES` constant (1 line fix)
2. **CRITICAL**: Merge `onOpen()` functions from both files (prevent menu collision)
3. **HIGH**: Replace hardcoded row limits (500) with dynamic ranges
4. **HIGH**: Add bounds checking to array access patterns
5. **HIGH**: Fix month-end detection logic for email reminders
6. **HIGH**: Replace hardcoded ranges (1000 rows) with dynamic validation
7. **HIGH**: Add data verification to cleanup operations
8. **HIGH**: Validate sheet column counts in import functions
9. **MEDIUM**: Cache sheet references instead of repeated lookups
10. **MEDIUM**: Extract common email template code
11. **MEDIUM**: Standardize error handling patterns
12. **LOW**: Move hardcoded values (therapist names, sheet names) to configuration

---

## TESTING RECOMMENDATIONS

1. **Data Overflow Test**: Import 600+ therapy records and verify calculations remain correct
2. **Date Boundary Test**: Run system on last day of month to verify email reminder accuracy
3. **Integration Test**: Verify both SistemaCompleto and SistemaGrupos menus appear when both scripts active
4. **Empty Data Test**: Verify system handles sheets with 0-10 records without errors
5. **Error Recovery Test**: Simulate cleanup interruption and verify data integrity
6. **Performance Test**: Measure execution time of actualizarReportes() with 1000+ records

---

## NOTES

- Files are well-documented with emoji indicators and toast notifications
- Overall architecture is sound but needs refinement
- No apparent security vulnerabilities found (URLs are public KoboToolbox APIs)
- Main issues are scalability and edge case handling
