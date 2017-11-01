
<div id="idListContent" class="clContent">
<h2 id="idContentHeader" class="clContentHeader">
</h2>

<div id="idContentArea" class="clContentArea">
    @var rows_o = context;@
        @for var key_s in rows_o@
            <div><button data-action="#key_s#" class="clButton">#rows_o[key_s]#</button></div>
        @endfor@
</div>
</div>