# coding: utf-8

import json

import cherrypy

from .fehler import Fehler_cl
from .projekt import Project_cl
from .mitarbeiter import QSMitarbeiter_cl, SWEntwickler_cl
from .komponente import Component_cl
from .kategorie import KatFehler_cl, KatUrsache_cl
from .auswertung import KatList_cl, ProList_cl

# Method-Dispatching!

# -------------------------------------------------------
def adjustId_p(id_spl, data_opl):
    # -------------------------------------------------------

    if id_spl == None:
        data_opl['id'] = ''
    elif id_spl == '':
        data_opl['id'] = ''
    elif id_spl == '0':
        data_opl['id'] = ''
    else:
        data_opl['id'] = id_spl
    return data_opl

# ----------------------------------------------------------



# ----------------------------------------------------------
class Application_cl(object):
    # ----------------------------------------------------------

    exposed = True  # gilt für alle Methoden

    # -------------------------------------------------------
    def __init__(self):
        # -------------------------------------------------------
        self.handler_o = {
            'fehler': Fehler_cl(),
            'projekt': Project_cl(),
            'komponente': Component_cl(),
            'qsmitarbeiter': QSMitarbeiter_cl(),
            'swentwickler': SWEntwickler_cl(),
            'katfehler': KatFehler_cl(),
            'katursache': KatUrsache_cl(),
            'prolist': ProList_cl(),
            'katlist': KatList_cl()
        }

        # es wird keine index-Methode vorgesehen, weil stattdessen
        # die Webseite index.html ausgeliefert wird (siehe Konfiguration)

    # -------------------------------------------------------
    def GET(self, path_spl, id=None):
        # -------------------------------------------------------
        retVal_o = {
            'data': None
        }

        if path_spl in self.handler_o:
            retVal_o = self.handler_o[path_spl].GET(id)

        if retVal_o['data'] == None:
            cherrypy.response.status = 404

        return json.dumps(retVal_o)

    # -------------------------------------------------------
    def POST(self, path_spl, **data_opl):
        # -------------------------------------------------------
        retVal_o = {
            'id': None
        }

        # data_opl: Dictionary mit den gelieferten key-value-Paaren

        # hier müsste man prüfen, ob die Daten korrekt vorliegen!

        if path_spl in self.handler_o:
            retVal_o = self.handler_o[path_spl].POST(data_opl)

        if retVal_o['id'] == None:
            cherrypy.response.status = 409

        return json.dumps(retVal_o)

    # -------------------------------------------------------
    def PUT(self, path_spl, **data_opl):
        # -------------------------------------------------------
        # Sichern der Daten: jetzt wird keine vollständige Seite
        # zurückgeliefert, sondern nur noch die Information, ob das
        # Speichern erfolgreich war

        retVal_o = {
            'id': None
        }

        # data_opl: Dictionary mit den gelieferten key-value-Paaren
        # hier müsste man prüfen, ob die Daten korrekt vorliegen!

        if path_spl in self.handler_o:
            retVal_o = self.handler_o[path_spl].PUT(data_opl)

        if retVal_o['id'] == None:
            cherrypy.response.status = 404

        return json.dumps(retVal_o)

    # -------------------------------------------------------
    def DELETE(self, path_spl, id=None):
        # -------------------------------------------------------
        # Eintrag löschen, nur noch Rückmeldung liefern
        retVal_o = {
            'id': id
        }

        if path_spl in self.handler_o:
            retVal_o = self.handler_o[path_spl].DELETE(id)

        if retVal_o['id'] == None:
            cherrypy.response.status = 404

        return json.dumps(retVal_o)

    # -------------------------------------------------------
    def default(self, *arguments, **kwargs):
        # -------------------------------------------------------
        msg_s = "unbekannte Anforderung: " + \
                str(arguments) + \
                ' ' + \
                str(kwargs)
        raise cherrypy.HTTPError(404, msg_s)

        # EOF
