sap.ui.define([], function () {
    "use strict";

    return {
        /**
         * Formatea el proveedor como "Código - Nombre".
         * Si solo hay código o nombre, devuelve el que esté disponible.
         * @param {string} sLifnr - Código de proveedor
         * @param {string} sName - Nombre del proveedor
         * @returns {string} Proveedor formateado
         */
        formatProveedor: function (sLifnr, sName) {
            const sCodigo = sLifnr?.trim() || "";
            const sNombre = sName?.trim() || "";

            if (sCodigo && sNombre) {
                return `${sCodigo} - ${sNombre}`;
            } else if (sCodigo) {
                return sCodigo;
            } else if (sNombre) {
                return sNombre;
            }
            return "";
        },

        /**
         * Ejemplo adicional: retorna texto si existe o "Sin dato"
         */
        fallbackText: function (sValue) {
            return sValue?.trim() || "Sin dato";
        },
        
        tooltipProveedor: function (sValue) {
            return sValue || "";
        }
        
    };
});
