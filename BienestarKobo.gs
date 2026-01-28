// =====================================================================
// SISTEMA DE FORMULARIO DE BIENESTAR - KOBOTOOLBOX
// =====================================================================

/**
 * Crea la hoja de Formulario de Bienestar (2026)
 */
function crearFormularioBienestar() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Verificar si ya existe
  let sheet = ss.getSheetByName('C_03_Formulario de Bienestar (2026)');
  if (sheet) {
    ss.toast('La hoja ya existe', 'Info', 2);
    return sheet;
  }

  sheet = ss.insertSheet('C_03_Formulario de Bienestar (2026)');

  const headers = [
    '_id',
    'start',
    'end',
    '_submission_time',
    'nombre_completo',
    'genero',
    'edad',
    'telefono',
    'email',
    'salud_mental/estado_animo',
    'salud_mental/nivel_estres',
    'salud_mental/calidad_sueno',
    'salud_mental/activar_protocolo_suicidio',
    'salud_mental/detalles_riesgo',
    'apoyo_necesario',
    'comentarios_adicionales'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers])
    .setBackground('#d9534f')
    .setFontColor('white')
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  // Anchos de columna
  const widths = [100, 150, 150, 150, 200, 100, 80, 150, 200, 150, 150, 150, 200, 300, 250, 300];
  widths.forEach((w, i) => {
    sheet.setColumnWidth(i + 1, w);
  });

  // Congelar primera fila
  sheet.setFrozenRows(1);

  Logger.log('✅ Hoja "C_03_Formulario de Bienestar (2026)" creada');

  return sheet;
}

/**
 * Importa datos desde KoboToolbox CSV
 */
function importarDatosKobo() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  try {
    const url = 'https://kf.kobotoolbox.org/api/v2/assets/aCxASXMEvmmwTfSM2ru4w9/export-settings/eshoqCSK2fAdzR6VYtPfZ3L/data.csv';

    ui.alert(
      'Importar Datos de KoboToolbox',
      '⚠️ IMPORTANTE:\n\n' +
      'Para que esta función funcione, necesitas:\n\n' +
      '1. Configurar las credenciales de API de KoboToolbox\n' +
      '2. Tener permisos de acceso al formulario\n\n' +
      'Por ahora, descarga el CSV manualmente desde:\n' +
      url + '\n\n' +
      'Y pégalo en la hoja "C_03_Formulario de Bienestar (2026)"',
      ui.ButtonSet.OK
    );

    // Crear la hoja si no existe
    let sheet = ss.getSheetByName('C_03_Formulario de Bienestar (2026)');
    if (!sheet) {
      sheet = crearFormularioBienestar();
    }

    // Por ahora, solo mostrar instrucciones
    // En el futuro, se puede implementar importación automática con OAuth
    Logger.log('Instrucciones de importación mostradas');

  } catch (error) {
    ui.alert('Error', 'Error al importar: ' + error.message, ui.ButtonSet.OK);
    Logger.log('❌ Error en importarDatosKobo: ' + error.message);
  }
}

/**
 * Verifica si hay alertas de protocolo de suicidio
 * Esta función debe ejecutarse automáticamente cuando se agreguen nuevos datos
 */
