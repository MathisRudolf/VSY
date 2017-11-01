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
        this.listProjekt_o = new APP.ListView_cl('projekt', '/projekt/', 'projektlist.tpl');
        this.detailProjekt_o = new APP.DetailView_cl('projekt', '/projekt/', 'projektdetail.tpl');
        this.listKomponente_o = new APP.ListView_cl('komponente', '/komponente/', 'komponentelist.tpl');
        this.detailKomponente_o = new APP.DetailView_cl('komponente', '/komponente/', 'komponentedetail.tpl');
        this.listQSMitarbeiter_o = new APP.ListView_cl('qsmitarbeiter', '/qsmitarbeiter/', 'mitarbeiterlist.tpl');
        this.detailQSMitarbeiter_o = new APP.DetailView_cl('qsmitarbeiter', '/qsmitarbeiter/', 'mitarbeiterdetail.tpl');
        this.listSWEntwickler_o = new APP.ListView_cl('swentwickler', '/swentwickler/', 'mitarbeiterlist.tpl');
        this.detailSWEntwickler_o = new APP.DetailView_cl('swentwickler', '/swentwickler/', 'mitarbeiterdetail.tpl');
        this.listKatFehler_o = new APP.ListView_cl('katfehler', '/katfehler/', 'katlist.tpl');
        this.detailKatFehler_o = new APP.DetailView_cl('katfehler', '/katfehler/', 'katdetail.tpl');
        this.listKatUrsache_o = new APP.ListView_cl('katursache', '/katursache/', 'katlist.tpl');
        this.detailKatUrsache_o = new APP.DetailView_cl('katursache', '/katursache/', 'katdetail.tpl');
        this.listFehler_o = new APP.FehlerListView_cl('fehler', '/fehler/', 'fehlerlist.tpl');
        this.listFehlerBehoben_o = new APP.ListView_cl('fehler', '/fehler/behoben', 'fehlerbehobenlist.tpl');
        this.listFehlerErkannt_o = new APP.ErkanntListView_cl('fehler', '/fehler/erkannt', 'fehlererkanntlist.tpl');
        this.detailFehlerErfassen_o = new APP.DetailView_cl('fehler', '/fehler/', 'fehlererfassen.tpl');
        this.detailSWEZuweisen_o = new APP.DetailView_cl('fehler', '/fehler/', 'entwicklerzuweisen.tpl');
        this.detailLösungErfassen_o = new APP.DetailView_cl('fehler', '/fehler/', 'lösungerfassen.tpl');
        this.detailLösungFreigeben_o = new APP.PatchDetailView_cl('fehler', '/fehler/', 'lösungfreigeben.tpl');
        this.listProAuswertung_o = new APP.ProAuswertungListView_cl('prolist', '/prolist/','projektauswertung.tpl');
        this.listKatAuswertung_o = new APP.KatAuswertungListView_cl('katlist', '/katlist/','kategorieauswertung.tpl');
        
        this.menuMitarbeiter_o = new APP.MenuView_cl(JSON.parse('{"qsmitarbeiter": "QSMitarbiter", "swentwickler": "SWEntwickler"}'), 'menu.tpl');
        this.menuKategorien_o = new APP.MenuView_cl(JSON.parse('{"katfehler": "FehlerKategorie", "katursache": "Ursachenkategorie"}'), 'menu.tpl');
        
        
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
                        
                    //Fehler
                    case 'fehler':
                        self_opl.setContent_p(self_opl.listFehler_o, data_apl[1]);
                        break;
                    case 'fehler.behoben':
                        self_opl.setContent_p(self_opl.listFehlerBehoben_o, data_apl[1]);
                        break;
                    case 'fehler.erkannt':
                        self_opl.setContent_p(self_opl.listFehlerErkannt_o, data_apl[1]);
                        break;
                    case 'fehler.erfassen':
                        self_opl.setContent_p(self_opl.detailFehlerErfassen_o, data_apl[1]);
                        break;
                    case 'fehler.zuweisen':
                        self_opl.setContent_p(self_opl.detailSWEZuweisen_o, data_apl[1]);
                        break;
                    case 'fehler.fix':
                        self_opl.setContent_p(self_opl.detailLösungErfassen_o, data_apl[1]);
                        break;
                    case 'fehler.patch':
                        self_opl.setContent_p(self_opl.detailLösungFreigeben_o, data_apl[1]);
                        break;

                    //Auswertung
                    case 'prolist':
                        self_opl.setContent_p(self_opl.listProAuswertung_o, data_apl[1]);
                        break;
                    case 'katlist':
                        self_opl.setContent_p(self_opl.listKatAuswertung_o, data_apl[1]);
                        break;


                    //Projekte
                    case 'projekt':
                        self_opl.setContent_p(self_opl.listProjekt_o, data_apl[1]);
                        break;
                    case 'projekt.add':
                        self_opl.setContent_p(self_opl.detailProjekt_o, data_apl[1]);
                        break;
                    case 'projekt.edit':
                        self_opl.setContent_p(self_opl.detailProjekt_o, data_apl[1]);
                        break;
                    case 'komponente':
                        self_opl.setContent_p(self_opl.listKomponente_o, data_apl[1]);
                        break;
                    case 'komponente.add':
                        self_opl.setContent_p(self_opl.detailKomponente_o, data_apl[1]);
                        break;
                    case 'komponente.edit':
                        
                        self_opl.setContent_p(self_opl.detailKomponente_o, data_apl[1]);
                        break;

                    //Mitarbeiter
                    case 'mitarbeiter':
                        self_opl.setContent_p(self_opl.menuMitarbeiter_o, data_apl[1]);
                        break;
                    case 'qsmitarbeiter':
                        self_opl.setContent_p(self_opl.listQSMitarbeiter_o, data_apl[1]);
                        break;
                    case 'qsmitarbeiter.add':
                        self_opl.setContent_p(self_opl.detailQSMitarbeiter_o, data_apl[1]);
                        break;
                    case 'qsmitarbeiter.edit':
                        self_opl.setContent_p(self_opl.detailQSMitarbeiter_o, data_apl[1]);
                        break;
                    case 'swentwickler':
                        self_opl.setContent_p(self_opl.listSWEntwickler_o, data_apl[1]);
                        break;
                    case 'swentwickler.add':
                        self_opl.setContent_p(self_opl.detailSWEntwickler_o, data_apl[1]);
                        break;
                    case 'swentwickler.edit':
                        self_opl.setContent_p(self_opl.detailSWEntwickler_o, data_apl[1]);
                        break;
                    
                    //Kategorie
                    case 'kategorien':
                        self_opl.setContent_p(self_opl.menuKategorien_o, data_apl[1]);
                        break;
                    case 'katfehler':
                        self_opl.setContent_p(self_opl.listKatFehler_o, data_apl[1]);
                        break;
                    case 'katfehler.add':
                        self_opl.setContent_p(self_opl.detailKatFehler_o, data_apl[1]);
                        break;
                    case 'katfehler.edit':
                        self_opl.setContent_p(self_opl.detailKatFehler_o, data_apl[1]);
                        break;
                    case 'katursache':
                        self_opl.setContent_p(self_opl.listKatUrsache_o, data_apl[1]);
                        break;
                    case 'katursache.add':
                        self_opl.setContent_p(self_opl.detailKatUrsache_o, data_apl[1]);
                        break;
                    case 'katursache.edit':
                        self_opl.setContent_p(self_opl.detailKatUrsache_o, data_apl[1]);
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