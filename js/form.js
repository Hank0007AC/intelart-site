/* ═══════════════════════════════════════════════
   INTELART — Form Validation + Backend Submission
   Loaded defer on contact.html & offre-surmesure.html only
   Depends on: C object and lang variable from main.js
   ═══════════════════════════════════════════════ */
let lastSubmitTime = 0;
const SUBMIT_COOLDOWN = 3000;

/* ─── CSRF: fetch token from API and inject into forms ─── */
function fetchCsrfToken(){
  return fetch('/api/csrf-token.php',{credentials:'same-origin'})
    .then(r=>r.json())
    .then(data=>{
      document.querySelectorAll('input[name="csrf_token"]').forEach(el=>{
        el.value = data.token;
      });
      return data.token;
    })
    .catch(err=>{ console.error('CSRF fetch failed:',err); });
}

/* ─── FIELD VALIDATION ─── */
function validateField(input){
  const ct = C[lang].contact;
  const val = input.value.trim();
  if(input.required && !val){
    input.classList.remove('valid');
    input.classList.add('invalid');
    const err = input.parentElement.querySelector('.field-error');
    if(err) err.textContent = ct.errRequired;
    return false;
  }
  if(input.type==='email' && val){
    const emailRe = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    if(!emailRe.test(val)){
      input.classList.remove('valid');
      input.classList.add('invalid');
      const err = input.parentElement.querySelector('.field-error');
      if(err) err.textContent = ct.errEmail;
      return false;
    }
  }
  if(input.maxLength > 0 && val.length > input.maxLength){
    input.classList.remove('valid');
    input.classList.add('invalid');
    const err = input.parentElement.querySelector('.field-error');
    if(err) err.textContent = (ct.errMaxLength || 'Maximum '+input.maxLength+' characters');
    return false;
  }
  if(val){
    input.classList.remove('invalid');
    input.classList.add('valid');
  } else {
    input.classList.remove('invalid','valid');
  }
  return true;
}

/* ─── Auto-attach blur/input listeners + fetch CSRF on load ─── */
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.fi,.fta').forEach(input=>{
    input.addEventListener('blur',()=>validateField(input));
    input.addEventListener('input',()=>{
      if(input.classList.contains('invalid')) validateField(input);
    });
  });

  document.querySelectorAll('.fsel').forEach(sel=>{
    sel.addEventListener('change',()=>{
      if(sel.value && sel.selectedIndex > 0){
        sel.classList.remove('invalid');
        sel.classList.add('valid');
      }
    });
  });

  /* Form submit listeners */
  const contactForm = document.getElementById('contact-form');
  if(contactForm) contactForm.addEventListener('submit', submitForm);

  const smForm = document.getElementById('sm-form');
  if(smForm) smForm.addEventListener('submit', submitSurMesure);

  /* Fetch CSRF token from API */
  fetchCsrfToken();
});

