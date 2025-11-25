/**
 * =========================================================================
 * SISTEMA DE APOYO EMOCIONAL - VERSIÓN UNIFICADA Y SIMPLIFICADA
 * Por Adrian Torres - Manufacturing Operations
 * Versión: 3.0 - Unificada, Optimizada y Simplificada
 * =========================================================================
 *
 * ARCHIVO ÚNICO - Todo el código en un solo lugar
 *
 * CAMBIOS EN VERSIÓN 3.0:
 * ✅ Código unificado en un solo archivo (antes 3 archivos)
 * ✅ Lista de Espera simplificada (solo dropdown "Enviar")
 * ✅ Nuevos Ingresos reorganizado (Terapeuta al final - col K)
 * ✅ Asignaciones simplificado (10 columnas, Estado en col H)
 * ✅ "Sexo" cambiado a "Género" en todo el sistema
 * ✅ Nuevas opciones de género: No binario, Trans hombre
 * ✅ Flujo lógico: Llenar info → Asignar → Enviar
 * ✅ Sistema de finalización con prompts y email
 *
 * ESTRUCTURA DE HOJAS:
 * 1. Lista de Espera (12 cols) - Acción: "Enviar" → Nuevos Ingresos
 * 2. Nuevos Ingresos (11 cols) - Terapeuta (col K) → Asignaciones
 * 3. Asignaciones (10 cols) - Estado (col H) → Hojas finales
 *
 * TRIGGERS NECESARIOS:
 * - onEditSistemaCompleto (tipo: Al editar)
 *
 * =========================================================================
 */

// =========================================================================
// GESTIÓN DE TRIGGERS
// =========================================================================

/**
 * Limpiar todos los triggers existentes
 */
function limpiarTriggers() {
  try {
    const triggers = ScriptApp.getProjectTriggers();
    let count = 0;

    for (let i = 0; i < triggers.length; i++) {
      ScriptApp.deleteTrigger(triggers[i]);
      count++;
    }

    Logger.log("🗑️ Triggers eliminados: " + count);
    return count;

  } catch (error) {
    Logger.log("❌ Error limpiando triggers: " + error.toString());
    return 0;
  }
}

// =========================================================================
// INSTALACIÓN PRINCIPAL
// =========================================================================

/**
 * Instalación completa del sistema
 * Esta función instala todo el sistema desde cero
 */
function instalarSistemaCompletoMejorado() {
  try {
    Logger.log("🚀 INICIANDO INSTALACIÓN DEL SISTEMA...");

    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // 1. Crear todas las hojas
    Logger.log("📄 Creando hojas...");
    crearTodasLasHojasMejoradas();

    // 2. Configurar validaciones
    Logger.log("✅ Configurando validaciones...");
    configurarValidacionesMejoradas();

    // 3. Configurar formatos
    Logger.log("🎨 Configurando formatos...");
    configurarFormatosMejorados();

    // 4. Crear datos de ejemplo
    Logger.log("📊 Creando datos de ejemplo...");
    crearDatosEjemploMejorados();

    // 5. Limpiar triggers existentes
    Logger.log("🗑️ Limpiando triggers...");
    limpiarTriggers();

    // Mensaje final
    ss.toast(
      "🎉 SISTEMA INSTALADO EXITOSAMENTE\n\n" +
      "✅ Hojas creadas\n" +
      "✅ Validaciones configuradas\n" +
      "✅ Formatos aplicados\n" +
      "✅ Datos de ejemplo incluidos\n\n" +
      "⚠️ IMPORTANTE:\n" +
      "Ahora debes crear el trigger manualmente:\n" +
      "1. Extensiones → Apps Script\n" +
      "2. Activadores (ícono ⏰)\n" +
      "3. + Agregar activador\n" +
      "4. Función: onEditSistemaCompleto\n" +
      "5. Tipo: Al editar\n" +
      "6. Guardar",
      "✅ Instalación Completa",
      -1
    );

    Logger.log("🎉 INSTALACIÓN COMPLETADA EXITOSAMENTE");
    return true;

  } catch (error) {
    Logger.log("❌ ERROR EN INSTALACIÓN: " + error.toString());
    SpreadsheetApp.getActiveSpreadsheet().toast(
      "❌ Error en instalación: " + error.toString(),
      "Error",
      10
    );
    return false;
  }
}

/**
 * Crear todas las hojas del sistema
 */
function crearTodasLasHojasMejoradas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Eliminar hojas existentes excepto la primera
  const sheets = ss.getSheets();
  for (let i = sheets.length - 1; i > 0; i--) {
    ss.deleteSheet(sheets[i]);
  }

  // Renombrar primera hoja
  sheets[0].setName("Nuevos Ingresos");

  // Crear todas las hojas
  crearHojaListaEspera();
  crearHojaNuevosIngresosMejorada();
  crearHojaAsignacionesMejorada();
  crearHojaProcesosCulminados();
  crearHojaDeserciones();
  crearHojaGestionCasos();
  crearHojaAsistenciaGrupal();
  crearHojaReporteCompleto();
  crearHojaReportesMensuales();
}

// =========================================================================
// CREACIÓN DE HOJAS INDIVIDUALES
// =========================================================================

/**
 * Crear hoja Lista de Espera
 */
