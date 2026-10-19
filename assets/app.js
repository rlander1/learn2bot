/* Learn2Bot – shared app */
const $=id=>document.getElementById(id);
let lang=localStorage.getItem("gbt2_lang")||"es";
/* one-time migration: old Module 8 (Método propio) is now Module 9 */
(function(){if(localStorage.getItem("gbt2_mig9"))return;try{const p=JSON.parse(localStorage.getItem("gbt2_progress")||"{}");if(p.m8&&!p.m9){p.m9=p.m8;delete p.m8;localStorage.setItem("gbt2_progress",JSON.stringify(p));
 ["gbt2_journal_","gbt2_checks_"].forEach(k=>{const v=localStorage.getItem(k+"m8");if(v!==null){localStorage.setItem(k+"m9",v);localStorage.removeItem(k+"m8")}})}}catch(e){}localStorage.setItem("gbt2_mig9","1")})();
const u=k=>UI[lang][k];const tr=o=>o[lang];
/* bot names are translated in English mode: no page mixes languages */
const BN_EN={"Asistente":"Assistant","Resumen claro":"Clear Summary","Cita":"Appointments","Familia":"Family","Mi ayudante":"My helper"};
const bn=n=>lang=="en"?(BN_EN[n]||n):n;
(function enFix(){const rep=t=>t.replace(/Práctica — Resumen en 3 líneas/g,"Practice — 3-line summary").replace(/Resumen claro/g,"Clear Summary").replace(/\bCita\b/g,"Appointments").replace(/\bFamilia\b/g,"Family").replace(/Asistente/g,"Assistant").replace(/Mi ayudante/g,"My helper");
 const walk=(o,inEn)=>{if(!o||typeof o!="object")return;for(const k of Object.keys(o)){const v=o[k],e=inEn||k=="en";if(typeof v=="string"){if(e)o[k]=rep(v)}else walk(v,e)}};
 [typeof UI!="undefined"&&UI.en,typeof INTRO!="undefined"&&INTRO.en,typeof MODS!="undefined"&&MODS,typeof LESSONS!="undefined"&&LESSONS,typeof UPDATES!="undefined"&&UPDATES].forEach(o=>o&&walk(o,o===UI.en||o===INTRO.en))})();
const store={get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},set:(k,v)=>localStorage.setItem(k,JSON.stringify(v))};
const prog=()=>store.get("gbt2_progress",{});
function setProg(id,part){const p=prog();p[id]=p[id]||{};p[id][part]=true;store.set("gbt2_progress",p)}
const isReal=id=>!!(prog()[id]||{}).real;const isSim=id=>!!(prog()[id]||{}).sim;const isDone=id=>isReal(id)||isSim(id);
const unlocked=i=>i===0||isDone(MODS[i-1].id);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