/* ─── CONTACT FORM SUBMIT ─── */
async function submitForm(e){
  e.preventDefault();
  if(Date.now() - lastSubmitTime < SUBMIT_COOLDOWN) return;
  lastSubmitTime = Date.now();
  await fetchCsrfToken();
  const ct = C[lang].contact;
  const fields = [
    document.getElementById('fi-fn'),
    document.getElementById('fi-ln'),
    document.getElementById('fi-em')
  ];
  let valid = true;
  fields.forEach(f=>{ if(f && !validateField(f)) valid=false; });
  if(!valid) return;

  const btn = document.getElementById('form-submit-btn');
  btn.textContent = ct.sendingBtn;
  btn.disabled = true;
  btn.style.opacity = '.6';

  const formData = new FormData(e.target);
  formData.set('first_name', (document.getElementById('fi-fn')||{}).value||'');
  formData.set('last_name', (document.getElementById('fi-ln')||{}).value||'');
  formData.set('email', (document.getElementById('fi-em')||{}).value||'');
  formData.set('company', (document.getElementById('fi-co')||{}).value||'');
  formData.set('need', (document.getElementById('form-select')||{}).value||'');
  formData.set('message', (document.getElementById('fi-msg')||{}).value||'');
  formData.set('lang', lang || 'fr');

  fetch('/api/contact.php',{method:'POST',body:formData,credentials:'same-origin'})
    .then(r=>r.json())
    .then(data=>{
      if(data.success){
        e.target.reset();
        e.target.style.display='none';
        const ok=document.getElementById('form-ok');
        ok.textContent=ct.successMsg;
        ok.style.display='block';
      } else {
        btn.textContent = ct.submitBtn || 'Envoyer';
        btn.disabled = false;
        btn.style.opacity = '1';
        const errMsg = lang==='fr' ? 'Erreur d\'envoi. Réessayez.' : 'Send error. Please retry.';
        alert(errMsg);
      }
    })
    .catch(()=>{
      btn.textContent = ct.submitBtn || 'Envoyer';
      btn.disabled = false;
      btn.style.opacity = '1';
      const errMsg = lang==='fr' ? 'Erreur réseau. Réessayez.' : 'Network error. Please retry.';
      alert(errMsg);
    });
}

/* ─── SUR MESURE RADIO ─── */
function selectRadio(el){
  el.parentElement.querySelectorAll('.radio-opt').forEach(o=>o.classList.remove('selected'));
  el.classList.add('selected');
}

/* ─── SUR MESURE FORM SUBMIT ─── */
async function submitSurMesure(e){
  e.preventDefault();
  if(Date.now() - lastSubmitTime < SUBMIT_COOLDOWN) return;
  lastSubmitTime = Date.now();
  await fetchCsrfToken();
  const sm = C[lang].offreSurMesure;
  const ct = C[lang].contact;
  const fields = [
    document.getElementById('sm-name'),
    document.getElementById('sm-email'),
    document.getElementById('sm-company'),
    document.getElementById('sm-desc')
  ];
  let valid = true;
  fields.forEach(f=>{ if(f && !validateField(f)) valid=false; });
  if(!valid) return;

  const btn = document.getElementById('sm-submit-btn');
  btn.textContent = sm.sendingBtn;
  btn.disabled = true;
  btn.style.opacity = '.6';

  const formData = new FormData(e.target);
  formData.set('name', (document.getElementById('sm-name')||{}).value||'');
  formData.set('email', (document.getElementById('sm-email')||{}).value||'');
  formData.set('company', (document.getElementById('sm-company')||{}).value||'');
  formData.set('sector', (document.getElementById('sm-sector')||{}).value||'');
  formData.set('description', (document.getElementById('sm-desc')||{}).value||'');
  formData.set('budget', (document.getElementById('sm-budget')||{}).value||'');
  formData.set('delay', (document.getElementById('sm-delay')||{}).value||'');
  const selectedRadio = document.querySelector('.radio-opt.selected');
  formData.set('ai_option', selectedRadio ? selectedRadio.textContent : '');
  formData.set('lang', lang || 'fr');

  fetch('/api/surmesure.php',{method:'POST',body:formData,credentials:'same-origin'})
    .then(r=>r.json())
    .then(data=>{
      if(data.success){
        e.target.reset();
        e.target.style.display='none';
        const ok=document.getElementById('sm-form-ok');
        ok.textContent=sm.successMsg;
        ok.style.display='block';
      } else {
        btn.textContent = sm.submitBtn || 'Envoyer';
        btn.disabled = false;
        btn.style.opacity = '1';
        const errMsg = lang==='fr' ? 'Erreur d\'envoi. Réessayez.' : 'Send error. Please retry.';
        alert(errMsg);
      }
    })
    .catch(()=>{
      btn.textContent = sm.submitBtn || 'Envoyer';
      btn.disabled = false;
      btn.style.opacity = '1';
      const errMsg = lang==='fr' ? 'Erreur réseau. Réessayez.' : 'Network error. Please retry.';
      alert(errMsg);
    });
}
