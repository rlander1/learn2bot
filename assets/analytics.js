/* Learn2Bot analytics (GA4 + consent). NOT deployed until GA_ID is real. */
(function(){
var GA_ID="G-VWH52X841D"; // <-- reemplazar con el ID real de GA4
if(!/^G-[A-Z0-9]{6,}$/.test(GA_ID)||GA_ID==="G-XXXXXXXXXX")return;
var K="l2b_consent",lang=(localStorage.getItem("gbt2_lang")||"es");
var T={es:{t:"¿Nos ayudas a mejorar?",d:"Con tu permiso usamos Google Analytics para contar visitas y saber qué lecciones se usan. Tu progreso sigue guardado solo en tu aparato.",y:"Sí, acepto",n:"No, gracias",p:"Más información"},
en:{t:"Will you help us improve?",d:"With your permission we use Google Analytics to count visits and see which lessons are used. Your progress stays only on your device.",y:"Yes, I agree",n:"No, thanks",p:"Learn more"}}[lang]||null;
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;
gtag("consent","default",{analytics_storage:"denied",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"});
function load(){var s=document.createElement("script");s.async=1;s.src="https://www.googletagmanager.com/gtag/js?id="+GA_ID;document.head.appendChild(s);gtag("js",new Date());gtag("config",GA_ID,{anonymize_ip:true});}
function grant(){gtag("consent","update",{analytics_storage:"granted"});load();}
var c=localStorage.getItem(K);
if(c==="yes"){grant();return}if(c==="no")return;
var b=document.createElement("div");b.className="consent";b.setAttribute("role","dialog");b.setAttribute("aria-label",T.t);
b.innerHTML='<p><b>'+T.t+'</b><br>'+T.d+' <a href="privacidad.html">'+T.p+'</a></p><div class="consent-btns"><button class="btn" data-c="yes">'+T.y+'</button><button class="btn-link" data-c="no">'+T.n+'</button></div>';
b.onclick=function(e){var v=e.target.getAttribute("data-c");if(!v)return;localStorage.setItem(K,v);b.remove();if(v==="yes")grant();};
document.body.appendChild(b);
})();
