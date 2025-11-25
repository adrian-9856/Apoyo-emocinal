/**
 * =========================================================================
 * SISTEMA DE APOYO EMOCIONAL - VERSIÓN SIMPLIFICADA
 * Por Adrian Torres - Manufacturing Operations
 * Versión: 3.0 - Simplificada y Reorganizada
 * =========================================================================
 *
 * ⚠️ OPCIÓN 1: Usar este archivo + Automatizaciones.gs + Utilidades.gs
 * ⚠️ OPCIÓN 2: Usar solo SistemaCompleto.gs (TODO UNIFICADO)
 *
 * CAMBIOS V3.0:
 * ✅ Lista de Espera: solo dropdown "Enviar" (col L)
 * ✅ Nuevos Ingresos: Terapeuta al final (col K)
 * ✅ "Sexo" → "Género" (con más opciones)
 * ✅ Flujo lógico: Llenar → Asignar → Enviar
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
    ["Pendientes asignar", '=CONTAR.SI.CONJUNTO(\'Nuevos Ingresos\'!H:H;"";\'Nuevos Ingresos\'!C:C;"<>")'],
    ["Ya asignados", '=CONTAR.SI(\'Nuevos Ingresos\'!L:L;"Asignado")'],
    ["", ""],
    ["👩‍⚕️ CASOS ACTIVOS POR TERAPEUTA", ""],
    ["Gerber - Casos activos", '=CONTAR.SI.CONJUNTO(\'Asignaciones y Terapias\'!A:A;"Gerber";\'Asignaciones y Terapias\'!L:L;"En proceso")'],
    ["Melissa - Casos activos", '=CONTAR.SI.CONJUNTO(\'Asignaciones y Terapias\'!A:A;"Melissa";\'Asignaciones y Terapias\'!L:L;"En proceso")'],
    ["Diana - Casos activos", '=CONTAR.SI.CONJUNTO(\'Asignaciones y Terapias\'!A:A;"Diana";\'Asignaciones y Terapias\'!L:L;"En proceso")'],
    ["Karina - Casos activos", '=CONTAR.SI.CONJUNTO(\'Asignaciones y Terapias\'!A:A;"Karina";\'Asignaciones y Terapias\'!L:L;"En proceso")'],
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
    '=CONTAR.SI(\'Asignaciones y Terapias\'!L:L;"En proceso")',
    '=SI((C2+D2)>0;C2/(C2+D2)*100;0)',
    '=CONTAR.SI.CONJUNTO(\'Asignaciones y Terapias\'!A:A;"Gerber";\'Asignaciones y Terapias\'!L:L;"En proceso")',
    '=CONTAR.SI.CONJUNTO(\'Asignaciones y Terapias\'!A:A;"Melissa";\'Asignaciones y Terapias\'!L:L;"En proceso")',
    '=CONTAR.SI.CONJUNTO(\'Asignaciones y Terapias\'!A:A;"Diana";\'Asignaciones y Terapias\'!L:L;"En proceso")',
    '=CONTAR.SI.CONJUNTO(\'Asignaciones y Terapias\'!A:A;"Karina";\'Asignaciones y Terapias\'!L:L;"En proceso")',
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

  // Nuevos Ingresos - Estados
  const nuevos = ss.getSheetByName("Nuevos Ingresos");

  const asignadoRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Asignado")
    .setBackground("#d4edda")
    .setRanges([nuevos.getRange("L2:L200")])
    .build();

  const pendienteRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Pendiente")
    .setBackground("#f8d7da")
    .setRanges([nuevos.getRange("L2:L200")])
    .build();

  nuevos.setConditionalFormatRules([asignadoRule, pendienteRule]);

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
