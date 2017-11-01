// ----------------------------------------------
// Beispiel lit-x
// detail.js
// ----------------------------------------------

// ----------------------------------------------
APP.DetailView_cl = class {
// ----------------------------------------------
   constructor (name_spl, path_spl, template_spl) {
      this.name_s = name_spl;
      this.path_s = path_spl;
      this.template_s = template_spl;
   }
   canClose_px () {
      // Prüfen, ob Formularinhalt verändert wurde
      let mod_b = this.isModified_p();
      if (mod_b) {
         if (confirm("Es gibt nicht gespeicherte Änderungen - verwerfen?")) {
            mod_b = false;
         }
      }
      return !mod_b;
   }
   close_px () {
      this.exitHandler_p();
   }
   render_px (data_opl) {
      let path_s;
      if (data_opl != null) {
         path_s = this.path_s + data_opl;
      } else {
         path_s = this.path_s + '0';
      }
      $.ajax({
         dataType: "json",
         url: path_s,
         type: 'GET',
         context: this
      })
      .done(function (data_opl) {
         this.doRender_p(data_opl);
         this.initHandler_p();
      })
      .fail(function(jqXHR_opl, textStatus_spl) {
         alert( "[Detail] Fehler bei Anforderung: " + textStatus_spl );
      });
   }
   doRender_p (data_opl) {
      var markup_s = APP.tm_o.execute_px(this.template_s, data_opl);
      $("#idContentOuter").html(markup_s);
      this.storeFormContent_p();
   }
   initHandler_p () {
      // Ereignisverarbeitung für das Formular einrichten
      $("#idForm").on("click", "button", $.proxy(this.onClickButtons_p, this));
   }
   exitHandler_p () {
      // Ereignisverarbeitung für das Formular aufheben
      $("#idForm").off("click", "button", $.proxy(this.onClickButtons_p, this));
   }
   onClickButtons_p (event_opl) {
      var do_b = false;
      var path_s;
      var action_s = $(event_opl.target).attr("data-action");
      switch (action_s) {
      case "back":
         // Weiterleiten: Liste anfordern
         APP.es_o.publish_px('app', [this.name_s, null]);
         break;
      case "save":
         // Formularinhalt prüfen
         if (this.isModified_p()) {
            if (this.checkContent_p()) {
               // kein klassisches submit, es wird auch keine neue Anzeige vorgenommen
               var path_s = this.path_s;
               var data_s = $("#idForm").serialize();
               var type_s = 'POST';
               var id_s = $('#id_s').val();
               if (id_s == '') {
                  type_s = 'PUT';
               }
               $.ajax({
                  context: this,
                  dataType: "json",
                  data: data_s, 
                  url: path_s,
                  type: type_s
               })
               .done(function (data_opl) {
                  // Umwandlung der JSON-Daten vom Server bereits erfolgt
                  $('#id_s').val(data_opl['id']);
                  // aktuellen Formularinhalt speichern
                  // (das Formular wird ja nicht mehr neu geladen!)
                  this.storeFormContent_p();
                  alert("Speichern ausgeführt!");
               })
               .fail(function(jqXHR_opl, textStatus_spl) {
                  alert( "Fehler bei Anforderung: " + textStatus_spl );
               });

            } else {
               alert("Bitte prüfen Sie die Eingaben in den Formularfeldern!")
            }
         }
         break;
      }
      // Weiterleitung und Standardbearbeitung unterbinden
      event_opl.stopPropagation();
      event_opl.preventDefault();
   }
   isModified_p () {
      // Prüfen, ob Formularinhalt verändert wurde
      var mod_b = this.FormContentOrg_s != $("#idForm").serialize();
      return mod_b;
   }
   checkContent_p () {
      return true;
   }
   storeFormContent_p () {
      this.FormContentOrg_s = $("#idForm").serialize();
   }
}

// ----------------------------------------------
APP.PatchDetailView_cl = class extends APP.DetailView_cl {
// ----------------------------------------------
   //constructor (name_spl, path_spl, template_spl) {
   //   super.constructor(name_spl, path_spl, template_spl)
   //}
   onClickButtons_p (event_opl) {
      var do_b = false;
      var path_s;
      var action_s = $(event_opl.target).attr("data-action");
      switch (action_s) {
      case "back":
         // Weiterleiten: Liste anfordern
         APP.es_o.publish_px('app', [this.name_s, null]);
         break;
         case "return":
         // Weiterleiten: Liste anfordern
         if (this.isModified_p()) {
            if (this.checkContent_p()) {
               // kein klassisches submit, es wird auch keine neue Anzeige vorgenommen
               var path_s = this.path_s;
               $("#zustand_s").val('neu');
               $("#status_s").val('erkannt');
               var data_s = $("#idForm").serialize();
               var type_s = 'POST';
               var id_s = $('#id_s').val();
               if (id_s == '') {
                  type_s = 'PUT';
               }
               $.ajax({
                  context: this,
                  dataType: "json",
                  data: data_s, 
                  url: path_s,
                  type: type_s
               })
               .done(function (data_opl) {
                    APP.es_o.publish_px('app', [this.name_s+'.erfassen', data_opl['id']]);
               })
               .fail(function(jqXHR_opl, textStatus_spl) {
                  alert( "Fehler bei Anforderung: " + textStatus_spl );
               });

            } else {
               alert("Bitte prüfen Sie die Eingaben in den Formularfeldern!")
            }
         }
         break;
      case "save":
         // Formularinhalt prüfen
         if (this.isModified_p()) {
            if (this.checkContent_p()) {
               // kein klassisches submit, es wird auch keine neue Anzeige vorgenommen
               var path_s = this.path_s;
               var data_s = $("#idForm").serialize();
               var type_s = 'POST';
               var id_s = $('#id_s').val();
               if (id_s == '') {
                  type_s = 'PUT';
               }
               $.ajax({
                  context: this,
                  dataType: "json",
                  data: data_s, 
                  url: path_s,
                  type: type_s
               })
               .done(function (data_opl) {
                  // Umwandlung der JSON-Daten vom Server bereits erfolgt
                  $('#id_s').val(data_opl['id']);
                  // aktuellen Formularinhalt speichern
                  // (das Formular wird ja nicht mehr neu geladen!)
                  this.storeFormContent_p();
                  alert("Speichern ausgeführt!");
               })
               .fail(function(jqXHR_opl, textStatus_spl) {
                  alert( "Fehler bei Anforderung: " + textStatus_spl );
               });

            } else {
               alert("Bitte prüfen Sie die Eingaben in den Formularfeldern!")
            }
         }
         break;
      }
      // Weiterleitung und Standardbearbeitung unterbinden
      event_opl.stopPropagation();
      event_opl.preventDefault();
   }
   canClose_px () {
      // Prüfen, ob Formularinhalt verändert wurde
      return true;
   }
   isModified_p () {
      // Prüfen, ob Formular      var mod_b = this.FormContentOrg_s != $("#idForm").serialize();inhalt verändert wurde
      return true;
   }
}

// EOF