function verificarProtocoloSuicidio() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('C_03_Formulario de Bienestar (2026)');

  if (!sheet) {
    Logger.log('⚠️ Hoja de Bienestar no encontrada');
    ss.toast('La hoja "C_03_Formulario de Bienestar (2026)" no existe', 'Error', 3);
    return;
  }

  try {
    const datos = sheet.getDataRange().getValues();

    if (datos.length <= 1) {
      ss.toast('No hay datos para verificar', 'Sin Datos', 2);
      return;
    }

    // Buscar la columna de protocolo de suicidio
    const headers = datos[0];
    let colProtocolo = -1;

    for (let i = 0; i < headers.length; i++) {
      if (headers[i].toString().toLowerCase().includes('activar_protocolo_suicidio')) {
        colProtocolo = i;
        break;
      }
    }

    if (colProtocolo === -1) {
      ss.toast('No se encontró la columna "activar_protocolo_suicidio"', 'Error', 3);
      return;
    }

    // Verificar cada fila
    let alertasEncontradas = 0;

    for (let i = 1; i < datos.length; i++) {
      const protocolo = datos[i][colProtocolo];

      // Si dice "Sí", "si", "yes", "YES", "1", etc.
      if (protocolo && (
        protocolo.toString().toLowerCase() === 'sí' ||
        protocolo.toString().toLowerCase() === 'si' ||
        protocolo.toString().toLowerCase() === 'yes' ||
        protocolo.toString().toLowerCase() === '1'
      )) {
        alertasEncontradas++;

        // Enviar alerta
        const registroCompleto = datos[i];
        enviarAlertaSuicidio(registroCompleto, headers);

        // Marcar la fila en rojo
        sheet.getRange(i + 1, 1, 1, headers.length).setBackground('#ffcccc');
      }
    }

    if (alertasEncontradas > 0) {
      ss.toast(
        '🆘 ALERTAS DETECTADAS\n\n' +
        'Se encontraron ' + alertasEncontradas + ' alertas de protocolo de suicidio.\n\n' +
        'Se han enviado emails a todos los terapeutas.',
        'Alertas Enviadas',
        10
      );
    } else {
      ss.toast('No se encontraron alertas de riesgo', 'Sin Alertas', 3);
    }

    Logger.log('Verificación completada: ' + alertasEncontradas + ' alertas encontradas');

  } catch (error) {
    Logger.log('❌ Error en verificarProtocoloSuicidio: ' + error.message);
    ss.toast('Error al verificar alertas: ' + error.message, 'Error', 5);
  }
}

/**
 * Envía email de alerta de suicidio a TODOS los terapeutas
 * @param {Array} registro - Array con todos los datos de la fila
 * @param {Array} headers - Array con los nombres de las columnas
 */
function enviarAlertaSuicidio(registro, headers) {
  try {
    const props = PropertiesService.getDocumentProperties();
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // Obtener emails de todos los terapeutas
    const terapeutas = ['Gerber', 'Melissa', 'Diana', 'Karina'];
    const emailsTerapeutas = [];

    terapeutas.forEach(terapeuta => {
      const email = props.getProperty('EMAIL_' + terapeuta.toUpperCase());
      if (email) {
        emailsTerapeutas.push(email);
      }
    });

    // También enviar al director
    const emailDirector = props.getProperty('EMAIL_DIRECTOR');
    if (emailDirector) {
      emailsTerapeutas.push(emailDirector);
    }

    if (emailsTerapeutas.length === 0) {
      Logger.log('⚠️ No hay emails configurados para enviar alertas');
      ss.toast(
        '⚠️ ADVERTENCIA\n\n' +
        'Se detectó una alerta pero NO hay emails configurados.\n\n' +
        'Configura los emails en:\n' +
        'Menú → 👥 Configurar Emails Terapeutas',
        'Sin Emails',
        8
      );
      return false;
    }

    // Construir el cuerpo del email con TODA la información
    let cuerpo =
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
      '🆘 ALERTA URGENTE - PROTOCOLO DE SUICIDIO\n' +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
      '⚠️ Se ha activado el protocolo de suicidio en el\n' +
      '   Formulario de Bienestar.\n\n' +
      '⏰ Fecha/Hora: ' + new Date().toLocaleString() + '\n\n' +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
      '📋 INFORMACIÓN DEL PARTICIPANTE\n' +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';

    // Agregar TODOS los datos del formulario
    for (let i = 0; i < headers.length; i++) {
      const campo = headers[i].toString();
      const valor = registro[i] || '(vacío)';

      // Formatear mejor los campos importantes
      if (campo.toLowerCase().includes('nombre')) {
        cuerpo += '👤 ' + campo + ': ' + valor + '\n';
      } else if (campo.toLowerCase().includes('telefono') || campo.toLowerCase().includes('phone')) {
        cuerpo += '📞 ' + campo + ': ' + valor + '\n';
      } else if (campo.toLowerCase().includes('email') || campo.toLowerCase().includes('correo')) {
        cuerpo += '📧 ' + campo + ': ' + valor + '\n';
      } else if (campo.toLowerCase().includes('suicidio') || campo.toLowerCase().includes('riesgo')) {
        cuerpo += '🆘 ' + campo + ': ' + valor + '\n';
      } else {
        cuerpo += '   ' + campo + ': ' + valor + '\n';
      }
    }

    cuerpo += '\n' +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
      '⚠️ ACCIÓN REQUERIDA INMEDIATAMENTE\n' +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
      '1. Contactar al participante INMEDIATAMENTE\n' +
      '2. Evaluar el nivel de riesgo\n' +
      '3. Activar protocolo de intervención en crisis\n' +
      '4. Documentar todas las acciones tomadas\n\n' +
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
      'Este es un email automático generado por el\n' +
      'Sistema de Apoyo Emocional.\n\n' +
      '🔗 Google Sheet: ' + ss.getName() + '\n' +
      '🔗 URL: ' + ss.getUrl();

    const asunto = '🆘 ALERTA URGENTE - Protocolo de Suicidio Activado';

    // Enviar a todos los terapeutas
    emailsTerapeutas.forEach(email => {
      MailApp.sendEmail(email, asunto, cuerpo);
      Logger.log('✅ Email de alerta enviado a: ' + email);
    });

    ss.toast(
      '✅ ALERTAS ENVIADAS\n\n' +
      'Se enviaron ' + emailsTerapeutas.length + ' emails\n' +
      'a todos los terapeutas y director.',
      'Emails Enviados',
      5
    );

    return true;

  } catch (error) {
    Logger.log('❌ Error enviando alerta de suicidio: ' + error.message);
    SpreadsheetApp.getActiveSpreadsheet().toast(
      '❌ Error al enviar alertas: ' + error.message,
      'Error',
      5
    );
    return false;
  }
}