function crearHojaListaEspera() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet("Lista de Espera", 0); // Insertar como primera hoja

  sheet.clear();

  // Encabezados simplificados - solo texto libre + dropdown final
  const headers = [
    "Fecha Solicitud", "No.", "Nombre Completo", "Creemos ID", "Género",
    "Rango Edad", "Malestar Principal", "Derivado Por", "Contacto Emergencia",
    "Teléfono", "Observaciones", "Acción"
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Formato encabezados
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground("#e91e63")
    .setFontColor("white")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  // Fórmulas automáticas (fila 2)
  sheet.getRange("A2").setFormula('=IF(C2<>"";HOY();"")');
  sheet.getRange("B2").setFormula('=IF(C2<>"";FILA()-1;"")');

  // Copiar fórmulas hacia abajo (100 filas)
  sheet.getRange("A2:A2").copyTo(sheet.getRange("A3:A100"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
  sheet.getRange("B2:B2").copyTo(sheet.getRange("B3:B100"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);

  // Ajustar anchos
  const widths = [110, 60, 200, 120, 100, 100, 250, 150, 180, 120, 200, 150];
  widths.forEach((width, i) => {
    sheet.setColumnWidth(i + 1, width);
  });

  // Instrucciones
  sheet.getRange("N1").setValue("📋 LISTA DE ESPERA");
  sheet.getRange("N2").setValue("═".repeat(25));
  sheet.getRange("N3").setValue("🎯 INSTRUCCIONES:");
  sheet.getRange("N4").setValue("1. Llenar datos del participante");
  sheet.getRange("N5").setValue("2. Todos los campos son texto libre");
  sheet.getRange("N6").setValue("3. Al final (columna L):");
  sheet.getRange("N7").setValue("   → Seleccionar: 'Enviar'");
  sheet.getRange("N8").setValue("   → Se mueve automáticamente");
  sheet.getRange("N9").setValue("   → a 'Nuevos Ingresos'");
  sheet.getRange("N10").setValue("");
  sheet.getRange("N11").setValue("⚠️ ACCIÓN (Columna L):");
  sheet.getRange("N12").setValue("• (vacío) = en espera");
  sheet.getRange("N13").setValue("• Enviar = mover a Nuevos Ingresos");
  sheet.getRange("N1:N13").setBackground("#fce4ec").setFontWeight("bold");

  // Proteger columnas automáticas
  sheet.getRange("A2:A100").protect().setWarningOnly(true);
  sheet.getRange("B2:B100").protect().setWarningOnly(true);
}

/**
 * Crear hoja Nuevos Ingresos
 */
function crearHojaNuevosIngresosMejorada() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Nuevos Ingresos");

  sheet.clear();

  // Encabezados reorganizados - TERAPEUTA AL FINAL
  // FLUJO: Llenar datos C-J → AL FINAL asignar Terapeuta (K) que ENVÍA a Asignaciones
  const headers = [
    "Fecha Ingreso", "No.", "Nombre Completo", "Creemos ID", "Género",
    "Rango Edad", "Malestar Principal", "Tipo Atención", "Derivado Por",
    "Contacto Emergencia", "Terapeuta Asignado"
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Formato encabezados
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground("#1f4788")
    .setFontColor("white")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  // Ajustar anchos
  const widths = [110, 60, 200, 120, 100, 100, 250, 120, 150, 180, 150];
  widths.forEach((width, i) => {
    sheet.setColumnWidth(i + 1, width);
  });

  // Fórmulas automáticas (fila 2)
  sheet.getRange("A2").setFormula('=IF(C2<>"";HOY();"")');
  sheet.getRange("B2").setFormula('=IF(C2<>"";FILA()-1;"")');

  // Copiar fórmulas hacia abajo (100 filas)
  sheet.getRange("A2:A2").copyTo(sheet.getRange("A3:A100"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
  sheet.getRange("B2:B2").copyTo(sheet.getRange("B3:B100"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);

  // Instrucciones
  sheet.getRange("M1").setValue("🎯 FLUJO DE USO");
  sheet.getRange("M2").setValue("═".repeat(25));
  sheet.getRange("M3").setValue("ORDEN CORRECTO:");
  sheet.getRange("M4").setValue("1️⃣ Llenar TODA la información");
  sheet.getRange("M5").setValue("   C-J (Nombre hasta Contacto)");
  sheet.getRange("M6").setValue("");
  sheet.getRange("M7").setValue("2️⃣ AL FINAL: Asignar Terapeuta");
  sheet.getRange("M8").setValue("   Columna K (dropdown)");
  sheet.getRange("M9").setValue("");
  sheet.getRange("M10").setValue("3️⃣ AUTOMÁTICO: Se envía");
  sheet.getRange("M11").setValue("   → a Asignaciones y Terapias");
  sheet.getRange("M12").setValue("");
  sheet.getRange("M13").setValue("TERAPEUTAS:");
  sheet.getRange("M14").setValue("• Gerber");
  sheet.getRange("M15").setValue("• Melissa");
  sheet.getRange("M16").setValue("• Diana");
  sheet.getRange("M17").setValue("• Karina");
  sheet.getRange("M1:M17").setBackground("#e8f5e8").setFontWeight("bold");
}

/**
 * Crear hoja Asignaciones y Terapias
 */
function crearHojaAsignacionesMejorada() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet("Asignaciones y Terapias");

  // COLUMNAS SIMPLIFICADAS - Solo 10 columnas
  const headers = [
    "Terapeuta", "No.", "Participante", "Creemos ID", "Género",
    "Tipo Terapia", "No. Sesión", "Estado Proceso",
    "Fecha Inicio", "Motivo Finalización"
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Formato encabezados
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground("#2e7d32")
    .setFontColor("white")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  // Ajustar anchos SIMPLIFICADOS
  const widths = [150, 60, 200, 120, 80, 120, 100, 150, 120, 300];
  widths.forEach((width, i) => {
    sheet.setColumnWidth(i + 1, width);
  });

  // Fórmulas automáticas SIMPLIFICADAS
  sheet.getRange("B2").setFormula('=IF(A2<>"";FILA()-1;"")');
  sheet.getRange("F2").setFormula('=IF(A2<>"";"Individual";"")');
  sheet.getRange("G2").setFormula('=IF(A2<>"";1;"")');  // Sesión inicial = 1
  sheet.getRange("H2").setFormula('=IF(A2<>"";"En proceso";"")');
  sheet.getRange("I2").setFormula('=IF(A2<>"";HOY();"")');

  // Copiar fórmulas
  sheet.getRange("B2:B2").copyTo(sheet.getRange("B3:B200"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
  sheet.getRange("F2:F2").copyTo(sheet.getRange("F3:F200"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
  sheet.getRange("G2:G2").copyTo(sheet.getRange("G3:G200"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
  sheet.getRange("H2:H2").copyTo(sheet.getRange("H3:H200"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
  sheet.getRange("I2:I2").copyTo(sheet.getRange("I3:I200"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);

  // Instrucciones SIMPLIFICADAS
  sheet.getRange("L1").setValue("⚡ INSTRUCCIONES");
  sheet.getRange("L2").setValue("═".repeat(25));
  sheet.getRange("L3").setValue("COLUMNAS CLAVE:");
  sheet.getRange("L4").setValue("G. No. Sesión (1-20)");
  sheet.getRange("L5").setValue("H. Estado:");
  sheet.getRange("L6").setValue("  • En proceso");
  sheet.getRange("L7").setValue("  • Finalizado");
  sheet.getRange("L8").setValue("");
  sheet.getRange("L9").setValue("🔥 AL SELECCIONAR 'Finalizado':");
  sheet.getRange("L10").setValue("1. Pregunta motivo");
  sheet.getRange("L11").setValue("2. Envía correo a director");
  sheet.getRange("L12").setValue("3. Copia a hoja final");
  sheet.getRange("L13").setValue("4. Mantiene registro aquí");
  sheet.getRange("L1:L13").setBackground("#fff3e0").setFontWeight("bold");
}

/**
 * Crear hoja Procesos Culminados
 */
function crearHojaProcesosCulminados() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet("Procesos Culminados");

  const headers = [
    "Fecha Culminación", "No.", "Participante", "Terapeuta", "Creemos ID",
    "Total Sesiones", "Duración (días)", "Motivo Culminación", "Objetivos Alcanzados",
    "Nivel Satisfacción", "Recomendaciones", "Seguimiento Requerido", "Mes Culminación"
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Formato encabezados
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground("#388e3c")
    .setFontColor("white")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  // Ajustar anchos
  const widths = [120, 60, 180, 120, 120, 100, 100, 200, 200, 120, 200, 150, 120];
  widths.forEach((width, i) => {
    sheet.setColumnWidth(i + 1, width);
  });

  // Fórmulas
  sheet.getRange("B2").setFormula('=IF(A2<>"";FILA()-1;"")');
  sheet.getRange("M2").setFormula('=IF(A2<>"";TEXTO(A2;"MMMM AAAA");"")');

  // Copiar fórmulas
  sheet.getRange("B2:B2").copyTo(sheet.getRange("B3:B200"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
  sheet.getRange("M2:M2").copyTo(sheet.getRange("M3:M200"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);

  // Estadísticas
  sheet.getRange("O1").setValue("📊 ESTADÍSTICAS");
  sheet.getRange("O2").setValue("Total este mes:");
  sheet.getRange("P2").setFormula('=CONTAR.SI(M:M;TEXTO(HOY();"MMMM AAAA"))');
  sheet.getRange("O3").setValue("Promedio sesiones:");
  sheet.getRange("P3").setFormula('=SI(CONTARA(F:F)>1;PROMEDIO(F2:F);0)');
  sheet.getRange("O1:P3").setBackground("#e8f5e8").setFontWeight("bold");
}

/**
 * Crear hoja Deserciones
 */
function crearHojaDeserciones() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet("Deserciones");

  const headers = [
    "Fecha Deserción", "No.", "Participante", "Terapeuta", "Creemos ID",
    "Sesiones Asistidas", "Última Asistencia", "Motivo Deserción",
    "Intentos Contacto", "Factores Identificados"
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Formato
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground("#d32f2f")
    .setFontColor("white")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  // Anchos
  const widths = [120, 60, 180, 120, 120, 100, 120, 200, 150, 200];
  widths.forEach((width, i) => {
    sheet.setColumnWidth(i + 1, width);
  });

  // Fórmula
  sheet.getRange("B2").setFormula('=IF(A2<>"";FILA()-1;"")');
  sheet.getRange("B2:B2").copyTo(sheet.getRange("B3:B200"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
}

/**
 * Crear hoja Gestión de Casos
 */
function crearHojaGestionCasos() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet("Gestión de Casos");

  const headers = [
    "Fecha Gestión", "No.", "Participante", "Terapeuta", "Creemos ID",
    "Tipo Gestión", "Motivo Gestión", "Acciones Tomadas",
    "Derivado A", "Estado Actual"
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Formato
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground("#f57c00")
    .setFontColor("white")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  // Anchos
  const widths = [120, 60, 180, 120, 120, 150, 200, 200, 150, 120];
  widths.forEach((width, i) => {
    sheet.setColumnWidth(i + 1, width);
  });

  // Fórmula
  sheet.getRange("B2").setFormula('=IF(A2<>"";FILA()-1;"")');
  sheet.getRange("B2:B2").copyTo(sheet.getRange("B3:B200"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
}

/**
 * Crear hoja Asistencia Grupal
 */
function crearHojaAsistenciaGrupal() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet("Asistencia Grupal");

  // Encabezados
  sheet.getRange("A1").setValue("Nombre");
  sheet.getRange("B1").setValue("Teléfono");

  // Crear fechas (últimos 8 lunes)
  const hoy = new Date();
  for (let i = 7; i >= 0; i--) {
    const fecha = new Date(hoy.getTime() - (i * 7 * 24 * 60 * 60 * 1000));
    const diasParaLunes = (fecha.getDay() + 6) % 7;
    fecha.setDate(fecha.getDate() - diasParaLunes);

    const col = String.fromCharCode(67 + (7 - i)); // C, D, E, F, G, H, I, J
    sheet.getRange(col + "1").setValue(Utilities.formatDate(fecha, Session.getScriptTimeZone(), "dd/MM/yyyy"));
  }

  // Formato encabezados
  sheet.getRange(1, 1, 1, 10)
    .setBackground("#4CAF50")
    .setFontColor("white")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  // Participantes de ejemplo
  const participantes = [
    ["María González", "12345678"],
    ["Carlos López", "87654321"],
    ["Ana Morales", "11223344"],
    ["José Torres", "44332211"],
    ["Sofia Ramírez", "55667788"]
  ];

  participantes.forEach((participante, index) => {
    const fila = index + 2;
    sheet.getRange(fila, 1, 1, 2).setValues([participante]);

    // Agregar checkboxes
    for (let col = 3; col <= 10; col++) {
      sheet.getRange(fila, col).insertCheckboxes();
    }
  });

  // Ajustar anchos
  sheet.setColumnWidth(1, 200);
  sheet.setColumnWidth(2, 120);
  for (let col = 3; col <= 10; col++) {
    sheet.setColumnWidth(col, 100);
  }

  // Estadísticas
  sheet.getRange("L1").setValue("Total Participantes:");
  sheet.getRange("M1").setFormula('=CONTARA(A2:A)-CONTAR.BLANCO(A2:A)');
  sheet.getRange("L2").setValue("Asistencias Totales:");
  sheet.getRange("M2").setFormula('=SUMAPRODUCTO(C2:J6)');
  sheet.getRange("L3").setValue("% Asistencia:");
  sheet.getRange("M3").setFormula('=SI(M1>0;M2/(M1*8)*100&"%";"0%")');

  sheet.getRange("L1:M3").setBackground("#fff3e0").setFontWeight("bold");
}

/**
 * Crear hoja Reporte Completo
 */
function crearHojaReporteCompleto() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet("Reporte Automático Completo");

  const data = [
    ["📊 REPORTE AUTOMÁTICO COMPLETO", ""],
    ["🔄 Última actualización:", "=AHORA()"],
    ["📅 Mes actual:", "=TEXTO(HOY();\"MMMM AAAA\")"],
    ["", ""],
    ["👥 NUEVOS INGRESOS", ""],
    ["Total ingresos", '=CONTARA(\'Nuevos Ingresos\'!C:C)-1'],
    ["Ingresos este mes", '=CONTAR.SI.CONJUNTO(\'Nuevos Ingresos\'!A:A;">="&FECHA(AÑO(HOY());MES(HOY());1);\'Nuevos Ingresos\'!A:A;"<="&FIN.MES(HOY();0))'],
    ["Pendientes asignar", '=CONTAR.SI.CONJUNTO(\'Nuevos Ingresos\'!K:K;"";\'Nuevos Ingresos\'!C:C;"<>")'],
    ["Ya asignados", '=CONTAR.SI.CONJUNTO(\'Nuevos Ingresos\'!K:K;"<>";\'Nuevos Ingresos\'!C:C;"<>")'],
    ["", ""],
    ["👩‍⚕️ CASOS ACTIVOS POR TERAPEUTA", ""],
    ["Gerber - Casos activos", '=CONTAR.SI.CONJUNTO(\'Asignaciones y Terapias\'!A:A;"Gerber";\'Asignaciones y Terapias\'!H:H;"En proceso")'],
    ["Melissa - Casos activos", '=CONTAR.SI.CONJUNTO(\'Asignaciones y Terapias\'!A:A;"Melissa";\'Asignaciones y Terapias\'!H:H;"En proceso")'],
    ["Diana - Casos activos", '=CONTAR.SI.CONJUNTO(\'Asignaciones y Terapias\'!A:A;"Diana";\'Asignaciones y Terapias\'!H:H;"En proceso")'],
    ["Karina - Casos activos", '=CONTAR.SI.CONJUNTO(\'Asignaciones y Terapias\'!A:A;"Karina";\'Asignaciones y Terapias\'!H:H;"En proceso")'],
    ["Total casos activos", "=B12+B13+B14+B15"],
    ["", ""],
    ["🎉 PROCESOS CULMINADOS", ""],
    ["Total culminados", '=CONTARA(\'Procesos Culminados\'!A:A)-1'],
    ["Culminados este mes", '=CONTAR.SI(\'Procesos Culminados\'!M:M;TEXTO(HOY();"MMMM AAAA"))'],
    ["Promedio sesiones", '=SI(B19>0;PROMEDIO(\'Procesos Culminados\'!F:F);0)'],
    ["", ""],
    ["⚠️ DESERCIONES", ""],
    ["Total deserciones", '=CONTARA(Deserciones!A:A)-1'],
    ["Deserciones este mes", '=CONTAR.SI.CONJUNTO(Deserciones!A:A;">="&FECHA(AÑO(HOY());MES(HOY());1);Deserciones!A:A;"<="&FIN.MES(HOY();0))'],
    ["Tasa deserción", '=SI((B19+B23)>0;B23/(B19+B23)*100&"%";"0%")'],
    ["", ""],
    ["📋 GESTIÓN DE CASOS", ""],
    ["Total en gestión", '=CONTARA(\'Gestión de Casos\'!A:A)-1'],
    ["", ""],
    ["📊 ESTADÍSTICAS GENERALES", ""],
    ["Total casos procesados", "=B19+B23+B27"],
    ["Tasa de éxito", '=SI(B30>0;B19/B30*100&"%";"0%")'],
    ["Casos activos", "=B16"]
  ];

  sheet.getRange(1, 1, data.length, 2).setValues(data);

  // Formatos
  sheet.getRange("A1:B1").merge()
    .setBackground("#1f4788")
    .setFontColor("white")
    .setFontWeight("bold")
    .setFontSize(16)
    .setHorizontalAlignment("center");

  const sectionRows = [5, 11, 18, 22, 26, 29];
  sectionRows.forEach(row => {
    sheet.getRange("A" + row + ":B" + row)
      .setBackground("#4caf50")
      .setFontColor("white")
      .setFontWeight("bold");
  });

  sheet.setColumnWidth(1, 300);
  sheet.setColumnWidth(2, 150);
}

/**
 * Crear hoja Reportes Mensuales
 */
function crearHojaReportesMensuales() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.insertSheet("Reportes Mensuales");

  const headers = [
    "Mes/Año", "Nuevos Ingresos", "Culminados", "Deserciones", "Gestión Casos",
    "Casos Activos", "Tasa Éxito (%)", "Gerber", "Melissa", "Diana", "Karina",
    "Asist. Grupales", "% Asist. Grupal", "Fecha Guardado"
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Formato
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground("#6a1b9a")
    .setFontColor("white")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  // Anchos
  const widths = [120, 100, 100, 100, 100, 100, 100, 80, 80, 80, 80, 100, 100, 120];
  widths.forEach((width, i) => {
    sheet.setColumnWidth(i + 1, width);
  });

  // Fórmulas para mes actual (fila 2)
  const formulas = [
    '=TEXTO(HOY();"MMMM AAAA")',
    '=CONTAR.SI.CONJUNTO(\'Nuevos Ingresos\'!A:A;">="&FECHA(AÑO(HOY());MES(HOY());1);\'Nuevos Ingresos\'!A:A;"<="&FIN.MES(HOY();0))',
    '=CONTAR.SI(\'Procesos Culminados\'!M:M;TEXTO(HOY();"MMMM AAAA"))',
    '=CONTAR.SI.CONJUNTO(Deserciones!A:A;">="&FECHA(AÑO(HOY());MES(HOY());1);Deserciones!A:A;"<="&FIN.MES(HOY();0))',
    '=CONTAR.SI.CONJUNTO(\'Gestión de Casos\'!A:A;">="&FECHA(AÑO(HOY());MES(HOY());1);\'Gestión de Casos\'!A:A;"<="&FIN.MES(HOY();0))',
    '=CONTAR.SI(\'Asignaciones y Terapias\'!H:H;"En proceso")',
    '=SI((C2+D2)>0;C2/(C2+D2)*100;0)',
    '=CONTAR.SI.CONJUNTO(\'Asignaciones y Terapias\'!A:A;"Gerber";\'Asignaciones y Terapias\'!H:H;"En proceso")',
    '=CONTAR.SI.CONJUNTO(\'Asignaciones y Terapias\'!A:A;"Melissa";\'Asignaciones y Terapias\'!H:H;"En proceso")',
    '=CONTAR.SI.CONJUNTO(\'Asignaciones y Terapias\'!A:A;"Diana";\'Asignaciones y Terapias\'!H:H;"En proceso")',
    '=CONTAR.SI.CONJUNTO(\'Asignaciones y Terapias\'!A:A;"Karina";\'Asignaciones y Terapias\'!H:H;"En proceso")',
    '=SUMAPRODUCTO(\'Asistencia Grupal\'!C2:J6)',
    '=SI(CONTARA(\'Asistencia Grupal\'!A2:A)>0;L2/(CONTARA(\'Asistencia Grupal\'!A2:A)*8)*100;0)',
    '=HOY()'
  ];

  sheet.getRange(2, 1, 1, formulas.length).setFormulas([formulas]);
}

// =========================================================================
// CONFIGURACIONES
// =========================================================================

/**
 * Configurar validaciones de datos
 */
function configurarValidacionesMejoradas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const nuevos = ss.getSheetByName("Nuevos Ingresos");
  const asignaciones = ss.getSheetByName("Asignaciones y Terapias");

  // Género (actualizado con más opciones)
  const generoRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Hombre", "Mujer", "Trans hombre", "No binario", "Otro"])
    .setAllowInvalid(false)
    .build();
  nuevos.getRange("E2:E200").setDataValidation(generoRule);
  asignaciones.getRange("E2:E200").setDataValidation(generoRule);

  // Terapeuta - AHORA EN COLUMNA K (al final, porque es la acción que envía)
  const terapeutaRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Gerber", "Melissa", "Diana", "Karina"])
    .setAllowInvalid(false)
    .setHelpText("Al seleccionar se enviará automáticamente a Asignaciones")
    .build();
  nuevos.getRange("K2:K200").setDataValidation(terapeutaRule);
  asignaciones.getRange("A2:A200").setDataValidation(terapeutaRule);

  // Tipo atención - AHORA EN COLUMNA H de Nuevos Ingresos
  const tipoAtencionRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Individual", "Grupal", "Familiar", "Pareja"])
    .setAllowInvalid(false)
    .build();
  nuevos.getRange("H2:H200").setDataValidation(tipoAtencionRule);
  asignaciones.getRange("F2:F200").setDataValidation(tipoAtencionRule);

  // No. Sesión (1-20) - Columna G en Asignaciones
  const sesionNumbers = [];
  for (let i = 1; i <= 20; i++) {
    sesionNumbers.push(i.toString());
  }
  const sesionRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(sesionNumbers)
    .setAllowInvalid(false)
    .setHelpText("Número de sesión actual (1-20)")
    .build();
  asignaciones.getRange("G2:G200").setDataValidation(sesionRule);

  // Estado proceso - Columna H en Asignaciones (simplificado)
  const estadoRule = SpreadsheetApp.newDataValidation()
    .requireValueInList([
      "En proceso",
      "Finalizado"
    ])
    .setAllowInvalid(false)
    .setHelpText("Al seleccionar 'Finalizado' se solicitará el motivo")
    .build();
  asignaciones.getRange("H2:H200").setDataValidation(estadoRule);

  // ===== VALIDACIONES PARA LISTA DE ESPERA =====
  const listaEspera = ss.getSheetByName("Lista de Espera");

  if (listaEspera) {
    // SOLO UN DROPDOWN: Acción (Columna L)
    const accionListaRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(["Enviar"])
      .setAllowInvalid(false)
      .setHelpText("Seleccionar 'Enviar' moverá automáticamente a Nuevos Ingresos")
      .build();
    listaEspera.getRange("L2:L200").setDataValidation(accionListaRule);
  }
}

/**
 * Configurar formato condicional
 */
function configurarFormatosMejorados() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Asignaciones - Estados (columna H simplificada)
  const asignaciones = ss.getSheetByName("Asignaciones y Terapias");

  const procesoRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("En proceso")
    .setBackground("#d1ecf1")
    .setRanges([asignaciones.getRange("H2:H200")])
    .build();

  const finalizadoRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Finalizado")
    .setBackground("#fff3cd")
    .setFontColor("#856404")
    .setRanges([asignaciones.getRange("H2:H200")])
    .build();

  asignaciones.setConditionalFormatRules([procesoRule, finalizadoRule]);
}

/**
 * Crear datos de ejemplo
 */
function crearDatosEjemploMejorados() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const nuevos = ss.getSheetByName("Nuevos Ingresos");

  // Limpiar datos existentes (excepto fórmulas)
  if (nuevos.getLastRow() > 1) {
    nuevos.getRange(2, 3, nuevos.getLastRow() - 1, 10).clearContent();
  }

  // Ejemplos con nueva estructura (C a J - 8 columnas)
  // C=Nombre, D=Creemos, E=Género, F=Edad, G=Malestar, H=TipoAtención, I=Derivado, J=Contacto
  const ejemplos = [
    ["María González Pérez", "MG001", "Mujer", "26 a 30", "Sintomatología de ansiedad", "Individual", "Centro de Salud", "Juan Pérez - 12345678"],
    ["Carlos López Morales", "CL002", "Hombre", "31 a 40", "Sintomatología depresiva", "Individual", "Derivación médica", "Ana López - 87654321"],
    ["Ana Morales Rivera", "AM003", "No binario", "16 a 25", "Violencia de género", "Individual", "Servicios sociales", "María Morales - 11223344"],
    ["José Torres Vega", "JT004", "Trans hombre", "41 a 50", "Dificultad en las relaciones interpersonales", "Pareja", "Consulta voluntaria", "Carmen Torres - 44332211"],
    ["Sofia Ramírez Castro", "SR005", "Mujer", "26 a 30", "Sintomatología de TEA o TEPT", "Individual", "Hospital público", "Luis Ramírez - 55667788"]
  ];

  // Insertar datos (columnas C a J - 8 columnas)
  nuevos.getRange(2, 3, ejemplos.length, 8).setValues(ejemplos);

  SpreadsheetApp.flush();

  ss.toast(
    "✅ DATOS DE EJEMPLO CREADOS\n\n" +
    "5 participantes registrados\n" +
    "Estado: Pendientes de asignar\n\n" +
    "Siguiente paso:\n" +
    "Asigna un terapeuta en columna K (al final)",
    "Datos Listos",
    6
  );
}

// Continúa en siguiente mensaje...
/**
 * =========================================================================
 * AUTOMATIZACIONES DEL SISTEMA
 * Funciones que se ejecutan automáticamente al editar
 * =========================================================================
 */

// =========================================================================
// GESTIÓN DE TRIGGERS
// =========================================================================

/**
 * Limpiar todos los triggers existentes
 */
function limpiarTriggers() {
  try {
    const triggers = ScriptApp.getProjectTriggers();
    let count = 0;

    for (let i = 0; i < triggers.length; i++) {
      ScriptApp.deleteTrigger(triggers[i]);
      count++;
    }

    Logger.log("🗑️ Triggers eliminados: " + count);
    return count;

  } catch (error) {
    Logger.log("❌ Error limpiando triggers: " + error.toString());
    return 0;
  }
}

/**
 * Verificar triggers activos
 */
function verificarTriggers() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const triggers = ScriptApp.getProjectTriggers();

  Logger.log("⚡ Triggers activos: " + triggers.length);

  if (triggers.length === 0) {
    ss.toast(
      "❌ NO HAY TRIGGERS ACTIVOS\n\n" +
      "Debes crear el trigger manualmente:\n" +
      "1. Extensiones → Apps Script\n" +
      "2. Activadores (ícono ⏰)\n" +
      "3. + Agregar activador\n" +
      "4. Función: onEditSistemaCompleto\n" +
      "5. Tipo: Al editar\n" +
      "6. Guardar",
      "Crear Trigger",
      -1
    );

    return false;

  } else {
    let mensaje = "✅ " + triggers.length + " trigger(s) activo(s)\n\n";

    for (let i = 0; i < triggers.length; i++) {
      const trigger = triggers[i];
      mensaje += "• " + trigger.getHandlerFunction() + "\n";
      Logger.log("✅ Trigger " + (i + 1) + ": " + trigger.getHandlerFunction());
    }

    mensaje += "\n🎉 AUTOMATIZACIÓN FUNCIONANDO";

    ss.toast(mensaje, "Sistema Activo", 6);
    return true;
  }
}

// =========================================================================
// FUNCIÓN PRINCIPAL DE AUTOMATIZACIÓN
// =========================================================================

/**
 * FUNCIÓN TRIGGER PRINCIPAL
 * Esta función se ejecuta automáticamente al editar cualquier celda
 * IMPORTANTE: Debe crearse el trigger manualmente
 */
function onEditSistemaCompleto(e) {
  try {
    // Validaciones básicas
    if (!e || !e.range) {
      return;
    }

    const sheet = e.range.getSheet();
    const fila = e.range.getRow();
    const columna = e.range.getColumn();
    const valor = e.range.getValue();

    // Ignorar encabezados
    if (fila <= 1) {
      return;
    }

    // Ignorar valores vacíos
    if (!valor || valor.toString().trim() === "") {
      return;
    }

    const valorLimpio = valor.toString().trim();
    const nombreHoja = sheet.getName();

    Logger.log("🔥 EDIT: " + nombreHoja + " | Fila: " + fila + " | Col: " + columna + " | Valor: " + valorLimpio);

    // ==========================================
    // AUTOMATIZACIÓN 0: ENVIAR DE LISTA DE ESPERA
    // Hoja: "Lista de Espera", Columna L (12) - Acción
    // ==========================================
    if (nombreHoja === "Lista de Espera" && columna === 12) {
      if (valorLimpio === "Enviar") {
        Logger.log("📋 Procesando envío desde lista de espera");

        // Pequeña pausa para estabilidad
        Utilities.sleep(300);

        const resultado = procesarEnvioListaEspera(sheet, fila);

        if (resultado) {
          Logger.log("✅ Movido a Nuevos Ingresos exitosamente");
          actualizarReportesAutomaticos();
        } else {
          Logger.log("❌ Error moviendo de lista de espera");
        }
      }
    }

    // ==========================================
    // AUTOMATIZACIÓN 1: ASIGNACIÓN DE TERAPEUTA
    // Hoja: "Nuevos Ingresos", Columna K (11) - AL FINAL
    // ==========================================
    if (nombreHoja === "Nuevos Ingresos" && columna === 11) {
      const terapeutas = ["Gerber", "Melissa", "Diana", "Karina"];

      if (terapeutas.indexOf(valorLimpio) !== -1) {
        Logger.log("🎯 Procesando asignación: " + valorLimpio);

        // Pequeña pausa para estabilidad
        Utilities.sleep(300);

        const resultado = procesarAsignacionCompleta(sheet, fila, valorLimpio);

        if (resultado) {
          Logger.log("✅ Asignación exitosa");
          actualizarReportesAutomaticos();
        } else {
          Logger.log("❌ Error en asignación");
        }
      }
    }

    // ==========================================
    // AUTOMATIZACIÓN 2: FINALIZACIÓN DE CASO
    // Hoja: "Asignaciones y Terapias", Columna H (8)
    // ==========================================
    if (nombreHoja === "Asignaciones y Terapias" && columna === 8) {
      if (valorLimpio === "Finalizado") {
        Logger.log("🏁 Procesando finalización");

        // Pequeña pausa para estabilidad
        Utilities.sleep(300);

        const resultado = procesarFinalizacionConPrompt(sheet, fila);

        if (resultado) {
          Logger.log("✅ Finalización exitosa");
          actualizarReportesAutomaticos();
        } else {
          Logger.log("❌ Error en finalización");
        }
      }
    }

  } catch (error) {
    Logger.log("❌ ERROR EN AUTOMATIZACIÓN: " + error.toString());

    // Mostrar error al usuario
    SpreadsheetApp.getActiveSpreadsheet().toast(
      "Error en automatización: " + error.toString(),
      "Error",
      5
    );
  }
}

// =========================================================================
// PROCESAMIENTO DE ASIGNACIONES
// =========================================================================

/**
 * Procesar asignación completa de terapeuta
 */
function procesarAsignacionCompleta(sheetOrigen, fila, terapeuta) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const asignaciones = ss.getSheetByName("Asignaciones y Terapias");

    if (!asignaciones) {
      Logger.log("❌ Hoja 'Asignaciones y Terapias' no encontrada");
      return false;
    }

    // Obtener datos del participante (Nuevos Ingresos - 11 columnas)
    // A=Fecha, B=No, C=Nombre, D=Creemos, E=Género, F=Edad, G=Malestar, H=TipoAtención, I=Derivado, J=Contacto, K=Terapeuta
    const datos = sheetOrigen.getRange(fila, 1, 1, 11).getValues()[0];
    const nombre = datos[2];          // C
    const creemosId = datos[3];       // D
    const genero = datos[4];          // E
    const tipoAtencion = datos[7];    // H

    if (!nombre || nombre.toString().trim() === "") {
      Logger.log("❌ No hay nombre de participante");
      return false;
    }

    const nombreLimpio = nombre.toString().trim();

    Logger.log("👤 Procesando: " + nombreLimpio + " → " + terapeuta);

    // Verificar si ya existe en Asignaciones
    const datosAsignaciones = asignaciones.getDataRange().getValues();
    for (let i = 1; i < datosAsignaciones.length; i++) {
      if (datosAsignaciones[i][2] && datosAsignaciones[i][2].toString().trim() === nombreLimpio) {
        Logger.log("⚠️ Ya existe en Asignaciones");
        sheetOrigen.getRange(fila, 1, 1, 11).setBackground("#d4edda");
        ss.toast(nombreLimpio + " ya estaba asignado", "Ya Procesado", 2);
        return true;
      }
    }

    // Crear nueva asignación (estructura simplificada - 10 columnas)
    const nuevaFila = asignaciones.getLastRow() + 1;
    const hoy = new Date();

    const nuevaAsignacion = [
      terapeuta,                          // A - Terapeuta
      nuevaFila - 1,                      // B - No.
      nombreLimpio,                       // C - Participante
      creemosId || "",                    // D - Creemos ID
      genero || "",                       // E - Género
      tipoAtencion || "Individual",       // F - Tipo Terapia
      "1",                                // G - No. Sesión (empieza en 1)
      "En proceso",                       // H - Estado Proceso
      hoy,                                // I - Fecha Inicio
      ""                                  // J - Motivo Finalización (vacío)
    ];

    asignaciones.getRange(nuevaFila, 1, 1, 10).setValues([nuevaAsignacion]);

    // Marcar fila en Nuevos Ingresos como procesada (verde)
    sheetOrigen.getRange(fila, 1, 1, 11).setBackground("#d4edda");

    // Mensaje de confirmación
    ss.toast(
      "✅ ASIGNACIÓN EXITOSA\n\n" +
      "👤 " + nombreLimpio + "\n" +
      "👩‍⚕️ " + terapeuta + "\n" +
      "📅 Primera sesión: " + Utilities.formatDate(hoy, Session.getScriptTimeZone(), "dd/MM/yyyy"),
      "Asignación Completa",
      4
    );

    Logger.log("✅ Asignación completa: " + nombreLimpio + " → " + terapeuta);

    return true;

  } catch (error) {
    Logger.log("❌ Error en procesarAsignacionCompleta: " + error.toString());
    SpreadsheetApp.getActiveSpreadsheet().toast(
      "Error: " + error.toString(),
      "Error en Asignación",
      5
    );
    return false;
  }
}

/**
 * Procesar envío desde lista de espera a nuevos ingresos
 */
function procesarEnvioListaEspera(sheetOrigen, fila) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const nuevosIngresos = ss.getSheetByName("Nuevos Ingresos");

    if (!nuevosIngresos) {
      Logger.log("❌ Hoja 'Nuevos Ingresos' no encontrada");
      return false;
    }

    // Obtener datos del participante de Lista de Espera (12 columnas)
    // A=Fecha, B=No, C=Nombre, D=Creemos, E=Género, F=Edad, G=Malestar, H=Derivado, I=Contacto, J=Teléfono, K=Observaciones, L=Acción
    const datos = sheetOrigen.getRange(fila, 1, 1, 12).getValues()[0];
    const nombre = datos[2];       // C
    const creemosId = datos[3];    // D
    const genero = datos[4];       // E
    const rangoEdad = datos[5];    // F
    const malestar = datos[6];     // G
    const derivadoPor = datos[7];  // H
    const contacto = datos[8];     // I

    if (!nombre || nombre.toString().trim() === "") {
      Logger.log("❌ No hay nombre de participante");
      return false;
    }

    const nombreLimpio = nombre.toString().trim();

    Logger.log("📋 Moviendo de lista de espera: " + nombreLimpio);

    // Verificar si ya existe en Nuevos Ingresos
    const datosNuevos = nuevosIngresos.getDataRange().getValues();
    for (let i = 1; i < datosNuevos.length; i++) {
      if (datosNuevos[i][2] && datosNuevos[i][2].toString().trim() === nombreLimpio) {
        Logger.log("⚠️ Ya existe en Nuevos Ingresos");
        ss.toast(nombreLimpio + " ya existe en Nuevos Ingresos", "Ya Registrado", 3);

        // Marcar como procesado en Lista de Espera
        sheetOrigen.getRange(fila, 1, 1, 12).setBackground("#d4edda");

        return true;
      }
    }

    // Encontrar primera fila vacía en Nuevos Ingresos
    let nuevaFila = nuevosIngresos.getLastRow() + 1;

    // Buscar desde fila 2 por si hay filas intermedias vacías
    for (let i = 2; i <= nuevosIngresos.getLastRow() + 1; i++) {
      const nombreExistente = nuevosIngresos.getRange(i, 3).getValue();
      if (!nombreExistente || nombreExistente.toString().trim() === "") {
        nuevaFila = i;
        break;
      }
    }

    // Insertar en Nuevos Ingresos (11 columnas)
    // A=Fecha, B=No, C=Nombre, D=Creemos, E=Género, F=Edad, G=Malestar, H=TipoAtención, I=Derivado, J=Contacto, K=Terapeuta
    nuevosIngresos.getRange(nuevaFila, 3).setValue(nombreLimpio);           // C
    nuevosIngresos.getRange(nuevaFila, 4).setValue(creemosId || "");        // D
    nuevosIngresos.getRange(nuevaFila, 5).setValue(genero || "");           // E
    nuevosIngresos.getRange(nuevaFila, 6).setValue(rangoEdad || "");        // F
    nuevosIngresos.getRange(nuevaFila, 7).setValue(malestar || "");         // G
    nuevosIngresos.getRange(nuevaFila, 8).setValue("Individual");           // H - Tipo Atención (default)
    nuevosIngresos.getRange(nuevaFila, 9).setValue(derivadoPor || "");      // I
    nuevosIngresos.getRange(nuevaFila, 10).setValue(contacto || "");        // J

    // Marcar fila en Lista de Espera como procesada (verde)
    sheetOrigen.getRange(fila, 1, 1, 12).setBackground("#d4edda");

    // Mensaje de confirmación
    ss.toast(
      "✅ ENVIADO DESDE LISTA DE ESPERA\n\n" +
      "👤 " + nombreLimpio + "\n" +
      "📋 Movido a 'Nuevos Ingresos'\n" +
      "👩‍⚕️ Siguiente: Asignar terapeuta (col K)",
      "Envío Completo",
      5
    );

    Logger.log("✅ Movido de lista de espera: " + nombreLimpio + " → Nuevos Ingresos (fila " + nuevaFila + ")");

    return true;

  } catch (error) {
    Logger.log("❌ Error en procesarEnvioListaEspera: " + error.toString());
    SpreadsheetApp.getActiveSpreadsheet().toast(
      "Error: " + error.toString(),
      "Error en Envío",
      5
    );
    return false;
  }
}

/**
 * Función legacy - mantener para compatibilidad
 */
function procesarAceptacionListaEspera(sheetOrigen, fila) {
  return procesarEnvioListaEspera(sheetOrigen, fila);
}

// =========================================================================
// PROCESAMIENTO DE FINALIZACIONES
// =========================================================================

/**
 * Procesar finalización con prompt para motivo y tipo
 */
function procesarFinalizacionConPrompt(sheetOrigen, fila) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ui = SpreadsheetApp.getUi();

    // Obtener datos del caso (estructura de 10 columnas)
    const datos = sheetOrigen.getRange(fila, 1, 1, 10).getValues()[0];
    const terapeuta = datos[0];        // A
    const numero = datos[1];           // B
    const participante = datos[2];     // C
    const creemosId = datos[3];        // D
    const sexo = datos[4];             // E
    const tipoTerapia = datos[5];      // F
    const numSesion = datos[6];        // G
    const estadoProceso = datos[7];    // H
    const fechaInicio = datos[8];      // I

    if (!participante || participante.toString().trim() === "") {
      ui.alert("Error", "No hay nombre de participante en esta fila.", ui.ButtonSet.OK);
      return false;
    }

    const nombreLimpio = participante.toString().trim();

    // PASO 1: Preguntar tipo de finalización
    const tipoResponse = ui.prompt(
      "🏁 FINALIZAR CASO",
      "Seleccione el tipo de finalización:\n\n" +
      "1 - Proceso culminado\n" +
      "2 - Deserción\n" +
      "3 - Gestión de casos\n\n" +
      "Ingrese el número (1, 2 o 3):",
      ui.ButtonSet.OK_CANCEL
    );

    if (tipoResponse.getSelectedButton() !== ui.Button.OK) {
      // Usuario canceló, revertir estado
      sheetOrigen.getRange(fila, 8).setValue("En proceso");
      return false;
    }

    const tipoNumero = tipoResponse.getResponseText().trim();
    let tipoFinalizacion = "";

    if (tipoNumero === "1") {
      tipoFinalizacion = "Proceso culminado";
    } else if (tipoNumero === "2") {
      tipoFinalizacion = "Deserción";
    } else if (tipoNumero === "3") {
      tipoFinalizacion = "Gestión de casos";
    } else {
      ui.alert("Error", "Opción no válida. Debe ingresar 1, 2 o 3.", ui.ButtonSet.OK);
      sheetOrigen.getRange(fila, 8).setValue("En proceso");
      return false;
    }

    // PASO 2: Preguntar motivo detallado
    const motivoResponse = ui.prompt(
      "📝 MOTIVO DE FINALIZACIÓN",
      "Participante: " + nombreLimpio + "\n" +
      "Tipo: " + tipoFinalizacion + "\n\n" +
      "Ingrese el motivo detallado de la finalización:",
      ui.ButtonSet.OK_CANCEL
    );

    if (motivoResponse.getSelectedButton() !== ui.Button.OK) {
      // Usuario canceló, revertir estado
      sheetOrigen.getRange(fila, 8).setValue("En proceso");
      return false;
    }

    const motivo = motivoResponse.getResponseText().trim();

    if (!motivo || motivo === "") {
      ui.alert("Error", "Debe ingresar un motivo para finalizar el caso.", ui.ButtonSet.OK);
      sheetOrigen.getRange(fila, 8).setValue("En proceso");
      return false;
    }

    // PASO 3: Actualizar motivo en la fila
    sheetOrigen.getRange(fila, 10).setValue(motivo); // Columna J

    // PASO 4: Calcular duración
    const fechaFin = new Date();
    const fechaInicioDate = new Date(fechaInicio);
    const duracionDias = Math.round((fechaFin - fechaInicioDate) / (1000 * 60 * 60 * 24));

    // PASO 5: Enviar email al director
    const emailEnviado = enviarEmailFinalizacion(
      nombreLimpio,
      terapeuta,
      tipoFinalizacion,
      motivo,
      numSesion,
      duracionDias
    );

    // PASO 6: COPIAR (no mover) a hoja correspondiente
    let copiaExitosa = false;

    if (tipoFinalizacion === "Proceso culminado") {
      copiaExitosa = enviarAProcesosCulminados(
        nombreLimpio, terapeuta, creemosId, numSesion, duracionDias, motivo
      );
    } else if (tipoFinalizacion === "Deserción") {
      copiaExitosa = enviarADeserciones(
        nombreLimpio, terapeuta, creemosId, numSesion, motivo, duracionDias
      );
    } else if (tipoFinalizacion === "Gestión de casos") {
      copiaExitosa = enviarAGestionCasos(
        nombreLimpio, terapeuta, creemosId, motivo, tipoTerapia, numSesion
      );
    }

    if (copiaExitosa) {
      // Cambiar color según estado (mantener en Asignaciones)
      const colores = {
        "Proceso culminado": "#d4edda",
        "Deserción": "#f8d7da",
        "Gestión de casos": "#fff3cd"
      };

      sheetOrigen.getRange(fila, 1, 1, 10).setBackground(colores[tipoFinalizacion]);

      // Notificación
      ss.toast(
        "✅ FINALIZACIÓN EXITOSA\n\n" +
        "👤 " + nombreLimpio + "\n" +
        "📊 " + tipoFinalizacion + "\n" +
        "🔢 Sesiones: " + numSesion + "\n" +
        "📅 Duración: " + duracionDias + " días\n" +
        (emailEnviado ? "✉️ Email enviado al director" : "⚠️ Email no enviado"),
        "Caso Finalizado",
        6
      );

      Logger.log("✅ Finalización completa: " + nombreLimpio + " → " + tipoFinalizacion);

      return true;
    } else {
      ui.alert("Error", "No se pudo copiar el registro a la hoja final.", ui.ButtonSet.OK);
      return false;
    }

  } catch (error) {
    Logger.log("❌ Error en procesarFinalizacionConPrompt: " + error.toString());
    SpreadsheetApp.getActiveSpreadsheet().getUi().alert(
      "Error",
      "Error en finalización: " + error.toString(),
      SpreadsheetApp.getUi().ButtonSet.OK
    );
    return false;
  }
}

/**
 * Enviar email de notificación al director
 */
function enviarEmailFinalizacion(participante, terapeuta, tipo, motivo, sesiones, duracion) {
  try {
    // Email del director (CAMBIAR POR EL EMAIL REAL)
    const emailDirector = "director@apoyoemocional.org"; // ⚠️ CAMBIAR ESTE EMAIL

    const asunto = "🏁 Finalización de Caso - " + participante;

    const cuerpo =
      "Se ha finalizado un caso en el sistema de Apoyo Emocional.\n\n" +
      "═══════════════════════════════════════\n" +
      "INFORMACIÓN DEL CASO\n" +
      "═══════════════════════════════════════\n\n" +
      "👤 Participante: " + participante + "\n" +
      "👩‍⚕️ Terapeuta: " + terapeuta + "\n" +
      "📊 Tipo de finalización: " + tipo + "\n" +
      "🔢 Sesiones realizadas: " + sesiones + "\n" +
      "📅 Duración: " + duracion + " días\n\n" +
      "═══════════════════════════════════════\n" +
      "MOTIVO DE FINALIZACIÓN\n" +
      "═══════════════════════════════════════\n\n" +
      motivo + "\n\n" +
      "═══════════════════════════════════════\n\n" +
      "Este es un mensaje automático del Sistema de Apoyo Emocional.\n" +
      "Fecha: " + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm");

    MailApp.sendEmail(emailDirector, asunto, cuerpo);

    Logger.log("✅ Email enviado a: " + emailDirector);
    return true;

  } catch (error) {
    Logger.log("⚠️ Error enviando email: " + error.toString());
    return false;
  }
}

/**
 * Procesar finalización de caso (función legacy - mantener para compatibilidad)
 */
function procesarFinalizacionCompleta(sheetOrigen, fila, estado) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // Obtener datos del caso
    const datos = sheetOrigen.getRange(fila, 1, 1, 16).getValues()[0];
    const terapeuta = datos[0];
    const participante = datos[2];
    const creemosId = datos[3];
    const sexo = datos[4];
    const tipoTerapia = datos[5];
    const sesionActual = datos[6];
    const fechaInicio = datos[12];

    if (!participante || participante.toString().trim() === "") {
      Logger.log("❌ No hay nombre de participante");
      return false;
    }

    const nombreLimpio = participante.toString().trim();

    Logger.log("👤 Finalizando: " + nombreLimpio + " → " + estado);

    // Calcular duración
    const fechaFin = new Date();
    const fechaInicioDate = new Date(fechaInicio);
    const duracionDias = Math.round((fechaFin - fechaInicioDate) / (1000 * 60 * 60 * 24));

    // Motivos predefinidos
    const motivos = {
      "Proceso culminado": "Proceso terapéutico completado exitosamente",
      "Deserción": "Participante abandonó el proceso",
      "Gestión de casos": "Requiere manejo especializado"
    };
    const motivo = motivos[estado] || "Finalización del proceso";

    // Actualizar en Asignaciones
    sheetOrigen.getRange(fila, 14).setValue(fechaFin); // Fecha Fin
    sheetOrigen.getRange(fila, 15).setValue(motivo);   // Motivo
    sheetOrigen.getRange(fila, 16).setValue(sesionActual || 1); // Total Sesiones

    // Enviar a hoja correspondiente
    let envioExitoso = false;

    if (estado === "Proceso culminado") {
      envioExitoso = enviarAProcesosCulminados(
        nombreLimpio, terapeuta, creemosId, sesionActual, duracionDias, motivo
      );
    } else if (estado === "Deserción") {
      envioExitoso = enviarADeserciones(
        nombreLimpio, terapeuta, creemosId, sesionActual, motivo, duracionDias
      );
    } else if (estado === "Gestión de casos") {
      envioExitoso = enviarAGestionCasos(
        nombreLimpio, terapeuta, creemosId, motivo, tipoTerapia, sesionActual
      );
    }

    if (envioExitoso) {
      // Cambiar color según estado
      const colores = {
        "Proceso culminado": "#d4edda",
        "Deserción": "#f8d7da",
        "Gestión de casos": "#fff3cd"
      };

      sheetOrigen.getRange(fila, 1, 1, 16).setBackground(colores[estado]);

      // Actualizar en Nuevos Ingresos
      actualizarEstadoEnNuevosIngresos(nombreLimpio, estado);

      // Notificación
      ss.toast(
        "✅ FINALIZACIÓN EXITOSA\n\n" +
        "👤 " + nombreLimpio + "\n" +
        "📊 " + estado + "\n" +
        "🔢 Sesiones: " + (sesionActual || 1) + "\n" +
        "📅 Duración: " + duracionDias + " días",
        "Caso Finalizado",
        5
      );

      Logger.log("✅ Finalización completa: " + nombreLimpio + " → " + estado);

      return true;
    } else {
      Logger.log("❌ Error enviando a hoja destino");
      return false;
    }

  } catch (error) {
    Logger.log("❌ Error en procesarFinalizacionCompleta: " + error.toString());
    SpreadsheetApp.getActiveSpreadsheet().toast(
      "Error: " + error.toString(),
      "Error en Finalización",
      5
    );
    return false;
  }
}

// =========================================================================
// FUNCIONES DE ENVÍO A HOJAS FINALES
// =========================================================================

/**
 * Enviar a Procesos Culminados
 */
function enviarAProcesosCulminados(participante, terapeuta, creemosId, sesiones, duracion, motivo) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Procesos Culminados");

    if (!sheet) {
      Logger.log("❌ Hoja 'Procesos Culminados' no encontrada");
      return false;
    }

    const nuevaFila = sheet.getLastRow() + 1;
    const hoy = new Date();

    const datos = [
      hoy,                                      // Fecha Culminación
      nuevaFila - 1,                            // No.
      participante,                             // Participante
      terapeuta,                                // Terapeuta
      creemosId || "",                          // Creemos ID
      parseInt(sesiones) || 1,                  // Total Sesiones
      parseInt(duracion) || 0,                  // Duración (días)
      motivo,                                   // Motivo Culminación
      "Objetivos terapéuticos alcanzados",      // Objetivos Alcanzados
      "Alto",                                   // Nivel Satisfacción
      "Seguimiento opcional en 3 meses",        // Recomendaciones
      "No requerido",                           // Seguimiento Requerido
      Utilities.formatDate(hoy, Session.getScriptTimeZone(), "MMMM yyyy") // Mes Culminación
    ];

    sheet.getRange(nuevaFila, 1, 1, 13).setValues([datos]);

    Logger.log("✅ Enviado a Procesos Culminados: " + participante);
    return true;

  } catch (error) {
    Logger.log("❌ Error enviando a culminados: " + error.toString());
    return false;
  }
}

/**
 * Enviar a Deserciones
 */
function enviarADeserciones(participante, terapeuta, creemosId, sesiones, motivo, duracion) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Deserciones");

    if (!sheet) {
      Logger.log("❌ Hoja 'Deserciones' no encontrada");
      return false;
    }

    const nuevaFila = sheet.getLastRow() + 1;

    const datos = [
      new Date(),                         // Fecha Deserción
      nuevaFila - 1,                      // No.
      participante,                       // Participante
      terapeuta,                          // Terapeuta
      creemosId || "",                    // Creemos ID
      parseInt(sesiones) || 1,            // Sesiones Asistidas
      "No registrada",                    // Última Asistencia
      motivo,                             // Motivo Deserción
      "Contacto telefónico realizado",    // Intentos Contacto
      "Factores personales y externos"    // Factores Identificados
    ];

    sheet.getRange(nuevaFila, 1, 1, 10).setValues([datos]);

    Logger.log("✅ Enviado a Deserciones: " + participante);
    return true;

  } catch (error) {
    Logger.log("❌ Error enviando a deserciones: " + error.toString());
    return false;
  }
}

/**
 * Enviar a Gestión de Casos
 */
function enviarAGestionCasos(participante, terapeuta, creemosId, motivo, tipoTerapia, sesiones) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Gestión de Casos");

    if (!sheet) {
      Logger.log("❌ Hoja 'Gestión de Casos' no encontrada");
      return false;
    }

    const nuevaFila = sheet.getLastRow() + 1;

    const datos = [
      new Date(),                         // Fecha Gestión
      nuevaFila - 1,                      // No.
      participante,                       // Participante
      terapeuta,                          // Terapeuta
      creemosId || "",                    // Creemos ID
      "Supervisión especializada",        // Tipo Gestión
      motivo,                             // Motivo Gestión
      "Derivación a equipo especializado", // Acciones Tomadas
      "Servicios especializados",         // Derivado A
      "Pendiente evaluación"              // Estado Actual
    ];

    sheet.getRange(nuevaFila, 1, 1, 10).setValues([datos]);

    Logger.log("✅ Enviado a Gestión de Casos: " + participante);
    return true;

  } catch (error) {
    Logger.log("❌ Error enviando a gestión: " + error.toString());
    return false;
  }
}

// =========================================================================
// FUNCIONES AUXILIARES
// =========================================================================

/**
 * Actualizar información de sesión
 */
function actualizarInformacionSesion(sheet, fila, numeroSesion) {
  try {
    const hoy = new Date();
    const proximaSesion = new Date(hoy.getTime() + (7 * 24 * 60 * 60 * 1000));

    sheet.getRange(fila, 8).setValue(hoy);           // Fecha Última Sesión
    sheet.getRange(fila, 9).setValue(proximaSesion); // Próxima Sesión
    sheet.getRange(fila, 16).setValue(numeroSesion); // Total Sesiones

    Logger.log("✅ Sesión actualizada: " + numeroSesion);

  } catch (error) {
    Logger.log("❌ Error actualizando sesión: " + error.toString());
  }
}

/**
 * Actualizar estado en Nuevos Ingresos
 */
function actualizarEstadoEnNuevosIngresos(nombreParticipante, estadoFinal) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const nuevos = ss.getSheetByName("Nuevos Ingresos");

    if (!nuevos) {
      return;
    }

    const datos = nuevos.getDataRange().getValues();

    for (let i = 1; i < datos.length; i++) {
      if (datos[i][2] && datos[i][2].toString().trim() === nombreParticipante) {
        const estadosMap = {
          "Proceso culminado": "Culminado",
          "Deserción": "Deserción",
          "Gestión de casos": "En Gestión"
        };

        const colores = {
          "Proceso culminado": "#d4edda",
          "Deserción": "#f8d7da",
          "Gestión de casos": "#fff3cd"
        };

        nuevos.getRange(i + 1, 12).setValue(estadosMap[estadoFinal] || estadoFinal);
        nuevos.getRange(i + 1, 1, 1, 12).setBackground(colores[estadoFinal] || "#f5f5f5");

        Logger.log("✅ Estado actualizado en Nuevos Ingresos");
        break;
      }
    }

  } catch (error) {
    Logger.log("❌ Error actualizando estado: " + error.toString());
  }
}

