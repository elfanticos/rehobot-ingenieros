import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';

@Injectable()

export class downloadPDFHelper {
    constructor() {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
    }

    downloadPdf(DocDefinition, nameFile, msj = null) {
        pdfMake.createPdf(DocDefinition).download(nameFile + '.pdf');
    }

}