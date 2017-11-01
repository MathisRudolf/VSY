<!-- Template -->
<div id="idListContent" class="clContent">
   <h2 id="idContentHeader" class="clContentHeader">
      Erkannte Fehler
   </h2>
   <div id="idContentArea" class="clContentArea">
      <table id="idList">
         <tr class="listheader"><th>Fehler-Beschreibung</th><th>Fehler-Kategorie</th><th>Status</th>
      @var rows_o = context['data'];@
      @for var key_s in rows_o@
         <tr id='#key_s#'>
         @var row_o = rows_o[key_s];@
            <td>#row_o['bug']['beschreibung']#</td><td>#row_o['bug']['katid']#</td><td>#row_o['status']#</td>
         </tr>
      @endfor@
      </table>
   </div>
   <div id="idButtonArea" class="clButtonArea">
        <button data-action="erfassen" class="clButton">Fehler erfassen</button>
        <button data-action="zuweisen" class="clButton">Entwickler zuweisen</button>
        <button data-action="fix" class="clButton">Lösung erfassen</button>
        <button data-action="patch" class="clButton">Lösung freigeben</button>
        <button data-action="delete" class="clButton">Löschen</button>
   </div>
</div>

<!-- EOF -->