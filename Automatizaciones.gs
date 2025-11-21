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
    // AUTOMATIZACIÓN 0: ACEPTAR DE LISTA DE ESPERA
    // Hoja: "Lista de Espera", Columna M (13)
    // ==========================================
    if (nombreHoja === "Lista de Espera" && columna === 13) {
      if (valorLimpio === "Aceptado") {
        Logger.log("📋 Procesando aceptación desde lista de espera");

        // Pequeña pausa para estabilidad
        Utilities.sleep(300);

        const resultado = procesarAceptacionListaEspera(sheet, fila);

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
    // Hoja: "Nuevos Ingresos", Columna H (8)
    // ==========================================
    if (nombreHoja === "Nuevos Ingresos" && columna === 8) {
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

    // Obtener datos del participante
    const datos = sheetOrigen.getRange(fila, 1, 1, 12).getValues()[0];
    const nombre = datos[2]; // Columna C
    const creemosId = datos[3];
    const sexo = datos[4];
    const tipoAtencion = datos[8];

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
        sheetOrigen.getRange(fila, 12).setValue("Asignado").setBackground("#d4edda");
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
      sexo || "",                         // E - Sexo
      tipoAtencion || "Individual",       // F - Tipo Terapia
      "1",                                // G - No. Sesión (empieza en 1)
      "En proceso",                       // H - Estado Proceso
      hoy,                                // I - Fecha Inicio
      ""                                  // J - Motivo Finalización (vacío)
    ];

    asignaciones.getRange(nuevaFila, 1, 1, 10).setValues([nuevaAsignacion]);

    // Actualizar estado en Nuevos Ingresos
    sheetOrigen.getRange(fila, 12).setValue("Asignado").setBackground("#d4edda");

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
 * Procesar aceptación desde lista de espera
 */
function procesarAceptacionListaEspera(sheetOrigen, fila) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const nuevosIngresos = ss.getSheetByName("Nuevos Ingresos");

    if (!nuevosIngresos) {
      Logger.log("❌ Hoja 'Nuevos Ingresos' no encontrada");
      return false;
    }

    // Obtener datos del participante de Lista de Espera
    // Columnas: A=Fecha, B=No, C=Nombre, D=Creemos, E=Sexo, F=Edad, G=Malestar, H=Prioridad, I=TipoAtencion, J=Derivado, K=Contacto, L=Telefono, M=Estado, N=Observaciones
    const datos = sheetOrigen.getRange(fila, 1, 1, 14).getValues()[0];
    const nombre = datos[2];       // C
    const creemosId = datos[3];    // D
    const sexo = datos[4];         // E
    const rangoEdad = datos[5];    // F
    const malestar = datos[6];     // G
    const tipoAtencion = datos[8]; // I
    const derivadoPor = datos[9];  // J
    const contacto = datos[10];    // K

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
        sheetOrigen.getRange(fila, 1, 1, 14).setBackground("#d4edda");

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

    // Crear datos para Nuevos Ingresos
    // Columnas Nuevos Ingresos: A=Fecha, B=No, C=Nombre, D=Creemos, E=Sexo, F=Edad, G=Malestar, H=Terapeuta, I=TipoAtencion, J=Derivado, K=Contacto, L=Estado
    const datosNuevosIngresos = [
      "",                            // A - Fecha (fórmula automática)
      "",                            // B - No. (fórmula automática)
      nombreLimpio,                  // C - Nombre
      creemosId || "",               // D - Creemos ID
      sexo || "",                    // E - Sexo
      rangoEdad || "",               // F - Rango Edad
      malestar || "",                // G - Malestar
      "",                            // H - Terapeuta (vacío, se asignará después)
      tipoAtencion || "Individual",  // I - Tipo Atención
      derivadoPor || "",             // J - Derivado Por
      contacto || "",                // K - Contacto Emergencia
      ""                             // L - Estado (fórmula automática)
    ];

    // Insertar en Nuevos Ingresos (solo las columnas con datos, las fórmulas se mantienen)
    nuevosIngresos.getRange(nuevaFila, 3).setValue(nombreLimpio);           // C
    nuevosIngresos.getRange(nuevaFila, 4).setValue(creemosId || "");        // D
    nuevosIngresos.getRange(nuevaFila, 5).setValue(sexo || "");             // E
    nuevosIngresos.getRange(nuevaFila, 6).setValue(rangoEdad || "");        // F
    nuevosIngresos.getRange(nuevaFila, 7).setValue(malestar || "");         // G
    nuevosIngresos.getRange(nuevaFila, 9).setValue(tipoAtencion || "Individual"); // I
    nuevosIngresos.getRange(nuevaFila, 10).setValue(derivadoPor || "");     // J
    nuevosIngresos.getRange(nuevaFila, 11).setValue(contacto || "");        // K

    // Marcar fila en Lista de Espera como procesada (verde)
    sheetOrigen.getRange(fila, 1, 1, 14).setBackground("#d4edda");

    // Mensaje de confirmación
    ss.toast(
      "✅ ACEPTADO DESDE LISTA DE ESPERA\n\n" +
      "👤 " + nombreLimpio + "\n" +
      "📋 Movido a 'Nuevos Ingresos'\n" +
      "👩‍⚕️ Siguiente: Asignar terapeuta",
      "Aceptación Completa",
      5
    );

    Logger.log("✅ Movido de lista de espera: " + nombreLimpio + " → Nuevos Ingresos (fila " + nuevaFila + ")");

    return true;

  } catch (error) {
    Logger.log("❌ Error en procesarAceptacionListaEspera: " + error.toString());
    SpreadsheetApp.getActiveSpreadsheet().toast(
      "Error: " + error.toString(),
      "Error en Aceptación",
      5
    );
    return false;
  }
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