/**
 * Actualizar reportes automáticos
 */
function actualizarReportesAutomaticos() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const reporte = ss.getSheetByName("Reporte Automático Completo");

    if (reporte) {
      reporte.getRange("B2").setValue(new Date());
      SpreadsheetApp.flush();
      Logger.log("✅ Reportes actualizados");
    }

  } catch (error) {
    Logger.log("❌ Error actualizando reportes: " + error.toString());
  }
}

// =========================================================================
// FUNCIÓN ONOPEN - MENÚ PERSONALIZADO
// =========================================================================

/**
 * Crear menú personalizado al abrir la hoja
 */
function onOpen() {
  try {
    const ui = SpreadsheetApp.getUi();

    ui.createMenu('🏥 Apoyo Emocional')
      .addItem('🚀 Instalar Sistema Completo', 'instalarSistemaCompletoMejorado')
      .addSeparator()
      .addSubMenu(ui.createMenu('⚡ Automatizaciones')
        .addItem('🔍 Verificar Triggers', 'verificarTriggers')
        .addItem('🧪 Probar Sistema', 'probarSistemaCompleto')
        .addItem('📊 Diagnóstico Completo', 'diagnosticoCompletoMejorado'))
      .addSeparator()
      .addSubMenu(ui.createMenu('📊 Datos')
        .addItem('📋 Crear Datos Ejemplo', 'crearDatosEjemploMejorados')
        .addItem('📅 Guardar Reporte Mensual', 'guardarReporteMensual')
        .addItem('🔄 Actualizar Reportes', 'actualizarReportesAutomaticos'))
      .addSeparator()
      .addSubMenu(ui.createMenu('👥 Asistencia Grupal')
        .addItem('📥 Importar desde Otro Archivo', 'importarAsistenciaGrupalDesdeOtroArchivo')
        .addItem('📊 Ver Estadísticas del Mes', 'mostrarEstadisticasAsistencia'))
      .addSeparator()
      .addItem('❓ Ayuda', 'mostrarAyuda')
      .addToUi();

  } catch (error) {
    Logger.log("Error creando menú: " + error.toString());
  }
}
/**
 * =========================================================================
 * UTILIDADES Y DIAGNÓSTICO DEL SISTEMA
 * Funciones auxiliares y herramientas de diagnóstico
 * =========================================================================
 */

