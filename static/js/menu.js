// ----------------------------------------------
// Beispiel lit-x
// list.js
// ----------------------------------------------

// ----------------------------------------------
APP.MenuView_cl = class {
// ----------------------------------------------
   constructor (option_opl, template_spl) {
      this.option_opl = option_opl;
      this.template_s = template_spl;
   }
   canClose_px () {
      return true;
   }
   close_px () {
      this.exitHandler_p();
   }
   render_px (data_opl) {
      this.doRender_p();
      this.initHandler_p();
   }
   doRender_p () {
      // json-Daten bereits in js-Objekte umgesetzt
      var markup_s = APP.tm_o.execute_px(this.template_s, this.option_opl);
      $("#idContentOuter").html(markup_s);
   }
   initHandler_p () {
      // Ereignisverarbeitung einrichten
      $("#idContentArea").on("click", "button", $.proxy(this.onClickButtons_p, this));

   }
   exitHandler_p () {
      // Ereignisverarbeitung aufheben
      $("#idContentArea").off("click", "button", $.proxy(this.onClickButtons_p, this));
   }
   
   
   onClickButtons_p (event_opl) {
        var action_s = $(event_opl.target).attr("data-action");
        APP.es_o.publish_px('app', [action_s, null]);
        // Weiterleitung und Standardbearbeitung unterbinden
        event_opl.stopPropagation();
        event_opl.preventDefault();

   }
}
// EOF