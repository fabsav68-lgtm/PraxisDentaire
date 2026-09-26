// ═══════════════════════════════════════════════════════
//  praxis-tracking.js — journalisation partagée des ouvertures de module
//  Alimente la table connexions_historique (même projet Supabase que
//  verifier-acces), utilisée ensuite pour le score binôme.
//  Ne journalise que si un code étudiant est présent en session —
//  aucune donnée envoyée pour une simple visite non authentifiée.
// ═══════════════════════════════════════════════════════

(function(){
  var SB_URL = 'https://fvrfiikrasezlzpaxpqz.supabase.co';
  var SB_KEY = 'sb_publishable_TNksbociGaWCY53M4wCAXg_faOxEqKt';

  window.logOuverture = function(module){
    var code = sessionStorage.getItem('praxisdentaire_code');
    if(!code) return;
    fetch(SB_URL + '/rest/v1/connexions_historique', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SB_KEY,
        'Authorization': 'Bearer ' + SB_KEY,
      },
      body: JSON.stringify({
        student_code: code,
        app: 'PraxisDentaire',
        module: module,
        step: 'ouverture',
        session_id: code + '_' + module + '_' + Date.now(),
      }),
    }).catch(function(){});
  };
})();