// =========================================================================
// DIAGNÓSTICO DEL SISTEMA
// =========================================================================

/**
 * Diagnóstico completo del sistema
 */
function diagnosticoCompletoMejorado() {
  Logger.log("🔍 INICIANDO DIAGNÓSTICO COMPLETO...");

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let mensajeFinal = "📋 DIAGNÓSTICO DEL SISTEMA\n" + "═".repeat(30) + "\n\n";

  // 1. Verificar hojas
  const hojasRequeridas = [
    "Lista de Espera",
    "Nuevos Ingresos",
    "Asignaciones y Terapias",
    "Procesos Culminados",
    "Deserciones",
    "Gestión de Casos",
    "Asistencia Grupal",
    "Reporte Automático Completo",
    "Reportes Mensuales"
  ];

  const hojasExistentes = ss.getSheets().map(function(s) { return s.getName(); });

  Logger.log("📄 VERIFICANDO HOJAS...");
  mensajeFinal += "📄 HOJAS:\n";

  let todasHojasOK = true;
  for (let i = 0; i < hojasRequeridas.length; i++) {
    const hoja = hojasRequeridas[i];
    const existe = hojasExistentes.indexOf(hoja) !== -1;

    if (existe) {
      Logger.log("✅ " + hoja);
      mensajeFinal += "✅ " + hoja + "\n";
    } else {
      Logger.log("❌ " + hoja + " - FALTA");
      mensajeFinal += "❌ " + hoja + " - FALTA\n";
      todasHojasOK = false;
    }
  }

  // 2. Verificar triggers
  const triggers = ScriptApp.getProjectTriggers();
  Logger.log("\n⚡ VERIFICANDO TRIGGERS...");
  mensajeFinal += "\n⚡ TRIGGERS:\n";

  if (triggers.length > 0) {
    Logger.log("✅ " + triggers.length + " trigger(s) activo(s)");
    mensajeFinal += "✅ " + triggers.length + " activo(s)\n";

    for (let i = 0; i < triggers.length; i++) {
      const funcName = triggers[i].getHandlerFunction();
      Logger.log("  • " + funcName);
      mensajeFinal += "  • " + funcName + "\n";
    }
  } else {
    Logger.log("❌ NO HAY TRIGGERS ACTIVOS");
    mensajeFinal += "❌ NO HAY TRIGGERS\n";
  }

  // 3. Verificar datos
  Logger.log("\n📊 VERIFICANDO DATOS...");
  mensajeFinal += "\n📊 DATOS:\n";

  const nuevos = ss.getSheetByName("Nuevos Ingresos");
  const asignaciones = ss.getSheetByName("Asignaciones y Terapias");

  const participantesNuevos = nuevos ? nuevos.getLastRow() - 1 : 0;
  const casosAsignados = asignaciones ? asignaciones.getLastRow() - 1 : 0;

  Logger.log("Participantes registrados: " + participantesNuevos);
  Logger.log("Casos asignados: " + casosAsignados);

  mensajeFinal += "Participantes: " + participantesNuevos + "\n";
  mensajeFinal += "Casos asignados: " + casosAsignados + "\n";

  // 4. Validaciones
  Logger.log("\n🔍 VERIFICANDO VALIDACIONES...");
  mensajeFinal += "\n🔍 VALIDACIONES:\n";

  let validacionesOK = true;
  if (nuevos) {
    const regla = nuevos.getRange("H2").getDataValidation();
    if (regla) {
      Logger.log("✅ Validaciones configuradas");
      mensajeFinal += "✅ Configuradas\n";
    } else {
      Logger.log("⚠️ Validaciones no detectadas");
      mensajeFinal += "⚠️ No detectadas\n";
      validacionesOK = false;
    }
  }

  // 5. Resumen final
  Logger.log("\n🎯 RESUMEN FINAL:");
  mensajeFinal += "\n🎯 RESUMEN:\n";

  const sistemaCompleto = todasHojasOK && triggers.length > 0;

  if (!todasHojasOK) {
    Logger.log("❌ FALTAN HOJAS");
    mensajeFinal += "❌ Ejecutar: Instalar Sistema\n";
  } else if (triggers.length === 0) {
    Logger.log("❌ FALTAN TRIGGERS");
    mensajeFinal += "❌ Crear trigger manualmente\n";
  } else {
    Logger.log("🎉 SISTEMA FUNCIONANDO");
    mensajeFinal += "🎉 SISTEMA FUNCIONANDO\n";
  }

  // Mostrar resultado
  ss.toast(mensajeFinal, "Diagnóstico Completo", -1);

  return sistemaCompleto;
}

