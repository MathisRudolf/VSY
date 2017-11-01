// ----------------------------------------------
// Bug-Tracker
// Mathis Rudolf, 1018387
// app.js
// ----------------------------------------------

'use strict'
let APP = {};

// ----------------------------------------------
APP.Application_cl = class {
// ----------------------------------------------
    constructor() {
        this.content_o = null; // das jeweils aktuelle Objekt im Contentbereich
        this.nav_o = new APP.Nav_cl();

        // Registrierungen
        APP.es_o.subscribe_px(this, 'app');
    }

    notify_px(self_opl, message_spl, data_apl) {
        switch (message_spl) {
            case 'app':
                switch (data_apl[0]) {
                    case 'init':
                        APP.tm_o = new TemplateManager_cl();
                        break;
                    case 'templates.loaded':
                        self_opl.nav_o.render_px();
                        break;
                        
                    //---------------------------------------------------
                    default:
                        console.warn('[Application_cl] unbekannte app-Notification: ' + data_apl[0]);
                        break;
                }
                break;
            default:
                console.warn('[Application_cl] unbekannte Notification: ' + message_spl);
                break;
        }
    }
    setContent_p(newContent_opl, data_opl) {
        if (this.content_o != null) {
            if (this.content_o === newContent_opl) {
                //Keine Änderung
            } else {
                if (this.content_o.canClose_px()) {
                    this.content_o.close_px();
                    this.content_o = newContent_opl;
                    this.content_o.render_px(data_opl);
                }
            }
        } else {
            this.content_o = newContent_opl;
            this.content_o.render_px(data_opl);
        }
    }
}

// ----------------------------------------------
$(document).ready(function () {
// ----------------------------------------------
    APP.es_o = new EventService_cl();
    APP.app_o = new APP.Application_cl();

    APP.es_o.publish_px('app', ['init', null]);

});
// EOF