<!-- Template -->
<form id="idForm" class="clContent">
   <h2 id="idContentHeader" class="clContentHeader">
      Lösung freigeben
   </h2>
   <div id="idContentArea" class="clContentArea">
        @if context.data.zustand == 'bearbeitet'@
        <input type="hidden" value="#context.data.id#" id="id_s" name="id_s" />
        <input type="hidden" value="#context.data.kompid#" id="kompid_s" name="kompid_s" />
        <input type="hidden" value="behoben" id="status_s" name="status_s" />
        <input type="hidden" value="Prüfung Erfolgreich" id="zustand_s" name="zustand_s" />
        <input type="hidden" value="#context.data.bug.beschreibung#" id="bugbeschreibung_s" name="bugbeschreibung_s" />
        <input type="hidden" value="#context.data.bug.katid#" id="bugkatid_s" name="bugkatid_s" />
        <input type="hidden" value="#context.data.bug.datum#" id="bugdatum_s" name="bugdatum_s" />
        <input type="hidden" value="#context.data.bug.empid#" id="bugempid_s" name="bugempid_s" />
        <input type="hidden" value="#context.data.fix.beschreibung#" id="fixbeschreibung_s" name="fixbeschreibung_s" />
        <input type="hidden" value="#context.data.fix.katid#" id="fixkatid_s" name="fixkatid_s" />
        <input type="hidden" value="#context.data.fix.datum#" id="fixdatum_s" name="fixdatum_s" />
        <input type="hidden" value="#context.data.fix.empid#" id="fixempid_s" name="fixempid_s" />
        @else@
        <div>Aktion nicht zuläsig für diesen Datensatz</div>
        @endif@
    </div>
    <div id="idButtonArea" class="clButtonArea">
        <button data-action="back" class="clButton">Zurück</button>
        <button data-action="return" class="clButton">Nicht Freigeben</button>
        <button data-action="save" class="clButton">Freigeben</button>
    </div>
</form>
<!-- EOF -->