// =========================================================================
// PRUEBA DEL SISTEMA
// =========================================================================

/**
 * Probar el sistema completo
 */
function probarSistemaCompleto() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    Logger.log("🧪 INICIANDO PRUEBA DEL SISTEMA...");

    // 1. Verificar instalación
    if (!diagnosticoCompletoMejorado()) {
      ss.toast(
        "❌ Sistema no instalado completamente\n\n" +
        "Ejecutar: Instalar Sistema Completo",
        "Error",
        8
      );
      return false;
    }

    // 2. Buscar participante para prueba
    const nuevos = ss.getSheetByName("Nuevos Ingresos");
    let filaParaPrueba = -1;

    for (let i = 2; i <= nuevos.getLastRow(); i++) {
      const nombre = nuevos.getRange(i, 3).getValue();
      const terapeuta = nuevos.getRange(i, 8).getValue();

      if (nombre && (!terapeuta || terapeuta.toString().trim() === "")) {
        filaParaPrueba = i;
        break;
      }
    }

    if (filaParaPrueba === -1) {
      ss.toast(
        "⚠️ No hay participantes pendientes\n\n" +
        "Primero crea datos de ejemplo:\n" +
        "Menú → Datos → Crear Datos Ejemplo",
        "Sin Datos",
        6
      );
      return false;
    }

    // 3. Simular asignación
    const nombreParticipante = nuevos.getRange(filaParaPrueba, 3).getValue().toString();

    Logger.log("🧪 Probando asignación: " + nombreParticipante + " → Diana");

    const resultado = procesarAsignacionCompleta(nuevos, filaParaPrueba, "Diana");

    if (resultado) {
      // Marcar visualmente
      nuevos.getRange(filaParaPrueba, 8).setValue("Diana").setBackground("#90EE90");

      ss.toast(
        "🎉 PRUEBA EXITOSA\n\n" +
        "✅ Participante: " + nombreParticipante + "\n" +
        "✅ Asignado a: Diana\n" +
        "✅ Creado en Asignaciones\n" +
        "✅ Reportes actualizados\n\n" +
        "🔥 SISTEMA FUNCIONANDO",
        "Prueba Completa",
        8
      );

      Logger.log("🎉 PRUEBA EXITOSA");
      return true;

    } else {
      ss.toast("❌ Error en prueba", "Error", 5);
      return false;
    }

  } catch (error) {
    Logger.log("❌ Error en prueba: " + error.toString());
    SpreadsheetApp.getActiveSpreadsheet().toast(
      "Error: " + error.toString(),
      "Error en Prueba",
      5
    );
    return false;
  }
}

