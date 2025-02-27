/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable no-undef */
const rollCombatAutre = ['repeating_armeautre:armeautre'];

rollCombatAutre.forEach((button) => {
  on(`clicked:${button}`, async (info) => {
    const roll = info.htmlAttributes.value;

    let listAttrs = [];

    const id = info.triggerName.split('_')[2];

    const prefix = `repeating_armeautre_${id}_`;

    const effet = wpnEffects.map((a) => `${prefix}${a}`);
    const effetValue = wpnEffectsValue.map((a) => `${prefix}${a}`);
    const AA = wpnAmeliorationA.map((a) => `${prefix}${a}`);
    const AAValue = wpnAmeliorationAValue.map((a) => `${prefix}${a}`);
    const special = wpnSpecial.map((a) => `${prefix}${a}`);
    const specialValue = wpnSpecialValue.map((a) => `${prefix}${a}`);

    listAttrs.push(`${prefix}ArmeAutre`);
    listAttrs.push(`${prefix}armeAutrePortee`);

    listAttrs.push(`${prefix}armeODAutre`);
    listAttrs.push(`${prefix}armeAttaqueAutre`);

    listAttrs.push(`${prefix}armeAutreDegat`);
    listAttrs.push(`${prefix}armeAutreViolence`);

    listAttrs.push(`${prefix}armeAutreBDegat`);
    listAttrs.push(`${prefix}armeAutreBViolence`);

    listAttrs = listAttrs.concat(effet, effetValue, AA, AAValue, special, specialValue);

    const attrs = await getAttrsAsync(listAttrs);

    const name = attrs[`${prefix}ArmeAutre`] || '';
    const portee = attrs[`${prefix}armeAutrePortee`] || '^{portee-contact}';

    let firstExec = [];
    let exec = [];
    firstExec.push(roll);

    firstExec.push(`{{special1=${name}}}`);
    firstExec.push(`{{portee=^{portee} ${portee}}}`);

    let isConditionnelA = false;
    let isConditionnelD = false;
    let isConditionnelV = false;

    const OD = Number(attrs[`${prefix}armeODAutre`]) || 0;

    const cRoll = [
      Number(attrs[`${prefix}armeAttaqueAutre`]) || 0,
    ];

    let bonus = [
      OD,
    ];

    let diceDegats = 0;
    let diceViolence = 0;

    let bDegats = [];
    const bViolence = [];

    diceDegats += Number(attrs[`${prefix}armeAutreDegat`]) || 0;
    diceViolence += Number(attrs[`${prefix}armeAutreViolence`]) || 0;

    bDegats.push(Number(attrs[`${prefix}armeAutreBDegat`]) || 0);
    bViolence.push(Number(attrs[`${prefix}armeAutreBViolence`]) || 0);

    let degats = [];
    let violence = [];

    let attaquesSurprises = [];
    let attaquesSurprisesValue = [];
    let attaquesSurprisesCondition = '';

    let eASAssassin = '';
    let eASAssassinValue = 0;

    let isAssistantAttaque = false;
    let isAntiAnatheme = false;
    let isCadence = false;
    let sCadence = 0;
    let vCadence = 0;
    let isDestructeur = false;
    let vDestructeur = 0;
    let isMeurtrier = false;
    let vMeurtrier = 0;
    let nowSilencieux = false;
    let isObliteration = false;
    let isTenebricide = false;
    let isTirRafale = false;
    let isChambreDouble = false;

    let isELumiere = false;
    let lumiereValue = 0;

    let autresEffets = [];
    let autresAmeliorationsA = [];
    const autresSpecial = [];

    // GESTION DES EFFETS

    const effets = getWeaponsEffectsAutre(prefix, attrs);

    bDegats = bDegats.concat(effets.bDegats);
    eASAssassin = effets.eASAssassin;
    eASAssassinValue = effets.eASAssassinValue;

    if (attaquesSurprisesCondition === '' && effets.attaquesSurprisesCondition !== '') { attaquesSurprisesCondition = effets.attaquesSurprisesCondition; }

    attaquesSurprises = attaquesSurprises.concat(effets.attaquesSurprises);
    attaquesSurprisesValue = attaquesSurprisesValue.concat(effets.attaquesSurprisesValue);

    autresEffets = autresEffets.concat(effets.autresEffets);

    isAntiAnatheme = effets.isAntiAnatheme;

    isAssistantAttaque = effets.isAssistantAttaque;

    isCadence = effets.isCadence;
    sCadence = effets.sCadence;
    vCadence = effets.vCadence;

    isDestructeur = effets.isDestructeur;
    vDestructeur = effets.vDestructeur;

    isMeurtrier = effets.isMeurtrier;
    vMeurtrier = effets.vMeurtrier;

    nowSilencieux = effets.nowSilencieux;

    isTenebricide = effets.isTenebricide;

    isObliteration = effets.isObliteration;
    isTirRafale = effets.isTirRafale;

    isELumiere = effets.isELumiere;
    lumiereValue = Number(effets.eLumiereValue);

    if (effets.isConditionnelA) { isConditionnelA = true; }

    if (effets.isConditionnelD) { isConditionnelD = true; }

    if (effets.isConditionnelV) { isConditionnelV = true; }

    // FIN GESTION DES EFFETS

    // GESTION DES AMELIORATIONS D'ARMES

    const ameliorationsA = getWeaponsAutreAA(prefix, attrs, isAssistantAttaque, eASAssassinValue, isCadence, vCadence, nowSilencieux, isTirRafale, isObliteration, isAntiAnatheme);

    exec = exec.concat(ameliorationsA.exec);

    bonus = bonus.concat(ameliorationsA.bonus);

    diceDegats += ameliorationsA.diceDegats;
    diceViolence += ameliorationsA.diceViolence;

    bDegats = bDegats.concat(ameliorationsA.bDegats);

    attaquesSurprises = attaquesSurprises.concat(ameliorationsA.attaquesSurprises);
    attaquesSurprisesValue = attaquesSurprisesValue.concat(ameliorationsA.attaquesSurprisesValue);

    if (attaquesSurprisesCondition === '') { attaquesSurprisesCondition = ameliorationsA.attaquesSurprisesCondition; }

    if (ameliorationsA.isChambreDouble) {
      isCadence = false;
      isChambreDouble = ameliorationsA.isChambreDouble;
      sCadence = ameliorationsA.rChambreDouble;
    }

    autresEffets = autresEffets.concat(ameliorationsA.autresEffets);
    autresAmeliorationsA = autresAmeliorationsA.concat(ameliorationsA.autresAmeliorations);

    if (ameliorationsA.aASAssassin !== '') {
      eASAssassin = ameliorationsA.aASAssassin;
      eASAssassinValue = ameliorationsA.aASAssassinValue;
    }

    if (ameliorationsA.isConditionnelA) { isConditionnelA = true; }

    if (ameliorationsA.isConditionnelD) { isConditionnelD = true; }

    if (ameliorationsA.isConditionnelV) { isConditionnelV = true; }

    // FIN GESTION DES AMELIORATIONS D'ARMES

    // GESTION DES BONUS SPECIAUX

    const sBonusDegats = isApplied(attrs[`${prefix}BDDiversTotal`]);
    const sBonusDegatsD6 = attrs[`${prefix}BDDiversD6`];
    const sBonusDegatsFixe = attrs[`${prefix}BDDiversFixe`];

    const sBonusViolence = isApplied(attrs[`${prefix}BVDiversTotal`]);
    const sBonusViolenceD6 = attrs[`${prefix}BVDiversD6`];
    const sBonusViolenceFixe = attrs[`${prefix}BVDiversFixe`];

    const sEnergie = isApplied(attrs[`${prefix}energie`]);
    const sEnergieValue = attrs[`${prefix}energieValue`];

    if (sBonusDegats) {
      exec.push(`{{vMSpecialD=+${sBonusDegatsD6}D6+${sBonusDegatsFixe}}}`);
      diceDegats += Number(sBonusDegatsD6);
      bDegats.push(sBonusDegatsFixe);
    }

    if (sBonusViolence) {
      exec.push(`{{vMSpecialV=+${sBonusViolenceD6}D6+${sBonusViolenceFixe}}}`);
      diceViolence += Number(sBonusViolenceD6);
      bViolence.push(sBonusViolenceFixe);
    }

    if (sEnergie) {
      autresSpecial.push(`^{energie} (${sEnergieValue})`);
    }

    // FIN DE GESTION DES BONUS SPECIAUX

    if (cRoll.length === 0) { cRoll.push(0); }

    if (bonus.length === 0) { bonus.push(0); }

    exec.push('{{OD=true}}');
    exec.push(`{{vOD=${OD}}}`);

    if (diceDegats < 0) { diceDegats = 0; }

    if (diceViolence < 0) { diceViolence = 0; }

    degats.push(`${diceDegats}D6`);
    degats = degats.concat(bDegats);

    violence.push(`${diceViolence}D6`);
    violence = violence.concat(bViolence);

    const jet = `{{jet=[[ {{[[{${cRoll.join('+')}-${sCadence}, 0}kh1]]d6cs2cs4cs6cf1cf3cf5s%2}=0}]]}}`;

    firstExec.push(jet);
    exec.push(`{{Exploit=[[${cRoll.join('+')}]]}}`);
    exec.push(`{{bonus=[[${bonus.join('+')}]]}}`);

    exec.push(`{{degats=[[${degats.join('+')}]]}}`);
    exec.push(`{{violence=[[${violence.join('+')}]]}}`);

    if (isTenebricide) {
      let degatsTenebricide = [];
      let ASTenebricide = [];
      let ASValueTenebricide = [];

      let violenceTenebricide = [];

      const diceDegatsTenebricide = Math.floor(diceDegats / 2);
      const diceViolenceTenebricide = Math.floor(diceViolence / 2);

      degatsTenebricide.push(`${diceDegatsTenebricide}D6`);
      degatsTenebricide = degatsTenebricide.concat(bDegats);

      violenceTenebricide.push(`${diceViolenceTenebricide}D6`);
      violenceTenebricide = violenceTenebricide.concat(bViolence);

      exec.push(`{{tenebricideValueD=[[${degatsTenebricide.join('+')}]]}}`);
      exec.push(`{{tenebricideValueV=[[${violenceTenebricide.join('+')}]]}}`);

      if (eASAssassinValue > 0) {
        eAssassinTenebricideValue = Math.ceil(eASAssassinValue / 2);

        ASTenebricide.unshift(eASAssassin);
        ASValueTenebricide.unshift(`${eAssassinTenebricideValue}D6`);

        if (attaquesSurprises.length > 0) {
          ASTenebricide = ASTenebricide.concat(attaquesSurprises);
          ASValueTenebricide = ASValueTenebricide.concat(attaquesSurprisesValue);
        }

        exec.push(`{{tenebricideAS=${ASTenebricide.join('\n+')}}}`);
        exec.push(`{{tenebricideASValue=[[${ASValueTenebricide.join('+')}]]}}`);
      } else if (attaquesSurprises.length > 0) {
        ASTenebricide = ASTenebricide.concat(attaquesSurprises);
        ASValueTenebricide = ASValueTenebricide.concat(attaquesSurprisesValue);

        exec.push(`{{tenebricideAS=${ASTenebricide.join('\n+')}}}`);
        exec.push(`{{tenebricideASValue=[[${ASValueTenebricide.join('+')}]]}}`);
      }
    }

    if (isObliteration) {
      let ASObliteration = [];
      let ASValueObliteration = [];

      diceDegatsObliteration = diceDegats * 6;

      degatsFObliteration = _.reduce(bDegats, (n1, n2) => Number(n1) + Number(n2));

      const vObliteration = diceDegatsObliteration + degatsFObliteration;

      exec.push(`{{obliterationValue=${vObliteration}}}`);

      if (isMeurtrier) { exec.push(`{{obliterationMeurtrierValue=${vMeurtrier * 6}}}`); }

      if (isDestructeur) { exec.push(`{{obliterationDestructeurValue=${vDestructeur * 6}}}`); }

      if (eASAssassinValue > 0) {
        eAssassinTenebricideValue = eASAssassinValue * 6;

        ASObliteration.unshift(eASAssassin);
        ASValueObliteration.unshift(eAssassinTenebricideValue);

        if (attaquesSurprises.length > 0) {
          ASObliteration = ASObliteration.concat(attaquesSurprises);
          ASValueObliteration = ASValueObliteration.concat(attaquesSurprisesValue);
        }

        exec.push(`{{obliterationAS=${ASObliteration.join('\n+')}}}`);
        exec.push(`{{obliterationASValue=${_.reduce(ASValueObliteration, (n1, n2) => n1 + n2, 0)}}}`);
      } else if (attaquesSurprises.length > 0) {
        ASObliteration = ASObliteration.concat(attaquesSurprises);
        ASValueObliteration = ASValueObliteration.concat(attaquesSurprisesValue);

        exec.push(`{{obliterationAS=${ASTenebricide.join('\n+')}}}`);
        exec.push(`{{obliterationASValue=${_.reduce(ASValueObliteration, (n1, n2) => n1 + n2, 0)}}}`);
      }
    }

    if (isCadence) {
      exec.push(`{{rCadence=${i18n_cadence} ${vCadence} ${i18n_inclus}}}`);
      exec.push(`{{vCadence=${sCadence}D}}`);
    }

    if (isChambreDouble) {
      exec.push(`{{rCadence=${i18n_chambreDouble} (${i18n_cadence} 2) ${i18n_inclus}}}`);
      exec.push(`{{vCadence=${sCadence}D}}`);
    }

    if (eASAssassinValue > 0) {
      attaquesSurprises.unshift(eASAssassin);
      attaquesSurprisesValue.unshift(`${eASAssassinValue}D6`);
    }

    if (attaquesSurprises.length > 0) {
      exec.push(`{{attaqueSurprise=${attaquesSurprises.join('\n+')}}}`);
      exec.push(`{{attaqueSurpriseValue=[[${attaquesSurprisesValue.join('+')}]]}}`);
      exec.push(attaquesSurprisesCondition);
    }

    if (isELumiere) { autresEffets.push(`${i18n_lumiere} ${lumiereValue}`); }

    if (autresEffets.length > 0) {
      autresEffets.sort();
      exec.push(`{{effets=${autresEffets.join(' / ')}}}`);
    }

    if (autresAmeliorationsA.length > 0) {
      autresAmeliorationsA.sort();
      exec.push(`{{ameliorations=${autresAmeliorationsA.join(' / ')}}}`);
    }

    if (autresSpecial.length > 0) {
      autresSpecial.sort();
      exec.push(`{{special=${autresSpecial.join(' / ')}}}`);
    }

    if (isConditionnelA) { exec.push('{{succesConditionnel=true}}'); }

    if (isConditionnelD) { exec.push('{{degatsConditionnel=true}}'); }

    if (isConditionnelV) { exec.push('{{violenceConditionnel=true}}'); }

    if (effets.exec) { exec = exec.concat(effets.exec); }

    if (effets.firstExec) { firstExec = firstExec.concat(effets.firstExec); }

    exec = firstExec.concat(exec);

    startRoll(exec.join(' '), (results) => {
      const tJet = results.results.jet.result;

      const tBonus = results.results.bonus.result;
      const tExploit = results.results.Exploit.result;

      const tMeurtrier = results.results.meurtrierValue;
      let vTMeurtrier = 0;

      if (tMeurtrier !== undefined) { vTMeurtrier = tMeurtrier.dice[0]; }

      const tDestructeur = results.results.destructeurValue;
      let vTDestructeur = 0;

      if (tDestructeur !== undefined) { vTDestructeur = tDestructeur.dice[0]; }

      const tFureur = results.results.fureurValue;
      let vTFureur = 0;

      if (tFureur !== undefined) { vTFureur = tFureur.dice[0] + tFureur.dice[1]; }

      const tUltraviolence = results.results.ultraviolenceValue;

      let vTUltraviolence = 0;

      if (tUltraviolence !== undefined) { vTUltraviolence = tUltraviolence.dice[0]; }

      finishRoll(
        results.rollId,
        {
          jet: tJet + tBonus,
          meurtrierValue: vTMeurtrier,
          destructeurValue: vTDestructeur,
          fureurValue: vTFureur,
          ultraviolenceValue: vTUltraviolence,
        },
      );

      if (tJet !== 0 && tJet === tExploit) {
        startRoll(`${roll}@{jetGM} &{template:simple} {{Nom=@{name}}} {{special1=${i18n_exploit}}}${jet}`, (exploit) => {
          const tExploit2 = exploit.results.jet.result;

          finishRoll(
            exploit.rollId,
            {
              jet: tExploit2,
            },
          );
        });
      }
    });
  });
});
