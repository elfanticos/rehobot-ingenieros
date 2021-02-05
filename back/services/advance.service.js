'use strict'
const advanceModel = require('../models/advance.model');
const moment = require('moment');
moment.locale('es');

const service = {};

/**
 * 
 * @param {Number} project 
 * @param {String} description
 * @param {Number} personRegister 
 */
service.insert = async(project, description, personRegister) => {
    return await advanceModel.insert(project, description, personRegister);
}

/**
 * 
 * @param {Number} projectId 
 */
service.dataPdf = async(projectId) => {
    let json_data = [
        { indice: 'index', title: '#', width: 24, margin: [0, 10, 0, 0], style: 'tableHeader', alignment: 'center', align_data: 'left' },
        { indice: 'type', title: 'Avance o incidencia', width: 80, margin: [0, 10, 0, 0], style: 'tableHeader', alignment: 'center', align_data: 'left' },
        { indice: 'description', title: 'Descripción', width: 170, margin: [0, 10, 0, 0], style: 'tableHeader', alignment: 'center', align_data: 'left' },
        { indice: 'solution', title: 'Solución (Incidencia)', width: 170, margin: [0, 10, 0, 0], style: 'tableHeader', alignment: 'center', align_data: 'left' },
        { indice: 'date_register', title: 'Fecha registro', width: 74, margin: [0, 10, 0, 0], style: 'tableHeader', alignment: 'center', align_data: 'center' },
        { indice: 'date_response', title: 'Fecha respuesta', width: 74, margin: [0, 10, 0, 0], style: 'tableHeader', alignment: 'center', align_data: 'left' }
    ];
    const data = await advanceModel.dataPdf(projectId);
    return structurePDF(data, json_data, 'Avances e Incidencias');
}

function structurePDF(data, json_data, name_report, detail_class = null) {
    let estilos = {
            tableGeneral: { margin: [0, 5, 0, 15] },
            tableHeader: { fontSize: 11, bold: true },
            subheader: { fontSize: 10, bold: false, alignment: 'left' },
            detail_class: { fontSize: 10, bold: false, alignment: 'center' },
            text_header: { fontSize: 16, bold: true, margin: [0, 5, 0, 0] },
            date_header: { fontSize: 11, bold: false, margin: [0, 10, 0, 0] },
            bold: { fontSize: 12, bold: true }
        },
        width_header = [],
        json_tabla = [],
        cabecera = [];
    json_data.map(json => {
        width_header.push(json.width);
        cabecera.push({ text: json.title, margin: json.margin, style: json.style, alignment: json.alignment });
    });
    json_tabla.push(cabecera);
    let a = 1;
    data && (data.map((res, i) => {
        let style = res.bold ? 'bold' : 'subheader';
        let row = [];
        json_data.map(json => {
            // style == 'bold' ? a = 1 : '';
            let text = json.indice == 'index' ? (style == 'bold' ? '' : (a++)) : res[json.indice];
            row.push({ text: text, style: style, alignment: json.align_data });
        });
        json_tabla.push(row);
    }));
    let table = {
        widths: width_header,
        headerRows: 1,
        body: json_tabla
    };

    let objHeaderReport = {
        alignment: 'center',
        text: name_report,
        width: '63%',
        style: 'text_header'
    };

    return {
        styles: estilos,
        pageOrientation: 'landscape',
        pageSize: 'A4',
        pageMargins: [40, 26, 40, 40],
        content: [
            {
                columns: [
                    objHeaderReport,
                    {
                        alignment: 'right',
                        text: `Fecha: ${moment(new Date()).format('LL')}`,
                        width: '22%',
                        style: 'date_header'
                    }
                ]
            },
            {
                style: 'tableGeneral',
                color: '#444',
                table: table
            }
        ]
    };
}

module.exports = service;