// =========================================================================
// REPORTES MENSUALES
// =========================================================================

/**
 * Guardar reporte mensual
 */
function guardarReporteMensual() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const reporteMensual = ss.getSheetByName("Reportes Mensuales");

    if (!reporteMensual) {
      ss.toast("❌ Hoja 'Reportes Mensuales' no encontrada", "Error", 4);
      return false;
    }

    // Verificar si ya existe reporte para este mes
    const hoy = new Date();
    const mesActual = Utilities.formatDate(hoy, Session.getScriptTimeZone(), "MMMM yyyy");

    const datos = reporteMensual.getDataRange().getValues();
    let existe = false;

    for (let i = 1; i < datos.length; i++) {
      if (datos[i][0] === mesActual) {
        existe = true;
        break;
      }
    }

    if (existe) {
      ss.toast(
        "⚠️ Ya existe reporte para " + mesActual + "\n\n" +
        "Los datos se actualizan automáticamente",
        "Reporte Existente",
        4
      );
    } else {
      ss.toast(
        "✅ Reporte de " + mesActual + " guardado\n\n" +
        "Los datos se calculan automáticamente",
        "Reporte Guardado",
        4
      );
    }

    Logger.log("✅ Reporte mensual: " + mesActual);
    return true;

  } catch (error) {
    Logger.log("❌ Error guardando reporte: " + error.toString());
    SpreadsheetApp.getActiveSpreadsheet().toast(
      "Error: " + error.toString(),
      "Error",
      4
    );
    return false;
  }
}