const P={chat:'<path d="M4 5h16v11H9l-5 4z"/>',bot:'<rect x="4" y="8" width="16" height="12" rx="4"/><path d="M12 8V4M9 13v1M15 13v1M9 17h6"/><circle cx="12" cy="3.5" r="1"/>',
pen:'<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 6l3 3"/>',brain:'<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V5a2 2 0 0 0-3-1zM15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1"/>',
clock:'<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',plug:'<path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4"/>',search:'<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>',
shield:'<path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z"/><path d="M9 12l2 2 4-4"/>',compass:'<circle cx="12" cy="12" r="8"/><path d="M15 9l-2 5-4 1 2-5z"/>',
lock:'<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',check:'<path d="M5 12l5 5 9-10"/>',hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5V4.5a1.5 1.5 0 0 1 3 0V11V6a1.5 1.5 0 0 1 3 0v8a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-3l-2-4a1.5 1.5 0 0 1 2.5-1.5z"/>',
coin:'<circle cx="12" cy="12" r="8"/><path d="M5 19L19 5"/>',key:'<circle cx="8" cy="15" r="4"/><path d="M11 12l8-8M16 7l2 2"/>',device:'<rect x="3" y="5" width="13" height="10" rx="2"/><path d="M7 19h5"/><rect x="17" y="8" width="5" height="11" rx="1.5"/>',
target:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="0.8"/>',users:'<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0M16 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 6"/>',
list:'<path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/>',x:'<circle cx="12" cy="12" r="8"/><path d="M9 9l6 6M15 9l-6 6"/>',
arrowL:'<path d="M15 5l-7 7 7 7"/>',arrowR:'<path d="M9 5l7 7-7 7"/>',play:'<path d="M8 5l11 7-11 7z"/>',pause:'<path d="M8 5v14M16 5v14"/>',redo:'<path d="M4 12a8 8 0 1 0 3-6.2"/><path d="M4 4v5h5"/>',
help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17.5h.01"/>',send:'<path d="M4 12l16-8-6 16-2-6z"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/>',home:'<path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z"/>',star:'<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>'};
const ic=(n,extra="")=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${P[n]||""}</svg>`;
const LOGO=`<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 3c3.1 0 5.5 1.3 10 3.9s7.1 4.1 8.6 6.8 1.5 5.5 1.5 10.3 0 7.5-1.5 10.2-4.1 4.2-8.6 6.8S27.1 45 24 45s-5.5-1.3-10-3.9-7.1-4.1-8.6-6.8S3.9 28.7 3.9 24s0-7.5 1.5-10.3 4.1-4.2 8.6-6.8S20.9 3 24 3z" fill="#1F6B5C"/><ellipse cx="19.5" cy="16.5" rx="2.6" ry="4" transform="rotate(-18 19.5 16.5)" fill="#fff"/><ellipse cx="28.5" cy="16.5" rx="2.6" ry="4" transform="rotate(-18 28.5 16.5)" fill="#fff"/><path d="M17 30q7 5 14 0" stroke="#E39B2D" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;
const HERO=()=>`<div class="hero-art"><svg viewBox="0 0 560 440" role="img" role="img" aria-label="${u('heroAlt')}"><rect width="560" height="440" fill="url(#wall)"/><rect x="36" y="44" width="150" height="170" rx="16" fill="#fff" opacity=".9"/><rect x="46" y="54" width="130" height="150" rx="10" fill="url(#sky)"/><path d="M111 54v150M46 128h130" stroke="#fff" stroke-width="6"/><circle cx="148" cy="86" r="14" fill="#FFE2A3"/><path d="M28 40q22 90 6 186h28q10-96-6-186z" fill="#E7B9A6"/><path d="M194 40q-22 90-6 186h-28q-10-96 6-186z" fill="#E7B9A6"/><circle cx="478" cy="132" r="120" fill="url(#lamp)"/><path d="M478 170v196" stroke="#8C6A4E" stroke-width="6" stroke-linecap="round"/><path d="M444 120h68l16 52h-100z" fill="#F2C46B"/><path d="M444 120h68l4 14h-76z" fill="#fff" opacity=".35"/><ellipse cx="478" cy="368" rx="30" ry="6" fill="#8C6A4E"/><rect x="0" y="330" width="560" height="110" fill="url(#floor)"/><ellipse cx="290" cy="392" rx="230" ry="30" fill="#E8B9A0" opacity=".7"/><ellipse cx="290" cy="392" rx="190" ry="22" fill="none" stroke="#F6D7C5" stroke-width="4" stroke-dasharray="2 10" stroke-linecap="round"/><path d="M60 330h44l-6 44h-32z" fill="#B5654E"/><path d="M82 330c-30-30-26-70-6-90 4 34 10 50 6 90zm0 0c10-40 34-62 56-64-14 30-28 46-56 64zm0 0c-14-26-40-34-58-28 18 20 34 26 58 28z" fill="#6E9A7C"/><ellipse cx="300" cy="384" rx="130" ry="12" fill="#000" opacity=".10"/><rect x="196" y="176" width="210" height="190" rx="46" fill="#7E9A86"/><rect x="208" y="186" width="186" height="120" rx="38" fill="#8FAA96"/><rect x="176" y="268" width="62" height="104" rx="28" fill="#6F8B77"/><rect x="364" y="268" width="62" height="104" rx="28" fill="#6F8B77"/><rect x="226" y="300" width="150" height="60" rx="18" fill="#869F8C"/><path d="M210 372v14M392 372v14" stroke="#5A4636" stroke-width="8" stroke-linecap="round"/><path d="M258 330q-6 30 2 54h26q2-26 4-50zM318 330q8 28 4 54h26q4-30-6-56z" fill="#4D5A6B"/><ellipse cx="272" cy="386" rx="18" ry="7" fill="#3A3F47"/><ellipse cx="336" cy="386" rx="18" ry="7" fill="#3A3F47"/><path d="M246 230q54-26 110 0l10 104h-130z" fill="#C9705A"/><path d="M301 222v110" stroke="#B35F4A" stroke-width="3"/><circle cx="294" cy="262" r="3" fill="#F8E4DC"/><circle cx="294" cy="288" r="3" fill="#F8E4DC"/><rect x="288" y="196" width="26" height="30" rx="10" fill="#E2A982"/><circle cx="301" cy="168" r="38" fill="#E8B58F"/><path d="M263 166q2-44 40-44 38 0 36 46-6-24-36-26-28 0-40 24z" fill="#D9D3CB"/><circle cx="301" cy="122" r="16" fill="#D9D3CB"/><path d="M268 150q30-20 64 0" stroke="#C9C2B9" stroke-width="3" fill="none"/><circle cx="287" cy="172" r="10" fill="#fff" fill-opacity=".25" stroke="#4D453E" stroke-width="3"/><circle cx="315" cy="172" r="10" fill="#fff" fill-opacity=".25" stroke="#4D453E" stroke-width="3"/><path d="M297 172h8" stroke="#4D453E" stroke-width="3"/><circle cx="287" cy="173" r="2.6" fill="#231E1A"/><circle cx="315" cy="173" r="2.6" fill="#231E1A"/><path d="M290 190q11 9 22 0" stroke="#8C4A3A" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="277" cy="186" rx="6" ry="3.5" fill="#F09A8A" opacity=".5"/><ellipse cx="325" cy="186" rx="6" ry="3.5" fill="#F09A8A" opacity=".5"/><g transform="rotate(-8 300 284)"><rect x="252" y="250" width="100" height="70" rx="10" fill="#2E3440"/><rect x="258" y="256" width="88" height="58" rx="6" fill="url(#screen)"/><rect x="264" y="263" width="44" height="10" rx="5" fill="#C5D3E6"/><rect x="292" y="279" width="48" height="10" rx="5" fill="#2B5F9E"/><rect x="264" y="295" width="56" height="10" rx="5" fill="#BFDCCB"/></g><path d="M252 246q-20 40 10 64" stroke="#C9705A" stroke-width="22" fill="none" stroke-linecap="round"/><path d="M350 246q20 40-10 62" stroke="#C9705A" stroke-width="22" fill="none" stroke-linecap="round"/><circle cx="264" cy="308" r="10" fill="#E8B58F"/><circle cx="338" cy="306" r="10" fill="#E8B58F"/><g transform="translate(168 222) scale(1.5)"><g class="react"><path d="M20 3c7 0 11 2 13.5 5.5S37 15 37 20.5 35 31 31 34s-7 3.5-11 3.5S12 37 8.5 34 3 26 3 20.5 5 11.5 7.5 8 13 3 20 3z" fill="#1F6FD6"/><path d="M20 3c7 0 11 2 13.5 5.5S37 15 37 20.5 35 31 31 34s-7 3.5-11 3.5S12 37 8.5 34 3 26 3 20.5 5 11.5 7.5 8 13 3 20 3z" fill="url(#shine)"/><ellipse cx="20" cy="38.6" rx="11" ry="1.6" fill="#000" opacity=".10"/><ellipse cx="16.4" cy="16.5" rx="3.2" ry="4.6" fill="#fff"/><ellipse cx="26.4" cy="16.5" rx="3.2" ry="4.6" fill="#fff"/><circle cx="17.2" cy="15" r="1.1" fill="#1F6FD6"/><circle cx="27.2" cy="15" r="1.1" fill="#1F6FD6"/><ellipse cx="20" cy="26" rx="2" ry="2.4" fill="#fff" opacity=".9"/></g></g><g transform="translate(400 262) scale(2.6)"><g class=""><path d="M20 3c7 0 11 2 13.5 5.5S37 15 37 20.5 35 31 31 34s-7 3.5-11 3.5S12 37 8.5 34 3 26 3 20.5 5 11.5 7.5 8 13 3 20 3z" fill="#17594B"/><path d="M20 3c7 0 11 2 13.5 5.5S37 15 37 20.5 35 31 31 34s-7 3.5-11 3.5S12 37 8.5 34 3 26 3 20.5 5 11.5 7.5 8 13 3 20 3z" fill="url(#shine)"/><ellipse cx="20" cy="38.6" rx="11" ry="1.6" fill="#000" opacity=".10"/><path d="M12.4 18q2.6-3.4 5.2 0M22.4 18q2.6-3.4 5.2 0" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M15.5 25q4.5 3.8 9 0" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round"/><ellipse cx="10.5" cy="23" rx="2.6" ry="1.6" fill="#FF9FB0" opacity=".55"/><ellipse cx="29.5" cy="23" rx="2.6" ry="1.6" fill="#FF9FB0" opacity=".55"/></g></g><g transform="translate(404 86) scale(1.35)"><g class="react"><path d="M20 3c7 0 11 2 13.5 5.5S37 15 37 20.5 35 31 31 34s-7 3.5-11 3.5S12 37 8.5 34 3 26 3 20.5 5 11.5 7.5 8 13 3 20 3z" fill="#7A4FE0"/><path d="M20 3c7 0 11 2 13.5 5.5S37 15 37 20.5 35 31 31 34s-7 3.5-11 3.5S12 37 8.5 34 3 26 3 20.5 5 11.5 7.5 8 13 3 20 3z" fill="url(#shine)"/><ellipse cx="20" cy="38.6" rx="11" ry="1.6" fill="#000" opacity=".10"/><ellipse class="blink" cx="15.0" cy="17" rx="2.6" ry="4" fill="#fff"/><path d="M22.4 17.6q2.6-2.6 5.2 0" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/></g></g><path d="M398 140q-8 6-4 14" stroke="#7A4FE0" stroke-width="2" fill="none" opacity=".5"/><path d="M459 104c-4-6-12-2-9 4l9 8 9-8c3-6-5-10-9-4z" fill="#E0457B"/><g><path d="M372 196h150a14 14 0 0 1 14 14v34a14 14 0 0 1-14 14h-70l-14 16-4-16h-62a14 14 0 0 1-14-14v-34a14 14 0 0 1 14-14z" fill="#FFFDFA" stroke="#E6DACB" stroke-width="2"/><text x="447" y="236" text-anchor="middle" font-size="24" font-weight="800" fill="#231E1A" data-bg="#FFFDFA" data-es="¡Muy bien!" data-en="Well done!" font-family="Atkinson Hyperlegible,Segoe UI,Noto Sans,system-ui,sans-serif">${u("heroBubble")}</text></g><path d="M214 214l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill="#FFC766"/><path d="M520 300l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#FFC766"/></svg></div>`;

function header(){document.documentElement.lang=lang;$("top").innerHTML=`<a class="brand" href="index.html">${LOGO}<span>Learn2Bot</span></a><a class="navlink" href="novedades.html"${document.body.dataset.page=="novedades"?' aria-current="page"':""}>${ic("star")} ${u("nwNav")}</a>
<div class="lang" role="group" aria-label="${u("lang")}"><button data-l="es" lang="es" aria-pressed="${lang=="es"}">Español</button><button data-l="en" lang="en" aria-pressed="${lang=="en"}">English</button></div>`;
 if(!$("svgdefs"))document.body.insertAdjacentHTML("afterbegin",`<svg id="svgdefs" width="0" height="0" style="position:absolute" aria-hidden="true"><defs><radialGradient id="shine" cx="35%" cy="28%" r="70%"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".12"/></radialGradient></defs></svg>`);
 const md=document.querySelector("meta[name=description]");if(md)md.content=u("metaDesc");
$("top").querySelectorAll("[data-l]").forEach(b=>b.onclick=()=>{if(lang===b.dataset.l)return;lang=b.dataset.l;localStorage.setItem("gbt2_lang",lang);render();document.querySelector(`[data-l=${lang}]`).focus()});
document.querySelector(".skip").textContent=u("skip");$("foot").innerHTML=`<p><b>${u("foot")}</b></p><p>${u("disclaimer")}</p><p><a href="index.html">${u("home")}</a> · <a href="privacidad.html">${u("privacy")}</a></p>`;
 const pg=document.body.dataset.page,m=MODS.find(x=>x.id==pg);document.title=m?`${tr(m.t)} — Learn2Bot`:pg=="privacidad"?`${u("privTitle")} — Learn2Bot`:pg=="404"?`${u("nfTitle")} — Learn2Bot`:pg=="novedades"?`${u("nwTitle")} — Learn2Bot`:`Learn2Bot — ${u("tagline")}`;}
function simpleBox(id,text){const b=$(id);b.innerHTML=`<strong>${u("simplerTitle")}</strong>${esc(text)}`;b.classList.remove("hidden");b.setAttribute("tabindex","-1");b.focus()}

/* HOME */
function renderHome(){const m=$("main");const intro=localStorage.getItem("gbt2_intro");
let nextI=MODS.findIndex((x,i)=>x.built&&unlocked(i)&&!isDone(x.id));
const primary=!intro?`<a class="btn btn-pri" id="startBtn" href="intro.html">${u("start")} ${ic("arrowR")}</a>`:nextI>=0?`<a class="btn btn-pri" id="startBtn" href="${MODS[nextI].id}.html">${u("cont")} ${nextI+1} ${ic("arrowR")}</a>`:"";
m.innerHTML=`<section class="hero"><div><p class="eyebrow">${u("heroEyebrow")}</p><h1>${u("heroTitle")}</h1><p class="lead">${u("heroLead")}</p>
<div class="row">${primary}${intro?`<a class="btn-link" href="intro.html">${u("reviewIntro")}</a>`:""}</div></div>${HERO()}</section>
<section class="promises">${[["coin","p1"],["hand","p2"],["clock","p3"]].map(([i,k])=>`<div class="promise"><div class="ic">${ic(i)}</div><p>${u(k)}</p></div>`).join("")}</section>
<h2>${u("modsTitle")}</h2><p class="lead">${u("modsLead")}</p>
<section class="mods">${MODS.map((x,i)=>{const p=prog()[x.id]||{};const done=isDone(x.id),open=x.built&&unlocked(i);
 const st=!x.built?`<span class="status">${ic("clock")} ${u("stSoon")}</span>`:isReal(x.id)?`<span class="status ok">${ic("check")} ${u("stReal")}</span>`:done?`<span class="status sim">${ic("check")} ${u("stSim")}</span><a class="reallink" href="${x.id}.html#real" id="real-${x.id}">${u("doRealLater")} ${ic("arrowR")}</a>`:open?`<span class="status go">${ic("play")} ${u("stNow")}</span>`:`<span class="status">${ic("lock")} ${u("stLocked")}</span>`;
 const bar=x.built?`<div class="bar" aria-hidden="true">${["watch","try","real"].map(k=>`<i class="${(k=="real"?p.real||p.sim:p[k])?"on":""}${k=="real"&&p.sim&&!p.real?" half":""}"></i>`).join("")}</div>`:"";
 const inner=`<div class="num">${done?ic("check",'style="width:28px;height:28px"'):i+1}</div><div><h3>${open?`<a class="stretch" href="${x.id}.html">`:""}${u("modWord")} ${i+1} · ${esc(tr(x.t))}${open?"</a>":""}</h3><p>${esc(tr(x.d))}</p>${st}${bar}</div>`;
 return open?`<div class="mod open ${done?"done":""}${i===nextI?" cur":""}" id="card-${x.id}">${inner}</div>`:`<div class="mod locked" id="card-${x.id}" aria-disabled="true">${inner}</div>`}).join("")}</section><a class="card nwhome" href="novedades.html"><span class="ill">${ic("star")}</span><span><b>${u("nwHomeT")}</b><br>${u("nwHomeD")}</span><span class="nwgo">${u("nwSee")} ${ic("arrowR")}</span></a><div class="row reset-row"><button class="btn-link small muted" id="resetProg">${ic("redo")}<span> ${u("resetProg")}</span></button><span class="fb good" id="resetFb" aria-live="polite"></span></div>`;
 let sure=false;$("resetProg").onclick=()=>{if(!sure){sure=true;$("resetProg").lastChild.textContent=" "+u("resetProgSure");return}Object.keys(localStorage).filter(k=>k.startsWith("gbt2_")&&k!="gbt2_lang"&&k!="gbt2_mig9").forEach(k=>localStorage.removeItem(k));renderHome();$("resetFb").textContent=u("resetProgDone")};$("resetProg").onblur=()=>{if(sure){sure=false;$("resetProg").lastChild.textContent=" "+u("resetProg")}};}

/* INTRO */
let ist=0;
function renderIntro(){const d=INTRO[lang][ist];$("main").innerHTML=`<a class="crumb" href="index.html">${ic("arrowL")} ${u("home")}</a>
<div class="card"><div class="row" style="justify-content:space-between;margin-top:0"><p class="eyebrow">${u("introHead")} · ${u("stepWord")} ${ist+1} ${u("of")} 3</p><div class="dots" aria-hidden="true">${[0,1,2].map(i=>`<i class="${i==ist?"on":""}"></i>`).join("")}</div></div>
<div class="introcard"><div class="ill">${ic(d.icon)}</div><div><h1 id="introTitle">${d.t}</h1><ul class="plain">${d.b.map(x=>`<li>${x}</li>`).join("")}</ul></div></div>
<div class="row"><button class="btn btn-sec" id="introBack">${ic("arrowL")} ${u("back")}</button><button class="btn btn-pri" id="introNext">${ist==2?u("toM1"):u("next")} ${ic("arrowR")}</button></div>
<button class="btn-link" id="dunno">${ic("help")} ${u("dunno")}</button><div id="simple" class="simple hidden" aria-live="polite"></div></div>`;
$("introNext").onclick=()=>{if(ist<2){ist++;renderIntro();$("introNext").focus()}else{localStorage.setItem("gbt2_intro","1");location.href="m1.html"}};
$("introBack").onclick=()=>{if(ist>0){ist--;renderIntro();$("introBack").focus()}else location.href="index.html"};
$("dunno").onclick=()=>simpleBox("simple",d.s);}

/* LESSON – one linear guided path: idea → step 1..n (show, then your turn) → real → done */
const L={i:-1,phase:"idea",run:0,startLen:0};
let LS,MI;
function renderLesson(){const id=document.body.dataset.page;MI=MODS.findIndex(x=>x.id==id);LS=LESSONS[id];const mod=MODS[MI];
if(!unlocked(MI)){$("main").innerHTML=`<a class="crumb" href="index.html">${ic("arrowL")} ${u("home")}</a><div class="card success"><div class="big">${ic("lock")}</div><h1>${u("lockedTitle")}</h1><p class="lead" style="margin:auto">${u("lockedLead")}</p><div class="row" style="justify-content:center"><a class="btn btn-pri" href="${MODS[MI-1].id}.html">${u("goPrev")} ${MI}</a></div></div>`;return}
$("main").innerHTML=`<a class="crumb" href="index.html">${ic("arrowL")} ${u("home")}</a>
<p class="eyebrow">${u("modWord")} ${MI+1} · ${esc(tr(mod.t))}</p>
<ol class="stages" id="stages" aria-label="${u("stagesLbl")}"></ol>
<div class="prog" id="prog"><div class="prog-t" id="progT"></div><div class="prog-bar"><i id="progBar"></i></div></div>
<div id="stage"></div>`;
if(location.hash=="#real"&&L.i<0)L.i=LS.steps.length;go(L.i)}
function setProgLine(){const n=LS.steps.length;let t,f;if(L.i<0){t=u("intro2");f=0}else if(L.i<n){t=`${u("stepWord")} ${L.i+1} ${u("of")} ${n}`;f=(L.i+1)/(n+1)}else{t=u("lastStep");f=n/(n+1)}
if(L.phase=="done")f=1;$("progT").textContent=t;$("progBar").style.width=(f*100)+"%";updStages()}
function updStages(){const el=$("stages");if(!el)return;const ph=L.phase,cur=ph=="done"?3:(ph=="real"||ph=="simonly")?2:(ph=="turn"||ph=="ok"||ph=="busy")?1:0;
 if(el.dataset.cur==cur+lang)return;el.dataset.cur=cur+lang;
 const CHK='<svg class="chk" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
 el.innerHTML=[["watch","play","stWatchT","stWatchS"],["try","hand","stTryT","stTryS"],["real","star","stRealT","stRealS"]].map(([k,i,t,d],n)=>{const st=n<cur?"done":n==cur?"cur":"todo";
  return `<li class="stage s-${k} ${st}"${st=="cur"?' aria-current="step"':""}><span class="ic">${st=="done"?CHK:ic(i)}</span><span>${n+1} · ${u(t)}<small>${u(d)}</small></span></li>`}).join("")}
function helpLink(){return `<button class="btn-link small" id="dunno">${ic("help")} ${u("dunno")}</button><div id="simple" class="simple hidden" aria-live="polite"></div>`}
function bindHelp(text){$("dunno").onclick=()=>simpleBox("simple",text)}
function go(i){L.run++;L.i=i;const st=$("stage"),n=LS.steps.length;
 if(i<0){L.phase="idea";const I=LS.idea,d=I[lang];
  st.innerHTML=`<div class="card idea-card"><h1>${d.h}</h1>${I.type=="compare"?`<div class="idea-grid">${[d.a,d.b].map((x,k)=>`<div class="idea ${k?"b":""}"><div class="ic">${ic(x[0])}</div><h3>${x[1]}</h3><p>${x[2]}</p></div>`).join("")}</div>`:`<div class="parts">${d.p.map((x,k)=>`<div class="part"><div class="ic">${ic(x[0])}</div><b>${k+1}. ${x[1]}</b><span>${x[2]}</span></div>`).join("")}</div>`}
  <p class="lead">${d.note}</p><div class="row"><button class="btn btn-pri" id="begin">${u("begin")} ${ic("arrowR")}</button></div>${helpLink()}</div>`;
  $("begin").onclick=()=>{go(0);$("main").scrollIntoView({block:"start",behavior:SMOOTH()})};bindHelp(tr(I.s))}
 else if(i<n){const s=LS.steps[i];const typing=s.k=="type";
  st.innerHTML=`<div class="card stepcard"><h1 class="step-h">${esc(tr(s.cap))}</h1><p class="why">${esc(tr(s.w))}</p>
  <div class="lstatus" id="status" aria-live="polite"></div><div class="row act" id="act"></div></div>
  ${typing?`<div class="typecard hidden" id="typecard"><p class="tc-h">${u("typeThis")}</p>${s.f.map(f=>`${f.l?`<p class="tc-l">${esc(tr(f.l))}</p>`:""}<blockquote class="tc-q">${esc(tr(f.v))}</blockquote>`).join("")}
  <button class="btn btn-sec" id="fill">${ic("pen")} ${u("typeForMe")}</button></div>`:""}
  ${simHTML()}<div class="stepdone hidden" id="stepdone" aria-live="polite"></div><div class="below"><div class="fb" id="fb" aria-live="polite"></div>${helpLink()}</div>`;
  bindSim();bindHelp(tr(s.s));if(typing)$("fill").onclick=fillEx;arrive()}
 else if(i==n){L.phase="real";renderReal()}
 setProgLine()}
function simHTML(){return `<div class="dash" id="dash"><div class="chrome" aria-hidden="true"><i></i><i></i><i></i><span>${u("simTitle")}</span><em>${u("simBadge")}</em></div>
<div class="dash-body"><nav class="side" aria-label="${u("myBots")}"><p class="side-l">${u("myBots")}</p><div id="botList"></div><button id="newBot" aria-label="${u("newBotLbl")}">${u("newBot")}</button><div class="plusmenu hidden" id="plusMenu"><button id="mkBot">${ic("bot")} ${u("mkBot")}</button></div></nav>
<section class="pane"><div class="pane-top" id="paneTitle"></div><div class="empty" id="emptyS">${u("pick")}</div>
<div class="form hidden" id="form"><label for="bname">${u("fName")}</label><input id="bname" autocomplete="off"><label for="bdesc">${u("fDesc")}</label><input id="bdesc" autocomplete="off"><button id="create">${u("create")}</button></div>
<div class="chat hidden" id="chat"><div class="msgs" id="msgs" aria-live="polite"></div><div class="compose"><textarea id="msg" aria-label="${u("msgLbl")}" placeholder="${u("msgLbl")}"></textarea><button id="send" aria-label="${u("send")}">${ic("send")}</button></div></div></section></div>
<svg id="cursor" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 2l7 19 2.6-7.6L21 11z" fill="#2A2622" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg></div>`}
const BOTCOL={"":"#17594B","Asistente":"#6B7079","Resumen claro":"#1F6FD6","Cita":"#7A4FE0","Familia":"#D02C78","Mi ayudante":"#9A5B22"};
Object.keys(BN_EN).forEach(k=>BOTCOL[BN_EN[k]]=BOTCOL[k]);
const botCol=n=>BOTCOL[n]||"#B05E00";
/* v2 blob: shine, contact shadow, five expressions (attentive, happy, surprised, thinking, wink) */
const BLOB="M20 3c7 0 11 2 13.5 5.5S37 15 37 20.5 35 31 31 34s-7 3.5-11 3.5S12 37 8.5 34 3 26 3 20.5 5 11.5 7.5 8 13 3 20 3z";
const FACE={att:'<ellipse class="blink" cx="15" cy="17" rx="2.6" ry="4" fill="#fff"/><ellipse class="blink" cx="25" cy="17" rx="2.6" ry="4" fill="#fff"/>',
happy:'<path d="M12.4 18q2.6-3.4 5.2 0M22.4 18q2.6-3.4 5.2 0" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M15.5 25q4.5 3.8 9 0" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round"/><ellipse cx="10.5" cy="23" rx="2.6" ry="1.6" fill="#FF9FB0" opacity=".55"/><ellipse cx="29.5" cy="23" rx="2.6" ry="1.6" fill="#FF9FB0" opacity=".55"/>',
wow:c=>`<ellipse cx="15" cy="16.5" rx="3.2" ry="4.6" fill="#fff"/><ellipse cx="25" cy="16.5" rx="3.2" ry="4.6" fill="#fff"/><circle cx="15.8" cy="15" r="1.1" fill="${c}"/><circle cx="25.8" cy="15" r="1.1" fill="${c}"/><ellipse cx="20" cy="26" rx="2" ry="2.4" fill="#fff" opacity=".9"/>`,
think:'<ellipse class="blink" cx="15" cy="16" rx="2.6" ry="3.6" fill="#fff"/><ellipse class="blink" cx="25" cy="16" rx="2.6" ry="3.6" fill="#fff"/><path d="M17 26h6" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>',
wink:'<ellipse class="blink" cx="15" cy="17" rx="2.6" ry="4" fill="#fff"/><path d="M22.4 17.6q2.6-2.6 5.2 0" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/>'};
const avSVG=(n,cls="",ex="att")=>{const c=botCol(n),f=FACE[ex];return `<svg class="av blob ${cls}" viewBox="0 0 40 40" aria-hidden="true"><path d="${BLOB}" fill="${c}"/><path d="${BLOB}" fill="url(#shine)"/><ellipse cx="20" cy="38.6" rx="11" ry="1.6" fill="#000" opacity=".10"/>${typeof f=="function"?f(c):f}</svg>`};
const PREV={"Asistente":T2("¿En qué te ayudo hoy?","How can I help today?"),"Resumen claro":T2("Listo para resumir noticias.","Ready to summarize news."),"Cita":T2("Te ayudo con tus citas.","I help with your appointments.")};Object.keys(BN_EN).forEach(k=>PREV[k]&&(PREV[BN_EN[k]]=PREV[k]));
function botBtn(b,i,active){b={n:bn(b.n)};const d=document.createElement("button");d.className="botbtn"+(active?" active":"");d.id="bot-"+i;d.innerHTML=`${avSVG(b.n)}<span class="bt"><b></b><small></small></span>`;d.querySelector("b").textContent=b.n;d.querySelector("small").textContent=PREV[b.n]?tr(PREV[b.n]):u("newTitle");return d}
const curBot=()=>{const b=document.querySelector(".botbtn.active");return b?b.querySelector("b").textContent:""};
function setPreview(t){const b=document.querySelector(".botbtn.active small");if(b)b.textContent=t.replace(/\s+/g," ")}
function resetDash(){const bl=$("botList");bl.innerHTML="";LS.bots.forEach((b,i)=>bl.appendChild(botBtn(b,i)));bindBots();
["form","chat","plusMenu"].forEach(x=>$(x).classList.add("hidden"));$("emptyS").classList.remove("hidden");$("msgs").innerHTML="";$("bname").value=$("bdesc").value=$("msg").value="";$("paneTitle").textContent="";clearHi();$("cursor").style.display="none";tapBanner(null)}
const clearHi=()=>document.querySelectorAll(".hi").forEach(e=>e.classList.remove("hi"));
function showChat(title){$("form").classList.add("hidden");$("emptyS").classList.add("hidden");$("chat").classList.remove("hidden");$("paneTitle").innerHTML=avSVG(title==u("newTitle")?"":title,"sm")+"<span></span>";$("paneTitle").lastChild.textContent=title}
const FX={openMenu(){$("plusMenu").classList.remove("hidden")},
startSetup(){$("mkBot").classList.add("chosen");document.querySelectorAll(".botbtn").forEach(b=>b.classList.remove("active"));showChat(u("newTitle"));addMsg(u("setupQ"),"bot");addCard({i:"bot",h:T2("Elige una opción","Choose one"),l:T2([],[]),b:CHIPS})},
nameBot(st){const n=($("msg").value.trim()||tr(st.f[0].v)).replace(/\s+/g," ").slice(0,24);addMsg(n,"me");$("msg").value="";document.querySelectorAll(".botbtn").forEach(b=>b.classList.remove("active"));$("botList").appendChild(botBtn({n},"new",true));bindBots();showChat(n);
 const d=document.createElement("div");d.className="msg bot bcard avcard";d.innerHTML=avSVG(n,"lg react","happy")+"<span></span>";d.lastChild.textContent=u("avReady");botRow(d);addMsg(tr(st.reply).replace("{n}",n),"bot")},
openForm(){$("chat").classList.add("hidden");$("emptyS").classList.add("hidden");$("form").classList.remove("hidden");$("paneTitle").textContent=u("newTitle")},
createBot(){const n=$("bname").value.trim()||"Resumen claro";document.querySelectorAll(".botbtn").forEach(b=>b.classList.remove("active"));$("botList").appendChild(botBtn({n,c:"g"},"new",true));bindBots();showChat(n)},
say(st){const t=$(st.t),row=t.parentNode;const ok=document.createElement("p");ok.className="bc-done";ok.innerHTML=`${ic("check")}<span></span>`;ok.lastChild.textContent=tr(st.done);row.replaceWith(ok);addMsg(tr(st.say),"bot")},
selectPre(st){document.querySelectorAll(".botbtn").forEach(b=>b.classList.remove("active"));const b=$(st.pre);b.classList.add("active");showChat(b.querySelector("b").textContent)},
selectBot(st){document.querySelectorAll(".botbtn").forEach(b=>b.classList.remove("active"));$("bot-"+st.arg).classList.add("active");showChat(bn(LS.bots[st.arg].n))}};
function botRow(d){const r=document.createElement("div");r.className="mrow";r.innerHTML=avSVG(curBot(),"sm",d.classList.contains("typing")?"think":"att");r.appendChild(d);$("msgs").appendChild(r);$("msgs").scrollTop=1e6;return r}
function addMsg(t,w){const d=document.createElement("div");d.className="msg "+w;d.textContent=t;if(!w.includes("typing"))setPreview(t);if(w.startsWith("bot"))return botRow(d);$("msgs").appendChild(d);$("msgs").scrollTop=1e6;return d}
function addCard(cd){const d=document.createElement("div");d.className="msg bot bcard";d.innerHTML=`<div class="bc-h">${ic(cd.i||"info")}<b></b></div><ul></ul>${cd.b?`<div class="bc-b"></div>`:""}`;d.querySelector("b").textContent=tr(cd.h);
 tr(cd.l).forEach(x=>{const li=document.createElement("li");li.textContent=x;d.querySelector("ul").appendChild(li)});
 (cd.b||[]).forEach(b=>{const btn=document.createElement("button");btn.id=b.id;btn.className="bc-btn";btn.textContent=tr(b.l);btn.onclick=()=>clickTarget(b.id);d.querySelector(".bc-b").appendChild(btn)});botRow(d)}
function botReply(st){addMsg(tr(st.reply),"bot");if(st.card)addCard(st.card);if(st.after)addMsg(tr(st.after),"bot")}
function doSend(st,instant,cb){addMsg($("msg").value,"me");$("msg").value="";if(instant){botReply(st);return cb&&cb()}
const ty=addMsg(u("thinking"),"bot typing");setTimeout(()=>{if(!ty.isConnected)return;ty.remove();botReply(st);cb&&cb()},700)}
function applyFx(st,instant,cb){if(st.fx=="send")return doSend(st,instant,cb);if(st.fx)FX[st.fx](st);cb&&cb()}
function applyInstant(st){if(st.pre)FX[st.preFx](st);if(st.k=="type")st.f.forEach(f=>$(f.t).value=tr(f.v));applyFx(st,true)}
function rebuild(n){resetDash();$("mkBot").classList.remove("chosen");for(let j=0;j<n;j++)applyInstant(LS.steps[j]);$("plusMenu").classList.add("hidden")}
const SPD=()=>+(localStorage.getItem("gbt_speed")||1); /* test hook only */
const sleep=(ms,r)=>new Promise((res,rej)=>setTimeout(()=>r===L.run?res():rej("x"),ms*SPD()));
function tapBanner(id,text){const old=$("tapBanner");if(old)old.remove();if(!id)return;const t=$(id),d=$("dash");const b=document.createElement("div");b.id="tapBanner";b.className="tapbanner";b.textContent=text;d.appendChild(b);
const r=t.getBoundingClientRect(),dr=d.getBoundingClientRect();b.style.left=Math.max(8,Math.min(r.left-dr.left,dr.width-b.offsetWidth-8))+"px";const below=r.bottom-dr.top+12,up=below+b.offsetHeight>dr.height||t.classList.contains("bc-btn");b.style.top=(up?r.top-dr.top-b.offsetHeight-12:below)+"px";b.classList.toggle("up",up)}
/* pacing: nothing auto-plays or auto-advances */
const RM=matchMedia("(prefers-reduced-motion: reduce)").matches;
const fields=()=>["bname","bdesc","msg"];
const NAMES={newBot:T2("el botón «+»","the \"+\" button"),create:T2("«Crear bot»","\"Create bot\""),send:T2("la flecha de enviar","the send arrow"),bname:T2("«Nombre del bot»","\"Bot name\""),bdesc:T2("«Descripción»","\"Description\""),msg:T2("la caja de mensaje","the message box")};
const nm=id=>id=="bot-new"?(lang=="es"?"«"+$(id).querySelector("b").textContent+"»":"\""+$(id).querySelector("b").textContent+"\""):id.startsWith("bot-")?(lang=="es"?"«"+bn(LS.bots[+id.slice(4)].n)+"»":"\""+bn(LS.bots[+id.slice(4)].n)+"\""):NAMES[id]?tr(NAMES[id]):(lang=="es"?"«"+$(id).textContent.trim()+"»":"\""+$(id).textContent.trim()+"\"");
function setStatus(cls,icon,html){updStages();$("status").className="lstatus "+cls;$("status").innerHTML=`${ic(icon)}<span>${html}</span>`}
function act(html){$("act").innerHTML=html}
function lockSim(mode){const d=$("dash");d.classList.toggle("done-dim",mode=="dim");d.classList.toggle("locked",!!mode);if(mode)d.setAttribute("aria-hidden","true");else d.removeAttribute("aria-hidden");
 d.querySelectorAll("button,input,textarea").forEach(e=>{e.disabled=mode=="dim";if(mode)e.tabIndex=-1;else e.removeAttribute("tabindex")})}
const glowBtn=(id,inner)=>`<span class="nextwrap"><button class="btn btn-pri hi" id="${id}">${inner}</button><span class="nextlabel" aria-hidden="true">${ic("arrowL")}${u("tapHere")}</span></span>`;
const hideSD=()=>{const d=$("stepdone");if(d){d.classList.add("hidden");d.innerHTML=""}$("cursor").style.display="none";document.querySelectorAll(".lasttap").forEach(e=>e.classList.remove("lasttap"))};
function arrive(){L.run++;hideSD();L.phase="arrive";rebuild(L.i);fields().forEach(x=>$(x).readOnly=true);$("typecard")&&$("typecard").classList.add("hidden");lockSim("dim");
 setStatus("watching","info",u("arriveMsg"));act(glowBtn("showBtn",`${ic("play")} ${u("showHow")}`));$("showBtn").onclick=show}
let capAt=0;
async function caption(txt,r){const wait=3000*SPD()-(Date.now()-capAt);if(capAt&&wait>0)await sleep(wait/SPD(),r);setStatus("watching","play",esc(txt));capAt=Date.now()}
async function holdCaption(r){const wait=3000*SPD()-(Date.now()-capAt);if(wait>0)await sleep(wait/SPD(),r)}
async function moveTo(id,r){if($(id).classList.contains("botbtn"))$(id).scrollIntoView({inline:"center",block:"nearest"});const c=$("cursor"),d=$("dash").getBoundingClientRect(),b=$(id).getBoundingClientRect();c.style.display="block";c.style.left=(b.left-d.left+Math.min(b.width/2,60))+"px";c.style.top=(b.top-d.top+b.height/2)+"px";await sleep(RM?300:1500,r)}
async function clickAnim(id,r){await moveTo(id,r);await sleep(1000,r);$("cursor").classList.add("click");await sleep(350,r);$("cursor").classList.remove("click")}
async function show(){L.run++;const r=L.run,s=LS.steps[L.i];L.phase="show";hideSD();capAt=0;$("fb").textContent="";$("typecard")&&$("typecard").classList.add("hidden");
 rebuild(L.i);fields().forEach(x=>$(x).readOnly=true);lockSim("lock");act("");$("dash").scrollIntoView({block:"nearest",behavior:SMOOTH()});
 try{await new Promise((res,rej)=>setTimeout(()=>r===L.run?res():rej("x"),RM?0:900))}catch(e){return}
 try{if(s.k=="click"){if(s.pre){await caption(u("capMove").replace("{x}",nm(s.pre)),r);$(s.pre).classList.add("hi");await clickAnim(s.pre,r);await caption(u("capTap").replace("{x}",nm(s.pre)),r);clearHi();FX[s.preFx](s)}await caption(u("capMove").replace("{x}",nm(s.t)),r);$(s.t).classList.add("hi");await clickAnim(s.t,r);await caption(u("capTap").replace("{x}",nm(s.t)),r);applyFx(s,true);if(s.fx=="say")await caption(u("capReply"),r)}
  else{if(s.pre){await caption(u("capMove").replace("{x}",nm(s.pre)),r);$(s.pre).classList.add("hi");await clickAnim(s.pre,r);await caption(u("capTap").replace("{x}",nm(s.pre)),r);clearHi();FX[s.preFx](s)}
   for(const f of s.f){const el=$(f.t),txt=tr(f.v);await caption(u("capType").replace("{x}",nm(f.t)),r);el.classList.add("hi");await moveTo(f.t,r);
    if(RM)el.value=txt;else for(let k=0;k<txt.length;k++){el.value=txt.slice(0,k+1);el.scrollTop=1e6;await sleep(40,r)}el.classList.remove("hi")}
   await caption(u("capThen").replace("{x}",nm(s.go)),r);$(s.go).classList.add("hi");await clickAnim(s.go,r);
   if(s.fx=="send"){await new Promise(res=>doSend(s,false,res));await caption(u("capReply"),r)}else{applyFx(s,true);await caption(u("capDone"),r)}}
  L.lastFrame=simSnap();L.lastY=scrollY;await holdCaption(r);document.querySelectorAll("#dash .hi").forEach(e=>{e.classList.remove("hi");e.classList.add("lasttap")});shown()}catch(e){}}
/* test hook: structural snapshot of the simulator (ignores highlight/disabled state) */
function simSnap(){return [...document.querySelectorAll("#dash *")].filter(e=>!e.closest("#tapBanner")&&e.id!="cursor"&&!e.closest("#cursor")).map(e=>{const r=e.getClientRects().length>0;return e.tagName+"#"+e.id+"."+[...e.classList].filter(c=>!["hi","lasttap","click"].includes(c)).join(".")+"|"+(r?1:0)+"|"+(e.children.length?"":(e.value||e.textContent||"").slice(0,60))}).join("\n")}
function shown(){L.phase="shown";setStatus("watching","check",u("shownTop"));act("");lockSim("dim");
 const sd=$("stepdone");sd.innerHTML=`<div class="sd-msg">${avSVG("","sd-av","att")}<p>${u("shownMsg")}</p></div><div class="sd-act">${glowBtn("gotIt",`${u("gotIt")} ${ic("arrowR")}`)}<button class="btn-link small muted" id="again">${ic("redo")} ${u("seeAgain")}</button></div>`;sd.classList.remove("hidden");
 $("gotIt").onclick=turn;$("again").onclick=show;$("gotIt").focus({preventScroll:true});calmScroll(sd,1500)}
function turn(){L.run++;hideSD();L.phase="turn";const s=LS.steps[L.i];rebuild(L.i);lockSim(false);fields().forEach(x=>$(x).readOnly=false);L.pre=!!s.pre;$("typecard")&&$("typecard").classList.toggle("hidden",L.pre);
 const msg=s.k=="click"||L.pre?(L.pre?(s.pre=="newBot"?u("turnPre"):u("turnPreBot").replace("{x}",nm(s.pre))):u("turnClick1")):s.go=="create"?u("turnForm"):u("turnType1");
 setStatus("turn","hand",`<b>${u("yourTurn")}:</b> ${msg}`);act(`<button class="btn-link small" id="again">${ic("redo")} ${u("seeAgain")}</button>`);$("again").onclick=show;
 updGlow();if(s.k=="type"){s.f.forEach(f=>$(f.t).oninput=()=>{clearTimeout(L.gt);L.gt=setTimeout(updGlow,650)})}
 fit();const first=document.querySelector(".hi");if(s.k=="type"&&first)first.focus({preventScroll:true})}
function fit(){const top=$("typecard")||$("status").closest(".card");const h=innerHeight;
 const t0=top.getBoundingClientRect().top+scrollY,db=$("dash").getBoundingClientRect().bottom+scrollY;
 window.scrollTo({top:db-t0<=h-16?Math.max(0,Math.min(t0-8,db-h+16)):db-h+16,behavior:SMOOTH()})}
function updGlow(){if(L.phase!="turn")return;const s=LS.steps[L.i];clearHi();
 if(s.k=="click"||L.pre){const t=L.pre?s.pre:s.t;$(t).classList.add("hi");if($(t).classList.contains("botbtn"))$(t).scrollIntoView({inline:"center",block:"nearest"});return tapBanner(t,u("tapHere"))}
 const empty=s.f.filter(f=>!$(f.t).value.trim());if(empty.length){empty.forEach(f=>$(f.t).classList.add("hi"));tapBanner(empty[0].t,u("typeHere"))}
 else{$("fb").textContent="";$(s.go).classList.add("hi");tapBanner(s.go,s.go=="send"?u("tapSend"):u("tapCreate"));const b=$(s.go).getBoundingClientRect();if(b.bottom>innerHeight)$(s.go).scrollIntoView({block:"nearest"})}}
function fb(t,ok){$("fb").className="fb "+(ok?"good":"bad");$("fb").textContent=t}
function fillEx(){if(L.phase!="turn")return;const s=LS.steps[L.i];s.f.forEach(f=>$(f.t).value=tr(f.v));clearTimeout(L.gt);updGlow();$(s.go).focus({preventScroll:true})}
const SMOOTH=()=>RM?"auto":"smooth";
/* calm scroll: only after a pause, slow, and only if needed */
function calmScroll(el,delay){clearTimeout(L.sc);const r=L.run;L.sc=setTimeout(()=>{if(r!==L.run||!el.isConnected)return;const b=el.getBoundingClientRect();if(b.top>=0&&b.bottom<=innerHeight)return;
 const target=scrollY+b.bottom-innerHeight+24;if(RM){window.scrollTo(0,target);return}const y0=scrollY,d=target-y0,t0=performance.now(),D=1200;
 const stepf=t=>{if(r!==L.run)return;const k=Math.min(1,(t-t0)/D),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;window.scrollTo(0,y0+d*e);if(k<1)requestAnimationFrame(stepf)};requestAnimationFrame(stepf)},delay)}
function success(){L.phase="ok";clearHi();$("typecard")&&$("typecard").classList.add("hidden");tapBanner(null);const last=L.i==LS.steps.length-1;fields().forEach(x=>$(x).readOnly=true);$("fb").textContent="";
 if(last){setProg(MODS[MI].id,"watch");setProg(MODS[MI].id,"try")}
 const label=last?u("finishBtn"):u("nextStep"),q=lang=="es"?"«"+label+"»":"\""+label+"\"";
 /* top card: short, no competing instruction or button */
 setStatus("ok","check",`<b>${u("okTop")}</b>`);act("");
 lockSim("dim");
 ["dunno","simple"].forEach(k=>$(k)&&$(k).classList.add("hidden"));$("fill")&&($("fill").disabled=true);
 /* feedback + the single next button sit right under the simulator, where the student is looking */
 const sd=$("stepdone");sd.innerHTML=`<div class="sd-msg">${avSVG("","sd-av react","happy")}<p><b>${u("bravo")}</b> ${u("okMsgX").replace("{b}",esc(q))}</p></div><div class="sd-act">${glowBtn("nextBtn",`${esc(label)} ${ic("arrowR")}`)}</div>`;sd.classList.remove("hidden");
 $("nextBtn").onclick=()=>{go(L.i+1);$("main").scrollIntoView({block:"start",behavior:SMOOTH()})};$("nextBtn").focus({preventScroll:true});
 calmScroll(sd,1500)}
function clickTarget(id){if(L.phase!="turn")return;const s=LS.steps[L.i];
 if(L.pre){if(id!==s.pre)return fb(u("wrong"));L.pre=false;FX[s.preFx](s);$("fb").textContent="";if(s.k=="click"){setStatus("turn","hand",`<b>${u("yourTurn")}:</b> ${u("turnClick1")}`);return updGlow()}$("typecard").classList.remove("hidden");setStatus("turn","hand",`<b>${u("yourTurn")}:</b> ${s.go=="create"?u("turnForm"):u("turnType1")}`);updGlow();fit();const f0=document.querySelector(".hi");f0&&f0.focus({preventScroll:true});return}
 if(s.k=="click"){if(id!==s.t)return fb(u("wrong"));applyFx(s,true);return success()}
 if(id!==s.go)return fb(u("wrong"));if(s.f.some(f=>!$(f.t).value.trim())){updGlow();return fb(u("empty"))}
 clearTimeout(L.gt);L.phase="busy";clearHi();tapBanner(null);if(s.fx=="send")doSend(s,false,success);else{applyFx(s,true);success()}}
function bindBots(){document.querySelectorAll(".botbtn").forEach(b=>b.onclick=()=>clickTarget(b.id))}
function bindSim(){["newBot","mkBot","create","send"].forEach(id=>$(id).onclick=()=>clickTarget(id));
 ["bname","bdesc"].forEach(id=>$(id).addEventListener("keydown",e=>{if(e.key=="Enter"){e.preventDefault();updGlow()}}));
 fields().forEach(id=>$(id).addEventListener("focus",()=>{if(L.phase=="turn"&&LS.steps[L.i].k=="click")fb(u("wrong"))}))}
/* real */
function renderReal(){const id=MODS[MI].id,ck=store.get("gbt2_checks_"+id,[]),j=store.get("gbt2_journal_"+id,{});
$("stage").innerHTML=`<div class="card"><h1>${u("realHead")}</h1><div class="note">${ic("info")}<div><b>${u("paidNote")}</b></div></div>
<div class="choice"><p>${u("choiceQ")}</p><button class="btn btn-sec" id="simPath">${ic("arrowR")} ${u("simPath")}</button></div>
<div class="check"><h2>${u("realTitle")}</h2><div id="checks">${tr(LS.real).map((c,i)=>`<label><input type="checkbox" data-i="${i}" ${ck[i]?"checked":""}><span>${esc(c)}</span></label>`).join("")}</div></div>
<div class="journal"><h2>${u("journalTitle")}</h2>${["j1","j2","j3"].map(k=>`<label for="${k}">${u(k)}</label><textarea id="${k}"></textarea>`).join("")}
<div class="row"><button class="btn btn-pri" id="saveJ">${ic("check")} ${u("save")}</button><button class="btn-link" id="resetJ">${u("reset")}</button></div><div class="fb" id="jfb" aria-live="polite"></div></div>${helpLink()}</div><div id="doneBox"></div>`;
bindHelp(u("realSimple"));$("simPath").onclick=renderSimOnly;
["j1","j2","j3"].forEach(k=>{$(k).value=j[k]||"";$(k).oninput=()=>{const d=store.get("gbt2_journal_"+id,{});d[k]=$(k).value;store.set("gbt2_journal_"+id,d)}});
$("checks").querySelectorAll("input").forEach(x=>x.onchange=()=>store.set("gbt2_checks_"+id,[...$("checks").querySelectorAll("input")].map(y=>y.checked)));
$("saveJ").onclick=()=>{const v=["j1","j2","j3"].map(k=>$(k).value.trim());if(v.some(x=>!x)){$("jfb").className="fb bad";$("jfb").textContent=u("needAll");return}
 store.set("gbt2_journal_"+id,{j1:v[0],j2:v[1],j3:v[2],at:new Date().toISOString()});setProg(id,"real");L.phase="done";setProgLine();showDone()};
let sure=false;$("resetJ").onclick=()=>{if(!sure){sure=true;$("resetJ").textContent=u("resetSure");return}sure=false;localStorage.removeItem("gbt2_journal_"+id);["j1","j2","j3"].forEach(k=>$(k).value="");$("resetJ").textContent=u("reset");$("jfb").className="fb good";$("jfb").textContent=u("resetDone")};
$("resetJ").onblur=()=>{if(sure){sure=false;$("resetJ").textContent=u("reset")}}}
function renderSimOnly(){const id=MODS[MI].id;L.phase="simonly";$("stage").innerHTML=`<div class="card"><h1>${u("simPath")}</h1><p class="lead">${u("simLead")}</p>
<div class="journal"><label for="learned">${u("learned")}</label><textarea id="learned"></textarea></div>
<div class="row"><button class="btn btn-pri" id="markSim">${ic("check")} ${u("markSim")}</button><button class="btn-link" id="backReal">${ic("arrowL")} ${u("backReal")}</button></div>${helpLink()}</div>`;
 bindHelp(u("simSimple"));$("learned").value=localStorage.getItem("gbt2_learned_"+id)||"";$("backReal").onclick=()=>{L.phase="real";renderReal()};
 $("markSim").onclick=()=>{localStorage.setItem("gbt2_learned_"+id,$("learned").value);setProg(id,"sim");L.phase="done";setProgLine();showDone()};$("main").scrollIntoView({block:"start"})}
function showDone(){const nx=MODS[MI+1],built=nx&&nx.built;updStages();if(!nx)return courseDone();
 const conf=[[8,18,"#FFC766",20,0],[18,62,"#DDE8F6",-10,.2],[28,12,"#BFDCCB",40,.4],[72,14,"#F8E4DC",10,.1],[84,58,"#FFC766",-30,.3],[92,24,"#DDE8F6",15,.5],[12,82,"#F8E4DC",30,.6],[88,84,"#BFDCCB",-20,.2]].map(([l,t,c,r,d])=>`<i style="left:${l}%;top:${t}%;background:${c};transform:rotate(${r}deg);animation-delay:${d}s"></i>`).join("");
 const recap=LS.steps.slice(0,3).map(x=>`<li>${ic("check")}<span>${esc(tr(x.cap))}</span></li>`).join("");
 $("stage").innerHTML=`<div class="card success celebrate" id="success"><div class="confetti" aria-hidden="true">${conf}</div>
<div class="cheer" aria-hidden="true">${avSVG(bn("Resumen claro"),"react","happy")}${avSVG("","react big","happy")}${avSVG(bn("Cita"),"react","wink")}</div>
<p class="badge">${ic("check")} ${u("modWord")} ${MI+1} ${u("finished")}</p><h1>${u("complete")}</h1><p class="lead" style="margin:0 auto 10px">${isReal(MODS[MI].id)?u("saved"):u("savedSim")} ${built?u("completeLead"):u("completeLast")}</p>
<ul class="recap">${recap}</ul>
<div class="row" style="justify-content:center">${built?`<a class="btn btn-pri hi" href="${nx.id}.html">${u("goNext")} ${MI+2} ${ic("arrowR")}</a>`:`<a class="btn btn-pri" href="index.html">${ic("home")} ${u("goHome")}</a>`}</div><a class="btn-link" href="index.html">${u("goHome")}</a></div>`;$("main").scrollIntoView({block:"start"})}

function courseDone(){$("stage").innerHTML=`<div class="card success final" id="success"><div class="big">${ic("star")}</div><h1>${u("courseDone")}</h1><p class="lead" style="margin:0 auto 14px">${u("courseLead")}</p>
<ul class="crit"><li>${ic("check")}<span>${u("crit1")}</span></li><li>${ic("check")}<span>${u("crit2")}</span></li></ul><p class="count" id="courseCount"><b>${u("cntReal")}: ${MODS.filter(x=>isReal(x.id)).length} / ${MODS.length}</b> · ${u("cntSim")}: ${MODS.filter(x=>isSim(x.id)&&!isReal(x.id)).length} / ${MODS.length}</p>${MODS.some(x=>isSim(x.id)&&!isReal(x.id))?`<p class="note2">${u("courseLater")}</p>`:""}<p>${u("courseEnd")}</p>
<div class="row" style="justify-content:center"><a class="btn btn-pri" href="index.html">${ic("home")} ${u("goHome")}</a></div></div>`;$("main").scrollIntoView({block:"start"})}
function renderPrivacy(){$("main").innerHTML=`<a class="crumb" href="index.html">${ic("arrowL")} ${u("home")}</a><div class="card"><div class="introcard"><div class="ill">${ic("shield")}</div><div><h1>${u("privTitle")}</h1><ul class="plain">${u("privItems").map(x=>`<li>${esc(x)}</li>`).join("")}</ul><p>${u("disclaimer")}</p></div></div></div>`}
function render404(){$("main").innerHTML=`<div class="card success"><div class="big">${ic("compass")}</div><h1>${u("nfTitle")}</h1><p class="lead" style="margin:0 auto 10px">${u("nfLead")}</p><div class="row" style="justify-content:center"><a class="btn btn-pri" href="index.html">${ic("home")} ${u("goHome")}</a></div></div>`}
function render(){header();const pg=document.body.dataset.page;if(pg=="index")renderHome();else if(pg=="intro")renderIntro();else if(pg=="privacidad")renderPrivacy();else if(pg=="404")render404();else if(pg=="novedades")renderNews();else renderLesson()}
render();

/* ---------- Novedades / What's new ---------- */
var nwTopic,nwTimers;
function fmtDate(d){return new Date(d+"T12:00:00").toLocaleDateString(lang=="es"?"es-419":"en-US",{year:"numeric",month:"long",day:"numeric"})}
function sceneMsg(m){const col=m.color||"";if(m.w=="card")return `<div class="nwcard">${esc(tr(m.t))}</div>`;
 if(m.w=="me")return `<div class="nwme"${col?` style="background:${col};color:#fff"`:""}>${m.spell?tr(m.t).split(" ").map((x,i)=>/^(Recuerdame|sita|Remnd|apointment)$/.test(x.replace(/'s$/,""))?`<span class="spell">${esc(x)}</span>`:esc(x)).join(" "):esc(tr(m.t))}</div>`;
 return `<div class="nwbotrow">${avSVG(bn(m.bot||"Mi ayudante"),"sm")}<div class="nwbot">${esc(tr(m.t))}</div></div>`}
function sceneHTML(x){return `<div class="nwsim" id="sim-${x.id}" role="img" aria-label="${u("nwSimLabel")}"><div class="nwbar">${avSVG(bn(x.scene.find(m=>m.bot)?.bot||"Mi ayudante"),"sm")}<b>${esc(bn(x.scene.find(m=>m.bot)?.bot||"Mi ayudante"))}</b></div><div class="nwmsgs">${x.scene.map(sceneMsg).join("")}</div></div>`}
function playScene(x){const box=document.querySelector(`#sim-${x.id} .nwmsgs`),items=[...box.children];clearTimeout(nwTimers[x.id]);
 const rm=matchMedia("(prefers-reduced-motion: reduce)").matches,sp=+(localStorage.getItem("gbt_speed")||1);
 items.forEach(e=>e.classList.add("nwhide"));let i=0;const b=$("show-"+x.id);b.disabled=true;
 const step=()=>{if(i<items.length){items[i].classList.remove("nwhide");items[i].classList.add("nwpop");i++;nwTimers[x.id]=setTimeout(step,rm?0:1600*sp)}else{b.disabled=false;b.innerHTML=`${ic("redo")} ${u("nwAgain")}`}};step()}
function renderNews(){nwTopic=nwTopic||"all";nwTimers=nwTimers||{};const list=[...UPDATES].sort((a,b)=>b.date.localeCompare(a.date));const used=Object.keys(TOPICS).filter(t=>list.some(x=>x.topic==t));
 const shown=list.filter(x=>nwTopic=="all"||x.topic==nwTopic);
 $("main").innerHTML=`<a class="crumb" href="index.html">${ic("arrowL")} ${u("home")}</a>
 <section class="nwhead"><div class="eyebrow">${u("nwNav")}</div><h1>${u("nwTitle")}</h1><p class="lead">${u("nwLead")}</p><p class="small muted">${u("nwChecked")}</p></section>
 ${list.length>=5?`<div class="chips" role="group" aria-label="${u("nwFilter")}"><button class="chip" data-t="all" aria-pressed="${nwTopic=="all"}">${u("nwAll")}</button>${used.map(t=>`<button class="chip" data-t="${t}" aria-pressed="${nwTopic==t}">${tr(TOPICS[t])}</button>`).join("")}</div>`:""}
 ${!list.length?`<div class="card nwempty">${ic("info")}<p>${u("nwEmpty")}</p></div>`:!shown.length?`<div class="card nwempty"><p>${u("nwNone")}</p></div>`:
 `<ol class="timeline">${shown.map(x=>`<li class="tl"><div class="tldot" aria-hidden="true"></div><article class="card nwitem" id="u-${x.id}">
  <div class="nwmeta"><time datetime="${x.date}">${fmtDate(x.date)}</time><span class="tag">${tr(TOPICS[x.topic])}</span><span class="small muted">${u("nwVer")} ${x.version}</span></div>
  <h2>${esc(tr(x.title))}</h2>
  <div class="nwgrid"><div><h3>${u("nwWhat")}</h3><p>${esc(tr(x.what))}</p><h3>${u("nwWhy")}</h3><p>${esc(tr(x.why))}</p>
   <div class="nwex"><div class="nwexl">${ic("chat")} ${u("nwEx")}</div><blockquote>“${esc(tr(x.example))}”</blockquote></div></div>
   <div>${sceneHTML(x)}${x.demo?`<button class="btn btn-sec nwshow" id="show-${x.id}">${ic("play")} ${u("nwShow")}</button>`:""}</div></div>
  <div class="nwfoot"><button class="btn-link small" id="dunno-${x.id}">${ic("help")} ${u("dunno")}</button><a class="small srclink" href="${x.src}" target="_blank" rel="noopener">${u("nwSrc")} ↗</a></div>
  <div class="simple hidden" id="simple-${x.id}" aria-live="polite"></div></article></li>`).join("")}</ol>`}`;
 document.querySelectorAll(".chip").forEach(c=>c.onclick=()=>{nwTopic=c.dataset.t;renderNews();document.querySelector(`.chip[data-t=${nwTopic}]`).focus()});
 shown.forEach(x=>{$("dunno-"+x.id).onclick=()=>simpleBox("simple-"+x.id,tr(x.simple));if(x.demo)$("show-"+x.id).onclick=()=>playScene(x)})}
