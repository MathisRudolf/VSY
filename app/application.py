# coding: utf-8

import json

import cherrypy

# ----------------------------------------------------------
class Application_cl(object):

    exposed = True  # gilt für alle Methoden

    def __init__(self):
        self.handler_o = {}


    # -------------------------------------------------------
    def GET(self, path_spl, id=None):

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

        retVal_o = {
            'id': None
        }

        if path_spl in self.handler_o:
            retVal_o = self.handler_o[path_spl].POST(data_opl)

        if retVal_o['id'] == None:
            cherrypy.response.status = 409

        return json.dumps(retVal_o)

    # -------------------------------------------------------
    def PUT(self, path_spl, **data_opl):

        retVal_o = {
            'id': None
        }

        if path_spl in self.handler_o:
            retVal_o = self.handler_o[path_spl].PUT(data_opl)

        if retVal_o['id'] == None:
            cherrypy.response.status = 404

        return json.dumps(retVal_o)

    # -------------------------------------------------------
    def DELETE(self, path_spl, id=None):

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

        msg_s = "unbekannte Anforderung: " + \
                str(arguments) + \
                ' ' + \
                str(kwargs)
        raise cherrypy.HTTPError(404, msg_s)

        # EOF