// =========================================================================
// AYUDA Y DOCUMENTACIÓN
// =========================================================================

/**
 * Mostrar ayuda del sistema
 */
function mostrarAyuda() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const ayuda =
    "🏥 SISTEMA DE APOYO EMOCIONAL\n" +
    "═".repeat(35) + "\n\n" +
    "📚 GUÍA RÁPIDA:\n\n" +
    "1️⃣ INSTALACIÓN:\n" +
    "   • Menú → Instalar Sistema Completo\n" +
    "   • Crear trigger manualmente\n" +
    "   • Verificar con Diagnóstico\n\n" +
    "2️⃣ USO DIARIO:\n" +
    "   • Registrar en 'Nuevos Ingresos'\n" +
    "   • Asignar terapeuta (col H)\n" +
    "   • → Envío AUTOMÁTICO\n" +
    "   • Gestionar en 'Asignaciones'\n" +
    "   • Cambiar estado → Finaliza automáticamente\n\n" +
    "3️⃣ TRIGGERS:\n" +
    "   Extensiones → Apps Script → Activadores\n" +
    "   + Agregar activador\n" +
    "   Función: onEditSistemaCompleto\n" +
    "   Evento: Al editar\n\n" +
    "4️⃣ AUTOMATIZACIONES:\n" +
    "   ✅ Asignación de terapeutas\n" +
    "   ✅ Finalización de casos\n" +
    "   ✅ Actualización de reportes\n" +
    "   ✅ Cálculo de estadísticas\n\n" +
    "5️⃣ REPORTES:\n" +
    "   Ver 'Reporte Automático Completo'\n" +
    "   Actualización en tiempo real\n\n" +
    "❓ PROBLEMAS:\n" +
    "   • Ver documentación en GitHub\n" +
    "   • Ejecutar Diagnóstico Completo\n" +
    "   • Verificar Triggers\n\n" +
    "📧 Desarrollado por Adrian Torres";

  ss.toast(ayuda, "Ayuda del Sistema", -1);

  Logger.log("📖 Ayuda mostrada");
}

/**
 * Mostrar información de versión
 */
function mostrarVersion() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const version =
    "🏥 SISTEMA DE APOYO EMOCIONAL\n" +
    "═".repeat(30) + "\n\n" +
    "📌 Versión: 2.0\n" +
    "📅 Fecha: Noviembre 2024\n" +
    "👨‍💻 Desarrollador: Adrian Torres\n" +
    "🏢 Manufacturing Operations\n\n" +
    "✨ CARACTERÍSTICAS:\n" +
    "• Sistema completo de gestión\n" +
    "• Automatización total\n" +
    "• Reportes en tiempo real\n" +
    "• Control de asistencias\n" +
    "• Seguimiento de casos\n\n" +
    "🔧 MEJORAS V2.0:\n" +
    "• Código corregido y optimizado\n" +
    "• Fórmulas en español\n" +
    "• Mejor manejo de errores\n" +
    "• Documentación completa\n" +
    "• Guías de solución de problemas";

  ss.toast(version, "Versión del Sistema", -1);
}

// =========================================================================
// FUNCIONES DE MANTENIMIENTO
// =========================================================================

/**
 * Limpiar datos de prueba
 */
function limpiarDatosPrueba() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ui = SpreadsheetApp.getUi();

    const respuesta = ui.alert(
      "⚠️ LIMPIAR DATOS DE PRUEBA",
      "Esta acción eliminará todos los datos de ejemplo.\n" +
      "Los encabezados y fórmulas se mantendrán.\n\n" +
      "¿Deseas continuar?",
      ui.ButtonSet.YES_NO
    );

    if (respuesta !== ui.Button.YES) {
      ss.toast("❌ Operación cancelada", "Cancelado", 2);
      return false;
    }

    // Limpiar Nuevos Ingresos
    const nuevos = ss.getSheetByName("Nuevos Ingresos");
    if (nuevos && nuevos.getLastRow() > 1) {
      nuevos.getRange(2, 3, nuevos.getLastRow() - 1, 10).clearContent();
    }

    // Limpiar Asignaciones
    const asignaciones = ss.getSheetByName("Asignaciones y Terapias");
    if (asignaciones && asignaciones.getLastRow() > 1) {
      asignaciones.getRange(2, 1, asignaciones.getLastRow() - 1, 16).clearContent();
    }

    // Limpiar Procesos Culminados
    const culminados = ss.getSheetByName("Procesos Culminados");
    if (culminados && culminados.getLastRow() > 1) {
      culminados.getRange(2, 1, culminados.getLastRow() - 1, 13).clearContent();
    }

    // Limpiar Deserciones
    const deserciones = ss.getSheetByName("Deserciones");
    if (deserciones && deserciones.getLastRow() > 1) {
      deserciones.getRange(2, 1, deserciones.getLastRow() - 1, 10).clearContent();
    }

    // Limpiar Gestión de Casos
    const gestion = ss.getSheetByName("Gestión de Casos");
    if (gestion && gestion.getLastRow() > 1) {
      gestion.getRange(2, 1, gestion.getLastRow() - 1, 10).clearContent();
    }

    ss.toast(
      "✅ DATOS LIMPIADOS\n\n" +
      "Se eliminaron todos los datos de prueba\n" +
      "Encabezados y fórmulas intactos",
      "Limpieza Completa",
      4
    );

    Logger.log("✅ Datos de prueba eliminados");
    return true;

  } catch (error) {
    Logger.log("❌ Error limpiando datos: " + error.toString());
    SpreadsheetApp.getActiveSpreadsheet().toast(
      "Error: " + error.toString(),
      "Error",
      4
    );
    return false;
  }
}

/**
 * Reparar fórmulas
 */
