# coding: utf-8

import json

import cherrypy

from controller.user_controller import UserController
from controller.entry_controller import EntryController
from controller.login_controller import LoginController

from model.user import User
from model.entry import Entry

# ----------------------------------------------------------
class Application(object):

    exposed = True  # gilt für alle Methoden

    def __init__(self):

        self.login = None
        self.handler_o = {
            "user": UserController(),
            "entry": EntryController(),
            "login": LoginController
        }


    # -------------------------------------------------------
    def GET(self, path_s, id=None):

        if self.login == None:
            pass

        retVal_o = {
            'data': None
        }

        if path_s in self.handler_o:
            retVal_o = self.handler_o[path_s].GET(id)

        if retVal_o['data'] == None:
            cherrypy.response.status = 404

        return json.dumps(retVal_o)


    # -------------------------------------------------------
    def POST(self, path_s, **data_opl):

        retVal_o = {
            'id': None
        }

        if path_s in self.handler_o:
            retVal_o = self.handler_o[path_s].POST(data_opl)

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
    def DELETE(self, path_s, id=None):

        retVal_o = {
            'id': id
        }

        if path_s in self.handler_o:
            retVal_o = self.handler_o[path_s].DELETE(id)

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
