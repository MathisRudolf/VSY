<!-- Template -->
<form id="idForm" class="clContent">
   <h2 id="idContentHeader" class="clContentHeader">
      Kategorie-Formular
   </h2>
   <div id="idContentArea" class="clContentArea">

   <input type="hidden" value="#context.data.id#" id="id_s" name="id_s" />
   <input type="hidden" value="#context.data.reference#" id="reference_s" name="reference_s" />
   <div class="clFormRow">
      <label for="title_s">Titel <span class="clRequired"></span></label>
      <input type="text" value="#context.data.title#" id="title_s" name="title_s" autofocus required />
   </div>

   </div>
   <div id="idButtonArea" class="clButtonArea">
      <button data-action="back" class="clButton">Zurück</button>
      <button data-action="save" class="clButton">Speichern</button>
   </div>
</form>
<!-- EOF -->