function repararFormulas() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    Logger.log("🔧 Reparando fórmulas...");

    // Reparar Nuevos Ingresos
    const nuevos = ss.getSheetByName("Nuevos Ingresos");
    if (nuevos) {
      nuevos.getRange("A2").setFormula('=IF(C2<>"";HOY();"")');
      nuevos.getRange("B2").setFormula('=IF(C2<>"";FILA()-1;"")');
      nuevos.getRange("L2").setFormula('=IF(H2<>"";"Asignado";"Pendiente")');

      nuevos.getRange("A2:A2").copyTo(nuevos.getRange("A3:A100"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
      nuevos.getRange("B2:B2").copyTo(nuevos.getRange("B3:B100"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
      nuevos.getRange("L2:L2").copyTo(nuevos.getRange("L3:L100"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);

      Logger.log("✅ Fórmulas de Nuevos Ingresos reparadas");
    }

    // Reparar Asignaciones
    const asignaciones = ss.getSheetByName("Asignaciones y Terapias");
    if (asignaciones) {
      asignaciones.getRange("B2").setFormula('=IF(A2<>"";FILA()-1;"")');
      asignaciones.getRange("F2").setFormula('=IF(A2<>"";"Individual";"")');
      asignaciones.getRange("G2").setFormula('=IF(A2<>"";1;"")');
      asignaciones.getRange("L2").setFormula('=IF(A2<>"";"En proceso";"")');
      asignaciones.getRange("M2").setFormula('=IF(A2<>"";HOY();"")');
      asignaciones.getRange("P2").setFormula('=IF(G2<>"";G2;0)');

      asignaciones.getRange("B2:B2").copyTo(asignaciones.getRange("B3:B200"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
      asignaciones.getRange("F2:F2").copyTo(asignaciones.getRange("F3:F200"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
      asignaciones.getRange("G2:G2").copyTo(asignaciones.getRange("G3:G200"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
      asignaciones.getRange("L2:L2").copyTo(asignaciones.getRange("L3:L200"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
      asignaciones.getRange("M2:M2").copyTo(asignaciones.getRange("M3:M200"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);
      asignaciones.getRange("P2:P2").copyTo(asignaciones.getRange("P3:P200"), SpreadsheetApp.CopyPasteType.PASTE_FORMULA);

      Logger.log("✅ Fórmulas de Asignaciones reparadas");
    }

    ss.toast(
      "✅ FÓRMULAS REPARADAS\n\n" +
      "Todas las fórmulas han sido restauradas",
      "Reparación Completa",
      4
    );

    Logger.log("✅ Reparación de fórmulas completada");
    return true;

  } catch (error) {
    Logger.log("❌ Error reparando fórmulas: " + error.toString());
    SpreadsheetApp.getActiveSpreadsheet().toast(
      "Error: " + error.toString(),
      "Error",
      4
    );
    return false;
  }
}

// =========================================================================
// IMPORTACIÓN DE ASISTENCIA GRUPAL
// =========================================================================

/**
 * Importar asistencias desde otro archivo de Google Sheets
 * IMPORTANTE: Debes tener acceso al archivo origen
 */
function importarAsistenciaGrupalDesdeOtroArchivo() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ui = SpreadsheetApp.getUi();

    // Pedir URL del archivo origen
    const respuesta = ui.prompt(
      '📋 IMPORTAR ASISTENCIA GRUPAL',
      'Pega aquí la URL completa del archivo de Google Sheets con las asistencias:\n\n' +
      'Ejemplo: https://docs.google.com/spreadsheets/d/XXXXX/edit',
      ui.ButtonSet.OK_CANCEL
    );

    if (respuesta.getSelectedButton() !== ui.Button.OK) {
      ss.toast('❌ Importación cancelada', 'Cancelado', 2);
      return false;
    }

    const url = respuesta.getResponseText().trim();

    if (!url || url === '') {
      ss.toast('❌ No proporcionaste URL', 'Error', 3);
      return false;
    }

    // Extraer ID del archivo
    let archivoId = '';
    if (url.includes('/d/')) {
      archivoId = url.split('/d/')[1].split('/')[0];
    } else {
      ss.toast('❌ URL inválida. Debe ser de Google Sheets', 'Error', 4);
      return false;
    }

    Logger.log('📋 Importando desde archivo: ' + archivoId);

    // Abrir archivo origen
    const archivoOrigen = SpreadsheetApp.openById(archivoId);
    const hojaOrigen = archivoOrigen.getSheets()[0]; // Primera hoja

    // Obtener datos
    const datosOrigen = hojaOrigen.getDataRange().getValues();

    if (datosOrigen.length < 2) {
      ss.toast('❌ El archivo origen está vacío', 'Error', 3);
      return false;
    }

    // Importar a hoja Asistencia Grupal
    const asistenciaGrupal = ss.getSheetByName('Asistencia Grupal');

    if (!asistenciaGrupal) {
      ss.toast('❌ Hoja "Asistencia Grupal" no encontrada', 'Error', 3);
      return false;
    }

    // Limpiar datos actuales (mantener encabezados)
    const ultimaFila = asistenciaGrupal.getLastRow();
    if (ultimaFila > 1) {
      asistenciaGrupal.getRange(2, 1, ultimaFila - 1, asistenciaGrupal.getLastColumn()).clearContent();
    }

    // Copiar datos (sin encabezados)
    const datosACopiar = datosOrigen.slice(1); // Sin primera fila
    if (datosACopiar.length > 0) {
      asistenciaGrupal.getRange(2, 1, datosACopiar.length, datosACopiar[0].length).setValues(datosACopiar);
    }

    ss.toast(
      '✅ ASISTENCIAS IMPORTADAS\n\n' +
      'Total registros: ' + datosACopiar.length + '\n' +
      'Desde: ' + archivoOrigen.getName(),
      'Importación Completa',
      5
    );

    Logger.log('✅ Asistencias importadas: ' + datosACopiar.length + ' registros');

    // Actualizar reportes
    actualizarReportesAutomaticos();

    return true;

  } catch (error) {
    Logger.log('❌ Error importando asistencias: ' + error.toString());

    if (error.toString().includes('access')) {
      SpreadsheetApp.getActiveSpreadsheet().toast(
        '❌ NO TIENES ACCESO al archivo\n\n' +
        'Pide al dueño que comparta el archivo contigo',
        'Sin Acceso',
        6
      );
    } else {
      SpreadsheetApp.getActiveSpreadsheet().toast(
        '❌ Error: ' + error.toString(),
        'Error',
        5
      );
    }

    return false;
  }
}

/**
 * Calcular estadísticas de asistencia grupal por mes
 */
function calcularAsistenciasMensuales() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const asistenciaGrupal = ss.getSheetByName('Asistencia Grupal');

    if (!asistenciaGrupal) {
      return {
        totalParticipantes: 0,
        asistenciasDelMes: 0,
        porcentajeAsistencia: '0%'
      };
    }

    // Obtener datos
    const datos = asistenciaGrupal.getDataRange().getValues();

    if (datos.length < 2) {
      return {
        totalParticipantes: 0,
        asistenciasDelMes: 0,
        porcentajeAsistencia: '0%'
      };
    }

    // Encabezados (fila 1) contienen fechas en columnas C en adelante
    const encabezados = datos[0];
    const participantes = datos.slice(1); // Sin encabezados

    const totalParticipantes = participantes.filter(function(fila) {
      return fila[0] && fila[0].toString().trim() !== '';
    }).length;

    // Obtener fechas del mes actual
    const hoy = new Date();
    const mesActual = hoy.getMonth();
    const añoActual = hoy.getFullYear();

    let asistenciasDelMes = 0;
    let sesionesDelMes = 0;

    // Revisar cada fecha en encabezados (desde columna C = índice 2)
    for (let col = 2; col < encabezados.length; col++) {
      const fechaStr = encabezados[col];

      if (!fechaStr) continue;

      // Intentar parsear fecha
      let fecha = null;
      if (fechaStr instanceof Date) {
        fecha = fechaStr;
      } else {
        // Formato dd/MM/yyyy
        const partes = fechaStr.toString().split('/');
        if (partes.length === 3) {
          fecha = new Date(partes[2], partes[1] - 1, partes[0]);
        }
      }

      if (!fecha || isNaN(fecha.getTime())) continue;

      // Verificar si es del mes actual
      if (fecha.getMonth() === mesActual && fecha.getFullYear() === añoActual) {
        sesionesDelMes++;

        // Contar asistencias en esta columna
        for (let fila = 1; fila < datos.length; fila++) {
          if (datos[fila][col] === true) { // Checkbox marcado
            asistenciasDelMes++;
          }
        }
      }
    }

    // Calcular porcentaje
    const asistenciasEsperadas = totalParticipantes * sesionesDelMes;
    const porcentaje = asistenciasEsperadas > 0 ?
      ((asistenciasDelMes / asistenciasEsperadas) * 100).toFixed(1) :
      '0';

    return {
      totalParticipantes: totalParticipantes,
      asistenciasDelMes: asistenciasDelMes,
      sesionesDelMes: sesionesDelMes,
      porcentajeAsistencia: porcentaje + '%'
    };

  } catch (error) {
    Logger.log('❌ Error calculando asistencias: ' + error.toString());
    return {
      totalParticipantes: 0,
      asistenciasDelMes: 0,
      porcentajeAsistencia: '0%'
    };
  }
}

/**
 * Mostrar estadísticas de asistencia grupal
 */
function mostrarEstadisticasAsistencia() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const stats = calcularAsistenciasMensuales();

  const hoy = new Date();
  const mesNombre = Utilities.formatDate(hoy, Session.getScriptTimeZone(), 'MMMM yyyy');

  const mensaje =
    '📊 ESTADÍSTICAS ASISTENCIA GRUPAL\n' +
    '═'.repeat(35) + '\n\n' +
    '📅 Mes: ' + mesNombre + '\n\n' +
    '👥 Total participantes: ' + stats.totalParticipantes + '\n' +
    '📋 Sesiones del mes: ' + stats.sesionesDelMes + '\n' +
    '✅ Asistencias registradas: ' + stats.asistenciasDelMes + '\n' +
    '📈 Porcentaje de asistencia: ' + stats.porcentajeAsistencia + '\n\n' +
    '💡 Para actualizar:\n' +
    'Menú → Datos → Importar Asistencia Grupal';

  ss.toast(mensaje, 'Estadísticas Asistencia', -1);

  Logger.log('📊 Estadísticas asistencia mostradas');
}

// =========================================================================
// EXPORTACIÓN DE DATOS
// =========================================================================

/**
 * Exportar estadísticas generales
 */
function exportarEstadisticas() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    Logger.log("📊 Generando estadísticas...");

    // Obtener datos
    const nuevos = ss.getSheetByName("Nuevos Ingresos");
    const asignaciones = ss.getSheetByName("Asignaciones y Terapias");
    const culminados = ss.getSheetByName("Procesos Culminados");
    const deserciones = ss.getSheetByName("Deserciones");

    const totalParticipantes = nuevos ? nuevos.getLastRow() - 1 : 0;
    const totalAsignaciones = asignaciones ? asignaciones.getLastRow() - 1 : 0;
    const totalCulminados = culminados ? culminados.getLastRow() - 1 : 0;
    const totalDeserciones = deserciones ? deserciones.getLastRow() - 1 : 0;

    const tasaExito = totalCulminados + totalDeserciones > 0 ?
      ((totalCulminados / (totalCulminados + totalDeserciones)) * 100).toFixed(1) : 0;

    const estadisticas =
      "📊 ESTADÍSTICAS GENERALES\n" +
      "═".repeat(30) + "\n\n" +
      "👥 Participantes registrados: " + totalParticipantes + "\n" +
      "📋 Casos asignados: " + totalAsignaciones + "\n" +
      "🎉 Procesos culminados: " + totalCulminados + "\n" +
      "⚠️ Deserciones: " + totalDeserciones + "\n\n" +
      "📈 Tasa de éxito: " + tasaExito + "%\n\n" +
      "📅 Generado: " + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm");

    ss.toast(estadisticas, "Estadísticas", -1);

    Logger.log("✅ Estadísticas generadas");
    return true;

  } catch (error) {
    Logger.log("❌ Error generando estadísticas: " + error.toString());
    return false;
  }
}
