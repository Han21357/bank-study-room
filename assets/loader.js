(async()=>{
 const main=document.getElementById('main');
 if(main)main.innerHTML='<p style="padding:30px;font-size:20px">正在打开备考资料…</p>';
 try{
  let text;
  if(typeof DecompressionStream!=='undefined'){
   const r=await fetch('assets/study-data.json.gz');if(!r.ok)throw Error('无法加载资料');
   const bytes=new Uint8Array(await r.arrayBuffer());
   text=bytes[0]===31&&bytes[1]===139?await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).text():new TextDecoder().decode(bytes);
  }else{const r=await fetch('assets/study-data.json');if(!r.ok)throw Error('无法加载资料');text=await r.text()}
  JSON.parse(text);document.getElementById('studyData').textContent=text;
  await new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='assets/app.js';s.onload=resolve;s.onerror=reject;document.body.appendChild(s)});
  document.addEventListener('click',e=>{const a=e.target.closest('a');if(a&&a.getAttribute('href')==='#local-reference'){e.preventDefault();alert('原资料文件保留在本地。本站的知识、模拟题、解析及已收录原页可直接阅读。')}},true);
  if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
 }catch(e){if(main){main.innerHTML='<p style="padding:30px;font-size:20px">资料暂时未能打开，请刷新重试。</p>';console.error(e)}}
})();