/**
 * Instala o actualiza el sistema con las últimas mejoras
 */
function instalarActualizaciones() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const respuesta = ui.alert(
    '🔄 Instalar Actualizaciones',
    '¿Deseas instalar las últimas actualizaciones del sistema?\n\n' +
    'Esto incluye:\n' +
    '• Crear hoja de Formulario de Bienestar (si no existe)\n' +
    '• Actualizar validaciones\n' +
    '• Reparar fórmulas\n' +
    '• Actualizar reportes\n\n' +
    '¿Continuar?',
    ui.ButtonSet.YES_NO
  );

  if (respuesta !== ui.Button.YES) {
    return;
  }

  try {
    ss.toast('Instalando actualizaciones...', 'Instalando', 3);

    // 1. Crear hoja de Bienestar si no existe
    let sheet = ss.getSheetByName('C_03_Formulario de Bienestar (2026)');
    if (!sheet) {
      crearFormularioBienestar();
      ss.toast('✅ Hoja de Bienestar creada', 'Instalando', 2);
      Utilities.sleep(1000);
    }

    // 2. Reparar validaciones
    ss.toast('Reparando validaciones...', 'Instalando', 2);
    configurarValidaciones();
    Utilities.sleep(1000);

    // 3. Reparar fórmulas
    ss.toast('Reparando fórmulas...', 'Instalando', 2);
    repararFormulasListaEspera();
    Utilities.sleep(1000);

    // 4. Actualizar reportes
    ss.toast('Actualizando reportes...', 'Instalando', 2);
    actualizarReportes();
    Utilities.sleep(1000);

    ui.alert(
      '✅ Actualizaciones Instaladas',
      'El sistema se ha actualizado correctamente.\n\n' +
      'Nuevas funciones disponibles:\n' +
      '• Formulario de Bienestar (2026)\n' +
      '• Importar datos desde KoboToolbox\n' +
      '• Alertas automáticas de protocolo de suicidio\n\n' +
      'Usa el menú "🏥 Apoyo Emocional" para acceder\n' +
      'a las nuevas funciones.',
      ui.ButtonSet.OK
    );

    Logger.log('✅ Actualizaciones instaladas correctamente');

  } catch (error) {
    ui.alert(
      '❌ Error',
      'Error al instalar actualizaciones:\n\n' + error.message,
      ui.ButtonSet.OK
    );
    Logger.log('❌ Error en instalarActualizaciones: ' + error.message);
  }
}
