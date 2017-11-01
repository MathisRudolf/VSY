<!-- Template -->
<form id="idForm" class="clContent">
   <h2 id="idContentHeader" class="clContentHeader">
      Fehler erfassen
   </h2>
   <div id="idContentArea" class="clContentArea">
        @if context.data.zustand == 'neu'@

        <input type="hidden" value="#context.data.id#" id="id_s" name="id_s" />
        <input type="hidden" value="erkannt" id="status_s" name="status_s" />
        <input type="hidden" value="erkannt" id="zustand_s" name="zustand_s" />
        <input type="hidden" value="#context.data.fix.beschreibung#" id="fixbeschreibung_s" name="fixbeschreibung_s" />
        <input type="hidden" value="#context.data.fix.katid#" id="fixkatid_s" name="fixkatid_s" />
        <input type="hidden" value="#context.data.fix.datum#" id="fixdatum_s" name="fixdatum_s" />
        <input type="hidden" value="#context.data.fix.empid#" id="fixempid_s" name="fixempid_s" />
    
        <div class="clFormRow">
            <label for="kompid_s">Komponente <span class="clRequired"></span></label>
            <select type="text" id="kompid_s" name="kompid_s" required>
                @var rows_o = context['komp'];@
                @for var key_s in rows_o@
                    @var row_o = rows_o[key_s];@
                    <option value="#key_s#">#row_o['title']#</option>
                @endfor@
            </select>
        </div>

        <div class="clFormRow">
            <label for="bugkatid_s">Kategorie <span class="clRequired"></span></label>
            <select type="text" id="bugkatid_s" name="bugkatid_s" required>
                @var rows_o = context['katfehler'];@
                @for var key_s in rows_o@
                    @var row_o = rows_o[key_s];@
                    <option value="#key_s#">#row_o['title']#</option>
                @endfor@
            </select>
        </div>

        <div class="clFormRow">
            <label for="title_s">Datum <span class="clRequired"></span></label>
            <input type="date" value="#context.data.bug.datum#" id="bugdatum_s" name="bugdatum_s" required />
        </div>

        <div class="clFormRow">
            <label for="bugempid_s">Bearbeitet von <span class="clRequired"></span></label>
            <select type="text" id="bugempid_s" name="bugempid_s" required>
                @var rows_o = context['qsmitarbeiter'];@
                @for var key_s in rows_o@
                    @var row_o = rows_o[key_s];@
                    <option value="#key_s#">#row_o['vorname']+' '+row_o['nachname']#</option>
                @endfor@
            </select>
        </div>

    <div class="clFormRow">
            <label for="bugbeschreibung_s">Beschreibung <span class="clRequired"></span></label>
            <input type="text" id="bugbeschreibung_s" name="bugbeschreibung_s" required />
    </div>
    @else@
        <div>Aktion nicht zuläsig für diesen Datensatz</div>
    @endif@
    </div>
    
    <div id="idButtonArea" class="clButtonArea">
        <button data-action="back" class="clButton">Zurück</button>
        <button data-action="save" class="clButton">Speichern</button>
    </div>
</form>
<!-- EOF -->

<!--{
            'kompid': '',
            'status': '',
            'bug': {
                'beschreibung': '',
                'katid': '',
                'datum': '',
                'empid': ''
            },
            'fix': {
                'beschreibung': '',
                'katid': '',
                'datum': '',
                'empid': ''
            }


        }--->