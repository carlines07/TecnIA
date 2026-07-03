<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Resumidor de apuntes con IA dinámica | TecnIA</title>
<meta name="description" content="Resumidor dinámico de TecnIA: interpreta apuntes con IA real y los convierte en material de estudio claro, ordenado y completo.">
<link rel="canonical" href="https://tecniaia.com/resumidor-apuntes-ia.html">
<link rel="stylesheet" href="style.css">
<style>
.hero{margin:42px auto 34px;padding:70px 42px;border-radius:42px;color:#fff;background:linear-gradient(135deg,#07111f,#0f172a 48%,#111827);box-shadow:0 34px 90px rgba(15,23,42,.28)}
.hero h1{color:#fff;font-size:clamp(2.4rem,6vw,5rem);line-height:1;letter-spacing:-2px;margin:18px 0 20px}
.hero p{max-width:940px;color:#dbeafe;line-height:1.85;font-size:1.14rem}
.layout{display:grid;grid-template-columns:minmax(360px,.92fr) minmax(0,1.08fr);gap:28px;align-items:start}
.panel,.info-card{background:#fff;border:1px solid #dbeafe;border-radius:30px;padding:30px;box-shadow:0 18px 45px rgba(15,23,42,.08)}
.helper{color:#64748b;line-height:1.65}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.field{display:grid;gap:8px}.field.full{grid-column:1/-1}.field label{font-weight:900;color:#0f172a;font-size:.94rem}
.field input,.field select,.field textarea{width:100%;border:1px solid #cbd5e1;border-radius:16px;padding:13px 14px;font:inherit;color:#0f172a;background:#fff}
.file-drop{position:relative;display:grid;place-items:center;min-height:150px;padding:24px;text-align:center;border:2px dashed #93c5fd;border-radius:24px;background:linear-gradient(135deg,#eff6ff,#f8fafc);cursor:pointer}
.file-drop input{position:absolute;inset:0;opacity:0;cursor:pointer}.file-drop strong{display:block;color:#0f172a;font-size:1.1rem;margin-bottom:8px}
.file-drop span{display:block;color:#475569;line-height:1.55}.file-list{display:grid;gap:10px;margin-top:14px}
.file-item{display:flex;justify-content:space-between;gap:12px;align-items:center;padding:12px 14px;border-radius:16px;background:#f8fafc;border:1px solid #e2e8f0;color:#334155;font-size:.92rem}
.file-status{font-weight:900;color:#1d4ed8;white-space:nowrap}.actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:22px}
.status-box{display:none;margin-top:18px;padding:16px 18px;border-radius:20px;background:#eff6ff;border:1px solid #bfdbfe;color:#1e3a8a;font-weight:800;line-height:1.5}
.status-box.active{display:block}.status-box.error{display:block;background:#fff7ed;border-color:#fed7aa;color:#7c2d12}
.empty{color:#64748b;background:#f8fafc;border:1px dashed #cbd5e1;border-radius:20px;padding:22px;line-height:1.7}
#tecniaResultOverlay{display:none;position:fixed;inset:0;z-index:9999}#tecniaResultOverlay.active{display:block}
.tecnia-result-backdrop{position:absolute;inset:0;background:rgba(15,23,42,.68);backdrop-filter:blur(5px)}
.tecnia-result-window{position:relative;z-index:2;width:min(1240px,calc(100vw - 32px));max-height:calc(100vh - 36px);margin:18px auto;padding:30px;border-radius:32px;background:#fff;box-shadow:0 30px 90px rgba(15,23,42,.35);overflow:auto}
.tecnia-result-close{position:sticky;top:0;float:right;z-index:3;border:0;border-radius:999px;background:#0f172a;color:#fff;padding:10px 15px;font-weight:900;cursor:pointer}
.result-title h2{margin:0 0 10px;color:#0f172a;font-size:clamp(1.9rem,4vw,3rem);letter-spacing:-1px}.result-title p{color:#475569;line-height:1.7;margin:0}
.dashboard{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin:24px 0}.dash-card{padding:18px;border-radius:20px;background:linear-gradient(135deg,#eff6ff,#f8fafc);border:1px solid #dbeafe}
.dash-card span{display:block;color:#64748b;font-size:.78rem;font-weight:950;text-transform:uppercase;margin-bottom:6px}.dash-card strong{display:block;color:#0f172a}
.summary-nav{display:flex;gap:10px;flex-wrap:wrap;margin:20px 0 24px}.summary-nav a{text-decoration:none;padding:9px 12px;border-radius:999px;background:#f8fafc;border:1px solid #dbeafe;color:#1d4ed8;font-weight:900;font-size:.9rem}
.section-block{margin-top:24px;border:1px solid #dbeafe;border-radius:28px;background:#fff;overflow:hidden;box-shadow:0 12px 32px rgba(15,23,42,.07)}
.section-head{background:#0f172a;color:#fff;padding:18px 20px;display:flex;justify-content:space-between;gap:16px;align-items:center}.section-head h3{margin:0;color:#fff;font-size:1.18rem}
.section-head span{background:rgba(20,184,166,.16);border:1px solid rgba(20,184,166,.3);color:#99f6e4;border-radius:999px;padding:6px 10px;font-weight:900;font-size:.78rem;white-space:nowrap}
.section-body{padding:22px;background:#f8fafc}.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.study-card{border:1px solid #e2e8f0;border-radius:22px;padding:18px;background:#fff;color:#334155;line-height:1.72}.study-card h4{margin:0 0 8px;color:#0f172a}
.study-card ul{margin:8px 0 0 20px;padding:0}.topic-card{border:1px solid #dbeafe;border-radius:24px;background:#fff;overflow:hidden;margin-bottom:16px}.topic-title{padding:16px 18px;background:#f1f5f9;border-bottom:1px solid #e2e8f0;color:#0f172a;font-weight:950}.topic-content{padding:18px}
.concept-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.concept-card{border:1px solid #dbeafe;border-radius:22px;background:#fff;padding:18px;line-height:1.72}.tag{display:inline-flex;padding:6px 10px;border-radius:999px;background:#eff6ff;border:1px solid #bfdbfe;color:#1d4ed8;font-size:.78rem;font-weight:950;margin-bottom:10px}
.case-box{border:1px solid #c7d2fe;background:#eef2ff;color:#312e81;border-radius:22px;padding:18px;line-height:1.72}.success-box,.warning-box{margin-top:18px;padding:18px;border-radius:22px;line-height:1.65}.success-box{border:1px solid #bbf7d0;background:#f0fdf4;color:#166534}.warning-box{border:1px solid #fed7aa;background:#fff7ed;color:#7c2d12}
@media(max-width:1080px){.layout,.dashboard,.grid-2,.concept-grid{grid-template-columns:1fr}}@media(max-width:760px){.hero{border-radius:30px}.form-grid{grid-template-columns:1fr}.panel,.info-card{padding:22px}.tecnia-result-window{padding:20px}}
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js"></script>
</head>
<body>
<header><div class="container navbar"><a href="index.html" class="logo">Tecn<span>IA</span></a><nav><ul class="nav-links"><li><a href="index.html">Inicio</a></li><li><a href="herramientas-interactivas.html">Herramientas</a></li><li><a href="ia-para-estudiar.html">Estudiar con IA</a></li><li><a href="articulos.html">Guías</a></li></ul></nav></div></header>

<main>
<section class="container"><div class="hero"><div class="hero-kicker">Resumidor dinámico con IA real</div><h1>Convierte apuntes difíciles en una guía impecable para estudiar</h1><p>Esta versión ya no depende de reglas estáticas. Envía tus apuntes a una API segura de Vercel, que usa IA real para interpretar, ordenar, explicar y transformar el contenido.</p><div class="hero-actions"><a href="#tool" class="btn btn-primary">Crear resumen dinámico</a><a href="generador-flashcards-ia.html" class="btn btn-outline">Crear flashcards después</a></div></div></section>

<article class="container">
<section class="info-card"><span class="article-tag">IA real · Orden · Vocabulario académico · Sin paja</span><h2>Qué hace diferente esta versión</h2><p class="helper">La clave no está en el HTML ni en GitHub. Se usa desde Vercel como variable de entorno.</p></section>

<section id="tool" class="layout" style="margin-top:32px;">
<div class="panel">
<h2>Crear resumen con IA</h2><p class="helper">Sube o pega tus apuntes. Cuanto más claro sea el material, mejor será el resumen.</p>
<form id="summaryForm" onsubmit="event.preventDefault();generateSummary();"><div class="form-grid">
<div class="field"><label for="subject">Asignatura</label><input id="subject" type="text" placeholder="Ej: Derecho Civil"></div>
<div class="field"><label for="area">Área</label><select id="area"><option>Detectar automáticamente</option><option>Derecho</option><option>Economía</option><option>Historia</option><option>Lengua / Literatura</option><option>Anatomía</option><option>Biología</option><option>Medicina</option><option>Fisiología</option><option>Psicología</option><option>Sociología</option><option>Contabilidad</option><option>General</option></select></div>
<div class="field"><label for="profundidad">Profundidad</label><select id="profundidad"><option value="premium">Premium ordenado</option><option value="ultra">Ultra detallado</option><option value="repaso">Repaso limpio</option></select></div>
<div class="field"><label for="objetivo">Objetivo</label><select id="objetivo"><option value="sacar un 10">Aspirar al 10</option><option value="examen tipo test">Examen tipo test</option><option value="preguntas de desarrollo">Desarrollo</option><option value="casos prácticos">Casos prácticos</option></select></div>
<div class="field full"><label>Adjuntar apuntes</label><div class="file-drop"><input id="studyFiles" type="file" multiple accept=".txt,.md,.csv,.html,.htm,.pdf,.docx"><div><strong>Arrastra archivos aquí o pulsa para seleccionarlos</strong><span>TXT, MD, CSV, HTML, PDF o DOCX.</span></div></div><div id="fileList" class="file-list"></div></div>
<div class="field full"><label for="notes">Apuntes o temario</label><textarea id="notes" rows="13" placeholder="Pega aquí tus apuntes completos..."></textarea></div>
<div class="field full"><label for="conceptosClave">Conceptos que no pueden fallar</label><textarea id="conceptosClave" rows="3" placeholder="Ej: capacidad jurídica, capacidad de obrar, menores emancipados, art. 247..."></textarea></div>
</div><div class="actions"><button id="generateBtn" type="submit" class="btn btn-primary">Crear resumen dinámico</button><button type="button" class="btn btn-outline" onclick="copyOutput()">Copiar resumen</button><button type="button" class="btn btn-outline" onclick="resetTool()">Limpiar</button></div><div id="statusBox" class="status-box"></div><div id="copyNote" style="display:none;margin-top:12px;color:#16a34a;font-weight:900">Copiado.</div></form>
</div>
<div class="panel" id="preview"><h2>Resultado</h2><div class="empty">El resumen se abrirá en grande cuando la IA termine. Puede tardar unos segundos.</div></div>
</section></article></main>

<footer><div class="container"><p>&copy; 2026 TecnIA. Todos los derechos reservados.</p></div></footer>

<script>
let lastOutput="";
document.addEventListener("DOMContentLoaded",()=>{if(window.pdfjsLib){pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"}document.getElementById("studyFiles").addEventListener("change",e=>handleFiles(e.target.files))});
function v(id){return document.getElementById(id)?.value.trim()||""}
function clean(t){return String(t||"").replace(/\r/g,"\n").replace(/MODO PRECISI[OÓ]N 10\/10 TECNIA[\s\S]*$/i,"").replace(/Datos que no pueden faltar[\s\S]*?(?=\n\n|$)/gi,"").replace(/Fuentes fiables[\s\S]*?(?=\n\n|$)/gi,"").replace(/[ \t]+/g," ").replace(/\n{3,}/g,"\n\n").trim()}
async function handleFiles(files){const list=document.getElementById("fileList"),notes=document.getElementById("notes");for(const file of files){const item=document.createElement("div");item.className="file-item";item.innerHTML=`<span>${esc(file.name)}</span><span class="file-status">Leyendo...</span>`;list.appendChild(item);try{const text=clean(await extractText(file));notes.value=clean(notes.value+"\n\n"+text);item.querySelector(".file-status").textContent="Leído"}catch(e){item.querySelector(".file-status").textContent="No leído"}}}
async function extractText(file){const name=file.name.toLowerCase();if(name.endsWith(".pdf"))return pdfText(file);if(name.endsWith(".docx"))return docxText(file);return file.text()}
async function pdfText(file){if(!window.pdfjsLib)throw new Error("No se pudo cargar PDF");const pdf=await pdfjsLib.getDocument({data:await file.arrayBuffer()}).promise;let out="";for(let i=1;i<=pdf.numPages;i++){const page=await pdf.getPage(i);const content=await page.getTextContent();out+="\n\nPágina "+i+"\n"+content.items.map(x=>x.str).join(" ")}return out}
async function docxText(file){if(!window.mammoth)throw new Error("No se pudo cargar DOCX");const result=await mammoth.extractRawText({arrayBuffer:await file.arrayBuffer()});return result.value||""}

async function generateSummary(){
 const apuntes=clean(v("notes")); if(apuntes.split(/\s+/).length<80){showStatus("Pega apuntes más completos para poder generar un resumen útil.",true);return}
 const btn=document.getElementById("generateBtn"); btn.disabled=true; btn.textContent="Generando con IA..."; showStatus("La IA está interpretando los apuntes. Puede tardar unos segundos.",false);
 try{
  const response=await fetch("/api/resumir",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({asignatura:v("subject")||"Asignatura",area:v("area"),profundidad:v("profundidad"),objetivo:v("objetivo"),conceptosClave:v("conceptosClave"),apuntes})});
  const data=await response.json(); if(!response.ok)throw new Error(data.error||"Error generando el resumen.");
  lastOutput=plainText(data); openResult(renderSummary(data)); document.getElementById("preview").innerHTML=`<h2>Resumen generado</h2><div class="empty">Resumen dinámico generado correctamente con IA.</div>`; showStatus("Resumen generado correctamente.",false);
 }catch(error){showStatus(error.message||"Error generando el resumen.",true)}
 finally{btn.disabled=false;btn.textContent="Crear resumen dinámico"}
}
function renderSummary(data){const bloques=arr(data.bloques),conceptos=arr(data.conceptosClave),comparaciones=arr(data.comparaciones),casos=arr(data.casosPracticos),errores=arr(data.erroresTipicos),preguntas=arr(data.preguntasExamen),checklist=arr(data.checklist10),revision=arr(data.terminosParaRevisar);return `<button class="tecnia-result-close" onclick="closeTecnIAResult()">Cerrar ×</button><div class="result-title"><h2>${esc(data.titulo||"Resumen dinámico")}</h2><p>Área aplicada: <strong>${esc(data.areaAplicada||v("area"))}</strong>. Resumen generado dinámicamente con IA.</p></div><div class="dashboard"><div class="dash-card"><span>Bloques</span><strong>${bloques.length}</strong></div><div class="dash-card"><span>Conceptos</span><strong>${conceptos.length}</strong></div><div class="dash-card"><span>Casos</span><strong>${casos.length}</strong></div><div class="dash-card"><span>Modo</span><strong>Dinámico</strong></div></div><div class="summary-nav"><a href="#ejecutivo">Resumen ejecutivo</a><a href="#bloques">Bloques</a><a href="#conceptos">Conceptos</a><a href="#comparaciones">Comparaciones</a><a href="#casos">Casos</a><a href="#errores">Errores</a><a href="#preguntas">Preguntas</a><a href="#checklist">Checklist</a></div>${section("ejecutivo","1. Resumen ejecutivo","visión global",`<div class="grid-2">${arr(data.resumenEjecutivo).map((x,i)=>card(`${i+1}. Idea clave`,x)).join("")}</div>`)}${section("bloques","2. Temario ordenado por bloques","estructura",bloques.map(blockHtml).join(""))}${section("conceptos","3. Conceptos clave explicados","precisión",`<div class="concept-grid">${conceptos.map(conceptHtml).join("")}</div>`)}${section("comparaciones","4. Comparaciones importantes","diferencias",comparaciones.length?`<div class="grid-2">${comparaciones.map(c=>card(c.titulo||"Comparación",c.diferencia||"")).join("")}</div>`:empty("No se han detectado comparaciones específicas."))}${section("casos","5. Casos prácticos o aplicaciones","razonamiento",casos.length?`<div class="grid-2">${casos.map(caseHtml).join("")}</div>`:empty("No se han generado casos específicos."))}${section("errores","6. Errores típicos","evitar fallos",errores.length?`<div class="grid-2">${errores.map(e=>card(e.error||"Error",e.correccion||"")).join("")}</div>`:empty("No se han detectado errores típicos."))}${section("preguntas","7. Preguntas probables de examen","práctica",preguntas.length?`<div class="study-card"><ul>${preguntas.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>`:empty("No se han generado preguntas."))}${section("checklist","8. Checklist para aspirar al 10","control final",checklist.length?`<div class="study-card"><ul>${checklist.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>`:empty("No se ha generado checklist."))}${revision.length?`<div class="warning-box"><strong>Términos para revisar:</strong><br>${revision.map(esc).join(", ")}</div>`:`<div class="success-box"><strong>Sin términos dudosos relevantes.</strong></div>`}`}
function section(id,title,label,html){return `<section class="section-block" id="${id}"><div class="section-head"><h3>${esc(title)}</h3><span>${esc(label)}</span></div><div class="section-body">${html}</div></section>`}
function blockHtml(b,i){return `<div class="topic-card"><div class="topic-title">${i+1}. ${esc(b.titulo||"Bloque")}</div><div class="topic-content">${b.ideaCentral?`<div class="big-idea"><strong>Idea central</strong>${esc(b.ideaCentral)}</div>`:""}<div class="grid-2">${card("Explicación",listOrText(b.explicacion))}${card("No puede faltar",listOrText(b.noPuedeFaltar))}${card("Matices",listOrText(b.matices))}${card("Ejemplo aplicado",b.ejemploAplicado||"")}</div></div></div>`}
function conceptHtml(c){return `<div class="concept-card"><span class="tag">${esc(c.concepto||"Concepto")}</span><h4>Definición</h4><p>${esc(c.definicion||"")}</p><h4>Explicación</h4><p>${esc(c.explicacion||"")}</p><h4>Matiz de examen</h4><p>${esc(c.matizDeExamen||"")}</p><h4>Diferencia clave</h4><p>${esc(c.diferenciaCon||"")}</p></div>`}
function caseHtml(c){return `<div class="case-box"><strong>${esc(c.titulo||"Caso práctico")}</strong><p>${esc(c.supuesto||"")}</p><p><strong>Solución:</strong> ${esc(c.solucion||"")}</p></div>`}
function card(t,c){return `<div class="study-card"><h4>${esc(t)}</h4>${String(c).startsWith("<")?c:`<p>${esc(c||"")}</p>`}</div>`}
function listOrText(v){const a=arr(v);return a.length?`<ul>${a.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`:esc(v||"")}
function empty(t){return `<div class="empty">${esc(t)}</div>`}function arr(x){return Array.isArray(x)?x:(x?[x]:[])}
function plainText(data){const lines=[data.titulo||"Resumen dinámico","Área: "+(data.areaAplicada||""),""];arr(data.resumenEjecutivo).forEach((x,i)=>lines.push(`${i+1}. ${x}`));arr(data.bloques).forEach((b,i)=>{lines.push(`\nBLOQUE ${i+1}: ${b.titulo||""}`);if(b.ideaCentral)lines.push("Idea central: "+b.ideaCentral);arr(b.explicacion).forEach(x=>lines.push("- "+x));arr(b.noPuedeFaltar).forEach(x=>lines.push("No puede faltar: "+x));arr(b.matices).forEach(x=>lines.push("Matiz: "+x));if(b.ejemploAplicado)lines.push("Ejemplo: "+b.ejemploAplicado)});return lines.join("\n")}
function showStatus(m,e){const box=document.getElementById("statusBox");box.textContent=m;box.className="status-box active"+(e?" error":"")}
function openResult(html){let overlay=document.getElementById("tecniaResultOverlay");if(!overlay){overlay=document.createElement("div");overlay.id="tecniaResultOverlay";overlay.innerHTML=`<div class="tecnia-result-backdrop" onclick="closeTecnIAResult()"></div><div class="tecnia-result-window" id="tecniaResultContent"></div>`;document.body.appendChild(overlay)}document.getElementById("tecniaResultContent").innerHTML=html;overlay.classList.add("active");document.body.style.overflow="hidden"}
function closeTecnIAResult(){const overlay=document.getElementById("tecniaResultOverlay");if(overlay)overlay.classList.remove("active");document.body.style.overflow=""}
async function copyOutput(){await navigator.clipboard.writeText(lastOutput||"Todavía no has generado resumen.");const n=document.getElementById("copyNote");n.style.display="block";setTimeout(()=>n.style.display="none",2200)}
function resetTool(){document.getElementById("summaryForm").reset();document.getElementById("fileList").innerHTML="";document.getElementById("statusBox").className="status-box";lastOutput="";document.getElementById("preview").innerHTML=`<h2>Resultado</h2><div class="empty">El resumen se abrirá en grande cuando la IA termine. Puede tardar unos segundos.</div>`}
function esc(t){return String(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}
</script>
<script src="tecnia-memory.js"></script>
<script src="tecnia-quality.js"></script>
</body>
</html>
